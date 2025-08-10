import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

type InfoMessageProps = {
  text: string;
  /** Optional overrides, same API as other Themed components */
  lightColor?: string;
  darkColor?: string;
  /** Show a border (defaults to true) */
  withBorder?: boolean;
  /** Optional extra styles */
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export default function InfoMessage({
                                      text,
                                      lightColor,
                                      darkColor,
                                      withBorder = true,
                                      style,
                                      textStyle,
                                    }: InfoMessageProps) {
  // Use the app’s themed colors (and accept light/dark overrides like other components)
  const tint = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');
  const textColor = useThemeColor({}, 'text');
  
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: addAlpha(tint, 0.12) },     // subtle tinted background
        withBorder && { borderColor: tint, borderWidth: 1 },
        style,
      ]}
    >
      <Text style={[styles.text, { color: textColor }, textStyle]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
  },
  text: {
    fontSize: 14,
    lineHeight: 18,
  },
});

/** Converts #RRGGBB to an rgba() with alpha */
function addAlpha(hex: string, alpha: number) {
  // clamp alpha
  const a = Math.max(0, Math.min(1, alpha));
  const m = hex?.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return hex;
  const r = parseInt(m[1], 16);
  const g = parseInt(m[2], 16);
  const b = parseInt(m[3], 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}


