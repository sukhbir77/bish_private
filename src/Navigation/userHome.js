import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import HomeNavigation from './homeNavigation';
import EditProfileScreen from "../Screens/EditProfile";
import PrivacyPolicyScreen from "../Screens/Privacy";
import NotificationScreen from "../Screens/Notifications";
import ContactUsScreen from "../Screens/ContactUs";

const Stack = createStackNavigator();

const UserHome = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeNavigation}
      />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Privacy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
      <Stack.Screen name="ContactUs" component={ContactUsScreen} />
    </Stack.Navigator>
  );
};

export default UserHome;

const styles = StyleSheet.create({});
