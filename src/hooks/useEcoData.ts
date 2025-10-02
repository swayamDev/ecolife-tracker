import { useState, useEffect } from "react";
import { LoggedAction, Badge, defaultBadges, saveToStorage, loadFromStorage } from "@/lib/ecoData";

export const useEcoData = () => {
  const [loggedActions, setLoggedActions] = useState<LoggedAction[]>([]);
  const [badges, setBadges] = useState<Badge[]>(defaultBadges);
  const [totalCO2Saved, setTotalCO2Saved] = useState(0);

  useEffect(() => {
    // Load data from localStorage on mount
    const storedActions = loadFromStorage("ecoActions", []);
    const storedBadges = loadFromStorage("ecoBadges", defaultBadges);
    
    setLoggedActions(storedActions);
    setBadges(storedBadges);
  }, []);

  useEffect(() => {
    // Calculate total CO2 whenever actions change
    const total = loggedActions.reduce((sum, action) => sum + action.co2Saved, 0);
    setTotalCO2Saved(total);
    
    // Check and unlock badges
    const updatedBadges = badges.map(badge => {
      if (!badge.earned && total >= badge.requirement) {
        return {
          ...badge,
          earned: true,
          unlockedAt: new Date()
        };
      }
      return badge;
    });
    
    setBadges(updatedBadges);
    
    // Save to localStorage
    saveToStorage("ecoActions", loggedActions);
    saveToStorage("ecoBadges", updatedBadges);
  }, [loggedActions]);

  const logAction = (actionId: string, co2Saved: number) => {
    const newAction: LoggedAction = {
      id: Date.now().toString(),
      actionId,
      date: new Date(),
      co2Saved
    };
    
    setLoggedActions(prev => [...prev, newAction]);
  };

  const getRecentActions = (days: number = 7) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return loggedActions.filter(action => new Date(action.date) >= cutoffDate);
  };

  const getTodaysCO2 = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return loggedActions
      .filter(action => {
        const actionDate = new Date(action.date);
        actionDate.setHours(0, 0, 0, 0);
        return actionDate.getTime() === today.getTime();
      })
      .reduce((sum, action) => sum + action.co2Saved, 0);
  };

  const getNewlyEarnedBadges = () => {
    return badges.filter(badge => {
      if (!badge.earned || !badge.unlockedAt) return false;
      const unlockDate = new Date(badge.unlockedAt);
      const oneDayAgo = new Date();
      oneDayAgo.setHours(oneDayAgo.getHours() - 24);
      return unlockDate > oneDayAgo;
    });
  };

  return {
    loggedActions,
    badges,
    totalCO2Saved,
    logAction,
    getRecentActions,
    getTodaysCO2,
    getNewlyEarnedBadges
  };
};