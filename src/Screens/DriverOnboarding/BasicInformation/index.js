import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';

const BasicInformation = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [state, setState] = useState('');

  const handleNext = () => {
    // Validate input fields if needed
    // Navigate to the next step
    navigation.navigate('Images', {
      fullName,
      phoneNumber,
      gender,
      age,
      city,
      addressLine1,
      country,
      postalCode,
      state,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Driver Onboarding</Text>
      </View>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: '33%' }]} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <View style={styles.radioContainer}>
        <Text style={styles.radioLabel}>Gender:</Text>
        <View style={styles.radioButtons}>
          <RadioButton.Android
            value="male"
            status={gender === 'male' ? 'checked' : 'unchecked'}
            onPress={() => setGender('male')}
            color="#E94B3C"
          />
          <Text style={styles.radioText}>Male</Text>
          <RadioButton.Android
            value="female"
            status={gender === 'female' ? 'checked' : 'unchecked'}
            onPress={() => setGender('female')}
            color="#E94B3C"
          />
          <Text style={styles.radioText}>Female</Text>
          <RadioButton.Android
            value="other"
            status={gender === 'other' ? 'checked' : 'unchecked'}
            onPress={() => setGender('other')}
            color="#E94B3C"
          />
          <Text style={styles.radioText}>Other</Text>
        </View>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="Address Line 1"
        value={addressLine1}
        onChangeText={setAddressLine1}
      />
      <TextInput
        style={styles.input}
        placeholder="Country"
        value={country}
        onChangeText={setCountry}
      />
      <TextInput
        style={styles.input}
        placeholder="Postal Code"
        value={postalCode}
        onChangeText={setPostalCode}
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        value={state}
        onChangeText={setState}
      />
      <TouchableOpacity
        style={[styles.button, styles.nextButton]}
        onPress={handleNext}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingTop: 20, // Adjust top padding for header alignment
  },
  header: {
    marginTop: 24,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  progressContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  progressBar: {
    height: 5,
    backgroundColor: '#E94B3C',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#E94B3C',
    paddingVertical: 16,
    paddingHorizontal: 100,
    borderRadius: 10,
  },
  nextButton: {
    position: 'absolute',
    bottom: 32,
    width: '80%',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  radioLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  radioButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioText: {
    fontSize: 16,
    marginLeft: 5,
  },
});

export default BasicInformation;
