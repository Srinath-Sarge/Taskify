from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.user import User
from routes.helper import get_current_user

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/all")
def get_all_users(db: Session = Depends(get_db), c_user: User = Depends(get_current_user)):
    if not c_user.is_admin:
        raise HTTPException(status_code=403, detail="Only admins can view users.")

    users = db.query(User).all()
    return [
        {"id": u.id, "username": u.username, "is_admin": u.is_admin}
        for u in users
    ]

@router.put("/set_admin/{user_id}")
def set_admin_status(
    user_id: int,
    admin: bool,
    db: Session = Depends(get_db),
    c_user: User = Depends(get_current_user)
):

    if not c_user.is_admin:
        raise HTTPException(status_code=403, detail="Only admins can modify users.")

    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    user.is_admin = admin
    db.commit()
    db.refresh(user)

    return {
        "message": "Role updated successfully",
        "user_id": user.id,
        "new_admin_status": user.is_admin,
    }


@router.delete("/{user_id}")
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    c_user: User = Depends(get_current_user)
):

    if not c_user.is_admin:
        raise HTTPException(status_code=403, detail="Only admins can delete users.")

    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    if c_user.id == user.id:
        raise HTTPException(
            status_code=400,
            detail="You cannot delete your own admin account."
        )

    db.delete(user)
    db.commit()

    return {"message": "User deleted successfully", "deleted_user_id": user_id}

@router.get("/admin/requests")
def get_admin_requests(db: Session = Depends(get_db), c_user: User = Depends(get_current_user)):
    if not c_user.is_admin:
        raise HTTPException(status_code=403, detail="Only admins can view admin requests.")

    requests = db.query(User).filter(User.admin_request == "pending").all()

    return [
        {"id": u.id, "username": u.username, "requested_admin": True}
        for u in requests
    ]

@router.put("/admin/requests/{user_id}")
def handle_admin_request(
    user_id: int,
    action: str,
    db: Session = Depends(get_db),
    c_user: User = Depends(get_current_user)
):

    if not c_user.is_admin:
        raise HTTPException(status_code=403, detail="Only admins can modify admin requests.")

    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    if action not in ["approve", "reject"]:
        raise HTTPException(status_code=400, detail="Action must be 'approve' or 'reject'.")

    if action == "approve":
        user.is_admin = True
        user.admin_request = "approved"
        message = "Admin access granted"

    elif action == "reject":
        user.is_admin = False
        user.admin_request = "rejected"
        message = "Admin request rejected"

    db.commit()

    return {
        "message": message,
        "user_id": user.id,
        "new_admin_status": user.is_admin,
        "request_status": user.admin_request
    }

