import React from 'react';
import { SafeAreaView, View, StyleSheet, ViewStyle } from 'react-native';
import { ThemedView } from './ThemedView';

type SafeViewProps = {
  children: React.ReactNode;
  style?: ViewStyle; // optional extra styles for inner View
};

export default function SafeView({ children, style }: SafeViewProps) {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <ThemedView style={styles.themed}>
        <View style={[styles.innerView, style]}>
          {children}
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  themed: {
    flex: 1,
    paddingTop: 20,
  },
  innerView: {
    margin: 10,
  },
});
