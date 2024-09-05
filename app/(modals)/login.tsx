import React, { useState, useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import { makeRedirectUri, useAuthRequest, ResponseType } from 'expo-auth-session';

// Endpoints de Google para OAuth
const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};

const CLIENT_ID = '216131845114-h62ddp5rjp5p0sijks0kcv7d4hdhs2pq.apps.googleusercontent.com'; // Reemplaza con tu Client ID de Google
const REDIRECT_URI = 'https://auth.expo.io/viajate/FirsProject'; // Ajusta a tu configuración

export default function App() {
  const [userInfo, setUserInfo] = useState(null);

  // Configura la solicitud de autenticación
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token, // Usa 'Token' para flujos sin servidor
      clientId: CLIENT_ID,
      redirectUri: REDIRECT_URI,
      scopes: ['profile', 'email'],
    },
    discovery
  );

  // Maneja la respuesta de autenticación
  useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      fetchUserInfo(access_token);
    }
  }, [response]);

  // Función para obtener la información del usuario autenticado
  const fetchUserInfo = async (token) => {
    try {
      const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await res.json();
      setUserInfo(user);
    } catch (error) {
      alert('Error al obtener la información del usuario: ' + error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        disabled={!request}
        title="Iniciar sesión con Google"
        onPress={() => {
          promptAsync();
        }}
      />
      {userInfo && <Text>Bienvenido, {userInfo.name}!</Text>}
    </View>
  );
}
