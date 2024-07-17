import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import RoleScreen from "../Screens/Role";
import UserOnboarding from "../Screens/UserOnBoarding";
import DriverOnboarding from "./driverOnboarding";

const Stack = createStackNavigator();

const Onboarding = () => {
  return (
    <Stack.Navigator
      initialRouteName="Role"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="Role" component={RoleScreen} />
      <Stack.Screen name="UserOnboard" component={UserOnboarding} />
      <Stack.Screen name="DriverOnboard" component={DriverOnboarding} />
    </Stack.Navigator>
  );
};

export default Onboarding;
