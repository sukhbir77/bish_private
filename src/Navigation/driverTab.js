import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "react-native-vector-icons";
import Home from "../Screens/DriverScreens/Home";
import ServicesScreen from "../Screens/DriverScreens/Services";
import HistoryScreen from "../Screens/DriverScreens/History";
import ProfileScreen from "../Screens/DriverScreens/Profile";

const Tab = createBottomTabNavigator();

const DriverTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 80,
          paddingTop: 8,
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#E94B3C",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Services") {
            iconName = focused ? "car-sport" : "car-sport-outline"; // Represents ride options
          } else if (route.name === "Activity") {
            iconName = focused ? "time" : "time-outline"; // Represents ride history
          } else if (route.name === "Profile") {
            iconName = focused ? "person-circle" : "person-circle-outline"; // More visual appeal
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#E94B3C",
        inactiveTintColor: "gray",
        labelStyle: {
          fontSize: 12,
          paddingBottom: 5,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name="Services"
        component={ServicesScreen}
        options={{ tabBarLabel: "Services" }}
      />
      <Tab.Screen
        name="Activity"
        component={HistoryScreen}
        options={{ tabBarLabel: "History" }} // More descriptive
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: "Profile" }}
      />
    </Tab.Navigator>
  );
};

export default DriverTab;
