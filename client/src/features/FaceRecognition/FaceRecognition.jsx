import React, { useRef } from "react";
import Webcam from "react-webcam";

const FaceRecognition = () => {
  const webcamRef = useRef(null);

  const captureFace = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const res = await fetch("http://localhost:8000/api/face/recognize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: imageSrc }),
    });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <div>
      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
      <button onClick={captureFace}>Identify Person</button>
    </div>
  );
};

export default FaceRecognition;
