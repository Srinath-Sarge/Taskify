from fastapi import Depends, HTTPException, status
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from database import get_db
from models.user import User
from fastapi.security import OAuth2PasswordBearer
import os

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")
SECRET_KEY=os.getenv("JWT_SECRET")
ALGORITHM=os.getenv("JWT_ALGORITHM","HS256")

def get_current_user(token: str=Depends(oauth2_scheme),db:Session=Depends(get_db)):
    try:
        payload=jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str=payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401,detail="Invalid Token")
    
        user=db.query(User).filter(User.username==username).first()
        if not user:
            raise HTTPException(status_code=401,detail="User Not Found!!!")
        return user
    except:
        raise HTTPException(status_code=401,detail="Invalid Authentication")