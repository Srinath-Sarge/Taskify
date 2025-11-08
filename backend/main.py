from fastapi import FastAPI
# from models import task 
from database import engine, Base

app = FastAPI(title="Taskify - Task Management System")

Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {"message": "Welcome to Taskify API"}
