from fastapi import FastAPI
from database import Base, engine
from models import user
from routes import auth,tasks



app = FastAPI(title="Taskify - Task Management System")
Base.metadata.create_all(bind=engine)
app.include_router(auth.router)
app.include_router(tasks.router)

@app.get("/")
def home():
    return {"message": "Welcome to Taskify API"}

@app.get("/user")
def greet(name: str):
    return {"Name":name}