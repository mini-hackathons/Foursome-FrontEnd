const defaultState = {};
export default (state=defaultState, action) => {
  switch(action.type) {

    case 'SET_CHAT':
      return {
          ...state,
          list: action.chat
      }

    case 'UPDATE_CHAT':
      return {
          ...state,
          list: action.chat
      }

    default:
      return state;
  }
}