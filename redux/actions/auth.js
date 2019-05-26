import axios from 'axios';

const setToken = (token) => ({
    type: 'SET_TOKEN',
    token
});
export const startSetToken = (inputToken, fbId) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`https://www.foursome.gq/login/get-fb-jwt`,
            {
                inputToken,
                fbId
            });

            if(res.status === 200) {
                const token = res.data;

                dispatch(setToken(token));
            }
            else {
                throw new Error('Server could not create JWT');
            }
        }catch(err) {
            console.log(err);
        }
    }
}

export const deleteJwt = () => ({
    type: 'DELETE_JWT'
});