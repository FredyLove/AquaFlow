# app/schemas.py
from datetime import datetime
from pydantic import BaseModel, EmailStr, conint
from typing import Optional
from enum import Enum

from app.models import DeliveryStage

# User

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    role: str

class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr
    role: str
    is_active: bool

    class Config:
        orm_mode = True

class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    
    
# Token

class Token(BaseModel):
    access_token: str
    token_type: str
    role: str  # ✅ Add this
    username: str  # (optional)

class TokenData(BaseModel):
    email: str | None = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Products
class ProductBase(BaseModel):
    name: str
    description: str | None = None
    image: Optional[str] = None
    category: Optional[str] = None
    isPopular: Optional[bool] = False
    rating: Optional[float] = 0.0
    price: float

class ProductCreate(ProductBase):
    quantity: int

class ProductUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    image: Optional[str] = None
    category: Optional[str] = None
    isPopular: Optional[bool] = False
    rating: Optional[float] = 0.0
    quantity: int | None = None
    price: float | None = None

class ProductOut(ProductBase):
    id: int
    quantity: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


# Drivers 

class DriverCreate(BaseModel):
    name: str
    phone: str
    vehicle: Optional[str]

class DriverOut(BaseModel):
    id: int
    name: str
    phone: str
    vehicle: Optional[str]

    class Config:
        from_attributes = True

   
   
   
# Deliveries

class DeliveryStatus(str, Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"

class DeliveryTrackingUpdate(BaseModel):
    stage: DeliveryStage
    driver_name: Optional[str] = None
    driver_phone: Optional[str] = None
    driver_vehicle: Optional[str] = None
    
class DeliveryStatusUpdate(BaseModel):
    status: DeliveryStatus

class DeliveryRequestCreate(BaseModel):
    product_id: int
    address: str
    quantity: int

class DeliveryRequestOut(BaseModel):
    id: int
    user_id: int
    product_id: int
    quantity: int
    address: str
    status: DeliveryStatus
    stage: DeliveryStage 
    driver: Optional[DriverOut]
    is_locked: bool
    created_at: datetime
    latitude: Optional[float]
    longitude: Optional[float]
    estimated_delivery_time: Optional[str]


    class Config:
        from_attributes = True

class UnlockRequest(BaseModel):
    delivery_id: int
    
# Reviews

class ReviewBase(BaseModel):
    rating: conint(ge=1, le=5)  # type: ignore # restrict to 1-5
    comment: Optional[str] = None

class ReviewCreate(ReviewBase):
    product_id: int
    rating: int
    comment: str

class ReviewUpdate(ReviewBase):
    pass

class ReviewOut(ReviewBase):
    id: int
    user_id: int
    product_id: int
    rating:int
    comment: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
        
# Bookmark

class BookmarkAction(BaseModel):
    product_id: int


class BookmarkedProduct(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    image: Optional[str] = None
    price: float
    category: Optional[str] = None
    isPopular: bool
    rating: float

    class Config:
        from_attributes = True
        
# Notifications

class NotificationBase(BaseModel):
    message: str

class NotificationCreate(NotificationBase):
    user_id: int

class NotificationOut(NotificationBase):
    id: int
    is_read: bool
    message: str
    created_at: datetime

    class Config:
        from_attributes = True
        
# Message


class MessageCreate(BaseModel):
    subject: str
    content: str

class MessageOut(BaseModel):
    id: int
    user_id: int
    subject: str
    content: str
    response: Optional[str]
    created_at: datetime
    responded_at: Optional[datetime]

    class Config:
        from_attributes = True


# Cart

class CartItemBase(BaseModel):
    product_id: int
    quantity: int = 1

class CartItemCreate(CartItemBase):
    product_id: int
    quantity: int = 1

class CartItemOut(BaseModel):
    id: int
    product_id: int
    quantity: int
    created_at: datetime
    product: ProductOut

    class Config:
        orm_mode = True