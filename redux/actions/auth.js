export const setJWT = (jwt) => ({
    type: 'SET_JWT',
    jwt
});

export const deleteJWT = () => ({
    type: 'DELETE_JWT'
});