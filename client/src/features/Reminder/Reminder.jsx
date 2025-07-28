import { useEffect, useState } from "react";

const Reminder = () => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/reminder")
      .then(res => res.json())
      .then(data => setReminders(data));
  }, []);

  return (
    <div>
      <h2>Reminders</h2>
      <ul>
        {reminders.map((r, i) => (
          <li key={i}>{r.text} at {r.time}</li>
        ))}
      </ul>
    </div>
  );
};

export default Reminder;
