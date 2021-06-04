import * as types from "../../actionTypes";
import RestClient from "../../helpers/RestClient";
import Connection from "../../config/Connection";

import { getDateDiffInYears } from "../../helpers/common";
let headers = {
  "App-Id": "4acf88d6",
  "App-Key": "61f2408636f1e07b0cd1cdd340ae97ee",
};

export const getCovidAssessmentQus = (evidence = []) => {
  return (dispatch, getState) => {
    let {
      user: { userData },
    } = getState();

    console.log("userData", userData);
    let age =
      userData && userData.dateOfBirth
        ? getDateDiffInYears(userData.dateOfBirth)
        : 30;

    let sex = userData && userData.gender == "M" ? "male" : "female";

    console.log("ages", age);
    let params = {
      age: age <= 150 ? age : 150,
      evidence,
      sex,
    };
    console.log(params);
    try {
      dispatch({
        type: types.INFERMEDICA_LOADER_ON,
      });
      RestClient.restInfermedicaCall(
        Connection.getInfermedicaUrl() + "diagnosis",
        "POST",
        params,
        headers
      )
        .then((response) => {
          console.log("response of Question -------", response);
          const { question, should_stop } = response;

          dispatch({
            type: types.INFERMEDICA_LOADER_OFF,
          });
          console.log("should_stop", should_stop);

          if (question) {
            console.log("question type", question.type);

            dispatch({
              type: types.GET_ASSESSMENT_QUESTIONS,
              payload: response,
            });
          } else if (should_stop === true) {
            console.log("Covid assessment final==>> ", JSON.stringify(params));
            dispatch(getCovidAssessmentTriage(params));
          } else if (response.message) {
            console.log(response.message);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    } catch (error) {
      console.log("error in Catch", error);
    }
  };
};

export const getCovidAssessmentTriage = (params) => {
  return (dispatch, getState) => {
    try {
      RestClient.restInfermedicaCall(
        Connection.getInfermedicaUrl() + "triage",
        "POST",
        params,
        headers
      )
        .then((response) => {
          console.log("response of Trageis ", response);
          dispatch({
            type: types.GET_ASSESMENT_SUMMARY,
            payload: response,
          });
        })
        .catch((error) => console.log("error in Api", error));
    } catch (error) {
      console.log("error is ", error);
    }
  };
};

export const finishAssesment = () => {
  return (dispatch, getState) => {
    try {
      dispatch({
        type: types.CLEAR_INFERMEDICA_VALUES,
      });
    } catch (error) {
      console.log("error is ", error);
    }
  };
};
