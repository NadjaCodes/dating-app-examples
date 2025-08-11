import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, Pressable, AppState } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import SafeView from "@/components/SafeView";
import profiles from "@/constants/profiles.json";
import Messages from "@/app/profile/messages";
import { IconSymbol } from "@/components/ui/IconSymbol";
import InfoMessage from "@/components/InfoMessage";

export default function HomeScreen() {
  // Show on first mount and when app returns to foreground
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const [identifyFlag, setIdentifyFlag] = useState<boolean>(false);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const sub = AppState.addEventListener("change", (nextState) => {
      const wasBackground = /inactive|background/.test(appState.current ?? "");
      if (wasBackground && nextState === "active") {
        setShowWelcome(true);
      }
      appState.current = nextState;
    });
    return () => sub.remove();
  }, []);

  const dismissWelcome = () => setShowWelcome(false);

  return (
    <SafeView>
      <ThemedText type="title"> Messages</ThemedText>
      <View style={styles.messageContainer}>
        <Messages profiles={profiles} />
      </View>

      {showWelcome && (
        <View
          style={styles.overlay}
          accessibilityViewIsModal
          accessible
          accessibilityLabel="Welcome screen"
        >
          <View style={styles.card}>
            <Pressable
              onPress={dismissWelcome}
              accessibilityRole="button"
              accessibilityLabel="Close welcome"
              style={styles.closeBtn}
              hitSlop={12}
            >
              <IconSymbol size={24} name="x.circle.fill" color="#111" />
            </Pressable>

            <Text style={styles.title}>Welcome 👋</Text>
            <Text style={styles.body}>
              Optional: Would you like to share if you identify with any of
              these communities? This helps us tailor safety tools. You can skip
              and change this anytime in Settings.
            </Text>
            <Pressable
              onPress={() => setIdentifyFlag((v) => !v)}
              style={styles.checkboxRow}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: identifyFlag }}
              accessibilityLabel="I identify with one or more of the following communities: Disability, LGBTQIA+, or Other"
              hitSlop={8}
            >
              <View
                style={[
                  styles.checkbox,
                  identifyFlag && styles.checkboxChecked,
                ]}
              >
                {identifyFlag ? (
                  <IconSymbol size={16} name="checkmark" color="#fff" />
                ) : null}
              </View>
              <Text style={styles.checkboxLabel}>
                I identify with one or more of the following communities:{"\n"}
                Disability/ LGBTQIA+,/Racialized minority or PoC/ Religious
                minority/ Other
              </Text>
            </Pressable>

            <InfoMessage
              style={{ marginVertical: 24 }}
              text={
                "Your response is private and never shown on your profile. It’s used only for safety features, stored with your consent, and you can delete it anytime."
              }
            />
            <Pressable
              onPress={dismissWelcome}
              style={styles.primaryBtn}
              accessibilityRole="button"
            >
              <Text style={styles.primaryBtnText}>Got it</Text>
            </Pressable>
          </View>
        </View>
      )}
    </SafeView>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    marginTop: 20,
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    bottom: -200,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  closeBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 8,
    marginBottom: 8,
  },
  body: {
    fontSize: 16,
    color: "#444",
    lineHeight: 22,
    marginBottom: 12,
  },
  // checkbox styles
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "#999",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    backgroundColor: "#fff",
  },
  checkboxChecked: {
    backgroundColor: "#ad7aff",
    borderColor: "#ad7aff",
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 15,
    color: "#222",
  },
  primaryBtn: {
    alignSelf: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#ad7aff",
    borderRadius: 12,
  },
  primaryBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
