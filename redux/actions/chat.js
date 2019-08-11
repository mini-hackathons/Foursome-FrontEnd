import axios from 'axios';

const setChat = (chat) => ({
    type: 'SET_CHAT',
    location
});
export const startSetChat = (chat) => {
    return async (dispatch) => {
        try {
            const location = await getLocation();

            const data = await axios.post('https://www.foursome.gq/update-location', {
                location,
                token
            });
            console.log(data);

            dispatch(setLocation(location));
        }
        catch(err) {
            console.log('----------------------------------------');
            console.log(err);
        }
    }
}

export const addChat = (chat) => ({
    type: 'ADD_CHAT'
});