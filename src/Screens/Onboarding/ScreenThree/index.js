import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import GlobalStyles from "../../../Utils/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { setFirstTime } from "../../../../redux/slicers/userSlicer";
import { useDispatch } from "react-redux";
import translationText from "../../../Utils/translations";

const OnboardingScreenThree = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
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
          <Text style={GlobalStyles.textSmallSize}>{translationText.onboarding.skip}</Text>
        </Pressable>
        <Image
          source={require("../../../../assets/images/onboarding/book2.png")}
          style={styles.image}
        ></Image>
        <Text
          style={[GlobalStyles.textLarge, { marginTop: 24, marginBottom: 12 }]}
        >
          Book your Ride
        </Text>
        <Text style={[GlobalStyles.textSmall, { width: 300 }]}>{translationText.onboarding.screenThree}</Text>
      </View>
      <Pressable
        style={{ height: "20%" }}
        onPress={() => dispatch(setFirstTime(false))}
      >
        <Image
          source={require("../../../../assets/images/onboarding/Button3.png")}
          style={styles.icon}
        />
      </Pressable>
    </View>
  );
};

export default OnboardingScreenThree;

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
