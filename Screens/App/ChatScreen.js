import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';

import ChatSocket from '../../SocketIO/ChatSocket';

class ChatScreen extends React.Component {
    constructor(props) {
        super(props);

        ChatSocket.initSocket();
    }

    render() {
        return (
            <View>
                <Text>Chat Screen</Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    messages: state.chat.list
});

export default connect(mapStateToProps)(ChatScreen);