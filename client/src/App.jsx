import FaceRecognition from './features/FaceRecognition/FaceRecognition';
import EmotionRecognition from './features/EmotionRecognition/EmotionRecognition';
import EmergencyButton from './features/EmergencyButton/EmergencyButton';
import Reminder from './features/Reminder/Reminder';

function App() {
  return (
    <div>
      <h1>RecallMate</h1>
      <FaceRecognition />
      <EmotionRecognition />
      <EmergencyButton />
      <Reminder />
    </div>
  );
}

export default App;
