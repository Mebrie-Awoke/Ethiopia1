
import "@/global.css";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FavoritesProvider } from "@/context/FavoritesContext";


export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FavoritesProvider> 
          <Stack screenOptions={{ headerShown: false }} />
      </FavoritesProvider>
    </GestureHandlerRootView>
  );
}
