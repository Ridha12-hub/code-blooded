from fastapi import APIRouter, File, UploadFile
from fastapi.responses import JSONResponse
import cv2
import numpy as np
import mediapipe as mp

router = APIRouter()
mp_face_detection = mp.solutions.face_detection

@router.post("/detect")
async def detect_faces(file: UploadFile = File(...)):
    try:
        # Read uploaded image
        contents = await file.read()
        nparr = np.frombuffer(contents, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # Run Mediapipe face detection
        with mp_face_detection.FaceDetection(model_selection=1, min_detection_confidence=0.5) as detector:
            results = detector.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))

            boxes = []
            if results.detections:
                for detection in results.detections:
                    bbox = detection.location_data.relative_bounding_box
                    h, w, _ = image.shape
                    box = {
                        "x": int(bbox.xmin * w),
                        "y": int(bbox.ymin * h),
                        "width": int(bbox.width * w),
                        "height": int(bbox.height * h),
                        "score": float(detection.score[0])
                    }
                    boxes.append(box)

        return {"faces": boxes}

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
