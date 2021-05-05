/*
 * @file: OozChallengeButton.js
 * @description: Contains the Ooz Cloud Container.
 * @date: 3.May.2019
 * @author: Parshant Nagpal
 * */

import React from "react";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  Platform
} from "react-native";
import PropsTypes from "prop-types";

const CustomButton = props => {
  let { disabled, onPress, buttonStyle } = props;

  if (Platform.OS == "ios") {
    return (
      <TouchableOpacity
        style={buttonStyle}
        disabled={disabled}
        onPress={onPress}
      >
        {props.children}
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableNativeFeedback
        activeOpacity={0.9}
        disabled={disabled}
        onPress={onPress}
      >
        <View style={buttonStyle}>{props.children}</View>
      </TouchableNativeFeedback>
    );
  }
};
export default CustomButton;

CustomButton.propsTypes = {
  onPress: PropsTypes.func.isRequired,
  disabled: PropsTypes.bool,
  buttonStyle: PropsTypes.object
};
CustomButton.defaultProps = {
  disabled: false,
  buttonStyle: {}
};
