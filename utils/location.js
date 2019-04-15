export const getLocation = async () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            pos => {
                resolve({
                    long: pos.coords.longitude,
                    lat: pos.coords.latitude,
                })
            },
            err => {
                reject(err)
            },
            {
                enableHighAccuracy: true,
                timeout: 20000
            }
        );
    });
}