import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { auth } from "../../../firebaseConfig";
import { useDispatch } from "react-redux";
import { clearUser } from "../../../redux/slicers/userSlicer";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log("Hello");
    auth
      .signOut()
      .then(() => {
        dispatch(clearUser());
      })
      .catch((error) => {
        console.error("Error logging out: ", error);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Profile</Text>
          <TouchableOpacity style={styles.editButton}>
            <AntDesign name="edit" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.profileInfo}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            style={styles.profileImage}
          />
          <Text style={styles.username}>John Doe</Text>
          <Text style={styles.email}>john.doe@example.com</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Payment Methods</Text>
            <AntDesign name="right" size={18} color="#888" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Notifications</Text>
            <AntDesign name="right" size={18} color="#888" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Privacy Settings</Text>
            <AntDesign name="right" size={18} color="#888" />
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Help Center</Text>
            <AntDesign name="right" size={18} color="#888" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
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
});

export default ProfileScreen;
