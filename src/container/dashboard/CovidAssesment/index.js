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
  Platform,
  Linking,
} from "react-native";
import { connect } from "react-redux";
import { Dialog } from "../../../helpers/common";

import {
  moderateScale,
  widthScale,
  heightScale,
} from "../../../helpers/ResponsiveFonts";
import moment from "moment";
import { bindActionCreators } from "redux";
const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;
import * as AppAction from "../../../actions";
import Constants from "../../../constants";
import AuthButton from "../../../components/common/AuthButton";
import MyActivityIndicator from "../../../components/common/MyActivityIndicator";

class CovidAssesment extends React.Component {
  state = {
    answerArray: [],
    temp_array: [],
    group_single: {},
    disclaimer: true,
  };
  async componentDidMount() {
    let { userData, AppAction } = this.props;
    console.log("Lets Get Started", userData);
    await AppAction.getCovidAssessmentQus();
  }
  handleSelectionAnswer = (choice, index, quesArr) => {
    console.log("choice is ", choice);
    console.log("index is", index);
    console.log("quesArr", quesArr);
    let obj = {};
    obj = {
      id: quesArr.id,
      choice_id: choice.id,
    };
    let { temp_array, answerArray } = this.state;
    console.log("answerArray before ", answerArray.length);
    console.log("temp_array before", temp_array.length);

    let i = answerArray.findIndex((_item) => _item.id === quesArr.id);
    if (i > -1) answerArray[i] = obj;
    else answerArray.push(obj);

    let j = temp_array.findIndex((_item) => _item.id === quesArr.id);
    console.log("j", j);
    if (j > -1) temp_array[j] = obj;
    else temp_array.push(obj);

    console.log("temp_array after ", temp_array);
    console.log("answerArray after ", answerArray);
    this.setState({ temp_array, answerArray });
  };

  renderGroupMultiple = (item, index) => {
    let { temp_array, answerArray } = this.state;
    return (
      <View
        style={{
          paddingVertical: 10,
          height: 100,
          width: "100%",
          borderWidth: 0,
          marginVertical: 5,
        }}
      >
        <Text style={styles.question}>{item.name}?</Text>
        <View style={{ marginTop: 10, flexDirection: "row" }}>
          {item.choices &&
            item.choices.map((choice, index) => (
              <QuestionGroupMultiple
                key={index}
                question={item}
                choice={choice}
                index={index}
                answers={answerArray}
                handleSelectionAnswer={() =>
                  this.handleSelectionAnswer(choice, index, item)
                }
              />
            ))}
        </View>
      </View>
    );
  };

  renderGroupSingle = (item, index) => {
    let { temp_array, answerArray, group_single } = this.state;
    return (
      <View
        style={{
          paddingVertical: 10,
          width: "100%",
          borderWidth: 0,
          marginVertical: 5,
        }}
      >
        <QuestionGroupSingle
          key={index}
          answer={group_single}
          choice={item}
          handleSelectionAnswer={() =>
            this.handleSelectionAnswerSingle(item, index)
          }
        />
      </View>
    );
  };
  handleSelectionAnswerSingle = (item, index) => {
    let { group_single } = this.state;
    console.log("item", item);
    let obj = {
      id: item.id,
      choice_id: "present",
    };
    console.log("object is ", obj);
    console.log("group_single is before ", group_single);

    this.setState(
      {
        group_single: obj,
      },
      () => {
        console.log("group_single after", group_single);
      }
    );
  };
  renderQuestions = (item, index) => {
    let { question_type } = this.props;
    console.log("question_type", question_type);
    if (question_type == "group_single")
      return this.renderGroupSingle(item, index);
    else return this.renderGroupMultiple(item, index);
  };

