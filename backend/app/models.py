from sqlalchemy import Table, Column, DateTime, Float, ForeignKey, Integer, String, Boolean, Enum
from .database import Base
from sqlalchemy.orm import relationship
import enum
from datetime import datetime

# ✅ Bookmarks association table
user_bookmarks = Table(
    "user_bookmarks",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id"), primary_key=True),
    Column("product_id", Integer, ForeignKey("products.id"), primary_key=True),
)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    role = Column(String, default="user")

    reviews = relationship("ProductReview", back_populates="user", cascade="all, delete")
    bookmarks = relationship(
        "Product",
        secondary=user_bookmarks,
        back_populates="bookmarked_by"
    )

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    description = Column(String, nullable=True)
    quantity = Column(Integer, default=0)
    image = Column(String, nullable=True)
    price = Column(Float, nullable=False)
    category = Column(String, nullable=True)
    isPopular = Column(Boolean, default=False)
    rating = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    reviews = relationship("ProductReview", back_populates="product", cascade="all, delete")
    bookmarked_by = relationship(
        "User",
        secondary=user_bookmarks,
        back_populates="bookmarks"
    )

class ProductReview(Base):
    __tablename__ = "product_reviews"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    rating = Column(Integer, nullable=False)  # should be 1–5
    comment = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="reviews")
    product = relationship("Product", back_populates="reviews")

class DeliveryStatus(str, enum.Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"

class DeliveryStage(str, enum.Enum):
    confirmed = "confirmed"
    preparing = "preparing"
    out_for_delivery = "out_for_delivery"
    delivered = "delivered"

class DeliveryRequest(Base):
    __tablename__ = "delivery_requests"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    quantity = Column(Integer, nullable=False)
    address = Column(String, nullable=False)
    status = Column(Enum(DeliveryStatus), default="pending")  # overall status
    stage = Column(Enum(DeliveryStage), default="confirmed")  # progress status
    driver_id = Column(Integer, ForeignKey("drivers.id"), nullable=True)
    is_locked = Column(Boolean, default=False)
    latitude = Column(Float, nullable=True)   
    longitude = Column(Float, nullable=True)
    estimated_delivery_time = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User")
    product = relationship("Product")
    driver = relationship("Driver", back_populates="deliveries")

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    message = Column(String, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", backref="notifications")

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    subject = Column(String, nullable=False)
    content = Column(String, nullable=False)
    response = Column(String, nullable=True)
    responded_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User")

class Driver(Base):
    __tablename__ = "drivers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    phone = Column(String, nullable=False, unique=True)
    vehicle = Column(String, nullable=True)

    deliveries = relationship("DeliveryRequest", back_populates="driver")

class CartItem(Base):
    __tablename__ = "cart_items"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    quantity = Column(Integer, default=1)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", backref="cart_items")
    product = relationship("Product")