import firebase from 'react-native-firebase';

export const checkFcmPermissions = async () => {
    const enabled = await firebase.messaging().hasPermission();

    console.log('here----------------')
    if (enabled) {
        // user has permissions
        console.log('Notifications enabled');
    } else {
        console.log('Notifications not enabled');
        await this.requestPermissions();
    }
}

const requestPermissions = async () => {
    try {
        await firebase.messaging().requestPermission();

        console.log('User has now allowed Permissions');

        this.sendFcmTokenToServer();

    } catch (error) {

        console.log('User has denied Permissions');

    }
}

const sendFcmTokenToServer = async() => {
    const fcmToken = await firebase.messaging().getToken();

    if (fcmToken) {

        console.log('Sending Fcm Token to Server');
        console.log(fcmToken);

    } else {

        console.log('User does not have Fcm token yet');

    }
}

export const onTokenRefreshListener = () => {
    firebase.messaging().onTokenRefresh(fcmToken => {
        // Process your token as required

        console.log('Token Refresh');
        console.log(fcmToken);

    })();
}