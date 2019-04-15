import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Button, Linking, Modal, Text, TouchableOpacity, View } from 'react-native';
import { AccessToken, LoginButton, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { WebView } from 'react-native-webview';

import axios from 'axios';
import qs from 'query-string';

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: '',
            modalVisible: true
        }

    }

    _onNavigationStateChange = (webViewState) => {
        let url = webViewState.url;
        // console.log(url);
        if(url.includes('facebook-callback')){
            // this.hide();
        }
        // Get queries and discard base url
        url = url.split('?');
        url.shift();
        
        // Get queries, find user
        const queries = qs.parse(url[0])
        if(queries.code) {
            this.requestJwt(queries.code.slice(0, -4));
            this.hide();
        }
    }

    show = () => {
        console.log('show');
        this.setState({ modalVisible: true })
    }
      
    hide = () => {
        console.log('hide')
        this.setState({ modalVisible: false })
    }
    
    onError = (err) => {
        console.log(err);
    }

    logout = async() => {
        AccessToken.getCurrentAccessToken()
            .then(data => console.log(data))
        console.log(accessToken)
        let logout =
                new GraphRequest(
                    "me/permissions/",
                    {
                        accessToken: accessToken,
                        httpMethod: 'DELETE'
                    },
                    (error, result) => {
                        if (error) {
                            console.log('Error fetching data: ' + error.toString());
                        } else {
                            console.log('logout')
                            LoginManager.logOut();
                        }
                    });
            new GraphRequestManager().addRequest(logout).start();
    }

    login = async () => {
        console.log('Login')
        // native_only config will fail in the case that the user has
        // not installed in his device the Facebook app. In this case we
        // need to go for webview.
        let res;
        try {
            // Attempt a login using the Facebook login dialog asking for default permissions.
            LoginManager.setLoginBehavior('WEB_ONLY');
            res = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
        }catch(nativeErr) {
            console.log("Login fail with error: " + nativeErr);

            try {
                LoginManager.setLoginBehavior('WEB_ONLY');
                res = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
            }catch(webErr) {
                console.log("Login fail with error: " + webErr);
                // show error message to the user if none of the FB screens
                // did not open

                return;
            }
        }

        if (res.isCancelled) {
            console.log("Login cancelled");
        } else {
            console.log('Login Succeeded. Calling FB Graph')
            this.FBGraphRequest('id, email, picture.type(large)', this.FBLoginCallback);
        }
    }

    FBLoginCallback = (err, res) => {
        console.log('In callback');
        if(err) {
            console.log(`Callback Error: ${err}`);
        }else {
            console.log('Callback Successful!');
            console.log(res);
        }
    }

    FBGraphRequest = async(fields, callback) => {
        console.log('Calling FB Graph')
        try {
            const accessData = await AccessToken.getCurrentAccessToken();
            console.log(accessData)

            // EXECUTE IN FUTURE IF NEED USER EMAIL OR PICTURE
            // const userRequest = new GraphRequest('/me', {
            //     accessToken: accessData.accessToken,
            //     parameters: {
            //         fields: {
            //             string: fields
            //         }
            //     }
            // }, callback);

            // // Execute the graph request created above
            // new GraphRequestManager().addRequest(userRequest).start();
        }catch(err) {
            console.log(err);
        }
    }



    requestJwt = async (inputToken, fbId) => {
        try {
            const res = await axios.post(`https://www.foursome.gq/login/get-fb-jwt`,
                {
                    inputToken,
                    fbId
                });
            if(res.status !== 200) throw new Error('Server could not create JWT');
            else return res.data;
        }catch(err) {
            console.log(err);
            
            return '';
        }
    }
    
    storeJwt = async(jwt) => {
        try {
            await AsyncStorage.setItem('jwt', jwt);

            console.log('Successfully stored JWT');

            const token = await AsyncStorage.getItem('jwt');
            if(token) console.log(`Successfully retrieved JWT: ${token}`);
            else console.log('No JWT was found');
            console.log()
        }catch(err) {
            console.log(err);
            throw new Error('There was a problem storing the JWT in AsyncStorage');
        }
    }

    fbLoginCallback = (error, result) => {
        if (error) {
            console.log(error)
        } else {
            console.log(result)
        }
    }

    fbLogin = async(err, res) => {
        try {
            if (err) {
                console.log(err);
            } else if (res.isCancelled) {
                console.log('login is cancelled.');
            } else {
                const accessData = await AccessToken.getCurrentAccessToken();
                const { accessToken, userID } = accessData;

                const jwt = await this.requestJwt(accessToken, userID);
                if(jwt) await this.storeJwt(jwt);
                else throw new Error('Failed to get JWT from server');

                const infoRequest = new GraphRequest('/me',
                    {
                        accessToken: accessToken,
                        parameters: {
                            fields: {
                                string: 'email,name,first_name,middle_name,last_name'
                            }
                        }
                    }, this.fbLoginCallback);

                    // Start the graph request.
                    new GraphRequestManager().addRequest(infoRequest).start();
            }
        }catch(err) {
            // Failed Login
            console.log(err);
            LoginManager.logOut();
        }
    }

    render() {
        return (
            <View>
                <LoginButton
                    onLoginFinished={this.fbLogin}
                    onLogoutFinished={() => {
                        LoginManager.logOut();
                    }}
                />
            </View>
            // <View
            //     style={{ height: 150, width: 150,overflow:'hidden' }}
            // >
            
            //     <Modal
            //         animationType={'slide'}
            //         visible={this.state.modalVisible}
            //         onRequestClose={this.hide}
            //     >
            //         <WebView
            //             source={{ uri: `https://foursome.gq/login/facebook-login` }}
            //             scalesPageToFit
            //             startInLoadingState
            //             onNavigationStateChange={this._onNavigationStateChange}
            //             onError={this.onError}
            //         />
            //     </Modal>
            // </View>
        );
    }
}


    // login = async () => {
    //     console.log('Liogin')
    //     // native_only config will fail in the case that the user has
    //     // not installed in his device the Facebook app. In this case we
    //     // need to go for webview.
    //     let res;
    //     try {
    //         // Attempt a login using the Facebook login dialog asking for default permissions.
    //         LoginManager.setLoginBehavior('NATIVE_ONLY');
    //         res = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
    //     }catch(nativeErr) {
    //         console.log("Login fail with error: " + error);

    //         try {
    //             LoginManager.setLoginBehavior('NATIVE_ONLY');
    //             res = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
    //         }catch(webErr) {
    //             console.log("Login fail with error: " + error);
    //             // show error message to the user if none of the FB screens
    //             // did not open

    //             return;
    //         }
    //     }

    //     if (res.isCancelled) {
    //         console.log("Login cancelled");
    //     } else {
    //         console.log('Login Succeeded. Calling FB Graph')
    //         this.FBGraphRequest('id, email, picture.type(large)', this.FBLoginCallback);
    //     }
    // }

    // FBLoginCallback = (err, res) => {
    //     console.log('In callback');
    //     if(err) {
    //         console.log(`Callback Error: ${err}`);
    //     }else {
    //         console.log('Callback Successful!');
    //         console.log(res);
    //     }
    // }

    // FBGraphRequest = async(fields, callback) => {
    //     console.log('Calling FB Graph')
    //     const accessData = await AccessToken.getCurrentAccessToken();

    //     const userRequest = new GraphRequest('/me', {
    //         accessToken: accessData.accessToken,
    //         parameters: {
    //             fields: {
    //                 string: fields
    //             }
    //         }
    //     }, callback);

    //     // Execute the graph request created above
    //     new GraphRequestManager().addRequest(userRequest).start();
    // }

