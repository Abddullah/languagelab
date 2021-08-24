import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import * as nb from "native-base";
import MyStatusBar from './statusbar';
import { Actions } from "react-native-router-flux";
import { clearEveryThing } from '../Actions/teamPinAction'
import { addTeamName } from '../Actions/addTeamNameAction'
import * as firebase from 'firebase'
import Toast from 'react-native-simple-toast';

class PinSolo1on1Name extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamName: '',
            gotTeamName: false,
            numberOfForms: [0, 0, 0],
            newArray: []

        }
    }

    onSubmitTeamName() {
        const { teamName, gotTeamName } = this.state;
        if (/\S/.test(teamName)) {
            let TeamName = {
                teamName,
                pin: this.props.pin,
            }

            if (this.props.isNetAvailable === true) {
                this.props.addTeamName(TeamName)
            }
            else {
                Toast.show('Please check internet connection.');

            }

        } else {
            alert('Please Type Your Team Name')
        }
    }

    componentWillMount() {
        console.log('solo called ---------')
        this.props.clearEveryThing()
    }
    onSubmit() {
        const { teamName } = this.state;
        let TeamName = {
            teamName,
            pin: this.props.pin,
        }
        if (this.props.isNetAvailable === true) {
            this.props.addTeamName(TeamName)
        }
        else {
            Toast.show('Please check internet connection.');

        }

    }


    onchangeText(a, test) {
        const { numberOfForms, newArray } = this.state;
        newArray[a] = test
        this.setState({
            newArray: newArray
        })

    }
    onAddForm() {
        const { numberOfForms } = this.state;
        numberOfForms.push(0)
        this.setState({
            numberOfForms
        })
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (Actions.currentScene === 'PinSolo1on1Name') {
            return true;
        }
        else {
            return false;
        }
    }
    componentDidMount() {
        let that = this;
        const { newArray, teamName } = this.state;
        if (this.props.isNetAvailable === true) {
            firebase.database().ref('/gameRom/').on('child_changed', function (snap) {
                if ('quizStart' in snap.val()) {
                    if (snap.val().key === that.props.pin && snap.val().quizStart) {
                        // console.log(snap.val(), 'hello')
                        that.props.allQuizArray.map((v, i) => {
                            // console.log(v)
                            if (v.name.titles.toLowerCase() === snap.val().quizTitle.toLowerCase() && v.questions.length !== snap.val().currentQuizIndex + 1) {
                                let TeamName = {
                                    teamName: that.state.teamName,
                                    pin: that.props.pin,
                                    teamMembers: newArray
                                }
                                // console.log(TeamName)
                                Actions.test({ data: v, historyStatus: false, currentQuestionIndex: 0, TeamName })
                            }
                        })
                    }
                }
            })
        }
        else {
            Toast.show('Please check internet connection.');

        }

    }

    render() {
        return (
            <View style={{ backgroundColor: 'white', flex: 1 }} >
                <MyStatusBar backgroundColor="#07b3fd" barStyle="light-content" />
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => Actions.pop()} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                        <Text style={{ fontSize: 15 }} >Back</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }} >
                        <Image style={styles.logo} source={require("./images/mage_splash_logo.png")} />
                    </View>
                    <View style={{ flex: 1 }} />
                </View>
                <nb.Content>
                    <View>
                        {
                            this.props.gotTeamData ?
                                this.props.loading ?
                                    <ActivityIndicator style={{ alignSelf: 'center', marginVertical: 10 }} size='large' color='#07b3fd' />
                                    :
                                    <View style={{ justifyContent: 'center' }} >
                                        <Text style={styles.teamName} >{this.state.teamName}</Text>
                                        <Text style={{ marginTop: 30, fontSize: 35, fontWeight: 'bold', textAlign: 'center' }} >Heads Up</Text>
                                        <Text style={{ width: '80%', textAlign: 'center', alignSelf: 'center', fontSize: 22 }} >Check out your name on screen!</Text>
                                        <View style={{ width: '70%', alignSelf: 'center', marginVertical: 20 }} >
                                            {
                                                this.state.newArray.map((v, i) => {
                                                    return (
                                                        <View key={i} style={styles.ptcontainer} >
                                                            <View style={styles.point} />
                                                            <Text style={{ width: '70%', alignSelf: 'center', fontSize: 17 }} >{v}</Text>
                                                        </View>
                                                    )
                                                })
                                            }
                                        </View>
                                    </View>
                                :

                                this.state.gotTeamName ?
                                    <View>
                                        <Text style={{ color: '#07b3fd', fontWeight: 'bold', fontSize: 18, textAlign: 'center', marginVertical: 10 }} >Enter Your Team Members Name</Text>

                                        {
                                            this.state.numberOfForms.map((v, i) => {
                                                return (
                                                    <nb.Item key={i} rounded style={{ width: '60%', alignSelf: 'center', marginVertical: 10 }} >
                                                        <nb.Input onChangeText={this.onchangeText.bind(this, i)} style={{ textAlign: 'center' }} placeholder='Member Name' autoFocus={i === 0 ? true : false} placeholderTextColor='#909090' />
                                                    </nb.Item>
                                                )
                                            })
                                        }

                                        <nb.Button onPress={this.onAddForm.bind(this)} style={styles.btn1} >
                                            <nb.Text>Add Form</nb.Text>
                                            <nb.Icon name='md-add' />
                                        </nb.Button>
                                        <nb.Button onPress={this.onSubmit.bind(this)} style={styles.btn} >
                                            <nb.Text>Enter</nb.Text>
                                        </nb.Button>
                                    </View> :
                                    <View>
                                        <Image style={styles.mainLogo} source={require('./images/mage_splash_logo.png')} />
                                        <nb.Item rounded style={{ width: '60%', alignSelf: 'center', marginVertical: 10 }} >
                                            <nb.Input onChangeText={teamName => this.setState({ teamName })} style={{ textAlign: 'center' }} placeholder='Player Name' autoFocus placeholderTextColor='#909090' />
                                        </nb.Item>
                                        <nb.Button onPress={this.onSubmitTeamName.bind(this)} style={styles.btn} >
                                            <nb.Text>Enter</nb.Text>
                                        </nb.Button>
                                        <View style={{ marginTop: 150, alignItems: 'center' }} >
                                            <Text>Enter PIN now for</Text>
                                            <View style={{ flexDirection: 'row' }} >
                                                {/* <Text style={{ fontWeight: '500', marginRight: 5 }} >FREE</Text> */}
                                                <Text>a MAGE duel.</Text>
                                            </View>
                                        </View>
                                    </View>

                        }
                    </View>
                </nb.Content>
            </View>
        )
    }
}

