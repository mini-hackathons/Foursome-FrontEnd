const defaultState = {};
export default (state = defaultState, action) => {
    switch (action.type) {

        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
            };
        case 'DELETE_TOKEN':
            return {
                ...state,
                token: ''
            };

        default:
            return state;
    }
}