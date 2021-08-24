import React, { Component } from "react";
import {
    ActivityIndicator,
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Keyboard,
    AsyncStorage
} from "react-native";
import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';
import { challengeAcceptAction } from '../Actions/challengeAction'
import { connect } from "react-redux";
import { addname } from '../Actions/user_detail'
import Toast from 'react-native-simple-toast';


class AllMessages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            challengeAcceptButton: true
        };
        // console.log(this.props.data, ' this.props.data this.props.data this.props.data');

    }

    shouldComponentUpdate(nextProps, nextState) {
        if (Actions.currentScene === 'message') {
            return true;
        }
        else {
            return false;
        }
    }
    chellengeAccept() {
        let userUid = firebase.auth().currentUser.uid;
        let acceptObj = {
            msg: 'Your challege has been accepted.',
            quizTitle: this.props.data.quizTitle,
            receiverUid: this.props.data.senderID,
            senderID: userUid,
            type: 'challenge',
            challengeAccept: true,
            key: this.props.data.key,
            timeStamp: this.props.data.timeStamp,
            challengedDone: true,
            quizToChellange: this.props.data.quizToChallenge

        }
        console.log(acceptObj, 'acceptObjacceptObjacceptObj');
        // console.log(this.props.userName, 'this.props.userName Action11111111')
        // console.log(acceptObj,'acceptObj')
        AsyncStorage.setItem('@OnlineUser:onlineUser', JSON.stringify({ userName: this.props.userName }))

        if (this.state.challengeAcceptButton === true) {
            console.log('accepted')
            if (this.props.isNetAvailable === true) {

                this.props.challengeAcceptAction(acceptObj, this.props.selectedData);
                this.setState({ challengeAcceptButton: false });
            }
            else {
                Toast.show('Please check internet connection.');

            }
        }
        else {
            console.log('already accepted.');
        }
    }
    declineChallenge() {
        let userUid = firebase.auth().currentUser.uid
        let decline = {
            msg: 'Your challege has been declined.',
            receiverUid: this.props.data.senderID,
            senderID: userUid,
            timeStamp: firebase.database.ServerValue.TIMESTAMP,
            type: 'challenge',
            challengeAccept: 'false',
            challengedDone: false

        }
        if (this.props.isNetAvailable === true) {
            firebase.database().ref('chat/').push(decline)
                .then(() => {
                    Actions.pop()
                })
                .catch((error) => {
                    Toast.show(error.message);
                })
        }
        else {
            Toast.show('Please check internet connection.');

        }
    }

    seeMessage() {
        // console.log(this.props.data.quizToChellange,'sssssssssssss');
        if (this.props.isNetAvailable === true) {
            firebase.database().ref('/user/').once('value', (allUsersCore) => {
                let allUsers = allUsersCore.val();
                let propsClone = this.props.data;
                let senderUserData = allUsers[this.props.data.senderID];
                propsClone.onlineUser = senderUserData;
                propsClone.quiz = this.props.data.quizToChellange
                //  console.log(propsClone, '------');
                // console.log(allUsers,'************', this.props.data,propsClone);    

                Actions.message({ data: propsClone });
                // let data={
                //     onlineUser: allUsers[this.props.data.senderID],
                //     quiz: this.props.data.name
                // }        
            });
        }
        else {
            Toast.show('Please check internet connection.');

        }
        // Actions.message({ data: this.props.data })
    }
    goBack() {
        Actions.pop();
    }
    render() {
        // console.log('messageData', this.props.data)
        let chatToCheck = this.props.data;
        console.log(chatToCheck.challengeAccept === false, 'chatToCheck.challengeAccept === false ', chatToCheck.challengeAccept);
        console.log('chatToCheck', chatToCheck, chatToCheck.type === 'challenge', 'challengeAccept' in chatToCheck === true, chatToCheck.challengeAccept === false, 'challengedDone' in chatToCheck === true, chatToCheck.challengedDone === false, chatToCheck, chatToCheck.type === 'challenge' && ('challengeAccept' in chatToCheck === true && chatToCheck.challengeAccept === false && 'challengedDone' in chatToCheck === true && chatToCheck.challengedDone === false));
        return (

            <View style={{ flex: 1, backgroundColor: '#effcfe' }} >
                {(this.props.data.type === 'message') ? (
                    <View >
                        <Text style={{ color: '#039be5', fontSize: 35, textAlign: 'center', alignSelf: 'center', width: '80%', marginVertical: 150 }} >You Got A New Message</Text>

                        <View style={{ flexDirection: 'row', marginHorizontal: '5%', }} >
                            <TouchableOpacity onPress={() => Actions.pop()} style={{ flex: 1, marginHorizontal: '2%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#4caaf4', paddingVertical: 15, borderRadius: 10 }} >
                                <Text style={{ color: 'white', fontWeight: 'bold'}}  >Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.seeMessage.bind(this)} style={{ marginHorizontal: '2%', flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fbe924', paddingVertical: 15, borderRadius: 10 }} >
                                <Text style={{ color: '#4caaf4', fontWeight: 'bold' }} >See Message</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (

                        (chatToCheck.type === 'challenge' && ('challengeAccept' in chatToCheck === true && chatToCheck.challengeAccept !== true && 'challengedDone' in chatToCheck === true && chatToCheck.challengedDone === false)) ?
                            (
                                <View >
                                    <Text style={{ color: '#039be5', fontSize: 35, textAlign: 'center', alignSelf: 'center', width: '80%', marginVertical: 150 }} >{this.props.data.msg}</Text>

                                    <View style={{ flexDirection: 'row', marginHorizontal: '5%', }} >
                                        <TouchableOpacity onPress={this.goBack.bind(this)} style={{ flex: 1, marginHorizontal: '2%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#4caaf4', paddingVertical: 15, borderRadius: 10 }} >
                                            <Text style={{ color: 'white', fontWeight: 'bold' }}  >Back</Text>
                                        </TouchableOpacity>
                                        {/* <TouchableOpacity onPress={this.chellengeAccept.bind(this)} style={{ marginHorizontal: '2%', flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fbe924', paddingVertical: 15, borderRadius: 10 }} >
                                <Text style={{ color: '#4caaf4', fontWeight: 'bold', fontSize: 19 }} >Accept</Text>
                            </TouchableOpacity> */}
                                    </View>
                                </View>
                            ) : (
                                <View >
                                    <Text style={{ color: '#039be5', fontSize: 35, textAlign: 'center', alignSelf: 'center', width: '80%', marginVertical: 150 }} >{this.props.data.msg}</Text>

                                    <View style={{ flexDirection: 'row', marginHorizontal: '5%', }} >

                                        <TouchableOpacity onPress={this.declineChallenge.bind(this)} style={{ flex: 1, marginHorizontal: '2%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#4caaf4', paddingVertical: 15, borderRadius: 10 }} >
                                            <Text style={{ color: 'white', fontWeight: 'bold' }}  >Decline</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={this.chellengeAccept.bind(this)} style={{ marginHorizontal: '2%', flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fbe924', paddingVertical: 15, borderRadius: 10 }} >
                                            <Text style={{ color: '#4caaf4', fontWeight: 'bold'}} >Accept</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )

                    )}
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedData: state.loadEveryThing.selectedQuizArray,
        userName: state.AuthReducer.user.userName,
        isNetAvailable: state.AuthReducer.connectionStatus

        // onlineUsers: state.userdata.onlineUsers
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        challengeAcceptAction: (acceptObj, selectedQuiz) => {
            dispatch(challengeAcceptAction(acceptObj, selectedQuiz));
        },
        addname: (userName) => {
            dispatch(addname(userName))
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(AllMessages);
// export default AllMessages


