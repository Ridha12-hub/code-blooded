import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Heart, Smile, Frown, Angry, AlertCircle, Calendar } from "lucide-react";

const Emotion = () => {
  const [selectedMood, setSelectedMood] = useState<string>("");

  const moods = [
    { id: "happy", icon: Smile, label: "Happy", color: "from-yellow-400 to-orange-500" },
    { id: "sad", icon: Frown, label: "Sad", color: "from-blue-400 to-blue-600" },
    { id: "angry", icon: Angry, label: "Angry", color: "from-red-400 to-red-600" },
    { id: "anxious", icon: AlertCircle, label: "Anxious", color: "from-purple-400 to-purple-600" },
    { id: "calm", icon: Heart, label: "Calm", color: "from-green-400 to-green-600" },
  ];

  const recentEntries = [
    { date: "Today, 2:30 PM", mood: "Happy", note: "Had a great lunch with family" },
    { date: "Today, 10:00 AM", mood: "Calm", note: "Morning meditation went well" },
    { date: "Yesterday, 7:15 PM", mood: "Anxious", note: "Worried about upcoming appointment" },
  ];

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
    // Here you would typically save the mood entry
  };

  return (
    <div className="min-h-screen bg-gradient-soft p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" asChild className="mr-4">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Emotion Detection</h1>
            <p className="text-muted-foreground">Track your emotional well-being</p>
          </div>
        </div>

        {/* Current Mood Selection */}
        <Card className="mb-8 shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="h-6 w-6 mr-2 text-primary" />
              How are you feeling right now?
            </CardTitle>
            <CardDescription>
              Select your current mood to track your emotional patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-6">
              {moods.map((mood) => (
                <button
                  key={mood.id}
                  onClick={() => handleMoodSelect(mood.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                    selectedMood === mood.id
                      ? "border-primary shadow-soft"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className={`w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br ${mood.color} flex items-center justify-center`}>
                    <mood.icon className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm font-medium text-center">{mood.label}</p>
                </button>
              ))}
            </div>
            
            {selectedMood && (
              <div className="animate-fade-in">
                <textarea
                  placeholder="Add a note about how you're feeling (optional)"
                  className="w-full p-3 border rounded-lg resize-none h-24 bg-background"
                />
                <Button className="mt-4">Save Mood Entry</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Entries */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-6 w-6 mr-2 text-primary" />
              Recent Entries
            </CardTitle>
            <CardDescription>
              Your emotional journey over the past few days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEntries.map((entry, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <Heart className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-foreground">{entry.mood}</span>
                      <span className="text-sm text-muted-foreground">{entry.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{entry.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Emotion;