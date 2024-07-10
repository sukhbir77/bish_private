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
import AntDesign from "@expo/vector-icons/AntDesign";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slicers/userSlicer";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginScreen = () => {
  const navigation = useNavigation();
  const [isPressed, setPressed] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async (values) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
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
        Login with your email
      </Text>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleLogin(values)}
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
            <View
              style={{
                paddingHorizontal: 16,
                flexDirection: "row",
                columnGap: 6,
                alignItems: "flex-end",
                justifyContent: "flex-end",
                marginBottom: 36,
              }}
            >
              <Text style={{ fontSize: 12, color: "#F44336" }}>
                Forgot Password?
              </Text>
            </View>
            <Pressable
              style={GlobalStyles.buttonPrimary}
              onPress={handleSubmit}
              title="Submit"
            >
              <Text style={[GlobalStyles.textMedium, { color: "white" }]}>
                Login
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
                    Login with Gmail
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
                    Login with Facebook
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
                    Login with Apple
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
                Don't Have an account?
              </Text>
              <Pressable onPress={() => navigation.navigate("Signup")}>
                <Text style={[GlobalStyles.textMedium, { color: "#E94B3C" }]}>
                  Sign Up
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default LoginScreen;

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
