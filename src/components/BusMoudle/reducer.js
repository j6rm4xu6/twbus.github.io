const initState = {
  city: '',
  rouderName: [],
  typeList: [],
  direction: 0,
  stopName: [],
  nextBusTimes: [],
};
  
export default (state = initState, action) => {
  switch (action.type) {
    case 'BUS_GET_ROUTER_NAME':

      return {
        ...state,
        city: action.city,
        rouderName: action.data,
        typeList: action.typeList,
      };

      case 'BUS_SET_SELECT_DIRECTION':

        return {
          ...state,
          direction: action.data,
        };

      case 'BUS_GET_BUS_STOP_NAME':

        return {
          ...state,
          stopName: action.data,
        };

      case 'BUS_GET_BUS_NEXT_TIME':

        return {
          ...state,
          nextBusTimes: action.data,
        };

    default:
    return state;
  }
};
