import React, { Component } from 'react';
import { Text, TouchableOpacity } from "react-native";

const Button = ({ children,onPress }) => {
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
        paddingTop: 10,
        paddingBottom: 10,
    },
    TouchableOpacity: {
        marginTop: 3,
        marginBottom: 3,
        flex: 1,
        // alignSlef: 'stretch',
        backgroundColor: '#ffff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#4caf50',
        marginLeft: 5,
        marginRight: 5,
        position: 'relative'
        
    }
}
export { Button };