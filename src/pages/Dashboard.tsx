import { useEcoData } from "@/hooks/useEcoData";
import { ecoTips, calculateTreeEquivalent } from "@/lib/ecoData";
import EcoCard from "@/components/EcoCard";
import EcoButton from "@/components/EcoButton";
import { Leaf, Zap, TreePine, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { totalCO2Saved, getTodaysCO2, getNewlyEarnedBadges } = useEcoData();
  const todaysCO2 = getTodaysCO2();
  const treeEquivalent = calculateTreeEquivalent(totalCO2Saved);
  const randomTip = ecoTips[Math.floor(Math.random() * ecoTips.length)];
  const newBadges = getNewlyEarnedBadges();

  return (
    <div className="min-h-screen bg-gradient-subtle pb-20 md:pb-8 md:pt-20">
      <div className="container mx-auto px-4 py-6 space-y-6 max-w-7xl">
        
        {/* Header */}
        <header className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-gradient-eco-primary text-primary-foreground px-6 py-2 rounded-full shadow-eco">
            <Leaf className="h-5 w-5 animate-float" aria-hidden="true" />
            <span className="font-semibold">EcoLife Tracker</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Welcome back, Eco Warrior! 🌍
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Every action counts towards a greener tomorrow
          </p>
        </header>

        {/* New Badges Alert */}
        {newBadges.length > 0 && (
          <aside 
            className="animate-fade-in"
            role="status"
            aria-live="polite"
            aria-label="New achievement unlocked"
          >
            <EcoCard variant="success" className="text-center">
              <div className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold">🎉 Badge Unlocked!</h2>
                <p className="text-base md:text-lg">You earned: {newBadges.map(b => b.name).join(", ")}</p>
                <Link to="/badges">
                  <EcoButton 
                    variant="outline" 
                    className="mt-2 border-white text-white hover:bg-white hover:text-success"
                    aria-label="View all badges"
                  >
                    View Badges
                  </EcoButton>
                </Link>
              </div>
            </EcoCard>
          </aside>
        )}

        {/* Stats Grid */}
        <section 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          aria-label="Environmental impact statistics"
        >
          
          {/* Today's Impact */}
          <EcoCard variant="gradient" animate>
            <article className="text-center space-y-4">
              <div 
                className="bg-white/20 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center"
                aria-hidden="true"
              >
                <Zap className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-semibold">Today's Impact</h3>
                <p className="text-2xl md:text-3xl font-bold" aria-label={`${todaysCO2.toFixed(1)} kilograms`}>
                  {todaysCO2.toFixed(1)} kg
                </p>
                <p className="text-sm opacity-90">CO₂ saved today</p>
              </div>
            </article>
          </EcoCard>

          {/* Total Savings */}
          <EcoCard variant="energy" animate>
            <article className="text-center space-y-4">
              <div 
                className="bg-white/20 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center"
                aria-hidden="true"
              >
                <TreePine className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-semibold">Total Saved</h3>
                <p className="text-2xl md:text-3xl font-bold" aria-label={`${totalCO2Saved.toFixed(1)} kilograms`}>
                  {totalCO2Saved.toFixed(1)} kg
                </p>
                <p className="text-sm opacity-90">≈ {treeEquivalent} trees planted</p>
              </div>
            </article>
          </EcoCard>

          {/* Quick Actions */}
          <EcoCard className="md:col-span-2 lg:col-span-1">
            <nav className="text-center space-y-4" aria-label="Quick actions">
              <div 
                className="bg-gradient-eco-primary rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center text-primary-foreground"
                aria-hidden="true"
              >
                <TrendingUp className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-semibold">Quick Actions</h3>
                <div className="space-y-2 mt-4">
                  <Link to="/log">
                    <EcoButton 
                      variant="primary" 
                      className="w-full" 
                      showLeaf
                      aria-label="Log eco-friendly action"
                    >
                      Log Eco Action
                    </EcoButton>
                  </Link>
                  <Link to="/progress">
                    <EcoButton 
                      variant="outline" 
                      className="w-full"
                      aria-label="View your progress"
                    >
                      View Progress
                    </EcoButton>
                  </Link>
                </div>
              </div>
            </nav>
          </EcoCard>
        </section>

        {/* Daily Tip */}
        <aside aria-label="Eco tip of the day">
          <EcoCard className="text-center">
            <div className="space-y-3">
              <h2 className="text-lg md:text-xl font-semibold text-primary">💡 Eco Tip of the Day</h2>
              <p className="text-base md:text-lg text-muted-foreground italic">{randomTip}</p>
            </div>
          </EcoCard>
        </aside>

        {/* Motivational Quote */}
        <aside aria-label="Inspirational quote">
          <EcoCard variant="gradient" className="text-center">
            <blockquote className="space-y-2">
              <p className="text-base md:text-lg italic">
                "The Earth does not belong to us; we belong to the Earth. All things are connected like the blood that unites one family."
              </p>
              <cite className="text-sm opacity-90">— Chief Seattle</cite>
            </blockquote>
          </EcoCard>
        </aside>

      </div>
    </div>
  );
};

export default Dashboard;