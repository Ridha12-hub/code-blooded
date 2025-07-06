from deepface import DeepFace
import cv2
import os

# Path to known faces
db_path = "known_faces"

# Load webcam
cap = cv2.VideoCapture(0)
print("[INFO] Press ESC to quit")

while True:
    ret, frame = cap.read()
    if not ret:
        break

    try:
        result = DeepFace.find(img_path=frame, db_path=db_path, model_name="SFace", enforce_detection=False)

        if len(result) > 0 and len(result[0]) > 0:
            identity_path = result[0]['identity'][0]
            name = os.path.basename(os.path.dirname(identity_path))
            confidence = result[0]['distance'][0]
            cv2.putText(frame, f"{name} ({1 - confidence:.2f})", (30, 30),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
        else:
            cv2.putText(frame, "Unknown", (30, 30),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

    except Exception as e:
        print("Error:", e)

    cv2.imshow("DeepFace Recognition", frame)
    if cv2.waitKey(1) & 0xFF == 27:  # ESC
        break

cap.release()
cv2.destroyAllWindows()
