from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas, database, models
from app.dependencies import get_current_user, get_current_admin_user

router = APIRouter(prefix="/products", tags=["Products"])


@router.post("/", response_model=schemas.ProductOut)
def create_product(
    product: schemas.ProductCreate,
    db: Session = Depends(database.get_db),
    current_admin: models.User = Depends(get_current_admin_user)
):
    # Create the product
    new_product = crud.create_product(db, product)

    # Get all active users
    users = db.query(models.User).filter(models.User.is_active == True).all()

    # Notify each user about the new product
    for user in users:
        crud.create_notification(
            db,
            user_id=user.id,
            message=f"A new product '{new_product.name}' has been added!"
        )

    return new_product


@router.get("/", response_model=list[schemas.ProductOut]) 
def list_products(
    skip: int = 0,
    limit: int = 100,
    category: str = None,
    is_popular: bool = None,
    min_price: float = None,
    max_price: float = None,
    search: str = None,
    db: Session = Depends(database.get_db)
):
    query = db.query(models.Product)

    if category:
        query = query.filter(models.Product.category == category)

    if is_popular is not None:
        query = query.filter(models.Product.isPopular == is_popular)

    if min_price is not None:
        query = query.filter(models.Product.price >= min_price)

    if max_price is not None:
        query = query.filter(models.Product.price <= max_price)

    if search:
        query = query.filter(
            models.Product.name.ilike(f"%{search}%") |
            models.Product.description.ilike(f"%{search}%")
        )

    return query.offset(skip).limit(limit).all()


@router.get("/{product_id}", response_model=schemas.ProductOut)
def read_product(product_id: int, db: Session = Depends(database.get_db)):
    product = crud.get_product(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.put("/{product_id}", response_model=schemas.ProductOut)
def update_product(
    product_id: int,
    updates: schemas.ProductUpdate,
    db: Session = Depends(database.get_db),
    current_admin: models.User = Depends(get_current_admin_user)
):
    updated = crud.update_product(db, product_id, updates)
    if not updated:
        raise HTTPException(status_code=404, detail="Product not found")
    return updated


@router.delete("/{product_id}", response_model=schemas.ProductOut)
def delete_product(
    product_id: int,
    db: Session = Depends(database.get_db),
    current_admin: models.User = Depends(get_current_admin_user)
):
    deleted = crud.delete_product(db, product_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Product not found")
    return deleted
