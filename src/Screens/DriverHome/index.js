import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { resetState } from "../../../redux/slicers/userSlicer";
import GlobalStyles from "../../Utils/GlobalStyles";

const DriverHomeScreen = () => {
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(resetState());
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        style={{
          fontSize: 32,
          color: "#E94B3C",
          textAlign: "center",
          marginVertical: 32,
        }}
      >
        Your Information is being verified.
      </Text>
      <Pressable
        style={[GlobalStyles.buttonPrimary, { width: "80%" }]}
        onPress={() => handleReset()}
      >
        <Text style={[GlobalStyles.textMedium, { color: "white" }]}>
          Reset App
        </Text>
      </Pressable>
    </View>
  );
};

export default DriverHomeScreen;

const styles = StyleSheet.create({});
