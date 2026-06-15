import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { PROFILE_MENU } from "@/assets/asset";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "@/utils/api";

const CHAT_STORAGE_KEY = "@ethioguide_chat_history";

// Welcome message
const WELCOME_MESSAGE = {
  id: "welcome_1",
  text: "Selam! 👋 I'm your Ethiopian assistant. Ask me anything about our culture, history, traditions, or beliefs.",
  sender: "ai",
  time: "9:40 AM",
  relatedIds: [],
};

// Simple keyword based AI fallback
function getAIReply(query) {
  const q = query.toLowerCase().trim();
  if (q.includes("menelik"))
    return {
      text: "Emperor Menelik II (1889–1913) is renowned for modernising Ethiopia and winning the Battle of Adwa in 1896, preserving Ethiopia's independence.",
      relatedIds: ["adwa", "menelik"],
    };
  if (q.includes("adwa"))
    return {
      text: "The Battle of Adwa (1 March 1896) was a decisive Ethiopian victory over Italy, led by Emperor Menelik II and Empress Taytu Betul.",
      relatedIds: ["adwa", "menelik"],
    };
  if (q.includes("coffee") || q.includes("ceremony"))
    return {
      text: "The Ethiopian coffee ceremony is a ritual where beans are roasted, ground by hand and brewed in a jebena, served in three rounds (Awol, Tona, Baraka) symbolising blessings.",
      relatedIds: ["coffee", "food_intro"],
    };
  if (q.includes("lalibela") || q.includes("church"))
    return {
      text: "Lalibela's eleven monolithic rock‑hewn churches were carved in the 12th century under King Gebre Meskel Lalibela, a UNESCO World Heritage site.",
      relatedIds: ["zagwe", "orthodox"],
    };
  if (q.includes("calendar"))
    return {
      text: "The Ethiopian calendar has 13 months – 12 of 30 days and a 5‑day (or 6‑day leap) Pagume – and runs 7–8 years behind the Gregorian calendar.",
      relatedIds: ["calendar", "aksum"],
    };
  if (q.includes("food") || q.includes("injera"))
    return {
      text: "Ethiopian cuisine centres on Injera, a sourdough flatbread made from teff, served with communal stews (wats) fostering the Gursha tradition.",
      relatedIds: ["food_intro", "injera"],
    };
  if (q.includes("geez") || q.includes("language") || q.includes("script"))
    return {
      text: "Ge‘ez is an ancient Semitic language of northern Ethiopia; today it survives as the liturgical language of the Ethiopian Orthodox Church.",
      relatedIds: ["geez", "orthodox"],
    };
  if (q.includes("timket") || q.includes("festival"))
    return {
      text: "Timkat is Ethiopia's Orthodox Epiphany celebration each January, featuring processions with the Tabot and baptism rites.",
      relatedIds: ["timket", "festivals_intro"],
    };
  // Default fallback
  return {
    text: "Selam! I'm here to guide you through Ethiopia's rich culture. Try asking about Menelik II, Adwa, Lalibela, or the coffee ceremony!",
    relatedIds: ["menelik", "adwa", "zagwe", "coffee"],
  };
}

