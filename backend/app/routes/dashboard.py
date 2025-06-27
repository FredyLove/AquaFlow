# app/routes/dashboard.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date
from app import models
from app.database import get_db

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/summary")
def get_dashboard_summary(db: Session = Depends(get_db)):
    today = date.today()

    # Total Revenue
    total_revenue = db.query(func.sum(models.DeliveryRequest.total_price))\
        .filter(models.DeliveryRequest.status == "delivered").scalar() or 0

    # Active Orders
    active_orders = db.query(models.DeliveryRequest)\
        .filter(models.DeliveryRequest.status != "delivered").count()

    # Total Customers
    total_customers = db.query(models.User)\
        .filter(models.User.role == "user").count()

    # Deliveries Today
    deliveries_today = db.query(models.DeliveryRequest)\
        .filter(func.date(models.DeliveryRequest.created_at) == today).count()

    # Delivery Status Distribution
    delivery_status = db.query(
        models.DeliveryRequest.status,
        func.count(models.DeliveryRequest.id)
    ).group_by(models.DeliveryRequest.status).all()

    delivery_status_distribution = {
        status: count for status, count in delivery_status
    }

    return {
        "total_revenue": total_revenue,
        "active_orders": active_orders,
        "total_customers": total_customers,
        "deliveries_today": deliveries_today,
        "delivery_status_distribution": delivery_status_distribution
    }

@router.get("/monthly-sales")
def get_monthly_sales_trends(db: Session = Depends(get_db)):
    sales = db.query(
        func.strftime("%m", models.DeliveryRequest.created_at).label("month"),
        models.Product.category,
        func.sum(models.DeliveryRequest.quantity).label("total_sold")
    ).join(models.Product, models.DeliveryRequest.product_id == models.Product.id)\
     .filter(models.DeliveryRequest.status == "delivered")\
     .group_by("month", models.Product.category)\
     .order_by("month")\
     .all()

    # Structure data for chart usage
    result = {}
    for month, category, total in sales:
        if month not in result:
            result[month] = {}
        result[month][category] = total

    return result
