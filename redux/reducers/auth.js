const defaultState = {};
export default (state = defaultState, action) => {
    switch (action.type) {

        case 'SET_JWT':
            return {
                ...state,
                token: action.token
            };
        case 'DELETE_JWT':
            return {
                ...state,
                token: ''
            };

        default:
            return state;
    }
}