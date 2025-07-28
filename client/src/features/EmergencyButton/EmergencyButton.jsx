const EmergencyButton = () => {
  const callHelp = async () => {
    await fetch("http://localhost:8000/api/emergency/trigger", { method: "POST" });
    alert("Emergency alert sent!");
  };

  return (
    <button
      onClick={callHelp}
      className="bg-red-600 text-white p-4 rounded-xl text-xl shadow-lg"
    >
      🚨 Emergency
    </button>
  );
};

export default EmergencyButton;
