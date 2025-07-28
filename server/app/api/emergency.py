from fastapi import APIRouter
import smtplib

router = APIRouter()

@router.post("/trigger")
def trigger_emergency():
    # Placeholder: Email caregiver
    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login("your_email@gmail.com", "your_password")
    server.sendmail("your_email@gmail.com", "caregiver@gmail.com", "Emergency Alert!")
    server.quit()
    return {"status": "alert sent"}
