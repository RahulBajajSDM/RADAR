/*
 * @file: Scale.js
 * @date: 20.Feb.2019
 * @author: Amit Singh
 * */
/* eslint-disable */

import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  Dimensions
} from "react-native";
var { width } = Dimensions.get("window");
import { moderateScale, verticalScale } from "../../helpers/ResponsiveFonts";
import { TouchableOpacity } from "react-native-ui-lib";
import Triangle from "react-native-triangle";
import constants from "../../constants";

class RatingScale extends React.Component {
  constructor(props) {
    super(props);
    let { options } = this.props;
    this.state = {
      selectedOption: null,
      hidden: false
    };
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({ hidden: false });
    // }, 3000);
  }
  lineIcon = () => {
    let { options } = this.props;
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Image
          source={require("../../assets/icons/minus-symbol-black.png")}
          style={{
            height: moderateScale(2),
            width:
              options.length == 4
                ? moderateScale(80)
                : constants.BaseStyle.DEVICE_WIDTH > 330
                ? moderateScale(60)
                : moderateScale(51)
          }}
        />
      </View>
    );
  };
  scale = widthLine => {
    const { scaleView } = styles;
    let { options } = this.props;

    return (
      <View style={scaleView}>
        {options.map((item, index) => {
          let isLast = options.length <= index + 1;
          return (
            <View
              key={index}
              style={{
                // backgroundColor: "red",
                width:
                  options.length !== index + 1
                    ? options.length == 4
                      ? moderateScale(100)
                      : width > 330
                      ? moderateScale(80)
                      : moderateScale(70)
                    : moderateScale(20),
                alignItems: "flex-start"
                // borderBottomWidth: moderateScale(2),
                // borderBottomColor: constants.Colors.Primary
              }}
            >
              {this.radioIcon(index.toString(), widthLine, isLast, item)}

              {/* {options.lenght > index ? this.lineIcon() : null} */}
            </View>
          );
        })}
      </View>
    );
  };

  handleBot = action => {
    this.props.triggerNextStep({
      value: action.value,
      trigger: this.props.trigger,
      message: action.title,
      stepId: this.props.step.id
    });
  };

  floatingButton = (
    value,
    title,
    pos,
    width,
    arrowDirection,
    marginLeft,
    marginRight
  ) => {
    let { options } = this.props;
    return (
      <TouchableOpacity
        style={{
          marginLeft: pos,
          top:
            options.length == 4
              ? Platform.OS == "ios"
                ? constants.BaseStyle.DEVICE_WIDTH > 330
                  ? moderateScale(3)
                  : moderateScale(0)
                : moderateScale(0)
              : Platform.OS == "ios"
              ? width > 330
                ? moderateScale(16)
                : moderateScale(14)
              : verticalScale(16),
          position: "absolute",
          ...Platform.select({
            android: {
              zIndex: 999
            }
          })
        }}
        onPress={() => {
          //   this.handleBot({ value, title });
        }}
      >
        <View
          style={{
            backgroundColor: "#00b3b7",
            padding: 10,
            borderRadius: 10,
            width: width,
            alignItems: "center"
          }}
        >
          <Text style={{ color: "#fff" }}>{title}</Text>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            alignItems: arrowDirection,
            marginLeft: marginLeft,
            marginRight: marginRight
          }}
        >
          <Triangle
            width={10}
            height={10}
            color={"#000000"}
            direction={"down"}
          />
        </View>
      </TouchableOpacity>
    );
  };
  radioIcon = (action, width, isLast) => {
    let { selectedOption } = this.state;
    return (
      <View
        style={{
          width: width,
          flexDirection: "row",
          justifyContent: "flex-start"
        }}
      >
        <TouchableOpacity
          style={{
            width: moderateScale(20),
            height: moderateScale(20)
          }}
          onPress={() => {
            this.setState({ selectedOption: action });
            this.props.onPress(action);
          }}
        >
          {action === selectedOption ? (
            <Image
              source={require("../../assets/icons/radio-on-button-black.png")}
              style={{ height: moderateScale(20), width: moderateScale(20) }}
            />
          ) : (
            <View
              style={{
                height: moderateScale(20),
                width: moderateScale(20),
                borderRadius: moderateScale(100),
                borderColor: constants.Colors.Placehoder,
                borderWidth: moderateScale(2)
              }}
            />
          )}
        </TouchableOpacity>
        {!isLast ? this.lineIcon() : null}
      </View>
    );
  };
  render() {
    let { options } = this.props;
    let { anchorText } = styles;
    let { selectedOption, hidden } = this.state;
    // let { width } = selectedOptionPosition[selectedOption];
    // if (options.length === 4) {
    //   pos = selectedOptionPosition2[selectedOption].pos;

    //   width = selectedOptionPosition2[selectedOption].width;

    //   marginLeft = selectedOptionPosition2[selectedOption].marginLeft;

    //   marginRight = selectedOptionPosition2[selectedOption].marginRight;
    // }

    if (hidden) {
      return null;
    } else {
      return (
        <View
          style={{
            height: moderateScale(100),
            justifyContent: "flex-end",
            paddingVertical: moderateScale(20)
            // position: "absolute",
            // top: constants.BaseStyle.DEVICE_HEIGHT * 0.23
          }}
        >
          <View
            style={{
              ...Platform.select({
                ios: { zIndex: 999 }
              })
            }}
          >
            {/* {this.floatingButton(
              options[selectedOption].value,
              options[selectedOption].label,
              pos,
              width,
              arrowDirection,
              marginLeft,
              marginRight
            )} */}
          </View>
          {/* <View style={{ flex: 1, backgroundColor:'yellow' }}> */}
          <View style={anchorText}>
            <TouchableOpacity onPress={() => {}}>
              <Text style={[styles.textWidth, styles.textAlignLeft]}>
                {options[0].label}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Text style={[styles.textWidth, styles.textAlignRight]}>
                {options[options.length - 1].label}
              </Text>
            </TouchableOpacity>
          </View>
          {/* </View> */}
          {this.scale(width * 0.2)}
          {/* <View style={{ flex: 0.8 }} /> */}
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  anchorText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: moderateScale(15)
  },
  textWidth: { width: moderateScale(90), fontSize: moderateScale(12) },
  textAlignLeft: { textAlign: "left" },
  textAlignRight: { textAlign: "right" },
  scaleView: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: moderateScale(10)
  }
});

export default RatingScale;
