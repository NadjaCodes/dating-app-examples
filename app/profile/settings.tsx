import { View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import SafeView from "@/components/SafeView";
import InfoMessage from "@/components/InfoMessage";
import FilterField, { FilterRule } from "@/app/profile/filterField";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default function Settings() {
  const [rule1, setRule1] = useState<FilterRule>({
    level: "must",
    attribute: null,
  });
  const [rule2, setRule2] = useState<FilterRule>({
    level: "must",
    attribute: null,
  });
  const [rule3, setRule3] = useState<FilterRule>({
    level: "must",
    attribute: null,
  });

  return (
    <SafeView>
      <ThemedText type={"title"}>Your filters & preferences</ThemedText>
      <InfoMessage
        text={
          "How matching suggestions work:\n" +
          "• We match your must-haves first\n" +
          "• Then we consider your nice-to-haves\n" +
          "• We prioritize recent activity (last 7 days)"
        }
      />
      <View style={styles.section}>
        <FilterField value={rule1} onChange={setRule1} />
        <FilterField value={rule2} onChange={setRule2} />
        <FilterField value={rule3} onChange={setRule3} />
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 16, paddingTop: 8, marginBottom: 8 },
  section: { marginBottom: 16, marginTop: 8, gap: 8 },
});
