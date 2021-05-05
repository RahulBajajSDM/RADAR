/*
  eslint-disable
*/
import * as types from "../../actionTypes";
import { Navigation } from "react-native-navigation";

export const pushToParticularScreen = (
  componentId,
  screenNAme,
  passProps = {}
) => {
  return dispatch => {
    Navigation.push(componentId, {
      component: {
        name: screenNAme,
        passProps,
        options: {
          sideMenu: {
            right: {
              visible: false,
              enabled: false
            }
          },
          layout: {
            orientation: ["portrait"]
          }
        }
      }
    });
  };
};

export const pushToParticularScreenBottomTabs = (
  componentId,
  screenNAme,
  passProps = {},
  bottomTabVisible
) => {
  return dispatch => {
    console.log(
      "pushToParticularScreenBottomTabs",
      componentId,
      screenNAme,
      passProps,
      bottomTabVisible
    );
    Navigation.push(componentId, {
      component: {
        name: screenNAme,
        passProps,
        options: {
          sideMenu: {
            right: {
              visible: false,
              enabled: false
            }
          },
          bottomTabs: {
            visible: bottomTabVisible,
            drawBehind: true
          },
          layout: {
            orientation: ["portrait"]
          }
        }
      }
    });
  };
};

export const pushToParticularScreenWithoutBottomTabs = (
  componentId,
  screenNAme,
  passProps = {},
  bottomTabVisible
) => {
  return dispatch => {
    Navigation.setStackRoot(componentId, {
      component: {
        name: screenNAme,
        passProps,
        options: {
          animations: {
            setStackRoot: {
              enabled: true
            }
          },
          sideMenu: {
            right: {
              visible: false,
              enabled: false
            }
          },
          bottomTabs: {
            visible: bottomTabVisible,
            drawBehind: true
          },
          layout: {
            orientation: ["portrait"]
          }
        }
      }
    });
  };
};
export const pop = componentId => {
  return dispatch => {
    Navigation.pop(componentId);
  };
};
export const popToRoot = componentId => {
  return dispatch => {
    Navigation.popToRoot(componentId);
  };
};

/**
 * Navigate to a new page and clear the backstack.
 */
export const resetTo = (screen, componentId) => {
  return dispatch => {
    console.log(screen, componentId);
    Navigation.setStackRoot(componentId, {
      component: {
        name: screen,
        options: {
          topBar: {
            title: {
              text: "Home"
            }
          },
          layout: {
            orientation: ["portrait"]
          }
        }
      }
    });
  };
};

export const mergeOptions = (componentId, draweropen) => {
  return dispatch => {
    Navigation.mergeOptions(componentId, {
      sideMenu: {
        right: {
          visible: draweropen,
          enabled: false
        }
      }
    });
  };
};

export const mergeBottomTabs = (componentId, visible) => {
  return dispatch => {
    Navigation.mergeOptions(componentId, {
      bottomTabs: {
        visible: false,
        drawBehind: false
      }
    });
  };
};

export const tabSelect = (componentId, switchToWhich) => {
  return dispatch => {
    Navigation.mergeOptions(componentId, {
      bottomTabs: {
        currentTabIndex: switchToWhich
      }
    });
  };
};
export const setScrenStack = (componentId, screen, visible) => {
  return dispatch => {
    Navigation.setStackRoot(componentId, {
      component: {
        name: screen,
        options: {
          topBar: {
            title: {
              text: "Home"
            }
          },
          bottomTabs: {
            visible,
            drawBehind: true
          },
          layout: {
            orientation: ["portrait"]
          }
        }
      }
    });
  };
};

/**
 * Internal helper method for setting the redux state
 */
export const navigate = (newScreen: string, reset: boolean) => {
  return {
    type: t.SCREEN,
    screen: newScreen,
    isReset: reset
  };
};

/**
 * Handle Loader
 */

export const handleLoader = loading => {
  return {
    type: types.LOADING,
    payload: loading
  };
};

export const selectTab = selectedtab => {
  return {
    type: types.SELECTED_TAB,
    selectedtab
  };
};

export const selectedScreen = (componentId, componentName) => {
  return {
    type: types.SELECTED_SCREEN,
    componentId: componentId,
    componentName: componentName
  };
};

export const challengeTabPushed = tabPushed => {
  return {
    type: types.CHALLENGE_TAB_PUSHED,
    tabPushed
  };
};

export const endOfValidationTimestampSet = endOfValidationTimestamp => {
  return {
    type: types.END_OF_VALIDATION_TIMESTAMP,
    endOfValidationTimestamp
  };
};
