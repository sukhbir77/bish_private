import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView } from 'react-native';

const activityData = [
  { id: '1', date: '2023-07-01', title: 'Motorcycle Ride', description: 'Took a motorcycle ride', price: '$25', driver: 'John Doe', imageUrl: 'https://example.com/motorcycle.jpg' },
  { id: '2', date: '2023-06-28', title: 'Car Ride', description: 'Booked a car ride', price: '$40', driver: 'Jane Smith', imageUrl: 'https://example.com/car.jpg' },
  { id: '3', date: '2023-06-25', title: 'Motorcycle Ride', description: 'Enjoyed a motorcycle ride', price: '$20', driver: 'Mike Johnson', imageUrl: 'https://example.com/motorcycle2.jpg' },
  { id: '4', date: '2023-06-20', title: 'Car Ride', description: 'Took a premium car ride', price: '$60', driver: 'Emily Brown', imageUrl: 'https://example.com/car2.jpg' },
  { id: '5', date: '2023-06-15', title: 'Car Ride', description: 'Rode in a SUV', price: '$50', driver: 'David White', imageUrl: 'https://example.com/car3.jpg' },
  { id: '6', date: '2023-06-10', title: 'Motorcycle Ride', description: 'Took a scenic motorcycle ride', price: '$30', driver: 'Sarah Green', imageUrl: 'https://example.com/motorcycle3.jpg' },
  { id: '7', date: '2023-06-05', title: 'Car Ride', description: 'Took a luxury sedan ride', price: '$70', driver: 'Olivia Black', imageUrl: 'https://example.com/car4.jpg' },
  { id: '8', date: '2023-06-01', title: 'Motorcycle Ride', description: 'Commuted with a motorcycle', price: '$25', driver: 'Robert Blue', imageUrl: 'https://example.com/motorcycle4.jpg' },
  { id: '9', date: '2023-05-28', title: 'Car Ride', description: 'Shared a ride in a hatchback', price: '$35', driver: 'Emma Red', imageUrl: 'https://example.com/car5.jpg' },
  { id: '10', date: '2023-05-25', title: 'Motorcycle Ride', description: 'Took an adventurous motorcycle trip', price: '$40', driver: 'James Yellow', imageUrl: 'https://example.com/motorcycle5.jpg' },
  // Add more activities as needed with their respective image URLs, price, and driver details
];


const ActivityScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.extraDetailsContainer}>
          <Text style={styles.detailText}>Price: {item.price}</Text>
          <Text style={styles.detailText}>Driver: {item.driver}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Past Activity</Text>
      <FlatList
        data={activityData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
    color: '#333',
    textAlign: 'center',
  },
  list: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    overflow: 'hidden',
  },
  imageContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    lineHeight: 20,
  },
  extraDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#888',
  },
});

export default ActivityScreen;
