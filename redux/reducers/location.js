const defaultState = {};
export default (state = defaultState, action) => {
  switch (action.type) {

    case 'SET_LOCATION':
      return {
        ...state,
        currentLocation: action.location
      }

    default:
      return state;
  }
}