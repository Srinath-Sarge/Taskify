from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

db_url="mysql+pymysql://root:1234@localhost/taskify_db"

engine = create_engine(db_url)
SessionLocal= sessionmaker(bind=engine,autoflush=False)
Base = declarative_base()

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()