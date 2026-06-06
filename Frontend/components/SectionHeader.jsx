import { View, Text, TouchableOpacity } from "react-native";
import { ChevronDown } from "lucide-react-native";

export default function SectionHeader({ title, isOpen, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center justify-between px-4 py-3 rounded-xl m-2
        ${isOpen ? "bg-blue-900" : "bg-white"}
      `}
    >
      {/* Title */}
      <Text
        className={`text-base font-semibold ${
          isOpen ? "text-white" : "text-black"
        }`}
      >
        {title}
      </Text>

      {/* Arrow */}
      <View className={`${isOpen ? "rotate-180" : "rotate-0"}`}>
        <ChevronDown size={20} color={isOpen ? "white" : "black"} />
      </View>
    </TouchableOpacity>
  );
}