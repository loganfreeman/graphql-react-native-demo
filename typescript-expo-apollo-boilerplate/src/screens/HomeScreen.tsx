import * as React from "react";
import { StyleSheet, View } from "react-native";

import NewReservation from "../components/NewReservation";
import ReservationList from "../components/ReservationList";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1
  }
});

const HomeScreen = () => (
  <View style={styles.container}>
    <NewReservation />
    <ReservationList />
  </View>
);

HomeScreen.navigationOptions = {
  title: "Home"
};

export default HomeScreen;
