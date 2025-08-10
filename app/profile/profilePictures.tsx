import { ThemedText } from "@/components/ThemedText";
import InfoMessage from "@/components/InfoMessage";
import SafeView from "@/components/SafeView";

export default function ProfilePictures() {
  return (
    <SafeView>
      <InfoMessage text={"Please add at least one picture of you!"} />
    </SafeView>
  );
}
