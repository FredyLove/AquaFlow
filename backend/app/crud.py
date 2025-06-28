# app/crud.py
from datetime import datetime
from fastapi import HTTPException
from sqlalchemy import func
from sqlalchemy.orm import Session
from sqlalchemy.exc import NoResultFound
from passlib.context import CryptContext
from . import models, schemas
from .auth import verify_password
import requests
from geopy.distance import geodesic
from math import radians, sin, cos, sqrt, atan2


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = pwd_context.hash(user.password)
    db_user = models.User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password,
        role=user.role
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user or not verify_password(password, user.hashed_password):
        return None
    return user

# Products

def create_product(db: Session, product: schemas.ProductCreate):
    db_product = models.Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def get_product(db: Session, product_id: int):
    return db.query(models.Product).filter(models.Product.id == product_id).first()

def get_products(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Product).offset(skip).limit(limit).all()

def update_product(db: Session, product_id: int, updates: schemas.ProductUpdate):
    product = get_product(db, product_id)
    if not product:
        return None
    for field, value in updates.dict(exclude_unset=True).items():
        setattr(product, field, value)
    db.commit()
    db.refresh(product)
    return product

def delete_product(db: Session, product_id: int):
    product = get_product(db, product_id)
    if not product:
        return None
    db.delete(product)
    db.commit()
    return product

# Deliveries

def create_delivery_request(db: Session, user_id: int, request_data: schemas.DeliveryRequestCreate):
    
    lat, lng = get_coordinates_from_address(request_data.address)
    warehouse_lat = 3.866
    warehouse_lng = 11.517
    
        # Step 1: Get distance
    distance_km = haversine_distance_km(warehouse_lat, warehouse_lng, lat, lng)

    # Step 2: Estimate time (assume average speed 30 km/h)
    avg_speed_kmh = 30
    estimated_minutes = int((distance_km / avg_speed_kmh) * 60)

    # Step 3: Format as string
    eta_string = f"{estimated_minutes} minutes"
    
    delivery = models.DeliveryRequest(
        user_id=user_id,
        product_id=request_data.product_id,
        address=request_data.address,
        quantity=request_data.quantity,
        latitude=lat,
        longitude=lng,
        status="pending",
        estimated_delivery_time = eta_string

    )
    db.add(delivery)
    db.commit()
    db.refresh(delivery)
    return delivery

def get_all_delivery_requests(db: Session):
    return db.query(models.DeliveryRequest).all()

def update_delivery_status(db: Session, delivery_id: int, status: str):
    delivery = db.query(models.DeliveryRequest).filter(models.DeliveryRequest.id == delivery_id).first()
    if delivery:
        delivery.status = status
        db.commit()
    return delivery

def update_delivery_stage(db: Session, delivery_id: int, data: schemas.DeliveryTrackingUpdate):
    delivery = db.query(models.DeliveryRequest).filter(models.DeliveryRequest.id == delivery_id).first()
    if not delivery:
        return None
    delivery.stage = data.stage
    if data.driver_name:
        delivery.driver_name = data.driver_name
    if data.driver_phone:
        delivery.driver_phone = data.driver_phone
    if data.driver_vehicle:
        delivery.driver_vehicle = data.driver_vehicle
    db.commit()
    db.refresh(delivery)
    return delivery

def get_user_delivery_tracking(db: Session, user_id: int):
    return db.query(models.DeliveryRequest).filter(models.DeliveryRequest.user_id == user_id).all()


def get_coordinates_from_address(address: str):
    url = "https://nominatim.openstreetmap.org/search"
    params = {
        'q': f"{address}, Cameroon",
        'format': 'json',
        'limit': 1
    }
    headers = {
        "User-Agent": "aquaflow-app/1.0"
    }
    try:
        response = requests.get(url, params=params, headers=headers, timeout=10)
        response.raise_for_status()
        results = response.json()
        print("Response: ", results)
        
        if results:
            return float(results[0]['lat']), float(results[0]['lon'])
        
    except Exception as e:
            print("❌ Failed to get coordinates:", str(e))
            
    return None, None

def compute_distance(p1, p2):
    return geodesic(p1, p2).kilometers

def haversine_distance_km(lat1, lon1, lat2, lon2):
    # Earth radius in km
    R = 6371.0

    lat1 = radians(lat1)
    lon1 = radians(lon1)
    lat2 = radians(lat2)
    lon2 = radians(lon2)

    dlon = lon2 - lon1
    dlat = lat2 - lat1

    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return R * c  # Distance in KM


