/*
Name : Suraj Sanwal 
File Name : FloatingInput.js
Description : Contains the header for auth screens.
Date : 12 Sept 2018
*/

import React, { Component } from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Platform
  // Animated
} from "react-native";
import { TextField } from "react-native-material-textfield";
import PropsTypes from "prop-types";
import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import Icon from "./Icon";

import ErrorToast from "./ErrorToast";

class FloatingInput extends Component {
  constructor(props) {
    super(props);
    // this.position = new Animated.Value(this.props.value ? 1 : 0);
    this.state = {
      isFocused: this.props.value ? true : false,
      value: this.props.value
    };
  }

  componentDidMount() {}

  UNSAFE_componentWillReceiveProps(prevProps, nextProps) {
    if (prevProps.error !== nextProps.error) {
      this.toolTip && this.toolTip.openModal();
    }
  }
  _returnAnimatedTitleStyles = () => {
    const { isFocused } = this.state;
    const {
      titleActiveColor,
      titleInactiveColor,
      titleActiveSize,
      titleInActiveSize
    } = this.props;

    return {
      top:
        this.position &&
        this.position.interpolate({
          inputRange: [0, 1],
          outputRange: [14, -10]
        }),
      fontSize: isFocused ? 13 : 15,
      color: isFocused
        ? Constants.Colors.Placehoder
        : Constants.Colors.Placehoder
    };
  };
  handleFocus = () => {
    if (!this.state.isFocused) {
      this.toolTip && this.toolTip.hideModal();

      this.setState({ isFocused: true });
      // Animated.timing(this.position, {
      //   toValue: 1,
      //   duration: 150,
      // }).start();
    }
  };
  handleBlur = () => {
    console.log(this.state.value);
    if (this.state.isFocused && !this.props.value) {
      this.toolTip && this.toolTip.hideModal();
      this.setState({ isFocused: false });
      // Animated.timing(this.position, {
      //   toValue: 0,
      //   duration: 150,
      // }).start();
    }
  };
  focus() {
    this.inputBox.focus();
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
      autoFocus,
      keyboardType,
      ...props
    } = this.props;
    const { isFocused } = this.state;
    // const labelStyle = {
    //   fontFamily: "Helvetica",
    //   //position: "absolute",
    //   left: 0,
    //   top:
    //     !error && !isFocused && !value ? moderateScale(20) : moderateScale(0),
    //   fontSize: !isFocused && !value ? moderateScale(17) : moderateScale(17),
    //   color: !error ? Constants.Colors.GreyShadeLight : Constants.Colors.Red
    //   // paddingVertical: isFocused ? moderateScale(5) : 0
    // };
    return (
      <View style={[Styles.container, container]}>
        {/* {error || value || isFocused ? (
          <Text style={labelStyle}>{label}</Text>
        ) : null} */}
        <View
          style={[
            Styles.inputWrapper,
            {
              borderColor: error
                ? Constants.Colors.Red
                : Constants.Colors.Primary
            },
            inputWrapper
          ]}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingRight: icon ? moderateScale(30) : moderateScale(10)
            }}
          >
            {/* <Animated.Text
              style={[Styles.titleStyles, this._returnAnimatedTitleStyles()]}
            >
              {this.props.label}
            </Animated.Text> */}
            <TextField
              containerStyle={
                (container,
                {
                  width: "100%"
                })
              }
              ref={ref => (this.inputBox = ref || "inputbox")}
              style={[
                Styles.inputStyle,
                {
                  color: editable
                    ? Constants.Colors.Primary
                    : editable === undefined
                    ? Constants.Colors.DarkGray
                    : Constants.Colors.CoolGray
                }
              ]}
              autoFocus={autoFocus}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              label={label}
              defaultValue={value}
              value={value}
              editable={
                editable ? editable : editable === undefined ? true : false
              }
              returnKeyType={returnKey}
              // placeholder={!isFocused ? label : null}
              secureTextEntry={secureTextEntry}
              onChangeText={onChangeText}
              keyboardType={keyboardType}
              onSubmitEditing={onSubmitEditing}
              {...props}
            />
            {error ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <TouchableOpacity style={Styles.pad5} onPress={onIconPress}>
                  {icon}
                </TouchableOpacity>
                <Icon
                  innerref={ref => (this.errorIcon = ref)}
                  name="exclamation-circle"
                  color={Constants.Colors.Red}
                  size={25}
                />
              </View>
            ) : null}
            {/* {error ? <ErrorToast error={error} /> : null} */}
            {!error && icon ? (
              <TouchableOpacity style={Styles.pad5} onPress={onIconPress}>
                {icon}
              </TouchableOpacity>
            ) : null}
          </View>
          {value1 !== value && editable ? (
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity style={Styles.pad5} onPress={onCancel}>
                <View style={Styles.cancelImg}>
                  <Image
                    source={Constants.Images.Common.Cancel}
                    resizeMode={"contain"}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={Styles.pad5} onPress={onUpdate}>
                <View style={Styles.submitImg}>
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Image
                      source={Constants.Images.Common.Accept}
                      resizeMode={"contain"}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        {error ? (
          <Text style={{ paddingTop: moderateScale(2), color: "red" }}>
            {error}
          </Text>
        ) : null}
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    paddingVertical: moderateScale(10)
  },
  inputStyle: {
    flex: 1,
    fontSize: moderateScale(17),
    fontFamily: "Helvetica",
    ...Platform.select({
      ios: {
        height: moderateScale(30)
      }
    })
  },
  titleStyles: {
    position: "absolute",
    fontFamily: "Helvetica",
    left: 3,
    left: 4
  },
  inputWrapper: {
    flexDirection: "row",
    justifyContent: "space-between"
    // borderWidth: 1,
    // borderColor: Constants.Colors.Secondary,
    // borderRadius: moderateScale(10),
    // paddingHorizontal: moderateScale(20)
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
  pad5: { padding: 5 }
});

/*
PropsTypes defined for Button 
*/
FloatingInput.propsTypes = {
  container: PropsTypes.object,
  inputWrapper: PropsTypes.object,
  autoFocus: PropsTypes.bool,
  keyboardType: PropsTypes.string
};
/*
Default props from Button 
*/
FloatingInput.defaultProps = {
  container: {},
  inputWrapper: {},
  autoFocus: false,
  keyboardType: "default"
};

export default FloatingInput;
