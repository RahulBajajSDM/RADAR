/*
File Name : MaterialInput.js
Description : Contains the header for auth screens.
Date : 24 Aug 2020
*/

import React, { Component } from "react";
import {
  View,
  TextInput,
  // Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Platform
} from "react-native";
import PropsTypes from "prop-types";
import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import Icon from "./Icon";
import {
  TextField,
  FilledTextField,
  OutlinedTextField
} from "react-native-material-textfield";

class MaterialInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      value: this.props.value
    };
  }

  handleFocus = () => {
    this.setState({ isFocused: true });
  };
  handleBlur = () => {
    this.setState({ isFocused: false });
  };
  focus() {
    this.inputBox.focus();
  }

  clear() {
    this.inputBox.clear();
  }

  value() {
    return this.inputBox.value();
  }

  isFocused() {
    return this.state.isFocused;
  }

  setValue(value) {
    this.inputBox.setValue(value);
  }

  render() {
    const {
      label,
      value,
      value1,
      editable,
      onCancel,
      onUpdate,
      loading,
      returnKey,
      icon,
      onIconPress,
      secureTextEntry,
      onChangeText,
      onSubmitEditing,
      container,
      error,
      inputWrapper,
      inputStyle,
      autoFocus,
      tintColor,
      keyboardType,
      baseColor,
      textColor,
      formatText,
      renderLeftAccessory,
      outlinedTextField,
      multiline,
      numberOfLines,
      maxLength,
      row,
      disabledLineWidth,
      activeLineWidth,
      isTextArea,
      lineWidth,
      selectionColor,
      defaultValue,
      ...props
    } = this.props;
    const { isFocused } = this.state;

    return (
      <View style={[Styles.container, container]}>
        {outlinedTextField ? (
          <OutlinedTextField
            ref={ref => (this.inputBox = ref)}
            style={[
              Styles.inputStyle,
              {
                // maxHeight: isTextArea ? moderateScale(100) :  moderateScale(48)
                paddingRight: icon ? moderateScale(50) : moderateScale(10)
              },
              inputStyle
            ]}
            defaultValue={defaultValue}
            inputContainerStyle={{ borderColor: 2 }}
            autoFocus={autoFocus}
            labelTextStyle={{ fontFamily: Constants.Fonts.MontserratRegular }}
            affixTextStyle={{ fontFamily: Constants.Fonts.MontserratRegular }}
            titleTextStyle={{ fontFamily: Constants.Fonts.MontserratRegular }}
            onFocus={this.handleFocus}
            maxLength={maxLength}
            //containerStyle={{paddingBottom: moderateScale(5)}}
            onBlur={this.handleBlur}
            useNativeDriver={true}
            value={value}
            // row={row}
            //numberOfLines={numberOfLines}
            lineWidth={2}
            activeLineWidth={activeLineWidth}
            disabledLineWidth={disabledLineWidth}
            errorColor={Constants.Colors.Red}
            multiline={multiline}
            renderLeftAccessory={() =>
              renderLeftAccessory ? renderLeftAccessory(isFocused) : null
            }
            tintColor={tintColor ? tintColor : Constants.Colors.Black}
            baseColor={baseColor ? baseColor : Constants.Colors.Gray}
            textColor={textColor ? textColor : Constants.Colors.Black}
            error={error}
            editable={editable}
            returnKeyType={returnKey}
            lineWidth={lineWidth}
            label={label}
            selectionColor={selectionColor}
            useNativeDriver
            secureTextEntry={secureTextEntry}
            formatText={formatText}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            onSubmitEditing={onSubmitEditing}
            {...props}
          />
        ) : (
          <TextField
            ref={ref => (this.inputBox = ref)}
            style={[
              Styles.inputStyle,
              {
                // height: isTextArea ? moderateScale(100) :  moderateScale(48)
                paddingRight: icon ? moderateScale(30) : moderateScale(10)
              },
              inputStyle
            ]}
            useNativeDriver
            defaultValue={defaultValue}
            inputContainerStyle={{ borderColor: 2 }}
            autoFocus={autoFocus}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            maxLength={maxLength}
            //row={row}
            labelTextStyle={{ fontFamily: Constants.Fonts.MontserratRegular }}
            affixTextStyle={{ fontFamily: Constants.Fonts.MontserratRegular }}
            titleTextStyle={{ fontFamily: Constants.Fonts.MontserratRegular }}
            value={value}
            //multiline={multiline}
            //numberOfLines={numberOfLines}
            renderLeftAccessory={() =>
              renderLeftAccessory ? renderLeftAccessory(isFocused) : null
            }
            selectionColor={selectionColor}
            tintColor={tintColor ? tintColor : Constants.Colors.Black}
            baseColor={baseColor ? baseColor : Constants.Colors.Gray}
            textColor={textColor ? textColor : Constants.Colors.Black}
            error={error}
            editable={editable}
            returnKeyType={returnKey}
            lineWidth={moderateScale(1)}
            label={label}
            secureTextEntry={secureTextEntry}
            formatText={formatText}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            onSubmitEditing={onSubmitEditing}
            {...props}
          />
        )}
        {icon ? (
          <TouchableOpacity
            style={[
              outlinedTextField ? Styles.eyeIcon : Styles.eyeIcon2,
              Styles.pad5
            ]}
            onPress={onIconPress}
          >
            {icon}
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    paddingVertical: moderateScale(10),
    position: "relative"
  },
  inputStyle: {
    fontSize: moderateScale(17),
    //padding:30,
    // paddingBottom:30,
    fontFamily: Constants.Fonts.MontserratRegular
    //marginBottom: 10,
  },
  inputWrapper: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cancelImg: {
    backgroundColor: "#A9AFAF",
    width: 30,
    height: 30,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  submitImg: {
    backgroundColor: "#F6CF65",
    width: 30,
    height: 30,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  eyeIcon: {
    position: "absolute",
    right: 25,
    top: 25,
    zIndex: 99,
    tintColor: Constants.Colors.White
  },
  eyeIcon2: {
    position: "absolute",
    right: 25,
    top: 40,
    zIndex: 99,
    tintColor: Constants.Colors.White
  },
  pad5: { padding: 5 }
});

// /*
// PropsTypes defined for Button
// */
// MaterialInput.propsTypes = {
//   container: PropsTypes.object,
//   inputWrapper: PropsTypes.object,
//   autoFocus: PropsTypes.bool,
//   keyboardType: PropsTypes.string,
// };
// /*
// Default props from Button
// */
// MaterialInput.defaultProps = {
//   container: {},
//   inputWrapper: {},
//   autoFocus: false,
//   keyboardType: "default",
// };

export default MaterialInput;
