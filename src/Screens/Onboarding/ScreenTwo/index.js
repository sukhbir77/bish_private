import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import GlobalStyles from "../../../Utils/GlobalStyles";
import { useNavigation } from "@react-navigation/native";

const OnboardingScreenTwo = () => {
  const navigation = useNavigation();

  return (
    <View style={GlobalStyles.container}>
      <View
        style={{
          height: "80%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable
          style={{ position: "absolute", right: 0, top: 42 }}
          onPress={() => console.log("Skip")}
        >
          <Text style={GlobalStyles.textSmallSize}>Skip</Text>
        </Pressable>
        <Image
          source={require("../../../../assets/images/onboarding/anytime.png")}
          style={styles.image}
        ></Image>
        <Text
          style={[GlobalStyles.textLarge, { marginTop: 24, marginBottom: 12 }]}
        >
          At anytime
        </Text>
        <Text style={[GlobalStyles.textSmall, {width: 300}]}>
          Need a ride early in the morning or late at night? Your journey, your
          schedule—anytime you choose.
        </Text>
      </View>
      <Pressable style={{ height: "20%" }} onPress={() => navigation.navigate("OnboardingScreenThree")}>
        <Image
          source={require("../../../../assets/images/onboarding/Button2.png")}
          style={styles.icon}
        />
      </Pressable>
    </View>
  );
};

export default OnboardingScreenTwo;

const styles = StyleSheet.create({
  icon: {
    height: 70,
    width: 70,
    objectFit: "contain",
  },
  image: {
    height: 350,
    width: 300,
    objectFit: "contain",
  },
});
