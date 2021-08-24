import React, { Component } from 'react';
import { StatusBar, View, StyleSheet, Platform } from 'react-native';

const MyStatusBar = ({ backgroundColor, ...props, }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const styles = StyleSheet.create({
    statusBar: {
        height: STATUSBAR_HEIGHT,
        zIndex: 10
    },
})

export default MyStatusBar;