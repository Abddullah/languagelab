import React, { Component } from 'react';
import { View } from "react-native";


const CardSection = ({children})=>{
    return(
        <View style={Styles.CardStyles}>
            {children}
        </View>
    );
}

const Styles={
    CardStyles:{
        // borderBottomWidth: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height:140,
        // padding: 5,
        overflow: 'hidden',
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        // borderColor: '#d9d9d9',
        position: 'relative'
    }
}
export {CardSection};