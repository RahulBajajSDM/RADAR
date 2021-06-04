import * as Types from "../../actionTypes";

const initialState = {
  questions: [],
  should_stop: false,
  covid_diagonsis: null,
  question_type: null,
  covidSummary: null,
};

const infermedica = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_ASSESSMENT_QUESTIONS:
      return {
        ...state,
        questions:
          (action.payload.question && action.payload.question.items) || [],
        should_stop: action.payload.should_stop,
        covid_diagonsis: action.payload,
        question_type: action.payload.question && action.payload.question.type,
      };

    case Types.GET_ASSESMENT_SUMMARY:
      return {
        ...state,
        covidSummary: action.payload,
      };

    case Types.CLEAR_INFERMEDICA_VALUES:
      return {
        ...state,
        questions: [],
        should_stop: false,
        covid_diagonsis: null,
        question_type: null,
        covidSummary: null,
      };

    default:
      return state;
  }
};

export default infermedica;
