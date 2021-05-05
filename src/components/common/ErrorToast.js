/*
Name : Suraj Sanwal 
File Name : ErrorToast.js
Description : Contains the header for auth screens.
Date : 12 Sept 2018
*/

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";

const ErrorToast = ({ error }) => (
  <View style={Styles.container}>
    <View style={Styles.tringle}></View>
    <View style={Styles.errorTextView}>
      <Text style={Styles.ErrorText}>{error}</Text>
    </View>
  </View>
);

export default ErrorToast;

const Styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 0,
    top: moderateScale(35),
    flexDirection: "column",
    zIndex: 999
  },
  tringle: {
    flex: 0.5,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  errorTextView: {
    padding: moderateScale(2),
    maxWidth: 280,
    borderTopColor: Constants.Colors.Red,
    borderTopWidth: 2,
    backgroundColor: "rgba(0,0,0,.85)"
  },
  ErrorText: {
    padding: moderateScale(2),
    color: Constants.Colors.White
  }
});
