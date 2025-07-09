import tkinter as tk
from tkinter import ttk, filedialog
import matplotlib.pyplot as plt
from collections import Counter
import csv

def load_logs(file_path="emotion_log.txt"):
    try:
        with open(file_path, "r") as f:
            lines = f.readlines()
        entries = [line.strip().split(" - ")[-1].split(" ")[0] for line in lines]
        return lines, entries
    except FileNotFoundError:
        return [], []

def export_logs():
    file = filedialog.asksaveasfilename(defaultextension=".csv", filetypes=[("CSV", "*.csv")])
    if file:
        with open("emotion_log.txt", "r") as f:
            lines = f.readlines()
        with open(file, "w", newline='') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(["Timestamp", "Mood"])
            for line in lines:
                parts = line.strip().split(" - ")
                if len(parts) == 2:
                    timestamp, mood = parts
                    writer.writerow([timestamp, mood])
        tk.messagebox.showinfo("Export", "Logs exported successfully!")

def show_chart(emotions):
    counts = Counter(emotions)
    if not counts:
        return
    plt.figure(figsize=(6,6))
    plt.pie(counts.values(), labels=counts.keys(), autopct='%1.1f%%', startangle=140)
    plt.title("Mood Distribution")
    plt.show()

# UI setup
root = tk.Tk()
root.title("Caregiver Dashboard")
root.geometry("700x500")

log_box = tk.Text(root, wrap="none", height=20)
log_box.pack(padx=10, pady=10, fill="both", expand=True)

button_frame = tk.Frame(root)
button_frame.pack()

ttk.Button(button_frame, text="Refresh Logs", command=lambda: refresh()).pack(side="left", padx=10)
ttk.Button(button_frame, text="Show Mood Chart", command=lambda: show_chart(emotion_list)).pack(side="left", padx=10)
ttk.Button(button_frame, text="Export to CSV", command=export_logs).pack(side="left", padx=10)

def refresh():
    log_box.delete("1.0", tk.END)
    logs, emotions = load_logs()
    for line in logs:
        log_box.insert(tk.END, line)
    global emotion_list
    emotion_list = emotions

# Initial load
emotion_list = []
refresh()
root.mainloop()