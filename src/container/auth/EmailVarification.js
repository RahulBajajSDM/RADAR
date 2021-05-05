import React, { Component } from "react";
import { View, Text, StyleSheet, Platform, Keyboard } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import * as AppAction from "../../actions";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import AuthButton from "../../components/common/AuthButton";
import Constants from "../../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SafeView from "../../components/common/SafeView";
import FloatingInput from "../../components/common/FloatingInput";
import { TouchableOpacity } from "react-native-ui-lib";

class EmailVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      codeSend: 0,
      codeError: ""
    };
    this.resendCode = this.resendCode.bind(this);
    this.resendCodeLoop = this.resendCodeLoop.bind(this);
  }

  componentDidMount() {}

  resendCodeLoop(data) {
    let context = this;
    this.setState({ codeSend: data });
    setTimeout(() => {
      data = data - 1;
      if (data >= 0) {
        context.resendCodeLoop(data);
      }
    }, 1000);
  }
  resendCode(data) {
    let { AppAction, email } = this.props;
    AppAction.resendCode(email, res => {
      if (res) {
        this.resendCodeLoop(data);
      }
    });
  }

  submitEmailVarification = () => {
    let { AppAction, password, email } = this.props;
    let { code } = this.state;
    Keyboard.dismiss();
    if (_.isEmpty(code.trim())) {
      this.setState({
        codeError: "Please enter code"
      });
      return;
    }
    AppAction.verifyUser(code, password, email);
  };

  render() {
    let { code, codeSend, codeError } = this.state;
    let {
      email,
      loader: { loginLoader }
      // user: {userData : {user : {username}}}
    } = this.props;
    return (
      <View style={styles.container}>
        <SafeView />
        <KeyboardAwareScrollView
          extraHeight={280}
          enableOnAndroid={true}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={"handled"}
        >
          <View style={{}}>
            <View style={styles.welcomeView}>
              <Text style={styles.welcomeText} numberOfLines={1}>
                {Constants.Strings.Activation}
              </Text>
            </View>
          </View>
          <View style={styles.marginHorizontal}>
            <FloatingInput
              label={"Confirmation Code"}
              keyboardType={"numeric"}
              inputWrapper={styles.inputWrapper}
              value={code}
              onChangeText={code => this.setState({ code, codeError: "" })}
              onSubmitEditing={() => {
                this.submitEmailVarification();
              }}
              returnKey={"done"}
              error={codeError}
            />
          </View>
          <View style={styles.stylesAuthContainer}>
            <AuthButton
              buttonName={!loginLoader ? "Confirm" : "Confirming..."}
              disabled={loginLoader}
              textStyle={styles.textStyle}
              buttonStyle={styles.signUpButtonStyle}
              gradientStyle={styles.gradientStyle}
              onPress={() => this.submitEmailVarification()}
            />
          </View>
          <View style={styles.stylesAuthContainer}>
            <Text style={styles.confirmationCodeText}>
              {Constants.Strings.EmailVerification.ConfimationCode}
            </Text>
          </View>
          <View style={styles.stylesAuthContainer}>
            <Text style={styles.confirmationCodeText}>{email}</Text>
          </View>
          {codeSend ? (
            <View>
              <View style={styles.confirmationCodeSent}>
                <Text
                  style={[
                    styles.confirmationCodeText,
                    styles.confirmationCodeText2
                  ]}
                >
                  {Constants.Strings.EmailVerification.ResendCode.replace(
                    "120",
                    codeSend
                  )}
                </Text>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.centerView}
              onPress={() => {
                this.resendCode(120);
              }}
            >
              <Text
                style={[styles.centerText, styles.confirmationCodeText2]}
                numberOfLines={3}
              >
                Resend confirmation code
              </Text>
            </TouchableOpacity>
          )}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  app: state.app,
  loader: state.loader
});
const mapDispatchToProps = dispatch => ({
  AppAction: bindActionCreators(AppAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailVerification);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: moderateScale(20)
    backgroundColor: Constants.Colors.AuthYellow
    // justifyContent: "space-between"
  },

  welcomeView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: moderateScale(25),
    marginHorizontal: moderateScale(13)
  },
  welcomeText: {
    fontSize: moderateScale(22),
    color: Constants.Colors.Black,
    fontWeight: Platform.OS == "ios" ? "bold" : "normal",
    fontFamily: "Cochin-Bold"
  },
  centerView: {
    justifyContent: "center",
    marginTop: moderateScale(30),
    alignItems: "center"
  },
  centerText: {
    fontSize: moderateScale(16),
    textAlign: "center",
    paddingHorizontal: moderateScale(30)
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: Constants.Colors.Gray,
    height: moderateScale(50),
    marginTop: moderateScale(25),
    backgroundColor: Constants.Colors.White,
    paddingLeft: moderateScale(10)
  },
  signUpButtonStyle: {
    width: moderateScale(200),
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
  marginHorizontal: {
    paddingHorizontal: moderateScale(20),
    marginBottom: moderateScale(18)
  },
  bottomText: {
    fontSize: moderateScale(18),
    paddingVertical: moderateScale(5),
    textAlign: "center"
  },

  confirmationCodeSent: {},
  stylesAuthContainer: { justifyContent: "center", alignItems: "center" },
  confirmationCodeText: {
    fontSize: moderateScale(16),
    marginTop: moderateScale(18),
    textAlign: "center",
    fontFamily: "Cochin",
    paddingHorizontal: moderateScale(25)
  },
  confirmationCodeText2: {
    color: Constants.Colors.NavyBlueDark,
    fontSize: moderateScale(16),

    fontFamily: "Cochin"
  }
});
