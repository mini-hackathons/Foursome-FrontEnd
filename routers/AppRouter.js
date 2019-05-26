import { createMaterialTopTabNavigator } from 'react-navigation';

import HomeScreen from '../Screens/App/HomeScreen';
import ProfileScreen from '../Screens/App/ProfileScreen';
import MessagesScreen from '../Screens/App/MessagesScreen';

const AppNavigator = createMaterialTopTabNavigator({
    Home: { screen: HomeScreen,
        tabBarIcon: ({ tintColor }) => (<View style={iconContainerStyle}><Icon style={[{color: tintColor}]} size={iconSize} name={'user'}/></View>),
        gesturesEnabled: false
    },
    Profile: { screen: ProfileScreen },
    Messages: { screen: MessagesScreen }
}, {
    initialRouteName: 'Home',
    order: ['Profile', 'Home', 'Messages'],
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