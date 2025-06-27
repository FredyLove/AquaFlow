from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi.responses import StreamingResponse
import csv
from io import StringIO
from app import models
from app.dependencies import get_current_admin_user
from app.database import get_db
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from io import BytesIO

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.get("/export-deliveries")
def export_deliveries_csv(
    db: Session = Depends(get_db),
    current_admin: models.User = Depends(get_current_admin_user)
):
    deliveries = db.query(models.DeliveryRequest).all()

    output = StringIO()
    writer = csv.writer(output)
    
    # ✅ Updated Header
    writer.writerow([
        "Delivery ID", "Customer", "Product", "Quantity", "Address", "Status",
        "Stage", "Driver Name", "Estimated Time", "Latitude", "Longitude", "Requested At"
    ])
    
    # ✅ Updated Rows
    for d in deliveries:
        writer.writerow([
            d.id,
            d.user.username if d.user else "",          # 💬 Customer name
            d.product.name if d.product else "",        # 📦 Product name
            d.quantity,
            d.address,
            d.status,
            d.stage,
            d.driver.name if d.driver else "",          # 🚚 Driver name
            d.estimated_delivery_time or "",
            d.latitude,
            d.longitude,
            d.created_at
        ])

    output.seek(0)
    return StreamingResponse(output, media_type="text/csv", headers={
        "Content-Disposition": "attachment; filename=deliveries.csv"
    })




@router.get("/export-deliveries-pdf")
def export_deliveries_pdf(
    db: Session = Depends(get_db),
    current_admin: models.User = Depends(get_current_admin_user)
):
    deliveries = db.query(models.DeliveryRequest).all()

    buffer = BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=letter)
    width, height = letter

    pdf.setTitle("Delivery Report")
    pdf.setFont("Helvetica-Bold", 16)
    pdf.drawString(50, height - 50, "EDEN SARL - Delivery Report")

    pdf.setFont("Helvetica", 12)
    y = height - 80
    line_height = 18

    for d in deliveries:
        text = (
            f"ID: {d.id} | Customer: {d.user.username if d.user else 'N/A'} | "
            f"Product: {d.product.name if d.product else 'N/A'} | Qty: {d.quantity} | "
            f"Status: {d.status} | Stage: {d.stage} | ETA: {d.estimated_delivery_time or 'N/A'}"
        )
        pdf.drawString(50, y, text)
        y -= line_height

        if y < 50:
            pdf.showPage()
            y = height - 50
            pdf.setFont("Helvetica", 12)

    pdf.save()
    buffer.seek(0)

    return StreamingResponse(buffer, media_type="application/pdf", headers={
        "Content-Disposition": "attachment; filename=delivery_report.pdf"
    })
