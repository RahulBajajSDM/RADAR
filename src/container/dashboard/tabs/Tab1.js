/*
 * @file: Bot.js
 * @date: 18.Feb.2019
 * @author: Amit Singh Phartiyal
 * */
import React from "react";
import { View, StyleSheet } from "react-native";

import { connect } from "react-redux";

class Tab1 extends React.Component {
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
)(Tab1);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
