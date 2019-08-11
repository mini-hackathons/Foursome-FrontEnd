import React from 'react';
import { connect } from 'react-redux';
import { Button, Text, View } from 'react-native';

import FBLogin from '../../components/FBLogin';
import { startSetJwt } from '../../redux/actions/auth';
import initStore from '../../redux/initStore';
import { handleLogInOut } from '../../utils/navigation';

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    onFBLogin = async (accessToken, userID) => {
        // Set token
        console.log(this.props.token)
        await this.props.dispatch(startSetJwt(accessToken, userID));
        // Pass token
        console.log(this.props.token)
        await initStore(this.props.dispatch, this.props.token);
        handleLogInOut(this.props.navigation, 'login');

    }

    render() {
        return (
            <View>
                <Text>Login Screen</Text>
                <FBLogin
                    onLogin={this.onFBLogin}
                />
        
                <Button
                    onPress={() => this.props.navigation.navigate('Signup')}
                    title="Signup"
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.auth.token
})

export default connect(mapStateToProps)(LoginScreen);