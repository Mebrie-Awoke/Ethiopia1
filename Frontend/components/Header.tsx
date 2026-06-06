import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";

type HeaderProps = {
  title?: string;
  showBack?: boolean;
}

export default function Header({title, showBack}: HeaderProps) {
  const router = useRouter();
  return (
    <View className="bg-white h-16 flex-row items-center px-4 border-b border-gray-100">
      {showBack && (
        <TouchableOpacity onPress={() => router.back()} className="p-1 mr-3 rounded-full active:bg-gray-100">
          <Ionicons name="arrow-back" size={22} color="#1F2937" />
        </TouchableOpacity>
      )}
      {title && (
        <Text className="text-xl font-bold text-gray-900">{title}</Text>
      )}
    </View>
  )
}