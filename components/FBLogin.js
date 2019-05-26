import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { AccessToken, LoginButton, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';


class FBLogin extends React.Component {
    constructor(props) {
        super(props);
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

                // Get JWT
                await this.props.onLogin(accessToken, userID);

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
            // LoginManager.logOut();
        }
    }
    fbLoginCallback = (error, result) => {
        if (error) {
            console.log(error)
        } else {
            console.log(result)
        }
    }

    logout = () => {
        LoginManager.logOut();
    }

    render() {
        return (
            <View>
                <LoginButton
                    onLoginFinished={this.fbLogin}
                    onLogoutFinished={this.logout}
                />
            </View>
        );
    }
}

mapStateToProps = (state) => ({

})

export default connect(mapStateToProps)(FBLogin);