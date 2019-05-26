import React from 'react';
import { Button, Text, View } from 'react-native';

export default class SignupScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    onLogin = () => {
        this.props.navigation.navigate('Login');
    }

    render() {
        return (
            <View>
                <Text>SignUp Screen</Text>
        
                <Button
                    onPress={this.onLogin}
                    title="Login"
                />
            </View>
        );
    }

}