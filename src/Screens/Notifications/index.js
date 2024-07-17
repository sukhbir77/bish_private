import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const NotificationScreen = ({navigation}) => {
  const [socialNotifications, setSocialNotifications] = useState({
    likes: true,
    comments: false,
  });

  const [itemSoldNotification, setItemSoldNotification] = useState(true);

  const handleBack = () => {
    // Handle back navigation
  };

  const toggleSocialNotification = (key) => {
    setSocialNotifications((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const toggleItemSoldNotification = () => {
    setItemSoldNotification((prevValue) => !prevValue);
  };

  return (
    <View style={styles.container}>
      {/* Heading and Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.heading}>Notifications</Text>
      </View>

      {/* Social Notifications */}
      <View style={styles.section}>
        <Text style={styles.subheading}>Ride</Text>
        <View style={styles.notificationItem}>
          <Text style={styles.notificationText}>Ride Conformation</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor="#f4f3f4"
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleSocialNotification("likes")}
            value={socialNotifications.likes}
          />
        </View>
        <View style={styles.notificationItem}>
          <Text style={styles.notificationText}>Driver Arrival</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor="#f4f3f4"
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleSocialNotification("comments")}
            value={socialNotifications.comments}
          />
        </View>
      </View>

      {/* Store Notifications */}
      <View style={styles.section}>
        <Text style={styles.subheading}>Social</Text>
        <View style={styles.notificationItem}>
          <Text style={styles.notificationText}>New Offers</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor="#f4f3f4"
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleItemSoldNotification}
            value={itemSoldNotification}
          />
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
    marginTop: 32
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 16,
  },
  section: {
    marginBottom: 24
  },
  subheading: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  notificationItem: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    alignSelf: "center"
  },
  notificationText: {
    fontSize: 16,
    color: "#333",
  },
});

export default NotificationScreen;