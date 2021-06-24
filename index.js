/**
 * @format
 */

import { Navigation } from "react-native-navigation";
import { registerScreens } from "./src/config/routes";
import { addListeners } from "./src/helpers/listeners";
import Events from "./src/helpers/registerevents";
import setup from "./src/store/setup";
import { Platform, AppRegistry } from "react-native";
import messaging from "@react-native-firebase/messaging";

if (Platform.OS === "android") {
  AppRegistry.registerHeadlessTask(
    "RNFirebaseBackgroundMessage",
    () => NotificationHandler
  );
}
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Message handled in the background!", remoteMessage);
});
const NotificationHandler = async (message) => {
  console.warn("RNFirebaseBackgroundMessage1: ", message);
  return Promise.resolve();
};
Navigation.events().registerAppLaunchedListener(() => {
  const store = setup();
  registerScreens(store);
  // Events.RegisterNetEvents();
  Events.RegisterComponentDidAppearListener(store);
  addListeners();
  Navigation.setDefaultOptions({
    topBar: {
      visible: false,
      drawBehind: true,
    },
    bottomTabs: {
      visible: false,
      animate: true,
      drawBehind: false,
    },
  });
});
