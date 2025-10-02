export interface EcoAction {
  id: string;
  name: string;
  co2Saved: number; // kg of CO2
  icon: string;
  category: string;
}

export interface LoggedAction {
  id: string;
  actionId: string;
  date: Date;
  co2Saved: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number; // CO2 threshold
  earned: boolean;
  unlockedAt?: Date;
}

export const ecoActions: EcoAction[] = [
  { id: "cycle", name: "Cycling instead of driving", co2Saved: 2.3, icon: "🚴", category: "transport" },
  { id: "walk", name: "Walking instead of driving", co2Saved: 2.3, icon: "🚶", category: "transport" },
  { id: "bus", name: "Taking public transport", co2Saved: 1.1, icon: "🚌", category: "transport" },
  { id: "cloth-bag", name: "Using reusable bags", co2Saved: 0.1, icon: "👜", category: "shopping" },
  { id: "water-bottle", name: "Using reusable water bottle", co2Saved: 0.2, icon: "🍶", category: "daily" },
  { id: "led-bulb", name: "Using LED bulbs", co2Saved: 0.5, icon: "💡", category: "energy" },
  { id: "unplug", name: "Unplugging devices", co2Saved: 0.3, icon: "🔌", category: "energy" },
  { id: "cold-water", name: "Washing clothes in cold water", co2Saved: 0.8, icon: "🌊", category: "energy" },
  { id: "vegetarian", name: "Eating vegetarian meal", co2Saved: 1.5, icon: "🥗", category: "food" },
  { id: "local-food", name: "Buying local produce", co2Saved: 0.7, icon: "🥕", category: "food" },
];

export const defaultBadges: Badge[] = [
  { id: "starter", name: "Eco Starter", description: "Save your first 1kg of CO₂", icon: "🌱", requirement: 1, earned: false },
  { id: "warrior", name: "Green Warrior", description: "Save 10kg of CO₂", icon: "🛡️", requirement: 10, earned: false },
  { id: "hero", name: "Eco Hero", description: "Save 50kg of CO₂", icon: "🦸", requirement: 50, earned: false },
  { id: "champion", name: "Earth Champion", description: "Save 100kg of CO₂", icon: "🏆", requirement: 100, earned: false },
  { id: "legend", name: "Eco Legend", description: "Save 250kg of CO₂", icon: "⭐", requirement: 250, earned: false },
];

export const ecoTips = [
  "Every small action counts towards a greener planet! 🌍",
  "The best time to plant a tree was 20 years ago. The second best time is now. 🌳",
  "Reduce, reuse, recycle - the 3 Rs of sustainability! ♻️",
  "Switching to LED bulbs can save up to 80% energy! 💡",
  "Walking or cycling just 1 mile saves 1kg of CO₂! 🚴‍♀️",
  "Using a reusable water bottle can save 1,460 plastic bottles per year! 🍶",
  "Going vegetarian one day a week can save 1,900 lbs of CO₂ annually! 🥗",
];

/**
 * Local storage helpers with error handling
 */
export const saveToStorage = (key: string, data: any): boolean => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
    return false;
  }
};

export const loadFromStorage = (key: string, defaultValue: any = null): any => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return defaultValue;
  }
};

export const calculateTreeEquivalent = (co2kg: number): number => {
  // Average tree absorbs about 21kg CO2 per year
  return Math.round((co2kg / 21) * 100) / 100;
};