  handleNextQues = async () => {
    let { answerArray, temp_array, group_single } = this.state;
    let { questions, AppAction, question_type } = this.props;
    if (question_type == "group_single") {
      answerArray.push(group_single);
      console.log("answerArray", answerArray);
      await AppAction.getCovidAssessmentQus(answerArray);
      this.setState({ group_single: {}, answerArray });
    } else {
      if (temp_array.length != questions.length) {
        Dialog(
          "Please answer all the Question to proceed further.",
          [
            {
              text: "OK",
              onPress: () => {},
            },
          ],
          { cancelable: false }
        );
        console.log("all the questions are not answered yet ");
      } else {
        console.log("proceed further");
        await AppAction.getCovidAssessmentQus(answerArray);
        this.setState({ temp_array: [] });
      }
    }
  };
  QuestionsFooter = () => {
    let { should_stop } = this.props;
    return (
      <View
        style={[
          Constants.Styles.center,
          { paddingVertical: 10, marginTop: "5%" },
        ]}
      >
        <TouchableOpacity
          style={[styles.nextButton, Constants.Styles.center]}
          onPress={() => this.handleNextQues()}
        >
          <Text style={styles.next}>{should_stop ? "FINISH" : "NEXT"}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  handleFinishAssesment = async () => {
    let { AppAction, componentId } = this.props;
    AppAction.finishAssesment();
    AppAction.pop(componentId);
  };
  render() {
    let {
      questions,
      should_stop,
      covid_diagonsis,
      covidSummary,
      loader,
      AppAction,
      componentId,
    } = this.props;
    let { infermedicaLoader } = loader;
    let { disclaimer } = this.state;
    // console.log("questions", this.props);
    return (
      <View style={[Constants.Styles.container, { padding: 5 }]}>
        {infermedicaLoader && <MyActivityIndicator size="large" />}

        {disclaimer ? (
          <Disclaimer
            onProceed={() => this.setState({ disclaimer: false })}
            onCancel={() => AppAction.pop(componentId)}
          />
        ) : covidSummary ? (
          <View style={{ padding: "3%" }}>
            <Text style={styles.ques_text}>Your Test Summary :</Text>
            <Text
              style={{
                fontSize: moderateScale(15),
                color: Constants.Colors.Black,
                marginVertical: 5,
              }}
            >
              {covidSummary.description}
            </Text>

            <Text
              style={{
                fontSize: moderateScale(15),
                color: Constants.Colors.Black,
                marginVertical: 5,
              }}
            >
              Conclusion : {covidSummary.label}
            </Text>

            <View
              style={[
                Constants.Styles.center,
                { paddingVertical: 10, marginTop: "5%" },
              ]}
            >
              <TouchableOpacity
                style={[styles.nextButton, Constants.Styles.center]}
                onPress={() => this.handleFinishAssesment()}
              >
                <Text style={styles.next}>FINISH</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <Text style={styles.ques_text}>
              {covid_diagonsis && covid_diagonsis.question.text}
            </Text>
            <FlatList
              data={questions}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) =>
                this.renderQuestions(item, index)
              }
              ListFooterComponent={() => this.QuestionsFooter()}
              extraData={this.state}
            />
          </>
        )}
      </View>
    );
  }
}

