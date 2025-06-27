# app/routes/bookmarks.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import schemas, crud, models
from app.database import get_db
from app.dependencies import get_current_user

router = APIRouter(prefix="/bookmarks", tags=["Bookmarks"])

# ✅ Add a bookmark
@router.post("/", response_model=schemas.BookmarkedProduct)
def add_bookmark(
    data: schemas.BookmarkAction,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    product = crud.add_bookmark(db, user_id=current_user.id, product_id=data.product_id)
    if not product:
        raise HTTPException(status_code=404, detail="User or product not found")
    return product

# ✅ Remove a bookmark
@router.delete("/", response_model=dict)
def remove_bookmark(
    data: schemas.BookmarkAction,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    removed = crud.remove_bookmark(db, user_id=current_user.id, product_id=data.product_id)
    if not removed:
        raise HTTPException(status_code=404, detail="Bookmark not found")
    return {"message": "Bookmark removed successfully"}

# ✅ Get all bookmarks for current user
@router.get("/", response_model=list[schemas.BookmarkedProduct])
def list_user_bookmarks(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return crud.get_user_bookmarks(db, current_user.id)
