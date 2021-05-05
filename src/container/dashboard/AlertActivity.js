import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import { getAlertActivities } from "../../actions/Home/index";
import {
  moderateScale,
  widthScale,
  heightScale
} from "../../helpers/ResponsiveFonts";
import constants from "../../constants";
import moment from "moment";
import MyActivityIndicator from "../../components/common/MyActivityIndicator";

class AlertActivity extends React.Component {
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
    this.props.getAlertActivities(param, this.props.componentId, activities => {
      console.log("getAlertActivities", activities);
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
                backgroundColor: constants.Colors.AuthYellow,
                margin: 10,
                borderRadius: 10
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <View
                  style={{
                    alignItems: "flex-start",
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 10,
                    paddingBottom: 10,
                    flex: 1
                  }}
                >
                  <Text
                    style={{
                      color: constants.Colors.Black,
                      fontWeight: "bold",
                      fontSize: 16
                    }}
                  >
                    Employee: {item.employeeDetails.firstName}{" "}
                    {item.employeeDetails.lastName}
                  </Text>
                  <Text
                    style={{
                      fontSize: moderateScale(14),
                      color: constants.Colors.Black
                    }}
                  >
                    {item.employeeDetails.email}
                  </Text>
                  <Text
                    style={{
                      fontSize: moderateScale(14),
                      fontWeight: "bold",
                      color: constants.Colors.Black
                    }}
                  >
                    STATUS: {item.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: moderateScale(14),
                      color: constants.Colors.Black
                    }}
                  >
                    {item.text}
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

const mapDispatchToProps = { getAlertActivities };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlertActivity);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
