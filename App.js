/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, Children } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.container1}>
        <Image source={require('./src/Components/images/Illustration_splash.png')} style={{width: 480, marginLeft: -60, position:'absolute', opacity: 0.1}}/>
        {/* <Image source={require('./src/Components/images/mage_splash_logo.png')} style={{width: '100%',position:'relative', backgroundColor: 'transparent'}}/> */}
        {/* <Text style={{position: 'relative', color: 'white'}}>asdasd</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
    // width: null,
    // height: null,
    // position: 'absolutes'
  },
  backgroundContainer: {
    flex: 1,
    resizeMode: 'cover',
    width: undefined,
    height: undefined,
    backgroundColor: '#889DAD',
  },
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
