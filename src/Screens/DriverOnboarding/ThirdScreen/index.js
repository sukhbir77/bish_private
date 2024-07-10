import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { setOnboarded } from '../../../../redux/slicers/userSlicer';
import { useDispatch } from 'react-redux';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { db } from '../../../../firebaseConfig'; // Adjust the path to your firebaseConfig file

const ThirdScreen = ({ navigation, route }) => {
  const { fullName, phoneNumber, licenseImage, insuranceImage, gender, age, city, addressLine1, country, postalCode, state } = route.params;
  const [carMake, setCarMake] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carYear, setCarYear] = useState('');
  const dispatch = useDispatch();

  const handleNext = async () => {
    if (!carMake || !carModel || !carYear) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    try {
      await addDoc(collection(db, 'users'), {
        fullName,
        phoneNumber,
        gender,
        age,
        city,
        addressLine1,
        country,
        postalCode,
        state,
        licenseImage,
        insuranceImage,
        carMake,
        carModel,
        carYear,
      });

      dispatch(setOnboarded(true));
      //navigation.navigate('Home'); // Adjust navigation as needed
    } catch (error) {
      console.error('Error adding document: ', error);
      Alert.alert('Error', 'Something went wrong while saving your data.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Car Details</Text>
      </View>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: '100%' }]} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Car Make"
        value={carMake}
        onChangeText={setCarMake}
      />
      <TextInput
        style={styles.input}
        placeholder="Car Model"
        value={carModel}
        onChangeText={setCarModel}
      />
      <TextInput
        style={styles.input}
        placeholder="Car Year"
        keyboardType="numeric"
        value={carYear}
        onChangeText={setCarYear}
      />
      <TouchableOpacity
        style={[styles.button, styles.nextButton]}
        onPress={handleNext}
      >
        <Text style={styles.buttonText}>Complete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingTop: 20,
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
});

export default ThirdScreen;
