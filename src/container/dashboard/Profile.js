import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import Modal from "react-native-modal";
import RNFetchBlob from "rn-fetch-blob";
import * as AppAction from "../../actions";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import AuthButton from "../../components/common/AuthButton";
import Constants from "../../constants";
import PermissionApi from "../../helpers/Permissions";
import Events from "../../utilities/Events";
import Icon from "react-native-vector-icons/FontAwesome";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    let { botImage } = this.props;
    this.state = {
      firstName: "",
      lastName: "",
      password: "",
      hidePassword: true,
      images: [],
      uri: botImage ? botImage : false,
      guideDescription: "",
      GuideName: "",
      selectIndex: null,
      showAjivarGuide: true
    };
    this.changeBotImage = this.changeBotImage.bind(this);
    this.fetchProfileImages = this.fetchProfileImages.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.SelectGuide = this.SelectGuide.bind(this);
    this.botImageChangeModal = this.botImageChangeModal.bind(this);
  }

  componentDidMount() {
    Events.on("fetchProfileImages", this.fetchProfileImages);
    // this.callPosimations();
    this.fetchProfileImages();
  }

  componentWillUnmount() {
    Events.removeListener("fetchProfileImages", this.fetchProfileImages);
  }

  fetchProfileImages() {
    let { fetchBotImagesList } = this.props,
      context = this;

    fetchBotImagesList(false, data => {
      if (data) {
        data = data.map(res => {
          return { ...res, open: false };
        });

        context.setState(
          { images: data }
          // , () => {
          // getUserBotImage(imageData => {
          // if (imageData && imageData.idGuides) {
          //   //  console.log("imageData.idGuides)",imageData.idGuides)
          //   let indexData = this.state.images.find(element => {
          //     return element.idGuides == imageData.idGuides;
          //   });
          //   // if (indexData) {
          //   //   context.setState({
          //   //     selectIndex: indexData,
          //   //     guideDescription: indexData.guideDescription,
          //   //     GuideName: indexData.GuideName
          //   //   });
          //   //   context.downloadPermissions(indexData.GuidesImgURL, res => {
          //   //     // console.log("ressssss",res)
          //   //     setBotImage(
          //   //       Platform.OS == "ios" ? res.path() : "file://" + res.path()
          //   //     );
          //   //     context.setState({
          //   //       uri:
          //   //         Platform.OS == "ios" ? res.path() : "file://" + res.path()
          //   //     });
          //   //     context.downloadPermissions(
          //   //       indexData.GuideThumbnail,
          //   //       res2 => {
          //   //         setBotChatImage(
          //   //           Platform.OS == "ios"
          //   //             ? res2.path()
          //   //             : "file://" + res2.path(),
          //   //            indexData.GuideThumbnail
          //   //         );
          //   //         // context.setState(
          //   //         //   {
          //   //         //     botImageChangeModal: false
          //   //         //   },
          //   //         //   () => {
          //   //         //     // context.props.handleBot("start");
          //   //         //   }
          //   //         // );
          //   //       }
          //   //     );
          //   //   });
          //   // }
          // } else {
          //   // context.props.handleBot("start");
          // }
          // }
          // );
          // }
        );
      }
    });
  }

  /**
   *
   * Function for saving the user guide
   */
  SelectGuide(item) {
    let {
        saveBotImage,
        setBotChatImage,
        setBotImage,
        handleLoader
      } = this.props,
      context = this;
    this.setState({ showAjivarGuide: false, botImageChangeModal: false });

    saveBotImage(item.idGuides, () => {
      // context.setState({
      //   guideDescription: item.guideDescription,
      //   GuideName: item.GuideName
      // });
      context.downloadPermissions(item.GuidesImgURL, res => {
        setBotImage(
          Platform.OS == "ios" ? res.path() : "file://" + res.path(),
          item.guideDescription,
          item.GuideName
        );
        // context.setState({
        //   uri: Platform.OS == "ios" ? res.path() : "file://" + res.path()
        // });

        context.downloadPermissions(item.GuideThumbnail, res2 => {
          setBotChatImage(
            Platform.OS == "ios" ? res2.path() : "file://" + res2.path(),
            item.GuideThumbnail
          );
          context.setState({
            showAjivarGuide: true
          });
          handleLoader(false);
        });
      });
    });
  }

  showPassword = () => {
    this.setState({
      hidePassword: !this.state.hidePassword
    });
  };

  changeBotImage() {
    this.setState({ botImageChangeModal: true });
  }
  onBackdropPress = () => {
    this.setState({ botImageChangeModal: false });
  };
  toggleOpen(index) {
    let { images } = this.state,
      imageData;
    imageData = images.map((item, ind) => {
      if (ind == index) {
        return { ...item, open: !images[index].open };
      } else {
        return { ...item, open: false };
      }
    });
    // images[index].open = !images[index].open;

    this.setState({ images: imageData });
  }
  _keyExtractor = item => item.id;
  _renderImageItem = ({ item, index }) => {
    // console.log("itemitemitemitem",item)
    let { selectIndex } = this.state;
    if (!(item && item.guideThumbBack)) {
      return null;
    }
    return (
      <View style={styles.ImageItemContainer}>
        <View style={styles.RowAjGuide}>
          <Image
            style={{ width: moderateScale(100), height: moderateScale(100) }}
            resizeMethod={"resize"}
            resizeMode={"contain"}
            source={{ uri: item.guideThumbBack }}
          />
          <Text style={styles.GuideNameStyleText}>
            {"The " + item.GuideName}
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.toggleOpen(index);
            }}
          >
            {/* <Image
              style={{ width: moderateScale(20), height: moderateScale(20) }}
              resizeMethod={"resize"}
              resizeMode={"contain"}
              source={
                item.open
                  ? Constants.Images.SideMenu.Upwards
                  : Constants.Images.SideMenu.DownArrow
              }
            /> */}
            <Icon
              name={item.open ? "chevron-up" : "chevron-down"}
              color={"black"}
              size={Constants.BaseStyle.DEVICE_HEIGHT > 800 ? 30 : 25}
            />
          </TouchableOpacity>
          <Text style={styles.colorRed}>
            {index == selectIndex ? Constants.Strings.Profile.Current : "     "}
          </Text>
        </View>
        {item.open && (
          <View style={styles.GuideDescriptionContainer}>
            <View style={styles.GuideDescription}>
              <Text style={styles.guideNameStyle}>
                {"The " + item.GuideName}
              </Text>
              <Text style={styles.guideDescriptionStyle}>
                {item.guideDescription.replace("<bbr>", " ")}
              </Text>
              <View style={[styles.changeBotImageSelectGuide]}>
                <AuthButton
                  textStyle={[styles.textStyle, styles.FontTimes]}
                  buttonStyle={styles.signUpButtonStyle}
                  gradientStyle={styles.gradientStyle}
                  buttonName={Constants.Strings.Profile.Select}
                  onPress={() => this.SelectGuide(item)}
                />
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };

  downloadPermissions = (url, cb) => {
    let context = this;
    if (Platform.OS == "android") {
      PermissionApi.requestStoragePermission().then(() => {
        context.downloadImage(url, cb);
      });
    } else {
      context.downloadImage(url, cb);
    }
  };

  downloadImage = (url, cb) => {
    // let date = new Date();
    // datePath =
    //   date.getUTCFullYear() +
    //   (date.getUTCMonth() + 1) +
    //   date.getUTCDate() +
    //   date.getUTCHours() +
    //   date.getUTCMinutes() +
    //   date.getUTCSeconds();
    var ext = this.extention(url);
    ext = "." + ext[0];
    const { config } = RNFetchBlob;
    // if (Platform.OS == "ios") {
    //   PictureDir = fs.dirs.DocumentDir;
    // } else {
    //   PictureDir = fs.dirs.PictureDir;
    // }
    let options = {
      fileCache: true,
      // path: PictureDir + datePath + "/botImage" + ext,
      appendExt: ext
      // addAndroidDownloads: {
      //     useDownloadManager: true,
      //     notification: true,
      //     path: PictureDir + "/botImage" + ext,
      //     description: 'Image'
      // }
    };
    config(options)
      .fetch("GET", url)
      .then(async res => {
        if (cb) {
          cb(res);
        }
      });
  };

  botImageChangeModal() {
    this.setState({ botImageChangeModal: false });
  }

  extention = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  render() {
    // let { hidePassword } = this.state;
    let { botImageChangeModal, uri, images, showAjivarGuide } = this.state;
    let { botImage, guideDescription, GuideName } = this.props;

    if (guideDescription && guideDescription.includes("<bbr>")) {
      guideDescription = guideDescription.split("<bbr>");
      // message =  message.replace("cloud", "img ")
    } else {
      guideDescription = [];
    }
    if (!showAjivarGuide) {
      return <View style={styles.container}></View>;
    }

    return (
      <ScrollView style={styles.container}>
        <View style={styles.myCurrent}>
          <Text style={styles.myCurrentText}>
            {Constants.Strings.Profile.MyCurrent}
          </Text>
        </View>
        <View style={styles.AjivarGuidesYellowContainer}>
          <Image
            source={Constants.Images.AjivarGuide.AjivarGuidesYellow}
            resizeMode={"contain"}
            style={styles.AjivarGuidesYellow}
          />
        </View>
        <View style={styles.imageIcon}>
          <Image
            source={
              botImage ? { uri: botImage } : Constants.Images.BotIcons.logo
            }
            resizeMode={"contain"}
            style={styles.userBotImage}
          />
        </View>
        <Text style={styles.guideNameStatus}>
          {GuideName && "The " + GuideName}
        </Text>
        {guideDescription.map((guideDescriptionValue, index) => {
          return (
            <View key={index} style={[styles.guideDescription2]}>
              <Text style={styles.guideDescriptionText}>
                {guideDescriptionValue}
              </Text>
            </View>
          );
        })}

        <View
          style={[
            styles.stylesGuideButtonContainer,
            !uri && styles.changeBotImage
          ]}
        >
          <AuthButton
            textStyle={styles.textStyle}
            buttonStyle={styles.signUpButtonStyle}
            gradientStyle={styles.gradientStyle}
            buttonName={"Change my Guide"}
            onPress={() => this.changeBotImage()}
          />
        </View>
        <Modal
          isVisible={botImageChangeModal}
          deviceWidth={Constants.BaseStyle.DEVICE_WIDTH}
          deviceHeight={Constants.BaseStyle.DEVICE_HEIGHT}
          // onBackdropPress={() => this.botImageChangeModal()}
          style={{
            margin: 0,
            padding: 0,
            backgroundColor: Constants.Colors.ThemeYellow
          }}
        >
          <View
            style={{
              height: Constants.BaseStyle.DEVICE_HEIGHT,
              borderRadius: moderateScale(10),
              paddingTop: moderateScale(40)
            }}
          >
            <View style={styles.myCurrent}>
              <Text style={styles.myCurrentText}>
                {Constants.Strings.Profile.ChangeAJ}
              </Text>
            </View>

            <FlatList
              data={images}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderImageItem}
              contentContainerStyle={{ paddingBottom: moderateScale(20) }}
            />
            <View
              style={{
                position: "absolute",
                zIndex: 100,
                bottom:
                  Constants.BaseStyle.DEVICE_HEIGHT > 800
                    ? moderateScale(40)
                    : moderateScale(20),
                right: moderateScale(10)
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: Constants.Colors.Transparent,
                  height: moderateScale(30),
                  width: Constants.BaseStyle.DEVICE_WIDTH * 0.3,
                  // paddingHorizontal: moderateScale(10),
                  borderRadius: moderateScale(15),
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row"
                }}
                onPress={() => {
                  this.botImageChangeModal(false);
                }}
              >
                <Text style={styles.textBlack}>Back</Text>
                <Image
                  resizeMethod={"resize"}
                  resizeMode={"contain"}
                  source={Constants.Images.Posimation.MaskGroup}
                  style={styles.maskGroupStyle}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    loader: state.loader,
    botImage: state.user.botImage,
    guideDescription: state.user.guideDescription,
    GuideName: state.user.GuideName
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getUserBotImage: data => {
      dispatch(AppAction.getUserBotImage(data));
    },
    fetchBotImagesList: (loader, data) => {
      dispatch(AppAction.fetchBotImagesList(loader, data));
    },
    saveBotImage: (data, cb) => {
      dispatch(AppAction.saveBotImage(data, cb));
    },
    setBotImage: (imageChatBot, guideDescription, GuideName) => {
      dispatch(
        AppAction.setBotImage(imageChatBot, guideDescription, GuideName)
      );
    },

    setBotChatImage: (data, url) => {
      dispatch(AppAction.setBotChatImage(data, url));
    },
    handleBot: data => {
      dispatch(AppAction.handleBot(data));
    },
    uploadFiles: (data, cb) => {
      dispatch(AppAction.uploadFiles(data, cb));
    },
    handleLoader: data => {
      dispatch(AppAction.handleLoader(data));
    },
    dispatch: () => {}
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Colors.ThemeYellow
    // paddingHorizontal: moderateScale(20)
  },
  centerText: {
    fontSize: moderateScale(13),
    paddingVertical: moderateScale(5),
    fontFamily: "Helvetica",
    color: Constants.Colors.GreyShadeLight,
    textAlign: "justify"
  },
  AjivarGuidesYellowContainer: { alignItems: "center" },
  imageIcon: { alignItems: "center", paddingVertical: moderateScale(10) },
  logout: { paddingVertical: moderateScale(20) },
  myCurrent: {
    paddingTop: moderateScale(20),
    justifyContent: "center",
    alignItems: "center"
  },
  myCurrentText: {
    fontSize: moderateScale(30),
    color: Constants.Colors.Black,
    fontWeight: "bold",
    fontFamily: "Cochin-Bold"
  },
  changeBotImageSelectGuide: {
    paddingTop: Constants.BaseStyle.DEVICE_HEIGHT * 0.01
  },
  changeBotImage: {
    paddingTop: Constants.BaseStyle.DEVICE_HEIGHT * 0.1
  },
  signUpButtonStyle: {
    width: moderateScale(200)
  },
  gradientStyle: {
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(12)
  },
  textStyle: {
    fontSize: moderateScale(17),
    textAlign: "center"
  },
  colorRed: {
    color: Constants.Colors.DarkRed,
    fontSize: moderateScale(22),
    fontFamily: "Cochin"
  },
  GuideNameStyleText: {
    fontSize: moderateScale(24),
    fontFamily: "Cochin",
    color: Constants.Colors.Black,
    fontWeight: "500",
    textAlign: "justify"
  },
  maskGroupStyle: {
    height: moderateScale(20),
    width: moderateScale(20)
  },
  FontTimes: { fontFamily: "Times" },
  RowAjGuide: {
    flexDirection: "row",
    flex: 1,
    marginTop: moderateScale(10),
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: moderateScale(10)
  },
  stylesGuideButtonContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  guideDescriptionStyle: {
    fontFamily: "Cochin",
    color: Constants.Colors.BlackDark,
    fontSize: moderateScale(18),
    lineHeight: Constants.BaseStyle.DEVICE_WIDTH * 0.06
  },
  guideNameStyle: {
    textAlign: "center",
    fontFamily: "Cochin",
    fontSize: moderateScale(22),
    color: Constants.Colors.NavyBlueDark
  },
  GuideDescriptionContainer: { justifyContent: "center", alignItems: "center" },
  GuideDescription: {
    padding: moderateScale(22),
    backgroundColor: Constants.Colors.White,
    width: Constants.BaseStyle.DEVICE_WIDTH * 0.7,
    borderRadius: moderateScale(15),
    borderWidth: 1
  },
  ImageItemContainer: { flexDirection: "column" },
  userBotImage: {
    height: Constants.BaseStyle.DEVICE_WIDTH * 0.4,
    width: Constants.BaseStyle.DEVICE_WIDTH * 0.4
  },
  AjivarGuidesYellow: {
    height: Constants.BaseStyle.DEVICE_WIDTH * 0.2,
    width: Constants.BaseStyle.DEVICE_WIDTH * 0.8
  },
  guideDescriptionText: {
    fontWeight: "500",
    fontFamily: "Times",
    color: Constants.Colors.NavyBlueDark,
    fontSize: moderateScale(20),
    textAlign: "center"
  },
  guideDescription2: {
    paddingHorizontal: moderateScale(60),
    paddingVertical: moderateScale(15)
  },
  textBlack: { fontSize: moderateScale(16) },
  guideNameStatus: {
    fontFamily: "Times",
    fontWeight: "500",
    color: Constants.Colors.BlackDark,
    fontSize: moderateScale(25),
    textAlign: "center"
  }
});
