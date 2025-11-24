from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__="users"

    id=Column(Integer,primary_key=True,index=True)
    username=Column(String(100),unique=True)
    password=Column(String(255))
    is_admin=Column(Boolean,default=False)
    admin_request=Column(String(20), default="none")

    assigned_tasks=relationship("Task", foreign_keys="[Task.assigner_id]", back_populates="assigner")
    tasks_assigned_to=relationship("Task", foreign_keys="[Task.assignee_id]", back_populates="assignee")