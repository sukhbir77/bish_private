import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

const ImageCollection = ({ navigation, route }) => {
  const { fullName, phoneNumber } = route.params;
  const [licenseImage, setLicenseImage] = useState(null);
  const [insuranceImage, setInsuranceImage] = useState(null);

  const handleImageSelect = (imageType) => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        if (imageType === 'license') {
          setLicenseImage(response.uri);
        } else if (imageType === 'insurance') {
          setInsuranceImage(response.uri);
        }
      }
    });
  };

  const handleNext = () => {
    // Validate input if needed
    // Navigate to the next step or complete onboarding
    navigation.navigate('Third', {
      fullName,
      phoneNumber,
      licenseImage,
      insuranceImage,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Upload Documents</Text>
      </View>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: '66%' }]} />
      </View>
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={() => handleImageSelect('license')}
      >
        {licenseImage ? (
          <ImageBackground
            source={{ uri: licenseImage }}
            style={styles.previewImage}
            imageStyle={{ borderRadius: 10 }}
          >
            <Text style={styles.uploadText}>Change License Image</Text>
          </ImageBackground>
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.uploadText}>Select License Image</Text>
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={() => handleImageSelect('insurance')}
      >
        {insuranceImage ? (
          <ImageBackground
            source={{ uri: insuranceImage }}
            style={styles.previewImage}
            imageStyle={{ borderRadius: 10 }}
          >
            <Text style={styles.uploadText}>Change Insurance Image</Text>
          </ImageBackground>
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.uploadText}>Select Insurance Image</Text>
          </View>
        )}
      </TouchableOpacity>
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
  uploadButton: {
    backgroundColor: '#E94B3C',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  previewImage: {
    height: 200,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  placeholder: {
    height: 200,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  uploadText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
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

export default ImageCollection;
