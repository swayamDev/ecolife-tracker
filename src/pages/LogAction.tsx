import { useState } from "react";
import { useEcoData } from "@/hooks/useEcoData";
import { ecoActions } from "@/lib/ecoData";
import EcoCard from "@/components/EcoCard";
import EcoButton from "@/components/EcoButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Check, Leaf } from "lucide-react";

const LogAction = () => {
  const { logAction } = useEcoData();
  const { toast } = useToast();
  const [customAction, setCustomAction] = useState({ name: "", co2: "" });
  const [isLogging, setIsLogging] = useState<string | null>(null);

  const handleLogAction = async (actionId: string, co2Saved: number, actionName: string) => {
    setIsLogging(actionId);
    
    // Simulate a small delay for better UX
    setTimeout(() => {
      logAction(actionId, co2Saved);
      toast({
        title: "Action Logged! 🎉",
        description: `You saved ${co2Saved}kg of CO₂ by ${actionName.toLowerCase()}!`,
        duration: 3000,
      });
      setIsLogging(null);
    }, 500);
  };

  const handleCustomAction = () => {
    if (!customAction.name.trim() || !customAction.co2.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in both action name and CO₂ amount.",
        variant: "destructive",
      });
      return;
    }

    const co2Value = parseFloat(customAction.co2);
    if (isNaN(co2Value) || co2Value <= 0) {
      toast({
        title: "Invalid CO₂ Amount",
        description: "Please enter a valid positive number for CO₂ savings.",
        variant: "destructive",
      });
      return;
    }

    handleLogAction("custom", co2Value, customAction.name);
    setCustomAction({ name: "", co2: "" });
  };

  const categories = [...new Set(ecoActions.map(action => action.category))];

  return (
    <div className="min-h-screen bg-gradient-subtle pb-20 md:pb-8 md:pt-20">
      <div className="container mx-auto px-4 py-6 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-gradient-eco-energy text-white px-6 py-2 rounded-full shadow-energy">
            <Plus className="h-5 w-5" />
            <span className="font-semibold">Log Eco Action</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Make Your Impact Count! 🌱
          </h1>
          <p className="text-muted-foreground text-lg">
            Every eco-friendly action you take makes a difference
          </p>
        </div>

        {/* Quick Actions by Category */}
        {categories.map(category => {
          const categoryActions = ecoActions.filter(action => action.category === category);
          return (
            <EcoCard key={category}>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary capitalize flex items-center gap-2">
                  <Leaf className="h-5 w-5" />
                  {category.replace("-", " ")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {categoryActions.map(action => (
                    <div
                      key={action.id}
                      className="flex items-center justify-between p-4 bg-accent/50 rounded-xl border border-border hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{action.icon}</span>
                        <div>
                          <p className="font-medium">{action.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Saves {action.co2Saved}kg CO₂
                          </p>
                        </div>
                      </div>
                      <EcoButton
                        size="sm"
                        onClick={() => handleLogAction(action.id, action.co2Saved, action.name)}
                        disabled={isLogging === action.id}
                        className="min-w-[80px]"
                      >
                        {isLogging === action.id ? (
                          <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                        ) : (
                          <>
                            <Check className="h-4 w-4" />
                            Log
                          </>
                        )}
                      </EcoButton>
                    </div>
                  ))}
                </div>
              </div>
            </EcoCard>
          );
        })}

        {/* Custom Action */}
        <EcoCard variant="gradient">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary-foreground flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Custom Eco Action
            </h3>
            <p className="text-primary-foreground/80">
              Did something eco-friendly that's not listed? Add your own action!
            </p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="custom-name" className="text-primary-foreground">
                  Action Name
                </Label>
                <Input
                  id="custom-name"
                  placeholder="e.g., Composting kitchen waste"
                  value={customAction.name}
                  onChange={(e) => setCustomAction(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 bg-white/20 border-white/30 text-primary-foreground placeholder:text-primary-foreground/60"
                />
              </div>
              
              <div>
                <Label htmlFor="custom-co2" className="text-primary-foreground">
                  CO₂ Saved (kg)
                </Label>
                <Input
                  id="custom-co2"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 0.5"
                  value={customAction.co2}
                  onChange={(e) => setCustomAction(prev => ({ ...prev, co2: e.target.value }))}
                  className="mt-1 bg-white/20 border-white/30 text-primary-foreground placeholder:text-primary-foreground/60"
                />
              </div>
              
              <EcoButton
                onClick={handleCustomAction}
                variant="outline"
                className="w-full border-white text-white hover:bg-white hover:text-primary"
                disabled={isLogging === "custom"}
              >
                {isLogging === "custom" ? (
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    Log Custom Action
                  </>
                )}
              </EcoButton>
            </div>
          </div>
        </EcoCard>

        {/* Encouragement */}
        <EcoCard className="text-center">
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-primary">Keep Going! 🚀</h3>
            <p className="text-muted-foreground">
              Every action you log brings us one step closer to a sustainable future. 
              Your efforts inspire others to make a difference too!
            </p>
          </div>
        </EcoCard>

      </div>
    </div>
  );
};

export default LogAction;