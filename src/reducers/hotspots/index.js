import * as Types from "../../actionTypes";
const initialState = {
  loading: false,
  hotspotsArr: [],
  hotspot: {}
};

const hotspots = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_HOTSPOTS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case Types.GET_HOTSPOTS_SUCCESS:
      return {
        ...state,
        hotspotsArr: action.payload,
        loading: false
      };
    case Types.GET_HOTSPOTS_FAILED:
      return {
        ...state,
        loading: false
      };
    case Types.UPDATE_HOTSPOT_SUCCESS:
      console.log("hotspotArrayValue", state.hotspotsArr, action);
      if (hotspot._id === action.payload._id) {
        return { ...hotspot };
      }
    // return state.hotspotsArr.map(hotspot => {
    //   if (hotspot._id === action.payload._id) {
    //     return { ...hotspot }
    //   };
    //   return hotspot;
    // });
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
};

export default hotspots;
