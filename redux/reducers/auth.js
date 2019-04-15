const defaultState = {};
export default (state = defaultState, action) => {
    switch (action.type) {

        case 'SET_JWT':
            return {
                ...state,
                jwt: action.jwt
            };
        case 'DELETE_JWT':
            return {
                ...state,
                jwt: ''
            };

        default:
            return state;
    }
}