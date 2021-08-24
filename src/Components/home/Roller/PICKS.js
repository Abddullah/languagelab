import React, { Component } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity } from 'react-native';
import { CardSeprator, SepratorContent } from '../../Common';
// import { Header, Body, Left, Right, Button, Card, Thumbnail, CardItem, Icon, Content } from 'native-base'
// import { SignInAction, LogOutAction } from '../../Actions/AuthAction';
import { connect } from 'react-redux';


class PICKS extends Component {
    render() {
        return (
            <CardSeprator>
                <SepratorContent>
                    <Text style={{fontSize: 10, color: '#1a237e', fontWeight: 'bold', flex: 1, overflow: 'hidden' }} numberOfLines={1}>
                        TOP-PICKS
                        {/* {this.props.name} */}
                    </Text>
                    <View style={{ borderTopColor: '#b3b3b3', borderTopWidth: 1, width: '75%', marginTop: 6 }} >
                    </View>
                </SepratorContent>
            </CardSeprator>
        )
    }
}

// const mapStateToProps = (state) => {
//     return {
//         auth: state.AuthReducer.authLogOut,
//         userEmail: state.AuthReducer.authSignIn,
//         loader: state.AuthReducer.loader,
//         errorMessage: state.AuthReducer.authErrors,
//     };
// }
// const mapDispatchToProps = (dispatch) => {
//     return {
//         SignInAction: (userLogin) => {
//             dispatch(SignInAction(userLogin));
//         },
//         LogOutAction: () => {
//             dispatch(LogOutAction());
//         }
//     };
// }
export default connect(null, null)(PICKS);