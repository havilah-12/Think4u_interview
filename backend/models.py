from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class DistributionCenter(BaseModel):
    id: int
    name: str
    latitude: float
    longitude: float

class Product(BaseModel):
    id: int
    name: str
    brand: str
    category: str
    department: str
    sku: str
    retail_price: float

class User(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    phone_number: str
    created_at: datetime

class Inventory(BaseModel):
    id: int
    product_id: int
    created_at: datetime
    sold_at: Optional[datetime]
    cost: float
    product_category: str
    product_name: str
    product_brand: str
    product_retail_price: float
    product_department: str
    product_sku: str
    product_distribution_center_id: int

class Order(BaseModel):
    id: int
    user_id: int
    created_at: datetime
    order_number: str
    status: str
    total_amount: float

class OrderItem(BaseModel):
    id: int
    order_id: int
    product_id: int
    quantity: int
    price: float
