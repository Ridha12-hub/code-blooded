import cv2
from fer import FER
import datetime
import pyttsx3

# Initialize webcam
cap = cv2.VideoCapture(0)

# Voice setup
engine = pyttsx3.init()

def speak(text):
    engine.say(text)
    engine.runAndWait()

# Initialize FER detector
detector = FER(mtcnn=True)  # More accurate, slightly slower

# Mood responses
responses = {
    "happy": "You look happy today. That's wonderful!",
    "sad": "You seem a little down. I'm always here for you.",
    "angry": "You look angry. Try taking a deep breath with me.",
    "surprise": "You look surprised. Hope it's a good one!",
    "neutral": "You're looking calm today.",
    "fear": "You seem worried. You're not alone.",
    "disgust": "You seem uncomfortable. Want to talk about it?"
}

print("[INFO] Press ESC to exit.")

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Detect emotion
    results = detector.detect_emotions(frame)

    if results:
        top_result = results[0]
        emotions = top_result["emotions"]
        dominant_emotion = max(emotions, key=emotions.get)
        confidence = emotions[dominant_emotion] * 100
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        # Show emotion on screen
        cv2.putText(frame, f"{dominant_emotion} ({confidence:.2f}%)", (30, 40),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

        # Speak
        speak(responses.get(dominant_emotion, "How are you feeling today?"))

        # Log
        with open("emotion_log.txt", "a") as log:
            log.write(f"{timestamp} - {dominant_emotion} ({confidence:.2f}%)\n")

        # Wait a bit so it doesn't repeat too fast
        cv2.imshow("RecallMate - Mood Check-In", frame)
        cv2.waitKey(5000)
        break

    cv2.imshow("RecallMate - Mood Check-In", frame)
    if cv2.waitKey(1) & 0xFF == 27:  # ESC key
        break

cap.release()
cv2.destroyAllWindows()