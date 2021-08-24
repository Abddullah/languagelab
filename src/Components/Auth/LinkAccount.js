import React, { Component } from 'react';
import { View, Image, StyleSheet, Platform, ScrollView, Keyboard, TouchableOpacity } from 'react-native';
import { Card, CardSection, Spinner, EndCardSection } from '../Common';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { SignUpAction, linkAccount } from '../../Actions/AuthAction';
import { Picker, Form, H3, Item as FormItem, Label, Container, Header, Content, Item, Input, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
const Items = Picker.Item;
import * as Progress from 'react-native-progress';
import MyStatusBar from '../statusbar';

class LinkAccount extends Component {
    constructor(props) {
        super(props);
        this.ButtonLogIn = this.ButtonLogIn.bind(this);
        this.state = {
            userName: '',
            email: this.props.userCredentials.email,
            password: '',
            educationRole: null,
            role: 'social',
            confirmEmail: this.props.userCredentials.email,
            uid: this.props.userCredentials.uid
        }
    }

    onValueChange(value) {
        this.setState({ role: value });
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (Actions.currentScene === 'linkaccount') {
            return true;
        }
        else {
            return false;
        }
    }
    ButtonLogIn() {
        var state = this.state;
        if (!state.educationRole || !state.email || !state.password || !state.role || !state.userName) {
            console.log("Error")
            alert("All feild are required")
        } else {
            if (this.props.isNetAvailable === true) {

                delete state.confirmEmail
                this.props.linkAccount(state, this.props.allQuizsData)

            }
            else {
                Toast.show('Please check internet connection.');

            }
        }

    }

    render() {
        return (
            <Container style={{ backgroundColor: '#f7f9ff' }}>
                <MyStatusBar backgroundColor="#07b3fd" barStyle="light-content" />
                <View style={styl.header}>
                    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', paddingLeft: 15 }}>
                        <TouchableOpacity onPress={() => Actions.pop()} >
                            <Icon style={{ color: 'white' }} name="ios-arrow-back" />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 15, color: 'white', paddingLeft: 10 }} >Provide Following</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Button style={{ alignSelf: 'flex-end' }} transparent warning onPress={() => Actions.pop()}>
                            <Text style={{ fontSize: 13, color: 'yellow', fontWeight: 'bold' }}>SIGN UP</Text>
                        </Button>
                    </View>
                </View>
                <ScrollView>
                    <Content>
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '4%',
                            marginBottom: '2%'
                        }}>
                            <Image style={{ width: 206, height: 100, resizeMode: 'contain' }}
                                source={require('../images/mage_splash_logo.png')}
                            />
                        </View>
                        <View style={{ height: '0.8%', marginTop: '6%', alignItems: 'center' }}>
                            <Progress.Bar unfilledColor={'#cccccc'} progress={1} width={70} color='#cccccc' height={5} animated={true} borderWidth={0} />
                        </View>
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            marginVertical: '5%'
                        }}>
                            <View style={{ marginHorizontal: '14%' }}>
                                <Label style={{ fontSize: 13 }}>You're using mage as</Label>
                            </View>
                            <View style={{ alignItems: 'center', marginVertical: '1%' }}>
                                <Item rounded style={styl.input} >
                                    <Picker mode="dropdown" selectedValue={this.state.role} style={{ marginLeft: "10%", width: 270 }} onValueChange={this.onValueChange.bind(this)} >
                                        <Items style={{ fontWeight: 5, fontSize: 12, }} label="Select one" value="default" />
                                        <Items style={{ fontSize: 12 }} label="Social" value="social" />
                                        <Items style={{ fontSize: 12 }} label="Student" value="student" />
                                        <Items style={{ fontSize: 12 }} label="Teacher" value="teacher" />
                                        <Items style={{ fontSize: 12 }} label="Work" value="work" />
                                    </Picker>
                                    {/* <Icon name="ios-arrow-down-outline" style={{color: '#2196f3', marginRight: 25}} /> */}
                                </Item>
                            </View>

                            <View style={{ marginHorizontal: '14%', marginVertical: '1%' }}>
                                <Label style={{ fontSize: 13 }}>School/University</Label>
                            </View>
                            <View style={{ alignItems: 'center', }}>
                                <Item rounded style={styl.input}>
                                    <Input
                                        placeholder="School/University"
                                        placeholderStyle={{ fontSize: 10 }}
                                        placeholderTextColor="#b3b3b3"
                                        style={{ marginLeft: "10%", fontSize: 15 }}
                                        onChangeText={educationRole => this.setState({ educationRole })}
                                    />
                                    {/* <Icon name='school' style={styl.icons} /> */}
                                    <Image style={{ width: 24, height: 20, marginRight: 20 }}
                                        source={require('../images/Degree_iconios.png')}
                                    />
                                </Item>
                            </View>
                            <View style={{ marginHorizontal: '14%', marginVertical: '1%' }}>
                                <Label style={{ fontSize: 13 }}>Username</Label>
                            </View>
                            <View style={{ alignItems: 'center', }}>
                                <Item rounded style={styl.input}>
                                    <Input
                                        placeholder='Username'
                                        placeholderStyle={{ fontSize: 10 }}
                                        placeholderTextColor="#b3b3b3"
                                        style={{ marginLeft: "10%", fontSize: 15 }}
                                        onChangeText={userName => this.setState({ userName })}
                                    />
                                </Item>
                            </View>

                            <View style={{ marginHorizontal: '14%', marginVertical: '1%' }}>
                                <Label style={{ fontSize: 13 }}>Create Password</Label>
                            </View>
                            <View style={{ alignItems: 'center', }}>
                                <Item rounded style={styl.input}>
                                    <Input
                                        secureTextEntry
                                        placeholder='Password'
                                        placeholderStyle={{ fontSize: 10 }}
                                        placeholderTextColor="#b3b3b3"
                                        style={{ marginLeft: "10%", fontSize: 15 }}
                                        onChangeText={password => this.setState({ password })}
                                    />
                                    {/* <Icon name="lock" style={styl.icons} /> */}
                                    <Image style={{ width: 19, height: 30, marginRight: 20 }}
                                        source={require('../images/lock_blueios.png')}
                                    />
                                </Item>
                            </View>

                        </View>
                        {(this.props.isError) ? <Text style={styl.error}>{this.props.errorMessage}</Text> : null}
                        <View>
                            {(this.props.isLoading) ?
                                <Spinner />
                                :
                                <Button block info style={styl.button} onPress={this.ButtonLogIn}>
                                    <Text>JOIN MAGE</Text>
                                </Button>
                            }
                        </View>
                    </Content>
                </ScrollView>

            </Container>
        );
    }
}


