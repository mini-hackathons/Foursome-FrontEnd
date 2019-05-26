import React from 'react';
import { connect } from 'react-redux';
import { Button, StyleSheet, Text, View } from 'react-native';
import { LoginManager } from 'react-native-fbsdk';

import Deck from '../../components/Deck';
import { toggleTest } from '../../redux/actions/test';
import { startSetLocation } from '../../redux/actions/location';
import { handleLogInOut } from '../../utils/navigation';

import axios from 'axios';

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            requestDeck: false
        }
    }

    onToggle = () => {
        this.props.dispatch(toggleTest());
    }
    onSetLocation = () => {
        this.props.dispatch(startSetLocation());
    }

    onVerifyJwt = async() => {
        console.log('in')
        try{
            const data = await axios.post('https://www.foursome.gq/login/verify-jwt', {
                token: this.props.jwt
            });
    
            console.log(data);
        }catch(err) {
            console.log(err);
        }
    }

    onSendLocation = async() => {
        console.log('in')
        try{
            const data = await axios.post('https://www.foursome.gq/update-location', {
                location: this.props.location,
                token: this.props.jwt
            });
    
            console.log(data);
        }catch(err) {
            console.log(err);
        }
    }

    onLogout = () => {
        LoginManager.logOut();
        this.props.onLogout();
        handleLogInOut(this.props.navigation, 'logout');
    }

    onRequestDeck = () => {
        this.setState({ requestDeck: true });
    }
    onDidRequestDeck = () => {
        this.setState({ requestDeck: false });
    }

    render() {
        return (
            <View>
                <Button
                    title="Logout"
                    onPress={this.onLogout}
                />

                <Text>{ this.props.test }</Text>
                {
                    !!this.props.location && Object.keys(this.props.location).map(
                        key => <Text>{key}: {this.props.location[key]}</Text>
                    )
                }
                <Text>{ this.props.token }</Text>
                <Deck
                    requestDeck={this.state.requestDeck}
                    onDidRequestDeck={this.onDidRequestDeck}
                />
                {/* <Button
                    title="Set Test"
                    onPress={this.onToggle}
                />
                <Button
                    title="Set Location"
                    onPress={this.onSetLocation}
                />
                <Button
                    title="Verify JWT"
                    onPress={this.onVerifyJwt}
                />
                <Button
                    title="Send Location"
                    onPress={this.onSendLocation}
                />
                <Button
                    title="Request Deck"
                    onPress={this.onRequestDeck}
                /> */}
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);

    return ({
        test: state.test.test,
        token: state.auth.token,
        location: state.location.location,
        deck: state.deck.list
    });
}

const mapDispatchToProps = (dispatch) => ({
    onLogout: () => {
        console.log('logout')
        dispatch({ type: 'USER_LOGOUT' });
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);