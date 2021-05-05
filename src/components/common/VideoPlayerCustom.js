/**
 * Name: Parshant Nagpal
 * File : VideoPlayerCustom
 * Description : "Conatins the custom Video package module"
 */
/* eslint-disable */
import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
  Image,
  BackHandler
} from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import IconEntypo from "react-native-vector-icons/Entypo";
import Video from "react-native-video";
import { Slider } from "react-native-elements";
import PropsTypes from "prop-types";
var { height, width } = Dimensions.get("window");
import AnimatedHideView from "react-native-animated-hide-view";
import isEqual from "lodash/isEqual";
import Constants from "../../constants";
import Events from "../../utilities/Events";
import { moderateScale } from "../../helpers/ResponsiveFonts";

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
    this.childVisible = this.childVisible.bind(this);
    this.VideoSoundDisable = this.VideoSoundDisable.bind(this);
    // this.handleBackPress = this.handleBackPress.bind(this);
  }
  get initialState() {
    let { defaultMuted, playing, posterImage, muted } = this.props;

    return {
      playing,
      muted: muted,
      shuffle: false,
      sliding: false,
      currentTime: 0,
      songIndex: 0,
      songsArray: [],
      networkType: null,
      fullScreen: false,
      isLoading: false,
      songPercentage: 0,
      playFromBeginning: false,
      onEnd: false,
      isChildVisible: false,
      show: true,
      hideFull: true,
      statusBarHeight: 0,
      spinValue: new Animated.Value(0),
      // spinValue: new Animated.Value(0),
      rotate: false,
      spin: null,
      clearId: "",
      clearId1: "",
      defaultMuted,
      posterImage
    };
  }
  componentDidMount() {
    Events.on("VideoSoundDisable", this.VideoSoundDisable);
  }
  componentWillUnmount() {
    Events.removeListener("VideoSoundDisable", this.VideoSoundDisable);
  }

  handleBackButtonClick() {
    return true;
  }

  componentWillMount() {
    if (Platform.OS === "")
      this.setState({
        statusBarHeight:
          Platform.OS === "android" ? StatusBar.currentHeight : 20
      });
    // StatusBar.setHidden(true);
  }

  VideoSoundDisable() {
    this.setState({ playing: false });
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.pageNext, nextProps.pageNext)) {
      if (this.props.executeFunc) {
        this.setState(this.initialState);
      }
    }
  }

  togglePlay() {
    if (this.state.posterImage) {
      this.setState({ posterImage: false });
    }
    if (this.state.playFromBeginning) {
      this.refs.audio.seek(0);
      this.setState({
        playFromBeginning: false,
        onEnd: false
      });
    }
    this.setState({ playing: !this.state.playing, isLoading: false });
  }

  toggleVolume() {
    this.setState({ muted: !this.state.muted });
  }

  randomSongIndex() {
    const { params } = this.props.navigation.state;
    let maxIndex = params.songs.length - 1;
    return Math.floor(Math.random() * (maxIndex - 0 + 1)) + 0;
  }

  setTime(params) {
    let context = this;
    if (!this.state.onEnd) {
      if (!this.state.sliding) {
        this.setState({ currentTime: params.currentTime });
      }
      if (this.state.songDuration !== undefined) {
        this.setState(
          {
            songPercentage: this.state.currentTime / this.state.songDuration
          },
          () => {
            if (context.props.videoPercentage) {
              context.props.videoPercentage(context.state.songPercentage);
            }
          }
        );
      } else {
        this.setState({ songPercentage: 0 });
      }
    }
  }

  onLoad(params) {
    this.refs.audio.seek(this.state.currentTime);
    this.setState({ isLoading: false, songDuration: params.duration });
  }

  onLoadStart() {
    this.setState({ isLoading: true });
  }

  onSlidingStart() {
    this.setState({ sliding: true, currentTime: this.state.currentTime });
  }

  onSlidingChange(value) {
    console.log("valuevaluevalue", value);
    let newPosition = value * this.state.songDuration;
    this.refs.audio.seek(newPosition);
    this.setState({ currentTime: newPosition });
    this.childVisible();
  }

  onSlidingComplete() {
    console.log("this.state.currentTime");
    this.refs.audio.seek(this.state.currentTime);
    this.setState({ sliding: false });
  }

  toggleFullScreen() {
    // this.refs.audio.presentFullscreenPlayer();
    // return
    if (this.props.executeFunc) {
      this.props.hideHeaderFooter();
    }

    this.setState(
      { fullScreen: !this.state.fullScreen, rotate: !this.state.rotate },
      () => {
        if (this.state.fullScreen) {
          StatusBar.setHidden(true);

          var clearId = setTimeout(() => {
            this.setState({ isChildVisible: false });
          }, 5000);
          this.setState({ clearId: clearId }, () => {});

          Animated.timing(this.state.spinValue, {
            toValue: 1,
            duration: 250,
            easing: Easing.linear
          }).start();
          // this.refs.audio.seek(this.state.songDuration)
        } else {
          StatusBar.setHidden(false);
          clearTimeout(this.state.clearId);
          this.setState({ isChildVisible: true });
          setTimeout(() => {
            this.setState({ isChildVisible: false });
          }, 5000);

          Animated.timing(this.state.spinValue, {
            toValue: 0,
            duration: 250,
            easing: Easing.linear
          }).start();

          console.log("this.state.songDuration", this.state.songDuration);
          // this.refs.audio.seek(this.state.songDuration)
        }
      }
    );
  }
  onEnd() {
    this.setState({
      playing: false,
      currentTime: 0,
      playFromBeginning: true,
      songPercentage: 0,
      onEnd: true
    });
    Events.emit("videoCompleteWatch");
  }

  toggleForward() {
    this.setState(
      {
        currentTime:
          this.state.currentTime + 10 <= this.state.songDuration
            ? this.state.currentTime + 10
            : this.state.currentTime +
              (this.state.songDuration - this.state.currentTime)
      },
      () => {}
    );
  }

  toggleBackward() {
    this.setState({
      currentTime:
        this.state.currentTime - 10 >= 0
          ? this.state.currentTime - 10
          : this.state.currentTime - this.state.currentTime
    });
  }
  playButtonThumbnail() {
    this.setState({ posterImage: false, playing: true, isLoading: false });
  }

  renderButton() {
    let playButton;
    if (this.state.playing) {
      playButton = <Icon name="pause" size={30} color="#999" />;
    } else {
      playButton = <Icon name="play-arrow" size={30} color="#999" />;
    }

    let volumeButton;
    if (this.state.muted) {
      volumeButton = <Icon name="volume-off" size={30} color="#999" />;
    } else {
      volumeButton = <Icon name="volume-up" size={30} color="#999" />;
    }

    let forwardButton = (
      <Icon
        onPress={() => {
          this.toggleForward();
        }}
        style={{ marginTop: 20 }}
        name="forward-10"
        size={30}
        color="#999"
      />
    );

    let backwardButton = (
      <Icon
        onPress={() => {
          this.toggleBackward();
        }}
        style={{ marginTop: 20 }}
        name="replay-10"
        size={30}
        color="#999"
      />
    );

    let fullscreenButton = <Icon name="fullscreen" size={30} color="#999" />;

    let fullscreenExitButton = (
      <Icon name="fullscreen-exit" size={30} color="#999" />
    );

    let backButton = (
      <Icon
        onPress={() => this.toggleBack()}
        style={{ left: 15 }}
        name="chevron-left"
        size={35}
        color="#999"
      />
    );

    return (
      <AnimatedHideView
        duration={200}
        visible={this.state.isChildVisible}
        style={[styles.controlsSmall]}
      >
        <View style={styles.controls}>
          <View>
            <Animated.View style={[styles.sliderContainer]}>
              <View>
                <Slider
                  onSlidingStart={this.onSlidingStart.bind(this)}
                  onSlidingComplete={this.onSlidingComplete.bind(this)}
                  onValueChange={this.onSlidingChange.bind(this)}
                  minimumTrackTintColor="#851c44"
                  style={styles.slider}
                  trackStyle={styles.sliderTrack}
                  thumbStyle={styles.sliderThumb}
                  value={this.state.songPercentage}
                  yDirection={false}
                />
              </View>
              <View style={styles.timeInfo}>
                <Text style={styles.VideotimeTxt}>
                  {formattedTime(this.state.currentTime)}
                </Text>
                <Text style={styles.VideotimeTxt}>
                  -{" "}
                  {formattedTime(
                    this.state.songDuration - this.state.currentTime
                  )}
                </Text>
              </View>
            </Animated.View>
            <View
              style={{
                width:
                  width -
                  (Platform.OS == "ios"
                    ? width > 800
                      ? width * 0.075
                      : width * 0.08
                    : width * 0.08),
                flexDirection: "row",
                backgroundColor: "#222",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Animated.View style={[styles.vCntrlBtn]}>
                <TouchableOpacity onPress={this.toggleVolume.bind(this)}>
                  <Text>{volumeButton}</Text>
                </TouchableOpacity>
              </Animated.View>

              {/* <TouchableOpacity style={[styles.vCntrlBtn]}>
              <Text>{backwardButton}</Text>
            </TouchableOpacity> */}
              <Animated.View style={[styles.vCntrlBtn]}>
                <TouchableOpacity onPress={() => this.togglePlay()}>
                  <Text>{playButton}</Text>
                </TouchableOpacity>
              </Animated.View>

              {/* <TouchableOpacity style={[styles.vCntrlBtn]}>
              <Text>{forwardButton}</Text>
            </TouchableOpacity> */}
              <Animated.View style={[styles.vCntrlBtn]}>
                <TouchableOpacity onPress={() => this.toggleFullScreen()}>
                  <Text>{fullscreenButton}</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>
        </View>
      </AnimatedHideView>
    );
  }
  onFullscreenPlayerDidDismiss() {
    this.refs.audio.seek(this.state.currentTime);
  }
  onFullscreenPlayerDidPresent() {
    this.refs.audio.seek(this.state.currentTime);
  }
  childVisible() {
    let { clearId, clearId1 } = this.state;
    if (clearId) {
      clearTimeout(clearId);
    }
    if (clearId1) {
      clearTimeout(clearId1);
    }

    let clearId1Copy = setTimeout(() => {
      this.setState({ isChildVisible: false });
    }, 5000);
    this.setState({ clearId1: clearId1Copy });
  }

  renderButtonFull() {
    let playButton;

    if (this.state.playing) {
      playButton = (
        <Icon
          onPress={() => this.togglePlay()}
          style={styles.playFull}
          name="pause"
          size={30}
          color="#999"
        />
      );
    } else {
      playButton = (
        <Icon
          onPress={() => this.togglePlay()}
          style={styles.playFull}
          name="play-arrow"
          size={30}
          color="#999"
        />
      );
    }

    let volumeButton;
    if (this.state.muted) {
      volumeButton = (
        <Icon
          onPress={this.toggleVolume.bind(this)}
          style={styles.volumeFull}
          name="volume-off"
          size={30}
          color="#999"
        />
      );
    } else {
      volumeButton = (
        <Icon
          onPress={this.toggleVolume.bind(this)}
          style={styles.volumeFull}
          name="volume-up"
          size={30}
          color="#999"
        />
      );
    }

    let fullscreenButton = (
      <Icon
        style={{ marginTop: 20 }}
        name="fullscreen"
        size={30}
        color="#999"
      />
    );

    let forwardButton = (
      <Icon
        onPress={() => {
          this.toggleForward();
        }}
        style={{ marginTop: 20 }}
        name="forward-10"
        size={30}
        color="#999"
      />
    );

    let backwardButton = (
      <Icon
        onPress={() => {
          this.toggleBackward();
        }}
        style={{ marginTop: 20 }}
        name="replay-10"
        size={30}
        color="#999"
      />
    );

    let fullscreenExitButton = (
      <Icon name="fullscreen-exit" size={30} color="#999" />
    );

    let backButton = (
      <Icon
        onPress={() => this.toggleBack()}
        style={{}}
        name="expand-less"
        size={35}
        color="#999"
      />
    );

    return (
      <AnimatedHideView
        duration={200}
        visible={this.state.isChildVisible}
        style={[styles.controlsFull]}
      >
        <View
          style={{
            width: 60,
            alignSelf: "flex-start",
            justifyContent: "space-around",
            alignItems: "center",
            height: height,
            position: "relative",
            zIndex: 99
          }}
        >
          <Animated.View style={[styles.vCntrlBtn, styles.vCntrlBtnFull]}>
            <TouchableOpacity onPress={this.toggleVolume.bind(this)}>
              <Text>{volumeButton}</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* <TouchableOpacity style={[styles.vCntrlBtn, styles.vCntrlBtnFull]}>
            <Text>{backwardButton}</Text>
          </TouchableOpacity> */}
          <Animated.View style={[styles.vCntrlBtn, styles.vCntrlBtnFull]}>
            <TouchableOpacity onPress={() => this.togglePlay()}>
              <Text>{playButton}</Text>
            </TouchableOpacity>
          </Animated.View>
          {/* <TouchableOpacity style={[styles.vCntrlBtn, styles.vCntrlBtnFull]}>
            <Text>{forwardButton}</Text>
          </TouchableOpacity> */}
          <Animated.View style={[styles.vCntrlBtn, styles.vCntrlBtnFull]}>
            <TouchableOpacity onPress={() => this.toggleFullScreen()}>
              <Text>{fullscreenExitButton}</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        <Animated.View style={[styles.sliderContainerFull]}>
          <View style={[styles.sliderContainerFullInner]}>
            <Slider
              // orientation={"vertical"}
              onSlidingStart={this.onSlidingStart.bind(this)}
              onSlidingComplete={this.onSlidingComplete.bind(this)}
              onValueChange={this.onSlidingChange.bind(this)}
              minimumTrackTintColor="#851c44"
              style={[styles.sliderFull]}
              trackStyle={styles.sliderTrack}
              thumbStyle={styles.sliderThumb}
              yDirection={true}
              value={this.state.songPercentage}
            />
          </View>
          <View style={styles.timeInfo}>
            <Text style={styles.VideotimeTxt}>
              {formattedTime(this.state.currentTime)}
            </Text>
            <Text style={styles.VideotimeTxt}>
              -{" "}
              {formattedTime(this.state.songDuration - this.state.currentTime)}
            </Text>
          </View>
        </Animated.View>
      </AnimatedHideView>
    );
  }

  renderModal() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.fullScreen}
      >
        <StatusBar hidden={true} />
        {this.renderView()}
      </Modal>
    );
  }
  renderViewData() {
    return <View>{this.renderView()}</View>;
  }
  render() {
    return (
      <View>
        {this.state.fullScreen ? this.renderModal() : this.renderViewData()}
      </View>
    );
  }
  renderView() {
    let { defaultMuted, posterImage } = this.state,
      { thumbnailLinks } = this.props;
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["-90deg", "0deg"]
    });
    const spin1 = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "90deg"]
    });
    let songPercentage;
    if (this.state.songDuration !== undefined) {
      songPercentage = this.state.currentTime / this.state.songDuration;
    } else {
      songPercentage = 0;
    }

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          if (this.state.defaultMuted) {
            this.setState({ defaultMuted: false, muted: false });
            return;
          }

          if (this.state.fullScreen) {
            this.props.hideStatusBar();
          }
          this.setState({ isChildVisible: !this.state.isChildVisible }, () => {
            if (this.state.isChildVisible) {
              let clearId = setTimeout(() => {
                this.setState({ isChildVisible: false });
              }, 5000);
              this.setState({ clearId });
            }
          });
        }}
      >
        <Animated.View
          style={[
            styles.container,
            { transform: [{ rotate: this.state.fullScreen ? spin : spin1 }] }
          ]}
        >
          <View style={styles.containerInner}>
            <View
              style={!this.state.fullScreen ? styles.view : styles.topViewStyle}
            >
              <Video
                source={{ uri: this.props.url }}
                // poster={"https://baconmockup.com/300/200/"}
                // posterResizeMode={"contain"}
                ref="audio"
                style={[
                  !this.state.fullScreen ? styles.video : styles.videoFull
                ]}
                volume={this.state.muted ? 0 : 1.0}
                muted={defaultMuted ? true : false}
                fullscreen={true}
                paused={!this.state.playing}
                selectedVideoTrack={{
                  type: "resolution",
                  value: 480
                }}
                onFullscreenPlayerDidPresent={this.onFullscreenPlayerDidPresent.bind(
                  this
                )}
                onFullscreenPlayerDidDismiss={this.onFullscreenPlayerDidDismiss.bind(
                  this
                )}
                fullscreenAutorotate={true}
                onLoadStart={this.onLoadStart.bind(this)}
                onLoad={this.onLoad.bind(this)}
                onProgress={this.setTime.bind(this)}
                onEnd={this.onEnd.bind(this)}
                // resizeMode="contain"
                onError={error => {
                  console.log(error);
                }}
                repeat={false}
              />
              <ActivityIndicator
                animating={this.state.isLoading}
                size="large"
                color="#999"
                style={styles.ActivityIndicator}
              />
              {defaultMuted && (
                <View style={styles.muteButton}>
                  <IconEntypo name="sound-mute" size={26} color="#999" />
                </View>
              )}

              {posterImage && (
                <Image
                  source={{
                    uri: thumbnailLinks
                  }}
                  resizeMethod={"resize"}
                  resizeMode={"contain"}
                  style={styles.posterImage}
                />
              )}
              {posterImage && (
                <TouchableOpacity
                  style={[styles.playButton]}
                  onPress={() => {
                    this.playButtonThumbnail();
                  }}
                >
                  <Image
                    source={Constants.Images.playButton}
                    resizeMode={"contain"}
                    style={styles.playButtonHeight}
                  />
                  {/* <IconEntypo name="sound-mute" size={26} color="#999" /> */}
                </TouchableOpacity>
              )}
            </View>
            {!this.state.fullScreen ? this.renderButton() : null}
          </View>
          {this.state.fullScreen ? this.renderButtonFull() : null}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  ActivityIndicator: { position: "absolute" },
  muteButton: {
    position: "absolute",
    right: moderateScale(20),
    bottom: moderateScale(10)
  },
  playButton: {
    position: "absolute",
    right: Constants.BaseStyle.DEVICE_WIDTH * 0.35,
    bottom: Constants.BaseStyle.DEVICE_WIDTH * 0.28
  },
  vCntrlBtn: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    marginBottom: 4
  },
  vCntrlBtnFull: {
    transform: [
      {
        rotateZ: "90deg"
      }
    ],
    zIndex: 1000
  },
  posterImage: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: width * 0.7,
    width: width - width * 0.08
  },
  playButtonHeight: {
    height: width * 0.2,
    width: width * 0.2
  },
  view: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  video: {
    height: width * 0.7,
    width: width - width * 0.08,
    backgroundColor: Constants.Colors.Black
  },
  videoFull: {
    height: height,
    width: height,
    backgroundColor: Constants.Colors.Black
  },
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  topViewStyle: {
    transform: [{ rotateZ: "90deg" }],
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: width,
    width: height
  },
  videoStyle: {
    height: width,
    width: height
  },
  header: {
    marginTop: 17,
    marginBottom: 17,
    width: width
  },
  headerClose: {
    position: "absolute",
    top: 10,
    left: 0,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  headerText: {
    color: "#FFF",
    fontSize: 18,
    textAlign: "center"
  },
  songImage: {
    marginBottom: 20
  },
  songTitle: {
    marginRight: 20,
    marginLeft: 20,
    color: "white",
    fontFamily: "Helvetica Neue",
    marginBottom: 10,
    marginTop: 13,
    fontSize: 19
  },
  albumTitle: {
    color: "#BBB",
    fontFamily: "Helvetica Neue",
    fontSize: 14,
    marginBottom: 20
  },
  play: {},
  playFull: {
    transform: [{ rotateZ: "90deg" }]
  },

  playRotate: {
    transform: [{ rotateZ: "90deg" }]
  },

  controls: {
    width: width - 30,
    alignSelf: "flex-start",
    bottom: 0,
    zIndex: 99
  },

  controlsFull: {
    alignSelf: "flex-start",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
    alignItems: "center",
    position: "absolute",

    width: 120
  },
  controlsSmall: {
    // alignSelf: "flex-start",
    // justifyContent: "center",
    // backgroundColor: "rgba(0,0,0,0.8)",
    // alignItems: "center",
    position: "absolute",
    bottom: 0
  },

  controlsFullscreen: {
    position: "absolute",
    flexDirection: "row"
  },
  back: {
    marginTop: 22,
    marginLeft: 45
  },
  play: {
    marginLeft: 50,
    marginRight: 50
  },
  forward: {
    marginTop: 22,
    marginRight: 45
  },
  shuffle: {
    marginTop: 26
  },
  volume: {},

  volumeFull: {
    transform: [{ rotateZ: "90deg" }]
  },
  volumeRotate: {
    marginTop: 26,
    transform: [{ rotateZ: "90deg" }]
  },
  sliderContainer: {
    width:
      width -
      (Platform.OS == "ios"
        ? width > 800
          ? width * 0.075
          : width * 0.08
        : width * 0.08),
    backgroundColor: "#222",
    paddingHorizontal: 10,
    paddingTop: 5
  },
  sliderContainerFull: {
    position: "absolute",
    paddingHorizontal: 90,
    width: height,

    // backgroundColor: 'rgba(0,0,0,0.6)',
    transform: [
      {
        rotateZ: "90deg"
      },
      {
        translateY: -20
      },
      {
        translateX: 0
      }
    ],
    paddingVertical: 10
    // flex:1
  },
  sliderContainerFullInner: {},
  timeInfo: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  VideotimeTxt: {
    fontSize: 12,
    color: "#aaa"
  },
  time: {
    color: "#FFF",
    flex: 1,
    fontSize: 10
  },
  timeRight: {
    color: "#FFF",
    textAlign: "right",
    flex: 1,
    fontSize: 10
  },
  sliderFull: {
    // height : 100
    transform: [
      {
        rotateZ: "0deg"
      }
    ]
  },
  sliderTrack: {
    height: 3,
    backgroundColor: "#444"
  },
  sliderThumb: {
    marginBottom: 50,
    width: 14,
    height: 14,
    backgroundColor: "#aaa",
    borderRadius: 7
  }
});

