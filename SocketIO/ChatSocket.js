import io from 'socket.io-client';

class Chat {
    constructor() {
        this.socket = io('http://localhost:3000');
    }

    initSocket = () => {
        this.initReceiveMessage();
    }

    initReceiveMessage = () => {
        this.socket.on('chat-message-recipient', (data) => {
           console.log('Message received') 
           console.log(data);
        });
    }
}

export default ChatSocket = new Chat();