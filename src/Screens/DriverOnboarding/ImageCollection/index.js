// // import React, { useState } from "react";
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   TouchableOpacity,
// //   ImageBackground,
// // } from "react-native";
// // import * as ImagePicker from "expo-image-picker";

// // const ImageCollection = ({ navigation, route }) => {
// //   const { fullName, phoneNumber } = route.params;
// //   const [licenseImage, setLicenseImage] = useState(null);
// //   const [insuranceImage, setInsuranceImage] = useState(null);

// //   const handleImageSelect = async (imageType) => {
// //     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
// //     if (permissionResult.granted === false) {
// //       alert("Permission to access camera roll is required!");
// //       return;
// //     }

// //     const result = await ImagePicker.launchImageLibraryAsync({
// //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
// //       allowsEditing: true,
// //       aspect: [4, 3],
// //       quality: 1,
// //     });

// //     if (!result.canceled) {
// //       if (imageType === "license") {
// //         setLicenseImage(result.assets[0].uri);
// //       } else if (imageType === "insurance") {
// //         setInsuranceImage(result.assets[0].uri);
// //       }
// //     }
// //   };

// //   const handleNext = () => {
// //     navigation.navigate("Third", {
// //       fullName,
// //       phoneNumber,
// //       licenseImage,
// //       insuranceImage,
// //     });
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.header}>
// //         <Text style={styles.title}>Upload Documents</Text>
// //       </View>
// //       <View style={styles.progressContainer}>
// //         <View style={[styles.progressBar, { width: "66%" }]} />
// //       </View>
// //       <TouchableOpacity
// //         style={styles.uploadButton}
// //         onPress={() => handleImageSelect("license")}
// //       >
// //         {licenseImage ? (
// //           <ImageBackground
// //             source={{ uri: licenseImage }}
// //             style={styles.previewImage}
// //             imageStyle={{ borderRadius: 10 }}
// //           >
// //             <Text style={styles.uploadText}>Change License Image</Text>
// //           </ImageBackground>
// //         ) : (
// //           <View style={styles.placeholder}>
// //             <Text style={styles.uploadText}>Select License Image</Text>
// //           </View>
// //         )}
// //       </TouchableOpacity>
// //       <TouchableOpacity
// //         style={styles.uploadButton}
// //         onPress={() => handleImageSelect("insurance")}
// //       >
// //         {insuranceImage ? (
// //           <ImageBackground
// //             source={{ uri: insuranceImage }}
// //             style={styles.previewImage}
// //             imageStyle={{ borderRadius: 10 }}
// //           >
// //             <Text style={styles.uploadText}>Change Insurance Image</Text>
// //           </ImageBackground>
// //         ) : (
// //           <View style={styles.placeholder}>
// //             <Text style={styles.uploadText}>Select Insurance Image</Text>
// //           </View>
// //         )}
// //       </TouchableOpacity>
// //       <TouchableOpacity
// //         style={[styles.button, styles.nextButton]}
// //         onPress={handleNext}
// //       >
// //         <Text style={styles.buttonText}>Next</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#fff",
// //     paddingHorizontal: 30,
// //     paddingTop: 20,
// //   },
// //   header: {
// //     marginTop: 24,
// //     marginBottom: 20,
// //     alignItems: "center",
// //   },
// //   title: {
// //     fontSize: 24,
// //     fontWeight: "bold",
// //     color: "#333",
// //     textAlign: "center",
// //   },
// //   progressContainer: {
// //     width: "100%",
// //     flexDirection: "row",
// //     justifyContent: "center",
// //     marginBottom: 20,
// //   },
// //   progressBar: {
// //     height: 5,
// //     backgroundColor: "#E94B3C",
// //   },
// //   uploadButton: {
// //     paddingVertical: 16,
// //     paddingHorizontal: 20,
// //     borderRadius: 10,
// //     marginBottom: 20,
// //     width: "100%",
// //     alignItems: "center",
// //   },
// //   previewImage: {
// //     height: 200,
// //     width: "100%",
// //     justifyContent: "flex-end",
// //     alignItems: "center",
// //     borderRadius: 10,
// //     overflow: "hidden",
// //   },
// //   placeholder: {
// //     height: 200,
// //     width: "100%",
// //     backgroundColor: "#ccc",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     borderRadius: 10,
// //   },
// //   uploadText: {
// //     fontSize: 16,
// //     color: "#fff",
// //     fontWeight: "bold",
// //   },
// //   button: {
// //     backgroundColor: "#E94B3C",
// //     paddingVertical: 16,
// //     paddingHorizontal: 100,
// //     borderRadius: 10,
// //   },
// //   nextButton: {
// //     position: "absolute",
// //     bottom: 32,
// //     width: "80%",
// //     alignSelf: "center",
// //   },
// //   buttonText: {
// //     fontSize: 18,
// //     fontWeight: "bold",
// //     color: "#fff",
// //     textAlign: "center",
// //   },
// // });

