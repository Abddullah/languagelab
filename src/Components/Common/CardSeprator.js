import React, { Component, Children } from 'react';
import { View ,Text } from "react-native";


const CardSeprator = ({ children }) => {
    return (
        <View style={Styles.CardStyles}>
            {children}
        </View>
    );
}

const Styles = {
    CardStyles: {
        width: '88%',
        // overflow: 'hidden',
        // height: 190,
        // borderWidth: 1,
        // borderRadius: 15,
        // borderColor: '#ffff',
        // borderBottomWidth: 0,
        // shadowColor: '#cccccc',
        marginHorizontal: '6%',
        // shadowOffset: { width: 2, height: 3 },
        // shadowOpacity: 10,
        // shadowRadius: 0,
        // elevation: 2,
        // marginLeft: 5,
        // marginRight: 5,
        // marginTop: 22,
        // marginBottom: 10,
        // padding: 6,
        // backgroundColor: '#ffff'
    }
}
export { CardSeprator };