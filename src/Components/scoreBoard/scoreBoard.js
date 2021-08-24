import React, { Component } from 'react';
import Background from '../images/x.png';
import * as firebase from 'firebase';
import { View, Image, BackHandler, StyleSheet, Dimensions, StatusBar, TouchableOpacity, AsyncStorage, ActivityIndicator } from 'react-native';
import { Container, Content, Header, Body, ListItem, List, Button, Right, Left, Title, Drawer, Fab, Footer, FooterTab, Spinner, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import MyStatusBar from '../statusbar';
import { connect } from "react-redux";
import { reInitializeQuizStatus, saveWonStatus } from '../../Actions/alldata';
import Toast from 'react-native-simple-toast';


class ScoreBoard extends Component {
    constructor() {
        super();
        this.state = {
            score: 0,
            name: '',
            players: [],
            soloResult: null,
            teamResult: null,
            challengeResult: null,
            solo1on1Result: null,
            resultNotFound: null
        }
    }
    componentWillUnmount() {
        this.props.reInitializeQuizStatusAct();
    }
    componentDidMount() {
        console.log(this.props, 'mmmmmmmmm');
        let allUsers;
        if (this.props.isNetAvailable === true) {

            firebase.database().ref('user/').once('value', (snap) => {
                allUsers = snap.val();
                console.log(allUsers, 'sssss')
                console.log('outside if')
                if (firebase.auth().currentUser && firebase.auth().currentUser !== null && firebase.auth().currentUser.uid && firebase.auth().currentUser.uid !== null && this.props.quizType && this.props.quizType.quizType) {
                    let currentUser = firebase.auth().currentUser.uid;

                    let quizName = this.props.quizType.quizData.name.titles;
                    console.log('datafound', quizName);
                    let currentResult;
                    let that = this;
                    let gameTypeForResult;
                    if (this.props.chatObjDetails && this.props.chatObjDetails.type && this.props.chatObjDetails.type.toLowerCase() === 'challenge') {
                        gameTypeForResult = 'challenge';
                    }
                    else {
                        gameTypeForResult = 'solo';
                    }
                    firebase.database().ref('result/' + gameTypeForResult + '/' + currentUser + '/').once('value', (snap) => {
                        console.log(snap.val(), 'qqqqqqqqqqqq');
                        let allSoloResult = snap.val();

                        for (var key in allSoloResult) {
                            if (allSoloResult[key].quizName.toLowerCase() === quizName.toLowerCase() && Date.now() - allSoloResult[key].playedOn < 60000) {
                                // console.log(that.props.quizType.quizType.toLowerCase() , 'challenge' , allSoloResult[key].challengeKey , that.props.chatObjDetails.key ,that.props.quizType.quizType.toLowerCase() === 'challenge' && allSoloResult[key].challengeKey === that.props.chatObjDetails.key)
                                // if (that.props.chatObjDetails && that.props.chatObjDetails.type && that.props.chatObjDetails.type === 'challenge' && allSoloResult[key].challengeKey === that.props.chatObjDetails.key) {
                                //     currentResult = allSoloResult[key];
                                //     break;
                                // }
                                // else if (that.props.quizType.quizType.toLowerCase() === 'solo' && !that.props.chatObjDetails) {
                                //     currentResult = allSoloResult[key];
                                //     break;
                                // }
                                currentResult = allSoloResult[key];
                                break;
                            }
                        }
                        console.log(currentResult, 'currentResult');
                        let thatIs = that;
                        if (currentResult !== null && currentResult !== undefined) {
                            currentResult.isCurrentUser = true;
                        }
                        let currentUserData = allUsers[currentUser]
                        console.log('currentResult', currentResult, currentUserData);
                        if (currentUserData && 'userName' in currentUserData) {
                            currentResult.userName = currentUserData.userName.slice(0, 8);
                        }
                        else {
                            currentResult.userName = currentUserData.email.slice(0, 8);
                        }
                        // currentResult.gotScores = currentUserData.totalScore;
                        if (thatIs.props.quizType.quizType.toLowerCase() === 'solo' && !thatIs.props.chatObjDetails) {
                            thatIs.setState({
                                soloResult: currentResult,
                                teamResult: null,
                                challengeResult: null,
                                solo1on1Result: null
                            })
                        }
                        else if (thatIs.props.chatObjDetails && thatIs.props.chatObjDetails !== undefined && thatIs.props.chatObjDetails.type && thatIs.props.chatObjDetails.type === 'challenge') {
                            // console.log(thatIs.props.chatObjDetails.type, 'hatIs.props.quizType.quizType.toLowerCase()', thatIs.props.quizType.quizType.toLowerCase(), currentResult);
                            let thatIsIt = thatIs;
                            firebase.database().ref('result/' + thatIs.props.chatObjDetails.type + '/' + currentResult.opponentId + '/').once('value', (snap) => {
                                console.log(snap.val(), 'qqqqqqqqqqqq');
                                let allOpponentResult = snap.val();
                                let opponentResult;

                                for (var key in allOpponentResult) {
                                    if (allOpponentResult[key].quizName.toLowerCase() === quizName.toLowerCase() && Date.now() - allOpponentResult[key].playedOn < 360000 && allOpponentResult[key].challengeKey === currentResult.challengeKey) {
                                        opponentResult = allOpponentResult[key];
                                        break;
                                    }
                                }
                                let thatIsItOK = thatIsIt;
                                if (opponentResult !== undefined && opponentResult !== null) {
                                    let opponentUID = currentResult.opponentId;
                                    let opponentUserData = allUsers[opponentUID]
                                    console.log('currentResult', opponentResult);
                                    if (opponentUserData && 'userName' in opponentUserData) {
                                        opponentResult.userName = opponentUserData.userName.slice(0, 8);
                                    }
                                    else {
                                        opponentResult.userName = opponentUserData.email.slice(0, 8);
                                    }
                                    // opponentResult.totalScore = opponentUserData.totalScore;
                                    let resultArr = [currentResult, opponentResult];
                                    console.log(resultArr, 'ssssssssssssss');
                                    if (currentResult.totalScore > opponentResult.totalScore) {
                                        thatIsItOK.props.saveWonStatus();
                                    }
                                    let data = resultArr.sort((a, b) => {
                                        // console.log(a, 'sndlfhls', b)
                                        return (b.totalScore - a.totalScore)
                                    })
                                    //     console.log(data, 'datadatadatadata');

                                    thatIsItOK.setState({
                                        soloResult: null,
                                        teamResult: null,
                                        challengeResult: data,
                                        solo1on1Result: null
                                    })
                                }
                                else {
                                    console.log(currentResult.opponentId, 'currentResult.opponentId ')
                                    let flag = true;
                                    opponentResult = {}
                                    firebase.database().ref('result/' + 'challenge' + '/' + currentResult.opponentId + '/').once('value', (snap) => {
                                        if (snap.val() === null) {
                                            flag = false;
                                        }
                                    })

                                    firebase.database().ref('result/' + 'challenge' + '/' + currentResult.opponentId + '/').limitToLast(1).on('child_added', (snap) => {
                                        if (flag === true) {
                                            flag = false;
                                            console.log(snap.val(), 'changed Result all');

                                        }
                                        else {
                                            console.log(snap.val(), 'changed Result');
                                            let updatedResult = snap.val();
                                            if (updatedResult.quizName.toLowerCase() === quizName.toLowerCase() && Date.now() - updatedResult.playedOn < 360000 && updatedResult.challengeKey === currentResult.challengeKey) {
                                                opponentResult = thatIsItOK.state.challengeResult[1];
                                                console.log(opponentResult, 'opponentResult', updatedResult);
                                                updatedResult.userName = opponentResult.userName;
                                                updatedResult.totalScore = updatedResult.totalScore;
                                            }
                                            let resultArr = [currentResult, updatedResult];
                                            console.log(resultArr, 'ssssssssssssss');

                                            if (currentResult.totalScore > opponentResult.totalScore) {
                                                thatIsItOK.props.saveWonStatus();
                                            }
                                            let data = resultArr.sort((a, b) => {
                                                // console.log(a, 'sndlfhls', b)
                                                return (b.totalScore - a.totalScore)
                                            })
                                            console.log(data, 'datadatadatadata');

                                            thatIsItOK.setState({
                                                soloResult: null,
                                                teamResult: null,
                                                challengeResult: data,
                                                solo1on1Result: null
                                            })
                                        }
                                    })
                                    let opponentUID = currentResult.opponentId;
                                    let opponentUserData = allUsers[opponentUID]
                                    console.log('currentResult', opponentResult, opponentUserData, opponentUID);
                                    if (opponentUserData && 'userName' in opponentUserData) {
                                        opponentResult.userName = opponentUserData.userName.slice(0, 8);
                                    }
                                    else {
                                        opponentResult.userName = opponentUserData.email.slice(0, 8);
                                    }
                                    opponentResult.totalScore = 0;
                                    let resultArr = [currentResult, opponentResult];
                                    if (currentResult.totalScore > opponentResult.totalScore) {
                                        thatIsItOK.props.saveWonStatus();
                                    }
                                    console.log(resultArr, 'ssssssssssssss');
                                    let data = resultArr.sort((a, b) => {
                                        // console.log(a, 'sndlfhls', b)
                                        return (b.totalScore - a.totalScore)
                                    })
                                    //     console.log(data, 'datadatadatadata');

                                    thatIsItOK.setState({
                                        soloResult: null,
                                        teamResult: null,
                                        challengeResult: data,
                                        solo1on1Result: null
                                    })
                                }
                            })
                        }
                        // firebase.database().ref('user/' + currentUser + '/').once('value', (snap) => {
                        //     console.log('currentResult', currentResult);
                        //     console.log(snap.val(), 'solo result person');
                        //     console.log(thatIs.props.quizType.quizType.toLowerCase() === 'challenge')
                        //     let resultUser = snap.val();
                        //     if ('userName' in resultUser) {
                        //         currentResult.userName = resultUser.userName.slice(0, 8);
                        //     }
                        //     else {
                        //         currentResult.userName = resultUser.email.slice(0, 8);
                        //     }
                        //     currentResult.gotScores = resultUser.gotScores;


                        //     if (thatIs.props.quizType.quizType.toLowerCase() === 'solo') {
                        //         thatIs.setState({
                        //             soloResult: currentResult,
                        //             teamResult: null,
                        //             challengeResult: null,
                        //             solo1on1Result: null
                        //         })
                        //     }
                        // else if (thatIs.props.quizType.quizType.toLowerCase() === 'challenge') {
                        //     console.log('hatIs.props.quizType.quizType.toLowerCase()', thatIs.props.quizType.quizType.toLowerCase(), currentResult);
                        //     let thatIsIt = thatIs;


                        //     firebase.database().ref('result/' + this.props.quizType.quizType.toLowerCase() + '/' + currentResult.opponentId + '/').once('value', (snap) => {
                        //         console.log(snap.val(), 'qqqqqqqqqqqq');
                        //         let allOpponentResult = snap.val();
                        //         let opponentResult;

                        //         for (var key in allOpponentResult) {
                        //             if (allOpponentResult[key].quizName === quizName && Date.now() - allOpponentResult[key].playedOn < 360000 && allOpponentResult[key].challengeKey === currentResult.challengeKey) {
                        //                 opponentResult = allOpponentResult[key];
                        //                 break;
                        //             }
                        //         }
                        //         let thatIsItOK = thatIsIt;
                        //         if (opponentResult !== undefined && opponentResult !== null) {
                        //             firebase.database().ref('user/' + currentResult.opponentId + '/').once('value', (snap) => {
                        //                 console.log('currentResult', currentResult);
                        //                 console.log(snap.val(), 'solo result person');
                        //                 console.log(thatIsItOK.props.quizType.quizType.toLowerCase() === 'challenge')
                        //                 let opponentUser = snap.val();
                        //                 if ('userName' in opponentUser) {
                        //                     opponentResult.userName = opponentUser.userName.slice(0, 8);
                        //                 }
                        //                 else {
                        //                     opponentResult.userName = opponentUser.email.slice(0, 8);
                        //                 }
                        //                 opponentResult.gotScores = opponentUser.gotScores;

                        //                 let resultArr = [currentResult, opponentResult];
                        //                 console.log(resultArr, 'ssssssssssssss');
                        //                 let data = resultArr.sort((a, b) => {
                        //                     // console.log(a, 'sndlfhls', b)
                        //                     return (b.totalCorrectAnswers - a.totalCorrectAnswers)
                        //                 })
                        //                 console.log(data, 'datadatadatadata');

                        //                 thatIsItOK.setState({
                        //                     soloResult: null,
                        //                     teamResult: null,
                        //                     challengeResult: data,
                        //                     solo1on1Result: null
                        //                 })

                        //             })
                        //         }
                        //         else {
                        //             console.log(currentResult.opponentId, 'currentResult.opponentId ')
                        //             let flag = true;
                        //             firebase.database().ref('result/' + this.props.quizType.quizType.toLowerCase() + '/' + currentResult.opponentId + '/').limitToLast(1).on('child_added', (snap) => {
                        //                 if (flag === true) {
                        //                     flag = false;
                        //                     console.log(snap.val(), 'changed Result all');

                        //                 }
                        //                 else {
                        //                     console.log(snap.val(), 'changed Result');
                        //                     let updatedResult = snap.val();
                        //                     if (updatedResult.quizName === quizName && Date.now() - updatedResult.playedOn < 360000 && updatedResult.challengeKey === currentResult.challengeKey) {
                        //                         opponentResult = thatIsItOK.state.challengeResult[1];
                        //                         opponentResult.totalCorrectAnswers = updatedResult.totalCorrectAnswers;
                        //                     }
                        //                     let resultArr = [currentResult, opponentResult];
                        //                     console.log(resultArr, 'ssssssssssssss');
                        //                     let data = resultArr.sort((a, b) => {
                        //                         // console.log(a, 'sndlfhls', b)
                        //                         return (b.totalCorrectAnswers - a.totalCorrectAnswers)
                        //                     })
                        //                     console.log(data, 'datadatadatadata');

                        //                     thatIsItOK.setState({
                        //                         soloResult: null,
                        //                         teamResult: null,
                        //                         challengeResult: data,
                        //                         solo1on1Result: null
                        //                     })
                        //                 }
                        //             })
                        //             firebase.database().ref('user/' + currentResult.opponentId + '/').once('value', (snap) => {
                        //                 let opponentUser = snap.val();
                        //                 // thatIsItOK;
                        //                 opponentResult = {};
                        //                 if ('userName' in opponentUser) {
                        //                     opponentResult.userName = opponentUser.userName.slice(0, 8);
                        //                 }
                        //                 else {
                        //                     opponentResult.userName = opponentUser.email.slice(0, 8);
                        //                 }
                        //                 opponentResult.gotScores = opponentUser.gotScores;

                        //                 opponentResult.totalCorrectAnswers = 0;
                        //                 let resultArr = [currentResult, opponentResult];
                        //                 console.log(resultArr, '*******result arr')
                        //                 thatIsItOK.setState({
                        //                     soloResult: null,
                        //                     teamResult: null,
                        //                     challengeResult: resultArr,
                        //                     solo1on1Result: null
                        //                 })
                        //             })
                        //         }
                        //     })
                        // }
                        // })
                    })


                }
                else if (this.props && 'TeamName' in this.props) {
                    const { TeamName } = this.props;
                    firebase.database().ref('/gameRom').child(TeamName.pin).once('value', (snap) => {
                        let players = snap.val().players;
                        console.log(players, 'playersplayersplayers', snap.val())
                        if (players.length > 1) {
                            let data = players.sort((a, b) => {
                                // console.log(a, 'sndlfhls', b)
                                return (b.result.totalScore - a.result.totalScore)
                            })
                            console.log(data, 'data inside if statement');
                            this.setState({
                                soloResult: null,
                                teamResult: data,
                                challengeResult: null,
                                solo1on1Result: null
                                // players: data
                            })
                        } else {
                            console.log(players, 'data inside else statement');
                            this.setState({
                                soloResult: null,
                                teamResult: players,
                                challengeResult: null,
                                solo1on1Result: null
                                // players
                            })
                        }
                    })
                } else {
                    Actions.myhome({ type: 'reset' })
                    // this.checkScore()
                    // this.checkName()
                }
            })
        }
        else {
            Toast.show('Please check internet connection.');

        }
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    }

    // componentDidMount() {
    //     BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    // }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        Actions.myhome({ type: 'reset' })
        return true;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (Actions.currentScene === 'scoreboard') {
            return true;
        }
        else {
            return false;
        }
    }
    checkName() {
        AsyncStorage.getItem('@LocalUser:LocalUser', (err, snap) => {
            var offlineUsername = JSON.parse(snap);
            if (offlineUsername !== null) {
                AsyncStorage.getItem('@OnlineUser:onlineUser', (err, snap) => {
                    var onlineUsername = JSON.parse(snap);
                    if (onlineUsername !== null && firebase.auth().currentUser !== null) {
                        // console.log('onlineUser', onlineUsername)
                        this.setState({
                            name: onlineUsername.userName
                        })
                    } else {
                        this.setState({
                            name: offlineUsername.userName
                        })
                    }
                })
            } else {
                AsyncStorage.getItem('@OnlineUser:onlineUser', (err, snap) => {
                    var onlineUsername = JSON.parse(snap);
                    if (onlineUsername !== null && firebase.auth().currentUser !== null) {
                        // console.log(arr)
                        this.setState({
                            name: onlineUsername.userName
                        })
                    }
                })
            }
        })
    }

    checkScore() {

        this.setState({
            soloResult: null,
            teamResult: null,
            challengeResult: null,
            solo1on1Result: null,
            resultNotFound: true

            // players
        })

        if (firebase.auth().currentUser !== null) {
            firebase.database().ref(`/user/${firebase.auth().currentUser.uid}`).once('value', (snap) => {
                // console.log(snap.val().quizPlayed.length)
                this.setState({
                    score: snap.val().gotScores
                })
            })
        } else {
            AsyncStorage.getItem('@LocalUser:score', (err, snap) => {
                var arr = JSON.parse(snap);
                if (arr !== null) {
                    // console.log(arr)
                    this.setState({
                        score: arr.score
                    })
                }
            })
        }
    }

    HomePage() {
        Actions.myhome({ type: 'reset' })
    }
    render() {
        // console.log(this.state.players.length)
        let deviceWidth = Dimensions.get('window').width;

        return (
            <Container style={{ width: '100%' }} >
                <MyStatusBar backgroundColor="#07b3fd" barStyle="light-content" />
                <Image source={require('../images/storyboard_bg.png')} style={{ width: null, flex: 1 }} />
                <View style={{ position: 'absolute', width: '100%', alignItems: 'center', height: '100%' }}>
                    <Text style={{ color: '#E8EE29', fontWeight: 'bold', fontSize: 28, backgroundColor: 'transparent', textShadowOffset: { width: 0, height: 3 }, marginTop: 40 }}>Scoreboard</Text>
                    <View style={{ marginTop: 25 }}>
                        <Image source={require('../images/score_card_yellow.png')} style={{ width: 60, height: 8, borderRadius: 5, }} />
                    </View>
                    <Content style={{ width: '100%', height: Dimensions.get('window').height }}>
                        {
                            (this.state.soloResult === null && this.state.solo1on1Result === null && this.state.teamResult === null && this.state.challengeResult === null) ?
                                <ActivityIndicator style={{ marginTop: 10 }} size="small" color="#0000ff" />

                                : null
                        }
                        {
                            (this.state.soloResult) ? (
                                <View style={{ marginTop: 20, alignSelf: 'center' }} >
                                    <Image source={require('../images/score_card_yellow.png')} style={{ width: deviceWidth }} />
                                    <View style={{ position: 'absolute', flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ flex: 1, marginVertical: 20 }}>
                                            <Text style={{ marginHorizontal: '12%', fontWeight: 'bold', color: '#1976d2' }}>{this.state.soloResult.userName}</Text>
                                        </View>
                                        <TouchableOpacity>
                                            <View style={{ flex: 2, marginVertical: 15, justifyContent: 'center' }}>
                                                <Image source={require('../images/btn_blue.png')} style={{ width: 77, height: 40 }} />
                                                <Text style={{ color: 'white', fontWeight: 'bold', position: 'absolute', marginLeft: 12 }} >
                                                    {
                                                        (this.state.soloResult.gotScores === undefined || this.state.soloResult.gotScores < 999) ?
                                                            (
                                                                <Text style={{ color: 'white', fontWeight: 'bold', position: 'absolute', marginLeft: 12 }}>Learner</Text>
                                                            ) :
                                                            null
                                                    }
                                                    {
                                                        (this.state.soloResult.gotScores !== undefined && this.state.soloResult.gotScores >= 1000 && this.state.soloResult.gotScores < 9999) ?
                                                            <Text style={{ color: 'white', fontWeight: 'bold', position: 'absolute', marginLeft: 12 }}>Expert</Text> :
                                                            null
                                                    }
                                                    {
                                                        (this.state.soloResult.gotScores !== undefined && this.state.soloResult.gotScores >= 10000) ?
                                                            <Text style={{ color: 'white', fontWeight: 'bold', position: 'absolute', marginLeft: 12 }}>Master</Text> :
                                                            null
                                                    }


                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{ flex: 1, marginVertical: 20 }}>
                                            <Text style={{ marginHorizontal: '29%', color: '#1976d2', fontWeight: 'bold', }}>{this.state.soloResult.totalScore}</Text>
                                        </View>
                                    </View>
                                </View>
                            ) : null
                        }
                        {
                            (this.state.challengeResult)
                                ? (
                                    this.state.challengeResult.map((v, i) => {
                                        console.log(v, 'qqqqqqqqqqqas')
                                        return (
                                            <View key={i} style={{ marginTop: 20, alignSelf: 'center' }} >
                                                <Image source={require('../images/score_card_yellow.png')} style={{ width: deviceWidth }} />
                                                <View style={{ position: 'absolute', flexDirection: 'row', alignItems: 'center' }}>
                                                    <View style={{ flex: 1, marginVertical: 20 }}>
                                                        <Text style={{ marginHorizontal: '12%', fontWeight: 'bold', color: '#1976d2' }}>{(i + 1) + '. ' + v.userName}</Text>
                                                    </View>
                                                    <TouchableOpacity>
                                                        <View style={{ flex: 2, marginVertical: 15, justifyContent: 'center' }}>
                                                            <Image source={require('../images/btn_blue.png')} style={{ width: 77, height: 40 }} />
                                                            {/* <Text style={{ color: 'white', fontWeight: 'bold', position: 'absolute', marginLeft: 12 }}> */}
                                                            {
                                                                (v.gotScores === undefined || v.gotScores < 999) ?
                                                                    (<Text style={{ color: 'white', fontWeight: 'bold', position: 'absolute', marginLeft: 12 }}>Learner</Text>) :
                                                                    null
                                                            }
                                                            {
                                                                (v.gotScores !== undefined && v.gotScores >= 1000 && v.gotScores < 9999) ?
                                                                    (<Text style={{ color: 'white', fontWeight: 'bold', position: 'absolute', marginLeft: 12 }}>Expert</Text>) :
                                                                    null
                                                            }
                                                            {
                                                                (v.gotScores !== undefined && v.gotScores >= 10000) ?
                                                                    (<Text style={{ color: 'white', fontWeight: 'bold', position: 'absolute', marginLeft: 12 }}>Master</Text>) :
                                                                    null
                                                            }


                                                        </View>
                                                    </TouchableOpacity>
                                                    <View style={{ flex: 1, marginVertical: 20 }}>
                                                        <Text style={{ marginHorizontal: '29%', color: '#1976d2', fontWeight: 'bold', }}>{v.totalScore}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    })
                                )
                                : (
                                    null
                                )
                        }

                        {
                            (this.state.teamResult)
                                ? (
                                    this.state.teamResult.map((v, i) => {
                                        return (
                                            <View key={i} style={{ marginTop: 20, alignSelf: 'center' }} >
                                                <Image source={require('../images/score_card_yellow.png')} style={{ width: deviceWidth }} />
                                                <View style={{ position: 'absolute', flexDirection: 'row', alignItems: 'center' }}>
                                                    <View style={{ flex: 1, marginVertical: 20 }}>
                                                        <Text style={{ marginHorizontal: '12%', fontWeight: 'bold', color: '#1976d2' }}>{(i + 1) + '. ' + v.teamName.slice(0, 8)}</Text>
                                                    </View>
                                                    <TouchableOpacity>
                                                        <View style={{ flex: 2, marginVertical: 15, justifyContent: 'center' }}>

                                                        </View>
                                                    </TouchableOpacity>
                                                    <View style={{ flex: 1, marginVertical: 20 }}>
                                                        <Text style={{ marginHorizontal: '29%', color: '#1976d2', fontWeight: 'bold', }}>{v.result.totalScore}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    })
                                )
                                : (
                                    null
                                )
                        }


                        {
                            (this.state.resultNotFound)
                                ? (


                                    <View style={{ marginTop: 20, alignSelf: 'center' }} >
                                        <Image source={require('../images/score_card_yellow.png')} style={{ width: deviceWidth }} />
                                        <View style={{ position: 'absolute', flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ flex: 1, marginVertical: 20 }}>
                                                <Text style={{ marginHorizontal: '12%', fontWeight: 'bold', color: '#1976d2' }}>Not Found</Text>
                                            </View>
                                            <TouchableOpacity>
                                                <View style={{ flex: 2, marginVertical: 15, justifyContent: 'center' }}>
                                                    <Image source={require('../images/btn_blue.png')} style={{ width: 77, height: 40 }} />
                                                    <Text style={{ color: 'white', fontWeight: 'bold', position: 'absolute', marginLeft: 12 }}>Learner</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <View style={{ flex: 1, marginVertical: 20 }}>
                                                <Text style={{ marginHorizontal: '29%', color: '#1976d2', fontWeight: 'bold', }}>0</Text>
                                            </View>
                                        </View>
                                    </View>

                                )
                                : (
                                    null
                                )
                        }

                        {/* {
                            this.state.players.length === 0 ?
                                <View style={{ marginTop: 20, alignSelf: 'center' }} >
                                    <Image source={require('../images/score_card_yellow.png')} />
                                    <View style={{ position: 'absolute', flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ flex: 1, marginVertical: 20 }}>
                                            <Text style={{ marginHorizontal: '12%', fontWeight: 'bold', color: '#1976d2' }}>{this.state.name}</Text>
                                        </View>
                                        <TouchableOpacity>
                                            <View style={{ flex: 2, marginVertical: 15, justifyContent: 'center' }}>
                                                <Image source={require('../images/btn_blue.png')} style={{ width: 77, height: 40 }} />
                                                <Text style={{ color: 'white', fontWeight: 'bold', position: 'absolute', marginLeft: 12 }}>Learner</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{ flex: 1, marginVertical: 20 }}>
                                            <Text style={{ marginHorizontal: '29%', color: '#1976d2', fontWeight: 'bold', }}>{this.state.score}</Text>
                                        </View>
                                    </View>
                                </View> :
                                this.state.players.map((v, i) => {
                                    if (v.teamName === this.props.TeamName.teamName) {
                                        return (
                                            <View key={i} style={{ marginTop: 20, alignSelf: 'center' }} >
                                                <Image source={require('../images/score_card_yellow.png')} />
                                                <View style={{ position: 'absolute', flexDirection: 'row', alignItems: 'center' }}>
                                                    <View style={{ flex: 1, marginVertical: 20 }}>
                                                        <Text style={{ marginHorizontal: '12%', fontWeight: 'bold', color: '#1976d2' }}>{i + '. ' + v.teamName}</Text>
                                                    </View>
                                                    <TouchableOpacity>
                                                        <View style={{ flex: 2, marginVertical: 15, justifyContent: 'center' }}>
                                                            <Image source={require('../images/btn_blue.png')} style={{ width: 77, height: 40 }} />
                                                            <Text style={{ color: 'white', fontWeight: 'bold', position: 'absolute', marginLeft: 12 }}>Learner</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                    <View style={{ flex: 1, marginVertical: 20 }}>
                                                        <Text style={{ marginHorizontal: '29%', color: '#1976d2', fontWeight: 'bold', }}>{v.result.score}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    }
                                    return (
                                        <View key={i} style={{ marginTop: 20, alignSelf: 'center' }} >
                                            <Image source={require('../images/score_card_blue.png')} />
                                            <View style={{ position: 'absolute', flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={{ flex: 1, marginVertical: 20 }}>
                                                    <Text style={{ marginHorizontal: '12%', fontWeight: 'bold', color: '#E8EE29' }}>{i + '. ' + v.teamName}</Text>
                                                </View>
                                                <TouchableOpacity>
                                                    <View style={{ flex: 1.6, marginVertical: 15, justifyContent: 'center' }}>
                                                        <Image source={require('../images/btn.png')} />
                                                        <Image source={require('../images/master_icon.png')} style={{ marginLeft: 20, width: 20, height: 20, position: 'absolute' }} />
                                                        <Text style={{ color: '#564B1C', fontWeight: 'bold', position: 'absolute', marginLeft: 50 }}>MASTER</Text>
                                                    </View>
                                                </ TouchableOpacity>
                                                <View style={{ flex: 1, marginVertical: 20 }}>
                                                    <Text style={{ marginHorizontal: '25%', color: '#E8EE29', fontWeight: 'bold', }}>{v.result.score}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                })
                        } */}

                    </Content>

                    <View style={{ marginVertical: 30 }}>
                        <TouchableOpacity onPress={this.HomePage.bind(this)}>
                            <Image source={require('../images/okay_btn.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    // console.log(state);
    return {
        //   auth: state.AuthReducer.isLoggedIn,
        allData: state.loadEveryThing,
        userDatas: state.userdata,
        isNetAvailable: state.AuthReducer.connectionStatus

    };
};
const mapDispatchToProps = (dispatch) => {
    return {

        reInitializeQuizStatusAct: () => {
            dispatch(reInitializeQuizStatus());
        },
        saveWonStatus: () => {
            dispatch(saveWonStatus())
        }

    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ScoreBoard);