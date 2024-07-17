import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  ScrollView,
  Modal,
  Alert,
  Image,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../firebaseConfig";
import AntDesign from "@expo/vector-icons/AntDesign";
import { createUserWithEmailAndPassword } from "firebase/auth";
import GlobalStyles from "../../Utils/GlobalStyles";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import translationText from "../../Utils/translations";

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
  const [modalVisible, setModalVisible] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = async (values) => {
    if (!agreed) {
      Alert.alert(
        "Error",
        "You must agree to the terms and conditions before signing up."
      );
      return;
    }

    try {
      await createUserWithEmailAndPassword(
        auth,
        values["email"],
        values["password"]
      );
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error signing up: ", error);
      Alert.alert("Error", "Something went wrong while signing up.");
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
      >{translationText.signup.heading}</Text>

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

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#D0D0D0"
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <Pressable
                style={styles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Entypo
                  name={showConfirmPassword ? "eye" : "eye-with-line"}
                  size={20}
                  color="#414141"
                />
              </Pressable>
            </View>
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
                onPress={() => {
                  setPressed(!isPressed);
                  setAgreed(!isPressed);
                }}
              />
              <Text style={GlobalStyles.textExtraSmall}>{translationText.signup.terms1}<Text
                  style={{ color: "#E94B3C" }}
                  onPress={() => setModalVisible(true)}
                >
                  {" "}
                  {translationText.signup.terms2}</Text>
                .
              </Text>
            </View>
            <Pressable
              style={GlobalStyles.buttonPrimary}
              onPress={handleSubmit}
              title="Submit"
            >
              <Text style={[GlobalStyles.textMedium, { color: "white" }]}>{translationText.signup.signup}</Text>
            </Pressable>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.modalView}>
                <ScrollView contentContainerStyle={styles.modalContent}>
                  <Text style={styles.modalTitle}>Terms and Conditions</Text>
                  <Text style={styles.modalText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer nec odio. Praesent libero. Sed cursus ante dapibus
                    diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
                    Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed
                    augue semper porta. Mauris massa. Vestibulum lacinia arcu
                    eget nulla. Class aptent taciti sociosqu ad litora torquent
                    per conubia nostra, per inceptos himenaeos. Curabitur
                    sodales ligula in libero. Sed dignissim lacinia nunc.
                    Curabitur tortor. Pellentesque nibh. Aenean quam. In
                    scelerisque sem at dolor. Maecenas mattis. Sed convallis
                    tristique sem. Proin ut ligula vel nunc egestas porttitor.
                    Morbi lectus risus, iaculis vel, suscipit quis, luctus non,
                    massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris
                    ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed,
                    euismod in, nibh. Quisque volutpat condimentum velit. Class
                    aptent taciti sociosqu ad litora torquent per conubia
                    nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia,
                    urna non tincidunt mattis, tortor neque adipiscing diam, a
                    cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla.
                    Suspendisse potenti. Nunc feugiat mi a tellus consequat
                    imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices.
                    Suspendisse in justo eu magna luctus suscipit. Sed lectus.
                    Integer euismod lacus luctus magna. Quisque cursus, metus
                    vitae pharetra auctor, sem massa mattis sem, at interdum
                    magna augue eget diam. Vestibulum ante ipsum primis in
                    faucibus orci luctus et ultrices posuere cubilia Curae;
                    Morbi lacinia molestie dui. Praesent blandit dolor. Sed non
                    quam. In vel mi sit amet augue congue eleme
                  </Text>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      setAgreed(true);
                      setPressed(true);
                    }}
                  >
                    <Text style={styles.textStyle}>Agree</Text>
                  </Pressable>
                </ScrollView>
              </View>
            </Modal>

            <Image
              source={require("../../../assets/images/or.png")}
              style={styles.orImage}
            />

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
                  <Text style={[GlobalStyles.textMedium, { color: "#5A5A5A" }]}>{translationText.signup.phone}</Text>
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
              <Text style={[GlobalStyles.textMedium, { textAlign: "center" }]}>{translationText.signup.already}</Text>
              <Pressable onPress={() => navigation.navigate("Login")}>
                <Text style={[GlobalStyles.textMedium, { color: "#E94B3C" }]}>{translationText.signup.login}</Text>
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
  container: {
    width: "100%",
    justifyContent: "center",
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
  error: {
    color: "red",
    marginBottom: 8,
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
    paddingLeft: 16
  },
  eyeIcon: {
    padding: 10,
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
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