function withLeadingZero(amount) {
  if (amount < 10) {
    return `0${amount}`;
  } else {
    return `${amount}`;
  }
}

function formattedTime(timeInSeconds) {
  let minutes = Math.floor(timeInSeconds / 60);
  let seconds = timeInSeconds - minutes * 60;

  if (isNaN(minutes) || isNaN(seconds)) {
    return "";
  } else {
    return `${withLeadingZero(minutes)}:${withLeadingZero(seconds.toFixed(0))}`;
  }
}

function formatTime(second) {
  let h = 0,
    i = 0,
    s = parseInt(second);
  if (s > 60) {
    i = parseInt(s / 60);
    s = parseInt(s % 60);
  }
  // 补零
  let zero = function(v) {
    return v >> 0 < 10 ? "0" + v : v;
  };
  return [zero(h), zero(i), zero(s)].join(":");
}

/*
PropsTypes defined for Button 
*/
VideoPlayer.propsTypes = {
  defaultMuted: PropsTypes.bool,
  playing: PropsTypes.bool,
  thumbnailLinks: PropsTypes.string,
  videoPercentage: PropsTypes.func
};
/*
Default props from Button 
*/
VideoPlayer.defaultProps = {
  muted: false,
  defaultMuted: true,
  playing: true,
  posterImage: false,
  thumbnailLinks: "",
  videoPercentage: () => {}
};

export default VideoPlayer;
