import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import GlobalStyles from "../../Utils/GlobalStyles";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";

const HomeScreen = ({ navigation }) => {
  const initialCamera = {
    center: {
      latitude: 28.3949,
      longitude: 84.124,
    },
    heading: 0,
    pitch: 0,
    altitude: 1000,
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Where to?"
          placeholderTextColor="#888"
        />
        <Pressable style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#fff" />
        </Pressable>
      </View>
      <MapView
        style={styles.map}
        mapType="standard"
        zoomEnabled={true}
        initialCamera={initialCamera}
        initialRegion={{
          latitude: 28.3949,
          longitude: 84.124,
          latitudeDelta: 2,
          longitudeDelta: 2,
        }}
      >
        <Marker
          coordinate={{ latitude: 28.3949, longitude: 84.124 }}
          title="Nepal"
          description="This is Nepal"
        />
      </MapView>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={[GlobalStyles.textMedium, styles.sectionTitle]}>
          Quick Access
        </Text>
        <View style={styles.quickAccessContainer}>
          <Pressable
            style={styles.quickAccessButton}
            onPress={() => navigation.navigate("Home")}
          >
            <MaterialIcons name="home" size={24} color="#E94B3C" />
            <Text style={GlobalStyles.textMedium}>Home</Text>
          </Pressable>
          <Pressable
            style={styles.quickAccessButton}
            onPress={() => navigation.navigate("Work")}
          >
            <Ionicons name="briefcase" size={24} color="#E94B3C" />
            <Text style={GlobalStyles.textMedium}>Work</Text>
          </Pressable>
          <Pressable
            style={styles.quickAccessButton}
            onPress={() => navigation.navigate("SavedPlaces")}
          >
            <Ionicons name="heart" size={24} color="#E94B3C" />
            <Text style={GlobalStyles.textMedium}>Saved Places</Text>
          </Pressable>
          <Pressable
            style={styles.quickAccessButton}
            onPress={() => navigation.navigate("Recent")}
          >
            <Ionicons name="time" size={24} color="#E94B3C" />
            <Text style={GlobalStyles.textMedium}>Recent</Text>
          </Pressable>
        </View>
        <Text style={[GlobalStyles.textMedium, styles.sectionTitle]}>
          Promotions
        </Text>
        <View style={styles.promoContainer}>
          <Image
            source={{ uri: "https://via.placeholder.com/150" }}
            style={styles.promoImage}
          />
          <View style={styles.promoTextContainer}>
            <Text style={GlobalStyles.textMedium}>
              Ride 5 times, get 1 free!
            </Text>
            <Text style={GlobalStyles.textSmall}>Valid until 31 Dec 2024</Text>
          </View>
        </View>
        <View style={styles.promoContainer}>
          <Image
            source={{ uri: "https://via.placeholder.com/150" }}
            style={styles.promoImage}
          />
          <View style={styles.promoTextContainer}>
            <Text style={GlobalStyles.textMedium}>
              20% off on your next ride
            </Text>
            <Text style={GlobalStyles.textSmall}>Use code: SAVE20</Text>
          </View>
        </View>
        <Text style={[GlobalStyles.textMedium, styles.sectionTitle]}>
          Suggestions
        </Text>
        <View style={styles.suggestionContainer}>
          <Pressable style={styles.suggestionButton}>
            <FontAwesome name="taxi" size={24} color="#E94B3C" />
            <Text style={GlobalStyles.textMedium}>Nearby Taxis</Text>
          </Pressable>
          <Pressable style={styles.suggestionButton}>
            <Ionicons name="restaurant" size={24} color="#E94B3C" />
            <Text style={GlobalStyles.textMedium}>Restaurants</Text>
          </Pressable>
          <Pressable style={styles.suggestionButton}>
          <FontAwesome name="tree" size={24} color="#E94B3C" />
            <Text style={GlobalStyles.textMedium}>Parks</Text>
          </Pressable>
          <Pressable style={styles.suggestionButton}>
            <Ionicons name="airplane" size={24} color="#E94B3C" />
            <Text style={GlobalStyles.textMedium}>Airports</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#E94B3C",
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    color: "#000",
  },
  searchButton: {
    marginLeft: 8,
    backgroundColor: "#E94B3C",
    padding: 10,
    borderRadius: 8,
  },
  map: {
    height: 300,
    margin: 16,
    borderRadius: 8,
  },
  contentContainer: {
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  quickAccessContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  quickAccessButton: {
    width: "48%",
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  promoContainer: {
    flexDirection: "row",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  promoImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  promoTextContainer: {
    flex: 1,
  },
  suggestionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  suggestionButton: {
    width: "48%",
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
});
