import React, { createContext, useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@ethioguide_favorites";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load persisted favorites from storage on mount
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setFavorites(JSON.parse(stored));
        }
      } catch (e) {
        console.error("Failed to load favorites:", e);
      } finally {
        setLoading(false);
      }
    };
    loadFavorites();
  }, []);

  // Persist to AsyncStorage whenever favorites changes
  const persistFavorites = useCallback(async (newFavorites) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
    } catch (e) {
      console.error("Failed to save favorites:", e);
    }
  }, []);

  const toggleFavorite = useCallback((item) => {
    setFavorites((prev) => {
      const exists = prev.find((fav) => fav.id === item.id);
      const updated = exists
        ? prev.filter((fav) => fav.id !== item.id)
        : [...prev, item];
      persistFavorites(updated);
      return updated;
    });
  }, [persistFavorites]);

  const isFavorite = useCallback(
    (item) => favorites.some((fav) => fav.id === item.id),
    [favorites]
  );

  const clearAllFavorites = useCallback(async () => {
    setFavorites([]);
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error("Failed to clear favorites:", e);
    }
  }, []);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite, loading, clearAllFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export function useFavorites() {
  const context = React.useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}