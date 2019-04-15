const defaultState = {};
export default (state=defaultState, action) => {
  switch(action.type) {

    case 'UPDATE_TEST':
      return {
          ...state,
          test: action.test
      }

    case 'TOGGLE_TEST':
      const test = state.test === 'One' ? 'Two' : 'One'
      return {
          ...state,
          test
      }

    default:
      return state;
  }
}