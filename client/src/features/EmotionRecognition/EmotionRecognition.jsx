import React, { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

const EmotionRecognition = () => {
  const videoRef = useRef();

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceExpressionNet.loadFromUri("/models");
    };

    const startVideo = () => {
      navigator.mediaDevices.getUserMedia({ video: {} })
        .then(stream => (videoRef.current.srcObject = stream))
        .catch(err => console.error("Camera error:", err));
    };

    const detect = async () => {
      if (!videoRef.current) return;
      const detections = await faceapi.detectAllFaces(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      ).withFaceExpressions();

      if (detections.length > 0) {
        const topEmotion = Object.entries(detections[0].expressions)
          .sort((a, b) => b[1] - a[1])[0][0];
        console.log("Top Emotion:", topEmotion);
      }
    };

    loadModels().then(startVideo);
    const interval = setInterval(detect, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay muted width="480" height="360" />
    </div>
  );
};

export default EmotionRecognition;
