import React, { Component } from 'react';
import { StyleSheet, Text, StatusBar, View, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { Container, Tab, Tabs, Icon, Card, CardItem, Content, Button } from 'native-base';
import { Dialog } from 'react-native-simple-dialogs'
import { Actions } from 'react-native-router-flux';
import Prompt from 'rn-prompt';
import { addname, addquestions } from "../../Actions/user_detail";
import { playsUpdateDb, onlineUserQuestionsPlayed, addQuestionsLengthDb } from '../../Actions/playUpdateDbAction';
import { connect } from "react-redux";
import * as firebase from "firebase";
import MyStatusBar from '../statusbar';
import { selectedQuizData } from '../../Actions/challengeAction'
import LinkPreview from 'react-native-link-preview';

class Play extends Component {
    constructor() {
        super();
        this.state = {
            promptVisible: false,
            message: '',
            image: ''
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (Actions.currentScene === 'mageCircle') {
            return true;
        }
        else {
            return false;
        }
    }
    componentWillMount() {
        LinkPreview.getPreview(this.props.data.name.introVideos)
            .then(data => {
                this.setState({
                    image: data.images[0]
                })
            })
    }

    LetsPlayNow() {
        this.addQuizList();
        AsyncStorage.getItem('@LocalUser:LocalUser', (err, snap) => {
            var offlineUsername = JSON.parse(snap);
            // console.log(offlineUsername)
            if (offlineUsername !== null) {
                if (firebase.auth().currentUser !== null) {
                    AsyncStorage.getItem('@OnlineUser:onlineUser', (err, snap) => {
                        var onlineUsername = JSON.parse(snap);
                        // console.log(onlineUsername, 'onlineusername1')
                        if (onlineUsername !== null) {
                            // console.log('onlineUser')
                            this.updateAndSwitch(this.props.data)
                        } else {
                            // console.log('onlineUser', this.props.AuthReducer.user.userName)
                            this.props.addQuestionsLengthDb(firebase.auth().currentUser, this.props.data)
                            this.props.onlineUserQuestionsPlayed(firebase.auth().currentUser, this.props.data)
                            AsyncStorage.setItem('@OnlineUser:onlineUser', JSON.stringify({ userName: this.props.AuthReducer.user.userName }))
                            this.updateAndSwitch(this.props.data)
                        }
                    })
                } else {
                    this.updateAndSwitch(this.props.data)
                }
            } else {
                if (firebase.auth().currentUser === null) {
                    this.setState({ promptVisible: true })
                } else {
                    AsyncStorage.getItem('@OnlineUser:onlineUser', (err, snap) => {
                        var onlineUsername = JSON.parse(snap);
                        if (onlineUsername !== null) {
                            this.updateAndSwitch(this.props.data)
                        } else {

                            // Online User database update his questions played
                            this.props.onlineUserQuestionsPlayed(firebase.auth().currentUser, this.props.data)
                            this.props.addQuestionsLengthDb(firebase.auth().currentUser, this.props.data)
                            // end here
                            AsyncStorage.setItem('@OnlineUser:onlineUser', JSON.stringify({ userName: this.props.AuthReducer.user.userName }))
                            this.updateAndSwitch(this.props.data)
                        }
                    })
                }
            }
        })
    }

    updateAndSwitch(data) {
        this.props.playsUpdateDb(data.name)
        Actions.test({ data, historyStatus: false, currentQuestionIndex: 0 });
    }

    addQuizList() {
        AsyncStorage.getItem('@LocalUser:questionsPlayed', (err, snap) => {
            var arr = JSON.parse(snap);
            // console.log(arr)
            var quizesArray = [];
            if (arr !== null) {
                var flagMatch = false;
                arr.map((v, i) => {
                    if (this.props.data.name.titles === v.name.titles) {
                        flagMatch = true
                        quizesArray.push(v)
                    } else {
                        quizesArray.push(v)
                    }
                })
                if (!flagMatch) {
                    quizesArray.push(this.props.data)
                }
                AsyncStorage.setItem('@LocalUser:questionsPlayed', JSON.stringify(quizesArray))
            } else {
                // console.log('detail')
                quizesArray.push(this.props.data)
                AsyncStorage.setItem('@LocalUser:questionsPlayed', JSON.stringify(quizesArray))
            }
        })
    }

    submitprompt(value) {
        this.addQuizList();
        this.props.addname({ UserName: value })
        this.setState({ promptVisible: false, message: value })
        this.props.playsUpdateDb(this.props.data.name)
        AsyncStorage.setItem('@LocalUser:LocalUser', JSON.stringify({ userName: value }))
        Actions.test({ data: this.props.data, historyStatus: false, currentQuestionIndex: 0 });
    }
    messageActive(onlineUser) {
        let data = {
            onlineUser: onlineUser,
            quiz: this.props.data.name
        }
        let quizData = {
            data: this.props.data,
            historyStatus: false,
            currentQuestionIndex: 0
        }
        // console.log(data,'data name',quizData);
        this.props.selectedQuizData(quizData)
        Actions.message({ data })
    }
    render() {
        const { name, questions } = this.props.data;
        // console.log(name)
        return (
            <Container style={{ backgroundColor: '#ffffff' }}>
                <MyStatusBar backgroundColor="#07b3fd" barStyle="light-content" />
                <View style={{ flex: 1 }} >
                    <Image style={{ width: '100%', height: '30%', position: 'absolute' }} source={{ uri: this.state.image }} />
                    <View style={{ height: '30%', width: '100%', justifyContent: 'center', alignItems: 'center' }} >
                        <View style={{ width: '70%', height: '70%', backgroundColor: 'rgba( 231, 235, 234, .9 )', justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ color: "#192019", fontWeight: '400', fontSize: 16 }} >{name.titles}</Text>
                            <Text style={{ color: '#ffef00', backgroundColor: 'black', paddingVertical: '3%', paddingHorizontal: '8%', marginTop: 10, borderRadius: 20, fontSize: 11 }} >{questions.length < 10 ? `0${questions.length}` : questions.length} QUESTIONS</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: '6%', marginBottom: '1%', marginHorizontal: '3%' }} >
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                            <Text style={{ fontSize: 10, color: '#014171', fontWeight: 'bold' }} >CIRCLE MEMBER</Text>
                        </View>
                        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }} >
                            <View style={{ width: '92%', backgroundColor: '#dfdee0', height: 1 }} ></View>
                        </View>
                    </View>
                    <View style={{ marginTop: '3%', height: '45%' }} >
                        <Content>
                            {this.props.userdata.onlineUsers.map((onlineUser, index) => {
                                return (
                                    (firebase.auth().currentUser.uid !== onlineUser.uid) ? (
                                        <TouchableOpacity key={index} onPress={this.messageActive.bind(this, onlineUser)}>
                                            <Card style={{ width: '90%', alignSelf: 'center', shadowOffset: { width: -1, height: -1 }, marginTop: '4%' }} >
                                                <CardItem style={{ shadowOffset: { width: -1, height: -1 } }} >
                                                    <Image source={require('../images/user_icon_dark.png')} />
                                                    <Text style={{ color: '#1a1c19', fontWeight: '500', marginLeft: '5%' }} >{onlineUser.userName}</Text>
                                                </CardItem>
                                            </Card>
                                        </TouchableOpacity>) : null
                                )
                            })}
                        </Content>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center' }} >
                        <View style={{ flexDirection: 'row', marginHorizontal: '8%' }} >
                            <View style={{ flex: 1, justifyContent: 'center' }} >
                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} >
                                    <Text style={{ fontWeight: '400', paddingRight: 10 }} >Alright, Samana</Text>
                                    <Image source={require('../images/edit-icon.png')} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 }} >
                                <Button onPress={this.LetsPlayNow.bind(this)} style={{ backgroundColor: '#2196f3', width: '90%', justifyContent: 'center', borderRadius: 22, alignSelf: 'flex-end' }} >
                                    <Text style={{ fontSize: 18, color: 'white' }} >Let's Play</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>
                <Prompt
                    title="Your Name"
                    placeholder="Type Your Name"
                    visible={this.state.promptVisible}
                    onCancel={() => this.setState({ promptVisible: false, message: "You cancelled" })}
                    onSubmit={(value) => this.submitprompt(value)} />
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        addname: (data) => {
            dispatch(addname(data));
        },
        addquestions: (data) => {
            dispatch(addquestions(data));
        },
        playsUpdateDb: (data) => {
            dispatch(playsUpdateDb(data));
        },
        selectedQuizData: (quizData) => {
            dispatch(selectedQuizData(quizData))
        },
        onlineUserQuestionsPlayed: (useruid, quizData) => {
            dispatch(onlineUserQuestionsPlayed(useruid, quizData));
        },
        addQuestionsLengthDb: (useruid, quizData) => {
            dispatch(addQuestionsLengthDb(useruid, quizData));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Play);
