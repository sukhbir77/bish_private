import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { db, storage } from '../../../firebaseConfig';
import { setOnboarded, selectUser, setUser } from '../../../redux/slicers/userSlicer';

const UserOnboarding = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleNext = async () => {
    if (!fullName || !email || !phoneNumber || !image) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    try {
      const imageRef = ref(storage, `images/${Date.now()}_${fullName}`);
      const img = await fetch(image);
      const bytes = await img.blob();
      await uploadBytes(imageRef, bytes);
      const imageUrl = await getDownloadURL(imageRef);

      const userDocRef = doc(db, "users", user.uid);

      await setDoc(userDocRef, {
        fullName,
        email,
        phoneNumber,
        image: imageUrl,
        role: "User"
      });
      const userCopy = JSON.parse(JSON.stringify(user));
      userCopy.role = "Rider";
      dispatch(setUser(userCopy));
    } catch (error) {
      console.error('Error adding document: ', error);
      Alert.alert('Error', 'Something went wrong while saving your data.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>User Onboarding</Text>
      </View>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: '100%' }]} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.imagePickerText}>Upload Image</Text>
        )}
      </TouchableOpacity>
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
  imagePicker: {
    width: '100%',
    height: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
  },
  imagePickerText: {
    fontSize: 16,
    color: '#999',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#E94B3C',
    paddingVertical: 16,
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

export default UserOnboarding;
