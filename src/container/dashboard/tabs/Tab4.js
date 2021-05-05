/*
 * @file: Home.js
 * @description: Contains the Ooz Challenge Container.
 * @date: 2.May.2019
 * @author: Parshant Nagpal
 * */

import React from "react";
import { View, StyleSheet } from "react-native";

import { connect } from "react-redux";

class Tab4 extends React.Component {
  render() {
    return <View style={styles.container}></View>;
  }
}

// function mapStateToProps(state) {
//   return {};
// }
// const mapDispatchToProps = dispatch => {
//   return {};
// };
export default connect(
  null,
  null
)(Tab4);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
