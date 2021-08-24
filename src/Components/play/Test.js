import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, StatusBar, BackAndroid, BackHandler, AsyncStorage } from 'react-native';
import { Icon, Card, CardItem, Container, Content, Header, Body, ListItem, List, Button, Right, Left, Title, Drawer, Fab, Footer, FooterTab, Spinner, Text } from 'native-base';
import TimeUp from './timeup';
import Correct from './correct';
import Wrong from './wrong';
import * as firebase from 'firebase';
import { ActionConst, Actions } from 'react-native-router-flux';
import Counter from './counter';
import { connect } from 'react-redux';
import { historyAction } from '../../Actions/user_detail';
import Quiz from './quiz/quiz';
import Jumble from './quiz/jumble';
import inProgress from '../home/inProgress/inProgress';
import Sound from 'react-native-sound';
import { recordTimeOfSubmission, setNumberOfOpponent } from '../../Actions/alldata';
import QuitDialogBox from './quitdialogbox';




class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allstate: false, currentQuizIndex: 0,
            selected: false, correct: false, wrong: false,
            timer: 10, timesUp: false, quiz: false,
            stopCounterforTeam: false,
            quitDialog: false,
            pause: false


        };
        this.handleBackButton = this.handleBackButton.bind(this);
        console.log(this.props.music, this.props.bfMusic, '****** music in Constructor')
        if (this.props.music === true && this.props.bfMusic) {
            this.props.bfMusic.play();
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (Actions.currentScene === 'test') {
            return true;
        }
        else {
            return false;
        }
    }
    componentWillUpdate(nextProps, nextState) {

        if (!nextState.correct && nextState.correct === false && !nextState.wrong && nextState.wrong === false && !nextState.timesUp && nextState.timesUp === false) {
            if (this.props.waMusic) {
                this.props.waMusic.stop(() => {
                    console.log('wrong ans stopped');
                })
            }
            if (this.props.caMusic) {
                this.props.caMusic.stop(() => {
                    console.log('correctAnsMusic ans stopped');
                })
            }

            if (this.props.music === true && this.props.bfMusic) {
                this.props.bfMusic.play();
            }
        }
        else if (nextState.correct && nextState.correct === true && !nextState.wrong && nextState.wrong === false && !nextState.timesUp && nextState.timesUp === false) {
            // console.log(nextState.wrong, nextState.correct === true, 'inside else if')
            if (this.props.waMusic) {
                this.props.waMusic.stop(() => {
                    console.log('wrong ans stopped');
                })
            }
            if (this.props.bfMusic) {
                this.props.bfMusic.stop(() => {
                    console.log('correctAnsMusic ans stopped');
                })
            }
            if (this.props.soundEffect === true && this.props.caMusic) {
                this.props.caMusic.play();
            }
        }
        else if (this.props.soundEffect === true && !nextState.correct && nextState.correct === false || !nextState.timesUp && nextState.timesUp === false) {
            if (this.props.caMusic) {
                this.props.caMusic.stop(() => {
                    console.log('correctAnsMusic ans stopped');
                })
            }
            if (this.props.bfMusic) {
                this.props.bfMusic.stop(() => {
                    console.log('correctAnsMusic ans stopped');
                })
            }
            if (this.props.soundEffect === true && this.props.waMusic) {
                this.props.waMusic.play();
            }
        }
    }

    // componentDidMount() {
    //     BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    // }

    componentWillUnmount() {
        if (this.props.waMusic) {
            this.props.waMusic.stop(() => {
                console.log('wrong ans stopped');
            })
        }
        if (this.props.caMusic) {
            this.props.caMusic.stop(() => {
                console.log('correctAnsMusic ans stopped');
            })
        }

        if (this.props.bfMusic) {
            this.props.bfMusic.stop(() => {
                console.log('bfMusic ans stopped');
            })
        }

        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        // Actions.myhome({ type: 'reset' })
        // alert('back button pressed')
        this.setState({
            quitDialog: !this.state.quitDialog,
            // pause: true,
            timer: this.counterTime - 1
        })
        return true;
    }

    componentWillMount() {
        console.log(this.props.chatObj, 'chatObjDetails-------', this.props.data, this.props.gameType);
        // if (this.props.chatObj.type.toLowerCase() === '') {

        // }
        const { currentQuestionIndex } = this.props;
        if (this.props.gameType === 'challenge') {
            console.log('challenge found')
            let currentUser = firebase.auth().currentUser.uid;
            let that = this;
            firebase.database().ref('/user/' + currentUser + '/playedWith/').once('value', (playedWithData) => {
                let playedWith = playedWithData.val();
                let newUser = 0;
                if (currentUser === this.props.chatObj.senderID) {
                    if (playedWith !== null) {
                        console.log(playedWith, 'playedWith')
                        if (this.props.chatObj.receiverUid in playedWith === false) {
                            newUser = newUser + 1;
                        }
                        that.props.setNumberOfOpponent(newUser);
                    }
                    else {
                        that.props.setNumberOfOpponent(1);

                    }
                }
                else {
                    if (playedWith !== null) {
                        console.log(playedWith, 'playedWith')
                        if (this.props.chatObj.senderID in playedWith === false) {
                            newUser = newUser + 1;
                        }
                        that.props.setNumberOfOpponent(newUser);
                    }
                    else {
                        that.props.setNumberOfOpponent(1);

                    }
                }
            })
            // if (currentUser === this.props.chatObj.senderID) {
            //     firebase.database().ref('/user/' + this.props.chatObj.receiverUid + '/playedWith/').once('value', (playedWithData) => {
            //         let playedWith = playedWithData.val();
            //         let newUser = 0;
            //         if (playedWith !== null) {
            //             console.log(playedWith, 'playedWith')
            //             if (this.props.chatObj.receiverUid in playedWith === false) {
            //                 newUser = newUser + 1;
            //             }
            //         }
            //         that.props.setNumberOfOpponent(newUser);
            //     })
            // }
            // else {
            //     firebase.database().ref('/user/' + this.props.chatObj.senderID + '/playedWith/').once('value', (playedWithData) => {
            //         let playedWith = playedWithData.val();
            //         let newUser = 0;
            //         if (playedWith !== null) {
            //             if (this.props.chatObj.receiverUid in playedWith === false) {
            //                 newUser = newUser + 1;
            //             }
            //             that.props.setNumberOfOpponent(newUser);

            //         }

            //     })
            // }
        }
        // console.log(this.props, 'fadfdasfadsfasdfasf');
        this.setState({
            currentQuizIndex: currentQuestionIndex
        })
        const { questions, name } = this.props.data;
        let qs = questions[currentQuestionIndex];
        var dataForAsync = {
            quiz: this.props.data,
            currentQuestion: qs,
            currentQuizIndex: currentQuestionIndex
        }
        console.log(dataForAsync, 'dataForAsyncdataForAsyncdataForAs')
        this.SaveProgress(dataForAsync)
        let time = +qs.time.replace('Sec', '')
        this.setState({ timer: time })
        if (name.type === 'Quiz') { this.setState({ quiz: true }) }
        else { this.setState({ quiz: false }) }
        if (qs.answer1.correctAns == true) { this.setState({ correctAns: qs.answer1.optionName.toUpperCase() }) }
        else if (qs.answer2.correctAns == true) { this.setState({ correctAns: qs.answer2.optionName.toUpperCase() }) }
        else if (qs.answer3.correctAns == true) { this.setState({ correctAns: qs.answer3.optionName.toUpperCase() }) }
        else if (qs.answer4.correctAns == true) { this.setState({ correctAns: qs.answer4.optionName.toUpperCase() }) }

    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

        if ('TeamName' in this.props) {
            const { TeamName } = this.props;
            let that = this;
            firebase.database().ref('/gameRom/').on('child_changed', (snap) => {
                // console.log(snap.val())
                //    console.log(snap.val().key === TeamName.pin , this.state.currentQuizIndex < snap.val().currentQuizIndex)
                if (snap.val().key === TeamName.pin && this.state.currentQuizIndex < snap.val().currentQuizIndex) {
                    const { questions } = that.props.data;
                    let qs = questions[snap.val().currentQuizIndex];
                    // console.log(qs, questions, snap.val().currentQuizIndex)
                    let timer = +qs.time.replace('Sec', '')
                    // console.log(timer)
                    that.setState({
                        currentQuizIndex: snap.val().currentQuizIndex,
                        timesUp: false,
                        selected: false, correct: false, wrong: false,
                        timer, allstate: true
                    })
                }
                if (snap.val().key === TeamName.pin && 'showScore' in snap.val()) {
                    this.setState({
                        stopCounterforTeam: true
                    })
                    console.log(this.props, '/////////////*********')
                    Actions.scoreboard(this.props)
                }
            })

        }
    }


    SaveProgress(inProgressObj) {
        console.log(inProgressObj, 'inProgressObj');

        let resultObj = {
            quizName: inProgressObj.quiz.name.titles,
            playedOn: Date.now(),
            played: inProgressObj.quiz.questions.length,
            totalCorrectAnswers: this.props.correctAns,
            totalIncorrectAnswers: this.props.wrongAns,
            gameType: this.props.gameTypeState
        }
        inProgressObj.currentQuizIndex += 1;
        inProgressObj.resultObject = resultObj;
        if (inProgressObj.currentQuestion === undefined && inProgressObj.quiz.questions[inProgressObj.currentQuizIndex] !== undefined) {
            inProgressObj.currentQuestion = inProgressObj.quiz.questions[inProgressObj.currentQuizIndex]
        }
        else {
            delete inProgressObj.currentQuestion;
        }
        // console.log(inProgressObj, 'inProgressObjinProgressObjinProgressObj',this.props.gameType !== 'challenge' , firebase.auth().currentUser && firebase.auth().currentUser.uid, firebase.auth().currentUser.uid === null)

        if (this.props.gameType === 'solo' && firebase.auth().currentUser !== null && firebase.auth().currentUser !== null && firebase.auth().currentUser.uid && firebase.auth().currentUser.uid !== null) {
            let currentUser = firebase.auth().currentUser.uid;

            delete inProgressObj.quiz.favouriteData
            firebase.database().ref('inprogress/' + currentUser + '/' + inProgressObj.quiz.name.titles + '/').once('value', (snap) => {
                console.log(snap.val())
                if (snap.val() === null) {
                    firebase.database().ref('inprogress/' + currentUser + '/' + inProgressObj.quiz.name.titles + '/').set(inProgressObj)
                } else {
                    var inProgressData = snap.val();
                    console.log(inProgressData, 'inProgressDatainProgressData');

                    firebase.database().ref('inprogress/' + currentUser + '/' + inProgressObj.quiz.name.titles + '/').set(inProgressObj)


                }
            })
        }

    }

    timeFunction(updatedIndex) {
        const { questions } = this.props.data;
        let qs = questions[updatedIndex];
        let timer = +qs.time.replace('Sec', '')
        var dataForAsync = {
            quiz: this.props.data,
            currentQuestion: qs,
            currentQuizIndex: updatedIndex
        }
        this.SaveProgress(dataForAsync)
        this.setState({ allstate: true, currentQuizIndex: updatedIndex, timesUp: false, selected: false, timer })
    }

    correctFunction(updatedIndex) {
        var dataForAsync = {
            quiz: this.props.data,
            currentQuestion: qs,
            currentQuizIndex: updatedIndex
        }
        console.log(updatedIndex, 'updaetd Index')
        this.SaveProgress(dataForAsync)
        const { questions } = this.props.data;
        let qs = questions[updatedIndex];
        let timer = +qs.time.replace('Sec', '')
        this.setState({ currentQuizIndex: updatedIndex, correct: false, selected: false, timer, allstate: true })
    }

    wrongFunction(updatedIndex) {
        var dataForAsync = {
            quiz: this.props.data,
            currentQuestion: qs,
            currentQuizIndex: updatedIndex
        }
        this.SaveProgress(dataForAsync)
        const { questions } = this.props.data;
        let qs = questions[updatedIndex];
        let timer = +qs.time.replace('Sec', '')
        this.setState({ currentQuizIndex: updatedIndex, allstate: true, wrong: false, selected: false, timer })
    }

    selected(selected) {
        this.setState({ selected })
    }
    timeOfSub = 100;
    counterTime;
    recordTimer(timeOfSubmission, counter) {
        console.log(timeOfSubmission, 'timeofsubmission')
        this.counterTime = counter;
        if (isNaN(timeOfSubmission) === false) {
            this.timeOfSub = timeOfSubmission;
        }
        else {
            this.timeOfSub = 100;
        }
    }
    markCorrect(correct) {
        console.log('world', this.timeOfSub);

        this.props.recordTimeOfSubmission(this.timeOfSub);
        this.setState({ correct });
    }
    markWrong(wrong) {
        console.log('hello', this.timeOfSub);
        this.props.recordTimeOfSubmission(this.timeOfSub);
        this.setState({ wrong });
    }
    timerEnd(timer) {
        console.log('hello bbb', this.timeOfSub);

        this.props.recordTimeOfSubmission(0);
        this.setState({ timer });
    }

    _outsideReach(invisible, retrive) {
        console.log('event fired', retrive);
        if (retrive === 'retrive') {
            this.setState({
                quitDialog: invisible,
                // pause: false,
                timer: this.counterTime - 1
            })
        }
        else {
            this.setState({
                quitDialog: invisible
            })
        }
    }
    render() {
        const { currentQuizIndex, selected, quiz } = this.state;
        console.log(quiz, 'this.state.quiz', this.props.data)
        const { questions } = this.props.data;
        let qst = questions[currentQuizIndex];
        let gameType;
        if (this.props.gameTypeState) {
            gameType = this.props.gameTypeState;
        }
        else {
            gameType = this.props.gameType;
        }

        return (
            <Container style={{ backgroundColor: '#ffffff' }}>
                {this.state.timesUp ?
                    <TimeUp chatObjDetails={this.props.chatObj} quizType={gameType} quizteam={this.props} switchToNext={this.timeFunction.bind(this)} currentIndex={currentQuizIndex} quizData={this.props.data} />
                    : this.state.correct ?
                        <Correct chatObjDetails={this.props.chatObj} quizType={gameType} quizteam={this.props} switchToNext={this.correctFunction.bind(this)} currentIndex={currentQuizIndex} quizData={this.props.data} />
                        : this.state.wrong ?
                            <Wrong chatObjDetails={this.props.chatObj} quizType={gameType} quizteam={this.props} switchToNext={this.wrongFunction.bind(this)} currentIndex={currentQuizIndex} quizData={this.props.data} />
                            : null
                }
                <StatusBar backgroundColor='#2196f3' />
                <Counter qs={qst} stopCounter={this.state.stopCounterforTeam} pause={this.state.pause} stop={selected} timer={this.state.timer} recordTime={this.recordTimer.bind(this)} timesUp={(timesUp) => this.setState({ timesUp, selected: true })} />
                <Content contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
                    {/* <TouchableOpacity onPress={this.handleBackButton.bind(this)} ><Text>quizType</Text></TouchableOpacity> */}
                    {
                        quiz ?
                            <Quiz selected={this.selected.bind(this)}
                                time={this.timerEnd.bind(this)}
                                wrong={this.markWrong.bind(this)}
                                correct={this.markCorrect.bind(this)}
                                qs={qst}
                                parentData={this.state}
                                changeStateCondition={(allstate) => this.setState({ allstate })} /> :
                            <Jumble selected={this.selected.bind(this)}
                                time={this.timerEnd.bind(this)}
                                wrong={this.markWrong.bind(this)}
                                correct={this.markCorrect.bind(this)}
                                qs={qst}
                                quizData={questions}
                                parentData={this.state}
                                changeStateCondition={(allstate) => this.setState({ allstate })} />
                    }
                </Content>
                <QuitDialogBox visible={this.state.quitDialog} outsideTouch={this._outsideReach.bind(this)} />

            </Container >

        );
    }
}

function mapStateToProps(state) {
    return {
        userdata_History: state.userdata,
        inprogress_History: state.userdata.inprogressHistory,
        correctAns: state.loadEveryThing.correctAnswer,
        wrongAns: state.loadEveryThing.wrongAnswer,
        gameTypeState: state.loadEveryThing.gameType,
        answerSubmissionTime: state.loadEveryThing.answerSubmissionTime,
        bfMusic: state.loadEveryThing.bfMusic,
        caMusic: state.loadEveryThing.caMusic,
        waMusic: state.loadEveryThing.waMusic,
        music: state.loadEveryThing.music,
        soundEffect: state.loadEveryThing.soundEffect,

    }
}


export default connect(mapStateToProps, { historyAction, recordTimeOfSubmission, setNumberOfOpponent })(Test);

const styles = StyleSheet.create({
    btn: {
        width: 140,
        height: 110,
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    listBody: { flex: 1, alignSelf: 'center', width: '80%' },
    qlist: { marginTop: 12, flexDirection: 'row' },

})