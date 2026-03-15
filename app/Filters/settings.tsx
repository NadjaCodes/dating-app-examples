import { View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import SafeView from "@/components/SafeView";
import InfoMessage from "@/components/InfoMessage";
import FilterField, { FilterRule } from "@/app/Filters/filterField";
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
          "Remember that you are free to change your preferences anytime. You can also control whether these preferences are visible to others."
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
