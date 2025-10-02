import { useEcoData } from "@/hooks/useEcoData";
import EcoCard from "@/components/EcoCard";
import EcoButton from "@/components/EcoButton";
import { Award, Lock, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Badges = () => {
  const { badges, totalCO2Saved } = useEcoData();
  const earnedBadges = badges.filter(badge => badge.earned);
  const lockedBadges = badges.filter(badge => !badge.earned);

  const getProgressPercentage = (requirement: number) => {
    return Math.min((totalCO2Saved / requirement) * 100, 100);
  };

  const getTimeToNext = () => {
    const nextBadge = lockedBadges.sort((a, b) => a.requirement - b.requirement)[0];
    if (!nextBadge) return null;
    
    const remaining = nextBadge.requirement - totalCO2Saved;
    return { badge: nextBadge, remaining };
  };

  const nextTarget = getTimeToNext();

  return (
    <div className="min-h-screen bg-gradient-subtle pb-20 md:pb-8 md:pt-20">
      <div className="container mx-auto px-4 py-6 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-gradient-eco-energy text-white px-6 py-2 rounded-full shadow-energy">
            <Award className="h-5 w-5" />
            <span className="font-semibold">Achievement Badges</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Your Eco Achievements! 🏆
          </h1>
          <p className="text-muted-foreground text-lg">
            Unlock badges as you make a positive environmental impact
          </p>
        </div>

        {/* Progress Summary */}
        <EcoCard variant="gradient" className="text-center">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Badge Progress</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <p className="text-3xl font-bold">{earnedBadges.length}</p>
                <p className="text-sm opacity-90">Earned</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold">{lockedBadges.length}</p>
                <p className="text-sm opacity-90">Remaining</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold">{totalCO2Saved.toFixed(1)}</p>
                <p className="text-sm opacity-90">Total CO₂ (kg)</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold">
                  {badges.length > 0 ? Math.round((earnedBadges.length / badges.length) * 100) : 0}%
                </p>
                <p className="text-sm opacity-90">Complete</p>
              </div>
            </div>
          </div>
        </EcoCard>

        {/* Next Badge Target */}
        {nextTarget && (
          <EcoCard variant="energy" className="text-center">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">🎯 Next Target</h3>
              <div className="bg-white/20 rounded-2xl p-6">
                <div className="text-6xl mb-4">{nextTarget.badge.icon}</div>
                <h4 className="text-2xl font-bold mb-2">{nextTarget.badge.name}</h4>
                <p className="text-lg opacity-90 mb-4">{nextTarget.badge.description}</p>
                <div className="space-y-2">
                  <div className="bg-white/10 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-white h-full transition-all duration-300"
                      style={{ width: `${getProgressPercentage(nextTarget.badge.requirement)}%` }}
                    />
                  </div>
                  <p className="text-sm">
                    {nextTarget.remaining.toFixed(1)} kg CO₂ to go!
                  </p>
                </div>
              </div>
              <Link to="/log">
                <EcoButton variant="outline" className="border-white text-white hover:bg-white hover:text-eco-energy">
                  Log Actions to Unlock
                </EcoButton>
              </Link>
            </div>
          </EcoCard>
        )}

        {/* Earned Badges */}
        {earnedBadges.length > 0 && (
          <EcoCard>
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
                <Award className="h-5 w-5" />
                Earned Badges ({earnedBadges.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {earnedBadges.map(badge => (
                  <EcoCard key={badge.id} variant="success" className="text-center animate-eco-pulse">
                    <div className="space-y-4">
                      <div className="text-5xl">{badge.icon}</div>
                      <div>
                        <h4 className="text-lg font-bold">{badge.name}</h4>
                        <p className="text-sm opacity-90">{badge.description}</p>
                        {badge.unlockedAt && (
                          <p className="text-xs opacity-75 mt-2 flex items-center justify-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Earned {new Date(badge.unlockedAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div className="bg-white/20 rounded-full px-4 py-2">
                        <span className="text-sm font-semibold">
                          {badge.requirement}kg CO₂ Goal ✓
                        </span>
                      </div>
                    </div>
                  </EcoCard>
                ))}
              </div>
            </div>
          </EcoCard>
        )}

        {/* Locked Badges */}
        {lockedBadges.length > 0 && (
          <EcoCard>
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-muted-foreground flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Locked Badges ({lockedBadges.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lockedBadges.map(badge => (
                  <EcoCard key={badge.id} className="text-center opacity-60 border-dashed border-2">
                    <div className="space-y-4">
                      <div className="text-4xl grayscale">{badge.icon}</div>
                      <div>
                        <h4 className="text-lg font-bold text-muted-foreground">{badge.name}</h4>
                        <p className="text-sm text-muted-foreground">{badge.description}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="bg-muted rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-primary h-full transition-all duration-300"
                            style={{ width: `${getProgressPercentage(badge.requirement)}%` }}
                          />
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <span className="font-semibold">{totalCO2Saved.toFixed(1)}</span>
                          {" / "}
                          <span>{badge.requirement}kg CO₂</span>
                        </div>
                      </div>
                      <div className="bg-muted rounded-full px-4 py-2">
                        <Lock className="h-4 w-4 mx-auto text-muted-foreground" />
                      </div>
                    </div>
                  </EcoCard>
                ))}
              </div>
            </div>
          </EcoCard>
        )}

        {/* Motivation Section */}
        <EcoCard variant="gradient" className="text-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Keep Making a Difference! 🌟</h3>
            <p className="text-lg opacity-90">
              Each badge represents your commitment to protecting our planet. 
              Every eco-action you take brings us closer to a sustainable future!
            </p>
            {earnedBadges.length === 0 ? (
              <div className="space-y-4">
                <p className="text-base opacity-80">
                  Start your eco journey today and earn your first badge!
                </p>
                <Link to="/log">
                  <EcoButton variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                    Log Your First Action
                  </EcoButton>
                </Link>
              </div>
            ) : earnedBadges.length === badges.length ? (
              <div className="space-y-4">
                <p className="text-base opacity-80">
                  🎉 Congratulations! You've earned all available badges!
                </p>
                <p className="text-sm opacity-70">
                  Keep logging actions to maintain your eco-warrior status!
                </p>
              </div>
            ) : (
              <Link to="/log">
                <EcoButton variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  Continue Your Journey
                </EcoButton>
              </Link>
            )}
          </div>
        </EcoCard>

      </div>
    </div>
  );
};

export default Badges;