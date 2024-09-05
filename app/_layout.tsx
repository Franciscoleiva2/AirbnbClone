import React from 'react';
import { router, Slot, Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TouchableOpacity, ActivityIndicator, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const RootLayout = () => {
  const [fontsLoaded] = useFonts({
    pop: require('../assets/fonts/Poppins-Regular.ttf'),
    'pop-sb': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'pop-b': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded) {
    // Mostrar un indicador de carga mientras las fuentes se cargan
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
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
              fontFamily: 'pop-sb', // Asegúrate de que esta fuente esté correctamente configurada
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