def optimize_delivery_route(deliveries, start=(4.0749865, 11.5525917)):  # HQ in Yaoundé
    route = []
    remaining = deliveries.copy()
    current = start

    while remaining:
        nearest = min(remaining, key=lambda d: compute_distance(current, (d.latitude, d.longitude)))
        route.append(nearest)
        current = (nearest.latitude, nearest.longitude)
        remaining.remove(nearest)

    return route



# Review


def create_or_update_review(db: Session, user_id: int, review_data: schemas.ReviewCreate):
    existing = db.query(models.ProductReview).filter_by(
        user_id=user_id,
        product_id=review_data.product_id
    ).first()

    if existing:
        existing.rating = review_data.rating
        existing.comment = review_data.comment
        existing.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(existing)
        return existing
    else:
        new_review = models.ProductReview(
            user_id=user_id,
            product_id=review_data.product_id,
            rating=review_data.rating,
            comment=review_data.comment,
        )
        db.add(new_review)
        db.commit()
        db.refresh(new_review)
        return new_review

def get_reviews_by_product(db: Session, product_id: int):
    return db.query(models.ProductReview).filter_by(product_id=product_id).all()

def get_average_rating(db: Session, product_id: int) -> float:
    result = db.query(func.avg(models.ProductReview.rating)).filter_by(product_id=product_id).scalar()
    return round(result or 0.0, 2)

# Bookmarks


# ✅ Add bookmark
def add_bookmark(db: Session, user_id: int, product_id: int):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    product = db.query(models.Product).filter(models.Product.id == product_id).first()

    if not user or not product:
        return None

    if product in user.bookmarks:
        return product  # Already bookmarked

    user.bookmarks.append(product)
    db.commit()
    return product

# ✅ Remove bookmark
def remove_bookmark(db: Session, user_id: int, product_id: int):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    product = db.query(models.Product).filter(models.Product.id == product_id).first()

    if not user or not product:
        return None

    if product in user.bookmarks:
        user.bookmarks.remove(product)
        db.commit()
        return True

    return False

# ✅ List user’s bookmarks
def get_user_bookmarks(db: Session, user_id: int):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user:
        return user.bookmarks
    return []

# Notifications

def create_notification(db: Session, user_id: int, message: str):
    notification = models.Notification(user_id=user_id, message=message)
    db.add(notification)
    db.commit()
    db.refresh(notification)
    return notification

def get_user_notifications(db: Session, user_id: int):
    return db.query(models.Notification)\
        .filter(models.Notification.user_id == user_id)\
             .order_by(models.Notification.created_at.desc())\
             .all()

def mark_all_as_read(db: Session, user_id: int):
    db.query(models.Notification)\
      .filter(models.Notification.user_id == user_id)\
      .update({"is_read": True})
    db.commit()
    
# Message 


def create_user_message(db: Session, user_id: int, data: schemas.MessageCreate):
    msg = models.Message(user_id=user_id, subject=data.subject, content=data.content)
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return msg

def get_all_messages(db: Session):
    return db.query(models.Message).order_by(models.Message.created_at.desc()).all()

def respond_to_message(db: Session, message_id: int, response: str):
    msg = db.query(models.Message).filter(models.Message.id == message_id).first()
    if not msg:
        return None
    msg.response = response
    msg.responded_at = datetime.utcnow()
    db.commit()
    db.refresh(msg)

    # Trigger notification to user
    create_notification(db, user_id=msg.user_id, message="Admin replied to your message")
    return msg

# Cart

def add_to_cart(db, user_id: int, item: schemas.CartItemCreate):
    # Check if the product exists
    product = db.query(models.Product).filter(models.Product.id == item.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    # Check if the user already has this product in cart
    existing = db.query(models.CartItem).filter_by(user_id=user_id, product_id=item.product_id).first()
    if existing:
        existing.quantity += item.quantity
    else:
        new_item = models.CartItem(user_id=user_id, product_id=item.product_id, quantity=item.quantity)
        db.add(new_item)

    db.commit()


def get_cart_items(db, user_id: int):
    return db.query(models.CartItem).filter_by(user_id=user_id).all()


def remove_cart_item(db, user_id: int, product_id: int):
    item = db.query(models.CartItem).filter_by(user_id=user_id, product_id=product_id).first()
    if item:
        db.delete(item)
        db.commit()


def clear_cart(db, user_id: int):
    db.query(models.CartItem).filter_by(user_id=user_id).delete()
    db.commit()