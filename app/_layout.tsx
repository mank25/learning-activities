import { Stack } from 'expo-router';
import React from 'react';
import { Platform, StatusBar, useColorScheme, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { darkTheme, lightTheme } from '../theme';

// Optional: you can use this hook to smoothly animate theme switching later
const usePreferredTheme = () => {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? darkTheme : lightTheme;
};

export default function Layout() {
  const theme = usePreferredTheme();
  const isDark = theme.dark;

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        {/* Set consistent background across devices */}
        <View
          style={{
            flex: 1,
            backgroundColor: theme.colors.background,
          }}
        >
          {/* Status bar style adapts automatically */}
          <StatusBar
            barStyle={isDark ? 'light-content' : 'dark-content'}
            backgroundColor={theme.colors.background}
            translucent={Platform.OS === 'android'}
          />

          {/* Expo Router Stack */}
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'fade', // subtle smooth screen transitions
              contentStyle: {
                backgroundColor: theme.colors.background,
              },
            }}
          />
        </View>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
