from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.dependencies import get_current_user, get_current_admin_user
from app import models, schemas, crud
from app.database import get_db

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/profile", response_model=schemas.UserOut)
def read_profile(current_user: models.User = Depends(get_current_user)):
    return current_user

# 1. Get all users
@router.get("/", response_model=list[schemas.UserOut])
def get_all_users(
    role: str = None,  # ✅ allow ?role=user query param
    db: Session = Depends(get_db),
    current_admin: models.User = Depends(get_current_admin_user)
):
    query = db.query(models.User)
    if role:
        query = query.filter(models.User.role == role)  # ✅ filter users by role
    return query.all()


# 2. Search users by email
@router.get("/search", response_model=schemas.UserOut)
def search_user_by_email(
    email: str,
    db: Session = Depends(get_db),
    current_admin: models.User = Depends(get_current_admin_user)
):
    user = crud.get_user_by_email(db, email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# 3. Delete a user
@router.delete("/{user_id}")
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_admin: models.User = Depends(get_current_admin_user)
):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"message": "User deleted successfully"}

# 4. Update user role
@router.put("/{user_id}/role")
def update_user_role(
    user_id: int,
    role: str,
    db: Session = Depends(get_db),
    current_admin: models.User = Depends(get_current_admin_user)
):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.role = role
    db.commit()
    return {"message": "User role updated successfully"}

@router.put("/{user_id}/reset-password")
def reset_user_password(
    user_id: int,
    new_password: str,
    db: Session = Depends(get_db),
    current_admin: models.User = Depends(get_current_admin_user)
):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    from app.auth import get_password_hash
    user.hashed_password = get_password_hash(new_password)
    db.commit()
    return {"message": "Password reset successfully"}

from app.dependencies import get_current_user  # ✅ Import the regular user dependency

from app.dependencies import get_current_user

@router.put("/{user_id}")
def update_user_info(
    user_id: int,
    user_update: schemas.UserUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)  # ✅ Regular user allowed
):
    user = db.query(models.User).filter(models.User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # ✅ Only allow the user themselves to update their own profile
    if current_user.id != user_id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="You are not authorized to update this profile")

    if user_update.username:
        user.username = user_update.username
    if user_update.email:
        user.email = user_update.email

    db.commit()
    db.refresh(user)
    return {"message": "User updated successfully"}

