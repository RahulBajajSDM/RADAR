import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  Linking,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as appActions from "../../actions";
import Constants from "../../constants";
// import SafeView from "../../components/common/SafeView";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import hotspots from "../../reducers/hotspots";

// import ajivarLogo from "../../assets/images/logo/logo.png";

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: true,
    };
  }

  componentDidMount() {
    this.pushToParticularScreen = this.pushToParticularScreen.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
  }
  /*
    closes the toggle
    */
  closeToggle() {
    this.props.appActions.mergeOptions(this.props.componentId, false);
  }
  pushToParticularScreen(screenName, enable, params = {}) {
    let { selectedtab } = this.props.app;
    this.closeToggle();
    console.log("selectedtabselectedtab", selectedtab);
    // this.props.appActions.tabSelect("BottomTabsId", 3);
    setTimeout(
      () => {
        this.props.appActions.pushToParticularScreenBottomTabs(
          selectedtab,
          screenName,
          params,
          enable
        );
      },
      Platform.OS == "ios" ? 0 : 200
    );
  }

  exitHotspots() {
    let {
      hotspots: { hotspotsArr },
    } = this.props;
    console.log("11", hotspots);
    console.log("22", hotspotsArr);
    hotspotsArr.forEach((hotspotVal) => {
      var hotspot = { ...hotspotVal };
      /* isEntered: true - Exit Record inserted*/
      if (hotspot.isEntered === true) {
        hotspot.isEntered = false;
        console.log("Hotspot Exited");
        this.hitEnteredExitedApi(hotspot);
      }
    });
  }

  hitEnteredExitedApi(hotspot) {
    let {
      user: { userData },
    } = this.props;
    console.log("EnterExitApi", hotspot);
    let param = {
      employeeId: userData.id,
      hotspotId: hotspot._id,
      agencyId: userData.agencyId._id,
      type: "exit",
      hotspotDetails: {
        radius: hotspot.radius,
        coordinate: hotspot.coordinate,
        name: hotspot.name,
        address: hotspot.address,
      },
      employeeDetails: {
        _id: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        userType: userData.userType,
      },
      agencyDetails: {
        _id: userData.agencyId._id,
      },
    };
    this.props.appActions.createEmployeesActivitiesApi(
      param,
      this.props.componentId,
      (fn) => {
        console.log("enterExitAPIResponse", fn);
      }
    );
  }

  onLogoutPress() {
    // this.exitHotspots();
    this.closeToggle();
    this.props.appActions.logOut();
  }
  toggleSettings() {
    let { settings } = this.state;
    this.setState({ settings: !settings });
  }
  socialIconClick = (url) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        // console.log("Don't know how to open URI: " + url);
      }
    });
  };
  render() {
    let { settings } = this.state,
      {
        user: { userData },
      } = this.props,
      menu = [
        {
          title: "Settings",
          // icon: Constants.Images.SideMenu.Forward,
          enable: true,
          marginTop: false,
          onPress: () => {},
        },
        // {
        //   title: "Settings",
        //   icon: settings ? "angle-up" : "angle-down",
        //   enable: true,
        //   marginTop: false,
        //   onPress: () => {
        //     this.toggleSettings();
        //   },
        //   subMenu: [
        //     {
        //       title: Constants.Strings.SideMenu.Settings.ChangeMyPassword,
        //       onPress: () =>
        //         this.pushToParticularScreen("ChangePassword", false),
        //     },
        //     {
        //       title: Constants.Strings.SideMenu.Settings.Logout,
        //       onPress: () => {
        //         this.onLogoutPress();
        //       },
        //     },
        //   ],
        // },
        {
          title: Constants.Strings.SideMenu.Settings.EditMyProfile,
          enable: true,
          marginTop: true,
          onPress: () => this.pushToParticularScreen("EditProfile", false),
        },

        {
          title: Constants.Strings.SideMenu.Settings.COVIDAssesment,
          enable: true,
          marginTop: true,
          onPress: () => this.pushToParticularScreen("CovidAssesment", false),
        },
        // {
        //   title: Constants.Strings.SideMenu.Settings.ChangeMyPassword,
        //   enable: true,
        //   marginTop: true,
        //   onPress: () => this.pushToParticularScreen("ChangePassword", false)
        // },
        {
          title: Constants.Strings.SideMenu.Faq,
          enable: true,
          marginTop: true,
          onPress: () => {
            console.log("I am here ---------------");
            // this.pushToParticularScreen("CovidAssesment", false);
          },
        },
        {
          title: Constants.Strings.SideMenu.privacyPolicy,
          enable: true,
          marginTop: false,
          onPress: () => {},
          // this.pushToParticularScreen("WebView", false, {
          //   uri: Constants.Url.privacyPolicy,
          // }),
        },
        {
          title: Constants.Strings.SideMenu.TermsofService,
          enable: true,
          marginTop: false,
          onPress: () => {},
          // this.pushToParticularScreen("WebView", false, {
          //   uri: Constants.Url.termsofService,
          // }),
        },
        {
          title: Constants.Strings.SideMenu.Settings.Logout,
          enable: true,
          marginTop: true,
          onPress: () => {
            this.onLogoutPress();
          },
        },
      ];
    if (userData && userData.isLocationAdmin) {
      menu.splice(1, 0, {
        title: Constants.Strings.SideMenu.Settings.AlertActivity,
        enable: true,
        marginTop: true,
        onPress: () => this.pushToParticularScreen("AlertActivity", false),
      });
    }

    return (
      <ScrollView style={Styles.sideMenuContainer} scrollEnabled>
        <View style={Styles.sideMenuSubContainer}>
          {menu.map((item, index) => {
            return (
              <View key={index}>
                <TouchableOpacity
                  style={[
                    Styles.menuBtn,
                    Styles.menuButton2,
                    {
                      borderBottomWidth:
                        item.title == "Settings" && settings ? 0 : 1,
                    },
                    index === 0 && Styles.menuButton3,
                    !item.enable && Styles.disabledItem,
                    { marginTop: item.marginTop ? 20 : 0 },
                  ]}
                  onPress={() => item.onPress()}
                  disabled={!item.enable}
                  opacity={!item.enable ? 1 : 0}
                >
                  <Text style={[Styles.menuText]}>{item.title}</Text>
                  {item.icon && (
                    <Icon
                      name={item.icon}
                      color={"black"}
                      size={Constants.BaseStyle.DEVICE_HEIGHT > 800 ? 30 : 25}
                    />
                  )}
                </TouchableOpacity>
                {settings &&
                  item &&
                  item.subMenu &&
                  item.subMenu.map((subItem, subIndex) => {
                    return (
                      <TouchableOpacity
                        style={[
                          Styles.menuBtn,
                          Styles.menuButtonSetting,
                          {
                            borderBottomWidth:
                              subIndex == item.subMenu.length - 1 ? 1 : 0,
                          },
                        ]}
                        onPress={() => subItem.onPress()}
                        key={subIndex}
                      >
                        <Text
                          style={[
                            Styles.menuText,
                            Styles.subMenuText,
                            Styles.menuSubText,
                          ]}
                        >
                          {subItem.title}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
              </View>
            );
          })}
        </View>
        <View
          style={{
            flex: 1,
            marginLeft:
              Platform.OS == "android"
                ? Constants.BaseStyle.DEVICE_WIDTH * 0.3
                : Constants.BaseStyle.DEVICE_HEIGHT > 800
                ? Constants.BaseStyle.DEVICE_WIDTH * 0.22
                : Constants.BaseStyle.DEVICE_WIDTH * 0.3,
            justifyContent: "center",
            paddingVertical: settings
              ? Constants.BaseStyle.DEVICE_HEIGHT > 800
                ? moderateScale(30)
                : 0
              : moderateScale(50),
          }}
        ></View>
      </ScrollView>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  appActions: bindActionCreators(appActions, dispatch),
});
function mapStateToProps(state) {
  return {
    user: state.user,
    app: state.app,
    loader: state.loader,
    hotspots: state.hotspots,
    AjivarGuideEnable: state.app.AjivarGuideEnable,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu);

const Styles = StyleSheet.create({
  // Side menu Component
  sideMenuContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Constants.Colors.White,
  },
  sideMenuImageContainer: {
    marginTop: Platform.OS == "ios" ? moderateScale(20) : 0,
    paddingHorizontal: moderateScale(30),
    paddingVertical: moderateScale(10),
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  profileImg: {
    height: Constants.BaseStyle.DEVICE_WIDTH * 0.3,
    width: Constants.BaseStyle.DEVICE_WIDTH * 0.3,
    borderColor: Constants.Colors.Primary,
    //borderWidth: 1,
    borderRadius: moderateScale(100),
    backgroundColor: Constants.Colors.White,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  imgAvatar: {
    height: Constants.BaseStyle.DEVICE_WIDTH * 0.3,
    width: Constants.BaseStyle.DEVICE_WIDTH * 0.3,
  },
  userInfo: {
    padding: moderateScale(5),
  },
  userName: {
    // ...Constants.Fonts.TitilliumWebBold,
    fontSize: moderateScale(22),
    color: Constants.Colors.Primary,
  },
  userEmail: {
    // ...Constants.Fonts.TitilliumWebRegular,
    fontSize: moderateScale(17),
    color: Constants.Colors.gray,
  },
  sideMenuSubContainer: {
    // paddingHorizontal: moderateScale(30),
    // paddingVertical: moderateScale(10),
    backgroundColor: Constants.Colors.White,
  },
  menuBtn: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FFF1CD",
  },
  menuButton2: {
    borderColor: Constants.Colors.fadeBorder,
    borderWidth: 1,
    paddingVertical: 10,
  },
  menuButtonSetting: {
    borderBottomColor: Constants.Colors.fadeBorder,
    borderLeftWidth: 1,
  },
  menuButton3: {
    backgroundColor: Constants.Colors.Transparent,
    borderColor: Constants.Colors.fadeBorder,
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  menuText: {
    // ...Constants.Fonts.TitilliumWebRegular,
    fontSize:
      Constants.BaseStyle.DEVICE_HEIGHT > 800
        ? moderateScale(18)
        : moderateScale(18),
    color: Constants.Colors.menuItemTxt,
    paddingHorizontal: moderateScale(30),
    paddingVertical:
      Constants.BaseStyle.DEVICE_HEIGHT > 800
        ? moderateScale(8)
        : moderateScale(0),
    fontWeight: "500",
    //  textAlign : 'center',
    // fontFamily: "Cochin",
  },
  subMenuText: {
    paddingVertical: moderateScale(3),
  },
  menuSubText: {
    fontSize: moderateScale(20),
    fontWeight: "normal",
  },
  buttonStyle: {},
  gradientStyle: { borderRadius: 0 },
  activeStatus: {
    borderColor: Constants.Colors.placehoder,
    borderWidth: 0.4,
    paddingHorizontal: moderateScale(30),
  },
  shuttleName: {
    // ...Constants.Fonts.TitilliumWebSemiBold,
    fontSize: moderateScale(21),
    color: Constants.Colors.Primary,
  },
  shuttleProvider: {
    // ...Constants.Fonts.TitilliumWebRegular,
    fontSize: moderateScale(17),
    color: Constants.Colors.placehoder,
  },
  suttleStatusBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: moderateScale(15),
  },
  activeBtn: {
    width: moderateScale(100),
    backgroundColor: Constants.Colors.Yellow,
    height: moderateScale(36),
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: moderateScale(3),
  },
  checkBtn: {
    backgroundColor: Constants.Colors.White,
    justifyContent: "center",
    alignItems: "center",
    padding: moderateScale(6),
    margin: moderateScale(3),
    borderRadius: moderateScale(3),
  },
  activeText: {
    // ...Constants.Fonts.TitilliumWebSemiBold,
    fontSize: moderateScale(18),
    color: Constants.Colors.White,
    marginHorizontal: moderateScale(5),
  },
  sidemenuUpDownImage: {
    height: moderateScale(20),
    width: moderateScale(20),
  },
  disabledItem: {
    opacity: 0.5,
  },
  appVersionText: {
    fontSize: moderateScale(14),
    // fontFamily: "Cochin",
  },
  appVersionCont: {
    flex: 1,
  },
});
