/*
 * @file: SignIn.js
 * @description: Contains the SignIn Container.
 * @date: 9.Oct.2018
 * @author: Suraj Sanwal
 * */

import React, { Component } from "react";
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
import { View, Text, StyleSheet, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import _ from "lodash";
import Regex from "../../helpers/Regex";
import Constants from "../../constants";
import * as AppAction from "../../actions";
import FloatingInput from "../../components/common/FloatingInput";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import AuthButton from "../../components/common/AuthButton";
import { forgotPassword } from "../../actions/auth/loginActions";
import { pushToParticularScreen } from "../../actions";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      hidePassword: true,
      emailError: ""
    };
  }

  showPassword = () => {
    this.setState({
      hidePassword: !this.state.hidePassword
    });
  };

  forgotPassword = () => {
    const { email } = this.state;
    if (_.isEmpty(email.trim())) {
      this.setState({
        emailError: "Email is required"
      });
      return;
    }

    if (!Regex.validateEmail(email.trim())) {
      this.setState({
        emailError: "Invalid Email format"
      });
      return;
    }
    // alert("Under Development");
    // this.pushToParticularScreen("EnterOtpScreen",false)
    this.props.forgotPassword({ email }, this.props.componentId, _ => {
      this.pushToResetPassword();
    });
  };

  pushToResetPassword() {
    //this.props.appActions.tabSelect("BottomTabsId", 3);
    let { email } = this.state;
    this.props.pushToParticularScreen(
      this.props.componentId,
      "ConfirmPassword",
      {
        email
      }
    );

    this.closeToggle();
  }

  focusNext(next) {
    this[next].focus();
  }
  backPress = () => {
    this.props.AppAction.pop(this.props.componentId);
  };
  render() {
    let { email, emailError } = this.state;
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
            {/* <Text style={styles.signInText}>Forgot Password</Text> */}
          </View>
          <View style={styles.forgotView}>
            <Text style={styles.forgotTextBlack} numberOfLines={2}>
              Please enter your e-mail and we will send a verification code.
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <FloatingInput
              ref={ref => (this.email = ref)}
              inputWrapper={styles.inputWrapper}
              label={"E-mail"}
              autoCapitalize={"none"}
              value={email}
              onChangeText={email => {
                this.setState({ email, emailError: "" });
              }}
              onSubmitEditing={() => {
                this.forgotPassword();
              }}
              keyboardType={"email-address"}
              returnKey={"next"}
              error={emailError}
            />
            <AuthButton
              buttonName={"Forgot Password"}
              buttonStyle={styles.signUpButtonStyle}
              textStyle={styles.textStyle}
              gradientStyle={styles.gradientStyle}
              onPress={this.forgotPassword}
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
  forgotPassword,
  pushToParticularScreen
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);

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
    fontSize: moderateScale(28),
    color: Constants.Colors.Black,
    fontWeight: Platform.OS == "ios" ? "bold" : "normal",
    fontFamily: "Cochin-Bold"
  },
  signInInSubContainerText: {
    color: Constants.Colors.SignInBlack,
    fontFamily: "Charter",
    fontSize: moderateScale(20)
  },
  signInView: {
    justifyContent: "center",
    alignItems: "center",
    padding: moderateScale(35)
  },
  inputWrapper: {
    // borderBottomWidth: moderateScale(1),
    marginTop: moderateScale(20),
    // borderBottomColor: Constants.Colors.Gray,
    fontFamily: "Charter",
    height: moderateScale(48)
  },

  signUpButtonStyle: {
    width: moderateScale(170),
    marginTop: moderateScale(30),
    alignSelf: "center",
    backgroundColor: "red",
    height: moderateScale(40)
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
    fontWeight: "normal"
  }
});
