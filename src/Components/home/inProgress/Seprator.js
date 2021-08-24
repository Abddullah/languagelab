import React, { Component } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity } from 'react-native';
import { CardSeprator, SepratorContent } from '../../Common';

class Seprator extends Component {
    render() {
        return (
            <CardSeprator>
                <SepratorContent>
                    <Text style={{ color: '#1a237e', fontWeight: 'bold', flex: 1, overflow: 'hidden' }} numberOfLines={1}>
                        IN PROGRESS
                    </Text>
                    <View style={{ borderTopColor: '#b3b3b3', borderTopWidth: 1, width: '71%', marginTop: 10 }} >
                    </View>
                </SepratorContent>
            </CardSeprator>
        )
    }
}

export default Seprator;