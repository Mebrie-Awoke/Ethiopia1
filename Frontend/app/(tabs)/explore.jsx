import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { PROFILE_MENU, IMAGES } from "@/assets/asset";
import { useFavorites } from "@/context/FavoritesContext";

export default function Explore() {
  const router = useRouter();
  const [selectedChip, setSelectedChip] = useState("All");
  const { toggleFavorite, isFavorite } = useFavorites();

  // Chips list matching Screen 2
  const categoryChips = ["All", "Culture", "History", "Traditions", "Beliefs"];

  const exploreCategories = [
    {
      id: "culture",
      title: "Culture",
      count: "52 Articles",
      img: IMAGES.timket,
      targetSection: "Festivals",
    },
    {
      id: "history",
      title: "History",
      count: "38 Articles",
      img: IMAGES.aksum,
      targetSection: "History",
    },
    {
      id: "traditions",
      title: "Traditions",
      count: "27 Articles",
      img: IMAGES.habesha,
      targetSection: "Traditional Clothing",
    },
    {
      id: "beliefs",
      title: "Beliefs",
      count: "19 Articles",
      img: IMAGES.orthodox,
      targetSection: "Religion",
    },
  ];

  // Popular Topics map matching Screen 2 grid and linking to actual articles
  const popularTopics = [
    {
      id: "calendar",
      title: "Ethiopian Calendar",
      img: IMAGES.aksum,
      category: "History",
    },
    {
      id: "festivals_intro",
      title: "Festivals",
      img: IMAGES.timket,
      category: "Culture",
    },
    {
      id: "geez",
      title: "Ge'ez Language",
      img: IMAGES.simien,
      category: "Beliefs",
    },
    {
      id: "food_intro",
      title: "Ethiopian Food",
      img: IMAGES.injera,
      category: "Culture",
    },
  ];

  // Quick facts state/indicators
  const [activeFactIndex, setActiveFactIndex] = useState(0);
  const factsList = [
    "Ethiopia is the only African country that was never colonized.",
    "Ethiopia is home to the source of the Blue Nile River.",
    "The Ethiopian calendar has 13 months and is 7-8 years behind the Gregorian calendar.",
  ];

  // New Additions list matching Screen 2
  const newAdditions = [
    {
      id: "zagwe",
      title: "Rock-Hewn Churches",
      readTime: "11 min read",
      img: IMAGES.lalibela,
      category: "History",
    },
    {
      id: "habesha",
      title: "Ethiopian Clothing",
      readTime: "8 min read",
      img: IMAGES.clothing,
      category: "Traditions",
    },
  ];

  const allArticles = PROFILE_MENU.flatMap((section) =>
    section.data.map((item) => ({
      ...item,
      sectionTitle: section.title,
      sectionId: section.id,
    }))
  );

  const categoryImageMap = {
    Culture: IMAGES.timket,
    History: IMAGES.aksum,
    Traditions: IMAGES.habesha,
    Beliefs: IMAGES.orthodox,
  };

  const categoriesToDisplay = exploreCategories;

  // FILTER LOGIC FOR MAIN SCREEN ITEMS BASED ON ACTIVE CHIP
  const matchesChip = (itemCategory) => {
    if (selectedChip === "All") return true;
    return itemCategory.toLowerCase() === selectedChip.toLowerCase();
  };

  const visiblePopularTopics = popularTopics.filter((topic) =>
    matchesChip(topic.category)
  );

  const visibleNewAdditions = newAdditions.filter((addition) =>
    matchesChip(addition.category)
  );

  return (
    <SafeAreaView className="flex-1 bg-[#FAF9F5]" style={{ flex: 1 }}>
      
      {/* --- MOCKUP HEADER (NO SEARCH BAR) --- */}
      <View className="bg-[#FAF9F5] px-4 py-3 pb-1 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-2 p-1 rounded-full active:bg-gray-200">
            <Ionicons name="arrow-back" size={26} color="#1F2937" />
          </TouchableOpacity>
          <Text className="text-3xl font-bold text-gray-900 tracking-tight">Explore</Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* 1. HORIZONTAL CATEGORY FILTER CHIPS */}
        <View className="py-4 pt-2">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            className="flex-row"
          >
            {categoryChips.map((chip) => {
              const isSelected = selectedChip === chip;
              return (
                <TouchableOpacity
                  key={chip}
                  onPress={() => setSelectedChip(chip)}
                  className={`px-4 py-2 rounded-full mr-2 border ${
                    isSelected
                      ? "bg-[#0B6B43] border-[#0B6B43]"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      isSelected ? "text-white" : "text-gray-500"
                    }`}
                  >
                    {chip}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* 2. POPULAR TOPICS SECTION */}
        {visiblePopularTopics.length > 0 && (
          <View className="px-4 mb-6">
            <View className="flex-row justify-between items-center mb-3.5 px-1">
              <Text className="text-gray-900 text-lg font-bold">Popular Topics</Text>
              <TouchableOpacity onPress={() => setSelectedChip("All")}>
                <Text className="text-[#0B6B43] text-xs font-bold uppercase tracking-wide">View All</Text>
              </TouchableOpacity>
            </View>

            {/* 2x2 Popular Grid Layout */}
            <View className="flex-row flex-wrap justify-between">
              {visiblePopularTopics.map((topic) => (
                <TouchableOpacity
                  key={topic.title}
                  activeOpacity={0.85}
                  onPress={() => router.push(`/details/${topic.id}`)}
                  className="w-[48%] h-28 rounded-2xl overflow-hidden mb-3 shadow-sm"
                >
                  <ImageBackground
                    source={topic.img}
                    className="w-full h-full justify-end p-3.5"
                  >
                    <View className="absolute inset-0 bg-black/40" style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.4)" }} />
                    <Text className="text-white text-[13px] leading-4 font-bold tracking-wide z-10" numberOfLines={2}>
                      {topic.title}
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* 3. "DID YOU KNOW" QUICK FACTS SLIDER CARD */}
        <View className="px-4 mb-6">
          <Text className="text-gray-900 text-lg font-bold mb-3.5 px-1">Quick Facts</Text>
          <TouchableOpacity 
            activeOpacity={0.9}
            onPress={() => {
              setActiveFactIndex((prev) => (prev + 1) % factsList.length);
            }}
            className="rounded-[24px] p-5 flex-row items-center justify-between"
            style={{ backgroundColor: "#EEF7F2" }}
          >
            {/* Fact Context */}
            <View className="flex-1 pr-4">
              <Text className="text-gray-900 text-[15px] font-bold leading-5 mb-2">
                Did You Know?
              </Text>
              <Text className="text-gray-700 text-sm leading-5 font-medium min-h-[40px]">
                {factsList[activeFactIndex]}
              </Text>

              {/* Dots indicators */}
              <View className="flex-row items-center mt-3 space-x-1 flex-row gap-1">
                {factsList.map((_, i) => (
                  <View
                    key={i}
                    className={`h-1.5 rounded-full ${
                      activeFactIndex === i ? "w-4 bg-[#0B6B43]" : "w-1.5 bg-[#BCDCCB]"
                    }`}
                  />
                ))}
              </View>
            </View>

            {/* Ethiopian Flag circular badge */}
            <View className="w-12 h-12 bg-white rounded-xl shadow-sm border border-emerald-50 items-center justify-center">
              <Text style={{ fontSize: 24 }}>🇪🇹</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* 4. NEW ADDITIONS VERTICAL FEED */}
        {visibleNewAdditions.length > 0 && (
          <View className="px-4 mb-2">
            <View className="flex-row justify-between items-center mb-3.5 px-1">
              <Text className="text-gray-900 text-lg font-bold">New Additions</Text>
              <TouchableOpacity onPress={() => setSelectedChip("All")}>
                <Text className="text-[#0B6B43] text-xs font-bold uppercase tracking-wide">View All</Text>
              </TouchableOpacity>
            </View>

            {/* Vertical Feed Cards */}
            <View className="space-y-3 flex-row flex-wrap gap-3">
              {visibleNewAdditions.map((item) => {
                const fullArticle = allArticles.find(art => art.id === item.id);
                const isFav = fullArticle ? isFavorite(fullArticle) : false;
                return (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.85}
                    onPress={() => router.push(`/details/${item.id}`)}
                    className="w-full bg-[#FAF9F5] rounded-lg p-0 flex-row items-center"
                  >
                    <Image
                      source={item.img}
                      className="w-[72px] h-[72px] rounded-[20px]"
                      resizeMode="cover"
                    />
                    
                    <View className="flex-1 ml-4 pr-1">
                      <Text className="text-gray-900 text-[15px] font-bold mb-1">
                        {item.title}
                      </Text>
                      <Text className="text-gray-500 text-xs font-medium">
                        {item.readTime}
                      </Text>
                    </View>

                    <TouchableOpacity 
                      className={`p-2 rounded-full mr-2`}
                      onPress={() => {
                        if (fullArticle) toggleFavorite(fullArticle);
                      }}
                    >
                      <Ionicons 
                        name={isFav ? "bookmark" : "bookmark-outline"} 
                        size={20} 
                        color={isFav ? "#0B6B43" : "#1F2937"} 
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}