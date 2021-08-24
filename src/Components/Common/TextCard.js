import React, { Component } from 'react';
import { View } from "react-native";


const TextCard = ({children})=>{
    return(
        <View style={Styles.CardStyles}>
            {children}
        </View>
    );
}

const Styles={
    CardStyles:{
        // borderBottomWidth: 1,
        paddingTop: 15,
        paddingRight: 15,
        paddingLeft: 15,
        paddingBottom: 10,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        // borderColor: '#d9d9d9',
        position: 'relative'
    }
}
export {TextCard};