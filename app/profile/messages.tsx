import React from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { type Profile } from "@/types/profile";

type MessagesProps = {
  profiles: Profile[];
};

export default function Messages({ profiles }: MessagesProps) {
  const data = (profiles || [])
    .filter((p) => p.liked === true && p.message) // only liked + has a message
    .map((p) => ({
      key: p.name,
      name: p.name,
      picture: p.picture,
      message: p.message,
    }));

  if (data.length === 0) {
    return (
      <View style={styles.emptyWrap}>
        <Text style={styles.emptyText}>No messages yet.</Text>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.separator} />
      <FlatList
        data={data}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <View style={styles.row} accessible accessibilityRole="text">
            <Image
              source={{ uri: item.picture }}
              style={styles.avatar}
              accessibilityLabel={`${item.name}'s profile picture`}
            />
            <View style={styles.textWrap}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.message}>{item.message}</Text>
            </View>
          </View>
        )}
      />
      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#eee",
    marginRight: 12,
  },
  textWrap: { flex: 1 },
  name: { fontSize: 16, fontWeight: "600", marginBottom: 2 },
  message: { fontSize: 14, color: "#555" },
  separator: { height: 1, backgroundColor: "#e8e8e8" },
  emptyWrap: { padding: 16, alignItems: "center" },
  emptyText: { color: "#777" },
});
