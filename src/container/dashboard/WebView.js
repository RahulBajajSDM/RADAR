/*
Name : Parshant Nagpal
Filename : WebView.js
Description : "Contains the webView file"
*/
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import WebView from "react-native-webview";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Constants from "../../constants";
import * as AppAction from "../../actions";
import HTML from "react-native-render-html";
import MyActivityIndicator from "../../components/common/MyActivityIndicator";
import Header from "../../components/common/Header";
import { Navigation } from "react-native-navigation";
import constants from "../../constants";

class WebViewComp extends React.Component {
  state = {
    web_content: null,
  };
  async componentDidMount() {
    console.log("props of WebView", this.props);
    let content = await this.props.AppAction.getContent(this.props.uri);
    console.log(content);
    if (content != false) {
      this.setState({
        web_content: content.description,
      });
    }
  }

  render() {
    let { uri, loader, componentId, type } = this.props;
    // console.log(this.state.web_content);
    let { web_content } = this.state;
    return (
      <View style={styles.container}>
        <Header
          title={
            type == 1
              ? "Privacy policy"
              : type == 0
              ? "FAQS"
              : "Terms of Service"
          }
          hideBack={false}
          hideDrawer={true}
          onBackPress={() => Navigation.pop(componentId)}
          color={constants.Colors.AuthYellow}
        />
        {loader && <MyActivityIndicator size="large" />}
        {/* <WebView source={{ uri }} /> */}
        {web_content != null ? (
          <ScrollView style={{ flex: 1, paddingHorizontal: "5%" }}>
            <HTML source={{ html: web_content }} />
          </ScrollView>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
const mapStateToProps = (state) => ({
  user: state.user,
  app: state.app,
  loader: state.loader.contentLoader,
});
const mapDispatchToProps = (dispatch) => ({
  AppAction: bindActionCreators(AppAction, dispatch),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WebViewComp);
