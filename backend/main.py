from fastapi import FastAPI
from database import Base, engine
from models import user
from routes import auth,tasks,users
from schedules.overdue import start_scheduler
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI(title="Taskify - Task Management System")
Base.metadata.create_all(bind=engine)
app.include_router(auth.router)
app.include_router(tasks.router)
app.include_router(users.router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
start_scheduler()

@app.get("/")
def home():
    return {"message": "Welcome to Taskify API"}

@app.get("/user")
def greet(name: str):
    return {"Name":name}


import os 
import uvicorn

if __name__=="__main__":
    port =int(os.environ.get("PORT",8000))
    uvicorn.run("main:app", host="0.0.0.0",port=port)