from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.tasks import Task, StatusEnum, PriorityEnum
from models.user import User
from datetime import date

router= APIRouter(prefix="/tasks", tags=["Tasks"])

@router.post("/")
def create_task(title: str,
                 description: str, 
                 due_date: date, 
                 priority: PriorityEnum= PriorityEnum.medium,
                 assigner_id: int = None, 
                 db: Session=Depends(get_db)):
    new_task= Task(title=title,
                   description=description,
                   priority=priority,
                   due_date=due_date,
                   assigner_id=assigner_id)
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return {"message":"Task Created Succesfully","task":new_task.id, "task":new_task.title}

@router.get("/")
def get_tasks(status: StatusEnum= None, 
              priority: PriorityEnum = None, 
              db: Session= Depends(get_db)):
    query=db.query(Task)
    if status:
        query=query.filter(Task.status==status)
    if priority:
        query=query.filter(Task.priority==priority)
    return query.all()

@router.put("/{task_id}")
def update_task(task_id: int,
                status: StatusEnum= None,
                priority: PriorityEnum= None,
                db: Session= Depends(get_db)):
    task=db.query(Task).filter(Task.id==task_id).first()
    if not task:
        raise HTTPException(status_code=404,details="Task not Found!!!")
    if status:
        task.status=status
    if priority:
        task.priority=priority
    db.commit()
    db.refresh(task)
    return {"message":"Task updated Successfully","task":task.id}

@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session= Depends(get_db)):
    task=db.query(Task).filter(Task.id==task_id).first()
    if not task:
        raise HTTPException(status_code=404,details="Task not Found!!!")
    tid,tname=task.id,task.title
    db.delete(task)
    db.commit()
    return {"message":"Task deleted successfully","task_id":tid,"task_name":tname}