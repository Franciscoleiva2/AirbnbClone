import React, { useState } from 'react';
import { Button, View, Text } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleLogin() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "216131845114-n48e2hbfbqb7u1di6oog9ia7iq28doas.apps.googleusercontent.com", // Tu Client ID
    redirectUri: "https://auth.expo.io/viajate/FirsProject", // Configura esta URI en Google Cloud Console
  });

  const [userInfo, setUserInfo] = useState(null);

  // Maneja la respuesta de la autenticación
  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      fetchUserInfo(authentication.accessToken);
    }
  }, [response]);

  // Obtén la información del usuario autenticado
  const fetchUserInfo = async (token) => {
    const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const user = await res.json();
    setUserInfo(user);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {userInfo ? (
        <Text>Bienvenido, {userInfo.name}</Text>
      ) : (
        <Button
          disabled={!request}
          title="Iniciar sesión con Google"
          onPress={() => {
            promptAsync();
          }}
        />
      )}
    </View>
  );
}
