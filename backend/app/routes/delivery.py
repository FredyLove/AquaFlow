# app/routes/delivery.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import schemas, models, crud
from app.dependencies import get_current_user, get_current_admin_user
from app.database import get_db
from app.crud import optimize_delivery_route
from typing import List
from pydantic import BaseModel

router = APIRouter(prefix="/delivery", tags=["Delivery"])

@router.post("/", response_model=schemas.DeliveryRequestOut)
def request_delivery(
    delivery_data: schemas.DeliveryRequestCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return crud.create_delivery_request(db, user_id=current_user.id, request_data=delivery_data)

@router.put("/{delivery_id}/status")
def update_delivery_status(
    delivery_id: int,
    status: schemas.DeliveryStatus,
    db: Session = Depends(get_db),
    current_admin: models.User = Depends(get_current_admin_user)
):
    updated = crud.update_delivery_status(db, delivery_id, status.value)
    if not updated:
        raise HTTPException(status_code=404, detail="Request not found")
    return {"message": "Status updated successfully"}

@router.get("/", response_model=list[schemas.DeliveryRequestOut])
def get_all_delivery_requests(
    db: Session = Depends(get_db),
    current_admin: models.User = Depends(get_current_admin_user)
):
    return db.query(models.DeliveryRequest).all()

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

@router.get("/track", response_model=list[schemas.DeliveryRequestOut])
def track_my_deliveries(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return crud.get_user_delivery_tracking(db, current_user.id)

@router.delete("/{delivery_id}")
def delete_delivery_request(
    delivery_id: int,
    db: Session = Depends(get_db),
    current_admin: models.User = Depends(get_current_admin_user)  # protect it
):
    request = db.query(models.DeliveryRequest).filter(models.DeliveryRequest.id == delivery_id).first()
    if not request:
        raise HTTPException(status_code=404, detail="Delivery request not found")

    db.delete(request)
    db.commit()
    return {"message": f"Delivery request {delivery_id} deleted successfully"}

@router.get("/optimized-route", response_model=list[schemas.DeliveryRequestOut])
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


class AssignDriverRequest(BaseModel):
    delivery_ids: List[int]
    driver_name: str
    driver_phone: str
    driver_vehicle: str

@router.post("/assign-driver")
def assign_driver_to_route(
    data: AssignDriverRequest,
    db: Session = Depends(get_db),
    current_admin: models.User = Depends(get_current_admin_user)
):
    updated_count = 0
    for delivery_id in data.delivery_ids:
        delivery = db.query(models.DeliveryRequest).filter(models.DeliveryRequest.id == delivery_id).first()
        if delivery:
            delivery.driver_name = data.driver_name
            delivery.driver_phone = data.driver_phone
            delivery.driver_vehicle = data.driver_vehicle
            db.commit()
            updated_count += 1

    return {"message": f"Driver assigned to {updated_count} deliveries."}
