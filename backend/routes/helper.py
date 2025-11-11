from fastapi import Depends, HTTPException, status
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from database import get_db
from models.user import User

SECRET_KEY="1234"
ALGORITHM="HS256"

def get_current_user(token: str,db:Session=Depends(get_db)):
    try:
        payload=jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username=payload.get("sub")
        if not username:
            raise HTTPException(status_code=401,detail="Invalid Token")
    except:
        raise HTTPException(status_code=401,detail="Invalid Token")
    
    user=db.query(User).filter(User.username==username).first()
    if not user:
        raise HTTPException(status_code=401,detail="User Not Found!!!")
    return user