from sqlalchemy import Column, Integer, String, Date, Enum, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from database import Base
import enum

class StatusEnum(enum.Enum):
    pending = "pending"
    in_progress = "in_progress"
    completed = "completed"
    cancelled = "cancelled"

class PriorityEnum(enum.Enum):
    low="low"
    medium="medium"
    high="high"

class Task(Base):
    __tablename__ = "tasks"

    id= Column(Integer, primary_key=True, index=True)
    title= Column(String(250), nullable=False)
    description= Column(String(600), nullable=False)
    status= Column(Enum(StatusEnum), default=StatusEnum.pending) 
    priority= Column(Enum(PriorityEnum), default=PriorityEnum.medium)
    due_date= Column(Date, nullable=False)
    is_overdue=Column(Boolean, default=False)
    
    assigner_id= Column(Integer, ForeignKey("users.id"), nullable=True)
    assignee_id= Column(Integer, ForeignKey("users.id"), nullable=True)
    parent_id = Column(Integer, ForeignKey("tasks.id"), nullable=True)
    parent=relationship("Task", remote_side="Task.id",backref="subtasks")
    
    assigner=relationship("User", foreign_keys=[assigner_id], back_populates="assigned_tasks")
    assignee=relationship("User", foreign_keys=[assignee_id], back_populates="tasks_assigned_to")