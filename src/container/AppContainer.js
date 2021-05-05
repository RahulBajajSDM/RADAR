/*
 * @file: Loader.js
 * @description: Contains the Loader Container.
 * @date: 9.Oct.2018
 * @author: Suraj Sanwal
 * */

import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default class AppContainer extends React.Component {
  componentWillUnmount() {}

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Loading</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 28
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
