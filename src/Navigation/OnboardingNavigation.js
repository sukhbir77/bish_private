import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import OnboardingScreenOne from "../Screens/Onboarding/ScreenOne";
import OnboardingScreenTwo from "../Screens/Onboarding/ScreenTwo";
import OnboardingScreenThree from "../Screens/Onboarding/ScreenThree";

const Stack = createStackNavigator();

const OnboardingNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="OnboardingScreenOne"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen
        name="OnboardingScreenOne"
        component={OnboardingScreenOne}
      />
      <Stack.Screen
        name="OnboardingScreenTwo"
        component={OnboardingScreenTwo}
      />
      <Stack.Screen
        name="OnboardingScreenThree"
        component={OnboardingScreenThree}
      />
    </Stack.Navigator>
  );
};

export default OnboardingNavigation;

const styles = StyleSheet.create({});
