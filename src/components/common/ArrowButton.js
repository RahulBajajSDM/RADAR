/*
Name : Suraj Sanwal 
File Name : ArrowButton.js
Description : Contains the arrow button.
Date : 20 Sept 2018
*/

import React from "react";
import {
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import Constants from "../../constants";

const Button = props => {
  let {
    buttonStyle,
    onPress,
    gradientColors,
    loading,
    opacity,
    disabled
  } = props;
  return (
    <TouchableOpacity
      style={[Styles.buttonContainer, buttonStyle]}
      onPress={onPress}
      activeOpacity={opacity}
      disabled={disabled}
    >
      <LinearGradient
        colors={
          gradientColors || [
            Constants.Colors.Primary,
            Constants.Colors.Secondary
          ]
        }
        style={Styles.gradientStyle}
      >
        {loading ? (
          <ActivityIndicator size="small" color={Constants.Colors.White} />
        ) : (
          <Image
            source={Constants.Images.Common.Arrow}
            resizeMode={"contain"}
          />
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Button;

const Styles = StyleSheet.create({
  buttonContainer: {
    // alignSelf: "center"
  },
  gradientStyle: {
    borderRadius: moderateScale(50),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: moderateScale(20)
  },
  buttonText: {
    ...Constants.Fonts.SemiBold,
    fontSize: moderateScale(16),
    fontWeight: "bold",
    color: Constants.Colors.Yellow,
    textAlignVertical: "center",
    paddingHorizontal: moderateScale(5)
  }
});
