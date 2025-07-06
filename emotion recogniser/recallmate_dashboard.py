import cv2
import datetime
import tkinter as tk
from PIL import Image, ImageTk
from fer import FER
import pyttsx3
import threading

# Setup voice
engine = pyttsx3.init()
def speak(text):
    engine.say(text)
    engine.runAndWait()

# Mood responses
responses = {
    "happy": "You look happy today. That's wonderful!",
    "sad": "You seem a little down. I'm always here for you.",
    "angry": "You look angry. Let's calm down together.",
    "surprise": "You look surprised. Hope it's a good one!",
    "neutral": "You're looking calm today.",
    "fear": "You seem worried. You're not alone.",
    "disgust": "You seem uncomfortable. Want to talk about it?"
}

# Initialize webcam and emotion detector
cap = cv2.VideoCapture(0)
detector = FER(mtcnn=True)

# Initialize GUI
root = tk.Tk()
root.title("RecallMate - Mood Dashboard")
root.geometry("800x600")

# Webcam frame
video_label = tk.Label(root)
video_label.pack()

# Mood label
mood_var = tk.StringVar()
mood_label = tk.Label(root, textvariable=mood_var, font=("Helvetica", 20))
mood_label.pack(pady=10)

# Log area
log_text = tk.Text(root, height=10, width=80)
log_text.pack()

def update():
    ret, frame = cap.read()
    if not ret:
        return

    # Emotion detection
    results = detector.detect_emotions(frame)
    emotion_text = "Detecting..."
    if results:
        emotions = results[0]["emotions"]
        dominant = max(emotions, key=emotions.get)
        confidence = emotions[dominant] * 100
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        emotion_text = f"{dominant.capitalize()} ({confidence:.2f}%)"

        # Display and speak once
        mood_var.set("Mood: " + emotion_text)
        response = responses.get(dominant, "How are you feeling today?")
        threading.Thread(target=speak, args=(response,), daemon=True).start()

        # Log to file and GUI
        log_entry = f"{timestamp} - {emotion_text}\n"
        with open("emotion_log.txt", "a") as f:
            f.write(log_entry)
        log_text.insert(tk.END, log_entry)
        log_text.see(tk.END)

    # Show frame
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    img = Image.fromarray(rgb)
    imgtk = ImageTk.PhotoImage(image=img)
    video_label.imgtk = imgtk
    video_label.configure(image=imgtk)

    root.after(5000, update)  # Detect every 5 seconds

# Start loop
update()
root.mainloop()
cap.release()