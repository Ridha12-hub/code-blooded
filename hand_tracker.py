import cv2
import mediapipe as mp
import pyttsx3
import threading

# Initialize MediaPipe
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(max_num_hands=1)
mp_draw = mp.solutions.drawing_utils

# Initialize webcam
cap = cv2.VideoCapture(0)

# Initialize text-to-speech engine
engine = pyttsx3.init()
engine.setProperty('rate', 150)  # Adjust speed (100–200 is common)

# Prevent repeating voice
last_spoken = ""

# Function to get which fingers are up
def get_finger_status(landmarks):
    fingers = []

    # Thumb (landmark 4 vs 3 — on x-axis)
    if landmarks[4][1] > landmarks[3][1]:
        fingers.append(1)
    else:
        fingers.append(0)

    # Other fingers: tip.y < pip.y → finger is up
    tips = [8, 12, 16, 20]
    for tip in tips:
        if landmarks[tip][2] < landmarks[tip - 2][2]:
            fingers.append(1)
        else:
            fingers.append(0)

    return fingers

# Function to speak using TTS in background
def speak_text(text):
    engine.say(text)
    engine.runAndWait()

# Main loop
while True:
    success, img = cap.read()
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    results = hands.process(img_rgb)

    gesture = ""  # Default to no gesture

    if results.multi_hand_landmarks:
        for handLms in results.multi_hand_landmarks:
            mp_draw.draw_landmarks(img, handLms, mp_hands.HAND_CONNECTIONS)

            # Get (x, y) positions of all landmarks
            landmarks = []
            for id, lm in enumerate(handLms.landmark):
                h, w, c = img.shape
                cx, cy = int(lm.x * w), int(lm.y * h)
                landmarks.append((id, cx, cy))

            # Detect gestures
            if landmarks:
                fingers = get_finger_status(landmarks)

                if fingers == [1, 1, 1, 1, 1]:
                    gesture = "Hello ✋"
                elif fingers == [0, 0, 0, 0, 0]:
                    gesture = "Yes ✊"
                elif fingers == [0, 1, 0, 0, 0]:
                    gesture = "You 👉"
                elif fingers == [0, 1, 1, 0, 0]:
                    gesture = "Peace ✌️"

    # Display and speak gesture if it's new
    if gesture:
        cv2.putText(img, gesture, (50, 100),
                    cv2.FONT_HERSHEY_SIMPLEX, 1.5, (0, 255, 0), 3)

        if gesture != last_spoken:
            # Only speak the word (e.g., "Hello" from "Hello ✋")
            threading.Thread(target=speak_text, args=(gesture.split()[0],)).start()
            last_spoken = gesture

    # Show webcam
    cv2.imshow("Sign Detection", img)

    # Press 'q' to quit
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release resources
cap.release()
cv2.destroyAllWindows()