const QuestionGroupSingle = ({
  index,
  answer,
  choice,
  handleSelectionAnswer,
}) => {
  console.log("the answer is ", answer);
  let selected = answer && answer.id == choice.id;
  return (
    <TouchableOpacity onPress={handleSelectionAnswer}>
      <View
        style={{
          marginLeft: 5,
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
            selected
              ? Constants.Images.Questionnaire.selected
              : Constants.Images.Questionnaire.unselected
          }
          resizeMode={"contain"}
        />
        <Text
          style={{
            color: Constants.Colors.Black,
            fontSize: 16,
            marginLeft: 10,
          }}
        >
          {choice.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const QuestionGroupMultiple = ({
  handleSelectionAnswer,
  choice,
  index,
  question,
  answers,
}) => {
  let selected = false;

  selected =
    answers.length != 0 &&
    (answers.find((item, i) => {
      return question.id == item.id && item.choice_id == choice.id
        ? true
        : false;
    }) == undefined
      ? false
      : true);
  return (
    <TouchableOpacity
      onPress={handleSelectionAnswer}
      disabled={selected}
      style={[
        styles.answerView,
        Constants.Styles.center,
        {
          backgroundColor: selected
            ? Constants.Colors.White
            : Constants.Colors.AuthYellow,
        },
      ]}
      key={index}
    >
      <Text style={styles.answerText}>{choice.label}</Text>
    </TouchableOpacity>
  );
};

const Disclaimer = ({ onCancel, onProceed }) => {
  let { conditions, linkUrl } = Constants.Strings.DisclaimerText;
  return (
    <View style={{ flex: 1, paddingHorizontal: "5%" }}>
      <Text style={[styles.disclaimerHeading]}>DISCLAIMER</Text>
      {conditions.map((item, i) => (
        <Text style={styles.disclaimertext} key={i}>
          {item}
        </Text>
      ))}
      {linkUrl.map((item, i) => (
        <Text
          style={[styles.linkText]}
          key={i}
          onPress={() => Linking.openURL(item)}
        >
          {item}
        </Text>
      ))}

      <DButton label={"Continue"} onPress={onProceed} customStyles={true} />
      <DButton label={"Cancel"} onPress={onCancel} />
    </View>
  );
};

const DButton = ({ onPress, label, customStyles = false }) => {
  return (
    <View style={[Constants.Styles.center, { marginTop: "6%" }]}>
      <TouchableOpacity
        style={[
          styles.nextButton,
          Constants.Styles.center,
          customStyles
            ? { backgroundColor: Constants.Colors.AuthYellow, borderWidth: 1 }
            : {},
        ]}
        onPress={onPress}
      >
        <Text
          style={[
            styles.next,
            customStyles
              ? { color: Constants.Colors.Black, borderWidth: 0 }
              : {},
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
function mapStateToProps(state) {
  return {
    loader: state.loader,
    userData: state.user.userData,
    questions: state.infermedica.questions,
    should_stop: state.infermedica.should_stop,
    covid_diagonsis: state.infermedica.covid_diagonsis,
    question_type: state.infermedica.question_type,
    covidSummary: state.infermedica.covidSummary,
    // guideDescription: state.user.guideDescription,
    // GuideName: state.user.GuideName,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    AppAction: bindActionCreators(AppAction, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CovidAssesment);

const styles = StyleSheet.create({
  ques_text: {
    color: Constants.Colors.Black,
    fontSize: moderateScale(16),
    fontWeight: "500",
  },
  question: {
    color: Constants.Colors.Black,
    fontSize: moderateScale(17),
    marginHorizontal: 10,
  },
  answerView: {
    width: moderateScale(72),
    height: moderateScale(36),
    borderRadius: moderateScale(10),
    borderWidth: 0.75,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 1, height: 2 },
      },
      android: {
        elevation: 6,
      },
    }),
    marginHorizontal: 10,
  },
  answerText: {
    color: Constants.Colors.DarkGray,
    fontSize: moderateScale(15),
  },
  next: {
    color: Constants.Colors.White,
    fontSize: moderateScale(18),
    fontWeight: "bold",
  },
  nextButton: {
    width: "60%",
    height: moderateScale(45),
    borderRadius: moderateScale(10),
    borderWidth: 0,
    backgroundColor: "red",
  },
  disclaimertext: {
    color: Constants.Colors.Black,
    fontSize: moderateScale(17),
    marginVertical: 5,
  },
  linkText: {
    color: "blue",
    fontSize: moderateScale(17),
    marginVertical: 5,
    marginTop: 5,
  },
  disclaimerHeading: {
    color: Constants.Colors.Black,
    fontSize: moderateScale(18),
    marginVertical: 5,
    fontWeight: "bold",
  },
});
