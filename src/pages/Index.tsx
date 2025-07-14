import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Shield, Calendar, Brain } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const features = [
    {
      title: "Emotion Detection",
      description: "Track and monitor emotional states for better mental health awareness",
      icon: Heart,
      path: "/emotion",
      color: "from-pink-400 to-rose-500"
    },
    {
      title: "Face Recognition",
      description: "Identify important people in your life with smart recognition technology",
      icon: Users,
      path: "/face",
      color: "from-blue-400 to-indigo-500"
    },
    {
      title: "Panic Button",
      description: "Quick access to emergency contacts and assistance when you need it most",
      icon: Shield,
      path: "/panic",
      color: "from-red-400 to-pink-500"
    },
    {
      title: "Scheduler",
      description: "Never miss important appointments or tasks with smart reminders",
      icon: Calendar,
      path: "/schedule",
      color: "from-green-400 to-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-primary py-20 px-6">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        
        <div className="relative max-w-6xl mx-auto text-center text-white">
          <div className="flex items-center justify-center mb-6">
            <Brain className="h-16 w-16 mr-4" />
            <h1 className="text-5xl lg:text-7xl font-bold">RecallMate</h1>
          </div>
          <p className="text-xl lg:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Your trusted companion for memory assistance, emotional support, and daily life management
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link to="#features">Explore Features</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground">
              Comprehensive Support Tools
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              RecallMate provides essential tools designed to support your daily life with compassionate technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={feature.title} className="group hover:shadow-card transition-all duration-300 animate-fade-in border-0 shadow-soft">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button variant="feature" className="w-full" asChild>
                    <Link to={feature.path}>
                      Get Started
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-muted/50 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6 text-foreground">Built with Care & Privacy</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <h4 className="font-semibold mb-2">Secure & Private</h4>
              <p className="text-muted-foreground text-sm">Your data stays safe with enterprise-grade security</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-secondary-foreground" />
              </div>
              <h4 className="font-semibold mb-2">Compassionate Design</h4>
              <p className="text-muted-foreground text-sm">Created with empathy and understanding</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-accent-foreground" />
              </div>
              <h4 className="font-semibold mb-2">Family Focused</h4>
              <p className="text-muted-foreground text-sm">Designed to keep families connected</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
