import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Link } from "expo-router";
import InfoMessage from "@/components/InfoMessage";
import SafeView from "@/components/SafeView";

export default function MyProfile() {
  return (
    <SafeView>
    <View style={{ flexDirection: "row", justifyContent: 'space-between',}}>
      <ThemedText type="title"> Profile</ThemedText>
      <Link href="/Settings/a11ySettings" asChild style={styles.settingsBtn}>
        <Pressable
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel="Open settings"
          >
            <IconSymbol size={32} name="gearshape.fill" color="#111" />
        </Pressable>
      </Link>
      </View>
      <ThemedView style={{ flexDirection: "row" }}>
        <Link href={"/Pictures/profilePictures"}>
          <View style={{ position: "relative" }}>
            <IconSymbol size={128} name="person.circle.fill" color="#D3D3D3" />
            <View
              style={{
                position: "absolute",
                bottom: 15,
                right: 15,
                backgroundColor: "#ad7aff",
                borderRadius: 12,
                padding: 4,
              }}
            >
              <IconSymbol size={16} name="plus" color="#fff" />
            </View>
          </View>
        </Link>
        <ThemedText type={"subtitle"}>Christine, 27</ThemedText>
      </ThemedView>
      <InfoMessage
        text={
          "Consider completing 3 prompts to widen your profile’s reach among diverse participants. Your future match is already curious!"
        }
      />
      <ThemedView style={styles.outerView}>
        <Link href={"/Questions/questions"}>
          <View style={styles.innerView}>
            <IconSymbol
              size={32}
              name="questionmark.circle.fill"
              color="#ad7aff"
            />
            <ThemedText type="subtitle">Answer questions</ThemedText>
          </View>
        </Link>
      </ThemedView>
      <ThemedView style={styles.outerView}>
        <View style={styles.innerView}>
          <IconSymbol size={32} name="mic.circle.fill" color="#ad7aff" />
          <ThemedText type="subtitle">Add 15-sec voice clip</ThemedText>
        </View>
      </ThemedView>
      <ThemedView style={styles.outerView}>
        <View style={styles.innerView}>
          <IconSymbol size={32} name="video.badge.plus.fill" color="#ad7aff" />
          <ThemedText type="subtitle">Upload video with captions</ThemedText>
        </View>
      </ThemedView>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  outerView: {
    margin: 10,
    marginBottom: 20,
  },
  innerView: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
