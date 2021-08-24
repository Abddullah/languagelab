import React, { Component } from 'react';
import { Text, TouchableOpacity } from "react-native";

const BtnRounded = ({ children,onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.TouchableOpacity}>
            <Text style={styles.Button}>
                {children}
            </Text>
        </TouchableOpacity >
    );
}

const styles = {
    Button: {
        textAlign: 'center',
        color: '#4caf50',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 0,
        paddingBottom: 0,
        // justifyContent: 'center',
        bottom: 0
        
    },
    TouchableOpacity: {
        marginTop: 3,
        marginBottom: 3,
        flex: 1,
        // alignSlef: 'stretch',
        backgroundColor: '#ffff',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#ffff',
        marginLeft: 5,
        marginRight: 5,
        position: 'relative',
        width: 55,
        justifyContent: 'center',
    }
}
export { BtnRounded };