import * as Localization from "expo-localization";

const language = Localization.getLocales();

console.log(language);

const translationText =
  language[0].languageCode.includes("en") ||
  language[0].languageCode.includes("EN")
    ? {
        onboarding: {
          skip: "Skip",
          screenOne:
            "Enjoy quick and reliable rides to any destination, anytime.Let's get you moving!",
          screenTwo:
            "Need a ride early in the morning or late at night? Your journey, your schedule—anytime you choose.",
          screenThree:
            "Ready to go? Booking your ride is fast and easy. Choose between a car or motorcycle, set your destination, and you're all set.",
        },
        welcome: {
          welcome: "Welcome",
          heading: "Have a better sharing experience",
          signup: "Create an account",
          login: "Login",
        },
        signup: {
          heading: "Sign up with your email",
          email: "Email",
          password: "Password",
          confirmPassword: "Confirm Password",
          forget: "Forgot Password?",
          signup: "Sign Up",
          terms1: "By signing up, you agree to the ",
          terms2: "Terms of Service and Privacy Policy",
          phone: "Sign up with Phone",
          already: "Already Have an account?",
          login: "Login",
        },
        login: {
          heading: "Login with your email",
          forget: "Forgot Password?",
          login: "Login",
          phone: "Login with Phone",
          notAccount: "Don't have an account? ",
          signup: "Sign Up",
        },
      }
    : {
        onboarding: {
          skip: "छोड्नुहोस्",
          screenOne:
            "कुनै पनि गन्तव्यमा छिटो र भरपर्दो सवारीको आनन्द लिनुहोस्, कुनै पनि समय। तपाईंलाई चलाउँदै गरौं!",
          screenTwo:
            "तपाईंलाई बिहान सबेरै वा राति ढिलोगरी सवारी चाहिन्छ? तपाईंको यात्रा, तपाईंको तालिका—कुनै पनि समय तपाईंले रोज्न सक्नुहुन्छ।",
          screenThree:
            "जान तयार हुनुहुन्छ? तपाईंको सवारी बुकिंग छिटो र सजिलो छ। कार वा मोटरसाइकल छान्नुहोस्, तपाईंको गन्तव्य सेट गर्नुहोस्, र तपाईं तयार हुनुहुन्छ।",
        },
        welcome: {
          welcome: "स्वागत छ",
          heading: "साझेदारी अनुभव राम्रो बनाउनुहोस्",
          signup: "खाता सिर्जना गर्नुहोस्",
          login: "लगइन गर्नुहोस्",
        },
        signup: {
          heading: "तपाईंको इमेल मार्फत साइन अप गर्नुहोस्",
          email: "इमेल",
          password: "पासवर्ड",
          confirmPassword: "पासवर्ड पुष्टि गर्नुहोस्",
          forget: "पासवर्ड बिर्सनुभयो?",
          signup: "साइन अप गर्नुहोस्",
          terms1: "साइन अप गरेर, तपाईं सहमत हुनुहुन्छ ",
          terms2: "सेवाका सर्तहरू र गोपनीयता नीति",
          phone: "फोन मार्फत साइन अप गर्नुहोस्",
          already: "पहिले नै खाता छ?",
          login: "लगइन गर्नुहोस्",
        },
        login: {
          heading: "तपाईंको इमेल मार्फत लगइन गर्नुहोस्",
          forget: "पासवर्ड बिर्सनुभयो?",
          login: "लगइन गर्नुहोस्",
          phone: "फोन मार्फत लगइन गर्नुहोस्",
          notAccount: "खाता छैन?",
          signup: "साइन अप गर्नुहोस्",
        },
      };

export default translationText;
