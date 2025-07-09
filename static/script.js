document.addEventListener("DOMContentLoaded", () => {
    const listDiv = document.getElementById("reminder-list");
    const addBtn = document.getElementById("add-btn");

    let reminders = window.reminders || {};
    const weekdays = [
        "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday", "Sunday"
    ];

    const hours = Array.from({ length: 24 }, (_, i) =>
        i.toString().padStart(2, "0")
    );

    const minutes = Array.from({ length: 60 }, (_, i) =>
        i.toString().padStart(2, "0")
    );

    function renderReminders(remindersObj) {
        listDiv.innerHTML = "";

        for (let day in remindersObj) {
            remindersObj[day].forEach((r, index) => {
                const [hourVal, minuteVal] = r.time.split(":");

                const div = document.createElement("div");
                div.className = "reminder-item";

                if (r.completed) {
                    div.style.opacity = 0.5;
                }

                let daySelect = `<select data-original-day="${day}" class="day-select" data-day="${day}" data-index="${index}">`;
                weekdays.forEach(wd => {
                    const selected = wd === day ? "selected" : "";
                    daySelect += `<option value="${wd}" ${selected}>${wd}</option>`;
                });
                daySelect += `</select>`;

                let hourSelect = `<select class="hour-select" data-day="${day}" data-index="${index}">`;
                hours.forEach(h => {
                    const selected = h === hourVal ? "selected" : "";
                    hourSelect += `<option value="${h}" ${selected}>${h}</option>`;
                });
                hourSelect += `</select>`;

                let minuteSelect = `<select class="minute-select" data-day="${day}" data-index="${index}">`;
                minutes.forEach(m => {
                    const selected = m === minuteVal ? "selected" : "";
                    minuteSelect += `<option value="${m}" ${selected}>${m}</option>`;
                });
                minuteSelect += `</select>`;

                div.innerHTML = `
                    ${daySelect}
                    ${hourSelect} : ${minuteSelect}
                    <input type="text" value="${r.text}" data-day="${day}" data-index="${index}" class="text-input" size="40" ${r.completed ? "disabled" : ""}/>
                    ${r.completed ? `<span class="tick-mark">✔️</span>` : ""}
                    <button data-day="${day}" data-index="${index}" class="delete-btn">Delete</button>
                    ${r.completed ? "" : `<button data-day="${day}" data-index="${index}" class="complete-btn">Mark Completed</button>`}
                `;

                listDiv.appendChild(div);
            });
        }
    }

    addBtn.addEventListener("click", () => {
        const overlay = document.createElement("div");
        overlay.className = "modal-overlay";

        const modal = document.createElement("div");
        modal.className = "modal";

        modal.innerHTML = `
            <h3>Add New Reminder</h3>
            <label>Day:</label>
            <select id="new-day-select">
                ${weekdays.map(day => `<option value="${day}">${day}</option>`).join("")}
            </select>
            <br/><br/>
            <label>Hour:</label>
            <select id="new-hour-select">
                ${hours.map(h => `<option value="${h}">${h}</option>`).join("")}
            </select>
            :
            <select id="new-minute-select">
                ${minutes.map(m => `<option value="${m}">${m}</option>`).join("")}
            </select>
            <br/><br/>
            <label>Reminder Text:</label>
            <input type="text" id="new-text-input" value="New reminder." size="40"/>
            <br/><br/>
            <button id="confirm-new-reminder">OK</button>
            <button id="close-modal">Close</button>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        document.getElementById("close-modal").addEventListener("click", () => {
            document.body.removeChild(overlay);
        });

        document.getElementById("confirm-new-reminder").addEventListener("click", () => {
            const day = document.getElementById("new-day-select").value;
            const hour = document.getElementById("new-hour-select").value;
            const minute = document.getElementById("new-minute-select").value;
            const time = `${hour}:${minute}`;
            const text = document.getElementById("new-text-input").value;

            if (!reminders[day]) {
                reminders[day] = [];
            }

            reminders[day].push({
                time: time,
                text: text,
                completed: false,
                lastAlertHour: null
            });

            saveReminders();
            renderReminders(reminders);

            document.body.removeChild(overlay);
        });
    });

    listDiv.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const day = e.target.dataset.day;
            const index = e.target.dataset.index;
            if (confirm(`Delete this reminder for ${day}?`)) {
                reminders[day].splice(index, 1);
                if (reminders[day].length === 0) {
                    delete reminders[day];
                }
                saveReminders();
                renderReminders(reminders);
            }
        }

        if (e.target.classList.contains("complete-btn")) {
            const day = e.target.dataset.day;
            const index = e.target.dataset.index;
            reminders[day][index].completed = true;
            saveReminders();
            renderReminders(reminders);
        }
    });

    listDiv.addEventListener("input", (e) => {
        const target = e.target;
        if (target.classList.contains("text-input")) {
            const day = target.dataset.day;
            const index = target.dataset.index;
            reminders[day][index].text = target.value;
            saveReminders();
        }
    });

    listDiv.addEventListener("change", (e) => {
        const target = e.target;

        if (target.classList.contains("day-select")) {
            const oldDay = target.dataset.originalDay;
            const newDay = target.value;
            const index = target.dataset.index;

            if (!reminders[newDay]) {
                reminders[newDay] = [];
            }
            reminders[newDay].push(reminders[oldDay][index]);
            reminders[oldDay].splice(index, 1);

            if (reminders[oldDay].length === 0) {
                delete reminders[oldDay];
            }

            saveReminders();
            renderReminders(reminders);
        }

        if (target.classList.contains("hour-select") || target.classList.contains("minute-select")) {
            const day = target.dataset.day;
            const index = target.dataset.index;

            const hourSelect = document.querySelector(`.hour-select[data-day="${day}"][data-index="${index}"]`);
            const minuteSelect = document.querySelector(`.minute-select[data-day="${day}"][data-index="${index}"]`);
            const hour = hourSelect.value;
            const minute = minuteSelect.value;

            reminders[day][index].time = `${hour}:${minute}`;
            saveReminders();
        }
    });

    function saveReminders() {
        fetch("/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reminders),
        });
    }

    function speak(text) {
        if ("speechSynthesis" in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1;
            utterance.pitch = 1;
            utterance.lang = "en-US";
            window.speechSynthesis.speak(utterance);
        } else {
            console.log("Speech synthesis not supported in this browser.");
        }
    }

    function showReminderModal(text) {
        const overlay = document.createElement("div");
        overlay.className = "reminder-overlay";

        const modal = document.createElement("div");
        modal.className = "reminder-modal";
        modal.innerHTML = `
            <p>${text}</p>
            <button id="close-reminder-modal">Close</button>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        document.getElementById("close-reminder-modal").addEventListener("click", () => {
            document.body.removeChild(overlay);
        });
    }

    function checkAlerts() {
        const now = new Date();
        const currentDay = now.toLocaleDateString("en-US", { weekday: 'long' });
        const currentHour = now.getHours().toString().padStart(2, "0");
        const currentMinute = now.getMinutes().toString().padStart(2, "0");

        if (reminders[currentDay]) {
            reminders[currentDay].forEach(reminder => {
                if (!reminder.completed) {
                    const [rHour, rMinute] = reminder.time.split(":").map(Number);

                    if (
                        Number(currentHour) >= rHour &&
                        Number(currentMinute) === rMinute
                    ) {
                        speak(`Reminder: ${reminder.text}`);
                        showReminderModal(`Reminder: ${reminder.text}`);
                    }
                }
            });
        }
    }

    function startAlignedInterval() {
        const now = new Date();
        const msToNextMinute =
            (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

        setTimeout(() => {
            checkAlerts();
            setInterval(checkAlerts, 60 * 1000);
        }, msToNextMinute);
    }

    startAlignedInterval();
    renderReminders(reminders);
});
