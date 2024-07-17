import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { auth, db } from "../../../../firebaseConfig";
import { useDispatch } from "react-redux";
import { clearUser } from "../../../../redux/slicers/userSlicer";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { doc, getDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchUserData = async () => {
    setLoading(true);
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        setUserInfo(userDoc.data());
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchUserData();
    });

    fetchUserData(); // Fetch data on initial mount

    return unsubscribe; // Clean up the listener on unmount
  }, [navigation]);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(clearUser());
      })
      .catch((error) => {
        console.error("Error logging out: ", error);
      });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E94B3C" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Profile</Text>
          <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate("EditProfile")}>
            <AntDesign name="edit" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.profileInfo}>
          <Image
            source={{
              uri: userInfo?.image || "https://cdn-icons-png.flaticon.com/512/10337/10337609.png",
            }}
            style={styles.profileImage}
          />
          <Text style={styles.username}>{userInfo?.fullName || "Your Name"}</Text>
          <Text style={styles.email}>{userInfo?.email || "abc@example.com"}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Payment Methods</Text>
            <AntDesign name="right" size={18} color="#888" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("Notifications")}>
            <Text style={styles.optionText}>Notifications</Text>
            <AntDesign name="right" size={18} color="#888" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("Privacy")}>
            <Text style={styles.optionText}>Privacy Policy</Text>
            <AntDesign name="right" size={18} color="#888" />
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Help Center</Text>
            <AntDesign name="right" size={18} color="#888" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("ContactUs")}>
            <Text style={styles.optionText}>Contact Us</Text>
            <AntDesign name="right" size={18} color="#888" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#E94B3C",
  },
  editButton: {
    backgroundColor: "#E94B3C",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  profileInfo: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  optionText: {
    fontSize: 18,
    color: "#333",
  },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#E94B3C",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
  },
  logoutText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#E94B3C',
  },
});

export default ProfileScreen;
