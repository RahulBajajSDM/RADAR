import React from "react";
import { View, Modal, StyleSheet, ActivityIndicator } from "react-native";
import Constants from "../../constants";

const MyActivityIndicator = props => {
  let { size } = props;
  return (
    <Modal animationType="none" transparent={true} visible={true}>
      <View style={styles.container}>
        <ActivityIndicator size={size} color={Constants.Colors.PastelBlue} />
      </View>
    </Modal>
  );
};

export default MyActivityIndicator;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    justifyContent: "center"
  },
  indicatorStyle: {
    flex: 1,
    position: "absolute",
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    justifyContent: "center",
    alignItems: "center"
  }
});
