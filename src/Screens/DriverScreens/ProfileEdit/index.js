import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { db, storage } from '../../../../firebaseConfig';
import { selectUser, setUser } from '../../../../redux/slicers/userSlicer';

const EditProfileScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    const fetchUserData = async () => {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setFullName(userData.fullName);
        setEmail(userData.email);
        setPhoneNumber(userData.phoneNumber);
        setImage(userData.image);
      }
    };

    fetchUserData();
  }, [user.uid]);

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

  const handleUpdate = async () => {
    if (!fullName || !email || !phoneNumber) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    try {
      let imageUrl = image;
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (image) {
        const imageRef = ref(storage, `images/${Date.now()}_${fullName}`);
        const img = await fetch(image);
        const bytes = await img.blob();
        await uploadBytes(imageRef, bytes);
        imageUrl = await getDownloadURL(imageRef);
      }

      if (userDoc.exists()) {
        const userData = userDoc.data();

        await setDoc(userDocRef, {
          ...userData,
          fullName,
          email,
          phoneNumber,
          image: imageUrl ? imageUrl : userData.image
        });

        const updatedUser = {
          ...user,
          fullName,
          email,
          phoneNumber,
          image: imageUrl ? imageUrl : userData.image
        };

        dispatch(setUser(updatedUser));
        Alert.alert('Success', 'Profile updated successfully!');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'User data not found.');
      }
    } catch (error) {
      console.error('Error updating document: ', error);
      Alert.alert('Error', 'Something went wrong while saving your data.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Edit Profile</Text>
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
        style={[styles.button, styles.updateButton]}
        onPress={handleUpdate}
      >
        <Text style={styles.buttonText}>Update</Text>
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
  updateButton: {
    alignSelf: 'center',
    width: '80%',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default EditProfileScreen;
