from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from database import get_db
from models.tasks import Task, StatusEnum, PriorityEnum
from models.user import User
from routes.helper import get_current_user
from datetime import date

router= APIRouter(prefix="/tasks", tags=["Tasks"])

@router.post("/")
def create_task(title: str,
                 description: str, 
                 due_date: date, 
                 priority: PriorityEnum= PriorityEnum.medium,
                 assignee_id: int | None=None,
                 dependency_id: int | None=None, 
                 db: Session=Depends(get_db),
                 c_user: Session=Depends(get_current_user)):
    if assignee_id:
        assignee=db.query(User).filter(User.id==assignee_id).first()
        if not assignee:
            raise HTTPException(status_code=404, detail="Assignee ID can't be Found.")
        elif assignee and assignee.id==c_user.id:
            assignee=c_user
        elif assignee and assignee.id!=c_user.id and not c_user.is_admin:
            raise HTTPException(status_code=403, detail="Only admins can asign task to others")
    else:
        assignee=c_user
    
    
    new_task= Task(title=title,
                   description=description,
                   priority=priority,
                   due_date=due_date,
                   assigner_id=c_user.id,
                   assignee_id=assignee.id,
                   dependency_id=dependency_id)
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return {"message":"Task Created Succesfully","task":new_task.id, "task":new_task.title,"task assigned_to":assignee.id}

@router.get("/")
def get_tasks(
    status: Optional[str] = Query(None),
    priority: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    c_user: Session = Depends(get_current_user)
):

    query = db.query(Task)
    if c_user.is_admin:
        query = query.filter(Task.assigner_id == c_user.id)
    else:
        query = query.filter(Task.assignee_id == c_user.id)

    if status:
        try:
            status_enum = StatusEnum(status)
            query = query.filter(Task.status == status_enum)
        except:
            pass  

    if priority:
        try:
            priority_enum = PriorityEnum(priority)
            query = query.filter(Task.priority == priority_enum)
        except:
            pass

    return query.all()

@router.put("/{task_id}")
def update_task(task_id: int,
                status: StatusEnum= None,
                priority: PriorityEnum= None,
                db: Session= Depends(get_db),
                c_user: Session=Depends(get_current_user)):
    task=db.query(Task).filter(Task.id==task_id).first()
    if not task:
        raise HTTPException(status_code=404,detail="Task not Found!!!")
    
    if task.assigner_id!=c_user.id and task.assignee_id!=c_user.id and not c_user.is_admin:
        raise HTTPException(status_code=403,detail="Not Authorized to update this Task...")
    if task.dependency_id:
            dep_task=db.query(Task).filter(Task.id==task.dependency_id).first()
            if dep_task and dep_task.status==StatusEnum.cancelled:
                task.status=StatusEnum.cancelled
                db.commit()
                db.refresh(task)
                raise HTTPException(status_code=400, detail=f"Its dependency task is cancelled... so cancelling this task.")

    if status:
        if dep_task and dep_task.status!=StatusEnum.completed:
                raise HTTPException(status_code=400, detail=f"Cannot modify this task before completing its dependency task... Task id:{dep_task.id},Task Name:{dep_task.title}")
        task.status=status
    if priority:
        task.priority=priority
    db.commit()
    db.refresh(task)
    return {"message":"Task updated Successfully","task":task.id}

@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session= Depends(get_db), c_user: Session=Depends(get_current_user)):
    if not c_user.is_admin:
        raise HTTPException(status_code=403, detail="Admins are only allowed to delete tasks...")
    task=db.query(Task).filter(Task.id==task_id).first()
    if not task:
        raise HTTPException(status_code=404,detail="Task not Found!!!")
    

    dep_tasks=(db.query(Task).filter(Task.dependency_id==task.id).all())
    if dep_tasks:
        for dt in dep_tasks:
            delete_task(dt.id)

    tid,tname=task.id,task.title
    db.delete(task)
    db.commit()
    return {"message":"Task deleted successfully","task_id":tid,"task_name":tname}