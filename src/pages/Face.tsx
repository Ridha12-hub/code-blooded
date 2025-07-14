import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Users, Camera, UserPlus, Search, Phone, Heart } from "lucide-react";

const Face = () => {
  const [isScanning, setIsScanning] = useState(false);

  const recognizedContacts = [
    {
      id: 1,
      name: "Sarah Johnson",
      relationship: "Daughter",
      lastSeen: "2 hours ago",
      phone: "(555) 123-4567",
      avatar: "SJ"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      relationship: "Doctor",
      lastSeen: "Yesterday",
      phone: "(555) 987-6543",
      avatar: "MC"
    },
    {
      id: 3,
      name: "Emma Thompson",
      relationship: "Caregiver",
      lastSeen: "Today, 9:00 AM",
      phone: "(555) 456-7890",
      avatar: "ET"
    },
    {
      id: 4,
      name: "Robert Wilson",
      relationship: "Son",
      lastSeen: "3 days ago",
      phone: "(555) 234-5678",
      avatar: "RW"
    }
  ];

  const handleStartScanning = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
    }, 3000);
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
            <h1 className="text-3xl font-bold text-foreground">Face Recognition</h1>
            <p className="text-muted-foreground">Identify important people in your life</p>
          </div>
        </div>

        {/* Camera Section */}
        <Card className="mb-8 shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Camera className="h-6 w-6 mr-2 text-primary" />
              Face Scanner
            </CardTitle>
            <CardDescription>
              Point your camera at someone to identify them from your contacts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="aspect-video bg-muted rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                {isScanning ? (
                  <div className="absolute inset-0 bg-gradient-primary/20 animate-pulse flex items-center justify-center">
                    <div className="text-center">
                      <Search className="h-12 w-12 mx-auto mb-4 text-primary animate-spin" />
                      <p className="text-primary font-medium">Scanning for faces...</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <Camera className="h-16 w-16 mx-auto mb-4" />
                    <p>Camera preview will appear here</p>
                    <p className="text-sm">Tap the button below to start face recognition</p>
                  </div>
                )}
              </div>
              
              <div className="flex gap-3 justify-center">
                <Button 
                  onClick={handleStartScanning}
                  disabled={isScanning}
                  variant="feature"
                >
                  {isScanning ? "Scanning..." : "Start Face Recognition"}
                </Button>
                <Button variant="secondary">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add New Contact
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recognized Contacts */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-6 w-6 mr-2 text-primary" />
              Recognized Contacts
            </CardTitle>
            <CardDescription>
              People in your network that can be identified
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recognizedContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold">
                    {contact.avatar}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-foreground">{contact.name}</h3>
                      <span className="text-sm text-muted-foreground">Last seen: {contact.lastSeen}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{contact.relationship}</p>
                    <p className="text-sm text-primary">{contact.phone}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <Button variant="secondary">
                <UserPlus className="h-4 w-4 mr-2" />
                Add More Contacts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Face;