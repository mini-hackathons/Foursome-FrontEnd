import { createMaterialTopTabNavigator } from 'react-navigation';

import HomeScreen from '../Screens/App/HomeScreen';
import ProfileScreen from '../Screens/App/ProfileScreen';
import ChatScreen from '../Screens/App/ChatScreen';

const AppNavigator = createMaterialTopTabNavigator({
    Home: { screen: HomeScreen,
        tabBarIcon: ({ tintColor }) => (<View style={iconContainerStyle}><Icon style={[{color: tintColor}]} size={iconSize} name={'user'}/></View>),
        gesturesEnabled: false
    },
    Profile: { screen: ProfileScreen },
    Chat: { screen: ChatScreen }
}, {
    initialRouteName: 'Home',
    order: ['Profile', 'Home', 'Chat'],
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

export default AppNavigator;