const defaultState = {};
export default (state = defaultState, action) => {
  switch (action.type) {

    case 'SET_LOCATION':
      return {
        ...state,
        location: action.location
      }

    default:
      return state;
  }
}