const mapStateToProps = (state) => {
    // console.log("Inside mapStateToProps", state.AuthReducer)
    return {
        // isLoading: state.AuthReducer.isLoading,
        errorMessage: state.AuthReducer.error,
        isError: state.AuthReducer.isError,
        allQuizsData: state.loadEveryThing,
        isNetAvailable: state.AuthReducer.connectionStatus


    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        SignUp: (userData) => {
            dispatch(SignUpAction(userData));
        },
        linkAccount: (userData, allQuizsData) => {
            dispatch(linkAccount(userData, allQuizsData));
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LinkAccount);

const styl = StyleSheet.create({
    header: { backgroundColor: "#2196f3", flexDirection: 'row', borderBottomColor: '#cbcacf', borderBottomWidth: 1, shadowRadius: 1.2, shadowOpacity: 0.2, height: 50, shadowOffset: { width: 0, height: 2 }, elevation: 3 },
    input: { backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', borderColor: 'white', shadowColor: '#e6ebf3', shadowOffset: { width: 5, height: 6 }, shadowOpacity: 1.0, width: '80%', margin: 10, elevation: 15 },
    icons: { color: '#2196f3', marginRight: 10 },
    form: { backgroundColor: '#F8F8F8', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 2, height: 4 }, shadowOpacity: 2, width: '80%', margin: 10, elevation: 7, borderRadius: 100, borderWidth: 1, borderColor: '#d6d7da' },
    button: { width: '80%', backgroundColor: '#2196f3', marginLeft: '10%', marginRight: '10%', borderColor: '#2196f3', borderRadius: 100, borderWidth: 1, shadowColor: '#d7f0ff', shadowOffset: { width: 2, height: 4 }, shadowOpacity: 2, elevation: 9, marginBottom: 30 },
    error: { color: 'red', marginLeft: 30, marginRight: 30, width: '80%', fontWeight: "600" }
})