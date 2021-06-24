import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  Dimensions,
  ScrollView,
  Image,
  DeviceEventEmitter,
  Platform,
  PermissionsAndroid,
  AppState,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import {
  configureLocationTracker,
  removeLocationTracker,
  getDistanceFromLatLonInKm,
  configureLocationStateHandler,
  removeLocationStateListener,
  configureBackgroundLocationTracker,
  calculateUserinPolygon,
} from "../../../helpers/LocationTracker";
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import BluetoothStateManager, {
  BluetoothState,
} from "react-native-bluetooth-state-manager";
import BackgroundGeolocation from "@mauron85/react-native-background-geolocation";
import GeoFencing from "react-native-geo-fencing";

import {
  getHotspotsApi,
  updateHotspots,
  createEmployeesActivitiesApi,
  getAarogyaUserStatus,
  getAarogyaUserStatusByRequestId,
  saveArogyaRequestIdApi,
  employeesLastActiveApi,
  careteDashboardAlerts,
  getArogyaUserStatus,
  getArogyaUserStatusByRequestId,
} from "../../../actions/Home/index";
import {
  moderateScale,
  widthScale,
  heightScale,
} from "../../../helpers/ResponsiveFonts";
import constants from "../../../constants";
import { pushToParticularScreen, getAarogyaToken } from "../../../actions";
import MyActivityIndicator from "../../../components/common/MyActivityIndicator";
import moment from "moment";
import hotspots from "../../../reducers/hotspots";
import jwt_decode from "jwt-decode";
import { getSocket } from "../../../helpers/AppSocket";
const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;
let location_count = 0;
let location_Android = 0;
class Tab3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      region: {},
      hotspots: [],
      userAarogyaRequestStatus: "",
      userAarogyaStatus: {},
      showBLEModal: false,
      arogyaSetuButton: false,
    };
    this.socket = getSocket();
    AppState.addEventListener("change", this._handleAppStateChange);

    DeviceEventEmitter.addListener(
      "locationProviderStatusChange",
      this.handleWhenLocationsChanged
    );
  }
  _handleAppStateChange = (nextAppState) => {
    console.log("location_off", location_count);
    if (nextAppState === "active") {
      console.log("App has come to the foreground!");
      if (Platform.OS == "ios") {
        // this.performApiCall();
        // console.log("here");
        BackgroundGeolocation.getCurrentLocation(
          (lastLocation) => {
            console.log("locationData", lastLocation);
            location_count = 0;
            this.performApiCall();
          },
          (error) => {
            setTimeout(() => {
              console.log(
                "Error obtaining current location",
                JSON.stringify(error)
              );
              if (location_count == 0) {
                location_count = 1;
                console.log("location_off", location_count);
                this.handleBlueTooth_LocationStatus("location");
              }
              // this.performApiCall();
            }, 100);
          },
          { timeout: 15000, enableHighAccuracy: true, maximumAge: 3600000 }
        );
      }
    }
  };
  async componentDidMount() {
    // let {
    //   user: { userData },
    //   hotspots: { hotspotsArr },
    // } = this.props;
    // let param = { agencyId: userData.agencyId._id };
    // let newDateTimestamp = new Date().getTime();
    // let lastActiveParams = {
    //   _id: userData.id,
    //   lastActive: newDateTimestamp,
    // };

    // console.log("cdm called", renderCall);

    // renderCall = renderCall + 1;
    // this.performApiCall();

    await this.configureLocation();

    /** ---------------------------------------------------------------- */
    //blueToth Directly on Tested on Android
    await this.requestBlueoothAccess();

    setTimeout(() => {
      this.bluetoothStateChangeSubscription = BluetoothStateManager.onStateChange(
        this.onBluetoothStateChange,
        true
      );
    }, 5000);
  }
  async performApiCall() {
    console.log(
      "PerformApi Call called ******************************************"
    );
    let {
      user: { userData },
      hotspots: { hotspotsArr },
    } = this.props;
    let param = { agencyId: userData.agencyId._id };
    let newDateTimestamp = new Date().getTime();
    let lastActiveParams = {
      _id: userData.id,
      lastActive: newDateTimestamp,
    };
    await this.props.employeesLastActiveApi(
      lastActiveParams,
      this.props.componentId
    );
    await this.getHotspotsApi();

    this.socket.on("add_hotspot", (data) => {
      this.getHotspotsApi();
    });
    this.socket.on("update_hotspot", (data) => {
      this.getHotspotsApi();
    });
    this.socket.on("delete_hotspot", (data) => {
      this.getHotspotsApi();
    });
  }

  requestBlueoothAccess = async () => {
    if (Platform.OS == "android") {
      BluetoothStateManager.enable()
        .then((result) => {
          console.log("response", result);
        })
        .catch((error) => {
          console.log("error", error);
        });
    } else {
      BluetoothStateManager.getState().then((bluetoothState) => {
        console.log("bluetoothState", bluetoothState);
        if (bluetoothState == "PoweredOff" || bluetoothState == "Unknown") {
          console.log("show Lert ");
          Alert.alert(
            `Radar`,
            `Please turn on your bluetooth for better results`,
            [
              {
                text: "OK",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
            ]
          );
        }
      });
    }
  };

  onBluetoothStateChange = (bluetoothState) => {
    console.log("state bluetooth", bluetoothState);
    // this.setState({ bluetooth_status: bluetoothState });
    if (bluetoothState == "PoweredOff") {
      this.handleBlueToothAction();
    }
  };

  handleBlueToothAction = async () => {
    console.log("handle Action when bluetooth is Off ");
    this.handleBlueTooth_LocationStatus("bluetooth");
  };

  //---------------------configureBackground Location
  configureLocation = async () => {
    console.log("config started -------------------------------");
    // await configureBackgroundLocationTracker();
    // configureLocationTracker((locationsCb) => {
    //   console.log("location call back ", locationsCb);
    //   // if (locationsCb == false) {
    //   //   this.handleBlueTooth_LocationStatus("location");
    //   // }
    // });
    this.getLocation();
  };

  handleWhenLocationsChanged = async (status) => {
    console.log("status", status);
    if (!status.enabled) {
      console.log("sendDenied in Api");
      location_Android += 1;
      this.handleBlueTooth_LocationStatus("location");
    } else {
      location_Android = 0;
    }
  };

  getLocation = async () => {
    if (Platform.OS == "android") {
      this.requestLocationPermission();
    } else {
      BackgroundGeolocation.getCurrentLocation(
        (lastLocation) => {
          console.log("locationData", lastLocation);
          this.performApiCall();
        },
        (error) => {
          setTimeout(() => {
            console.log(
              "Error obtaining current location",
              JSON.stringify(error)
            );
            this.handleBlueTooth_LocationStatus("location");
            this.performApiCall();
          }, 100);
        },
        { timeout: 15000, enableHighAccuracy: true, maximumAge: 3600000 }
      );
    }
  };

  //-------------Request Android Location Permission
  requestLocationPermission = async () => {
    console.log("authorization started -------------------------------");
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      console.log("granted", granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location");
        this.checkForLocationProvider();
      } else {
        console.log("Location permission denied");
        // this.enableLocations();
        this.handleBlueTooth_LocationStatus("location");
        // this.performApiCall();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  checkForLocationProvider = async () => {
    BackgroundGeolocation.checkStatus((status) => {
      console.log(
        "[INFO] BackgroundGeolocation services enabled",
        status.locationServicesEnabled
      );
      if (!status.locationServicesEnabled) {
        console.log("we need to have location android menu enable");
        this.enableLocations();
        // this.performApiCall();
      } else {
        console.log("all is fine , u can send the location to server");
        this.enableLocations();
        // this.performApiCall();
      }
    });
  };

  handleBlueTooth_LocationStatus = (fields) => {
    console.log("param that is Off", fields);

    let {
      user: { userData },
    } = this.props;

    let params = {
      employeeId: userData.id,
      type: fields,
    };
    if (fields == "bluetooth") {
      this.props.careteDashboardAlerts(params, (cb) => {
        console.log("hello", cb);
      });
    } else {
      console.log(location_Android, "location_Android");
      if (Platform.OS == "android") {
        if (location_Android == 1) {
          this.props.careteDashboardAlerts(params, (cb) => {
            console.log("hello", cb);
            location_Android = 0;
          });
        }
      } else {
        this.props.careteDashboardAlerts(params, (cb) => {
          console.log("hello", cb);
        });
      }
    }
  };

  componentWillUnmount() {
    DeviceEventEmitter.removeListener("locationProviderStatusChange");
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  enableLocations() {
    configureLocationStateHandler()
      .then((suceess) => {
        console.log("success oof Location Check", suceess);
        //--------------------------------- 'send yes to api that user has accepted the permission'
        setTimeout(() => {
          BackgroundGeolocation.getCurrentLocation(
            (lastLocation) => {
              console.log("locationData", lastLocation);
              this.performApiCall();
            },
            (error) => {
              setTimeout(() => {
                console.log(
                  "Error obtaining current location",
                  JSON.stringify(error)
                );
                this.handleBlueTooth_LocationStatus("location");
                this.performApiCall();
              }, 100);
            },
            { timeout: 15000, enableHighAccuracy: true, maximumAge: 3600000 }
          );
        }, 1000);
      })
      .catch((error) => {
        console.log("error oof Location Check", error.message);
        //-------------------------'send no to api that user has declined the permission'
        this.handleBlueTooth_LocationStatus("location");
      });
  }

  async getHotspotsApi() {
    console.log("HOTSPOT method called -------------------------");
    let {
      user: { userData },
      hotspots: { hotspotsArr },
    } = this.props;
    let param = { agencyId: userData.agencyId._id };

    this.props.getHotspotsApi(
      param,
      this.props.componentId,
      hotspotsArr,
      (_) => {
        configureLocationTracker((locationsCb) => {
          console.log("location call back ", locationsCb);
          if (locationsCb == false) {
            this.handleBlueTooth_LocationStatus("location");
          } else {
            var hotspotsData = Object.assign({}, this.props.hotspots);
            var { hotspotsArr } = hotspotsData;
            var hotspotsArray = [...hotspotsArr];

            this.setState({ hotspots: hotspotsArray });
            this.setState({ locations: locationsCb });
            let array = [];
            let current_loc = {
              lat: locationsCb[0].latitude,
              lng: locationsCb[0].longitude,
            };

            hotspotsArr.forEach((hotspotVal) => {
              var hotspot = { ...hotspotVal };
              console.log("hotspot type ==--------------", hotspot.type);

              if (hotspot.type != undefined) {
                console.log("checking the tyope of Polygon ");
                if (hotspot.type == "Polygon") {
                  if (hotspot.pointList != undefined) {
                    console.log("checking the pointList of Polygon ");
                    console.log("currentHotsPot", hotspot);
                    console.log("current_loc", current_loc);

                    if (hotspot.pointList.length > 0) {
                      console.log("pointlist length is greater than 0");
                      calculateUserinPolygon(
                        hotspot.pointList,
                        current_loc
                      ).then((result) => {
                        console.log("result of point in polygon", result);
                        if (result) {
                          if (hotspot.isEntered !== true) {
                            hotspot.isEntered = true;
                            this.hitEnteredExitedApi(hotspot);
                          }
                        } else {
                          /* isEntered: true - Exit Record inserted*/
                          if (hotspot.isEntered === true) {
                            hotspot.isEntered = false;
                            this.hitEnteredExitedApi(hotspot);
                          }
                        }
                      });
                    } else {
                      console.log("pointLs=ist length is less than 0 ");
                    }
                  }
                } else if (hotspot.type == "Circle") {
                  console.log("point type is circle ");
                  let dis = getDistanceFromLatLonInKm(
                    hotspot.coordinate.lat,
                    hotspot.coordinate.lng,
                    locationsCb[0].latitude,
                    locationsCb[0].longitude
                  );
                  hotspot.dis = dis;
                  // console.log("distanceCalc", dis);
                  // console.log("hotspotVal", hotspot);
                  if (dis * 1000 <= hotspot.radius) {
                    /* isEntered: false or null - Enter Record inserted*/
                    if (hotspot.isEntered !== true) {
                      hotspot.isEntered = true;
                      this.hitEnteredExitedApi(hotspot);
                    }
                  } else {
                    /* isEntered: true - Exit Record inserted*/
                    if (hotspot.isEntered === true) {
                      hotspot.isEntered = false;
                      this.hitEnteredExitedApi(hotspot);
                    }
                  }
                }
              } else {
                console.log("type is undefined");
                let dis = getDistanceFromLatLonInKm(
                  hotspot.coordinate.lat,
                  hotspot.coordinate.lng,
                  locationsCb[0].latitude,
                  locationsCb[0].longitude
                );
                hotspot.dis = dis;
                // console.log("distanceCalc", dis);
                // console.log("hotspotVal", hotspot);
                if (dis * 1000 <= hotspot.radius) {
                  /* isEntered: false or null - Enter Record inserted*/
                  if (hotspot.isEntered !== true) {
                    hotspot.isEntered = true;
                    this.hitEnteredExitedApi(hotspot);
                  }
                } else {
                  /* isEntered: true - Exit Record inserted*/
                  if (hotspot.isEntered === true) {
                    hotspot.isEntered = false;
                    this.hitEnteredExitedApi(hotspot);
                  }
                }
              }

              // if (hotspot.pointList != undefined) {
              // } else {
              // }
              array.push(hotspot);
            });
            console.log("array is .............", array);
            setTimeout(() => {
              this.props.updateHotspots(array);
              this.setState({ hotspots: array });
            }, 2000);
          }
        });
      }
    );
  }
  hitArogyaSetuUserStatusApiNew() {
    let {
      user: { userData },
      aarogyaSetu,
    } = this.props;
    this.setState({ arogyaSetuButton: true });
    this.props.getArogyaUserStatus(
      { employeeId: userData.id },
      this.props.componentId,
      (cb) => {
        console.log("cb", cb);
        if (cb.status == 200) {
          //pending
          this.setState({
            arogyaSetuButton: true,
            userAarogyaRequestStatus: "Pending",
            userAarogyaStatus: "",
          });
          console.log("arogyasetuId", cb.data.arogyaRequestIds);

          var refreshIntervalId = setInterval(() => {
            //hit the Api to show the status
            this.props.getArogyaUserStatusByRequestId(
              cb.data.arogyaRequestIds,
              (cb) => {
                console.log("Response of getArogyaUserStatusByRequestId", cb);

                // this.setState({
                //   userAarogyaRequestStatus: cb.request_status,
                // });
                if (cb.status == 200) {
                  if (cb.data.request_status !== "Pending") {
                    clearInterval(refreshIntervalId);
                    if (cb.data.request_status == "Denied") {
                      this.setState({
                        userAarogyaStatus: "",
                        arogyaSetuButton: false,
                        userAarogyaRequestStatus: cb.data.request_status,
                      });
                    } else if (cb.data.request_status == "Approved") {
                      let token = cb.data.as_status;
                      if (token !== "") {
                        var decoded = jwt_decode(token);
                        console.log(decoded);
                        this.setState({
                          userAarogyaStatus: cb.data.as_status,
                          arogyaSetuButton: false,
                          userAarogyaRequestStatus: cb.data.decodedData.message,
                        });
                      }
                    }
                  } else {
                    this.setState({ userAarogyaStatus: "" });
                  }
                }
              }
            );
          }, 5000);
        } else {
          this.setState({
            arogyaSetuButton: false,
            userAarogyaRequestStatus: cb.data.error.error_message,
          });
          //message
        }
      }
    );
  }

  hitArogyaSetuUserStatusApi() {
    let {
      user: { userData },
      aarogyaSetu,
    } = this.props;
    this.setState({
      userAarogyaRequestStatus: "Pending",
      userAarogyaStatus: "",
    });
    console.log("aarogyaSetuaa", aarogyaSetu);
    if (aarogyaSetu && aarogyaSetu.details) {
      let newDate = new Date().getTime();
      let userParam = {
        phone_number: "+91" + userData.mobile,
        trace_id: "trace_id_" + userData.firstName + "_" + newDate,
        reason: "Asked By " + userData.agencyId.agencyCode,
      };
      this.props.getAarogyaUserStatus(
        userParam,
        this.props.componentId,
        aarogyaSetu.details.token,
        (cb) => {
          if (cb.requestId) {
            this.props.saveArogyaRequestIdApi(
              { _id: userData.id, request_id: cb.requestId },
              this.props.componentId
            );
            var refreshIntervalId = setInterval(() => {
              this.props.getAarogyaUserStatusByRequestId(
                { requestId: cb.requestId },
                aarogyaSetu.details.token,
                (cb) => {
                  console.log("Response111", cb);
                  this.setState({
                    userAarogyaRequestStatus: cb.request_status,
                  });
                  if (cb.request_status !== "Pending") {
                    clearInterval(refreshIntervalId);
                    let token = cb.as_status;
                    if (token !== "") {
                      var decoded = jwt_decode(token);
                      console.log(decoded);
                      this.setState({ userAarogyaStatus: decoded.as_status });
                    }
                  } else {
                    this.setState({ userAarogyaStatus: "" });
                  }
                }
              );
            }, 5000);
          } else {
            if (cb.message === "The incoming token has expired") {
              this.props.getAarogyaToken(
                {
                  username: "gurdevs@smartdatainc.net",
                  password: "Thur$day@2019",
                },
                this.props.componentId,
                (cb) => {
                  this.hitArogyaSetuUserStatusApi();
                }
              );
            }
            this.setState({
              userAarogyaRequestStatus: cb.error_message,
              userAarogyaStatus: "",
            });
          }
        }
      );
    }
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
      type: hotspot.isEntered ? "enter" : "exit",
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

    console.log("param", param);
    this.props.createEmployeesActivitiesApi(
      param,
      this.props.componentId,
      (fn) => {
        console.log("enterExitAPIResponse", fn);
      }
    );
  }

  renderModal() {
    return (
      <Modal
        style={{
          backgroundColor: "green",
        }}
        animationType="slide"
        transparent={true}
        visible={this.state.showBLEModal}
      >
        <View
          style={{
            backgroundColor: constants.Colors.AuthYellow,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: WINDOW_WIDTH / 1.1,
              height: WINDOW_HEIGHT / 2.5,
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
              borderRadius: 20,
            }}
          >
            <ScrollView>
              <View>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  Scanning BLE device...
                </Text>
              </View>
            </ScrollView>
            <TouchableOpacity
              onPress={() => this.setState({ showBLEModal: false })}
            >
              <View
                style={{
                  margin: 10,
                  backgroundColor: constants.Colors.NavyBlue,
                  width: WINDOW_WIDTH / 2.5,
                  padding: 15,
                  alignItems: "center",
                  borderRadius: 20,
                }}
              >
                <Text style={{ color: "white" }}>Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    let {
      locations,
      hotspots,
      userAarogyaRequestStatus,
      userAarogyaStatus,
      arogyaSetuButton,
    } = this.state;
    let {
      loader: { getHotspotsLoader },
    } = this.props;
    console.log("location_Android", location_Android);
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <TouchableOpacity
              style={styles.myActivityButton}
              disabled={arogyaSetuButton}
              // onPress={() => this.hitArogyaSetuUserStatusApi()}
              onPress={() => this.hitArogyaSetuUserStatusApiNew()}
              // onPress={() =>
              //   this.props.pushToParticularScreen(
              //     this.props.componentId,
              //     "Questionnaire"
              //   )
              // }
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {"Get Aarogya Setu Status"}
              </Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 20, padding: 20 }}>
              {userAarogyaRequestStatus}
            </Text>
            {userAarogyaStatus.message ? (
              <Text
                style={{
                  fontSize: 20,
                  color: userAarogyaStatus.color_code,
                  paddingBottom: 20,
                }}
              >
                {userAarogyaStatus.message}
              </Text>
            ) : null}
            {/* <TouchableOpacity
              style={styles.myActivityButton}
              onPress={() => this.setState({ showBLEModal: true })}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {"Record temperature"}
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
        {/* {this.renderModal()} */}

        <View style={styles.myActivityContainer}>
          <TouchableOpacity
            style={styles.myActivityButton}
            onPress={() =>
              this.props.pushToParticularScreen(
                this.props.componentId,
                "MyActivity"
              )
            }
          >
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              {constants.Strings.Dashboard.MyActivity}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.topContainer}>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ fontSize: 20, textAlign: "center" }}>
              {locations && locations.length > 0
                ? "Current Coordinates \n " +
                  locations[0].latitude +
                  " \n" +
                  locations[0].longitude
                : ""}
            </Text>
          </View>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={hotspots}
          keyExtractor={(item, index) => "" + index}
          ListEmptyComponent={
            <View style={styles.container}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 20 }}>{"No data found"}</Text>
              </View>
            </View>
          }
          renderItem={({ item, index }) => (
            <View
              style={{
                margin: 10,
                flex: 1,
                backgroundColor: constants.Colors.AuthYellow,
                borderRadius: 10,
                height: 90,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    height: moderateScale(50),
                    alignItems: "flex-start",
                    paddingLeft: 20,
                    paddingTop: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: moderateScale(14),
                      color: constants.Colors.Black,
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    Hotspot Name: {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: moderateScale(14),
                      color: constants.Colors.Black,
                    }}
                  >
                    Address: {item.address}
                  </Text>
                  <Text
                    style={{
                      fontSize: moderateScale(14),
                      color: constants.Colors.Black,
                    }}
                  >
                    Distance: {item.dis === 0 ? "--" : item.dis.toFixed(2)} Km
                  </Text>
                  <Text
                    style={{
                      fontSize: moderateScale(14),
                      color: constants.Colors.Black,
                    }}
                  >
                    Radius: {item.radius / 1000} Km
                  </Text>
                </View>
              </View>
            </View>
          )}
        ></FlatList>
        {getHotspotsLoader && <MyActivityIndicator size="large" />}
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  loader: state.loader,
  user: state.user,
  aarogyaSetu: state.aarogyaSetu,
  hotspots: state.hotspots,
});

const mapDispatchToProps = {
  getHotspotsApi,
  updateHotspots,
  createEmployeesActivitiesApi,
  getAarogyaUserStatus,
  getAarogyaUserStatusByRequestId,
  saveArogyaRequestIdApi,
  pushToParticularScreen,
  getAarogyaToken,
  employeesLastActiveApi,
  careteDashboardAlerts,
  getArogyaUserStatus,
  getArogyaUserStatusByRequestId,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tab3);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  myActivityContainer: {
    alignItems: "flex-end",
    padding: moderateScale(20),
  },
  myActivityButton: {
    backgroundColor: constants.Colors.AuthYellow,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  topContainer: {
    height: 100,
  },
});
