/*
 * @file: Navigation.js
 * @description: Contains the navigation Stacks.
 * @date: 9.Oct.2018
 * @author: Suraj Sanwal
 * */
import { Navigation } from "react-native-navigation";
import { Platform } from "react-native";
import Constants from "../constants/";
const tabs = [
  //DashBoard
  {
    stack: {
      id: "MY_STACK",
      children: [
        {
          component: {
            id: "Tab1",
            name: "Tab1",
            options: {
              bottomTab: {
                fontSize: 12,
                text: "Tab1",
                icon: Constants.Images.dashboard,
                iconColor: "rgba(226,71,31,1)",
                // iconColor: "#e2471fff",
                textColor: "#ffffff",
                // selectedTextColor: "black",
                selectedTextColor: "rgba(0,0,0,0.3)",
                // selectedIconColor: "black"
                selectedIconColor: "rgba(255,255,255,0.3)"
              },
              topBar: {
                hideOnScroll: false,
                title: {
                  text: "Tab1",
                  color: "#000",
                  alignment: "center"
                },
                background: {
                  color: "transparent"
                },
                drawBehind: Platform.OS == "ios" ? false : true,
                visible: false
              },
              sideMenu: {
                // right: {
                //   visible: false,
                //   enabled: false
                // }
              }
            }
          }
        }
      ],
      options: {
        bottomTab: {
          iconColor: "#e2471fff",
          textColor: "#ffffff",
          selectedTextColor: "black",
          selectedIconColor: "black"
        },
        layout: {
          orientation: ["portrait"]
        }
      }
    }
  },
  //Posimation
  {
    stack: {
      children: [
        {
          component: {
            id: "Tab2",
            name: "Tab2",
            options: {
              bottomTab: {
                text: "Tab2",
                fontSize: 12,
                icon: Constants.Images.Tabs.sun,
                // iconColor: "#ffffff",
                textColor: "#ffffff",
                // selectedTextColor: "black",
                selectedTextColor: "rgba(255,255,255,0.3)",
                // selectedIconColor: "black"
                selectedIconColor: "rgba(243,169,4,0.3)"
              },
              topBar: {
                hideOnScroll: false,
                title: {
                  text: "Tab2",
                  color: "#000",
                  alignment: "center"
                },
                background: {
                  color: "transparent"
                },
                drawBehind: Platform.OS == "ios" ? false : true,
                visible: false
              },
              sideMenu: {
                // right: {
                //   visible: false,
                //   enabled: false
                // }
              }
            }
          }
        }
      ],
      options: {
        bottomTab: {
          // iconColor: "#ffffff",
          textColor: "#ffffff",
          selectedTextColor: "black",
          selectedIconColor: "black"
        },
        layout: {
          orientation: ["portrait"]
        }
      }
    }
  },
  //bot
  {
    stack: {
      children: [
        {
          component: {
            id: "Tab3",
            name: "Tab3",
            options: {
              bottomTab: {
                color: "#ffffff",
                // selectedIconColor: 'black',
                // text: "Bot",
                // iconInsets: { top: 0, left: 0, bottom: 100, right: 0 },
                fontSize: 12,
                // icon: Constants.Images.chat_icon

                icon:
                  Platform.OS == "ios"
                    ? Constants.Images.Tabs.botLogoIos
                    : Constants.Images.Tabs.botLogoAndroid
              },
              topBar: {
                hideOnScroll: false,
                title: {
                  text: "Tab3",
                  color: "#000",
                  alignment: "center"
                },
                background: {
                  color: "transparent"
                },
                overlay: {
                  interceptTouchOutside: true
                },
                drawBehind: Platform.OS == "ios" ? false : true,
                visible: false
              },
              sideMenu: {
                // right: {
                //   visible: false,
                //   enabled: false
                // }
              }
            }
          }
        }
      ],
      options: {
        bottomTab: {
          iconInsets: { top: 5, bottom: -5 }

          // iconInsets: { top: 5, bottom: -100 },
        },
        layout: {
          orientation: ["portrait"]
        }
      }
    }
  },
  //Journal
  {
    stack: {
      id: "Journal",
      children: [
        {
          component: {
            id: "Tab4",
            name: "Tab4",
            options: {
              bottomTab: {
                text: "Tab4",
                fontSize: 12,
                icon: Constants.Images.journal,
                // iconColor: "#fff2ccff",
                iconColor: "rgba(255,242,204,1)",
                textColor: "#ffffff",
                selectedTextColor: "rgba(255,242,204,0.3)",
                // selectedTextColor: "black",
                // selectedIconColor: "black"
                selectedIconColor: "rgba(255,255,255,0.3)"
              },
              topBar: {
                hideOnScroll: false,
                title: {
                  text: "Tab4",
                  color: "#000",
                  alignment: "center"
                },
                background: {
                  color: "transparent"
                },
                drawBehind: Platform.OS == "ios" ? false : true,
                visible: false
              },
              sideMenu: {
                // right: {
                //   visible: false,
                //   enabled: false
                // }
              }
            }
          }
        }
      ],
      options: {
        bottomTab: {
          iconColor: "#fff2ccff",
          textColor: "#ffffff",
          selectedTextColor: "black",
          selectedIconColor: "black"
        },
        layout: {
          orientation: ["portrait"]
        }
      }
    }
  },
  //Profile OozChallenge  OzzChallengeCompleted  TotalCompletedOozChallange RateScalePage
  {
    stack: {
      children: [
        {
          component: {
            id: "Tab5",
            name: "Tab5",
            options: {
              bottomTab: {
                text: "Tab5",
                fontSize: 12,
                icon: Constants.Images.Tabs.lotus,
                // iconColor: "#ffffff",
                textColor: "#ffffff",
                // selectedTextColor: "black",
                // selectedIconColor: "black"
                selectedTextColor: "rgba(255,255,255,0.3)",
                selectedIconColor: "rgba(210,109,214,0.3)"
              },
              topBar: {
                hideOnScroll: false,
                title: {
                  text: "Tab5",
                  color: "#000",
                  alignment: "center"
                },
                background: {
                  color: "transparent"
                },
                drawBehind: Platform.OS == "ios" ? false : true,
                visible: false
              },
              sideMenu: {
                // right: {
                //   visible: false,
                //   enabled: false
                // }
              }
            }
          }
        }
      ],
      options: {
        bottomTab: {
          // iconColor: "#ffffff",
          textColor: "#ffffff",
          selectedTextColor: "black",
          selectedIconColor: "black"
        },
        layout: {
          orientation: ["portrait"]
        }
      }
    }
  }
];
export const goToAuth = screen =>
  Navigation.setRoot({
    root: {
      stack: {
        id: "App",
        children: [
          {
            component: {
              name: screen,
              passProps: {
                text: "React Native"
              },
              options: {
                statusBar: {
                  visible: true,
                  style: "dark",
                  hideWithTopBar: true,
                  blur: true
                },
                topBar: {
                  visible: false,
                  drawBehind: true
                },
                layout: {
                  orientation: ["portrait"]
                }
              }
            }
          }
        ]
      }
    }
  });

export const goHome = () =>
  Navigation.setRoot({
    root: {
      sideMenu: {
        right: {
          component: {
            id: "sideDrawer",
            name: "SideMenu"
          }
        },
        center: {
          bottomTabs: {
            id: "BottomTabsId",
            children: tabs,
            options: {
              bottomTabs: {
                elevation: 8,
                currentTabIndex: 2,
                titleDisplayMode: "alwaysShow",
                backgroundColor: "#537591",
                visible: false,
                animate: false,
                drawBehind: true
              },
              topBar: {
                visible: false
              }
            }
          }
        }
      }
    }
  });
