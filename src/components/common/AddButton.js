/*
Name : Suraj Sanwal 
File Name : AddButton.js
Description : Contains the add button.
Date : 19 Nov 2018
*/

import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";
const AddButton = props => {
  let { buttonStyle, onPress } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[Styles.buttonStyle, buttonStyle]}
    >
      <Image
        source={Constants.Images.Common.YellowAccept}
        style={Styles.imgStyle}
      />
    </TouchableOpacity>
  );
};

export default AddButton;
const Styles = StyleSheet.create({
  buttonStyle: {
    position: "absolute",
    backgroundColor: "black",
    height: moderateScale(50),
    width: moderateScale(50),
    borderRadius: moderateScale(100),
    bottom: Constants.BaseStyle.DEVICE_WIDTH / 1.7,
    right: moderateScale(20),
    zIndex: 99,
    alignItems: "center",
    justifyContent: "center"
  },
  imgStyle: {
    height: moderateScale(25),
    width: moderateScale(25)
  }
});
