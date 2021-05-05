/**
Author: Gurtej Singh
Date 28th march 2018
purpose :safe view for the iPhoneX
 */

import React, { Component } from "react";
import { StyleSheet, View, StatusBar, Platform } from "react-native";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import Constants from "../../constants";

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar
      hidden
      translucent
      backgroundColor={backgroundColor}
      {...props}
    />
  </View>
);

export default class SafeView extends Component {
  render() {
    if (Platform.OS == "ios") {
      return (
        <MyStatusBar
          backgroundColor={Constants.Colors.AuthYellow}
          barStyle="light-content"
        />
      );
    } else if (Platform.OS == "android") {
      return <View style={styles.androidStyle} />;
    } else {
      return null;
    }
  }
}

const STATUSBAR_HEIGHT = Constants.BaseStyle.isIphoneX()
  ? moderateScale(30)
  : moderateScale(0);
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  statusBar: {
    height: STATUSBAR_HEIGHT
  },
  androidStyle: {
    paddingTop: moderateScale(0)
  }
});
