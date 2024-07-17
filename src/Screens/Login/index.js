import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import GlobalStyles from "../../Utils/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebaseConfig";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slicers/userSlicer";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import translationText from "../../Utils/translations";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginScreen = () => {
  const navigation = useNavigation();
  const [isPressed, setPressed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const fetchRole = async (uid) => {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      return userDoc.data().role;
    } else {
      return null;
    }
  };

  const handleLogin = async (values) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values["email"],
        values["password"]
      );
      const user = userCredential.user;

      const roleFetch = await fetchRole(user.uid);
      console.log(userCredential);

      const serializableUser = {
        uid: user.uid,
        idToken: user.idToken,
        email: user.email,
        displayName: user.displayName,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        isAnonymous: user.isAnonymous,
        role: roleFetch,
      };

      dispatch(setUser(serializableUser));
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
      >{translationText.login.heading}</Text>

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
              style={styles.emailInput}
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

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#D0D0D0"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry={!showPassword}
              />
              <Pressable
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Entypo
                  name={showPassword ? "eye" : "eye-with-line"}
                  size={20}
                  color="#414141"
                />
              </Pressable>
            </View>
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
            <TouchableOpacity
              style={{
                paddingHorizontal: 16,
                flexDirection: "row",
                columnGap: 6,
                alignItems: "flex-end",
                justifyContent: "flex-end",
                marginBottom: 36,
              }}
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={{ fontSize: 12, color: "#F44336" }}>{translationText.login.forget}</Text>
            </TouchableOpacity>
            <Pressable
              style={GlobalStyles.buttonPrimary}
              onPress={handleSubmit}
              title="Submit"
            >
              <Text style={[GlobalStyles.textMedium, { color: "white" }]}>{translationText.login.login}</Text>
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
                    columnGap: 12,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FontAwesome name="phone" size={24} color="black" />
                  <Text style={[GlobalStyles.textMedium, { color: "#5A5A5A" }]}>{translationText.login.phone}</Text>
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
              <Text style={[GlobalStyles.textMedium, { textAlign: "center" }]}>{translationText.login.notAccount}</Text>
              <Pressable onPress={() => navigation.navigate("Signup")}>
                <Text style={[GlobalStyles.textMedium, { color: "#E94B3C" }]}>{translationText.login.signup}</Text>
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
  emailInput: {
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 16,
    borderRadius: 10,
  },
  input: {
    height: 50,
    width: "85%",
    borderRadius: 10,
  },
  passwordContainer: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 12,
    paddingLeft: 16,
  },
  eyeIcon: {
    padding: 10,
  },
});
