from flask import Flask, render_template, request, jsonify
import json
import os
import datetime


app = Flask(__name__)

@app.route("/")
def index():
    today = datetime.datetime.today().strftime("%A")

    if os.path.exists("reminders.json"):
        with open("reminders.json", "r") as f:
            reminders = json.load(f)
    else:
        reminders = {}

    today_reminders = reminders.get(today, [])

    if today_reminders:
        texts = [f"{r['time']} - {r['text']}" for r in today_reminders if not r.get("completed")]
        joined_texts = "; ".join(texts)
        message = joined_texts
    else:
        message = "No reminders for today."

    return render_template(
        "index.html",
        message=message,
        reminders=today_reminders,
        all_reminders=reminders
    )

@app.route("/save", methods=["POST"])
def save():
    reminders = request.get_json()

    with open("reminders.json", "w") as f:
        json.dump(reminders, f, indent=2)

    return jsonify({"status": "success"})

if __name__ == "__main__":
    app.run(debug=True)
