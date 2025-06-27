from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import schemas, models, crud
from app.dependencies import get_current_user, get_current_admin_user
from app.database import get_db


router = APIRouter(prefix="/messages", tags=["Messages"])

@router.post("/", response_model=schemas.MessageOut)
def send_message(
    data: schemas.MessageCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return crud.create_user_message(db, current_user.id, data)

@router.get("/", response_model=list[schemas.MessageOut])
def get_messages(
    db: Session = Depends(get_db),
    current_admin: models.User = Depends(get_current_admin_user)
):
    return crud.get_all_messages(db)

@router.put("/{message_id}/respond", response_model=schemas.MessageOut)
def respond_to_message(
    message_id: int,
    response: str,
    db: Session = Depends(get_db),
    current_admin: models.User = Depends(get_current_admin_user)
):
    updated = crud.respond_to_message(db, message_id, response)
    if not updated:
        raise HTTPException(status_code=404, detail="Message not found")
    return updated

@router.get("/my", response_model=list[schemas.MessageOut])
def get_my_messages(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return db.query(models.Message).filter(models.Message.user_id == current_user.id).order_by(models.Message.created_at.desc()).all()
