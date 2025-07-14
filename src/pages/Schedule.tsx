import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, Bell, Plus, Pill, Utensils, Users } from "lucide-react";

const Schedule = () => {
  const [currentTime] = useState(new Date());

  const todayAppointments = [
    {
      id: 1,
      time: "09:00 AM",
      title: "Morning Medication",
      type: "medication",
      description: "Take blood pressure medication with breakfast",
      completed: true
    },
    {
      id: 2,
      time: "11:30 AM", 
      title: "Dr. Chen Appointment",
      type: "medical",
      description: "Regular check-up at Springfield Medical Center",
      completed: false
    },
    {
      id: 3,
      time: "12:30 PM",
      title: "Lunch",
      type: "meal",
      description: "Healthy lunch with vegetables",
      completed: false
    },
    {
      id: 4,
      time: "02:00 PM",
      title: "Video Call with Sarah",
      type: "social",
      description: "Weekly catch-up with daughter",
      completed: false
    },
    {
      id: 5,
      time: "06:00 PM",
      title: "Evening Medication",
      type: "medication",
      description: "Take evening medications with dinner",
      completed: false
    }
  ];

  const upcomingEvents = [
    { date: "Tomorrow", event: "Physical Therapy - 10:00 AM" },
    { date: "Friday", event: "Grocery Shopping with Emma - 2:00 PM" },
    { date: "Saturday", event: "Family Dinner at Robert's - 6:00 PM" },
    { date: "Next Week", event: "Dentist Appointment - Tuesday 9:30 AM" }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'medication': return Pill;
      case 'meal': return Utensils;
      case 'medical': return Calendar;
      case 'social': return Users;
      default: return Clock;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'medication': return 'from-blue-400 to-blue-600';
      case 'meal': return 'from-green-400 to-green-600';
      case 'medical': return 'from-red-400 to-red-600';
      case 'social': return 'from-purple-400 to-purple-600';
      default: return 'from-gray-400 to-gray-600';
    }
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
            <h1 className="text-3xl font-bold text-foreground">Scheduler</h1>
            <p className="text-muted-foreground">Manage your daily appointments and reminders</p>
          </div>
        </div>

        {/* Current Time */}
        <Card className="mb-8 shadow-card border-0 bg-gradient-primary text-white">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="text-xl opacity-90">
                {currentTime.toLocaleDateString([], { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card className="mb-8 shadow-card border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Calendar className="h-6 w-6 mr-2 text-primary" />
                  Today's Schedule
                </CardTitle>
                <CardDescription>
                  Your appointments and tasks for today
                </CardDescription>
              </div>
              <Button variant="secondary" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayAppointments.map((appointment) => {
                const IconComponent = getTypeIcon(appointment.type);
                return (
                  <div
                    key={appointment.id}
                    className={`flex items-start space-x-4 p-4 rounded-lg transition-all ${
                      appointment.completed 
                        ? 'bg-muted/50 opacity-60' 
                        : 'bg-background border-2 border-border hover:border-primary/50'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getTypeColor(appointment.type)} flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-semibold ${appointment.completed ? 'line-through' : ''}`}>
                          {appointment.title}
                        </h3>
                        <span className="text-sm font-medium text-primary">{appointment.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{appointment.description}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      {!appointment.completed && (
                        <>
                          <Button size="sm" variant="outline">
                            <Bell className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="secondary">
                            Complete
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-6 w-6 mr-2 text-primary" />
              Upcoming Events
            </CardTitle>
            <CardDescription>
              Your schedule for the next few days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
                >
                  <div>
                    <span className="font-medium text-foreground">{event.event}</span>
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">{event.date}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-start space-x-3">
                <Bell className="h-5 w-5 text-green-600 mt-1" />
                <div>
                  <p className="font-medium text-green-900 mb-1">Smart Reminders</p>
                  <p className="text-sm text-green-700">
                    You'll receive notifications 30 minutes before each appointment. 
                    Emergency contacts can also see your schedule if needed.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Schedule;