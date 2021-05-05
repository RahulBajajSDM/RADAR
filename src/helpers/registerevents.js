/*
 * @file: registerevets.js
 * @description: this file will be used to regiseter all events required in the app
 * @author: Suraj Sanwal
 * */
/* eslint-disable */
import { NetInfo, BackHandler, Platform } from "react-native";
import { handleBackPress } from "../utilities/BackButtonHandling";
import { Navigation } from "react-native-navigation";
import _ from "lodash";
import Event from "../utilities/Events";
import { selectTab, selectedScreen } from "../actions/app";
var sideMenu = false;

var Events = {
  RegisterNetEvents: () => {
    let handleFirstConnectivityChange = () => {
      NetInfo.isConnected.removeEventListener(
        "connectionChange",
        handleFirstConnectivityChange
      );
    };
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      handleFirstConnectivityChange
    );
    NetInfo.isConnected.fetch().then(res => {
      console.log("connectionChange====>", res);
    });
  },

  RegisterComponentDidAppearListener: store => {
    Navigation.events().registerComponentDidAppearListener(
      ({ componentId, componentName }) => {
        console.log("componentNamecomponentName", componentName, componentId);
        if (
          componentName == "Tab1" ||
          componentName == "Tab2" ||
          componentName == "Tab3" ||
          componentName == "Tab4" ||
          componentName == "Tab5"
        ) {
          store.dispatch(selectTab(componentId));
        }
        store.dispatch(selectedScreen(componentId, componentName));
        if (Platform.OS === "android") {
          let { backHandlingScreens } = store.getState().app;

          var index = _.findIndex(
            backHandlingScreens,
            screen => screen === componentName
          );
          if (index !== -1) {
            BackHandler.addEventListener("hardwareBackPress", handleBackPress);
          } else {
            BackHandler.removeEventListener(
              "hardwareBackPress",
              handleBackPress
            );
          }
        }
      }
    );
    Navigation.events().registerComponentDidDisappearListener(
      ({ componentId, componentName }) => {
        if (sideMenu) {
          Navigation.mergeOptions(componentId, {
            sideMenu: {
              right: {
                visible: false
              }
            }
          });
          sideMenu = false;
        }
        if (componentId === "sideDrawer") {
          sideMenu = true;
        }

        // }
      }
    );
  }
};
module.exports = Events;
