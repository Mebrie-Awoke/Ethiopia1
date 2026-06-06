import React, { useContext } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { FavoritesContext } from "@/context/FavoritesContext";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from '@/components/Header'
import MenuItem from "@/components/MenuItem";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function SavedScreen() {
  const router = useRouter();
  const { favorites } = useContext(FavoritesContext);

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-[#FAF9F5]" edges={["top"]}>
      <Header title="Saved Topics" showBack={true} />

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 12 }}
        renderItem={({ item }) => (
          <MenuItem item={item} />
        )}
        ListEmptyComponent={
          <View className="items-center justify-center mt-32 px-8">
            <View className="w-20 h-20 bg-gray-100 rounded-full items-center justify-center mb-4">
              <Ionicons name="bookmark-outline" size={36} color="#9CA3AF" />
            </View>
            <Text className="text-gray-900 text-lg font-bold text-center">Your wishlist is empty</Text>
            <Text className="text-gray-500 text-sm text-center mt-1.5 leading-5">
              Bookmark topics while exploring to easily find them here.
            </Text>
            <TouchableOpacity 
              onPress={() => router.push('/explore')} 
              className="mt-6 bg-[#0B6B43] px-6 py-3 rounded-full shadow-sm active:bg-[#075333]"
            >
              <Text className="text-white font-bold text-sm uppercase tracking-wider">Start Exploring</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
}