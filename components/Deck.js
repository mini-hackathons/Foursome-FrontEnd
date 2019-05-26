import React from 'react';
import { connect } from 'react-redux';
import { Animated, PanResponder, Dimensions, Text, View } from 'react-native';
import Loading from './Loading';
import Card from './Card';

import { startSetDeck, startLikeUser, startPassUser } from '../redux/actions/deck';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const RIGHT_BOUND = 5/7 * SCREEN_WIDTH;
const LEFT_BOUND = 3/7 * SCREEN_WIDTH;
const INITIAL_POSITION = {
    x: SCREEN_WIDTH / 2,
    y: SCREEN_HEIGHT / 2
};

let cards = [
    { name: 'Card1' },
    { name: 'Card2' },
    { name: 'Card3' },
    { name: 'Card4' }
]

class Deck extends React.Component {
    constructor(props) {
        super(props);

        this.position = new Animated.ValueXY(INITIAL_POSITION);
        this.offset = {
            x: 0,
            y: 0
        };

        this.state = {
            swipeDirection: ''
        }
    }

    async componentWillMount () {        
        this.position.x.addListener(dx => this.offset.x = dx.value);
        this.position.y.addListener(dy => this.offset.y = dy.value);

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gesture) => true,
            onMoveShouldSetResponderCapture: () => true, //Tell iOS that we are allowing the movement
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: (e, gestureState) => {
                this.position.setValue(INITIAL_POSITION); //Initial value
                this.position.setOffset(this.offset);
            },
            onPanResponderMove: (e, gesture) => {
                Animated.event([
                    null, { dx: this.position.x, dy: this.position.y }
                ])(e, gesture);

                this.checkSwipeDirection();
            },
            onPanResponderRelease: (e, gesture) => {
                this.position.flattenOffset();

                this.animateSwipe(gesture);
                this.position.setValue(INITIAL_POSITION); //Initial value
                this.handleSwipe();
            }
        })
    }

    componentWillUnmount() {
        this.position.x.removeAllListeners();  
        this.position.y.removeAllListeners();
    }

    checkSwipeDirection = () => {
        if(this.offset.x > RIGHT_BOUND) {
            // Only set state once
            if(!this.state.swipeDirection || this.state.swipeDirection !== 'right') this.setState({ swipeDirection: 'right' });
            console.log('like');
        }else if (this.offset.x < LEFT_BOUND) {
            if(!this.state.swipeDirection || this.state.swipeDirection !== 'left') this.setState({ swipeDirection: 'left' });
            console.log('pass');
        }else{
            if(this.state.swipeDirection) this.setState({ swipeDirection: '' });
        }
    }

    animateSwipe = ({ moveX, moveY, x0, y0 }) => {
        const dx = moveX - x0;
        const dy = moveY - y0;
        const hyp = Math.sqrt(dx*dx + dy*dy);
        const unitVector = {
            x: dx/hyp,
            y: dy/hyp
        }
        console.log(unitVector)

        // Throw card
        if(this.state.swipeDirection) {
            Animated.timing(this.position, {
                toValue: {
                    x: unitVector.x * 10000,
                    y: unitVector.y * 10000
                }, // velocity from gesture release
                duration: 1000
            }).start();
        }else {
        // Go back to center
            Animated.spring(this.position, {
                toValue: {
                    x: SCREEN_WIDTH / 2,
                    y: SCREEN_HEIGHT / 2
                }
            }).start();
        }
    }

    handleSwipe = async () => {
        switch(this.state.swipeDirection) {
            case 'right':
                console.log('like');
                await this.props.dispatch(startLikeUser(this.props.deck[0]._id, this.props.token));
                break;

            case 'left':
                console.log('pass');
                await this.props.dispatch(startPassUser(this.props.deck[0]._id, this.props.token));
                break;

            default:
                // Do nothing 
                console.log('Do nothing');
        }

        // Reset swipe direction
        this.setState({ swipeDirection: '' })
    }

    prepareDeck = () => {
        console.log('Prep deck')
        if(!this.props.deck || !this.props.deck.length || this.props.requestDeck) {
            this.requestDeck();
        }
    }

    requestDeck = async () => {
        console.log('Calling start set deck')
        this.props.onDidRequestDeck();
        await this.props.dispatch(startSetDeck(this.props.token));
        console.log('Deck:')
        console.log(this.props.deck)
    }

    render() {
        this.prepareDeck();
        
        return (
            this.props.deck === 'None' ?
            <Text>No more users</Text>
            :
            !this.props.deck || !this.props.deck.length ?
            <Loading/>
            :
            this.props.deck.slice(0, 2).map((card, i) => {
                console.log(card)

                return(
                (i === 0) ?
                <Animated.View
                    {...this.panResponder.panHandlers}
                    key={card._id}
                    style={[{ transform: this.position.getTranslateTransform() }, { height: SCREEN_HEIGHT - 120, width: 100, padding: 10, position: 'absolute' }]}
                >
                    <Card>
                        <Text>{card._id}</Text>
                    </Card>
                </Animated.View>
                :
                <Animated.View
                    key={card._id}
                    style={[{ height: SCREEN_HEIGHT - 120, width: 100, padding: 10, position: 'absolute' }]}
                >
                    <Card>
                        <Text>OTHER CARD</Text>
                    </Card>
                </Animated.View>
            )})
        )
    }
}
const mapStateToProps = (state) => ({
    token: state.auth.token,
    deck: state.deck.list
});

export default connect(mapStateToProps)(Deck);