import { View, Text, StyleSheet, Switch, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import SafeView from "@/components/SafeView";
import InfoMessage from "@/components/InfoMessage";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";


export default function A11ySettings() {
  const [buttonNavigation, setButtonNavigation] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [adjustablePacing, setAdjustablePacing] = useState(false);
  const [screenReaderSupport, setScreenReaderSupport] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedNotifications, setReducedNotifications] = useState(false);

  const SettingItem = ({ icon, label, description, value, onValueChange }) => (
    <View style={styles.settingRow}>
      <View style={styles.settingLeft}>
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color="#ad7aff"
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.settingLabel}>{label}</Text>
          <Text style={styles.settingDescription}>{description}</Text>
        </View>
      </View>

      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );

  return (
    <SafeView>
      <ThemedText type={"title"}>Accessibility Settings</ThemedText>
      <ThemedText type={"defaultSemiBold"}>Customize how you navigate the app. </ThemedText>

    <View style={styles.settingsContainer}>
        <SettingItem
                  icon="gesture-tap-button"
                  label="Button Navigation"
                  description="Use buttons instead of swipe gestures."
                  value={buttonNavigation}
                  onValueChange={setButtonNavigation}
                />

                <SettingItem
                  icon="motion"
                  label="Reduced Motion"
                  description="Limit animations and visual motion"
                  value={reduceMotion}
                  onValueChange={setReduceMotion}
                />

                <SettingItem
                  icon="timer-outline"
                  label="Adjustable Pacing"
                  description="Slow down auto-rotation of profiles"
                  value={adjustablePacing}
                  onValueChange={setAdjustablePacing}
                />

                <SettingItem
                  icon="account-voice"
                  label="Screen Reader Optimized"
                  description="Improve compatibility with screen readers"
                  value={screenReaderSupport}
                  onValueChange={setScreenReaderSupport}
                />

                <SettingItem
                  icon="contrast-circle"
                  label="High Contrast"
                  description="Enhance visability with a high contrast layout"
                  value={highContrast}
                  onValueChange={setHighContrast}
                />

                <SettingItem
                  icon="bell-off-outline"
                  label="Reduced Notifications"
                  description="Limit notification and alerts"
                  value={reducedNotifications}
                  onValueChange={setReducedNotifications}
                />

      </View>
      <InfoMessage
              text={
                "These accessibility options help adapt the app to different preferences and needs. You can update these settings at any time."
              }
            />
    </SafeView>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 16, paddingTop: 8, marginBottom: 8 },
  container: {
     padding: 20,
     backgroundColor: "#fff",
   },
info: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  settingsContainer: {
      borderTopWidth: 1,
      borderTopColor: "#eee",
      marginTop: 16,
    },

    settingRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
    },

    settingLeft: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },

    icon: {
      marginRight: 12,
    },

    textContainer: {
      flexShrink: 1,
    },

    settingLabel: {
      fontSize: 16,
      fontWeight: "500",
    },

    settingDescription: {
      fontSize: 13,
      color: "#666",
      marginTop: 2,
    },
});
