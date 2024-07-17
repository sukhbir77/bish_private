import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import GlobalStyles from "../../Utils/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import translationText from "../../Utils/translations";

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={GlobalStyles.container}>
      <View
        style={{
          height: "80%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../../assets/images/welcome.png")}
          style={styles.image}
        ></Image>
        <Text
          style={[
            GlobalStyles.textLarge,
            { marginTop: 24, marginBottom: 12, fontWeight: "500" },
          ]}
        >{translationText.welcome.welcome}</Text>
        <Text style={[GlobalStyles.textSmall, { width: 300, fontSize: 16 }]}>{translationText.welcome.heading}</Text>
      </View>
      <View style={{ width: "100%", rowGap: 16 }}>
        <Pressable
          style={GlobalStyles.buttonPrimary}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={[GlobalStyles.textMedium, { color: "white" }]}>
            {translationText.welcome.signup}
          </Text>
        </Pressable>
        <Pressable
          style={GlobalStyles.buttonSecondary}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={[GlobalStyles.textMedium, { color: "#E94B3C" }]}>{translationText.welcome.login}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  icon: {
    height: 70,
    width: 70,
    objectFit: "contain",
  },
  image: {
    height: 300,
    width: "90%",
    objectFit: "contain"
  }
});
