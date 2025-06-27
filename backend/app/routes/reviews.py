from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas, database, models
from app.dependencies import get_current_user, get_current_admin_user
from app.database import get_db

router = APIRouter(prefix="/reviews", tags=["Reviews"])


@router.post("/", response_model=schemas.ReviewOut)
def submit_review(
    review: schemas.ReviewCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return crud.create_or_update_review(db, user_id=current_user.id, review_data=review)


@router.get("/product/{product_id}", response_model=list[schemas.ReviewOut])
def list_reviews(product_id: int, db: Session = Depends(get_db)):
    return crud.get_reviews_by_product(db, product_id)


@router.get("/product/{product_id}/average")
def get_average_rating(product_id: int, db: Session = Depends(get_db)):
    avg = crud.get_average_rating(db, product_id)
    return {"product_id": product_id, "average_rating": avg}