import { createStackNavigator } from 'react-navigation';

import LoginScreen from '../Screens/Login/LoginScreen';
import SignupScreen from '../Screens/Login/SignupScreen';

const LoginNavigator = createStackNavigator(
    {
        Login: { screen: LoginScreen },
        Signup: { screen: SignupScreen }
    },
    {
        initialRouteName: 'Login',
        optimizationsEnabled: true,
        swipeEnabled: true,
        tabBarOptions: {
            activeTintColor: '#f08080',
            inactiveTintColor: '#000000',
            pressColor: '#ffffff',
            indicatorStyle: {
                backgroundColor: '#f4f4f4'
            },
            style: {
                backgroundColor: '#e5e5e5',
            },
        }
    }
);

export default LoginNavigator;