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
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  ScrollView,
  Alert
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import _ from "lodash";

import Constants from "../../constants";
import * as AppAction from "../../actions";
import FloatingInput from "../../components/common/FloatingInput";
import Header from "../../components/common/Header";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import AuthButton from "../../components/common/AuthButton";
import Icon from "../../components/common/Icon";
import Regex from "../../helpers/Regex";
import TextInputMask from "react-native-text-input-mask";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Moment from "moment";
import MyActivityIndicator from "../../components/common/MyActivityIndicator";
import SimpleDropdown from "../../components/common/SimpleDropdown";
//const { height, width } = Dimensions.get("window");
const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;
class SignUpCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      firstNameError: "",
      lastName: "",
      lastNameError: "",
      employeeId: "",
      employeeIdError: "",
      email: "",
      emailError: "",
      hidePassword: true,
      password: "",
      passwordError: "",
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
      locationError: ""
    };
  }

  componentDidMount() {}

  showPassword = () => {
    this.setState({
      hidePassword: !this.state.hidePassword
    });
  };

  validateMobileLinkage = () => {
    const {
      email,
      firstName,
      lastName,
      employeeId,
      isVerified,
      agencyCode,
      mobile
    } = this.state;

    if (_.isEmpty(firstName.trim())) {
      this.setState({
        firstNameError: "First name is required"
      });
      return;
    }
    if (_.isEmpty(lastName.trim())) {
      this.setState({
        lastNameError: "Last name is required"
      });
      return;
    }
    if (_.isEmpty(email.trim())) {
      this.setState({
        emailError: "Email is required"
      });
      return;
    }
    if (!Regex.validateEmail(email.trim())) {
      this.setState({
        emailError: "Invalid Email format"
      });
      return;
    }
    if (_.isEmpty(mobile.trim())) {
      this.setState({
        mobileError: "Mobile Number is required"
      });
      return;
    }
    if (_.isEmpty(agencyCode.trim())) {
      this.setState({
        agencyCodeError: "Agency Code is required"
      });
      return;
    }
    Alert.alert(
      "RADAR",
      "Are you sure the mobile number is linked with Aarogya Setu App?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Continue", onPress: () => this.verifyCodeApi() }
      ],
      { cancelable: false }
    );
  };

  verifyCodeApi = () => {
    const {
      email,
      firstName,
      lastName,
      employeeId,
      isVerified,
      agencyCode,
      mobile
    } = this.state;
    let emailValue = email.toLowerCase();
    console.log("monbileVal", mobile);
    let param = {
      firstName,
      lastName,
      email: emailValue,
      agencyCode: agencyCode,
      empId: employeeId
    };
    if (mobile.length > 0) {
      param.mobile = mobile;
    }
    this.props.AppAction.sendVerificationCode(
      param,
      this.props.componentId,
      cb => {
        this.setState({
          isVerified: !isVerified,
          locations: [],
          invitationCode: ""
        });
      }
    );
  };

  handleConfirm = date => {
    let dateVal = Moment(date).format("DD/MM/YYYY");
    this.setState({
      showDOB: dateVal,
      dateOfBirth: date.toString(),
      isDatePickerVisible: false,
      dateOfBirthError: ""
    });
  };
  handleCancel = () => {
    this.setState({ isDatePickerVisible: false });
  };
  handleJoinConfirm = date => {
    let dateVal = Moment(date).format("DD/MM/YYYY");
    this.setState({
      showDOJ: dateVal,
      dateOfJoining: date.toString(),
      isDatePickerJoinVisible: false,
      dateOfJoiningError: ""
    });
  };
  handleJoinCancel = () => {
    this.setState({ isDatePickerJoinVisible: false });
  };

  SignUp = () => {
    const {
      firstName,
      lastName,
      employeeId,
      email,
      password,
      showDOB,
      showDOJ,
      agencyId,
      address,
      street,
      zip,
      city,
      stateAdd,
      mobile,
      invitationCode,
      location
    } = this.state;
    if (_.isEmpty(firstName.trim())) {
      this.setState({
        firstNameError: "First name is required"
      });
      return;
    }
    if (_.isEmpty(lastName.trim())) {
      this.setState({
        lastNameError: "Last name is required"
      });
      return;
    }
    if (_.isEmpty(email.trim())) {
      this.setState({
        emailError: "Email is required"
      });
      return;
    }

    if (!Regex.validateEmail(email.trim())) {
      this.setState({
        emailError: "Invalid Email format"
      });
      return;
    }
    if (_.isEmpty(invitationCode.trim())) {
      this.setState({
        invitationCodeError: "Verification Code is required"
      });
      return;
    }
    if (_.isEmpty(password.trim())) {
      this.setState({
        passwordError: "Password is required"
      });
      return;
    }

    if (!Regex.validatePassword(password.trim())) {
      this.setState({
        passwordError:
          "Password should be at least six characters and include a minimum of one uppercase and lowercase letter, one number and one character."
      });
      return;
    }
    if (_.isEmpty(location.trim())) {
      this.setState({
        locationError: "Location is required"
      });
      return;
    }
    // if (_.isEmpty(showDOB.trim())) {
    //   this.setState({
    //     dateOfBirthError: "Date Of Birth is required",
    //   });
    //   return;
    // }
    // if (_.isEmpty(showDOJ.trim())) {
    //   this.setState({
    //     dateOfJoiningError: "Date Of Joining is required",
    //   });
    //   return;
    // }
    let emailValue = email.toLowerCase();
    this.props.AppAction.getCodeInfo(
      {
        email: emailValue,
        code: invitationCode
      },
      this.props.componentId,
      cb => {
        console.log("getCodeInfo11", cb);
        // this.setState({
        //   employeeId: cb.empId,
        //   firstName: cb.firstName, lastName: cb.lastName,
        //   agencyId: cb.agencyId._id
        // })
        let param = {
          firstName,
          lastName,
          empId: employeeId,
          email: emailValue,
          password,
          agencyId: cb.agencyId._id,
          address,
          street,
          zip,
          city,
          state: stateAdd,
          mobile,
          code: invitationCode,
          location
        };

        if (showDOB) {
          param.dateOfBirth = showDOB;
        }
        if (showDOJ) {
          param.dateOfJoining = showDOJ;
        }
        this.props.AppAction.registerUser(param, this.props.componentId);
      }
    );
  };

  verificationCodeCheckApi() {
    let { invitationCode, email } = this.state;
    if (_.isEmpty(invitationCode.trim())) {
      this.setState({
        invitationCodeError: "Verification Code is required"
      });
      return;
    }
    let emailValue = email.toLowerCase();
    this.props.AppAction.getCodeInfo(
      {
        email: emailValue,
        code: invitationCode
      },
      this.props.componentId,
      cb => {
        console.log("getCodeInfo11", cb.agencyId.locations);
        this.setState({
          employeeId: cb.empId,
          firstName: cb.firstName,
          lastName: cb.lastName,
          agencyId: cb.agencyId._id,
          locations: cb.agencyId.locations
        });
      }
    );
  }

  focusNext(next) {
    this[next].focus();
  }

  renderModal() {
    return (
      <Modal
        style={{
          backgroundColor: "green"
        }}
        animationType="slide"
        transparent={true}
        visible={this.state.termsModal}
      >
        <View
          style={{
            backgroundColor: Constants.Colors.AuthYellow,
            flex: 1,
            justifyContent: "center",

            alignItems: "center"
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: WINDOW_WIDTH / 1.1,
              height: WINDOW_HEIGHT / 1.5,
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
              borderRadius: 20
            }}
          >
            <ScrollView>
              <View>
                <Text>Privacy Policy</Text>
              </View>
            </ScrollView>
            <TouchableOpacity
              onPress={() => this.setState({ termsModal: false })}
            >
              <View
                style={{
                  margin: 10,
                  backgroundColor: Constants.Colors.NavyBlue,
                  width: WINDOW_WIDTH / 2.5,
                  padding: 15,
                  alignItems: "center",
                  borderRadius: 20
                }}
              >
                <Text style={{ color: "white" }}>Close</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    let {
      hidePassword,
      firstName,
      lastName,
      employeeId,
      email,
      password,
      emailError,
      passwordError,
      employeeIdError,
      firstNameError,
      lastNameError,
      invitationCode,
      invitationCodeError,
      agencyId,
      agencyCode,
      agencyCodeError,
      isVerified,
      showDOB,
      dateOfBirth,
      dateOfBirthError,
      showDOJ,
      dateOfJoining,
      dateOfJoiningError,
      address,
      addressError,
      street,
      streetError,
      zip,
      zipError,
      city,
      cityError,
      stateAdd,
      stateError,
      mobile,
      mobileError,
      isDatePickerVisible,
      isDatePickerJoinVisible,
      locations,
      location,
      locationError
    } = this.state;
    let locationNames =
      locations.length !== 0 && locations.map(location => location.name);
    let {
      loader: { signupLoader, getCodeInfoLoader }
    } = this.props;
    return (
      <View style={styles.container}>
        <Header
          title={"Sign Up"}
          hideBack={!isVerified ? true : false}
          auth={true}
          hideDrawer={true}
          color={Constants.Colors.AuthYellow}
          onBackPress={() => this.setState({ isVerified: !isVerified })}
        ></Header>
        {this.renderModal()}
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={"handled"}
          style={styles.scrollStyle}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{}}
        >
          <View style={{ paddingLeft: 20, paddingRight: 20 }}>
            <View style={styles.signInView}></View>
            <View style={styles.paddingInputText}>
              <View>
                {isVerified ? (
                  <FloatingInput
                    ref={ref => (this.invitationCode = ref)}
                    inputWrapper={styles.inputWrapper}
                    label={"Verification/Invitation Code"}
                    value={invitationCode}
                    onChangeText={invitationCode => {
                      this.setState({
                        invitationCode,
                        invitationCodeError: ""
                      });
                      if (invitationCode.length > 7) {
                        console.log(
                          "invitationCode Length Exceeded",
                          invitationCode
                        );
                        setTimeout(() => {
                          this.verificationCodeCheckApi();
                        }, 100);
                      }
                    }}
                    onSubmitEditing={() => {
                      this.focusNext("firstName");
                    }}
                    returnKey={"next"}
                    error={invitationCodeError}
                  />
                ) : null}
                <FloatingInput
                  // container={[styles.nameField, styles.marginRightName]}
                  inputWrapper={styles.inputWrapper}
                  ref={ref => (this.firstName = ref)}
                  label={"First Name"}
                  value={firstName}
                  editable={isVerified ? false : undefined}
                  onChangeText={firstName => {
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
                  ref={ref => (this.lastName = ref)}
                  label={"Last Name"}
                  value={lastName}
                  editable={isVerified ? false : undefined}
                  onChangeText={lastName => {
                    this.setState({ lastName, lastNameError: "" });
                  }}
                  onSubmitEditing={() => {
                    this.focusNext("employeeId");
                  }}
                  returnKey={"next"}
                  error={lastNameError}
                />
                <FloatingInput
                  ref={ref => (this.employeeId = ref)}
                  inputWrapper={styles.inputWrapper}
                  label={"Employee Id"}
                  value={employeeId}
                  editable={isVerified ? false : undefined}
                  onChangeText={employeeId => {
                    this.setState({ employeeId, employeeIdError: "" });
                  }}
                  onSubmitEditing={() => {
                    this.focusNext("email");
                  }}
                  returnKey={"next"}
                  error={employeeIdError}
                />
                <FloatingInput
                  ref={ref => (this.email = ref)}
                  inputWrapper={styles.inputWrapper}
                  label={"E-mail"}
                  autoCapitalize={"none"}
                  editable={isVerified ? false : undefined}
                  value={email}
                  onChangeText={email => {
                    this.setState({ email, emailError: "" });
                  }}
                  onSubmitEditing={() => {
                    isVerified
                      ? this.focusNext("password")
                      : this.focusNext("mobile");
                  }}
                  keyboardType={"email-address"}
                  returnKey={"next"}
                  error={emailError}
                />
              </View>
              {isVerified ? (
                <View>
                  <FloatingInput
                    ref={ref => (this.password = ref)}
                    inputWrapper={styles.inputWrapper}
                    label={"Password"}
                    autoCapitalize={"none"}
                    value={password}
                    onChangeText={password => {
                      this.setState({ password, passwordError: "" });
                    }}
                    icon={
                      <Icon
                        name={!hidePassword ? "eye" : "eye-slash"}
                        size={20}
                      />
                    }
                    secureTextEntry={hidePassword}
                    onIconPress={this.showPassword}
                    returnKey={"next"}
                    onSubmitEditing={() => {
                      this.focusNext("dateOfBirth");
                    }}
                    error={passwordError}
                  />
                  <SimpleDropdown
                    placeHolder="Location"
                    drowdownArray={locationNames}
                    style={styles.simpleDropdownStyle}
                    textStyle={styles.dropDownText}
                    iconColor={Constants.Colors.Black}
                    onSelect={index => {
                      this.setState({
                        location: locations[index]._id,
                        locationError: ""
                      });
                    }}
                    showDropDown={
                      locations && locations.length === 0 ? false : true
                    }
                  />
                  {locationError ? (
                    <Text
                      style={{ paddingTop: moderateScale(10), color: "red" }}
                    >
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
                      ref={ref => (this.dateOfBirth = ref)}
                      inputWrapper={styles.inputWrapper}
                      label={"Date Of Birth"}
                      value={showDOB}
                      key={"showDOB" + showDOB}
                      editable={false}
                      onChangeText={dateOfBirth => {
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
                      dateOfJoining === ""
                        ? new Date()
                        : new Date(dateOfJoining)
                    }
                    onCancel={() => this.handleJoinCancel()}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({ isDatePickerJoinVisible: true })
                    }
                  >
                    <FloatingInput
                      ref={ref => (this.dateOfJoining = ref)}
                      inputWrapper={styles.inputWrapper}
                      label={"Date Of Joining"}
                      value={showDOJ}
                      key={"showDOJ" + showDOJ}
                      editable={false}
                      pointerEvents="none"
                      onChangeText={dateOfJoining => {
                        this.setState({
                          dateOfJoining,
                          dateOfJoiningError: ""
                        });
                      }}
                      onSubmitEditing={() => {
                        this.focusNext("address");
                      }}
                      returnKey={"next"}
                      error={dateOfJoiningError}
                    />
                  </TouchableOpacity>
                  <FloatingInput
                    ref={ref => (this.address = ref)}
                    inputWrapper={styles.inputWrapper}
                    label={"Address"}
                    value={address}
                    onChangeText={address => {
                      this.setState({ address, addressError: "" });
                    }}
                    onSubmitEditing={() => {
                      this.focusNext("street");
                    }}
                    returnKey={"next"}
                    error={addressError}
                  />
                  <FloatingInput
                    ref={ref => (this.street = ref)}
                    inputWrapper={styles.inputWrapper}
                    label={"Street"}
                    value={street}
                    onChangeText={street => {
                      this.setState({ street, streetError: "" });
                    }}
                    onSubmitEditing={() => {
                      this.focusNext("city");
                    }}
                    returnKey={"next"}
                    error={streetError}
                  />
                  <FloatingInput
                    ref={ref => (this.city = ref)}
                    inputWrapper={styles.inputWrapper}
                    label={"City"}
                    value={city}
                    onChangeText={city => {
                      this.setState({ city, cityError: "" });
                    }}
                    onSubmitEditing={() => {
                      this.focusNext("stateAdd");
                    }}
                    returnKey={"next"}
                    error={cityError}
                  />
                  <FloatingInput
                    ref={ref => (this.stateAdd = ref)}
                    inputWrapper={styles.inputWrapper}
                    label={"State"}
                    value={stateAdd}
                    onChangeText={stateAdd => {
                      this.setState({ stateAdd, stateError: "" });
                    }}
                    onSubmitEditing={() => {
                      this.focusNext("zip");
                    }}
                    returnKey={"next"}
                    error={stateError}
                  />
                  <FloatingInput
                    ref={ref => (this.zip = ref)}
                    inputWrapper={styles.inputWrapper}
                    label={"Zip"}
                    value={zip}
                    onChangeText={zip => {
                      this.setState({ zip, zipError: "" });
                    }}
                    onSubmitEditing={() => {
                      this.focusNext("mobile");
                    }}
                    returnKey={"next"}
                    error={zipError}
                  />
                </View>
              ) : null}
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  paddingBottom: 10
                }}
              >
                <View style={{}}>
                  <Text
                    style={{
                      height: 55,
                      width: 35,
                      fontSize: moderateScale(17),
                      fontFamily: "Helvetica",
                      paddingTop: 20,
                      paddingBottom: 0,
                      marginRight: 10
                    }}
                  >
                    +91
                  </Text>
                </View>
                <TextInputMask
                  style={[
                    styles.mobileInputWrapper,
                    {
                      color: isVerified
                        ? Constants.Colors.CoolGray
                        : Constants.Colors.DarkGray
                    }
                  ]}
                  refInput={ref => {
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
                        cb => {
                          console.log("responseMobileCheck", cb);
                          if (!cb.mobileAvailable) {
                            this.setState({
                              mobileError: "Mobile Number already registered"
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
                  placeholderTextColor="gray"
                  value={mobile}
                  editable={isVerified ? false : true}
                  keyboardType={"number-pad"}
                  mask={"([000]) [000] [00] [00]"} //{"+1 ([000]) [000] [00] [00]"}
                />
              </View>
              {mobileError ? (
                <Text style={{ paddingTop: moderateScale(10), color: "red" }}>
                  {mobileError}
                </Text>
              ) : null}
              {!isVerified ? (
                <FloatingInput
                  ref={ref => (this.agencyCode = ref)}
                  inputWrapper={styles.inputWrapper}
                  label={"Agency Code"}
                  value={agencyCode}
                  editable={isVerified ? false : undefined}
                  onChangeText={agencyCode => {
                    this.setState({ agencyCode, agencyCodeError: "" });
                  }}
                  onSubmitEditing={() => {
                    isVerified ? this.SignUp() : this.validateMobileLinkage();
                  }}
                  returnKey={"done"}
                  error={agencyCodeError}
                />
              ) : null}
            </View>
            <View style={{ padding: moderateScale(10) }} />
            {this.state.isVerified ? (
              <View style={styles.forgotView}>
                <Text style={styles.forgotTextBlack}>
                  {"By signing up you agree to"}{" "}
                  {/* <Text style={styles.forgotText}>Ajivar</Text> {"'s"} */}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={() => this.setState({ termsModal: true })}
                  >
                    <Text style={styles.forgotText}>Terms of Service</Text>
                  </TouchableOpacity>
                  <Text style={styles.forgotTextBlack}>and</Text>
                  <TouchableOpacity
                    onPress={() => this.setState({ termsModal: true })}
                  >
                    <Text style={styles.forgotText}>Privacy Policy</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}

            <View style={styles.stylesAuthContainer}>
              <AuthButton
                buttonName={
                  !isVerified
                    ? "Continue"
                    : !signupLoader
                    ? "Sign Up"
                    : "Signing Up..."
                }
                disabled={signupLoader}
                buttonStyle={styles.signUpButtonStyle}
                textStyle={styles.textStyle}
                paddingTop={true}
                gradientStyle={styles.gradientStyle}
                onPress={isVerified ? this.SignUp : this.validateMobileLinkage}
              />
            </View>
            <View style={styles.signUpView}>
              <TouchableOpacity
                style={styles.signUpButton}
                onPress={() =>
                  this.props.AppAction.pushToParticularScreen(
                    this.props.componentId,
                    "SignIn"
                  )
                }
              >
                <Text style={styles.signUpText}>
                  Already have an account - Sign in here
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {(signupLoader || getCodeInfoLoader) && (
            <MyActivityIndicator size="large" />
          )}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  app: state.app,
  loader: state.loader
});
const mapDispatchToProps = dispatch => ({
  AppAction: bindActionCreators(AppAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpCustom);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Constants.Colors.AuthYellow },
  scrollStyle: {
    flex: 1
  },
  signUpButtonStyle: {
    backgroundColor: "red",
    width: moderateScale(140),
    height: moderateScale(40)
  },

  gradientStyle: {
    borderRadius: moderateScale(20)
  },
  textStyle: {
    textAlign: "center",
    fontFamily: "Charter",
    fontWeight: "bold",
    fontSize: moderateScale(18)
  },
  paddingInputText: {
    paddingHorizontal: moderateScale(20)
  },
  forgotView: {
    justifyContent: "center",
    alignItems: "center",

    marginTop: moderateScale(10),
    marginHorizontal: moderateScale(20)
  },
  inputWrapper: {
    // borderBottomWidth: moderateScale(1),
    // borderBottomColor: Constants.Colors.Gray,
    fontFamily: "Charter",
    fontWeight: "normal",
    height: moderateScale(45)
  },
  mobileInputWrapper: {
    borderBottomWidth: moderateScale(1),
    borderBottomColor: Constants.Colors.Gray,
    fontSize: moderateScale(16),
    fontFamily: "Helvetica",
    height: moderateScale(55),
    color: Constants.Colors.DarkGray,
    flex: 1
  },
  stylesAuthContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: moderateScale(10)
  },
  nameField: {
    width: Constants.BaseStyle.DEVICE_WIDTH * 0.375
  },

  marginRightName: { marginRight: Constants.BaseStyle.DEVICE_WIDTH * 0.02 },

  marginLeftName: { marginLeft: Constants.BaseStyle.DEVICE_WIDTH * 0.02 },

  nameContainer: {
    flexDirection: "row"
  },
  signUpView: {
    backgroundColor: "white",
    // width: Constants.BaseStyle.DEVICE_WIDTH - moderateScale(2),
    borderColor: Constants.Colors.Gray,
    borderWidth: moderateScale(1),
    paddingVertical: moderateScale(4),
    marginTop: moderateScale(25),
    marginHorizontal: moderateScale(1)
  },

  signUpButton: {
    // margin: moderateScale(5),
    // padding: moderateScale(20)
  },

  signUpText: {
    fontSize: Constants.BaseStyle.isIphoneX
      ? moderateScale(21)
      : moderateScale(19),
    color: "gray",
    // fontFamily: "Charter",
    textAlign: "center"
  },

  forgotButton: {
    paddingTop: moderateScale(5),
    paddingBottom: moderateScale(20)
  },

  signInText: {
    fontSize: moderateScale(28),
    color: Constants.Colors.Black
    // fontWeight: Platform.OS == "ios" ? "bold" : "bold",
    // fontFamily: "Cochin",
    // fontFamily: Platform.OS == "ios" ? "Cochin-Bold" : "CochinBold"
    //PT Serif
  },
  signInView: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: moderateScale(20)
  },
  forgotText: {
    color: Constants.Colors.Black,
    fontSize: Constants.BaseStyle.isIphoneX
      ? moderateScale(17)
      : moderateScale(15),
    // fontFamily: "Charter",

    fontWeight: "bold"
  },
  forgotTextBlack: {
    fontSize: Constants.BaseStyle.isIphoneX
      ? moderateScale(17)
      : moderateScale(15),
    paddingHorizontal: Constants.BaseStyle.isIphoneX
      ? moderateScale(5)
      : moderateScale(2)
    // fontFamily: "Charter"
    // fontWeight: "normal"
  },
  simpleDropdownStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: Constants.Colors.Gray,
    width: moderateScale(300),
    height: moderateScale(55),
    paddingHorizontal: moderateScale(0)
  },
  dropDownText: {
    ...Constants.Fonts.light,
    fontSize: moderateScale(17),
    fontFamily: "Helvetica",
    color: Constants.Colors.Black,
    textAlign: "left"
  }
});
