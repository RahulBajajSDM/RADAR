"use strict";

import React, { PureComponent } from "react";
import ModalDropdown from "react-native-modal-dropdown";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { widthScale, moderateScale } from "../../helpers/ResponsiveFonts";
import constants from "../../constants";
import Icon from "react-native-vector-icons/FontAwesome";

const SINGLE_DROP_DOWN_HEIGHT = 45;
const PARENT_PADDING = 20;
const DOWN_ARROW_SIZE = 20;

class SimpleDropdown extends PureComponent {
  static defaultProps = {
    defaultValue: ""
  };

  openDropDown = () => {
    this.dropDown && this.dropDown.show();
  };

  handleDropdownSelect = (index, value) => {
    const { onSelect } = this.props;
    if (onSelect) {
      onSelect(index, value);
    }
  };

  render() {
    const {
      Iconstyles,
      drowdownArray,
      placeHolder,
      defaultIndex,
      style,
      textStyle,
      onSelect,
      iconColor,
      dropdownView,
      showDropDown,
      showError
    } = this.props;
    let dropDownHeight = 0;
    if (drowdownArray) {
      dropDownHeight =
        drowdownArray.length > 3
          ? null
          : drowdownArray.length * SINGLE_DROP_DOWN_HEIGHT;
    }

    return (
      <View>
        {showDropDown === true ? (
          <TouchableOpacity
            style={([styles.shadowLayout, styles.flexRow], style)}
            onPress={showDropDown === true ? this.openDropDown : showError}
          >
            <ModalDropdown
              ref={obj => {
                this.dropDown = obj;
              }}
              defaultIndex={defaultIndex}
              defaultValue={placeHolder}
              style={styles.dropdownBtn}
              onSelect={onSelect}
              dropdownStyle={[
                styles.dropdownView,
                { height: dropDownHeight },
                dropdownView
              ]}
              dropdownTextStyle={styles.dropDownListTextStyle}
              dropdownTextHighlightStyle={styles.dropDownSelectedListTextStyle}
              textStyle={
                ([styles.nurseAppotNotesAndOtherText, styles.textBold],
                textStyle)
              }
              options={drowdownArray}
            />
            <Icon
              name={"angle-down"}
              size={25}
              color={[iconColor || constants.Colors.darkBlue]}
              style={Iconstyles}
            />
            {/* <Image style={styles.downArrow} resizeMode= "center" source={constants.Images.SideMenu.DownArrow} /> */}
          </TouchableOpacity>
        ) : (
          showError
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textBold: {
    fontWeight: "bold",
    flex: 1
  },
  dropdownBtn: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: PARENT_PADDING,
    marginRight: PARENT_PADDING,
    alignItems: "center",
    paddingTop: 0,
    paddingBottom: 0
  },
  dropdownView: {
    minWidth: 150,
    marginTop: 11,
    width: "85%",
    borderColor: constants.Colors.primary,
    borderWidth: 1,
    marginLeft: moderateScale(-10)
  },
  dropDownListTextStyle: {
    color: constants.Colors.darkBlue,
    fontSize: 16,
    marginRight: 5
  },
  dropDownSelectedListTextStyle: {
    color: "black",
    fontSize: 16,
    marginRight: 5
  },
  downArrow: {
    width: DOWN_ARROW_SIZE,
    height: DOWN_ARROW_SIZE,
    marginRight: 0,
    alignSelf: "center"
  },
  nurseAppotNotesAndOtherText: {
    fontSize: moderateScale(12),
    color: "black",
    paddingTop: 3,
    paddingBottom: 3
  },
  shadowLayout: {
    marginTop: 10,
    justifyContent: "center",
    borderRadius: 16,
    flex: 1,
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 2
    }
  }
});

export default SimpleDropdown;
