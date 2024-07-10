import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import HomeNavigation from "./homeNavigation";
import AuthNavigation from "./authNavigation";
import RoleScreen from "../Screens/Role/index";
import DriverOnboarding from "./driverOnboarding";
import DriverHomeScreen from "../Screens/DriverHome";
import OnboardingNavigation from "./OnboardingNavigation";
import {
  selectUser,
  selectFirstTime,
  selectIsOnboarded,
  selectRole,
} from "../../redux/slicers/userSlicer";

const InitialNavigation = () => {
  const user = useSelector(selectUser);
  const role = useSelector(selectRole);
  const isOnboarded = useSelector(selectIsOnboarded);
  const isFirstTime = useSelector(selectFirstTime);

  console.log(isFirstTime, role, isOnboarded);

  return isFirstTime ? (
    <OnboardingNavigation />
  ) : user ? (
    role ? (
      role == "Ride" ? (
        <HomeNavigation />
      ) : !isOnboarded ? (
        <DriverOnboarding />
      ) : (
        <DriverHomeScreen />
      )
    ) : (
      <RoleScreen />
    )
  ) : (
    <AuthNavigation />
  );
};

export default InitialNavigation;

const styles = StyleSheet.create({});
