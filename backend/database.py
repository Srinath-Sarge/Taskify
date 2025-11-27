from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

db_url=os.getenv("DATABASE_URL")
if not db_url:
    raise Exception("DATABASE_URL env is missing")

engine = create_engine(
    db_url,
    pool_pre_ping=True,
    pool_recycle=280,
    pool_size=5,
    max_overflow=10)
SessionLocal= sessionmaker(
    bind=engine,
    autoflush=False,
    auto_commit=False)
Base = declarative_base()

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()