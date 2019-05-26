import { createStackNavigator, createAppContainer } from 'react-navigation';

import RootScreen from '../Screens/RootScreen';
import LoginRouter from '../routers/LoginRouter';
import AppRouter from '../routers/AppRouter';

const StartupNavigator = createStackNavigator(
    {
        Root: { screen: RootScreen },
        Login: { screen: LoginRouter },
        App: { screen: AppRouter },
    },
    {
        initialRouteName: 'Root',
        headerMode: 'none',
        lazy: true,
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

export default createAppContainer(StartupNavigator);