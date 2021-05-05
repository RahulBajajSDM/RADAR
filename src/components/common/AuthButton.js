/*
Name : Suraj Sanwal 
File Name : AuthButton.js
Description : Contains the header for auth screens.
Date : 12 Sept 2018
*/

import React from "react";
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  ActivityIndicator,
  StyleSheet
} from "react-native";
// import LinearGradient from "react-native-linear-gradient";
import PropsTypes from "prop-types";

import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";
const Button = props => {
  let {
    buttonName,
    buttonStyle,
    gradientStyle,
    textStyle,
    onPress,
    arrow,
    // gradientColors,
    loading,
    icon,
    disabled
  } = props;

  return (
    <TouchableOpacity
      style={[Styles.buttonContainer, buttonStyle]}
      onPress={onPress}
      disabled={disabled}
    >
      {/* <LinearGradient
        colors={
          gradientColors || [
            Constants.Colors.buttonColor,
            Constants.Colors.buttonColor
          ]
        }
        style={[Styles.gradientStyle, gradientStyle]}
      > */}
      <View style={[Styles.gradientStyle, gradientStyle]}>
        {loading ? (
          <ActivityIndicator size="large" color={Constants.Colors.White} />
        ) : (
          <View>
            <View style={{ flexDirection: "row" }}>
              {icon ? icon : null}
              <Text style={[Styles.buttonText, textStyle]}>{buttonName}</Text>
            </View>
            {arrow ? <Image source={Constants.Images.Common.Next} /> : null}
          </View>
        )}
      </View>
      {/* </LinearGradient> */}
      {/* <View style={{ flex: 0.7 }} /> */}
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  gradientStyle: {
    borderRadius: moderateScale(30),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: moderateScale(8)
  },
  buttonText: {
    fontFamily: "Helvetica",
    fontSize: moderateScale(14),
    fontWeight: "bold",
    color: Constants.Colors.White,
    textAlignVertical: "center",
    paddingHorizontal: moderateScale(5),
    textAlign: "center",
    width: "100%"
  }
});

/*
PropsTypes defined for Button 
*/
Button.propsTypes = {
  textStyle: PropsTypes.object
};
/*
Default props from Button 
*/
Button.defaultProps = {
  textStyle: {}
};

export default Button;
