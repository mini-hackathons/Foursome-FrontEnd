import React from 'react';
import { View, Text } from 'react-native';

const Card = (props) => (
    <View style={{backgroundColor: 'Blue'}}>
        { props.children }
    </View>
)

export default Card;