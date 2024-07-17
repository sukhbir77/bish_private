import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ContactUsScreen = ({navigation}) => {

  return (
    <View style={styles.container}>
      {/* Heading and Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.heading}>Contact Us</Text>
      </View>

      {/* Email */}
      <View style={styles.contactItem}>
        <Text style={styles.contactLabel}>Email:</Text>
        <Text style={styles.contactInfo}>contact@example.com</Text>
      </View>

      {/* Phone */}
      <View style={styles.contactItem}>
        <Text style={styles.contactLabel}>Phone:</Text>
        <Text style={styles.contactInfo}>+1 234 567 890</Text>
      </View>

      {/* Social */}
      <View style={styles.contactItem}>
        <Text style={styles.contactLabel}>Social:</Text>
        <View style={styles.socialLinks}>
          <TouchableOpacity style={styles.socialLink}>
            <Ionicons name="logo-facebook" size={24} color="#3b5998" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialLink}>
            <Ionicons name="logo-twitter" size={24} color="#1da1f2" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialLink}>
            <Ionicons name="logo-instagram" size={24} color="#bc2a8d" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    marginTop: 32,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 16,
  },
  contactItem: {
    marginBottom: 16,
  },
  contactLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#333",
  },
  contactInfo: {
    fontSize: 16,
    color: "#333",
  },
  socialLinks: {
    flexDirection: "row",
    marginTop: 8,
  },
  socialLink: {
    marginRight: 16,
  },
});

export default ContactUsScreen;