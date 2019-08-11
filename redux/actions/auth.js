import axios from 'axios';

const setJwt = (token) => ({
    type: 'SET_JWT',
    token
});
export const startSetJwt = (inputToken, fbId) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`https://www.foursome.gq/login/get-fb-jwt`,
            {
                inputToken,
                fbId
            });

            if(res.status === 200) {
                const token = res.data;

                dispatch(setJwt(token));
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