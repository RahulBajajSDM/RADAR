/*
 * @file: SignIn.js
 * @description: Contains the SignIn Container.
 * @date: 9.Oct.2018
 * @author: Suraj Sanwal
 * */
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Text, StyleSheet, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Constants from "../../constants";
import * as AppAction from "../../actions";
import FloatingInput from "../../components/common/FloatingInput";

import { moderateScale } from "../../helpers/ResponsiveFonts";
import AuthButton from "../../components/common/AuthButton";

class ConfirmPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email ? this.props.email : "",
      emailError: "",
      codeError: "",

      newPassword: "",
      verificationCode: "",
      hidePassword: true
    };
  }

  showPassword = () => {
    this.setState({
      hidePassword: !this.state.hidePassword
    });
  };

  confirmPassword = () => {
    const { verificationCode } = this.state;

    if (!verificationCode) {
      this.setState({ codeError: "Enter Verification Code" });
      return;
    }
    this.props.AppAction.pushToParticularScreen(
      this.props.componentId,
      "ConfirmPassword",
      { OTP: verificationCode, email: this.props.email }
    );
  };

  focusNext(next) {
    this[next].focus();
  }
  backPress = () => {
    this.props.AppAction.pop(this.props.componentId);
  };
  render() {
    let { codeError } = this.state;
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
            <Text style={styles.signInText}>Verification Code</Text>
          </View>
          <View style={styles.forgotView}>
            <Text style={styles.forgotTextBlack}>
              Please enter your Verification Code.
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <FloatingInput
              ref={ref => (this.email = ref)}
              inputWrapper={styles.inputWrapper}
              label={"Enter Verification Code"}
              value={this.state.verificationCode}
              onChangeText={code => {
                this.setState({ verificationCode: code });
              }}
              keyboardType={"numeric"}
              returnKey={"next"}
              error={codeError}
            />

            <AuthButton
              buttonName={"Next"}
              buttonStyle={styles.signUpButtonStyle}
              textStyle={styles.textStyle}
              paddingTop={true}
              gradientStyle={styles.gradientStyle}
              onPress={this.confirmPassword}
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
const mapDispatchToProps = dispatch => {
  return {
    forgotPassword: email => {
      dispatch(AppAction.forgotPassword(email));
    },
    confirmPassword: (email, code, password, componentId) =>
      dispatch(AppAction.confirmPassword(email, code, password, componentId)),
    AppAction: bindActionCreators(AppAction, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmPassword);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Constants.Colors.AuthYellow },
  scrollStyle: { paddingHorizontal: moderateScale(20) },
  signUpText: {
    fontSize: moderateScale(21),
    color: "gray",
    fontFamily: "Cochin",
    textAlign: "center"
  },

  forgotButton: {
    paddingTop: moderateScale(5),
    paddingBottom: moderateScale(20)
  },
  signInText: {
    fontSize: moderateScale(30),
    color: Constants.Colors.Black,
    fontWeight: Platform.OS == "ios" ? "bold" : "normal",
    fontFamily: "Cochin-Bold"
  },
  signInInSubContainerText: {
    color: Constants.Colors.SignInBlack,
    fontFamily: "Charter",
    fontSize: moderateScale(20)
  },

  inputWrapper: {
    // borderBottomWidth: moderateScale(1),
    marginTop: moderateScale(20),
    // borderBottomColor: Constants.Colors.Gray,
    fontFamily: "Charter",
    height: moderateScale(48)
  },

  signUpButtonStyle: {
    width: moderateScale(140),
    height: moderateScale(40),
    marginTop: moderateScale(20),
    alignSelf: "center"
  },

  gradientStyle: {
    borderRadius: moderateScale(20)
  },
  textStyle: {
    textAlign: "center",
    fontFamily: "Charter",
    fontWeight: "bold",
    fontSize: moderateScale(18)
  },
  signInView: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: moderateScale(30)
  },
  forgotView: { justifyContent: "center" },

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
    fontWeight: "normal",
    alignSelf: "center",
    textAlign: "center"
  }
});
