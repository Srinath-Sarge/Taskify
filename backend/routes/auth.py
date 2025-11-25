from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models.user import User
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
from pydantic import BaseModel
import os

class LoginModel(BaseModel):
    username: str
    password: str

class SignupModel(BaseModel):
    username:str
    password:str
    is_admin:bool|None=None
    

router= APIRouter(prefix="/auth",tags=["Authentication"])
pwd_context=CryptContext(schemes=["bcrypt"],deprecated="auto")
SECRET_KEY=os.getenv("SECRET_KEY")
ALGORITHM=os.getenv("JWT_ALGORITHM","HS256")
exp_time=30

@router.get("/")
def check():
    return {"message":"Your inside Authentication Route"}

@router.post("/signup")
def signup(data: SignupModel, db: Session=Depends(get_db)):
    
    if db.query(User).filter(User.username==data.username).first():
        raise HTTPException(status_code=400, detail="User already exists")
    
    hashed_pass=pwd_context.hash(data.password)
    admin_status="pending" if data.is_admin else "none"
    
    new_user=User(username=data.username, 
                  password=hashed_pass, 
                  is_admin=False,
                  admin_request=admin_status)
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created successfully","Admin_request":admin_status}

@router.post("/login")
def login(data: LoginModel, db: Session=Depends(get_db)):
    user=db.query(User).filter(User.username==data.username).first()
    if not user:
        raise HTTPException(status_code=400, detail="User doesn't exist")
    elif not pwd_context.verify(data.password, user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect password")
    
    token=create_tokens({"sub": data.username, "is_admin": user.is_admin}, timedelta(minutes=exp_time))
    return {"access_token": token, "token_type": "bearer"}


def create_tokens(data: dict, exp: timedelta):
    payload = data.copy()
    payload.update({"exp": datetime.utcnow() + exp})
    token=jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token

@router.post("/refresh")
def refresh(token: str):
    try:
        payload=jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username=payload.get("sub")
        if not username:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Token expired")
    
    new_token=create_tokens({"sub": username}, timedelta(minutes=exp_time))
    return {"access_token": new_token, "token_type": "bearer"}
