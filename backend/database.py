from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

db_url=os.getenv("DATABASE_URL")
if not db_url:
    raise Exception("DATABASE_URL env is missing")

engine = create_engine(db_url)
SessionLocal= sessionmaker(bind=engine,autoflush=False)
Base = declarative_base()

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()