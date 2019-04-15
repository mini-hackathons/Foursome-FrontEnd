import React from 'react';
import { connect } from 'react-redux';
import { Button, StyleSheet, Text, View } from 'react-native';

import Deck from '../components/Deck';
import { toggleTest } from '../redux/actions/test';
import { startSetLocation } from '../redux/actions/location';

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    onToggle = () => {
        this.props.dispatch(toggleTest());
    }
    onSetLocation = () => {
        this.props.dispatch(startSetLocation());
    }

    render() {
        return (
            <View>
                <Text>{ this.props.test }</Text>
                {
                    Object.keys(this.props.location).map(
                        key => <Text>{key}: {this.props.location[key]}</Text>
                    )
                }
                <Deck></Deck>
                <Button
                    title="Set Test"
                    onPress={this.onToggle}
                />
                <Button
                    title="Set Location"
                    onPress={this.onSetLocation}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);

    return ({
        test: state.test.test,
        location: state.location.currentLocation
    });
}

export default connect(mapStateToProps)(HomeScreen);