// app/_layout.tsx
import React from 'react';
import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      {/* El Slot representa donde se renderizan los sub-layouts, como (tabs)/_layout.tsx */}
      <Slot />
    </SafeAreaProvider>
  );
};

export default RootLayout;
