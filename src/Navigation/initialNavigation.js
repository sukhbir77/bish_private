import { StyleSheet } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import AuthNavigation from "./authNavigation";
import { selectUser, selectFirstTime } from "../../redux/slicers/userSlicer";
import FirstTimeScreens from "./firstTimeScreens";
import Onboarding from "./Onboarding";
import UserHome from "./userHome";
import DriverHome from "./driverHome";

const InitialNavigation = () => {
  const user = useSelector(selectUser);
  const isFirstTime = useSelector(selectFirstTime);

  console.log(user);

  return isFirstTime ? (
    <FirstTimeScreens />
  ) : user ? (
    user.role !== null ? (
      user.role === "Driver" ? (
        <DriverHome />
      ) : (
        <UserHome />
      )
    ) : (
      <Onboarding />
    )
  ) : (
    <AuthNavigation />
  );
};

export default InitialNavigation;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
