import { getLocation } from '../../utils/location';

const setLocation = (location) => ({
    type: 'SET_LOCATION',
    location
});
export const startSetLocation = () => {
    return async (dispatch) => {
        try {
            const location = await getLocation();
            
            console.log('----------------------------------------');
            console.log(location);

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