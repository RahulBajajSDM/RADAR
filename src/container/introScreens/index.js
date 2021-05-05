import React, { Component } from "react";
import { View, StyleSheet, Text, Platform } from "react-native";

import * as AppAction from "../../actions";
import AppIntroSlider from "react-native-app-intro-slider";
import { connect } from "react-redux";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import { bindActionCreators } from "redux";

import Constants from "../../constants";
import CustomButton from "../../components/common/CustomButton";

import IntroView from "./IntroView";

const slides = [
  {
    key: "welcome"
  },
  {
    key: "about"
  },
  {
    key: "learning"
  },
  {
    key: "developer"
  },
  {
    key: "privacyPolicy"
  }
];

const SliderWrapper = props => (
  <View style={{ ...styles.container, backgroundColor: props.bgColor }}>
    {/* <SafeView /> */}

    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.83 }}>{props.children}</View>
      <View style={{ alignItems: "center" }}>
        <CustomButton
          onPress={() => {
            props.onButtonPress();
          }}
          style={styles.CustomButton}
        >
          <View style={styles.ButtonContainerStartHere}>
            <Text style={styles.textContainer}>{props.buttonName}</Text>
            {/* <IconRight
                  name="arrow-right"
                  style={{ alignSelf: "center", marginLeft: moderateScale(5) }}
                  color={Constants.Colors.Black}
                  size={moderateScale(25)}
                /> */}
          </View>
        </CustomButton>

        {props.SignInbuttonFirstName && (
          <CustomButton
            onPress={() => {
              props.secondButtonPress();
            }}
            style={styles.CustomButton2}
          >
            <View style={styles.CustomButton2}>
              <Text style={styles.SignInbuttonFirstName}>
                {props.SignInbuttonFirstName}
              </Text>
            </View>
          </CustomButton>
        )}
      </View>
    </View>
  </View>
);

class AppIntro extends Component {
  constructor(props) {
    super(props);
  }

  goToSlide = page => {
    this.appSlider && this.appSlider.goToSlide(page);
  };

  goToSignUp = page => {
    this.props.AppAction.isIntroScreensWatched();
    this.props.AppAction.pushToParticularScreen(this.props.componentId, page);
  };

