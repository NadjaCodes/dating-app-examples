import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  TextInput,
  StyleProp,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import Svg, { Defs, Pattern, Rect, Path } from "react-native-svg";
import * as ImagePicker from "expo-image-picker";
import { IconSymbol } from "@/components/ui/IconSymbol";

type PicUploadSpotProps = {
  style?: any;
  onChange: (hasImage: boolean) => void;
};

// Functional upload spot using expo-image-picker
export default function PicUploadSpot({ style, onChange }: PicUploadSpotProps) {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [requesting, setRequesting] = useState(false);
  const [altText, setAltText] = useState<string>("");

  const ensurePermission = useCallback(async () => {
    setRequesting(true);
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      return status === "granted";
    } finally {
      setRequesting(false);
    }
  }, []);

  const pickImage = useCallback(async () => {
    const ok = await ensurePermission();
    if (!ok) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5], // portrait-ish crop
      quality: 0.9,
      exif: false,
      selectionLimit: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      onChange?.(true);
    }
  }, [ensurePermission, onChange]);

  const onRemove = useCallback(() => {
    setImageUri(null);
    onChange?.(false);
  }, [onChange]);

  return (
    <View style={style}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={imageUri ? "Change photo" : "Upload photo"}
        style={[styles.spot]}
        onPress={imageUri ? onRemove : pickImage}
        disabled={requesting}
      >
        {/* Diagonal striped background using react-native-svg */}
        {!imageUri && (
          <View style={StyleSheet.absoluteFill} pointerEvents="none">
            <Svg width="100%" height="100%">
              <Rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="url(#diagonalStripes)"
              />
            </Svg>
          </View>
        )}

        <View style={styles.centerContent} pointerEvents="none">
          {imageUri ? (
            <>
              <Image
                source={{ uri: imageUri }}
                style={styles.preview}
                resizeMode="cover"
              />
              <View style={styles.overlayButtons}>
                <Pressable
                  accessibilityRole="button"
                  onPress={onRemove}
                  style={{ marginLeft: 8 }}
                >
                  <View
                    style={{
                      position: "absolute",
                      bottom: -1,
                      right: -5,
                      backgroundColor: "#fff",
                      width: 25,
                      height: 25,
                      borderRadius: 16,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconSymbol
                      size={32}
                      name="x.circle.fill"
                      color="#ad7aff"
                    />
                  </View>
                </Pressable>
              </View>
            </>
          ) : (
            <>
              <IconSymbol name={"plus"} color={"#808080"} />
              <Text style={styles.subText}>Tap to upload photo</Text>
            </>
          )}
        </View>
      </Pressable>
      {imageUri && (
        <View>
          <TextInput
            style={styles.altInput}
            placeholder="Photo description"
            value={altText}
            onChangeText={setAltText}
            numberOfLines={2}
            maxLength={200}
            accessibilityLabel="Put you alternative text here"
            returnKeyType="done"
            autoCapitalize="sentences"
          />
          <Text style={styles.altHelp}>
            Example: "Me smiling with my favorite food — sushi."
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingHorizontal: 0,
  },
  spot: {
    flex: 1,
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
  altInput: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  altHelp: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
  },
});
