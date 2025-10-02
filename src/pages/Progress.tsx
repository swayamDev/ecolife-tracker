import { useEcoData } from "@/hooks/useEcoData";
import { calculateTreeEquivalent } from "@/lib/ecoData";
import EcoCard from "@/components/EcoCard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Calendar, TrendingUp, Zap, TreePine } from "lucide-react";

const Progress = () => {
  const { loggedActions, totalCO2Saved, getRecentActions } = useEcoData();
  const recentActions = getRecentActions(30); // Last 30 days
  const treeEquivalent = calculateTreeEquivalent(totalCO2Saved);

  // Prepare daily data for charts
  const getDailyData = () => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayActions = recentActions.filter(action => {
        const actionDate = new Date(action.date);
        return actionDate.toDateString() === date.toDateString();
      });
      const dailyCO2 = dayActions.reduce((sum, action) => sum + action.co2Saved, 0);
      
      last7Days.push({
        day: date.toLocaleDateString('en', { weekday: 'short' }),
        co2: Number(dailyCO2.toFixed(1)),
        actions: dayActions.length
      });
    }
    return last7Days;
  };

  const dailyData = getDailyData();

  // Category breakdown
  const getCategoryData = () => {
    const categories = new Map<string, number>();
    recentActions.forEach(action => {
      // For simplicity, we'll categorize based on action patterns
      let category = "Other";
      if (action.actionId.includes("cycle") || action.actionId.includes("walk") || action.actionId.includes("bus")) {
        category = "Transport";
      } else if (action.actionId.includes("bag") || action.actionId.includes("bottle")) {
        category = "Reusables";
      } else if (action.actionId.includes("bulb") || action.actionId.includes("unplug") || action.actionId.includes("water")) {
        category = "Energy";
      } else if (action.actionId.includes("vegetarian") || action.actionId.includes("local")) {
        category = "Food";
      }
      
      categories.set(category, (categories.get(category) || 0) + action.co2Saved);
    });

    return Array.from(categories.entries()).map(([name, value]) => ({
      name,
      value: Number(value.toFixed(1)),
    }));
  };

  const categoryData = getCategoryData();
  const colors = ['hsl(247, 46%, 36%)', 'hsl(239, 78%, 70%)', 'hsl(45, 93%, 49%)', 'hsl(31, 93%, 49%)', 'hsl(19, 90%, 49%)'];

  return (
    <div className="min-h-screen bg-gradient-subtle pb-20 md:pb-8 md:pt-20">
      <div className="container mx-auto px-4 py-6 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-gradient-eco-success text-success-foreground px-6 py-2 rounded-full shadow-glow-success">
            <TrendingUp className="h-5 w-5" />
            <span className="font-semibold">Progress Tracking</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Your Eco Journey 📊
          </h1>
          <p className="text-muted-foreground text-lg">
            Visualize your environmental impact over time
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <EcoCard className="text-center">
            <div className="space-y-2">
              <Zap className="h-8 w-8 mx-auto text-primary" />
              <p className="text-2xl font-bold text-primary">{totalCO2Saved.toFixed(1)}</p>
              <p className="text-sm text-muted-foreground">Total CO₂ Saved (kg)</p>
            </div>
          </EcoCard>
          
          <EcoCard className="text-center">
            <div className="space-y-2">
              <TreePine className="h-8 w-8 mx-auto text-success" />
              <p className="text-2xl font-bold text-success">{treeEquivalent}</p>
              <p className="text-sm text-muted-foreground">Trees Equivalent</p>
            </div>
          </EcoCard>
          
          <EcoCard className="text-center">
            <div className="space-y-2">
              <Calendar className="h-8 w-8 mx-auto text-eco-energy" />
              <p className="text-2xl font-bold text-eco-energy">{loggedActions.length}</p>
              <p className="text-sm text-muted-foreground">Total Actions</p>
            </div>
          </EcoCard>
          
          <EcoCard className="text-center">
            <div className="space-y-2">
              <TrendingUp className="h-8 w-8 mx-auto text-eco-warm" />
              <p className="text-2xl font-bold text-eco-warm">
                {recentActions.length > 0 ? (totalCO2Saved / loggedActions.length).toFixed(1) : "0"}
              </p>
              <p className="text-sm text-muted-foreground">Avg CO₂/Action</p>
            </div>
          </EcoCard>
        </div>

        {/* Daily Progress Chart */}
        <EcoCard>
          <div className="space-y-4">
            <h3 className="text-lg md:text-xl font-semibold text-primary flex items-center gap-2">
              <BarChart className="h-5 w-5" aria-hidden="true" />
              Daily CO₂ Savings (Last 7 Days)
            </h3>
            <div className="h-64 md:h-80" role="img" aria-label="Bar chart showing daily CO2 savings over the last 7 days">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="day" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    label={{ value: 'CO₂ (kg)', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
                  />
                  <Bar 
                    dataKey="co2" 
                    fill="url(#ecoGradient)"
                    radius={[4, 4, 0, 0]}
                    aria-label="CO2 savings"
                  />
                  <defs>
                    <linearGradient id="ecoGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--primary-light))" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </EcoCard>

        {/* Weekly Trend */}
        <EcoCard>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Weekly Trend
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="day" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="co2" 
                    stroke="hsl(var(--eco-energy))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--eco-energy))", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: "hsl(var(--eco-fire))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </EcoCard>

        {/* Category Breakdown */}
        {categoryData.length > 0 && (
          <EcoCard>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary">Impact by Category</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3">
                  {categoryData.map((category, index) => (
                    <div key={category.name} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: colors[index % colors.length] }}
                        />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span className="text-lg font-bold text-primary">{category.value} kg</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </EcoCard>
        )}

        {/* Environmental Impact Comparison */}
        <EcoCard variant="energy" className="text-center">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">🌍 Your Environmental Impact</h3>
            <div className="grid md:grid-cols-3 gap-6 text-white">
              <div className="space-y-2">
                <p className="text-3xl font-bold">{treeEquivalent}</p>
                <p className="text-sm opacity-90">Trees planted equivalent</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold">{Math.round(totalCO2Saved * 2.2)}</p>
                <p className="text-sm opacity-90">Miles not driven</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold">{Math.round(totalCO2Saved * 0.5)}</p>
                <p className="text-sm opacity-90">Plastic bottles saved</p>
              </div>
            </div>
          </div>
        </EcoCard>

      </div>
    </div>
  );
};

export default Progress;