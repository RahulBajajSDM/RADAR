/*
 * @file: SignIn.js
 * @description: Contains the SignIn Container.
 * @date: 9.Oct.2018
 * @author: Suraj Sanwal
 * */

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import _ from "lodash";
import Icon from "../../components/common/Icon";
import SimpleDropdown from "../../components/common/SimpleDropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Moment from "moment";
import Constants from "../../constants";
import * as AppAction from "../../actions";
import FloatingInput from "../../components/common/FloatingInput";
import TextInputMask from "react-native-text-input-mask";
import Regex from "../../helpers/Regex";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import AuthButton from "../../components/common/AuthButton";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      emailError: "",
      firstNameError: "",
      lastNameError: "",
      imageMain: "",
      imgUrl: null,

      employeeId: "",
      employeeIdError: "",
      email: "",
      emailError: "",
      invitationCode: "",
      invitationCodeError: "",
      showDOB: "",
      dateOfBirth: "",
      dateOfBirthError: "",
      showDOJ: "",
      dateOfJoining: "",
      dateOfJoiningError: "",
      agencyId: "",
      agencyCode: "",
      agencyCodeError: "",
      address: "",
      addressError: "",
      street: "",
      streetError: "",
      zip: "",
      zipError: "",
      city: "",
      cityError: "",
      stateAdd: "",
      stateError: "",
      mobile: "",
      mobileError: "",
      termsModal: false,
      isVerified: false,
      isDatePickerVisible: false,
      isDatePickerJoinVisible: false,
      locations: [],
      location: "",
      locationError: "",
      profileShow: false,
    };
    this.setProfile = this.setProfile.bind(this);
    this.editProfile = this.editProfile.bind(this);
  }

  componentDidMount() {
    this.getProfileData();
  }

  getProfileData() {
    this.props.AppAction.getEmployeesData(this.props.user.userData.id, (cb) => {
      this.setProfile(cb);
    });
  }

  setProfile(res, cb) {
    let context = this,
      {
        lastName,
        firstName,
        mobile,
        email,
        empId,
        dateOfBirth,
        dateOfJoining,
      } = res;
    console.log(res);
    this.firstName.setValue(firstName);
    this.lastName.setValue(lastName);
    this.email.setValue(email);
    this.employeeId.setValue(empId);
    context.setState(
      {
        email,
        firstName,
        lastName,
        mobile,
        employeeId: empId,
        showDOB: dateOfBirth,
        showDOJ: dateOfJoining,
      },
      () => {
        if (cb) {
          cb();
        }
      }
    );
  }
  handleConfirm = (date) => {
    let dateVal = Moment(date).format("DD/MM/YYYY");
    this.setState({
      showDOB: dateVal,
      dateOfBirth: date.toString(),
      isDatePickerVisible: false,
      dateOfBirthError: "",
    });
  };
  handleCancel = () => {
    this.setState({ isDatePickerVisible: false });
  };
  handleJoinConfirm = (date) => {
    let dateVal = Moment(date).format("DD/MM/YYYY");
    this.setState({
      showDOJ: dateVal,
      dateOfJoining: date.toString(),
      isDatePickerJoinVisible: false,
      dateOfJoiningError: "",
    });
  };
  handleJoinCancel = () => {
    this.setState({ isDatePickerJoinVisible: false });
  };

  editProfile() {
    let {
        firstName,
        lastName,
        employeeId,
        email,
        showDOB,
        showDOJ,
        mobile,
      } = this.state,
      {
        user: { userData },
      } = this.props;
    if (_.isEmpty(firstName.trim())) {
      this.setState({
        firstNameError: "First name is required",
      });
      return;
    }
    if (_.isEmpty(lastName.trim())) {
      this.setState({
        lastNameError: "Last name is required",
      });
      return;
    }
    if (_.isEmpty(email.trim())) {
      this.setState({
        emailError: "Email is required",
      });
      return;
    }

    if (!Regex.validateEmail(email.trim())) {
      this.setState({
        emailError: "Invalid Email format",
      });
      return;
    }

    if (_.isEmpty(employeeId.trim())) {
      this.setState({
        employeeIdError: "Employee id is required",
      });
      return;
    }
    let emailValue = email.toLowerCase();
    let param = {
      _id: userData.id,
      firstName,
      lastName,
      empId: employeeId,
      email: emailValue,
      mobile,
      userType: userData.userType,
      agencyId: userData.agencyId._id,
    };
    if (showDOB) {
      param.dateOfBirth = showDOB;
    }
    if (showDOJ) {
      param.dateOfJoining = showDOJ;
    }
    this.props.AppAction.editProfile(param, () => {
      // context.setProfile(res, () => {
      Alert.alert(
        "Update Profile",
        "Profile Updated Successfully",
        [
          {
            text: "OK",
            onPress: () => {
              this.props.AppAction.pop(this.props.componentId);
            },
          },
        ],
        { cancelable: false }
      );
      // });
    });
  }

  focusNext(next) {
    this[next].focus();
  }

  backPress = () => {
    this.props.AppAction.pop(this.props.componentId);
  };

  render() {
    let {
      firstName,
      lastName,
      email,
      firstNameError,
      lastNameError,
      employeeId,
      emailError,
      employeeIdError,
      showDOB,
      dateOfBirth,
      dateOfBirthError,
      showDOJ,
      dateOfJoining,
      dateOfJoiningError,
      mobile,
      mobileError,
      isDatePickerVisible,
      isDatePickerJoinVisible,
      locations,
      location,
      locationError,
    } = this.state;

    let locationNames =
      locations.length !== 0 && locations.map((location) => location.name);
    let {
      loader: { signupLoader },
    } = this.props;
    return (
      <View style={[styles.container]}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={"handled"}
          style={styles.scrollStyle}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.signInView}></View>
          <View style={styles.paddingInputText}>
            <FloatingInput
              // container={[styles.nameField, styles.marginRightName]}
              inputWrapper={styles.inputWrapper}
              ref={(ref) => (this.firstName = ref)}
              label={"First Name"}
              value={firstName}
              onChangeText={(firstName) => {
                this.setState({ firstName, firstNameError: "" });
              }}
              onSubmitEditing={() => {
                this.focusNext("lastName");
              }}
              returnKey={"next"}
              error={firstNameError}
            />
            <FloatingInput
              // container={[styles.nameField, styles.marginLeftName]}
              inputWrapper={styles.inputWrapper}
              ref={(ref) => (this.lastName = ref)}
              label={"Last Name"}
              value={lastName}
              onChangeText={(lastName) => {
                this.setState({ lastName, lastNameError: "" });
              }}
              onSubmitEditing={() => {
                this.focusNext("employeeId");
              }}
              returnKey={"next"}
              error={lastNameError}
            />
            {/* <View style={styles.nameContainer}>

            </View> */}
            <FloatingInput
              ref={(ref) => (this.employeeId = ref)}
              inputWrapper={styles.inputWrapper}
              label={"Employee Id"}
              value={employeeId}
              editable={false}
              onChangeText={(employeeId) => {
                this.setState({ employeeId, employeeIdError: "" });
              }}
              onSubmitEditing={() => {
                this.focusNext("email");
              }}
              returnKey={"next"}
              error={employeeIdError}
            />
            <FloatingInput
              ref={(ref) => (this.email = ref)}
              inputWrapper={styles.inputWrapper}
              label={"E-mail"}
              autoCapitalize={"none"}
              value={email}
              editable={false}
              onChangeText={(email) => {
                this.setState({ email, emailError: "" });
              }}
              onSubmitEditing={() => {
                this.focusNext("location");
              }}
              keyboardType={"email-address"}
              returnKey={"next"}
              error={emailError}
            />
            <View>
              <SimpleDropdown
                placeHolder="Location"
                drowdownArray={locationNames}
                style={styles.simpleDropdownStyle}
                textStyle={styles.dropDownText}
                iconColor={Constants.Colors.Black}
                onSelect={(index) => {
                  this.setState({
                    location: locations[index]._id,
                    locationError: "",
                  });
                }}
                showDropDown={
                  locations && locations.length === 0 ? false : true
                }
              />
              {locationError ? (
                <Text style={{ paddingTop: moderateScale(10), color: "red" }}>
                  {locationError}
                </Text>
              ) : null}
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                headerTextIOS={"Date of Birth"}
                mode="date"
                onConfirm={this.handleConfirm}
                date={
                  dateOfBirth === ""
                    ? new Date(Moment().subtract(18, "year"))
                    : new Date(dateOfBirth)
                }
                maximumDate={new Date(Moment().subtract(18, "year"))}
                onCancel={() => this.handleCancel()}
              />

              <TouchableOpacity
                onPress={() => this.setState({ isDatePickerVisible: true })}
              >
                <FloatingInput
                  pointerEvents="none"
                  ref={(ref) => (this.dateOfBirth = ref)}
                  inputWrapper={styles.inputWrapper}
                  label={"Date Of Birth"}
                  value={showDOB}
                  key={"showDOB" + showDOB}
                  editable={false}
                  onChangeText={(dateOfBirth) => {
                    this.setState({ dateOfBirth, dateOfBirthError: "" });
                  }}
                  onSubmitEditing={() => {
                    this.focusNext("dateOfJoining");
                  }}
                  returnKey={"next"}
                  error={dateOfBirthError}
                />
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerJoinVisible}
                headerTextIOS={"Date of Joining"}
                mode="date"
                onConfirm={this.handleJoinConfirm}
                date={
                  dateOfJoining === "" ? new Date() : new Date(dateOfJoining)
                }
                onCancel={() => this.handleJoinCancel()}
              />
              <TouchableOpacity
                onPress={() => this.setState({ isDatePickerJoinVisible: true })}
              >
                <FloatingInput
                  ref={(ref) => (this.dateOfJoining = ref)}
                  inputWrapper={styles.inputWrapper}
                  label={"Date Of Joining"}
                  value={showDOJ}
                  key={"showDOJ" + showDOJ}
                  editable={false}
                  pointerEvents="none"
                  onChangeText={(dateOfJoining) => {
                    this.setState({
                      dateOfJoining,
                      dateOfJoiningError: "",
                    });
                  }}
                  onSubmitEditing={() => {
                    this.focusNext("address");
                  }}
                  returnKey={"next"}
                  error={dateOfJoiningError}
                />
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", flex: 1, paddingBottom: 10 }}>
              <View style={{}}>
                <Text
                  style={{
                    height: 55,
                    width: 35,
                    fontSize: moderateScale(17),
                    fontFamily: "Helvetica",
                    paddingTop: 20,
                    paddingBottom: 0,
                    marginRight: 10,
                  }}
                >
                  +91
                </Text>
              </View>
              <TextInputMask
                style={[
                  styles.mobileInputWrapper,
                  { color: Constants.Colors.DarkGray },
                ]}
                refInput={(ref) => {
                  this.mobile = ref;
                }}
                // onChange={(text) => {
                //   console.log(text)
                // }}
                onChangeText={(formatted, extracted) => {
                  console.log("mobile", formatted);
                  console.log("extracted", extracted);
                  this.setState({ mobile: extracted });
                  if (extracted.length >= 10) {
                    console.log("10 Characters done");
                    this.props.AppAction.checkMobile(
                      { mobile: extracted },
                      this.props.componentId,
                      (cb) => {
                        console.log("responseMobileCheck", cb);
                        if (!cb.mobileAvailable) {
                          this.setState({
                            mobileError: "Mobile Number already registered",
                          });
                        } else {
                          this.setState({ mobileError: "" });
                        }
                      }
                    );
                  } else {
                    this.setState({ mobileError: "" });
                  }
                  // console.log(formatted) // +1 (123) 456-78-90
                  // console.log(extracted) // 1234567890
                }}
                placeholder={"Mobile"}
                value={mobile}
                keyboardType={"number-pad"}
                mask={"([000]) [000] [00] [00]"} //{"+1 ([000]) [000] [00] [00]"}
              />
            </View>
            {mobileError ? (
              <Text style={{ paddingTop: moderateScale(10), color: "red" }}>
                {mobileError}
              </Text>
            ) : null}
          </View>
          <View style={{ padding: moderateScale(10) }} />
          <View style={styles.stylesAuthContainer}>
            <AuthButton
              // buttonName={!signupLoader ? "Sign Up" : "Signing Up..."}
              buttonName={"Update Profile"}
              disabled={signupLoader}
              buttonStyle={styles.signUpButtonStyle}
              textStyle={styles.textStyle}
              paddingTop={true}
              gradientStyle={styles.gradientStyle}
              onPress={() => this.editProfile()}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  app: state.app,
  loader: state.loader,
});
const mapDispatchToProps = (dispatch) => ({
  AppAction: bindActionCreators(AppAction, dispatch),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Constants.Colors.AuthYellow },
  scrollStyle: {
    flex: 1,
  },
  image_container: {
    height: moderateScale(70),
    width: moderateScale(70),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  signUpButtonStyle: {
    width: moderateScale(160),
    height: moderateScale(40),
    marginTop: moderateScale(10),
    alignSelf: "center",
    backgroundColor: "red",
  },
  mobileInputWrapper: {
    borderBottomWidth: moderateScale(1),
    borderBottomColor: Constants.Colors.Gray,
    fontSize: moderateScale(16),
    fontFamily: "Helvetica",
    height: moderateScale(55),
    color: Constants.Colors.DarkGray,
    flex: 1,
  },
  gradientStyle: {
    borderRadius: moderateScale(20),
  },
  textStyle: {
    textAlign: "center",
    fontFamily: "Charter",
    fontWeight: "bold",
    fontSize: moderateScale(18),
  },
  paddingInputText: {
    paddingHorizontal: moderateScale(20),
  },
  forgotView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: moderateScale(15),
    padding: moderateScale(15),
  },
  inputWrapper: {
    // borderBottomWidth: moderateScale(1),
    // borderBottomColor: Constants.Colors.Gray,
    fontFamily: "Charter",
    fontWeight: "normal",
    height: moderateScale(50),
  },
  stylesAuthContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: moderateScale(15),
  },
  nameField: {
    width: Constants.BaseStyle.DEVICE_WIDTH * 0.43,
  },

  marginRightName: { marginRight: Constants.BaseStyle.DEVICE_WIDTH * 0.02 },

  marginLeftName: { marginLeft: Constants.BaseStyle.DEVICE_WIDTH * 0.02 },

  nameContainer: {
    flexDirection: "row",
  },
  signUpView: {
    backgroundColor: "white",
    width: Constants.BaseStyle.DEVICE_WIDTH - moderateScale(2),
    borderColor: Constants.Colors.Gray,
    borderWidth: moderateScale(1),
    paddingVertical: moderateScale(4),
    marginTop: moderateScale(35),
    marginHorizontal: moderateScale(1),
  },

  signUpButton: {
    // margin: moderateScale(5),
    // padding: moderateScale(20)
  },

  signUpText: {
    fontSize: moderateScale(21),
    color: "gray",
    fontFamily: "Cochin",
    textAlign: "center",
  },

  forgotButton: {
    paddingTop: moderateScale(5),
    paddingBottom: moderateScale(20),
  },

  signInText: {
    fontSize: moderateScale(30),
    color: Constants.Colors.Black,
    fontWeight: Platform.OS == "ios" ? "bold" : "normal",
    fontFamily: "Cochin-Bold",
  },
  signInView: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: moderateScale(25),
  },
  forgotText: {
    color: Constants.Colors.Black,
    fontSize: moderateScale(20),
    fontFamily: "Helvetica",
    fontWeight: "bold",
  },
  forgotTextBlack: {
    fontSize: moderateScale(19),
    paddingHorizontal: moderateScale(5),
    fontFamily: "Helvetica",
    fontWeight: "normal",
  },
  textInputHeader: {
    fontSize: moderateScale(14),
    color: "#1D2226",
    fontFamily: "Cochin",
    padding: moderateScale(5),
  },
  textInputRoundStyle: {
    height: moderateScale(40),
    borderWidth: 1,
    borderRadius: moderateScale(15),
    paddingHorizontal: moderateScale(8),
    borderColor: Constants.Colors.buttonColor,
    fontSize: moderateScale(16),
    color: "#1D2226",
    fontFamily: "Cochin-Bold",
    backgroundColor: "#FFFFFF",
  },
});
