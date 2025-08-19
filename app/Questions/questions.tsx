import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

// Keys for categories (feel free to rename)
export type CategoryKey = "about" | "disabilities" | "lgtbq" | "more";

const PILLS: { key: CategoryKey; label: string }[] = [
  { key: "about", label: "about me" },
  { key: "disabilities", label: "disabilities" },
  { key: "lgtbq", label: "LGTBQIA+" },
  { key: "more", label: "story time" },
];

// Hardcoded questions (3 per category)
const QUESTIONS: Record<CategoryKey, string[]> = {
  about: [
    "What's a small joy that made your week?",
    "My comfort food is…",
    "What's your ideal Sunday?",
    "A random skill I have is…",
  ],
  disabilities: [
    "Is there anything I should know to make hanging out easier?",
    "Whats a quick fact about how you navigate the world?",
    "What communication style works best for you? (e.g. text first, video call, face-to-face)",
    "Right now I’m deeply into: (your special hyperfocus)",
    "What's a misconception you wish people dropped?",
  ],
  lgtbq: [
    "Who's favourite LGTBQIA+ Icon and why?",
    "How do you like to signal interest?",
    "The moment you first realised you were gay:",
  ],
  more: [
    "My biggest dating fail",
    "Never have I ever",
    "Two truths and a lie:",
  ],
};

export default function Questions({
  initial = "about",
  onCategoryChange,
}: {
  initial?: CategoryKey;
  onCategoryChange?: (cat: CategoryKey) => void;
}) {
  const [active, setActive] = useState<CategoryKey>(initial);

  const handleSelect = (key: CategoryKey) => {
    setActive(key);
    onCategoryChange?.(key);
  };

  const qs = QUESTIONS[active] ?? [];

  return (
    <View style={styles.container}>
      {/* Pills row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pillsRow}
      >
        {PILLS.map((p) => {
          const selected = p.key === active;
          return (
            <Pressable
              key={p.key}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => handleSelect(p.key)}
              style={[styles.pill, selected && styles.pillSelected]}
            >
              <Text
                style={[styles.pillText, selected && styles.pillTextSelected]}
              >
                {p.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Questions list */}
      <View style={styles.list}>
        {qs.map((q, i) => (
          <View key={`${active}-${i}`} style={styles.row}>
            <Text style={styles.question}>{q}</Text>
            {i < qs.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  pillsRow: {
    gap: 8,
    paddingVertical: 8,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#F3F4F6", // gray-100
    borderWidth: 1,
    borderColor: "#E5E7EB", // gray-200
  },
  pillSelected: {
    backgroundColor: "#ad7aff",
    borderColor: "#ad7aff",
  },
  pillText: {
    fontSize: 14,
    color: "#111827",
  },
  pillTextSelected: {
    color: "#ffffff",
    fontWeight: "600",
  },
  list: {
    marginTop: 12,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  row: {
    paddingHorizontal: 14,
    paddingVertical: 16,
  },
  question: {
    fontSize: 16,
    color: "#111827",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#E5E7EB",
    marginTop: 14,
  },
});
