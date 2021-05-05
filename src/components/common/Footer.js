import React from "react";
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet,
  Platform
} from "react-native";

import { moderateScale } from "../../helpers/ResponsiveFonts";
import Constants from "../../constants";
import PropsTypes from "prop-types";
let tabs = [
  {
    fontSize: 10,
    text: "Tab1",
    icon: Constants.Images.dashboard,
    iconColor: "rgba(226,71,31,1)",
    largeIcon: false,
    // iconColor: "#e2471fff",
    textColor: "#ffffff",
    // selectedTextColor: "black",
    selectedTextColor: "rgba(0,0,0,0.3)",
    // selectedIconColor: "black"
    selectedIconColor: "rgba(255,255,255,0.3)"
  },
  {
    text: "Tab2",
    fontSize: 10,
    icon: Constants.Images.Tabs.sun,
    largeIcon: false,
    // iconColor: "#ffffff",
    textColor: "#ffffff",
    // selectedTextColor: "black",
    selectedTextColor: "rgba(255,255,255,0.3)",
    // selectedIconColor: "black"
    selectedIconColor: "rgba(243,169,4,0.3)"
  },
  {
    color: "#ffffff",
    // selectedIconColor: 'black',
    // text: "Bot",
    // iconInsets: { top: 0, left: 0, bottom: 100, right: 0 },
    fontSize: 10,
    // icon: Constants.Images.chat_icon
    largeIcon: true,
    icon:
      Platform.OS == "ios"
        ? Constants.Images.Tabs.botLogoAndroid
        : Constants.Images.Tabs.botLogoAndroid
  },
  {
    text: "Tab3",
    fontSize: 10,
    icon: Constants.Images.journal,
    largeIcon: false,
    // iconColor: "#fff2ccff",
    iconColor: "rgba(255,242,204,1)",
    textColor: "#ffffff",
    selectedTextColor: "rgba(255,242,204,0.3)",
    // selectedTextColor: "black",
    // selectedIconColor: "black"
    selectedIconColor: "rgba(255,255,255,0.3)"
  },
  {
    text: "Tab4",
    fontSize: 10,
    icon: Constants.Images.Tabs.lotus,
    largeIcon: false,
    // iconColor: "#ffffff",
    textColor: "#ffffff",
    // selectedTextColor: "black",
    // selectedIconColor: "black"
    selectedTextColor: "rgba(255,255,255,0.3)",
    selectedIconColor: "rgba(210,109,214,0.3)"
  }
];

const Footer = props => {
  let { backgroundColor, selected, onTabPress } = props;

  return (
    <View style={[Styles.shadowProps, { justifyContent: "center" }]}>
      <View
        style={[
          Styles.container,
          {
            backgroundColor,
            flexDirection: "row"
          }
        ]}
      >
        {tabs.map((item, index) => {
          let { fontSize, text, icon, textColor, largeIcon } = item;

          return (
            <TouchableOpacity
              key={index}
              style={[
                Styles.iconBtn,
                { width: Constants.BaseStyle.DEVICE_WIDTH / tabs.length },
                selected == index && !largeIcon && Styles.disabledItem
              ]}
              onPress={() => {
                onTabPress(index);
              }}
            >
              <Image
                source={icon}
                resizeMethod={"resize"}
                style={[Styles.headerLogo, largeIcon && Styles.biggerTab]}
              />

              {text && (
                <Text style={{ color: textColor, fontSize }}>{text}</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    paddingVertical: moderateScale(5),
    backgroundColor: "#FFFFFF",
    justifyContent: "center"
    // shadowOffset: { width: 2, height: 2 },
    // shadowColor: "black",
    // shadowOpacity: 0.5,
    // // shadowRadius: 2,
    // // backgroundColor:"#FFFFFF",
    // elevation: 3,
    // // borderWidth:1
  },
  headerLogo: {
    height: Constants.BaseStyle.DEVICE_WIDTH * 0.08,
    width: Constants.BaseStyle.DEVICE_WIDTH * 0.08
  },
  biggerTab: {
    height: Constants.BaseStyle.DEVICE_WIDTH * 0.16,
    width: Constants.BaseStyle.DEVICE_WIDTH * 0.16,
    marginBottom:
      Constants.BaseStyle.DEVICE_HEIGHT > 800
        ? moderateScale(17)
        : moderateScale(10)
  },
  shadowProps: {
    // shadowOffset: { width: 2, height: 2 },
    // shadowColor: "black",
    // shadowOpacity: 0.1,
    // // shadowRadius: 2,
    // backgroundColor: "#FFFFFF",
    // elevation: 3,
    // // borderWidth:1
  },
  iconBtn: {
    height: moderateScale(40),
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    height: moderateScale(40),
    width: Constants.BaseStyle.DEVICE_WIDTH - moderateScale(135)
  },
  headerText: {
    // ...Constants.Fonts.TitilliumWebSemiBold,
    color: Constants.Colors.Black,
    fontSize: moderateScale(21),
    textAlign: "center",
    textAlignVertical: "center"
  },
  searchBox: {
    borderColor: Constants.Colors.transparent,
    borderRadius: 0,
    marginTop: moderateScale(0),
    marginHorizontal: moderateScale(0),
    justifyContent: "flex-start",
    alignItems: "center",
    height: moderateScale(40),
    flexDirection: "row",
    width: Constants.BaseStyle.DEVICE_WIDTH / 1.4
  },
  inputStyle: {
    color: Constants.Colors.Primary,
    flex: 1,
    paddingHorizontal: moderateScale(5),
    // ...Constants.Fonts.TitilliumWebRegular,
    fontSize: moderateScale(17)
  },
  skip: {
    color: Constants.Colors.gray,
    paddingHorizontal: moderateScale(5),
    // ...Constants.Fonts.TitilliumWebRegular,
    fontSize: moderateScale(16),
    textAlign: "right"
  },
  disabledItem: {
    opacity: 0.5
  }
});

/*
PropsTypes defined for Button 
*/
Footer.propsTypes = {
  centerImage: PropsTypes.bool,
  onTabPress: PropsTypes.func,
  backgroundColor: PropsTypes.string,
  selected: PropsTypes.number
};
/*
Default props from Button 
*/
Footer.defaultProps = {
  centerImage: true,
  onTabPress: () => {},
  backgroundColor: "#ffffff",
  selected: 2
};

export default Footer;
