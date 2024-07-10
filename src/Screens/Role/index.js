import { SafeAreaView, StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState } from "react";
import GlobalStyles from "../../Utils/GlobalStyles";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useDispatch } from "react-redux";
import { setRole } from "../../../redux/slicers/userSlicer";

const RoleScreen = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const dispatch = useDispatch();

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

  const handleRoleSubmit = () => {
    dispatch(setRole(selectedRole));
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        rowGap: 48,
        justifyContent: "center",
        padding: 16,
      }}
    >
      <Text style={[GlobalStyles.textLarge, { fontWeight: "600" }]}>
        Get Started with{" "}
        <Text
          style={[
            GlobalStyles.textLarge,
            { fontWeight: "600", color: "#E94B3C" },
          ]}
        >
          BISH
        </Text>
      </Text>
      <View style={styles.roleContainer}>
        <Pressable
          style={[
            styles.imageCard,
            selectedRole === "Drive" && {
              borderColor: "#E94B3C",
              borderWidth: 2,
            },
          ]}
          onPress={() => handleRoleSelection("Drive")}
        >
          <AntDesign name="car" size={80} color="#E94B3C" />
          <Text style={GlobalStyles.textMedium}>Drive</Text>
        </Pressable>

        <Pressable
          style={[
            styles.imageCard,
            selectedRole === "Ride" && {
              borderColor: "#E94B3C",
              borderWidth: 2,
            },
          ]}
          onPress={() => handleRoleSelection("Ride")}
        >
          <FontAwesome name="street-view" size={80} color="#E94B3C" />
          <Text style={GlobalStyles.textMedium}>Ride</Text>
        </Pressable>
      </View>

      <Pressable
        style={[
          GlobalStyles.buttonPrimary,
          { position: "absolute", bottom: 32, width: "80%" },
        ]}
        onPress={() => handleRoleSubmit()}
        disabled={!selectedRole}
      >
        <Text style={[GlobalStyles.textMedium, { color: "white" }]}>
          Continue
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default RoleScreen;

const styles = StyleSheet.create({
  imageCard: {
    height: 200,
    width: "45%",
    backgroundColor: "#F6F6F6",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 16,
  },
  roleContainer: {
    width: "100%",
    columnGap: 16,
    flexDirection: "row",
    justifyContent: "center",
  },
});