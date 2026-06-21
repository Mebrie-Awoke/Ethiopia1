import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Modal,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useFavorites } from "@/context/FavoritesContext";

const SETTINGS_KEY = "@ethioguide_settings";

// Traditional Ethiopian "Tibeb" border/pattern at the top of the header
const TibebPattern = () => {
  return (
    <View className="flex-row h-1.5 w-full">
      {[...Array(20)].map((_, i) => (
        <React.Fragment key={i}>
          <View className="flex-1 bg-[#078930]" style={{ height: 6 }} />
          <View className="flex-1 bg-[#FCDD09]" style={{ height: 6 }} />
          <View className="flex-1 bg-[#DA121A]" style={{ height: 6 }} />
        </React.Fragment>
      ))}
    </View>
  );
};

export default function SettingsScreen() {
  const router = useRouter();
  const { clearAllFavorites } = useFavorites();

  // --- IN-APP TOAST SYSTEM ---
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // --- LOAD PERSISTED SETTINGS ON MOUNT ---
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const stored = await AsyncStorage.getItem(SETTINGS_KEY);
        if (stored) {
          const prefs = JSON.parse(stored);
          if (prefs.dailyFact !== undefined) setDailyFact(prefs.dailyFact);
          if (prefs.articleAlerts !== undefined) setArticleAlerts(prefs.articleAlerts);
          if (prefs.festivalReminders !== undefined) setFestivalReminders(prefs.festivalReminders);
          if (prefs.aiUpdates !== undefined) setAiUpdates(prefs.aiUpdates);
          if (prefs.autoPlayAudio !== undefined) setAutoPlayAudio(prefs.autoPlayAudio);
          if (prefs.highContrast !== undefined) setHighContrast(prefs.highContrast);
          if (prefs.largerText !== undefined) setLargerText(prefs.largerText);
          if (prefs.language) setLanguage(prefs.language);
          if (prefs.fontSize) setFontSize(prefs.fontSize);
      
        }
      } catch (e) {
        console.error("Failed to load settings:", e);
      }
    };
    loadSettings();
  }, []);

  // --- PERSIST A SETTING KEY ---
  const persistSetting = useCallback(async (key, value) => {
    try {
      const stored = await AsyncStorage.getItem(SETTINGS_KEY);
      const current = stored ? JSON.parse(stored) : {};
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify({ ...current, [key]: value }));
    } catch (e) {
      console.error("Failed to save setting:", e);
    }
  }, []);

  

  // --- STATE FOR APP PREFERENCES ---
  const [language, setLanguage] = useState("English");
  const [theme, setTheme] = useState("Light");
  const [fontSize, setFontSize] = useState("Medium");

  // Audio settings
  const [autoPlayAudio, setAutoPlayAudio] = useState(true);
  const [voiceSpeed, setVoiceSpeed] = useState("1.0x");
  const [voiceLanguage, setVoiceLanguage] = useState("English");

  // --- STATE FOR NOTIFICATIONS ---
  const [dailyFact, setDailyFact] = useState(true);
  const [articleAlerts, setArticleAlerts] = useState(true);
  const [festivalReminders, setFestivalReminders] = useState(true);
  const [aiUpdates, setAiUpdates] = useState(false);

  // --- STATE FOR SAVED & STORAGE ---
  const [downloadedCount, setDownloadedCount] = useState(12);
  const [storageUsed, setStorageUsed] = useState(45); // MB
  const [cacheModalVisible, setCacheModalVisible] = useState(false);

  const handleClearCache = useCallback(async () => {
    setCacheModalVisible(false);
    setDownloadedCount(0);
    setStorageUsed(0);
    await clearAllFavorites();
    showToast("Cache and saved articles cleared!");
  }, [clearAllFavorites]);

  // --- STATE FOR AI ASSISTANT ---
  const [chatHistory, setChatHistory] = useState(true);
  const [aiResponseLanguage, setAiResponseLanguage] = useState("English");
  const [voiceInput, setVoiceInput] = useState(true);
  const [aiClearModalVisible, setAiClearModalVisible] = useState(false);

  const handleClearAIConversations = useCallback(async () => {
    setAiClearModalVisible(false);
    try {
      await AsyncStorage.removeItem("@ethioguide_chat_history");
      showToast("AI chat history deleted successfully!");
    } catch (e) {
      showToast("Failed to clear chat history.");
    }
  }, []);

  // --- STATE FOR ACCESSIBILITY ---
  const [highContrast, setHighContrast] = useState(false);
  const [largerText, setLargerText] = useState(false);
  const [screenReader, setScreenReader] = useState(false);

  // --- STATE FOR GENERAL SELECTOR MODAL ---
  const [optionModalVisible, setOptionModalVisible] = useState(false);
  const [optionTitle, setOptionTitle] = useState("");
  const [optionsList, setOptionsList] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [onSelectCallback, setOnSelectCallback] = useState(() => { });

  const openOptionModal = (title, options, currentVal, callback) => {
    setOptionTitle(title);
    setOptionsList(options);
    setSelectedValue(currentVal);
    setOnSelectCallback(() => callback);
    setOptionModalVisible(true);
  };

  const handleSelectOption = (value) => {
    onSelectCallback(value);
    setOptionModalVisible(false);
    showToast(`Updated to ${value}`);
  };

  

  // --- REUSABLE WIDGETS ---
  const SettingRow = ({ icon, label, value, onPress, isSwitch, switchValue, onSwitchChange, isDestructive }) => {
    const content = (
      <View className="flex-row items-center justify-between py-3.5 border-b border-gray-100 last:border-b-0">
        <View className="flex-row items-center flex-1 mr-2">
          <View className="w-8 h-8 rounded-lg items-center justify-center mr-3 bg-gray-50">
            <Ionicons
              name={icon}
              size={20}
              color={isDestructive ? "#DA121A" : "#0B6B43"}
            />
          </View>
          <Text className={`text-[15px] font-medium ${isDestructive ? "text-red-600" : "text-gray-800"}`}>
            {label}
          </Text>
        </View>

        {isSwitch ? (
          <Switch
            value={switchValue}
            onValueChange={onSwitchChange}
            trackColor={{ false: "#E5E7EB", true: "#0B6B43" }}
            thumbColor={switchValue ? "#FFFFFF" : "#F3F4F6"}
          />
        ) : (
          <View className="flex-row items-center">
            {value && (
              <Text className="text-gray-400 text-[14px] mr-1">{value}</Text>
            )}
            <Ionicons name="chevron-forward" size={16} color="#CCCCCC" />
          </View>
        )}
      </View>
    );

    if (isSwitch) {
      return content;
    }

    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
        {content}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F5F7FA]" edges={["top"]}>
      {/* Authentic Ethiopian Tibeb stripe at very top */}
      <TibebPattern />

      {/* Modern High-Fidelity Header */}
      <View className="bg-white px-4 py-3 border-b border-gray-100 flex-row items-center justify-between">
        <View className="flex-row items-center space-x-2">
          <TouchableOpacity onPress={() => router.back()} className="p-1 mr-1 rounded-full active:bg-gray-100">
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>
          <View className="w-2.5 h-5 bg-[#0B6B43] rounded-sm mr-2" />
          <Text className="text-2xl font-bold text-gray-900">Settings</Text>
        </View>
        <TouchableOpacity
          onPress={() => showToast("All settings are up to date.")}
          className="p-1.5 rounded-full bg-gray-50"
        >
          <Ionicons name="cloud-done-outline" size={22} color="#0B6B43" />
        </TouchableOpacity>
      </View>

      {/* Floating Premium Toast Notifications */}
      {toastMessage && (
        <View
          className="absolute top-16 left-4 right-4 bg-gray-900/95 py-3.5 px-5 rounded-2xl shadow-lg z-50 flex-row items-center"
          style={{ elevation: 5 }}
        >
          <View className="w-6 h-6 rounded-full bg-[#0B6B43]/20 items-center justify-center mr-3">
            <Ionicons name="checkmark-circle" size={18} color="#0B6B43" />
          </View>
          <Text className="text-white font-medium text-[14px] flex-1">
            {toastMessage}
          </Text>
        </View>
      )}

      <ScrollView
        className="flex-1 px-4 pt-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Profile card removed per request */}

        {/* --- APP PREFERENCES SECTION --- */}
        <Text className="text-[12px] font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">
          App Preferences
        </Text>
        <View className="bg-white rounded-3xl px-4 py-2 mb-5 shadow-sm border border-gray-100">
          <SettingRow
            icon="language-outline"
            label="Language"
            value={language}
            onPress={() =>
              openOptionModal(
                "App Language",
                ["English", "Amharic", "Afaan Oromo", "Tigrinya"],
                language,
                (v) => { setLanguage(v); persistSetting("language", v); }
              )
            }
          />
          <SettingRow
            icon="sunny-outline"
            label="Theme"
            value={theme}
            onPress={() =>
              openOptionModal(
                "App Theme",
                ["Light", "Dark", "System"],
                theme,
                setTheme
              )
            }
          />
          <SettingRow
            icon="text-outline"
            label="Font Size"
            value={fontSize}
            onPress={() =>
              openOptionModal(
                "Text Size",
                ["Small", "Medium", "Large"],
                fontSize,
                (v) => { setFontSize(v); persistSetting("fontSize", v); }
              )
            }
          />

          {/* Audio Settings Subset */}
          <SettingRow
            icon="volume-high-outline"
            label="Auto-play Audio Narration"
            isSwitch={true}
            switchValue={autoPlayAudio}
            onSwitchChange={(v) => { setAutoPlayAudio(v); persistSetting("autoPlayAudio", v); }}
          />
          <SettingRow
            icon="speedometer-outline"
            label="Narration Speed"
            value={voiceSpeed}
            onPress={() =>
              openOptionModal(
                "Voice Narration Speed",
                ["0.75x", "1.0x", "1.25x", "1.5x"],
                voiceSpeed,
                setVoiceSpeed
              )
            }
          />
          <SettingRow
            icon="mic-outline"
            label="Voice Language"
            value={voiceLanguage}
            onPress={() =>
              openOptionModal(
                "Audio Guide Language",
                ["English", "Amharic"],
                voiceLanguage,
                setVoiceLanguage
              )
            }
          />
        </View>

        {/* --- NOTIFICATIONS SECTION --- */}
        <Text className="text-[12px] font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">
          Notifications
        </Text>
        <View className="bg-white rounded-3xl px-4 py-2 mb-5 shadow-sm border border-gray-100">
          <SettingRow
            icon="bulb-outline"
            label="Daily Ethiopian Fact"
            isSwitch={true}
            switchValue={dailyFact}
            onSwitchChange={(v) => { setDailyFact(v); persistSetting("dailyFact", v); }}
          />
          <SettingRow
            icon="document-text-outline"
            label="New Article Alerts"
            isSwitch={true}
            switchValue={articleAlerts}
            onSwitchChange={(v) => { setArticleAlerts(v); persistSetting("articleAlerts", v); }}
          />
          <SettingRow
            icon="calendar-outline"
            label="Festival Reminders"
            isSwitch={true}
            switchValue={festivalReminders}
            onSwitchChange={(v) => { setFestivalReminders(v); persistSetting("festivalReminders", v); }}
          />
          <SettingRow
            icon="chatbubbles-outline"
            label="AI Chat Updates"
            isSwitch={true}
            switchValue={aiUpdates}
            onSwitchChange={(v) => { setAiUpdates(v); persistSetting("aiUpdates", v); }}
          />
        </View>

        {/* --- SAVED & STORAGE SECTION --- */}
        <Text className="text-[12px] font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">
          Saved & Storage
        </Text>
        <View className="bg-white rounded-3xl px-4 py-2 mb-5 shadow-sm border border-gray-100">
          <SettingRow
            icon="download-outline"
            label="Downloaded Articles"
            value={`${downloadedCount} articles (${storageUsed} MB)`}
            onPress={() => showToast(`Offline Storage: ${storageUsed} MB used.`)}
          />
          <SettingRow
            icon="trash-outline"
            label="Clear Offline Cache"
            value="Clear"
            onPress={() => {
              if (storageUsed === 0) {
                showToast("Cache is already empty.");
                return;
              }
              setCacheModalVisible(true);
            }}
          />
        </View>

        {/* --- AI ASSISTANT SETTINGS --- */}
        <Text className="text-[12px] font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">
          AI Assistant Settings
        </Text>
        <View className="bg-white rounded-3xl px-4 py-2 mb-5 shadow-sm border border-gray-100">
          <SettingRow
            icon="time-outline"
            label="Save Chat History"
            isSwitch={true}
            switchValue={chatHistory}
            onSwitchChange={chatHistory ? () => setAiClearModalVisible(true) : () => setChatHistory(true)}
          />
          <SettingRow
            icon="chatbox-ellipses-outline"
            label="AI Response Language"
            value={aiResponseLanguage}
            onPress={() =>
              openOptionModal(
                "AI Assistant Language",
                ["English", "Amharic", "Afaan Oromo", "Tigrinya"],
                aiResponseLanguage,
                setAiResponseLanguage
              )
            }
          />
          <SettingRow
            icon="mic-circle-outline"
            label="Enable Voice Input"
            isSwitch={true}
            switchValue={voiceInput}
            onSwitchChange={setVoiceInput}
          />
          <SettingRow
            icon="close-circle-outline"
            label="Clear AI Conversations"
            value="Reset"
            onPress={() => setAiClearModalVisible(true)}
          />
        </View>

        {/* --- ACCESSIBILITY SECTION --- */}
        <Text className="text-[12px] font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">
          Accessibility
        </Text>
        <View className="bg-white rounded-3xl px-4 py-2 mb-5 shadow-sm border border-gray-100">
          <SettingRow
            icon="contrast-outline"
            label="High Contrast Mode"
            isSwitch={true}
            switchValue={highContrast}
            onSwitchChange={(v) => { setHighContrast(v); persistSetting("highContrast", v); }}
          />
          <SettingRow
            icon="resize-outline"
            label="Larger Text View"
            isSwitch={true}
            switchValue={largerText}
            onSwitchChange={(v) => { setLargerText(v); persistSetting("largerText", v); }}
          />
          <SettingRow
            icon="eye-outline"
            label="Screen Reader Support"
            isSwitch={true}
            switchValue={screenReader}
            onSwitchChange={(v) => { setScreenReader(v); persistSetting("screenReader", v); }}
          />
        </View>

        {/* --- ABOUT & SUPPORT SECTION --- */}
        <Text className="text-[12px] font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">
          About & Support
        </Text>
        <View className="bg-white rounded-3xl px-4 py-2 mb-5 shadow-sm border border-gray-100">
          <SettingRow
            icon="information-circle-outline"
            label="App Version"
            value="v1.2.0"
            onPress={() => showToast("EthioGuide v1.2.0 - Up to Date")}
          />
          <SettingRow
            icon="star-outline"
            label="Rate Our App"
            onPress={() => showToast("Thank you for your rating! ⭐⭐⭐⭐⭐")}
          />
          <SettingRow
            icon="shield-checkmark-outline"
            label="Privacy Policy & Terms"
            onPress={() => showToast("Opening Privacy Terms...")}
          />
          <SettingRow
            icon="help-buoy-outline"
            label="Contact Support"
            onPress={() => showToast("Support Ticket opened! We'll reply within 24h.")}
          />
        </View>

        {/* Logout entry removed per request */}
      </ScrollView>

      {/* ========================================================
          MODAL: PROFILE EDIT DIALOG
         ======================================================== */}
      {/* Profile edit modal removed */}

      {/* ========================================================
          MODAL: GENERAL OPTION SELECTOR
         ======================================================== */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={optionModalVisible}
        onRequestClose={() => setOptionModalVisible(false)}
      >
        <View className="flex-1 bg-black/60 justify-end">
          <View className="bg-white rounded-t-3xl p-6 shadow-2xl max-h-[80%]">
            <View className="flex-row justify-between items-center mb-5 pb-2 border-b border-gray-100">
              <Text className="text-gray-900 text-lg font-bold">{optionTitle}</Text>
              <TouchableOpacity
                onPress={() => setOptionModalVisible(false)}
                className="p-1 rounded-full bg-gray-50"
              >
                <Ionicons name="close" size={20} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView className="mb-4" showsVerticalScrollIndicator={false}>
              {optionsList.map((option) => {
                const isSelected = option === selectedValue;
                return (
                  <TouchableOpacity
                    key={option}
                    onPress={() => handleSelectOption(option)}
                    className={`flex-row items-center justify-between py-4 px-4 rounded-2xl mb-2.5 ${isSelected ? "bg-emerald-50/70 border border-emerald-100" : "bg-gray-50 border border-transparent"
                      }`}
                  >
                    <Text className={`text-[15px] font-medium ${isSelected ? "text-[#0B6B43]" : "text-gray-700"}`}>
                      {option}
                    </Text>
                    {isSelected && (
                      <Ionicons name="checkmark-circle" size={20} color="#0B6B43" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ========================================================
          MODAL: CONFIRMATION CLEAR CACHE
         ======================================================== */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={cacheModalVisible}
        onRequestClose={() => setCacheModalVisible(false)}
      >
        <View className="flex-1 bg-black/60 justify-center items-center px-6">
          <View className="bg-white rounded-3xl w-full p-6 shadow-2xl items-center text-center">
            <View className="w-14 h-14 rounded-full bg-amber-50 items-center justify-center mb-4 border border-amber-100">
              <Ionicons name="trash-bin-outline" size={28} color="#D97706" />
            </View>
            <Text className="text-gray-900 text-lg font-bold mb-2">Clear Offline Cache?</Text>
            <Text className="text-gray-500 text-sm text-center mb-6 pl-2 pr-2">
              This will remove all downloaded articles, voice narrations, and offline content ({storageUsed} MB) from your device. You'll need an active internet connection to reload them.
            </Text>

            <View className="flex-row space-x-3 w-full">
              <TouchableOpacity
                onPress={() => setCacheModalVisible(false)}
                className="flex-1 bg-gray-100 rounded-xl py-3 border border-gray-200 items-center justify-center mr-2"
              >
                <Text className="text-gray-600 font-semibold text-sm">Keep Files</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleClearCache}
                className="flex-1 bg-[#D97706] rounded-xl py-3 items-center justify-center ml-2 shadow-sm"
              >
                <Text className="text-white font-semibold text-sm">Clear Cache</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ========================================================
          MODAL: CONFIRMATION CLEAR AI CHAT HISTORY
         ======================================================== */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={aiClearModalVisible}
        onRequestClose={() => setAiClearModalVisible(false)}
      >
        <View className="flex-1 bg-black/60 justify-center items-center px-6">
          <View className="bg-white rounded-3xl w-full p-6 shadow-2xl items-center text-center">
            <View className="w-14 h-14 rounded-full bg-red-50 items-center justify-center mb-4 border border-red-100">
              <Ionicons name="chatbubbles-outline" size={28} color="#DA121A" />
            </View>
            <Text className="text-gray-900 text-lg font-bold mb-2">Delete AI History?</Text>
            <Text className="text-gray-500 text-sm text-center mb-6 pl-2 pr-2">
              Are you sure you want to permanently delete all your conversation history with the EthioGuide AI Assistant? This action cannot be undone.
            </Text>

            <View className="flex-row space-x-3 w-full">
              <TouchableOpacity
                onPress={() => {
                  setAiClearModalVisible(false);
                  // Ensure toggle is set back to active if we came from switch toggle change
                  setChatHistory(true);
                }}
                className="flex-1 bg-gray-100 rounded-xl py-3 border border-gray-200 items-center justify-center mr-2"
              >
                <Text className="text-gray-600 font-semibold text-sm">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleClearAIConversations();
                  setChatHistory(false);
                }}
                className="flex-1 bg-[#DA121A] rounded-xl py-3 items-center justify-center ml-2 shadow-sm"
              >
                <Text className="text-white font-semibold text-sm">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Logout modal removed */}
    </SafeAreaView>
  );
}