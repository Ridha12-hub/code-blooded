from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
from deepface import DeepFace
import numpy as np
import cv2

router = APIRouter()

@router.post("/detect")
async def detect_emotion(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        nparr = np.frombuffer(contents, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        result = DeepFace.analyze(img, actions=["emotion"], enforce_detection=False)

        return {
            "dominant_emotion": result[0]["dominant_emotion"],
            "emotions": result[0]["emotion"]
        }

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
