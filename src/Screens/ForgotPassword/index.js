import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Pressable, View, Alert, ScrollView } from 'react-native';
import { auth } from '../../../firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import AntDesign from '@expo/vector-icons/AntDesign';
import GlobalStyles from '../../Utils/GlobalStyles';
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Success', 'Password reset email sent');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error sending password reset email: ', error);
      Alert.alert('Error', 'Failed to send password reset email');
    }
  };

  return (
    <ScrollView contentContainerStyle={GlobalStyles.container}>
      <Pressable style={GlobalStyles.backButton} onPress={() => navigation.goBack()}>
        <AntDesign name="left" size={24} color="#414141" />
        <Text style={[GlobalStyles.textMedium, { color: "#414141" }]}>Back</Text>
      </Pressable>
      <Text style={[GlobalStyles.textLarge, { marginTop: 72, marginBottom: 12, fontWeight: '500' }]}>
        Forgot Password
      </Text>
      <Text style={GlobalStyles.textSmall}>Enter your email address to receive a password reset link.</Text>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#D0D0D0"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Pressable style={GlobalStyles.buttonPrimary} onPress={handlePasswordReset}>
          <Text style={[GlobalStyles.textMedium, { color: 'white' }]}>Send Reset Link</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 16,
    borderRadius: 10,
  },
});
