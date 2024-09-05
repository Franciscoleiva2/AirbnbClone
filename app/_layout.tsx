import React from 'react';
import { router, Slot, Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const RootLayout = () => {
  const [fontsLoaded] = useFonts({
    
    pop: require('../assets/fonts/Poppins-Regular.ttf'),
    'pop-sb': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'pop-b': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Puede mostrar un indicador de carga mientras se cargan las fuentes
  }

  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen
          name="(modals)/login"
          options={{
            presentation: 'modal',
            title: 'Log in or sign up',
            headerTitleStyle: {
              fontFamily: 'pop-sb', // Cambia a 'mon-sb' o cualquier otra fuente según tu preferencia
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="close-outline" size={28} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
};

export default RootLayout;
