export const handleLogInOut = (navigation, option) => {
    switch(option) {
        case "login":
            navigation.navigate('App');
            break;

        case "logout":
            navigation.navigate('Login');
            break;
    }
}