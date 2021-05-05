import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import Constants from "../../constants";

/*
Check for Nokia 6 and Google nexus 5
// ((Constants.BaseStyle.DEVICE_WIDTH > 350)  && (Constants.BaseStyle.DEVICE_HEIGHT < 600))
*/
const IntroView = props => {
  return (
    <View style={styles.container}>
      <View style={styles.welcomeView}>
        <Text style={styles.welcomeText}>{props.HeaderText}</Text>
      </View>
      <View style={styles.centerView}>
        <Text style={[styles.centerText, styles.centerText2]}>
          {props.subHeaderText1}
        </Text>
        <Text style={styles.centerText}>{props.subHeaderText2}</Text>
      </View>
      {props.ImageName && (
        <View style={[styles.centerView, styles.flexDirction]}>
          {/* <Image
            source={Constants.Images.IntroScreens.IntroScreensTick}
            style={styles.tickImage}
          /> */}
          <Text style={styles.centerText}>{props.ImageName}</Text>
        </View>
      )}
    </View>
  );
};

export default IntroView;

const styles = StyleSheet.create({
  container: {
    height: Constants.BaseStyle.DEVICE_HEIGHT,
    width: Constants.BaseStyle.DEVICE_WIDTH
    // paddingHorizontal: moderateScale(20)
  },
  tickImage: {
    width: moderateScale(15),
    height: moderateScale(15)
  },
  welcomeView: {
    marginVertical: moderateScale(20),
    marginTop:
      Platform.OS == "ios" && Constants.BaseStyle.DEVICE_HEIGHT > 800
        ? moderateScale(50)
        : Constants.BaseStyle.DEVICE_WIDTH > 350 &&
          Constants.BaseStyle.DEVICE_HEIGHT < 600
        ? moderateScale(10)
        : moderateScale(30),
    justifyContent: "center",
    alignItems: "center"
  },
  welcomeText: {
    fontSize: moderateScale(32),
    color: Constants.Colors.IntroBlack,
    fontWeight: Platform.OS == "ios" ? "bold" : "bold",
    // fontFamily: Platform.OS == "ios" ? 'Cochin-Bold' :  'CochinBold',
    fontFamily: "Charter",
    // fontFamily: "Cochin",
    textAlign: "center",
    width: "100%"
  },
  centerView: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "justify"
  },

  flexDirction: {
    flexDirection: "row"
  },
  centerText: {
    fontSize:
      Platform.OS == "ios" && Constants.BaseStyle.DEVICE_HEIGHT > 800
        ? moderateScale(18)
        : moderateScale(15),
    paddingVertical:
      Platform.OS == "ios" && Constants.BaseStyle.DEVICE_HEIGHT > 800
        ? moderateScale(0)
        : moderateScale(0),
    paddingHorizontal:
      Platform.OS == "ios" && Constants.BaseStyle.DEVICE_HEIGHT > 800
        ? moderateScale(10)
        : moderateScale(10),
    textAlign: "center",
    fontFamily: "Charter",
    color: Constants.Colors.IntroSubBlack
  },
  centerText2: {
    paddingHorizontal: 0,
    paddingVertical: 0
  },
  img: { height: moderateScale(200), width: moderateScale(200) },
  imageView: { justifyContent: "center", alignItems: "center", flex: 1 }
});
