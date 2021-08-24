import React, { Component } from 'react';
import { Text, TouchableOpacity } from "react-native";

const ButtonIcon = ({ children,onPress }) => {
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
        // textAlign: 'center',
        color: '#cccccc',
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
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'white',
        // marginLeft: 5,
        // marginRight: 5,
        position: 'relative',
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        
    }
}
export { ButtonIcon };