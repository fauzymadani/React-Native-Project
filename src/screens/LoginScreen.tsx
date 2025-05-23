// LoginScreen.tsx
import React, { useState, useContext, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContexts'; // Sesuaikan path

const LoginScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Animasi tombol login
  const loginAnim = useRef(new Animated.Value(1)).current;
  const handleLogin = () => {
    Animated.sequence([
      Animated.timing(loginAnim, { toValue: 0.95, duration: 80, useNativeDriver: true, easing: Easing.out(Easing.quad) }),
      Animated.timing(loginAnim, { toValue: 1, duration: 80, useNativeDriver: true, easing: Easing.out(Easing.quad) })
    ]).start(() => {
      if (username === 'lah' && password === '123') {
        navigation.replace('Home', { username });
      } else {
        alert('Username atau password salah');
      }
    });
  };

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={[styles.input, username ? styles.inputActive : null]}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#ccc'}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={[styles.input, password ? styles.inputActive : null]}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#ccc'}
        />
        <Animated.View style={{ transform: [{ scale: loginAnim }], width: '100%' }}>
          <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.7}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity style={styles.toggleButton} onPress={toggleTheme} activeOpacity={0.8}>
          <Text style={styles.toggleButtonText}>
            {/*{theme === 'dark' ? 'Switch to White Mode' : 'Switch to Dark Mode'}*/}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getStyles = (theme: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000', // pure black background
    },
    card: {
      width: '90%',
      maxWidth: 320,
      backgroundColor: '#111',
      borderRadius: 0, // no rounded corners
      padding: 20,
      borderWidth: 1,
      borderColor: '#333',
      alignItems: 'flex-start', // align all elements to left
    },
    title: {
      fontSize: 18,
      fontFamily: 'monospace',
      color: '#0f0', // green terminal text
      marginBottom: 16,
    },
    input: {
      width: '100%',
      height: 40,
      borderWidth: 1,
      borderColor: '#333',
      backgroundColor: '#000',
      color: '#0f0',
      fontFamily: 'monospace',
      fontSize: 14,
      paddingHorizontal: 10,
      marginBottom: 12,
    },
    inputActive: {
      borderColor: '#0f0',
    },
    button: {
      width: '100%',
      paddingVertical: 10,
      backgroundColor: '#0f0',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#0f0',
    },
    buttonText: {
      color: '#000',
      fontWeight: 'bold',
      fontFamily: 'monospace',
      fontSize: 14,
    },
    toggleButton: {
      marginTop: 12,
    },
    toggleButtonText: {
      color: '#888',
      fontFamily: 'monospace',
      fontSize: 12,
    },
});

export default LoginScreen;