import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import SafeView from "@/components/SafeView";
import profiles from "@/constants/profiles.json";
import { Messages } from "@/app/profile/messages";

export default function HomeScreen() {
  return (
    <SafeView>
      <ThemedText type={"title"}> Matches</ThemedText>
      <View style={styles.messageContainer}>
        <Messages profiles={profiles} />
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    marginTop: 20,
  },
});
