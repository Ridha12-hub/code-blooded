import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, Phone, MapPin, AlertTriangle, Users, Clock } from "lucide-react";

const Panic = () => {
  const [isPanicActive, setIsPanicActive] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const emergencyContacts = [
    { name: "Emergency Services", phone: "911", type: "emergency" },
    { name: "Sarah Johnson (Daughter)", phone: "(555) 123-4567", type: "family" },
    { name: "Dr. Michael Chen", phone: "(555) 987-6543", type: "medical" },
    { name: "Emma Thompson (Caregiver)", phone: "(555) 456-7890", type: "caregiver" },
  ];

  const handlePanicPress = () => {
    setIsPanicActive(true);
    setCountdown(10);
    
    // Simulate countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Here you would trigger the actual emergency call
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleCancel = () => {
    setIsPanicActive(false);
    setCountdown(0);
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
            <h1 className="text-3xl font-bold text-foreground">Panic Button</h1>
            <p className="text-muted-foreground">Emergency assistance when you need it most</p>
          </div>
        </div>

        {/* Emergency Button Section */}
        <Card className="mb-8 shadow-card border-0 bg-gradient-to-br from-red-50 to-pink-50">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center text-2xl">
              <Shield className="h-8 w-8 mr-3 text-destructive" />
              Emergency Assistance
            </CardTitle>
            <CardDescription className="text-lg">
              Press and hold the button below if you need immediate help
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            {!isPanicActive ? (
              <div className="space-y-6">
                <Button 
                  variant="panic" 
                  size="lg"
                  className="w-48 h-48 rounded-full text-2xl font-bold"
                  onMouseDown={handlePanicPress}
                  onTouchStart={handlePanicPress}
                >
                  <div className="text-center">
                    <AlertTriangle className="h-16 w-16 mx-auto mb-2" />
                    <div>EMERGENCY</div>
                    <div className="text-sm font-normal">Press & Hold</div>
                  </div>
                </Button>
                <p className="text-muted-foreground max-w-md mx-auto">
                  This will alert your emergency contacts and provide them with your location
                </p>
              </div>
            ) : (
              <div className="space-y-6 animate-fade-in">
                <div className="w-48 h-48 mx-auto rounded-full bg-destructive flex items-center justify-center text-white text-6xl font-bold animate-pulse-glow">
                  {countdown}
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-destructive mb-2">Emergency Alert Active</p>
                  <p className="text-muted-foreground mb-4">
                    Contacting emergency services in {countdown} seconds
                  </p>
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel Emergency Call
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Current Location */}
        <Card className="mb-8 shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-6 w-6 mr-2 text-primary" />
              Current Location
            </CardTitle>
            <CardDescription>
              Your location will be shared with emergency contacts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="font-medium mb-1">1234 Main Street</p>
              <p className="text-muted-foreground text-sm">Springfield, IL 62701</p>
              <p className="text-muted-foreground text-sm mt-2">
                Last updated: {new Date().toLocaleTimeString()}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-6 w-6 mr-2 text-primary" />
              Emergency Contacts
            </CardTitle>
            <CardDescription>
              People who will be notified during an emergency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {emergencyContacts.map((contact, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      contact.type === 'emergency' 
                        ? 'bg-destructive' 
                        : contact.type === 'medical'
                        ? 'bg-blue-500'
                        : contact.type === 'family'
                        ? 'bg-green-500'
                        : 'bg-purple-500'
                    }`}>
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">{contact.phone}</p>
                    </div>
                  </div>
                  
                  <Button size="sm" variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium text-blue-900 mb-1">Emergency Protocol</p>
                  <p className="text-sm text-blue-700">
                    When activated, emergency services will be contacted first, followed by your family and caregivers. 
                    Your exact location will be shared with all contacts.
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

export default Panic;