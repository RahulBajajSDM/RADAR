/*
 * @file: SignIn.js
 * @description: Contains the SignIn Container.
 * @date: 9.Oct.2018
 * @author: Parshant Nagpal
 * */
import React, { Component } from "react";
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
import { View, Text, StyleSheet, Platform, Keyboard } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Icon from "../../components/common/Icon";

import Constants from "../../constants";
import * as AppAction from "../../actions";
import FloatingInput from "../../components/common/FloatingInput";

import { moderateScale } from "../../helpers/ResponsiveFonts";
import AuthButton from "../../components/common/AuthButton";
import { resetPassword } from "../../actions/auth/loginActions";
import { pop } from "../../actions";

class ConfirmPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
      emailError: "",
      token: "",
      tokenError: "",
      passwordErrror: "",
      newPassword: "",
      confirmPasswordErrror: "",
      confirmPassword: "",
      token: "",
      hidePassword: true
    };
  }

  showPassword = () => {
    this.setState({
      hidePassword: !this.state.hidePassword
    });
  };

  hitconfirmPassword = () => {
    Keyboard.dismiss();
    let { email, token, newPassword, confirmPassword } = this.state;

    if (!token) {
      this.setState({ tokenError: "Token should not be empty" });
      return;
    }

    if (!newPassword) {
      this.setState({ passwordErrror: "Password should not be empty" });
      return;
    }

    if (!confirmPassword) {
      this.setState({
        confirmPasswordErrror: "Confirm Password should not be empty"
      });
      return;
    }
    if (confirmPassword !== newPassword) {
      this.setState({
        confirmPasswordErrror: "Confirm Password should be same"
      });
      return;
    }

    this.props.resetPassword(
      {
        email,
        token,
        password: newPassword
      },
      this.props.componentId
    );
  };

  focusNext(next) {
    this[next].focus();
  }
  backPress = () => {
    this.props.pop(this.props.componentId);
  };
  render() {
    let {
      token,
      tokenError,
      passwordErrror,
      newPassword,
      hidePassword,
      confirmPassword,
      confirmPasswordErrror
    } = this.state;
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={"handled"}
          style={styles.scrollStyle}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
        >
          <View style={styles.signInView}>
            {/* <Text style={styles.signInText}>Confirm Password</Text> */}
          </View>
          <View style={{ flex: 1 }}>
            <FloatingInput
              ref={ref => (this.email = ref)}
              inputWrapper={styles.inputWrapper}
              label={"Reset Code"}
              value={token}
              onChangeText={token => {
                this.setState({ token, tokenError: "" });
              }}
              keyboardType={"default"}
              returnKey={"next"}
              error={tokenError}
            />
            <FloatingInput
              ref={ref => (this.email = ref)}
              inputWrapper={styles.inputWrapper}
              label={"New Password"}
              value={newPassword}
              onChangeText={newPassword => {
                this.setState({ newPassword, passwordErrror: "" });
              }}
              icon={
                <Icon name={!hidePassword ? "eye" : "eye-slash"} size={20} />
              }
              keyboardType={"default"}
              secureTextEntry={hidePassword}
              onIconPress={this.showPassword}
              returnKey={"next"}
              error={passwordErrror}
            />

            <FloatingInput
              ref={ref => (this.email = ref)}
              inputWrapper={styles.inputWrapper}
              label={"Confirm Password"}
              value={confirmPassword}
              onChangeText={confirmPassword => {
                this.setState({ confirmPassword, confirmPasswordErrror: "" });
              }}
              icon={
                <Icon name={!hidePassword ? "eye" : "eye-slash"} size={20} />
              }
              keyboardType={"default"}
              secureTextEntry={hidePassword}
              onIconPress={this.showPassword}
              returnKey={"next"}
              error={confirmPasswordErrror}
            />

            <AuthButton
              buttonName={"Reset Password"}
              textStyle={styles.textStyle}
              buttonStyle={styles.signUpButtonStyle}
              gradientStyle={styles.gradientStyle}
              onPress={this.hitconfirmPassword}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  app: state.app
});
const mapDispatchToProps = {
  resetPassword,
  pop
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmPassword);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Constants.Colors.AuthYellow },
  scrollStyle: { paddingHorizontal: moderateScale(20) },

  signInText: {
    fontSize: moderateScale(28),
    color: Constants.Colors.Black,
    fontWeight: Platform.OS == "ios" ? "bold" : "normal",
    fontFamily: "Cochin-Bold"
  },
  forgotButton: {
    paddingTop: moderateScale(5),
    paddingBottom: moderateScale(20)
  },
  signInInSubContainerText: {
    color: Constants.Colors.SignInBlack,
    fontFamily: "Charter",
    fontSize: moderateScale(20)
  },
  signInView: {
    justifyContent: "center",
    alignItems: "center",
    padding: moderateScale(30)
  },
  inputWrapper: {
    // borderBottomWidth: moderateScale(1),
    marginTop: moderateScale(20),
    // borderBottomColor: Constants.Colors.Gray,
    fontFamily: "Charter",
    height: moderateScale(48)
  },

  forgotText: {
    color: Constants.Colors.Gray,
    fontSize: moderateScale(20),
    fontFamily: "Helvetica",
    fontWeight: "bold"
  },
  forgotTextBlack: {
    fontSize: moderateScale(19),
    color: Constants.Colors.Gray,
    paddingHorizontal: moderateScale(5),
    fontFamily: "Helvetica",
    textAlign: "center",
    fontWeight: "normal"
  },

  signUpButtonStyle: {
    width: moderateScale(160),
    height: moderateScale(40),
    marginTop: moderateScale(40),
    alignSelf: "center",
    backgroundColor: "red"
  },

  gradientStyle: {
    borderRadius: moderateScale(20)
  },
  textStyle: {
    textAlign: "center",
    fontFamily: "Charter",
    fontWeight: "bold",
    fontSize: moderateScale(18)
  }
});
