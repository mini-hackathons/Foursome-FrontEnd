import React from 'react';
import { connect } from 'react-redux'
import { View } from 'react-native';

import { NavigationEvents } from 'react-navigation';
import Loading from '../components/Loading';

// Push Notifications
import { checkFcmPermissions, onTokenRefreshListener } from '../Fcm/PushNotif';


class RootScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    await checkFcmPermissions();
  }

  componentWillUnmount() {
    onTokenRefreshListener();
  }

  onDidFocus = () => {
    console.log('On did focus')
    if(this.props.token) this.props.navigation.navigate('App');
    else this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View>
        <NavigationEvents onDidFocus={this.onDidFocus}/>
        <Loading></Loading>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
});

export default connect(mapStateToProps)(RootScreen)