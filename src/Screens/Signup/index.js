import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import GlobalStyles from "../../Utils/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../firebaseConfig";
import AntDesign from "@expo/vector-icons/AntDesign";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slicers/userSlicer";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const SignupScreen = () => {
  const navigation = useNavigation();
  const [isPressed, setPressed] = useState(false);
  const dispatch = useDispatch();

  const handleSignup = async (values) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values["email"],
        values["password"]
      );
      dispatch(setUser(userCredential));
    } catch (error) {
      console.error("Error logging in: ", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={GlobalStyles.container}>
      <Pressable
        style={GlobalStyles.backButton}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="left" size={24} color="#414141" />
        <Text style={[GlobalStyles.textMedium, { color: "#414141" }]}>
          Back
        </Text>
      </Pressable>
      <Text
        style={[
          GlobalStyles.textLarge,
          { marginTop: 72, marginBottom: 12, fontWeight: "500" },
        ]}
      >
        Sign up with your email
      </Text>

      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSignup(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#D0D0D0"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              keyboardType="email-address"
            />
            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#D0D0D0"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
            />
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#D0D0D0"
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              value={values.confirmPassword}
              secureTextEntry
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.error}>{errors.confirmPassword}</Text>
            )}
            <View
              style={{
                paddingHorizontal: 16,
                flexDirection: "row",
                columnGap: 6,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 36,
              }}
            >
              <Pressable
                style={[
                  styles.privacyButton,
                  {
                    backgroundColor: isPressed ? "#E94B3C" : "#fff",
                    borderColor: "#E94B3C",
                    borderWidth: isPressed ? 0 : 2,
                  },
                ]}
                onPress={() => setPressed(!isPressed)}
              ></Pressable>
              <Text style={GlobalStyles.textExtraSmall}>
                By signing up. you agree to the Terms of service and Privacy
                policy and the terms.
              </Text>
            </View>
            <Pressable
              style={GlobalStyles.buttonPrimary}
              onPress={handleSubmit}
              title="Submit"
            >
              <Text style={[GlobalStyles.textMedium, { color: "white" }]}>
                Sign Up
              </Text>
            </Pressable>

            <Image
              source={require("../../../assets/images/or.png")}
              style={styles.orImage}
            ></Image>

            <View style={{ rowGap: 16 }}>
              <Pressable
                style={[
                  GlobalStyles.buttonSecondary,
                  { borderColor: "#D0D0D0" },
                ]}
                onPress={() => navigation.navigate("OnboardingScreenTwo")}
              >
                <View
                  style={{
                    flexDirection: "row",
                    columnGap: 6,
                    alignItems: "center",
                  }}
                >
                  <AntDesign name="google" size={24} color="black" />
                  <Text style={[GlobalStyles.textMedium, { color: "#5A5A5A" }]}>
                    Sign up with Gmail
                  </Text>
                </View>
              </Pressable>
              <Pressable
                style={[
                  GlobalStyles.buttonSecondary,
                  { borderColor: "#D0D0D0" },
                ]}
                onPress={() => navigation.navigate("OnboardingScreenTwo")}
              >
                <View
                  style={{
                    flexDirection: "row",
                    columnGap: 6,
                    alignItems: "center",
                  }}
                >
                  <AntDesign name="facebook-square" size={24} color="black" />
                  <Text style={[GlobalStyles.textMedium, { color: "#5A5A5A" }]}>
                    Sign up with Facebook
                  </Text>
                </View>
              </Pressable>
              <Pressable
                style={[
                  GlobalStyles.buttonSecondary,
                  { borderColor: "#D0D0D0" },
                ]}
                onPress={() => navigation.navigate("OnboardingScreenTwo")}
              >
                <View
                  style={{
                    flexDirection: "row",
                    columnGap: 6,
                    alignItems: "center",
                  }}
                >
                  <AntDesign name="apple1" size={24} color="black" />
                  <Text style={[GlobalStyles.textMedium, { color: "#5A5A5A" }]}>
                    Sign up with Apple
                  </Text>
                </View>
              </Pressable>
            </View>

            <View
              style={{
                flexDirection: "row",
                columnGap: 6,
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 16,
              }}
            >
              <Text style={[GlobalStyles.textMedium, { textAlign: "center" }]}>
                Already Have an account?
              </Text>
              <Pressable onPress={() => console.log("Fuck me")}>
                <Text style={[GlobalStyles.textMedium, { color: "#E94B3C" }]}>
                  Login
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  icon: {
    height: 70,
    width: 70,
    objectFit: "contain",
  },
  image: {
    height: 250,
    width: "90%",
  },
  container: {
    width: "100%",
    justifyContent: "center",
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 16,
    borderRadius: 10,
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
  privacyButton: {
    height: 18,
    width: 18,
    backgroundColor: "",
    borderRadius: 16,
  },
  orImage: {
    height: 20,
    objectFit: "contain",
    width: "100%",
    marginTop: 24,
    marginBottom: 24,
  },
});