function mapStateToProps(state) {
    // console.log(state.loadEveryThing.allData)
    return {
        loading: state.PinTeam.Loading,
        allQuizArray: state.loadEveryThing.allData,
        gotTeamData: state.PinTeam.gotTeamData,
        isNetAvailable: state.AuthReducer.connectionStatus

    }
}

export default connect(mapStateToProps, { addTeamName, clearEveryThing })(PinSolo1on1Name)

const styles = StyleSheet.create({
    ptcontainer: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
    point: { backgroundColor: 'black', borderRadius: 50, height: 10, width: 10, marginHorizontal: 20 },
    teamName: { color: '#07b3fd', fontWeight: 'bold', textAlign: 'center', fontSize: 20, borderBottomWidth: 1, paddingVertical: 10, borderBottomColor: '#909090' },
    header: { backgroundColor: "white", flexDirection: 'row', borderBottomColor: '#cbcacf', borderBottomWidth: 1, shadowRadius: 1.2, shadowOpacity: 0.2, height: 56, shadowOffset: { width: 0, height: 2 }, elevation: 3 },
    logo: { width: 72, height: 35, resizeMode: 'contain' },
    mainLogo: { width: 202, height: 97.5, alignSelf: 'center', marginTop: 70, marginBottom: 20, resizeMode: 'contain' },
    btn: { backgroundColor: '#4caaf4', width: '40%', alignSelf: 'center', marginVertical: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
    btn1: { backgroundColor: '#4caaf4', width: '40%', alignSelf: 'center', marginVertical: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }
})
