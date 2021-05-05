/* 
      *                                                            *
    *****                                                        *****                             
      *                                                            *
        ==========================================================
        ==========                                      ==========
        ==========     Page for service hit loader      ==========
        ==========                                      ==========
        ==========================================================
      *                                                            *
    *****                                                        *****   
      *                                                            *
*/

import React, { Component } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import Constants from "../../constants";
import { connect } from "react-redux";

class Loading extends Component {
  render() {
    let { loading } = this.props;
    if (!loading) {
      return null;
    }
    return (
      <View style={Styles.mainContainer}>
        <View style={Styles.innerView}>
          <ActivityIndicator size="large" color={Constants.Colors.Primary} />
        </View>
      </View>
    );
  }
}
const Styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Constants.Colors.Transparent,
    position: "absolute",
    zIndex: 9999,
    top: 0,
    left: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: Constants.BaseStyle.DEVICE_HEIGHT,
    width: "100%"
  },
  innerView: { flex: 1, justifyContent: "center", alignItems: "center" }
});
const mapStateToProps = state => ({
  loading: state.app.loading
});
export default connect(
  mapStateToProps,
  null
)(Loading);
