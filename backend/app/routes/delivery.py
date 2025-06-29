from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
from random import uniform
import asyncio
from app import schemas, models, crud
from app.dependencies import get_current_user, get_current_admin_user
from app.database import get_db
from app.crud import optimize_delivery_route

router = APIRouter(prefix="/delivery", tags=["Delivery"])


# 🚚 User creates delivery request
@router.post("/", response_model=schemas.DeliveryRequestOut)
def request_delivery(
    delivery_data: schemas.DeliveryRequestCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return crud.create_delivery_request(db, user_id=current_user.id, request_data=delivery_data)


# 📦 Admin updates delivery status (pending/approved/rejected)
@router.put("/{delivery_id}/status")
def update_delivery_status(
    delivery_id: int,
    status: schemas.DeliveryStatusUpdate,
    db: Session = Depends(get_db),
    current_admin: models.User = Depends(get_current_admin_user)
):
    updated = crud.update_delivery_status(db, delivery_id, status.status)
    if not updated:
        raise HTTPException(status_code=404, detail="Request not found")
    return {"message": "Status updated successfully"}


# 👀 Admin views all delivery requests
@router.get("/requests", response_model=List[schemas.DeliveryRequestOut])
def get_all_delivery_requests(
    db: Session = Depends(get_db),
    current_admin: models.User = Depends(get_current_admin_user)
):
    return db.query(models.DeliveryRequest).all()


# 🚚 Admin updates delivery tracking stage
@router.put("/{delivery_id}/track", response_model=schemas.DeliveryRequestOut)
def update_tracking(
    delivery_id: int,
    tracking_data: schemas.DeliveryTrackingUpdate,
    db: Session = Depends(get_db),
    current_admin: models.User = Depends(get_current_admin_user)
):
    updated = crud.update_delivery_stage(db, delivery_id, tracking_data)
    if not updated:
        raise HTTPException(status_code=404, detail="Delivery request not found")
    return updated


# 📍 User views their own delivery tracking
@router.get("/track", response_model=List[schemas.DeliveryRequestOut])
def track_my_deliveries(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return crud.get_user_delivery_tracking(db, current_user.id)


# 🗑️ Admin deletes a delivery request
@router.delete("/{delivery_id}")
def delete_delivery_request(
    delivery_id: int,
    db: Session = Depends(get_db),
    current_admin: models.User = Depends(get_current_admin_user)
):
    request = db.query(models.DeliveryRequest).filter(models.DeliveryRequest.id == delivery_id).first()
    if not request:
        raise HTTPException(status_code=404, detail="Delivery request not found")

    db.delete(request)
    db.commit()
    return {"message": f"Delivery request {delivery_id} deleted successfully"}


# 🧠 Smart optimized route (AI-based)
@router.get("/optimized-route", response_model=List[schemas.DeliveryRequestOut])
def get_optimized_route(
    db: Session = Depends(get_db),
    current_admin: models.User = Depends(get_current_admin_user)
):
    deliveries = db.query(models.DeliveryRequest)\
                   .filter(models.DeliveryRequest.status == "pending")\
                   .filter(models.DeliveryRequest.latitude.isnot(None))\
                   .filter(models.DeliveryRequest.longitude.isnot(None))\
                   .all()

    if not deliveries:
        raise HTTPException(status_code=404, detail="No deliveries to optimize")

    ordered = optimize_delivery_route(deliveries)
    return ordered


# ✅ Pydantic model for assigning a driver to multiple deliveries
class AssignDriverRequest(BaseModel):
    delivery_ids: List[int]
    driver_id: int


# 🚚 Admin assigns a driver to delivery requests
@router.post("/assign-driver")
def assign_driver_to_route(
    data: AssignDriverRequest,
    db: Session = Depends(get_db),
    current_admin: models.User = Depends(get_current_admin_user)
):
    driver = db.query(models.Driver).filter(models.Driver.id == data.driver_id).first()
    if not driver:
        raise HTTPException(status_code=404, detail="Driver not found")

    updated_count = 0
    for delivery_id in data.delivery_ids:
        delivery = db.query(models.DeliveryRequest).filter(models.DeliveryRequest.id == delivery_id).first()
        if delivery:
            if delivery.is_locked:
                continue 
            delivery.driver = driver
            delivery.is_locked = True
            db.commit()
            updated_count += 1

    return {"message": f"Driver assigned to {updated_count} deliveries."}


@router.put("/{delivery_id}/unlock")
def unlock_delivery(
    delivery_id: int,
    db: Session = Depends(get_db),
    current_admin: models.User = Depends(get_current_admin_user)
):
    delivery = db.query(models.DeliveryRequest).filter(models.DeliveryRequest.id == delivery_id).first()
    if not delivery:
        raise HTTPException(status_code=404, detail="Delivery not found")

    delivery.is_locked = False
    db.commit()
    return {"message": f"Delivery {delivery_id} has been unlocked"}

async def run_delivery_simulation(delivery_id: int):
    from app.database import SessionLocal
    db = SessionLocal()

    try:
        delivery = db.query(models.DeliveryRequest).filter(models.DeliveryRequest.id == delivery_id).first()
        if not delivery:
            return

        # Simulated waypoints (add more if you want)
        steps = [
            "confirmed",
            "out_for_delivery",
            "delivered"
        ]

        for step in steps:
            delivery.stage = step

            # Randomly simulate small GPS drift
            if delivery.latitude and delivery.longitude:
                delivery.latitude += uniform(-0.0002, 0.0002)
                delivery.longitude += uniform(-0.0002, 0.0002)

            db.commit()
            await asyncio.sleep(5)  # wait 5s between steps

    finally:
        db.close()

@router.post("/simulate/{delivery_id}")
async def simulate_delivery_tracking(
    delivery_id: int,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    current_admin: models.User = Depends(get_current_admin_user)
):
    delivery = db.query(models.DeliveryRequest).filter(models.DeliveryRequest.id == delivery_id).first()

    if not delivery:
        raise HTTPException(status_code=404, detail="Delivery not found")

    # Only simulate if not already delivered
    if delivery.stage == "delivered":
        raise HTTPException(status_code=400, detail="Already delivered")

    # Start background simulation
    background_tasks.add_task(run_delivery_simulation, delivery.id)
    return {"message": f"Simulation started for delivery {delivery_id}"}

@router.get("/{delivery_id}/map")
def get_delivery_location(
    delivery_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    delivery = db.query(models.DeliveryRequest).filter(models.DeliveryRequest.id == delivery_id).first()
    if not delivery:
        raise HTTPException(status_code=404, detail="Delivery not found")

    if delivery.user_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized to view this delivery")

    return {
        "id": delivery.id,
        "stage": delivery.stage,
        "latitude": delivery.latitude,
        "longitude": delivery.longitude,
        "status": delivery.status,
        "updated_at": delivery.updated_at,
        "driver": {
            "id": delivery.driver.id if delivery.driver else None,
            "name": delivery.driver.name if delivery.driver else "Unassigned",
        }
    }
