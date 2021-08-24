import React, { Component } from 'react';
import { View, StatusBar, AppState } from 'react-native';
import { Provider } from 'react-redux';
import store from './Store/store';
import Routers from './index'
import { LogOutFunc } from './Actions/logoutAction';
import { connect } from 'react-redux';


class App extends Component {
    constructor(props) {
        super(props);

    }
    componentWillMount() {
        console.disableYellowBox = true
        this.state = {
            appState: AppState.currentState

        }
    }
    componentDidMount() {
        console.log('hello world');
        LogOutFunc();
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }
    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground!')
        }
        this.setState({ appState: nextAppState });
        console.log('handle changed called', this.state.appState)
    }
    render() {
        return (
            <Provider store={store}>
                <View style={{ flex: 1 }}>
                    <Routers />
                </View>
            </Provider>
        );
    }
}

export default App;