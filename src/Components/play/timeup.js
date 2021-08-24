import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import { Container, Content, Header, Body, ListItem, List, Button, Right, Left, Title, Drawer, Fab, Footer, FooterTab, Spinner, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { historyAction } from '../../Actions/user_detail';
// import * as nb from 'native-base';
import { saveResultToDb, wrongAnswerAction } from '../../Actions/alldata';
import QuitDialogBox from './quitdialogbox';
import { onlineUserScoreUpdatOnViewScore } from '../../Actions/playUpdateDbAction';
import Toast from 'react-native-simple-toast';

import { connect } from 'react-redux';
import { removeQuizFromHistory } from '../../Actions/removeQuizAction';
import * as firebase from 'firebase';

class TimeUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            next: true,
            nextTeam: false,
            quitDialog: false
        };

    }

    myScoreBoard() {
        console.log(this.props, '/////////////')
        if (this.props.isNetAvailable === true) {
            Actions.scoreboard({ userData: this.props.userDatas, chatObjDetails: this.props.chatObjDetails, quizType: this.props, type: "reset" })
        }
        else {
            Toast.show('Please check internet connection.');
        }
    }

    componentWillMount() {
        console.log('wrong 5555555555555', this.props.chatObjDetails)
        console.log('scoreToSave5555555555555', this.props.submittedQuestionsList, this.props.answerSubmissionTime)
        // let updatedScoreToSave = 0;
        // for (var i = 0; i < this.props.answerSubmissionTime.length; i++) {
        //     let questionDetails = this.props.submittedQuestionsList[i];
        //     if (questionDetails.selectedOoption.toLowerCase() === 'a' && questionDetails.answer1.correctAns === true || questionDetails.selectedOoption.toLowerCase() === 'b' && questionDetails.answer2.correctAns === true || questionDetails.selectedOoption.toLowerCase() === 'c' && questionDetails.answer3.correctAns === true || questionDetails.selectedOoption.toLowerCase() === 'd' && questionDetails.answer4.correctAns === true) {
        //         updatedScoreToSave += (this.props.answerSubmissionTime[i] / 10 * 2) + ((players.length - 1) * 10)
        //     }
        // }
        // console.log(updatedScoreToSave,'updatedScoreToSave timeup')
        if (this.props.isNetAvailable === true) {

            this.props.wrongAnswerAction();
            if ('TeamName' in this.props.quizteam) {
                const { TeamName } = this.props.quizteam;
                firebase.database().ref('/gameRom').child(TeamName.pin).once('value', (snap) => {
                    let players = snap.val().players;
                    players.map((v, i) => {
                        if (v.teamName === TeamName.teamName) {
                            // console.log(v, i)
                            firebase.database().ref(`/gameRom/${TeamName.pin}/players`).child(i).update({ quizSelected: true })
                        }
                    })
                })

                this.setState({
                    nextTeam: true
                })
            } else {
                let currentUser = firebase.auth().currentUser.uid;

                firebase.database().ref('inprogress/' + currentUser + '/' + this.props.quizData.name.titles + '/').remove();
                let totalQuestions = this.props.quizData.questions.length;
                if (this.props.currentIndex < (totalQuestions - 1)) {
                    this.setState({ next: true })
                } else {
                    if (this.props.chatObjDetails && this.props.chatObjDetails.type && this.props.chatObjDetails.type === 'challenge') {
                        this.setState({ next: false })
                        let scoreToSave = 0;
                        for (var i = 0; i < this.props.answerSubmissionTime.length; i++) {
                            let questionDetails = this.props.submittedQuestionsList[i];
                            // console.log(questionDetails, 'question details', questionDetails.selectedOoption)
                            if (questionDetails && questionDetails !== undefined && questionDetails !== null && 'correctSequence' in questionDetails !== true && 'selectedOoption' in questionDetails) {

                                if (questionDetails.selectedOoption.toLowerCase() === 'a' && questionDetails.answer1.correctAns === true || questionDetails.selectedOoption.toLowerCase() === 'b' && questionDetails.answer2.correctAns === true || questionDetails.selectedOoption.toLowerCase() === 'c' && questionDetails.answer3.correctAns === true || questionDetails.selectedOoption.toLowerCase() === 'd' && questionDetails.answer4.correctAns === true) {
                                    console.log(this.props.numberOfNewOpponent, '---------')
                                    if (this.props.answerSubmissionTime[i] !== undefined) {

                                        scoreToSave += 10 + (this.props.answerSubmissionTime[i] / 10 * 2) + (this.props.numberOfNewOpponent * 10)
                                    }
                                    // questionDetails.time = this.props.answerSubmissionTime;

                                }
                            }
                            else {
                                if (questionDetails && questionDetails !== undefined && questionDetails !== null && 'correctAnswer' in questionDetails === true && questionDetails.correctAnswer === true) {
                                    if (this.props.answerSubmissionTime[i] !== undefined) {

                                        scoreToSave += 10 + (this.props.answerSubmissionTime[i] / 10 * 2) + (this.props.numberOfNewOpponent * 10)
                                    }
                                }
                            }
                        }
                        this.props.onlineUserScoreUpdatOnViewScore(firebase.auth().currentUser, scoreToSave);

                        let resultObject = {
                            quizName: this.props.quizData.name.titles,
                            totalScore: scoreToSave,
                            resultSummary: this.props.submittedQuestionsList,
                            playedOn: Date.now(),
                            played: totalQuestions,
                            totalCorrectAnswers: this.props.correctAns,
                            totalIncorrectAnswers: this.props.wrongAns,
                            gameType: this.props.chatObjDetails.type,
                            challengeKey: this.props.chatObjDetails.key,
                            timeSummary: this.props.answerSubmissionTime
                        }
                        let currentUser = firebase.auth().currentUser.uid;
                        if (currentUser === this.props.chatObjDetails.receiverUid) {
                            resultObject.opponentId = this.props.chatObjDetails.senderID;
                        }
                        else {
                            resultObject.opponentId = this.props.chatObjDetails.receiverUid;
                        }

                        this.props.saveResultToDb(resultObject);


                        console.log('challenged result', this.props.quizData, resultObject);
                    }
                    else {
                        let currentUser = firebase.auth().currentUser.uid;
                        firebase.database().ref('inprogress/' + currentUser + '/' + this.props.quizData.name.titles + '/').remove();

                        this.props.removeQuizFromHistory(this.props.quizData);
                        this.setState({ next: false })
                        let scoreToSave = 0;
                        for (var i = 0; i < this.props.answerSubmissionTime.length; i++) {
                            console.log(this.props.answerSubmissionTime[i], '---------')
                            let questionDetails = this.props.submittedQuestionsList[i];
                            // console.log(questionDetails, 'question details', questionDetails.selectedOoption)
                            if (questionDetails && questionDetails !== undefined && questionDetails !== null && 'correctSequence' in questionDetails !== true && 'selectedOoption' in questionDetails) {

                                if (questionDetails.selectedOoption.toLowerCase() === 'a' && questionDetails.answer1.correctAns === true || questionDetails.selectedOoption.toLowerCase() === 'b' && questionDetails.answer2.correctAns === true || questionDetails.selectedOoption.toLowerCase() === 'c' && questionDetails.answer3.correctAns === true || questionDetails.selectedOoption.toLowerCase() === 'd' && questionDetails.answer4.correctAns === true) {
                                    if (this.props.answerSubmissionTime[i] !== undefined) {
                                        // questionDetails.time = this.props.answerSubmissionTime;
                                        if (this.props.answerSubmissionTime[i] !== undefined) {

                                            scoreToSave += 10 + this.props.answerSubmissionTime[i] / 10 * 2
                                        }
                                    }
                                }
                            }
                            else {
                                if (questionDetails && questionDetails !== undefined && questionDetails !== null && 'correctAnswer' in questionDetails === true && questionDetails.correctAnswer === true) {
                                    if (this.props.answerSubmissionTime[i] !== undefined) {
                                        scoreToSave += 10 + this.props.answerSubmissionTime[i] / 10 * 2

                                    }
                                }
                            }
                        }
                        this.props.onlineUserScoreUpdatOnViewScore(firebase.auth().currentUser, scoreToSave);

                        let resultObject = {
                            quizName: this.props.quizData.name.titles,
                            totalScore: scoreToSave,
                            playedOn: Date.now(),
                            played: totalQuestions,
                            totalCorrectAnswers: this.props.correctAns,
                            totalIncorrectAnswers: this.props.wrongAns,
                            gameType: this.props.quizType,
                            resultSummary: this.props.submittedQuestionsList,
                            timeSummary: this.props.answerSubmissionTime

                        }
                        console.log(resultObject, 'resultObjectresultObject');
                        this.props.saveResultToDb(resultObject);
                    }
                }
            }
        }
        else {
            Toast.show('Please check internet connection.');

        }
    }

    greatTry() {
        let updatedIndex = this.props.currentIndex + 1;
        this.props.switchToNext(updatedIndex)
    }

    render() {

        return (
            <Container style={{ backgroundColor: '#F72F2F', opacity: 0.9, position: 'absolute', zIndex: 10, width: '100%', height: Dimensions.get('window').height }} >
                <StatusBar backgroundColor='#F72F2F' />
                <Content >
                    <List style={{ alignItems: 'center', }}>
                        <View style={{ marginTop: '15%' }}>
                            <Image source={require('../images/times_up_icon.png')} />
                        </View>
                        <View style={{ marginTop: '5%' }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Time's Up!</Text>
                        </View>
                        <View style={{ marginTop: '5%' }}>
                            {
                                !this.state.nextTeam ?
                                    this.state.next ?
                                        <TouchableOpacity onPress={this.greatTry.bind(this)}>
                                            <Image source={require('../images/great_try_btn.png')} style={{}} />
                                        </TouchableOpacity> : null : null
                            }
                        </View>
                        <View>
                            <TouchableOpacity style={{ alignSelf: 'center', marginTop: 100 }} onPress={() => { this.setState({ quitDialog: true }) }} >
                                <Text style={{ color: 'white', fontSize: 14 }} >Quit Game</Text>
                            </TouchableOpacity>
                        </View>
                        <View >
                            {/* <Text style={{ color: 'white', marginTop: 120, fontSize: 14 }}>You're on 4th place</Text> */}
                        </View>
                        <View >
                            {/* <Text style={{ color: 'white', fontSize: 14, }}>you're on 748 points behind nancy</Text> */}

                        </View>
                        <View >
                            {
                                !this.state.nextTeam ?
                                    !this.state.next ?
                                        <TouchableOpacity style={{ alignSelf: 'center' }} onPress={this.myScoreBoard.bind(this)}>
                                            <Text style={{ color: 'yellow', fontSize: 16, marginTop: 25 }}>View scorecard</Text>
                                        </TouchableOpacity> : null : null
                            }

                        </View>

                    </List>
                </Content>
                <QuitDialogBox visible={this.state.quitDialog} outsideTouch={(invisible) => this.setState({ quitDialog: invisible })} />

            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        userDatas: state.userdata,
        correctAns: state.loadEveryThing.correctAnswer,
        wrongAns: state.loadEveryThing.wrongAnswer,
        answerSubmissionTime: state.loadEveryThing.answerSubmissionTime,
        numberOfNewOpponent: state.loadEveryThing.numberOfOpponent,
        isNetAvailable: state.AuthReducer.connectionStatus,
        submittedQuestionsList: state.loadEveryThing.submittedQuestionsList


    };
};

export default connect(mapStateToProps, { removeQuizFromHistory, saveResultToDb, wrongAnswerAction, onlineUserScoreUpdatOnViewScore })(TimeUp);