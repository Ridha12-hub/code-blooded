from fastapi import APIRouter

router = APIRouter()

REMINDERS = [
    {"text": "Take medicine", "time": "9:00 AM"},
    {"text": "Doctor appointment", "time": "4:00 PM"},
]

@router.get("/")
def get_reminders():
    return REMINDERS
