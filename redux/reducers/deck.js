const defaultState = {
    list: []
};
console.log('in deck')
export default (state = defaultState, action) => {
    switch (action.type) {

        case 'SET_DECK':
            return {
                ...state,
                list: action.deck
            };

        case 'REMOVE_CARD':
            return {
                ...state,
                list: state.list.filter(card => card._id !== action.id)
            }

        default:
            return state;
    }
}