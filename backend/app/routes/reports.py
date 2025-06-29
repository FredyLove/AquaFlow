from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import schemas, crud, models
from app.database import get_db
from app.dependencies import get_current_admin_user

router = APIRouter(prefix="/reports", tags=["Reports"])
@router.get("/summary")
def get_summary(db: Session = Depends(get_db), current_admin: models.User = Depends(get_current_admin_user)):
    
    return {
        "total_revenue": 14500000,
        "avg_order_value": 58450,
        "retention_rate": 89.2,
        "success_rate": 96.8,
    }


@router.get("/monthly")
def get_monthly_revenue(db: Session = Depends(get_db), current_admin: models.User = Depends(get_current_admin_user)):
    return [
        {"month": "Jan", "revenue": 1850000, "orders": 245, "customers": 45},
    ]


@router.get("/products")
def get_top_products(db: Session = Depends(get_db), current_admin: models.User = Depends(get_current_admin_user)):
    return [
        {"product": "Pure Life Sachets", "sales": 45000, "revenue": 1800000},
    ]


@router.get("/segments")
def get_customer_segments(db: Session = Depends(get_db), current_admin: models.User = Depends(get_current_admin_user)):
    return [
        {"name": "Retailers", "value": 65, "color": "#0ea5e9"},
    ]


@router.get("/weekly-deliveries")
def get_weekly_deliveries(db: Session = Depends(get_db), current_admin: models.User = Depends(get_current_admin_user)):
    return [
        {"day": "Mon", "delivered": 45, "pending": 8, "delayed": 2},
    ]
