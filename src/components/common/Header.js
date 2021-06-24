import React from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import Constants from "../../constants";
import SafeView from "./SafeView";
import FormTextInput from "./FormTextInput";
import Icon from "react-native-vector-icons/FontAwesome";
import PropsTypes from "prop-types";
import constants from "../../constants";

const Header = (props) => {
  let {
    hideBack,
    hideDrawer,
    color,
    title,
    rightIcon,
    onRightPress,
    rightText,
    navigator,
    headerText,
    onBackPress,
    searchBox,
    onChangeSearchText,
    searchText,
    searchPlaceHolder,
    onDrawerPress,
    centerImage,
    // auth
  } = props;

  return (
    <View style={[Styles.shadowProps, { justifyContent: "center" }]}>
      {/* <SafeView /> */}
      <View
        style={[
          Styles.container,
          {
            backgroundColor: color,
            flexDirection: hideDrawer ? "row" : "row-reverse",
          },
        ]}
      >
        {!hideDrawer ? (
          <TouchableOpacity
            style={[
              Styles.iconBtn,
              { alignItems: "flex-end", marginRight: -80 },
            ]}
            onPress={onDrawerPress}
          >
            <Icon
              name="bars"
              color={Constants.Colors.toggleColor}
              size={Constants.BaseStyle.DEVICE_HEIGHT > 800 ? 30 : 25}
            />
          </TouchableOpacity>
        ) : !hideBack ? (
          <TouchableOpacity
            style={[Styles.iconBtn, { marginLeft: -80 }]}
            onPress={() => {
              onBackPress ? onBackPress() : navigator.pop();
            }}
          >
            <Icon name="chevron-left" size={20} />
          </TouchableOpacity>
        ) : null}
        <View
          style={[
            Styles.header,
            {
              justifyContent: searchBox ? "flex-start" : "center",
              alignItems: searchBox ? "flex-start" : "center",
            },
          ]}
        >
          {searchBox ? (
            <FormTextInput
              onChangeText={(text) => onChangeSearchText(text)}
              value={searchText}
              placeHolderText={searchPlaceHolder}
              style={Styles.searchBox}
              inputStyle={Styles.inputStyle}
            />
          ) : null}
          {/* {auth ? (
            <Text style={[Styles.headerText, headerText]}>{title}</Text>
          ) : ( */}
          {centerImage ? (
            <Image
              source={constants.Images.Logo}
              //  style={{ height: moderateScale(40), width: "60%" }}
            />
          ) : (
            <Text
              style={[
                Styles.headerText,
                headerText,
                hideDrawer && !hideBack
                  ? { marginRight: -80 }
                  : !hideDrawer && !hideBack
                  ? { marginRight: 30 }
                  : { marginRight: 0 },
              ]}
            >
              {title}
            </Text>
          )}
          {/* )} */}
        </View>
        {rightIcon ? (
          <TouchableOpacity
            style={Styles.iconBtn}
            onPress={() => {
              onRightPress ? onRightPress() : false;
            }}
          >
            <Image source={rightIcon} resizeMode={"contain"} />
          </TouchableOpacity>
        ) : rightText ? (
          <TouchableOpacity
            style={Styles.iconBtn}
            onPress={() => {
              onRightPress ? onRightPress() : false;
            }}
          >
            <Text style={Styles.skip}>{rightText}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    paddingVertical: moderateScale(5),
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    // shadowOffset: { width: 2, height: 2 },
    // shadowColor: "black",
    // shadowOpacity: 0.5,
    // // shadowRadius: 2,
    // // backgroundColor:"#FFFFFF",
    // elevation: 3,
    // // borderWidth:1
  },
  shadowProps: {
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "#FFFFFF",
    shadowOpacity: 0.1,
    // shadowRadius: 2,
    backgroundColor: "#FFFFFF",
    elevation: 3,
    // borderWidth:1
  },
  iconBtn: {
    height: moderateScale(40),
    width: moderateScale(40),
    justifyContent: "center",
    alignItems: "flex-start",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    height: moderateScale(40),
    width: Constants.BaseStyle.DEVICE_WIDTH - moderateScale(135),
  },
  headerText: {
    // ...Constants.Fonts.TitilliumWebSemiBold,
    color: Constants.Colors.Black,
    fontSize: moderateScale(28),
    textAlign: "center",
    textAlignVertical: "center",
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
    width: Constants.BaseStyle.DEVICE_WIDTH / 1.4,
  },
  inputStyle: {
    color: Constants.Colors.Primary,
    flex: 1,
    paddingHorizontal: moderateScale(5),
    // ...Constants.Fonts.TitilliumWebRegular,
    fontSize: moderateScale(17),
  },
  skip: {
    color: Constants.Colors.gray,
    paddingHorizontal: moderateScale(5),
    // ...Constants.Fonts.TitilliumWebRegular,
    fontSize: moderateScale(16),
    textAlign: "right",
  },
});

/*
PropsTypes defined for Button 
*/
// Header.propsTypes = {
//   centerImage: PropsTypes.bool,
// };
// /*
// Default props from Button
// */
// Header.defaultProps = {
//   centerImage: true,
// };

export default Header;
