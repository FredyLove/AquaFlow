# app/main.py
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, schemas, crud
from .database import engine, SessionLocal, Base
from fastapi.security import OAuth2PasswordRequestForm
from .auth import create_access_token
from .schemas import Token
from app.routes import user, product, delivery, reviews, bookmarks, notifications, messages, dashboard, driver, admin
from app.database import get_db

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(user.router)
app.include_router(product.router)
app.include_router(delivery.router)
app.include_router(reviews.router)
app.include_router(bookmarks.router)
app.include_router(notifications.router)
app.include_router(messages.router)
app.include_router(dashboard.router)
app.include_router(driver.router)
app.include_router(admin.router)

@app.post("/register", response_model=schemas.UserOut)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db, user)


@app.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}
