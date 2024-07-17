import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  textLarge: {
    fontSize: 24,
    color: "#414141",
  },
  textSmall: {
    fontSize: 14,
    color: "#A0A0A0",
    textAlign: "center",
    marginBottom: 16
  },
  textSmallSize: {
    fontSize: 14,
  },
  textMedium: {
    fontSize: 16,
  },
  buttonPrimary: {
    alignItems: "center",
    backgroundColor: "#E94B3C",
    padding: 18,
    borderRadius: 14,
  },
  buttonSecondary: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E94B3C",
    padding: 18,
    borderRadius: 14,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    flexDirection: "row",
    columnGap: 6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textExtraSmall: {
    fontSize: 10,
    color: "#B8B8B8"
  }
});
