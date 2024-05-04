from sqlalchemy import Column, TIMESTAMP, VARCHAR, INT, TEXT, Date, DECIMAL

from datetime import datetime

from database import Base

class Book(Base):
    __tablename__ = 'books'

    id = Column(INT, primary_key=True, autoincrement=True)
    title = Column(VARCHAR(225), index=True)
    year = Column(INT)
    price = Column(DECIMAL, nullable=False)
    date_released = Column(Date)
    description = Column(TEXT, nullable=True)
    created_at = Column(TIMESTAMP, default=datetime.now)
    updated_at = Column(TIMESTAMP, default=datetime.now, onupdate=datetime.now)
