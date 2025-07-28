from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import face, emergency, reminder, emotion  # ✅ Import all routes

app = FastAPI()

# ✅ Allow frontend to connect (adjust origins in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Register API routers
app.include_router(face.router, prefix="/api/face")
app.include_router(emergency.router, prefix="/api/emergency")
app.include_router(reminder.router, prefix="/api/reminder")
app.include_router(emotion.router, prefix="/api/emotion")  # ✅ Added emotion API
