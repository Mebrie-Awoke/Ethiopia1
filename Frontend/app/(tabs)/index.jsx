import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { IMAGES } from "@/assets/asset";
import { Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();

  // Categories data matching the mockup Screen 1
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

  return (
    <SafeAreaView className="flex-1 bg-[#F8F7F3]"  edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        
        {/* --- PREMIUM HERO SUNSET HEADER --- */}
        <View>
          <ImageBackground
            source={IMAGES.aksum}
            style={{ height: height * 0.4 }}
            className="w-full overflow-hidden justify-between "
           >
            {/* Dark Orange/Sunset Warm Vignette Overlay */}
            

            {/* Header Icons Row */}
            <View className="flex-row justify-between items-center z-10 px-2 py-2">
              <TouchableOpacity 
                className=" w-10 h-10 rounded-full bg-white/15 backdrop-blur-md items-center justify-center border border-white/10"
                onPress={() => router.push("/settings")}
              >
                <Ionicons name="menu-outline" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md items-center justify-center border border-white/10"
                onPress={() => router.push("/settings")}
              >
                <Ionicons name="notifications-outline" size={20} color="#FFFFFF" />
                {/* Active Notification Dot */}
                <View className="absolute top-2 right-2 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-[#5A300C]" />
              </TouchableOpacity>
            </View>

            {/* Welcome Typography */}
            <View className="px-14 mb-20 z-10">
              <Text className="text-amber-100 text-sm font-semibold tracking-wider uppercase mb-1">
                Welcome to
              </Text>
              <Text className="text-white text-4xl font-extrabold tracking-tight" >
                Ethiopian
              </Text>
            </View>
           
          {/* --- SEARCH BAR (OVERLAPPING PILL CARD) --- */}

            <View className="absolute bottom-[+14px] left-4 right-4 px-8  z-20">
            <View 
              className="flex-row bg-white rounded-full items-center px-4 py-3 shadow-md border border-gray-100"
             >
              <Ionicons name="search" size={20} color="#9CA3AF" />
              <TextInput
                placeholder="Search topics, ask or explore..."
                className="flex-1 ml-2 text-[15px] text-gray-800 h-5"
                placeholderTextColor="#9CA3AF"
                onFocus={() => router.push("/explore")}
              />
              <TouchableOpacity onPress={() => router.push("/chat")}>
                <Ionicons name="mic" size={20} color="#0B6B43" />
              </TouchableOpacity>
            </View>
          </View>
          </ImageBackground>

          
        </View>

        {/* --- EXPLORE CATEGORIES 2x2 GRID --- */}
        <View className="px-4 my-6">
          <View className="flex-row justify-between items-center mb-3.5 px-1">
            <Text className="text-gray-900 text-lg font-bold">Explore Categories</Text>
            <TouchableOpacity onPress={() => router.push("/explore")}>
              <Text className="text-[#0B6B43] text-sm font-semibold">See All</Text>
            </TouchableOpacity>
          </View>

          {/* 2x2 Category Grid */}
          <View className="flex-row flex-wrap justify-between">
            {exploreCategories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                activeOpacity={0.85}
                onPress={() => router.push("/explore")}
                className="w-[48%] h-28 rounded-lg overflow-hidden mb-4 shadow-sm"
               >
                <ImageBackground
                  source={cat.img}
                  className="w-full h-full justify-end p-3.5"
                >
                  {/* Category Card Contrast Dark Overlay */}
                  <View className="absolute inset-0 bg-black/35" style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.38)" }} />
                  
                  {/* Category Labels */}
                  <View className="z-10">
                    <Text className="text-white text-base font-bold tracking-wide">
                      {cat.title}
                    </Text>
                    <Text className="text-gray-200 text-[11px] font-medium mt-0.5 opacity-90">
                      {cat.count}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* --- ASK ETHIOPIAN AI CARD --- */}
        <View className="px-4 mb-6">
          <View 
            className="w-full h-28  rounded-lg p-5 flex-row items-center justify-between shadow-sm"
            style={{ backgroundColor: "#0F6B50" }}
          >
            {/* Promotional Content */}
            <View className="flex-1 flex-col">
              <Text className="text-white text-lg ">
                Ask Ethiopian AI
              </Text>
              <Text className=" font-medium mb-4 ">
                Get instant answers about Ethiopia
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/chat")}
                className="self-start bg-white px-2 mb-4 rounded-full hover:bg-green-400"
              >
                <Text className="text-lg text-green-800 font-bold uppercase ">
                  Start Chat
                </Text>
              </TouchableOpacity>
            </View>

            {/* Cute 3D Tibeb Robot Helper Image */}
            <Image
              source={require("../../assets/images/tibeb_robot.png")}
              className=""
             style={{ height: height * 0.4, width: 80, borderRadius : 30 }}
             
              resizeMode="contain"
            />
          </View>
        </View>

        {/* --- CONTINUE LEARNING SECTION (FLAGSHIP DETAILS CARD) --- */}
        <View className="px-4 mb-8 pb-10">
          <View className="flex-row justify-between  items-center mb-3.5 px-1">
            <Text className="text-gray-900 text-lg font-bold">Continue Learning</Text>
            <TouchableOpacity onPress={() => router.push("/explore")}>
              <Text className="text-gray-400 text-sm font-semibold">Recently Viewed</Text>
            </TouchableOpacity>
           </View>

           {/* Beautiful Coffee Ceremony Details Card */}
           <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push("/details/coffee")}
            className="bg-white rounded-lg p-3 flex-row items-center border border-gray-100 shadow-sm"
           
           >
            <Image
              source={IMAGES.coffee}
              className="w-20 h-20 rounded-lg"
              resizeMode="cover"
            />
            
            <View className="flex-1 ml-4 pr-1">
              <Text className="text-gray-900 text-base font-bold mb-1">
                The Coffee Ceremony
              </Text>
              <Text className="text-gray-500 text-xs leading-4" numberOfLines={2}>
                A symbol of hospitality and unity. Green coffee beans are roasted and brewed in a jebena.
              </Text>
            </View>

            <Pressable 
              className="p-2 mr-1"
              onPress={() => router.push("/favorite")}
            >
              <Ionicons name="bookmark-outline" size={20} color="#6B7280" />
            </Pressable>
           </TouchableOpacity>
          </View>

      </ScrollView>
    </SafeAreaView>
  );
}
