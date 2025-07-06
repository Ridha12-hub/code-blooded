import json
import os

# Step 1: Load password
with open("caregiver_pass.txt", "r") as f:
    correct_password = f.read().strip()

# Step 2: Ask for password
entered = input("Enter caregiver password: ").strip()

if entered != correct_password:
    print("❌ Access Denied.")
    exit()

print("✅ Access Granted. Welcome, Caregiver!\n")

# Step 3: Load existing memory notes
if os.path.exists("memories.json"):
    with open("memories.json", "r") as f:
        memories = json.load(f)
else:
    memories = {}

# Step 4: Show options
while True:
    print("\n📋 Current People and Memory Notes:")
    for name, note in memories.items():
        print(f"  {name}: {note}")

    print("\nWhat would you like to do?")
    print("1. Edit a memory")
    print("2. Delete a person")
    print("3. Exit")

    choice = input("Choose (1/2/3): ").strip()

    if choice == "1":
        name = input("Enter name to edit: ").strip()
        if name in memories:
            new_note = input("Enter the new memory note: ").strip()
            memories[name] = new_note
            print(f"✅ Updated memory for {name}")
        else:
            print("❌ Name not found.")

    elif choice == "2":
        name = input("Enter name to delete: ").strip()
        if name in memories:
            confirm = input(f"Are you sure you want to delete {name}? (y/n): ").lower()
            if confirm == "y":
                del memories[name]
                face_path = f"known_faces/{name}.jpg"
                if os.path.exists(face_path):
                    os.remove(face_path)
                print(f"🗑️ {name} removed from system.")
        else:
            print("❌ Name not found.")

    elif choice == "3":
        break

    else:
        print("❓ Invalid choice.")

# Step 5: Save updated memories
with open("memories.json", "w") as f:
    json.dump(memories, f, indent=2)

print("📁 All changes saved. Exiting Caregiver Mode.")
