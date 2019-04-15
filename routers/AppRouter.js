import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';

import LoginScreen from '../Screens/LoginScreen';
import HomeScreen from '../Screens/HomeScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import MessagesScreen from '../Screens/MessagesScreen';

const TabNavigator = createMaterialTopTabNavigator({
    Login: { screen: LoginScreen },
    Home: { screen: HomeScreen,
        tabBarIcon: ({ tintColor }) => (<View style={iconContainerStyle}><Icon style={[{color: tintColor}]} size={iconSize} name={'user'}/></View>),
        gesturesEnabled: false, },
      Profile: { screen: ProfileScreen },
      Messages: { screen: MessagesScreen }
}, {
    initialRouteName: 'Home',
    order: ['Login', 'Profile', 'Home', 'Messages'],
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
});

export default createAppContainer(TabNavigator);