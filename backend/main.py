from fastapi import FastAPI, HTTPException, Depends, status
from typing import Annotated
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session
from schema import BookCreate, Book, BookUpdate

# Create a FastAPI app
app = FastAPI()

# Dependency to get a database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create the tables in the database
models.Base.metadata.create_all(bind=engine)

db_dependency = Annotated[Session, Depends(get_db)]

@app.get('/books/', response_model=list[Book])
def read_books(db: db_dependency):
    return db.query(models.Book).all()

# Read a book by ID
@app.get('/books/{book_id}', response_model=Book, status_code=status.HTTP_200_OK)
async def read_book(book_id: int, db: db_dependency):
    book = db.query(models.Book).filter(models.Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Book not found")
    return book

# Create a book
@app.post('/books/', status_code=status.HTTP_201_CREATED)
async def create_book(new_book: BookCreate, db: db_dependency):
    db_book = models.Book(**new_book.model_dump())
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book

# Update a book by ID
@app.put('/books/{book_id}', response_model=Book, status_code=status.HTTP_200_OK)
async def update_book(book_id: int, updated_book: BookUpdate, db: db_dependency):
    db_book = db.query(models.Book).filter(models.Book.id == book_id).first()
    if not db_book:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Book not found")
    
    # Update only the provided fields
    for field, value in updated_book.dict(exclude_unset=True).items():
        setattr(db_book, field, value)
    
    db.commit()
    db.refresh(db_book)
    return db_book


# Delete a book by ID
@app.delete('/books/{book_id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_book(book_id: int, db: db_dependency):
    db_book = db.query(models.Book).filter(models.Book.id == book_id).first()
    if not db_book:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Book not found")
    
    db.delete(db_book)
    db.commit()
    return