export default function AIChatScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null);

  // Load persisted chat history
  useEffect(() => {
    AsyncStorage.getItem(CHAT_STORAGE_KEY)
      .then((stored) => {
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMessages(parsed);
          }
        }
      })
      .catch((e) => console.error("Failed to load chat:", e));
  }, []);

  // Save chat on change (skip welcome only)
  useEffect(() => {
    if (messages.length > 1) {
      AsyncStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages)).catch((e) =>
        console.error("Failed to save chat:", e)
      );
    }
  }, [messages]);

  // Auto‑scroll to newest message
  useEffect(() => {
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 150);
  }, [messages, loading]);

  const sendMessage = useCallback(
    (presetText) => {
      const text = (presetText || input).trim();
      if (!text) return;

      const userMsg = {
        id: `user_${Date.now()}`,
        text,
        sender: "user",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setLoading(true);

      const localReply = getAIReply(text);
      const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY || "";

      const appendAI = (replyText, relatedIds) => {
        setMessages((prev) => [
          ...prev,
          {
            id: `ai_${Date.now()}`,
            text: replyText,
            sender: "ai",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            relatedIds,
          },
        ]);
        setLoading(false);
      };

      setTimeout(() => {
        const backendUrl = `${API_BASE_URL}/get`;
        fetch(backendUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ msg: text }),
        })
          .then((r) => r.json())
          .then((data) => {
            const backendText = data?.answer;
            if (backendText) {
              appendAI(backendText, localReply.relatedIds);
              return;
            }

            // Fallback to Gemini if available
            if (apiKey) {
              fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    contents: [{ parts: [{ text: `You are an AI guide for ethioGuide, specializing in Ethiopian culture, history, traditions, and beliefs. Answer concisely in 2‑3 sentences. Question: ${text}` }] }],
                  }),
                }
              )
                .then((r) => r.json())
                .then((gdata) => {
                  const apiText = gdata?.candidates?.[0]?.content?.parts?.[0]?.text;
                  appendAI(apiText || localReply.text, localReply.relatedIds);
                })
                .catch(() => appendAI(localReply.text, localReply.relatedIds));
            } else {
              appendAI(localReply.text, localReply.relatedIds);
            }
          })
          .catch(() => {
            // Backend unreachable — fallback to Gemini or local
            if (apiKey) {
              fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    contents: [{ parts: [{ text: `You are an AI guide for ethioGuide, specializing in Ethiopian culture, history, traditions, and beliefs. Answer concisely in 2‑3 sentences. Question: ${text}` }] }],
                  }),
                }
              )
                .then((r) => r.json())
                .then((gdata) => {
                  const apiText = gdata?.candidates?.[0]?.content?.parts?.[0]?.text;
                  appendAI(apiText || localReply.text, localReply.relatedIds);
                })
                .catch(() => appendAI(localReply.text, localReply.relatedIds));
            } else {
              appendAI(localReply.text, localReply.relatedIds);
            }
          });
      }, 1000);
    },
    [input]
  );

  const handleClearChat = useCallback(async () => {
    setMessages([
      { ...WELCOME_MESSAGE, id: `welcome_${Date.now()}`, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
    ]);
    try {
      await AsyncStorage.removeItem(CHAT_STORAGE_KEY);
    } catch (e) {
      console.error("Failed to clear chat:", e);
    }
  }, []);

  const allArticles = PROFILE_MENU.flatMap((s) => s.data);

  const renderMessage = ({ item }) => {
    const isUser = item.sender === "user";
    const relatedArticles =
      !isUser && Array.isArray(item.relatedIds)
        ? allArticles.filter((a) => item.relatedIds.includes(a.id))
        : [];

    return (
      <View style={{ marginBottom: 20, paddingHorizontal: 16 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: isUser ? "flex-end" : "flex-start",
            alignItems: "flex-end",
          }}
        >
          {!isUser && (
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: "#0D2E20",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 8,
                marginBottom: 2,
                borderWidth: 1,
                borderColor: "rgba(52,211,153,0.2)",
              }}
            >
              <Text style={{ fontSize: 16 }}>🇪🇹</Text>
            </View>
          )}
          <View
            style={{
              maxWidth: "76%",
              backgroundColor: isUser ? "#0B6B43" : "#0D2E20",
              borderTopLeftRadius: 18,
              borderTopRightRadius: 18,
              borderBottomLeftRadius: isUser ? 18 : 4,
              borderBottomRightRadius: isUser ? 4 : 18,
              padding: 14,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 14, lineHeight: 22, fontWeight: "500" }}>
              {item.text}
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginTop: 6 }}>
              <Text style={{ color: "rgba(167,243,208,0.5)", fontSize: 10, marginRight: 4 }}>
                {item.time || ""}
              </Text>
              {isUser && <Ionicons name="checkmark-done" size={13} color="#34D399" />}
            </View>
          </View>
        </View>
        {!isUser && relatedArticles.length > 0 && (
          <View style={{ marginLeft: 40, marginTop: 12 }}>
            <Text
              style={{
                color: "#34D399",
                fontSize: 10,
                fontWeight: "800",
                textTransform: "uppercase",
                letterSpacing: 1.2,
                marginBottom: 8,
              }}
            >
              Learn More
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10, paddingRight: 16 }}>
              {relatedArticles.map((art) => (
                <TouchableOpacity
                  key={art.id}
                  onPress={() => router.push(`/details/${art.id}`)}
                  activeOpacity={0.85}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#0D2E20",
                    borderRadius: 16,
                    padding: 8,
                    width: 176,
                    height: 56,
                    borderWidth: 1,
                    borderColor: "rgba(52,211,153,0.1)",
                  }}
                >
                  <Image source={art.icon} style={{ width: 40, height: 40, borderRadius: 10 }} resizeMode="cover" />
                  <View style={{ marginLeft: 10, flex: 1, paddingRight: 4 }}>
                    <Text style={{ color: "#fff", fontSize: 11, fontWeight: "700" }}>{art.name}</Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        color: "rgba(167,243,208,0.5)",
                        fontSize: 9,
                        fontWeight: "700",
                        textTransform: "uppercase",
                        letterSpacing: 0.8,
                        marginTop: 2,
                      }}
                    >
                      {art.categoryLabel || "Culture"}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#032014" }} edges={["top"]}>
        <StatusBar style="light" />
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            paddingTop: 12,
            paddingBottom: 14,
            borderBottomWidth: 1,
            borderBottomColor: "rgba(11,51,36,0.5)",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => router.back()} style={{ padding: 4, marginRight: 10 }}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <View>
              <Text style={{ color: "#fff", fontSize: 17, fontWeight: "700" }}>Ask Ethiopian</Text>
              <Text style={{ color: "#34D399", fontSize: 11, fontWeight: "500", opacity: 0.85, marginTop: 2 }}>
                Your smart guide to Ethiopia
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={handleClearChat}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#0D2E20",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "rgba(52,211,153,0.15)",
            }}
          >
            <Ionicons name="trash-outline" size={18} color="#34D399" />
          </TouchableOpacity>
        </View>
        {/* Messages list */}
        <FlatList
          ref={flatListRef}
          style={{ flex: 1 }}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={loading ? (
            <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 8, marginLeft: 40 }}>
              <ActivityIndicator size="small" color="#34D399" />
              <Text style={{ color: "rgba(167,243,208,0.5)", fontSize: 12, fontWeight: "600", marginLeft: 8 }}>
                Searching guidebooks...
              </Text>
            </View>
          ) : null}
        />
        {/* Input bar */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 12,
            paddingVertical: 10,
            borderTopWidth: 1,
            borderTopColor: "rgba(11,51,36,0.3)",
            backgroundColor: "#032014",
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#0D2E20",
              borderRadius: 24,
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderWidth: 1,
              borderColor: "rgba(6,26,18,0.4)",
              minHeight: 48,
            }}
          >
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Ask about Ethiopia..."
              placeholderTextColor="#5A7D6E"
              onSubmitEditing={() => sendMessage()}
              returnKeyType="send"
              style={{ flex: 1, color: "#fff", fontSize: 14 }}
            />
            <TouchableOpacity onPress={() => sendMessage("Tell me an interesting fact about Ethiopian history.")} style={{ padding: 4, marginLeft: 6 }}>
              <Ionicons name="mic" size={20} color="#34D399" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => sendMessage()} activeOpacity={0.8} style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: "#0B6B43",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 10,
            elevation: 4,
          }}>
            <Ionicons name="send" size={17} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}