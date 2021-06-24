/**
 * Name :Suraj Sanwal
 * Description: Contains all redux store configuration of app
 * date: 7 Seopt 2018
 */
import { applyMiddleware, createStore, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import SplashScreen from "react-native-splash-screen";
import { Platform } from "react-native";
import * as reducers from "./../reducers";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import { createLogger } from "redux-logger";
import promise from "./promise";
import array from "./array";
import whitelist from "./whitelist";
import { goToAuth, goHome } from "../config/navigation";
import crashlytics from "@react-native-firebase/crashlytics";
import {
  pushNotifificationInit,
  fcmService,
} from "../helpers/pushnotification";
import { localNotificationService } from "../helpers/LocalNotificationService";
import { initsocket } from "../helpers/AppSocket";
import * as types from "../actionTypes";
import { pushToParticularScreen, isIntroScreensWatched } from "../actions";

export const storeObj = {};
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist,
  timeout: null,
};
// import startApp from '../config/navigators'
export default function setup() {
  const isDev = global.isDebuggingInChrome || __DEV__; // eslint-disable-line

  const logger = createLogger();

  const middleware = [applyMiddleware(...[thunk, promise, array, logger])];

  if (isDev) {
    middleware.push(
      applyMiddleware(require("redux-immutable-state-invariant").default())
    );
  }
  const reducer = combineReducers(reducers);

  const persistedReducer = persistReducer(persistConfig, reducer);

  const store = createStore(persistedReducer, {}, compose(...middleware));

  // Attach the store to the Chrome debug window
  // if (global.isDebuggingInChrome) {
  //   // eslint-disable-line
  //   window.store = store;
  // }

  persistStore(store, null, () => {
    console.log("newstore", store.getState());
    if (store.getState().user.isLoggedIn) {
      onSignIn(store.getState().user);
      goHome();
      initsocket(store.dispatch, store.getState);
    }
    //  else if (store.getState().user.isIntroScreenWatched) {
    //   goToAuth("SignUp");
    // }
    else {
      goToAuth("SignIn"); //AppIntro
    }
    if (Platform.OS == "android") {
      SplashScreen.hide();
    }
    // pushNotifificationInit(store);
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);
  });
  // on app loading the persit store loads and we have route from here
  // startApp(store.getState().app.root);
  storeObj.store = store;
  return store;
}

function onRegister(token) {
  console.log("[App] onRegister: ", token);
  storeObj.store.dispatch({
    type: types.SET_FCM_DEVICE_TOKEN,
    payload: token,
  });
}

function onNotification(remoteMessage) {
  // console.log("[App] onNotificationremoteMessage: ", remoteMessage);
  let notify = remoteMessage.notification;
  console.log("[App] onNotification: ", notify);
  const options = {
    soundName: "default",
    playSound: true, //,
    // largeIcon: 'ic_launcher', // add icon large for Android (Link: app/src/main/mipmap)
    // smallIcon: 'ic_launcher' // add icon small for Android (Link: app/src/main/mipmap)
  };
  localNotificationService.showNotification(
    0,
    notify.title,
    notify.body,
    remoteMessage,
    options
  );
}

function onOpenNotification(remoteMessage, state) {
  console.log("[App] onOpenNotification: ", remoteMessage);
  let { selectedScreen, screenName } = storeObj.store.getState().app;
  let message = remoteMessage.data.message;
  let jsonMessage = message && JSON.parse(message);
  if (
    storeObj.store.getState().user.isLoggedIn &&
    jsonMessage.identifier === "Questionnaire"
  ) {
    storeObj.store.dispatch({
      type: types.SAVE_QUESTIONNAIRE_ID,
      payload: jsonMessage.questioinnaireId,
    });
    let timer = 2500;
    console.log(
      "moving to Questionareeeeeee *********************************",
      state === 2 ? timer : state === 1 ? 1500 : 0
    );
    console.log("state is ", state);
    setTimeout(
      () => {
        console.log("print after timer", selectedScreen);
        storeObj.store.dispatch(
          pushToParticularScreen(
            selectedScreen == null ? "Tab3" : selectedScreen,
            "Questionnaire"
          )
        );
      },
      state === 2 ? timer : state === 1 ? 1500 : 0
    );
  } else {
    alert(
      remoteMessage.notification.title + ": " + remoteMessage.notification.body
    );
  }
}

async function onSignIn(user) {
  crashlytics().log("User signed in.");
  await Promise.all([
    crashlytics().setUserId(user.userData.id),
    crashlytics().setAttributes({
      email: user.userData.email,
      firstName: user.userData.firstName,
    }),
  ]);
}
