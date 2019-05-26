import { startSetLocation } from './actions/location';
// import { startSetDeck } from './actions/deck';

export default async (dispatch, token) => {
    await Promise.all([
        dispatch(startSetLocation(token)),
        // dispatch(startSetDeck(token))
    ]);
}