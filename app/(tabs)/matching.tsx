import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { Stack, Link } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import SafeView from "@/components/SafeView";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function MatchingScreen() {
  return (
    <SafeView>
      <ThemedView style={styles.body}>
        <ThemedText type={"title"}> Matching</ThemedText>
      </ThemedView>
      <Link href="/Filters/settings" asChild style={styles.settingsBtn}>
        <Pressable
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel="Open settings"
        >
          <IconSymbol size={32} name="gearshape.fill" color="#111" />
        </Pressable>
      </Link>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  body: { padding: 16 },
  settingsBtn: {
    position: "absolute",
    right: 16,
    top: 8,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
