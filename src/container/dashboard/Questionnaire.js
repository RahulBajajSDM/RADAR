import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  Dimensions,
  ScrollView,
  SectionList,
  Image,
} from "react-native";
import { connect } from "react-redux";
import {} from "../../actions/Home/index";
import {
  moderateScale,
  widthScale,
  heightScale,
} from "../../helpers/ResponsiveFonts";
import constants from "../../constants";
import {
  pushToParticularScreen,
  getQuestionsList,
  addQuestionnaire,
} from "../../actions";
import MyActivityIndicator from "../../components/common/MyActivityIndicator";
import moment from "moment";
import Icon from "react-native-vector-icons/MaterialIcons";

const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;
class Questionnaire extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionnaireId: null,
      questionnaireName: null,
      questionsData: [],
      selectedAnswer: [],
    };
  }

  componentDidMount() {
    let { user } = this.props;
    this.props.getQuestionsList(
      user.questionnaireId,
      // "5fc0902cdb83875e62b5524e",
      this.props.componentId,
      (cb) => {
        this.setState({
          questionnaireId: cb._id,
          questionnaireName: cb.name,
        });
        let questions = [...cb.questions];
        questions.forEach((ques) => {
          ques.data = ques.options;
          ques.data.forEach((option) => {
            option.isSelected = false;
          });
          delete ques.options;
        });
        this.setState({ questionsData: questions });
      }
    );
  }

  componentWillUnmount() {
    // unregister all event listeners
    // BackgroundGeolocation.removeAllListeners();
  }

  submitQuestionnaire() {
    let { questionnaireId, questionnaireName } = this.state;
    let questions = [];
    this.state.questionsData.forEach((ques) => {
      let question = { ...ques };
      question.options = ques.data;
      delete question.answer;
      delete question.data;
      questions.push({ question: question, answer: ques.answer });
    });

    let param = {
      questionnaireId: questionnaireId,
      questionnaireName: questionnaireName,
      questions: questions,
    };
    this.props.addQuestionnaire(param, this.props.componentId);
  }

  render() {
    let { questionsData, questionnaireName } = this.state;
    let {
      loader: { addQuestionnaire },
    } = this.props;
    return (
      <ScrollView style={styles.container}>
        <View style={{ paddingBottom: 50 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", paddingLeft: 20 }}>
            {questionnaireName}
          </Text>
          <SectionList
            renderItem={({ item, section }) => (
              <TouchableOpacity
                onPress={() => {
                  var sectionDataa = { ...section };
                  sectionDataa.data.map((cb) => {
                    if (cb.label === item.label) {
                      cb.isSelected = !cb.isSelected;
                    } else {
                      if (section.type === "radio") {
                        cb.isSelected = false;
                      }
                    }
                  });
                  questionsData.map((question) => {
                    if (question._id === section._id) {
                      question.answer = section.data
                        .filter(function(el) {
                          return el.isSelected === true;
                        })
                        .map(function(el) {
                          return el.label;
                        })
                        .join(",");
                      this.setState({ questionsData: questionsData });
                    }
                  });
                }}
              >
                <View
                  style={{
                    marginLeft: 20,
                    marginBottom: 10,
                    flex: 1,
                    flexDirection: "row",
                  }}
                >
                  <Image
                    style={{
                      height: 20,
                      width: 20,
                      borderWidth: 0,
                    }}
                    source={
                      section.type === "radio"
                        ? item.isSelected
                          ? constants.Images.Questionnaire.selected
                          : constants.Images.Questionnaire.unselected
                        : item.isSelected
                        ? constants.Images.Questionnaire.checkboxSelected
                        : constants.Images.Questionnaire.checkboxUnselected
                    }
                    resizeMode={"contain"}
                  />
                  <Text
                    style={{
                      color: constants.Colors.Black,
                      fontSize: 16,
                    }}
                  >
                    {" "}
                    {item.label}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => item + index}
            renderSectionHeader={({ section }) => (
              <View
                style={{
                  margin: 20,
                  flex: 1,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: constants.Colors.Black,
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  Question: {section.question}
                </Text>
              </View>
            )}
            sections={questionsData}
          />
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 20,
          }}
        >
          <TouchableOpacity
            style={styles.myActivityButton}
            onPress={() => this.submitQuestionnaire()}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
            >
              {"Submit Questionnaire"}
            </Text>
          </TouchableOpacity>
        </View>
        {addQuestionnaire && <MyActivityIndicator size="large" />}
      </ScrollView>
    );
  }
}
const mapStateToProps = (state) => ({
  loader: state.loader,
  user: state.user,
});

const mapDispatchToProps = { getQuestionsList, addQuestionnaire };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Questionnaire);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  myActivityContainer: {
    alignItems: "flex-end",
    padding: moderateScale(20),
  },
  myActivityButton: {
    backgroundColor: constants.Colors.AuthYellow,
    width: 250,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
  },
  topContainer: {
    height: 100,
  },
});
