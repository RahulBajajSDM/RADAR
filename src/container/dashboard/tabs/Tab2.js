/*
 * @file: Home.js
 * @description: Contains the Home Page Container.
 * @date: 9.Oct.2018
 * @author: Suraj Sanwal
 * */

import React from "react";
import { View, StyleSheet } from "react-native";

import { connect } from "react-redux";

class Tab2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
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
)(Tab2);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
