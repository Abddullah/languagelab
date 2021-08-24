import React, {Component} from 'react';
import { StyleSheet,Text, View } from 'react-native';


const Header = (props)=>{
    return(
        <View style={styles.container}>
            <Text style={styles.textStyle}>{props.headerText}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    color:'#ffffff', 
  },
  container: {
    // flex: 1,
    height: 60,
    backgroundColor: '#4caf50',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.9,
    elevation: 3,
    position: 'relative',
  },
});
export {Header};