import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import GlobalStyles from "../../../Utils/GlobalStyles";
import { useNavigation } from "@react-navigation/native";

const OnboardingScreenOne = () => {
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
          source={require("../../../../assets/images/onboarding/anywhere.png")}
          style={styles.image}
        ></Image>
        <Text
          style={[GlobalStyles.textLarge, { marginTop: 24, marginBottom: 12 }]}
        >
          Anywhere you are
        </Text>
        <Text style={[GlobalStyles.textSmall, {width: 300}]}>
          Enjoy quick and reliable rides to any destination, anytime.Let's get
          you moving!
        </Text>
      </View>
      <Pressable style={{ height: "20%" }} onPress={() => navigation.navigate("OnboardingScreenTwo")}>
        <Image
          source={require("../../../../assets/images/onboarding/Button1.png")}
          style={styles.icon}
        />
      </Pressable>
    </View>
  );
};

export default OnboardingScreenOne;

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
