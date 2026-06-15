import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Share, Dimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { PROFILE_MENU, IMAGES } from "@/assets/asset";
import { Ionicons } from "@expo/vector-icons";
import { useFavorites } from "@/context/FavoritesContext";
import { useRouter } from "expo-router";
import * as Speech from "expo-speech";

const { width, height } = Dimensions.get("window");

export default function DetailsPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { toggleFavorite, isFavorite } = useFavorites();

  const localItem = PROFILE_MENU
    .flatMap((section) => section.data)
    .find((product) => product.id === id);

  const displayedItem = localItem;

  const item = displayedItem;
  const isFav = item ? isFavorite(item) : false;

  // Font size adjustment state
  const [fontSize, setFontSize] = useState(15);

  // Real TTS narration state
  const [isPlaying, setIsPlaying] = useState(false);

  // Stop speech when leaving the screen
  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  const handleToggleSpeech = () => {
    if (isPlaying) {
      Speech.stop();
      setIsPlaying(false);
    } else {
      const textToRead = item
        ? `${item.name}. ${item.description || ""} ${item.facts || ""}`
        : "";
      Speech.speak(textToRead, {
        language: "en",
        pitch: 1.0,
        rate: 0.9,
        onStart: () => setIsPlaying(true),
        onDone: () => setIsPlaying(false),
        onStopped: () => setIsPlaying(false),
        onError: () => setIsPlaying(false),
      });
    }
  };

  if (!displayedItem) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-[#FAF9F5]">
        <Ionicons name="alert-circle" size={48} color="#EF4444" />
        <Text className="text-red-500 mt-2 font-semibold">Article not found</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-4 bg-[#0B6B43] px-6 py-2 rounded-full">
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this article on ethioGuide: ${item.name}\n\n${item.description || ""}`,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  // Content rendering with support for bullets formatting
  const renderContent = () => {
    const text = item.facts || item.description || "";
    if (text.includes("•")) {
      return text.split("\n").map((line, idx) => {
        const cleanLine = line.replace(/^•\s*/, "").trim();
        if (!cleanLine) return null;
        return (
          <View key={idx} className="flex-row items-start mb-3.5 pr-2">
            <Text style={{ fontSize: fontSize + 2 }} className="text-gray-700 mr-2.5 font-bold">•</Text>
            <Text style={{ fontSize, lineHeight: fontSize * 1.5 }} className="text-gray-700 font-medium flex-1">
              {cleanLine}
            </Text>
          </View>
        );
      });
    }
    return (
      <Text style={{ fontSize, lineHeight: fontSize * 1.6 }} className="text-gray-700 font-medium">
        {text}
      </Text>
    );
  };

  return (
    <View style={{ flex: 1 }} className="bg-[#FAF9F5]">
      
      {/* 🏞️ HERO HEADER IMAGE WITH OVERLAYS */}
      <View 
        style={{ height: height * 0.42 }} 
        className="relative w-full overflow-hidden rounded-b-[40px] shadow-lg"
      >
        <Image
          source={item.icon}
          className="w-full h-full"
          contentFit="cover"
        />
        {/* Dark contrast gradient overlay */}
        <View className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/10" style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.15)" }} />

        {/* Floating Top Controls */}
        <View className="absolute top-12 left-4 right-4 flex-row justify-between items-center z-20">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 bg-white/90 rounded-full items-center justify-center shadow-md"
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={22} color="#1F2937" />
          </TouchableOpacity>

          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={handleShare}
              className="w-10 h-10 bg-white/90 rounded-full items-center justify-center shadow-md mr-3"
              activeOpacity={0.8}
            >
              <Ionicons name="share-social-outline" size={20} color="#1F2937" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => toggleFavorite(item)}
              className="w-10 h-10 bg-white/90 rounded-full items-center justify-center shadow-md"
              activeOpacity={0.8}
            >
              <Ionicons
                name={isFav ? "bookmark" : "bookmark-outline"}
                size={20}
                color={isFav ? "#0B6B43" : "#1F2937"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* 📄 ARTICLE SCROLLSTREAM */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="px-5 pt-6">
          
          {/* Tag Category Badge */}
          <View className="bg-[#F6ECE1] rounded-lg px-3 py-1.5 self-start mb-3.5">
            <Text className="text-[#C28B47] text-xs font-bold uppercase tracking-wider">
              {item.categoryLabel || "Culture"}
            </Text>
          </View>

          {/* Title */}
          <Text className="text-gray-900 text-3xl font-extrabold mb-4 leading-9">
            {item.name}
          </Text>

          {/* Reading Statistics Row */}
          <View className="flex-row items-center mb-6 pb-5 border-b border-gray-100">
            <View className="flex-row items-center mr-6">
              <Ionicons name="time-outline" size={16} color="#9CA3AF" />
              <Text className="text-gray-500 text-xs font-semibold ml-1.5">
                {item.readTime || "8 min read"}
              </Text>
            </View>

            <View className="flex-row items-center">
              <Ionicons name="heart-outline" size={16} color="#9CA3AF" />
              <Text className="text-gray-500 text-xs font-semibold ml-1.5">
                {item.likes || "1.2k"}
              </Text>
            </View>
          </View>

          {/* Body Paragraph Content */}
          <View className="mb-8">
            {renderContent()}
          </View>

          {/* Highlights Box Card */}
          {item.highlights && item.highlights.length > 0 && (
            <View className="bg-[#EEF7F2] rounded-3xl p-5 border border-emerald-100 mb-8 shadow-sm">
              <Text className="text-[#0B6B43] text-base font-bold mb-3 uppercase tracking-wider">
                Key Highlights
              </Text>
              {item.highlights.map((highlight, index) => (
                <View key={index} className="flex-row items-start mt-3">
                  <Ionicons name="checkmark" size={18} color="#0B6B43" className="mt-0.5" />
                  <Text className="text-gray-800 text-sm font-semibold ml-3 flex-1 leading-5">
                    {highlight}
                  </Text>
                </View>
              ))}
            </View>
          )}

        </View>
      </ScrollView>

      {/* 🎛️ STICKY ACTIONS BOTTOM PANEL */}
      <View
        className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-4 px-5 flex-row items-center justify-between shadow-2xl z-30"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -10 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
          elevation: 20
        }}
      >
        {isPlaying ? (
          /* 🔉 ACTIVE AUDIO PLAYER OVERLAY */
          <View className="flex-1 flex-row items-center justify-between mr-2 bg-emerald-50 rounded-full py-2 px-4 border border-emerald-100">
            <TouchableOpacity
              onPress={handleToggleSpeech}
              className="w-8 h-8 rounded-full bg-[#0B6B43] items-center justify-center shadow-sm"
            >
              <Ionicons name="pause" size={16} color="white" />
            </TouchableOpacity>

            <View className="flex-1 mx-3 justify-center">
              <Text className="text-gray-800 text-[11px] font-bold" numberOfLines={1}>
                Narrating: {item.name}
              </Text>
              {/* Animated pulse dots to show live reading */}
              <View className="flex-row mt-1.5 space-x-1 gap-1">
                {[0,1,2].map(i => (
                  <View key={i} className="w-1.5 h-1.5 rounded-full bg-[#0B6B43]" />
                ))}
              </View>
            </View>

            <TouchableOpacity onPress={handleToggleSpeech}>
              <Ionicons name="close" size={18} color="#6B7280" />
            </TouchableOpacity>
          </View>
        ) : (
          /* 🎧 STANDARD NARRATION TRIGGER */
          <TouchableOpacity
            onPress={handleToggleSpeech}
            className="flex-row items-center bg-[#0B6B43] rounded-full py-3.5 px-6 shadow-sm active:opacity-90"
          >
            <Ionicons name="headset-outline" size={18} color="white" />
            <Text className="text-white font-bold text-sm ml-2 uppercase tracking-wider">
              Listen
            </Text>
          </TouchableOpacity>
        )}

        {/* 🔠 FONT SIZE CONFIGURATOR */}
        <View className="flex-row items-center ml-4 pr-2">
          <TouchableOpacity
            onPress={() => setFontSize(Math.max(12, fontSize - 1))}
            className="p-2"
          >
            <Text className="text-gray-900 font-bold text-[15px]">A-</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setFontSize(Math.min(24, fontSize + 1))}
            className="p-2 ml-3"
          >
            <Text className="text-gray-900 font-bold text-[18px]">A+</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>
  );
}