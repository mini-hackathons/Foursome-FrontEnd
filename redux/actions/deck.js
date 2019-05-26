import axios from 'axios';

const removeCard = (id) => ({
    type: 'REMOVE_CARD',
    id
});
export const startLikeUser = (otherUserId, token) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('https://www.foursome.gq/like-user', {
                otherUserId,
                token
            });
            console.log(response.data.data);
            const deck = response.data.data;

            dispatch(removeCard(otherUserId));
        }catch(err) {
            console.log('----------------------------------------');
            console.log(err);
        }
    }   
}
export const startPassUser = (otherUserId, token) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('https://www.foursome.gq/pass-user', {
                otherUserId,
                token
            });
            console.log(response.data.data);
            const deck = response.data.data;

            dispatch(removeCard(otherUserId));
        }catch(err) {
            console.log('----------------------------------------');
            console.log(err);
        }
    }   
}

const setDeck = (deck) => ({
    type: 'SET_DECK',
    deck
});
export const startSetDeck = (token) => {
    console.log('Start set deck--------------------')
    return async (dispatch) => {
        try {

            const response = await axios.post('https://www.foursome.gq/get-nearby-users', {
                radius: 50,
                token
            });
            console.log(response.data.data);
            const deck = response.data.data;

            dispatch(setDeck(deck));
        }
        catch(err) {
            console.log('----------------------------------------');
            console.log(err);
        }
    }
}