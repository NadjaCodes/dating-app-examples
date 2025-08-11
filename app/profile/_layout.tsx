import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="profilePictures"
          options={{ headerShown: false, title: "" }}
        />
        <Stack.Screen
          name="questions"
          options={{ headerShown: false, title: "" }}
        />
        <Stack.Screen
          name="settings"
          options={{ headerShown: false, title: "" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
