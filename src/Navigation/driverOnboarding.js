import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import BasicInformation from "../Screens/DriverOnboarding/BasicInformation/index";
import ImageCollection from "../Screens/DriverOnboarding/ImageCollection/index";
import ThirdScreen from "../Screens/DriverOnboarding/ThirdScreen/index";

const Stack = createStackNavigator();

const DriverOnboarding = () => {
  return (
    <Stack.Navigator
      initialRouteName="Basic"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="Basic" component={BasicInformation} />
      <Stack.Screen name="Images" component={ImageCollection} />
      <Stack.Screen name="Third" component={ThirdScreen} />
    </Stack.Navigator>
  );
};

export default DriverOnboarding;
