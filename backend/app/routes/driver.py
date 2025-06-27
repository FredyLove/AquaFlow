from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import schemas, models
from app.database import get_db

router = APIRouter(prefix="/drivers", tags=["Drivers"])

@router.post("/", response_model=schemas.DriverOut)
def create_driver(driver: schemas.DriverCreate, db: Session = Depends(get_db)):
    new_driver = models.Driver(**driver.dict())
    db.add(new_driver)
    db.commit()
    db.refresh(new_driver)
    return new_driver

@router.get("/", response_model=list[schemas.DriverOut])
def get_all_drivers(db: Session = Depends(get_db)):
    return db.query(models.Driver).all()
