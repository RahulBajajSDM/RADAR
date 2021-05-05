/**
 * @format
 */

import { Navigation } from "react-native-navigation";
import { registerScreens } from "./src/config/routes";
import { addListeners } from "./src/helpers/listeners";
import Events from "./src/helpers/registerevents";
import setup from "./src/store/setup";
Navigation.events().registerAppLaunchedListener(() => {
  const store = setup();
  registerScreens(store);
  // Events.RegisterNetEvents();
  Events.RegisterComponentDidAppearListener(store);
  addListeners();
  Navigation.setDefaultOptions({
    topBar: {
      visible: false,
      drawBehind: true
    },
    bottomTabs: {
      visible: false,
      animate: true,
      drawBehind: false
    }
  });
});
