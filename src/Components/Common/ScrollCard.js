import React, { Component } from 'react';
import { View } from "react-native";


const ScrollCard = ({children,onPress})=>{
    return(
        <View onPress={onPress} style={Styles.CardStyles}>
            {children}
        </View>
    );
}

const Styles={
    CardStyles:{
        width: '88%',
        // overflow: 'hidden',
        height: 200,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#ffff',
        borderBottomWidth: 0,
        shadowColor: '#cccccc',
        marginHorizontal: '6%',
        shadowOffset: {width: 3, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5,
        // marginLeft: 5,
        // marginRight: 5,
        marginTop: 22,
        marginBottom: 10,        
        // padding: 6,
        backgroundColor: '#ffff'
    }
}
export {ScrollCard};