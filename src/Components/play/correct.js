import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions, StatusBar, TouchableOpacity, AsyncStorage } from 'react-native';
import { Container, Content, Header, Body, ListItem, List, Button, Right, Left, Title, Drawer, Fab, Footer, FooterTab, Spinner, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { addscore } from '../../Actions/user_detail';
import { saveResultToDb } from '../../Actions/alldata';
import { connect } from 'react-redux';
import { removeQuizFromHistory } from '../../Actions/removeQuizAction';
import { onlineUserScore, onlineUserScoreUpdatOnViewScore } from '../../Actions/playUpdateDbAction';
import * as firebase from 'firebase'
import Result from '../myComponents/result';
import QuitDialogBox from './quitdialogbox';
// import * as nb from 'native-base';
import Toast from 'react-native-simple-toast';

var window = Dimensions.get('window');
class Correct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            next: true,
            nextTeam: false,
            quitDialog: false
        };

    }

    componentWillMount() {
        console.log('wrong 5555555555555', this.props.chatObjDetails, this.props.quizteam)
        console.log('scoreToSave5555555555555', this.props.submittedQuestionsList, this.props.answerSubmissionTime)
        // let updatedScoreToSave = 0;
        // for (var i = 0; i < this.props.answerSubmissionTime.length; i++) {
        //     let questionDetails = this.props.submittedQuestionsList[i];
        //     console.log(questionDetails, 'question details', questionDetails.selectedOoption)
        //     if (questionDetails.selectedOoption.toLowerCase() === 'a' && questionDetails.answer1.correctAns === true || questionDetails.selectedOoption.toLowerCase() === 'b' && questionDetails.answer2.correctAns === true || questionDetails.selectedOoption.toLowerCase() === 'c' && questionDetails.answer3.correctAns === true || questionDetails.selectedOoption.toLowerCase() === 'd' && questionDetails.answer4.correctAns === true) {
        //         updatedScoreToSave += (this.props.answerSubmissionTime[i] / 10 * 2) + ((players.length - 1) * 10)
        //     }
        // }
        // console.log(updatedScoreToSave, 'updatedScoreToSave correct')
        if (this.props.isNetAvailable === true) {

            if ('TeamName' in this.props.quizteam) {
                const { TeamName } = this.props.quizteam;
                console.log(TeamName, 'bababaa');
                firebase.database().ref('/gameRom').child(TeamName.pin).once('value', (snap) => {
                    let players = snap.val().players;
                    players.map((v, i) => {
                        if (v.teamName === TeamName.teamName) {
                            // console.log(v, i)
                            firebase.database().ref(`/gameRom/${TeamName.pin}/players`).child(i).update({ quizSelected: true })
                        }
                    })
                })
                firebase.database().ref('/gameRom').child(TeamName.pin).once('value', (snap) => {
                    let players = snap.val().players;
                    let scoreToSave = 0;
                    for (var i = 0; i < this.props.answerSubmissionTime.length; i++) {
                        console.log(this.props.numberOfNewOpponent, '---------')
                        let questionDetails = this.props.submittedQuestionsList[i];
                        // console.log(questionDetails, 'question details', questionDetails.selectedOoption)
                        if (questionDetails && questionDetails !== undefined && questionDetails !== null && 'correctSequence' in questionDetails !== true && 'selectedOoption' in questionDetails) {
                            if (questionDetails.selectedOoption.toLowerCase() === 'a' && questionDetails.answer1.correctAns === true || questionDetails.selectedOoption.toLowerCase() === 'b' && questionDetails.answer2.correctAns === true || questionDetails.selectedOoption.toLowerCase() === 'c' && questionDetails.answer3.correctAns === true || questionDetails.selectedOoption.toLowerCase() === 'd' && questionDetails.answer4.correctAns === true) {
                                if(this.props.answerSubmissionTime[i] !== undefined){
                                    scoreToSave += 10+(this.props.answerSubmissionTime[i] / 10 * 2) + ((players.length - 1) * 10)
                                            
                                }
                                // questionDetails.time = this.props.answerSubmissionTime;
                            }
                        }
                        else {
                            if (questionDetails && questionDetails !== undefined && questionDetails !== null && 'correctAnswer' in questionDetails === true && questionDetails.correctAnswer === true) {
                                if(this.props.answerSubmissionTime[i] !== undefined){
                                    scoreToSave += 10+(this.props.answerSubmissionTime[i] / 10 * 2) + ((players.length - 1) * 10)
                                            
                                }
                            }
                        }
                    }
                    players.map((v, i) => {
                        if (v.teamName === TeamName.teamName) {
                            if ('result' in v) {
                                let correctAnswers = v.result.correctAnswers + 1
                                let score = v.result.score + 10
                                let result = {
                                    correctAnswers,
                                    score,
                                    totalScore: scoreToSave,
                                    resultSummary: this.props.submittedQuestionsList,
                                    timeSummary: this.props.answerSubmissionTime
                                }


                                firebase.database().ref(`/gameRom/${TeamName.pin}/players`).child(i).update({ result })
                            } else {
                                let result = {
                                    correctAnswers: 1,
                                    score: 10,
                                    totalScore: scoreToSave,
                                    resultSummary: this.props.submittedQuestionsList,
                                    timeSummary: this.props.answerSubmissionTime
                                }


                                firebase.database().ref(`/gameRom/${TeamName.pin}/players`).child(i).update({ result })
                            }
                        }
                    })
                })
                this.setState({
                    nextTeam: true
                })
            }
            else {
                if (firebase.auth().currentUser !== null) {
                    console.log('inside correct line 82')
                    this.props.onlineUserScore(firebase.auth().currentUser)
                }
                else {
                    AsyncStorage.getItem('@LocalUser:score', (err, snap) => {
                        var arr = JSON.parse(snap);
                        if (arr !== null) {
                            let updateScore = arr.score + 10
                            // console.log(updateScore)
                            AsyncStorage.setItem('@LocalUser:score', JSON.stringify({ score: updateScore }))
                        } else {
                            AsyncStorage.setItem('@LocalUser:score', JSON.stringify({ score: 10 }))
                        }
                    })
                }
                let totalQuestions = this.props.quizData.questions.length;
                if (this.props.currentIndex < (totalQuestions - 1)) {
                    this.setState({ next: true })
                }
                else {
                    console.log('line 102', this.props.chatObjDetails)
                    if (this.props.chatObjDetails && this.props.chatObjDetails.type && this.props.chatObjDetails.type === 'challenge') {

                        console.log('line 102', this.props.chatObjDetails)
                        this.setState({ next: false })
                        let scoreToSave = 0;
                        for (var i = 0; i < this.props.answerSubmissionTime.length; i++) {
                            let questionDetails = this.props.submittedQuestionsList[i];
                            // console.log(questionDetails, 'question details', questionDetails.selectedOoption)
                            if (questionDetails && questionDetails !== undefined && questionDetails !== null && 'correctSequence' in questionDetails !== true && 'selectedOoption' in questionDetails) {
                                if (questionDetails.selectedOoption.toLowerCase() === 'a' && questionDetails.answer1.correctAns === true || questionDetails.selectedOoption.toLowerCase() === 'b' && questionDetails.answer2.correctAns === true || questionDetails.selectedOoption.toLowerCase() === 'c' && questionDetails.answer3.correctAns === true || questionDetails.selectedOoption.toLowerCase() === 'd' && questionDetails.answer4.correctAns === true) {
                                    console.log(this.props.numberOfNewOpponent, '---------')
                                    if(this.props.answerSubmissionTime[i] !== undefined){
                                        scoreToSave += 10+(this.props.answerSubmissionTime[i] / 10 * 2) + (this.props.numberOfNewOpponent * 10)
                                            
                                    }
                                    // questionDetails.time = this.props.answerSubmissionTime;

                                }
                            }
                            else {
                                if (questionDetails && questionDetails !== undefined && questionDetails !== null && 'correctAnswer' in questionDetails === true && questionDetails.correctAnswer === true) {
                                    if(this.props.answerSubmissionTime[i] !== undefined){
                                        scoreToSave +=10+ (this.props.answerSubmissionTime[i] / 10 * 2) + (this.props.numberOfNewOpponent * 10)
                                            
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
                        console.log(this.props.answerSubmissionTime);
                        let scoreToSave = 0;
                        console.log(scoreToSave, 'scoreToSave')
                        for (var i = 0; i < this.props.answerSubmissionTime.length; i++) {
                            console.log(this.props.answerSubmissionTime[i], '---------')
                            let questionDetails = this.props.submittedQuestionsList[i];
                            // console.log(questionDetails, 'question details', questionDetails.selectedOoption)
                            if (questionDetails && questionDetails !== undefined && questionDetails !== null && 'correctSequence' in questionDetails !== true && 'selectedOoption' in questionDetails) {
                                if (questionDetails.selectedOoption.toLowerCase() === 'a' && questionDetails.answer1.correctAns === true || questionDetails.selectedOoption.toLowerCase() === 'b' && questionDetails.answer2.correctAns === true || questionDetails.selectedOoption.toLowerCase() === 'c' && questionDetails.answer3.correctAns === true || questionDetails.selectedOoption.toLowerCase() === 'd' && questionDetails.answer4.correctAns === true) {
                                    if (this.props.answerSubmissionTime[i] !== undefined) {
                                        // questionDetails.time = this.props.answerSubmissionTime;
                                        if (this.props.answerSubmissionTime[i] !== undefined) {

                                            scoreToSave += this.props.answerSubmissionTime[i] / 10 * 2
                                        }
                                    }
                                }
                            }
                            else {
                                if (questionDetails && questionDetails !== undefined && questionDetails !== null && 'correctAnswer' in questionDetails === true && questionDetails.correctAnswer === true) {
                                    if(this.props.answerSubmissionTime[i] !== undefined){
                                        scoreToSave += this.props.answerSubmissionTime[i] / 10 * 2
                                            
                                    }
                                }
                            }
                        }
                        this.props.onlineUserScoreUpdatOnViewScore(firebase.auth().currentUser, scoreToSave);

                        firebase.database().ref('inprogress/' + currentUser + '/' + this.props.quizData.name.titles + '/').remove();
                        this.props.removeQuizFromHistory(this.props.quizData);
                        this.setState({ next: false })
                        console.log(scoreToSave, 'scoreToSave', this.props.submittedQuestionsList)
                        let resultObject = {
                            totalScore: scoreToSave,
                            quizName: this.props.quizData.name.titles,
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


    Correct() {
        let updatedIndex = this.props.currentIndex + 1;
        this.props.switchToNext(updatedIndex)
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

    render() {
        return (
            <Container style={{ backgroundColor: '#19D617', opacity: 0.9, position: 'absolute', zIndex: 10, width: '100%', height: window.height }} >
                <StatusBar backgroundColor='#19D617' />
                <View >
                    <Image source={require('../images/correct_icon.png')} style={{ width: 100, height: 100, marginTop: 50, alignSelf: 'center' }} />
                </View>
                <View >
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25, alignSelf: 'center' }}>Correct</Text>
                </View>
                <View >
                    {!this.state.nextTeam ?
                        !this.state.next ?
                            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={this.myScoreBoard.bind(this)} >
                                <Text style={{ color: 'white', marginTop: 250, fontSize: 14 }} >View scorecard</Text>
                            </TouchableOpacity> : null : null
                    }
                    {/* <Text style={{ color: 'white', marginTop: 250, fontSize: 14 }}>You're on 4th place</Text> */}
                </View>
                <View>
                    <TouchableOpacity style={{ alignSelf: 'center', marginTop: 100 }} onPress={() => { this.setState({ quitDialog: true }) }} >
                        <Text style={{ color: 'white', fontSize: 14 }} >Quit Game</Text>
                    </TouchableOpacity>
                </View>
                <View >
                    {/* <Text style={{ color: 'white', fontSize: 14, }}>you're on 748 points behind nancy</Text> */}
                </View>
                <View style={{ marginVertical: 10, flex: 1, justifyContent: 'center' }}>
                    {
                        !this.state.nextTeam ?
                            this.state.next ?
                                <TouchableOpacity style={{ backgroundColor: 'white', alignSelf: 'center', height: 40, width: '80%', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }} onPress={this.Correct.bind(this)} >
                                    <Text style={{ fontSize: 18, }}>Next</Text>
                                </TouchableOpacity> : null : null
                    }
                </View>
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

export default connect(mapStateToProps, { addscore, removeQuizFromHistory, onlineUserScore, saveResultToDb, onlineUserScoreUpdatOnViewScore })(Correct); 