import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import PrivacyPolicyScreen from "../Screens/Privacy";
import NotificationScreen from "../Screens/Notifications";
import ContactUsScreen from "../Screens/ContactUs";
import DriverTab from "./driverTab";
import EditProfileScreen from "../Screens/DriverScreens/ProfileEdit";

const Stack = createStackNavigator();

const DriverHome = () => {
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
        component={DriverTab}
      />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Privacy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
      <Stack.Screen name="ContactUs" component={ContactUsScreen} />
    </Stack.Navigator>
  );
};

export default DriverHome;

const styles = StyleSheet.create({});
