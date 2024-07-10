import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "react-native-vector-icons";

// Screens
import HomeScreen from "../Screens/Home";
import ProfileScreen from "../Screens/Profile";
import ActivityScreen from "../Screens/Activity";
import ServicesScreen from "../Screens/Services";

const Tab = createBottomTabNavigator();

const HomeNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 80,
          paddingTop: 8,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Services") {
            iconName = focused ? "apps" : "apps-outline";
          } else if (route.name === "Activity") {
            iconName = focused ? "clipboard" : "clipboard-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          // Return the icon component
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#E94B3C",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Services" component={ServicesScreen} />
      <Tab.Screen name="Activity" component={ActivityScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default HomeNavigation;
