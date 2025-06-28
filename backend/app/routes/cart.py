from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import schemas, crud, models
from app.database import get_db
from app.dependencies import get_current_user

router = APIRouter(prefix="/cart", tags=["Cart"])

@router.post("/add")
def add_item(
    item: schemas.CartItemCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    crud.add_to_cart(db, current_user.id, item)
    return {"message": "Added to cart"}

@router.get("/", response_model=list[schemas.CartItemOut])
def view_cart(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    return crud.get_cart_items(db, current_user.id)


@router.delete("/{product_id}")
def remove_item(product_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    crud.remove_cart_item(db, current_user.id, product_id)
    return {"message": "Removed from cart"}


@router.delete("/clear")
def clear_cart_route(
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(get_current_user)
):
    db.query(models.CartItem).filter(models.CartItem.user_id == current_user.id).delete()
    db.commit()
    return {"message": "Cart cleared"}