// // export default ImageCollection;

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ImageBackground,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { storage } from "../../../../firebaseConfig"; // Adjust the path to your firebaseConfig file

// const ImageCollection = ({ navigation, route }) => {
//   const { fullName, phoneNumber } = route.params;
//   const [licenseImage, setLicenseImage] = useState(null);
//   const [insuranceImage, setInsuranceImage] = useState(null);
//   const [uploading, setUploading] = useState(false);

//   const handleImageSelect = async (imageType) => {
//     const permissionResult =
//       await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (permissionResult.granted === false) {
//       alert("Permission to access camera roll is required!");
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.cancelled) {
//       if (imageType === "license") {
//         setLicenseImage(result.assets[0].uri);
//       } else if (imageType === "insurance") {
//         setInsuranceImage(result.assets[0].uri);
//       }
//     }
//   };

//   const handleUpload = async (imageType, imageUrl) => {
//     const imageName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
//     const storageRef = ref(storage, `images/${imageName}`);

//     try {
//       const response = await fetch(imageUrl);
//       const blob = await response.blob();

//       await uploadBytes(storageRef, blob);
//       const downloadURL = await getDownloadURL(storageRef);

//       if (imageType === "license") {
//         setLicenseImage(downloadURL);
//       } else if (imageType === "insurance") {
//         setInsuranceImage(downloadURL);
//       }
//     } catch (error) {
//       console.log("Error uploading images: ", error);
//     }
//   };

//   const handleNext = async () => {
//     setUploading(true);

//     try {
//       if (licenseImage) {
//         await handleUpload("license", licenseImage);
//       }

//       if (insuranceImage) {
//         await handleUpload("insurance", insuranceImage);
//       }

//       navigation.navigate("Third", {
//         fullName,
//         phoneNumber,
//         licenseImage,
//         insuranceImage,
//       });
//     } catch (error) {
//       console.log("Error uploading images: ", error);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Upload Documents</Text>
//       </View>
//       <View style={styles.progressContainer}>
//         <View style={[styles.progressBar, { width: "66%" }]} />
//       </View>
//       <TouchableOpacity
//         style={styles.uploadButton}
//         onPress={() => handleImageSelect("license")}
//       >
//         {licenseImage ? (
//           <ImageBackground
//             source={{ uri: licenseImage }}
//             style={styles.previewImage}
//             imageStyle={{ borderRadius: 10 }}
//           >
//             <Text style={styles.uploadText}>Change License Image</Text>
//           </ImageBackground>
//         ) : (
//           <View style={styles.placeholder}>
//             <Text style={styles.uploadText}>Select License Image</Text>
//           </View>
//         )}
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.uploadButton}
//         onPress={() => handleImageSelect("insurance")}
//       >
//         {insuranceImage ? (
//           <ImageBackground
//             source={{ uri: insuranceImage }}
//             style={styles.previewImage}
//             imageStyle={{ borderRadius: 10 }}
//           >
//             <Text style={styles.uploadText}>Change Insurance Image</Text>
//           </ImageBackground>
//         ) : (
//           <View style={styles.placeholder}>
//             <Text style={styles.uploadText}>Select Insurance Image</Text>
//           </View>
//         )}
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={[styles.button, styles.nextButton]}
//         onPress={handleNext}
//         disabled={uploading}
//       >
//         <Text style={styles.buttonText}>
//           {uploading ? "Uploading..." : "Next"}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingHorizontal: 30,
//     paddingTop: 20,
//   },
//   header: {
//     marginTop: 24,
//     marginBottom: 20,
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#333",
//     textAlign: "center",
//   },
//   progressContainer: {
//     width: "100%",
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 20,
//   },
//   progressBar: {
//     height: 5,
//     backgroundColor: "#E94B3C",
//   },
//   uploadButton: {
//     paddingVertical: 16,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//     marginBottom: 20,
//     width: "100%",
//     alignItems: "center",
//   },
//   previewImage: {
//     height: 200,
//     width: "100%",
//     justifyContent: "flex-end",
//     alignItems: "center",
//     borderRadius: 10,
//     overflow: "hidden",
//   },
//   placeholder: {
//     height: 200,
//     width: "100%",
//     backgroundColor: "#ccc",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 10,
//   },
//   uploadText: {
//     fontSize: 16,
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   button: {
//     backgroundColor: "#E94B3C",
//     paddingVertical: 16,
//     paddingHorizontal: 100,
//     borderRadius: 10,
//   },
//   nextButton: {
//     position: "absolute",
//     bottom: 32,
//     width: "80%",
//     alignSelf: "center",
//   },
//   buttonText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#fff",
//     textAlign: "center",
//   },
// });

// export default ImageCollection;


import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../firebaseConfig"; // Adjust the path to your firebaseConfig file

const ImageCollection = ({ navigation, route }) => {
  const { fullName, phoneNumber, gender, age, city, addressLine1, country, postalCode, state } = route.params;
  const [licenseImage, setLicenseImage] = useState(null);
  const [insuranceImage, setInsuranceImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageSelect = async (imageType) => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      if (imageType === "license") {
        setLicenseImage(result.assets[0].uri);
      } else if (imageType === "insurance") {
        setInsuranceImage(result.assets[0].uri);
      }
    }
  };

  const handleUpload = async (imageType, imageUrl) => {
    const imageName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
    const storageRef = ref(storage, `images/${imageName}`);

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);

      if (imageType === "license") {
        setLicenseImage(downloadURL);
      } else if (imageType === "insurance") {
        setInsuranceImage(downloadURL);
      }
    } catch (error) {
      console.log("Error uploading images: ", error);
    }
  };

  const handleNext = async () => {
    setUploading(true);

    try {
      if (licenseImage) {
        await handleUpload("license", licenseImage);
      }

      if (insuranceImage) {
        await handleUpload("insurance", insuranceImage);
      }

      // Only navigate if both images are uploaded successfully
      if (licenseImage && insuranceImage) {
        navigation.navigate("Third", {
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
        });
      }
    } catch (error) {
      console.log("Error uploading images: ", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Upload Documents</Text>
      </View>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: "66%" }]} />
      </View>
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={() => handleImageSelect("license")}
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
        onPress={() => handleImageSelect("insurance")}
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
        disabled={uploading || !licenseImage || !insuranceImage}
      >
        <Text style={styles.buttonText}>
          {uploading ? "Uploading..." : "Next"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  header: {
    marginTop: 24,
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  progressContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  progressBar: {
    height: 5,
    backgroundColor: "#E94B3C",
  },
  uploadButton: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
  },
  previewImage: {
    height: 200,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  placeholder: {
    height: 200,
    width: "100%",
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  uploadText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#E94B3C",
    paddingVertical: 16,
    paddingHorizontal: 100,
    borderRadius: 10,
  },
  nextButton: {
    position: "absolute",
    bottom: 32,
    width: "80%",
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});

export default ImageCollection;

