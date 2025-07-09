import cv2        # lets us use the webcam
import json       # lets us read/write memories.json
import os         # lets us work with files/folders

# ---------- A. make sure folders/files exist ----------
if not os.path.exists('known_faces'):
    os.makedirs('known_faces')

if os.path.exists('memories.json'):
    with open('memories.json', 'r') as f:
        memories = json.load(f)   # load existing notes
else:
    memories = {}                 # start fresh if file missing

# ---------- B. ask the caregiver for input ----------
name = input("Enter the person's name: ").strip()
memory_note = input(f"What memory should be recalled for {name}? ").strip()

# ---------- C. take a photo with webcam ----------
cam = cv2.VideoCapture(0)  # open default camera (index 0)

print("\n📸  A live camera window just opened.")
print("    • Look at the camera.")
print("    • Press SPACE to SAVE the photo.")
print("    • Press ESC if you want to cancel.\n")

while True:
    ret, frame = cam.read()       # grab a single video frame
    cv2.imshow("Capture Face", frame)  # show it in a window
    key = cv2.waitKey(1) & 0xFF        # check which key is pressed

    if key == 27:     # 27 = ESC key → cancel everything
        print("Cancelled. No data saved.")
        cam.release()
        cv2.destroyAllWindows()
        exit()

    if key == 32:     # 32 = SPACE bar → capture frame
        filename = f'known_faces/{name}.jpg'
        cv2.imwrite(filename, frame)   # save photo
        print(f"Saved photo as {filename}")
        break

cam.release()
cv2.destroyAllWindows()

# ---------- D. store the memory note ----------
memories[name] = memory_note
with open('memories.json', 'w') as f:
    json.dump(memories, f, indent=2)

print(f"Memory saved!\n{name}: \"{memory_note}\"\n")
print("You can now close this window.")
