from pydantic import BaseModel
from datetime import date
from typing import Optional

class BookBase(BaseModel):
    title: str
    year: int
    price: float
    date_released: Optional[date] = None
    description: Optional[str] = None

    class Config:
       orm_mode = True

class BookCreate(BookBase):
    pass

class BookUpdate(BookBase):
    pass

class Book(BookBase):
    id: int

    class Config:
        orm_mode = True