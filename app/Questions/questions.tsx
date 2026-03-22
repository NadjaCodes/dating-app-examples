import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useColorScheme } from "@/hooks/useColorScheme";


// Keys for categories (feel free to rename)
export type CategoryKey = "about" | "disabilities" | "lgtbq" | "more";

const PILLS: { key: CategoryKey; label: string }[] = [
  { key: "about", label: "Hobbies & Lifestyle" },
  { key: "disabilities", label: "Disability & Accessibility Needs" },
  { key: "lgtbq", label: "Values & Beliefs" },
  { key: "more", label: "Story Time" },
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

const VISIBILITY_OPTIONS = [
  { key: "profile", icon: "eye.fill", label: "Visible in \n Profile" },
  { key: "match", icon: "person.2.fill", label: "Visible after \n Match" },
  { key: "never", icon: "nosign", label: "Hide Question" },
];

export default function Questions({
  initial = "about",
  onCategoryChange,
}: {
  initial?: CategoryKey;
  onCategoryChange?: (cat: CategoryKey) => void;
}) {
    const colorScheme = useColorScheme();
  const [active, setActive] = useState<CategoryKey>(initial);
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState("profile");
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleSelect = (key: CategoryKey) => {
    setActive(key);
    onCategoryChange?.(key);
  };

  const qs = QUESTIONS[active] ?? [];
  const lastIndex = qs.length - 1;

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
        {qs.map((q, i) => {
          const isActive = i === activeQuestion;

          return (
            <Pressable
              key={`${active}-${i}`}
              onPress={() =>
                setActiveQuestion(activeQuestion === i ? null : i)
              }
              style={[
                styles.row,
                isActive && styles.selectedRow,
              ]}

            >
              <View style={styles.questionRow}>
                <Text style={styles.question}>{q}</Text>
                <IconSymbol
                            size={16}
                            name={isActive ? "chevron.up" : "chevron.down"}
                            color="#111"
                          />
              </View>

              {/* Show input + options ONLY if active */}
              {isActive && (
                <>
                  <TextInput
                    style={styles.input}
                    value={answers[q] || ""}
                      onChangeText={(text) =>
                        setAnswers((prev) => ({ ...prev, [q]: text }))
                      }
                    placeholder="Type your answer here"
                    multiline
                  />

                  <View style={styles.optionsContainer}>
                    {VISIBILITY_OPTIONS.map((opt) => {
                      const isSelected = selectedOption === opt.key;

                      return (
                        <Pressable
                          key={opt.key}
                          onPress={() => setSelectedOption(opt.key)}
                          style={[
                            styles.optionButton,
                            isSelected && styles.optionSelected,
                          ]}
                        >
                          <IconSymbol
                            size={18}
                            name={opt.icon}
                            color={isSelected ? "#ffffff" : "#6B7280"}
                          />
                          <Text
                            style={[
                              styles.optionText,
                              isSelected && styles.optionTextSelected,
                            ]}
                          >
                            {opt.label}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </>
              )}

              {i < qs.length - 1 && <View style={styles.divider} />}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  input: {
    marginTop: 12,
      borderWidth: 1,
      borderColor: "#E5E7EB",
      borderRadius: 8,
      padding: 10,
      fontSize: 14,
      backgroundColor: "#ffffff",
      minHeight: 60,
      textAlignVertical: "top",
  },
    questionRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginRight: 20
    },

    arrow: {
      fontSize: 18,
      color: "#6B7280", // subtle gray

    },
    optionsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 12,
      gap: 8,
    },

    optionButton: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      paddingVertical: 10,
      borderRadius: 10,
      backgroundColor: "#F3F4F6",
      borderWidth: 1,
      borderColor: "#E5E7EB",
    },

    optionSelected: {
      backgroundColor: "#ad7aff",
      borderColor: "#ad7aff",
    },

    optionText: {
      fontSize: 12,
      color: "#6B7280",
      textAlign: "left"
    },

    optionTextSelected: {
      color: "#ffffff",
      fontWeight: "600",
    },
    optionTextSelected: {
      color: "#ffffff",
      fontWeight: "600",
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
    marginRight: 5
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#E5E7EB",
    marginTop: 14,
  },
});
