import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import { connect } from "react-redux";
import { getMyActivities } from "../../actions/Home/index";
import {
  moderateScale,
  widthScale,
  heightScale,
} from "../../helpers/ResponsiveFonts";
import constants from "../../constants";
import moment from "moment";
import MyActivityIndicator from "../../components/common/MyActivityIndicator";

class MyActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      loadingExtraData: false,
      page: 1,
    };
  }

  componentDidMount() {
    this.getActivitiesApi();
  }

  getActivitiesApi() {
    let { page } = this.state;
    let param = {
      pageLimit: 20,
      page: page,
    };
    this.props.getMyActivities(param, this.props.componentId, (activities) => {
      console.log("getMyActivities", activities);
      if (activities.length != 0) {
        this.setState({
          activities:
            this.state.page === 1
              ? activities
              : [...this.state.activities, ...activities],
        });
      } else {
        this.setState({ page: -1 });
      }
    });
  }

  componentWillUnmount() {}
  LoadRandomData = () => {
    this.getActivitiesApi();
  };

  LoadMoreRandomData = () => {
    if (this.state.page != -1) {
      this.setState(
        {
          page: this.state.page + 1,
        },
        () => this.LoadRandomData()
      );
    }
  };

  renderActivities = (item, index) => {
    return (
      <View
        style={{
          backgroundColor: constants.Colors.White,
          marginHorizontal: 10,
          borderRadius: 5,
          // height: 150,
          marginVertical: 8,
          borderWidth: 0.5,
          padding: 12,
        }}
      >
        <Text
          style={{
            color: constants.Colors.Black,
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Hotspot Name: {item.hotspotsDetails.name}
        </Text>
        <Text
          style={{
            fontSize: moderateScale(14),
            color: constants.Colors.Black,
          }}
        >
          Address: {item.hotspotsDetails.address}
        </Text>
        <Text
          style={{
            fontSize: moderateScale(14),
            color: constants.Colors.Black,
          }}
        >
          Activity: {item.type}
        </Text>
        <Text
          style={{
            fontSize: moderateScale(14),
            color: constants.Colors.Black,
            fontWeight: "bold",
          }}
        >
          Date: {moment(item.createdOn).format("YYYY-MM-DD hh:mm:ss A")}
        </Text>
      </View>
    );
  };

  render() {
    let { activities } = this.state;
    let {
      loader: { myActivityLoader },
    } = this.props;
    return (
      <View style={styles.container}>
        <Text
          style={{
            color: constants.Colors.Black,
            fontWeight: "bold",
            fontSize: 22,
            marginVertical: 10,
            textAlign: "center",
            // marginLeft: 10,
          }}
        >
          List of Hotspots visited
        </Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={activities}
          contentContainerStyle={{ flexGrow: 1 }}
          keyExtractor={(item, index) => "" + index}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                // backgroundColor: "red",
              }}
            >
              <Text style={{ fontSize: 20 }}>{"No data found"}</Text>
            </View>
          }
          renderItem={({ item, index }) => this.renderActivities(item, index)}
          onEndReachedThreshold={0.5}
          onEndReached={this.LoadMoreRandomData}
        ></FlatList>
        {myActivityLoader && <MyActivityIndicator size="large" />}
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  loader: state.loader,
  user: state.user,
});

const mapDispatchToProps = { getMyActivities };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyActivity);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 0,
  },
});
