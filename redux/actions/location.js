import { getLocation } from '../../utils/location';
import axios from 'axios';

const setLocation = (location) => ({
    type: 'SET_LOCATION',
    location
});
export const startSetLocation = (token) => {
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

export const updateLocation = (location) => ({
    type: 'UPDATE_LOCATION'
});