import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import InfoMessage from "@/components/InfoMessage";
import SafeView from "@/components/SafeView";
import PicUploadSpot from "@/app/Pictures/picUploadSpot";

export default function ProfilePictures() {
  const [hasA, setHasA] = useState(false);
  const [hasB, setHasB] = useState(false);

  const hasPictures = hasA || hasB;
  return (
    <SafeView>
      <View style={styles.container}>
        {!hasPictures && (
          <InfoMessage text={"Please add at least one picture of you!"} />
        )}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <PicUploadSpot style={styles.half} onChange={setHasA} />
          <PicUploadSpot style={styles.half} onChange={setHasB} />
        </View>
        {hasPictures && (
          <InfoMessage
            text={
              "Add a short description so everyone can enjoy your photos — including people using screen readers!"
            }
            linkUrl="https://sc.edu/about/offices_and_divisions/digital-accessibility/toolbox/best_practices/alternative_text/step-by-step-instructions-alt-text/alt-text-examples/"
            linkLabel="Check out some examples of alt texts here"
          />
        )}
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingHorizontal: 0,
  },
  spot: {
    height: 224, // ~ h-56
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#d1d5db", // gray-300
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  centerContent: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  preview: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  overlayButtons: {
    position: "absolute",
    right: 12,
    bottom: 12,
    flexDirection: "row",
  },
  pill: {
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  pillText: {
    fontSize: 12,
    color: "#111827",
  },
  subText: {
    opacity: 0.8,
    marginTop: 4,
    fontSize: 14,
  },
  hintText: {
    opacity: 0.6,
    marginTop: 2,
    fontSize: 12,
  },
  half: {
    width: "48%",
    aspectRatio: 4 / 5,
  },
});
