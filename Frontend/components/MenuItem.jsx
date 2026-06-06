import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useFavorites } from "@/context/FavoritesContext";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";

export default function MenuItem({ item }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const isFav = isFavorite(item);

  return (
    <View className="relative mb-4 px-4">
      {/* Link wrapper around the main card content */}
      <Link href={`/details/${item.id}`} asChild>
        <TouchableOpacity
          activeOpacity={0.85}
          className="flex-row items-center bg-white rounded-3xl p-3 border border-gray-100 shadow-sm"
        >
          <Image
            source={item.icon}
            className="w-16 h-16 rounded-2xl"
            contentFit="cover"
          />
          
          <View className="flex-1 ml-4 pr-12">
            <Text className="text-gray-900 text-base font-bold mb-1" numberOfLines={1}>
              {item.name}
            </Text>
            <Text className="text-gray-500 text-xs leading-4" numberOfLines={2}>
              {item.description || item.facts}
            </Text>
          </View>
        </TouchableOpacity>
      </Link>

      {/* Floating bookmark toggle button placed in the right corner */}
      <TouchableOpacity
        style={{ position: 'absolute', right: 28, top: '50%', marginTop: -20, zIndex: 20 }}
        className={`w-10 h-10 rounded-full border items-center justify-center shadow-sm ${
          isFav ? 'bg-emerald-50 border-emerald-100' : 'bg-gray-50 border-gray-100'
        }`}
        onPress={() => toggleFavorite(item)}
      >
        <Ionicons
          name={isFav ? "bookmark" : "bookmark-outline"}
          size={16}
          color={isFav ? "#0B6B43" : "#6B7280"}
        />
      </TouchableOpacity>
    </View>
  );
}