import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import { getMyActivities } from "../../actions/Home/index";
import {
  moderateScale,
  widthScale,
  heightScale
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
      page: 1
    };
  }

  componentDidMount() {
    this.getActivitiesApi();
  }

  getActivitiesApi() {
    let { page } = this.state;
    let param = {
      pageLimit: 10,
      page: page
    };
    this.props.getMyActivities(param, this.props.componentId, activities => {
      console.log("getMyActivities", activities);
      this.setState({
        activities:
          this.state.page === 1
            ? activities
            : [...this.state.activities, ...activities]
      });
    });
  }

  componentWillUnmount() {}
  LoadRandomData = () => {
    this.getActivitiesApi();
  };

  LoadMoreRandomData = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => this.LoadRandomData()
    );
  };

  render() {
    let { activities } = this.state;
    let {
      loader: { myActivityLoader }
    } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={activities}
          keyExtractor={(item, index) => "" + index}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={{ fontSize: 20 }}>{"No data found"}</Text>
            </View>
          }
          renderItem={({ item, index }) => (
            <View
              style={{
                flex: 1,
                backgroundColor: constants.Colors.AuthYellow,
                margin: 10,
                borderRadius: 10,
                height: 90
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%"
                }}
              >
                <View
                  style={{
                    height: moderateScale(50),
                    alignItems: "flex-start",
                    paddingLeft: 20,
                    paddingTop: 5
                  }}
                >
                  <Text
                    style={{
                      color: constants.Colors.Black,
                      fontWeight: "bold",
                      fontSize: 16
                    }}
                  >
                    Hotspot Name: {item.hotspotsDetails.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: moderateScale(14),
                      color: constants.Colors.Black
                    }}
                  >
                    Address: {item.hotspotsDetails.address}
                  </Text>
                  <Text
                    style={{
                      fontSize: moderateScale(14),
                      color: constants.Colors.Black
                    }}
                  >
                    Activity: {item.type}
                  </Text>
                  <Text
                    style={{
                      fontSize: moderateScale(14),
                      color: constants.Colors.Black
                    }}
                  >
                    Date:{" "}
                    {moment(item.createdOn).format("YYYY-MM-DD hh:mm:ss A")}
                  </Text>
                </View>
              </View>
            </View>
          )}
          onEndReachedThreshold={0.5}
          onEndReached={this.LoadMoreRandomData}
        ></FlatList>
        {myActivityLoader && <MyActivityIndicator size="large" />}
      </View>
    );
  }
}
const mapStateToProps = state => ({
  loader: state.loader,
  user: state.user
});

const mapDispatchToProps = { getMyActivities };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyActivity);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
