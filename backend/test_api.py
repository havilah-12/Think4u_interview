from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from create_db import SessionLocal

router = APIRouter()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/users/")
def get_users(db: Session = Depends(get_db)):
    try:
        result = db.execute(text("SELECT * FROM users LIMIT 100")).fetchall()
        return [dict(row._mapping) for row in result]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/orders/")
def get_orders(db: Session = Depends(get_db)):
    try:
        result = db.execute(text("SELECT * FROM orders LIMIT 100")).fetchall()
        return [dict(row._mapping) for row in result]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/inventory/")
def get_inventory(db: Session = Depends(get_db)):
    try:
        result = db.execute(text("SELECT * FROM inventory LIMIT 100")).fetchall()
        return [dict(row._mapping) for row in result]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
