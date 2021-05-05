/*
 * @file: SignIn.js
 * @description: Contains the SignIn Container.
 * @date: 9.Oct.2018
 * @author: Suraj Sanwal
 * */
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Text, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//import _ from "lodash";
import Icon from "../../components/common/Icon";

//import Regex from "../../helpers/Regex";
import Constants from "../../constants";
import * as AppAction from "../../actions";
import FloatingInput from "../../components/common/FloatingInput";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import AuthButton from "../../components/common/AuthButton";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //email: "",
      password: "",
      hidePassword: true
      //emailError: ""
    };
  }

  // showPassword = () => {
  //   this.setState({
  //     hidePassword: !this.state.hidePassword
  //   });
  // };

  // forgotPassword = () => {
  //   const { email } = this.state;
  //   if (_.isEmpty(email.trim())) {
  //     this.setState({
  //       emailError: "Email is required"
  //     });
  //     return;
  //   }

  //   if (!Regex.validateEmail(email.trim())) {
  //     this.setState({
  //       emailError: "Invalid Email format"
  //     });
  //     return;
  //   }
  //   alert("Under Development");
  // };
  focusNext(next) {
    this[next].focus();
  }
  backPress = () => {
    this.props.AppAction.pop(this.props.componentId);
  };
  render() {
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
            <Text style={{ ...styles.signInText, color: "black" }}>
              Change Password
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <FloatingInput
              ref={ref => (this.password = ref)}
              inputWrapper={styles.inputWrapper}
              label={"Old Password"}
              autoCapitalize={"none"}
              // value={password}
              // onChangeText={}
              icon={
                //  <Icon name={!hidePassword ? "eye" : "eye-slash"} size={20} />
                <Icon name={"eye"} size={20} />
              }
              // secureTextEntry={hidePassword}
              //onIconPress={this.showPassword}
              returnKey={"next"}

              //error={passwordError}
            />

            <FloatingInput
              ref={ref => (this.password = ref)}
              inputWrapper={styles.inputWrapper}
              label={"New Password"}
              autoCapitalize={"none"}
              // value={password}
              // onChangeText={}
              icon={
                //  <Icon name={!hidePassword ? "eye" : "eye-slash"} size={20} />
                <Icon name={"eye"} size={20} />
              }
              // secureTextEntry={hidePassword}
              //onIconPress={this.showPassword}
              returnKey={"next"}

              //error={passwordError}
            />
            <AuthButton
              buttonName={"Change Password"}
              gradientStyle={styles.gradientStyle}
              // onPress={this.forgotPassword}
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
const mapDispatchToProps = dispatch => ({
  AppAction: bindActionCreators(AppAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Constants.Colors.AuthYellow },
  scrollStyle: { paddingHorizontal: moderateScale(20) },
  forgotView: { justifyContent: "flex-start", alignItems: "flex-start" },
  signUpView: { justifyContent: "center", alignItems: "center" },

  inputWrapper: {
    // borderBottomWidth: 1,
    // borderBottomColor: Constants.Colors.Black,
    height: moderateScale(50)
  },
  signUpButton: {
    margin: moderateScale(5),
    padding: moderateScale(20)
  },
  signUpText: {
    fontSize: moderateScale(20),
    color: Constants.Colors.Primary,
    fontWeight: "bold"
  },
  forgotButton: {
    paddingTop: moderateScale(5),
    paddingBottom: moderateScale(20)
  },
  signInText: {
    fontSize: moderateScale(25),
    color: Constants.Colors.Primary,
    fontWeight: "bold"
  },
  signInView: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: moderateScale(30)
  },
  forgotText: { color: Constants.Colors.Primary },
  gradientStyle: {
    borderRadius: moderateScale(15),
    top: moderateScale(30)
  }
});
