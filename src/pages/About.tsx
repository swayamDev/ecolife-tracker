import EcoCard from "@/components/EcoCard";
import EcoButton from "@/components/EcoButton";
import { Leaf, Target, Users, Heart, Github, Twitter, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle pb-20 md:pb-8 md:pt-20">
      <div className="container mx-auto px-4 py-6 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-gradient-eco-success text-success-foreground px-6 py-2 rounded-full shadow-glow-success">
            <Leaf className="h-5 w-5 animate-float" />
            <span className="font-semibold">About EcoLife</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Our Mission 🌍
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Empowering individuals to make a positive environmental impact, 
            one action at a time
          </p>
        </div>

        {/* Mission Statement */}
        <EcoCard variant="gradient" className="text-center">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Why EcoLife Tracker?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="bg-white/20 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                  <Target className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold">Track Impact</h3>
                <p className="text-sm opacity-90">
                  Measure and visualize your environmental contributions with precise CO₂ calculations
                </p>
              </div>
              <div className="space-y-3">
                <div className="bg-white/20 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold">Stay Motivated</h3>
                <p className="text-sm opacity-90">
                  Earn badges, track progress, and stay inspired on your eco-friendly journey
                </p>
              </div>
              <div className="space-y-3">
                <div className="bg-white/20 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold">Make a Difference</h3>
                <p className="text-sm opacity-90">
                  Every action counts. Join thousands making our planet healthier for future generations
                </p>
              </div>
            </div>
          </div>
        </EcoCard>

        {/* How It Works */}
        <EcoCard>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary text-center flex items-center justify-center gap-2">
              <Leaf className="h-6 w-6" />
              How It Works
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-4">
                <div className="bg-gradient-eco-primary rounded-full p-6 w-20 h-20 mx-auto flex items-center justify-center text-primary-foreground text-2xl font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold text-primary">Log Your Actions</h3>
                <p className="text-muted-foreground">
                  Record your daily eco-friendly activities like cycling, using reusable bags, or saving energy
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="bg-gradient-eco-energy rounded-full p-6 w-20 h-20 mx-auto flex items-center justify-center text-white text-2xl font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold text-eco-energy">Track Progress</h3>
                <p className="text-muted-foreground">
                  Watch your CO₂ savings grow and see beautiful charts showing your environmental impact
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="bg-gradient-eco-success rounded-full p-6 w-20 h-20 mx-auto flex items-center justify-center text-success-foreground text-2xl font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold text-success">Earn Rewards</h3>
                <p className="text-muted-foreground">
                  Unlock achievement badges as you hit milestones and become an eco-champion
                </p>
              </div>
            </div>
          </div>
        </EcoCard>

        {/* Environmental Facts */}
        <EcoCard variant="energy">
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-bold">Did You Know? 🌱</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/20 rounded-xl p-6 space-y-3">
                <div className="text-4xl">🚴‍♀️</div>
                <h3 className="text-lg font-semibold">Transportation Impact</h3>
                <p className="text-sm opacity-90">
                  Cycling just 10 miles instead of driving can save 2.6 kg of CO₂ - equivalent to planting a tree!
                </p>
              </div>
              <div className="bg-white/20 rounded-xl p-6 space-y-3">
                <div className="text-4xl">🍶</div>
                <h3 className="text-lg font-semibold">Plastic Reduction</h3>
                <p className="text-sm opacity-90">
                  Using a reusable water bottle for one year prevents 1,460 plastic bottles from ending up in landfills
                </p>
              </div>
              <div className="bg-white/20 rounded-xl p-6 space-y-3">
                <div className="text-4xl">💡</div>
                <h3 className="text-lg font-semibold">Energy Savings</h3>
                <p className="text-sm opacity-90">
                  Switching to LED bulbs uses 75% less energy and lasts 25 times longer than traditional bulbs
                </p>
              </div>
              <div className="bg-white/20 rounded-xl p-6 space-y-3">
                <div className="text-4xl">🥗</div>
                <h3 className="text-lg font-semibold">Food Choices</h3>
                <p className="text-sm opacity-90">
                  Going vegetarian one day per week can save 1,900 lbs of CO₂ equivalent annually
                </p>
              </div>
            </div>
          </div>
        </EcoCard>

        {/* Call to Action */}
        <EcoCard variant="gradient" className="text-center">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Join the Movement</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Every individual action contributes to a larger positive change. 
              Start tracking your eco-friendly lifestyle today and inspire others to do the same!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/log">
                <EcoButton 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary"
                  showLeaf
                >
                  Start Tracking Now
                </EcoButton>
              </Link>
              <Link to="/progress">
                <EcoButton 
                  variant="ghost" 
                  size="lg"
                  className="text-white hover:bg-white/20"
                >
                  View Sample Progress
                </EcoButton>
              </Link>
            </div>
          </div>
        </EcoCard>

        {/* Contact & Social */}
        <EcoCard>
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-primary">Connect With Us</h2>
            <p className="text-muted-foreground">
              Have ideas, feedback, or want to contribute to making EcoLife even better?
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <EcoButton variant="outline" size="sm" className="gap-2">
                <Github className="h-4 w-4" />
                GitHub
              </EcoButton>
              <EcoButton variant="outline" size="sm" className="gap-2">
                <Twitter className="h-4 w-4" />
                Twitter
              </EcoButton>
              <EcoButton variant="outline" size="sm" className="gap-2">
                <Mail className="h-4 w-4" />
                Contact
              </EcoButton>
            </div>

            <div className="pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground italic">
                "The greatest threat to our planet is the belief that someone else will save it." 
                <br />
                <span className="font-semibold">— Robert Swan</span>
              </p>
            </div>
          </div>
        </EcoCard>

      </div>
    </div>
  );
};

export default About;