  _renderItem = props => {
    if (props.key === "welcome") {
      return (
        <SliderWrapper
          title={props.key}
          bgColor={Constants.Colors.White}
          onButtonPress={() => this.goToSignUp("SignUp")}
          secondButtonPress={() => this.goToSignUp("SignIn")}
          SignInbuttonFirstName={
            Constants.Strings.IntroScreen1.SignInbuttonFirstName
          }
          SignInbuttonSignInName={
            Constants.Strings.IntroScreen1.SignInbuttonSignInName
          }
          buttonName={Constants.Strings.IntroScreen.signUp}
        >
          <IntroView
            HeaderText={Constants.Strings.IntroScreen1.HeaderText}
            subHeaderText1={Constants.Strings.IntroScreen1.SubHeadingText1}
            subHeaderText2={Constants.Strings.IntroScreen1.SubHeadingText2}
          />
        </SliderWrapper>
      );
    } else if (props.key === "about") {
      return (
        <SliderWrapper
          bgColor={Constants.Colors.White}
          title={props.key}
          secondButtonPress={() => this.goToSignUp("SignIn")}
          SignInbuttonFirstName={
            Constants.Strings.IntroScreen1.SignInbuttonFirstName
          }
          SignInbuttonSignInName={
            Constants.Strings.IntroScreen1.SignInbuttonSignInName
          }
          onButtonPress={() => this.goToSignUp("SignUp")}
          buttonName={Constants.Strings.IntroScreen.signUp}
        >
          <IntroView
            ImageName={Constants.Strings.IntroScreen2.ImageName}
            HeaderText={Constants.Strings.IntroScreen2.HeaderText}
            subHeaderText1={Constants.Strings.IntroScreen2.SubHeadingText1}
            subHeaderText2={Constants.Strings.IntroScreen2.SubHeadingText2}
          />
        </SliderWrapper>
      );
    } else if (props.key === "learning") {
      return (
        <SliderWrapper
          bgColor={Constants.Colors.White}
          title={props.key}
          secondButtonPress={() => this.goToSignUp("SignIn")}
          SignInbuttonFirstName={
            Constants.Strings.IntroScreen1.SignInbuttonFirstName
          }
          SignInbuttonSignInName={
            Constants.Strings.IntroScreen1.SignInbuttonSignInName
          }
          onButtonPress={() => this.goToSignUp("SignUp")}
          buttonName={Constants.Strings.IntroScreen.signUp}
        >
          <IntroView
            ImageName={Constants.Strings.IntroScreen3.ImageName}
            tickText={Constants.Strings.IntroScreen3.ImageName}
            HeaderText={Constants.Strings.IntroScreen3.HeaderText}
            subHeaderText1={Constants.Strings.IntroScreen3.SubHeadingText1}
            subHeaderText2={Constants.Strings.IntroScreen3.SubHeadingText2}
          />
        </SliderWrapper>
      );
    } else if (props.key === "developer") {
      return (
        <SliderWrapper
          bgColor={Constants.Colors.White}
          title={props.key}
          secondButtonPress={() => this.goToSignUp("SignIn")}
          SignInbuttonFirstName={
            Constants.Strings.IntroScreen1.SignInbuttonFirstName
          }
          SignInbuttonSignInName={
            Constants.Strings.IntroScreen1.SignInbuttonSignInName
          }
          onButtonPress={() => this.goToSignUp("SignUp")}
          buttonName={Constants.Strings.IntroScreen.signUp}
        >
          <IntroView
            ImageName={Constants.Strings.IntroScreen4.ImageName}
            tickText={Constants.Strings.IntroScreen4.ImageName}
            HeaderText={Constants.Strings.IntroScreen4.HeaderText}
            subHeaderText1={Constants.Strings.IntroScreen4.SubHeadingText1}
            subHeaderText2={Constants.Strings.IntroScreen4.SubHeadingText2}
          />
        </SliderWrapper>
      );
    } else {
      return (
        <SliderWrapper
          bgColor={Constants.Colors.White}
          title={props.key}
          secondButtonPress={() => this.goToSignUp("SignIn")}
          SignInbuttonFirstName={
            Constants.Strings.IntroScreen1.SignInbuttonFirstName
          }
          SignInbuttonSignInName={
            Constants.Strings.IntroScreen1.SignInbuttonSignInName
          }
          onButtonPress={() => this.goToSignUp("SignUp")}
          buttonName={Constants.Strings.IntroScreen.signUp}
        >
          <IntroView
            ImageName={Constants.Strings.IntroScreen5.ImageName}
            tickText={Constants.Strings.IntroScreen5.ImageName}
            HeaderText={Constants.Strings.IntroScreen5.HeaderText}
            subHeaderText1={Constants.Strings.IntroScreen5.SubHeadingText1}
            subHeaderText2={Constants.Strings.IntroScreen5.SubHeadingText2}
          />
        </SliderWrapper>
      );
    }
  };
  render() {
    return (
      <AppIntroSlider
        ref={ref => (this.appSlider = ref || "appSlider")}
        slides={slides}
        renderItem={this._renderItem}
        paginationContainer={{
          bottom:
            Platform.OS == "android"
              ? Constants.BaseStyle.DEVICE_HEIGHT > 800
                ? Constants.BaseStyle.DEVICE_HEIGHT * 0.95
                : Constants.BaseStyle.DEVICE_HEIGHT * 0.9
              : Constants.BaseStyle.DEVICE_HEIGHT > 700
              ? Constants.BaseStyle.DEVICE_HEIGHT * 0.92
              : Constants.BaseStyle.DEVICE_HEIGHT * 0.91
        }}
        showSkipButton={false}
        hideNextButton={true}
        hideDoneButton={true}
        hidePagination={false}
        activeDotStyle={{ backgroundColor: Constants.Colors.DotRed }}
        dotStyle={{ backgroundColor: Constants.Colors.InActiveDotRed }}
      />
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
)(AppIntro);

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradientStyle: {
    borderRadius: moderateScale(15),
    marginHorizontal: moderateScale(20)
  },
  imageBackground: {
    // width: null,
    // height: null,
    // flex: 1
    width: Constants.BaseStyle.DEVICE_WIDTH,
    height: Constants.BaseStyle.DEVICE_HEIGHT
    // width: '100%',
    // height: '100%',
    // // flex: 1
    // paddingBottom: 20
    // justifyContent: "center",
    // alignItems: "center"
  },
  SignInbuttonFirstName: {
    fontSize: moderateScale(13),
    color: Constants.Colors.White,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Charter"
  },
  SignInbuttonSignInName: {
    fontSize: moderateScale(17),
    fontWeight: "500",
    color: Constants.Colors.White,
    textAlign: "center"
  },
  // textStyle: {
  //   textAlign: "center",
  //   color: Constants.Colors.Black,
  // },
  textStyle: {
    fontSize: moderateScale(16),
    margin: moderateScale(10),
    fontWeight: "500",
    color: Constants.Colors.White,
    textAlign: "center"
  },
  signUpButtonStyle: {
    width: moderateScale(150),
    backgroundColor: Constants.Colors.White
  },
  buttonStyle: {
    width: Constants.BaseStyle.DEVICE_WIDTH * 0.3,
    borderRadius: moderateScale(10),
    backgroundColor: Constants.Colors.navyButtonColor
  },
  CustomButton: {
    width: moderateScale(100)
  },
  ButtonContainerStartHere: {
    backgroundColor: Constants.Colors.White,
    borderColor: Constants.Colors.Black,
    width: moderateScale(150),
    height:
      Constants.BaseStyle.DEVICE_WIDTH > 350 &&
      Constants.BaseStyle.DEVICE_HEIGHT < 600
        ? moderateScale(37)
        : moderateScale(40),
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: moderateScale(1.5),
    borderRadius: moderateScale(30),
    ...(Constants.BaseStyle.DEVICE_WIDTH > 350 &&
      Constants.BaseStyle.DEVICE_HEIGHT < 600 && {
        marginTop: moderateScale(20)
      })
  },
  textContainer: {
    fontSize: moderateScale(16),
    color: Constants.Colors.Black,
    alignSelf: "center",
    fontWeight: "bold",
    fontFamily: "Charter"
  },
  CustomButton2: {
    marginTop: moderateScale(5),
    width: moderateScale(150),
    height:
      Constants.BaseStyle.DEVICE_WIDTH > 350 &&
      Constants.BaseStyle.DEVICE_HEIGHT < 600
        ? moderateScale(37)
        : moderateScale(40),
    backgroundColor: Constants.Colors.NavyBlueColor,
    borderRadius: moderateScale(30),
    borderColor: Constants.Colors.Black,
    borderWidth: moderateScale(1.5)
  }
});
