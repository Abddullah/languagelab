import React, { Component } from 'react';
import { View } from "react-native";


const SepratorContent = ({children})=>{
    return(
        <View style={Styles.CardStyles}>
            {children}
        </View>
    );
}

const Styles={
    CardStyles:{
        overflow: 'hidden',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative'
    }
}
export {SepratorContent};