from apscheduler.schedulers.background import BackgroundScheduler
from datetime import date
from sqlalchemy.orm import Session
from database import SessionLocal
from models.tasks import StatusEnum, Task

def check_overdue_tasks():
    db=SessionLocal()
    try:
        today = date.today()
        tasks=(db.query(Task).filter(Task.due_date<today,
                                     Task.status!=StatusEnum.completed,
                                     Task.status!=StatusEnum.cancelled,
                                     Task.status!=StatusEnum.overdue).all())
        for task in tasks:
            task.status=StatusEnum.overdue
        db.commit()
        print(f"Updated {len(tasks)} tasks to overdue status...")
    except Exception as e:
        db.rollback()
        print(f"Error updating overdue tasks: {e}")
    finally:
        db.close()

def start_scheduler():
    scheduler=BackgroundScheduler()
    scheduler.add_job(check_overdue_tasks, 'interval', seconds=10)
    scheduler.start()
    print("Scheduler started to check for overdue...")
    
