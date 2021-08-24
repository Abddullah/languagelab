import React, { Component } from 'react';
import { View, Image, StyleSheet, Platform, Keyboard, TouchableOpacity } from 'react-native';
import { Spinner } from '../Common';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { SignInAction, sendForgotPasswordEmail, authWithFBorGoogle, loginFailed } from '../../Actions/AuthAction';
import { Container, Header, Content, Item, Input, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
import * as Progress from 'react-native-progress';
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk';
import firebase from 'firebase';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import MyStatusBar from '../statusbar';
import Toast from 'react-native-simple-toast';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.ButtonLogIn = this.ButtonLogIn.bind(this);
        this.state = {
            email: '',
            password: '',
            isView: false,
            reEnterEmail: ''
        }
        this.props.loginFailed('');
        console.log('rolled logged in')
        console.log(this.props.quizDetails, 'quizDetails')

    }
    shouldComponentUpdate(nextProps, nextState) {
        if (Actions.currentScene === 'login') {
            return true;
        }
        else {
            return false;
        }
    }
    ButtonLogIn() {
        // delete this.state.isView
        // delete this.state.reEnterEmail
        let userData = {
            email: this.state.email,
            password: this.state.password
        }
        // console.log(this.props.allQuizsData, 'this.props.selectedData0000000000000')
        if (this.state.email === '' || this.state.password === '') {
            this.props.loginFailed('Please enter email and password.');
        }
        else {
            console.log(this.props.quizDetails, 'quizDetails')
            if (this.props.isNetAvailable === true) {
                this.props.SignInAction(userData, this.props.allQuizsData, this.props.quizDetails);

            }
            else {
                Toast.show('Please check internet connection.');

            }
        }
    }
    forgetPassword() {
        console.log('Please enter email.', this.state.reEnterEmail)
        if (this.state.reEnterEmail === '') {
            this.props.loginFailed('Please enter email.');

        }
        else {
            if (this.props.isNetAvailable === true) {
                this.props.sendMail(this.state.reEnterEmail)

            }
            else {
                Toast.show('Please check internet connection.');

            }
        }
        // console.log(this.state.reEnterEmail)
    }
    ArrowBack() {
        if (this.state.isView === true) {
            this.setState({ isView: false })
        }
        else {
            Actions.myhome();
        }
    }
    _loginWithGoogle() {
        let that = this;
        // GoogleSignin.signOut()
        if (this.props.isNetAvailable === true) {
            GoogleSignin.configure({
                iosClientId: '781554659331-chde550j1hkdr937bsvfiot4esrtm3om.apps.googleusercontent.com', // only for iOS
                // accountName: 'headeralishah@gmail.com'
                forceConsentPrompt: true
            })
                .then(() => {
                    let thatIs = that;
                    GoogleSignin.signIn()
                        .then((accessTokenData) => {
                            // console.log(accessTokenData, 'signin++++++++++++');
                            const credential = firebase.auth.GoogleAuthProvider.credential(accessTokenData);
                            thatIs.props.authWithFBorGoogle(credential, thatIs.props.allQuizsData, thatIs.props.quizDetails);
                        })
                        .catch((err) => {
                            console.log('WRONG SIGNIN----------', err);
                            alert(err)
                        })
                        .done();
                });
        }
        else {
            Toast.show('Please check internet connection.');

        }
    }
    _loginWithFB() {
        let that = this;
        // LoginManager.logOut();
        if (this.props.isNetAvailable === true) {
            LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
                function (result) {
                    console.log(result, 'inside logged in manager fb')
                    if (result.isCancelled) {
                        alert('Login cancelled');
                    } else {
                        let thatIs = that;
                        AccessToken.getCurrentAccessToken()
                            .then((accessTokenData) => {
                                console.log(accessTokenData, 'inside token')

                                // console.log(accessTokenData, 'accessTokenData')
                                const credential = firebase.auth.FacebookAuthProvider.credential(accessTokenData.accessToken);
                                thatIs.props.authWithFBorGoogle(credential, thatIs.props.allQuizsData, thatIs.props.quizDetails);

                            }, (error) => {
                                console.log(error, 'some error occurred');
                            })
                    }
                },
                function (error) {
                    alert('Login fail with error: ' + error);
                    console.log(error);
                }
            );
        }
        else {
            Toast.show('Please check internet connection.');

        }
    }
    render() {
        // this.props.loginFailed('');

        return (
            <Container style={{ backgroundColor: '#f7f9ff' }}>
                <MyStatusBar backgroundColor="#07b3fd" barStyle="light-content" />
                <View style={styl.header}>
                    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', paddingLeft: 15 }}>
                        <TouchableOpacity onPress={this.ArrowBack.bind(this)} >
                            <Icon style={{ color: 'white' }} name="ios-arrow-back" />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 15, color: 'white', paddingLeft: 10 }} >SIGN IN</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <View style={{ width: 300 }}>
                            <Button transparent warning onPress={() => { Actions.signup() }}>
                                <Text style={{ fontSize: 13, color: 'yellow', fontWeight: 'bold' }}>CREATE AN ACCOUNT</Text>
                            </Button>
                        </View>
                    </View>
                </View>

                <Content>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginVertical: 10
                    }}>
                        <Image style={{ width: 206, height: 100, resizeMode: 'contain' }}
                            source={require('../images/mage_splash_logo.png')}
                        />
                    </View>
                    <View style={{ height: '0.8%', marginTop: '6%', alignItems: 'center' }}>
                        <Progress.Bar unfilledColor={'#cccccc'} progress={1} width={70} color='#cccccc' height={5} animated={true} borderWidth={0} />
                    </View>
                    {(!this.state.isView) ?
                        <View style={{ marginTop: '7%', }}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Text style={{ marginTop: 10, marginBottom: 15, fontSize: 15, }}>
                                    SIGN IN WITH YOUR MAGE ACCOUNT.
                                   </Text>
                                <Item rounded style={styl.input}>
                                    <Input
                                        placeholder='Enter Email'
                                        placeholderStyle={{ fontSize: 10 }}
                                        placeholderTextColor="#b3b3b3"
                                        keyboardType={'email-address'}
                                        type="email"
                                        style={{ marginLeft: "10%", fontSize: 13 }}
                                        onChangeText={email => this.setState({ email })}
                                    />
                                    {/* <Icon name="mail" style={styl.icons} /> */}
                                    <Image style={{ width: 22, height: 17, marginRight: 20 }}
                                        source={require('../images/emailblueios.png')}
                                    />
                                </Item>

                                <Item rounded style={styl.input}>
                                    <Input
                                        secureTextEntry
                                        placeholder='password'
                                        placeholderStyle={{ fontSize: 10 }}
                                        placeholderTextColor="#b3b3b3"
                                        style={{ marginLeft: "10%", fontSize: 13 }}
                                        onChangeText={password => this.setState({ password })}
                                    />
                                    {/* <Icon name="lock" style={styl.icons} /> */}
                                    <Image style={{ width: 20, height: 31, marginRight: 20 }}
                                        source={require('../images/lock_blueios.png')}
                                    />
                                </Item>

                            </View>
                            {(this.props.isError) ? <Text style={styl.error}>{this.props.errorMessage}</Text> : null}
                            <View>
                                <Button transparent block onPress={() => { this.setState({ isView: true }); this.props.loginFailed('') }}>
                                    <Text>Forget your password</Text>
                                </Button>
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                {(this.props.isLoading) ?
                                    <Spinner />
                                    :
                                    <Button block style={styl.button} onPress={this.ButtonLogIn}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 14 }}>SIGN IN</Text>
                                    </Button>
                                }
                            </View>
                            <View style={{ marginVertical: 10, justifyContent: 'center' }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text >
                                        OR SIGN IN WITH
                                    </Text>
                                </View>
                            </View>
                            <View style={{ marginVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={this._loginWithFB.bind(this)}>
                                        <Image style={{ width: 55, height: 55, marginHorizontal: 18 }} source={require('../images/facebook.png')} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this._loginWithGoogle.bind(this)}>
                                        <Image style={{ width: 55, height: 55 }} source={require('../images/Google+.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        :
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginVertical: '6%'
                        }}>
                            <Item rounded style={styl.input}>
                                <Input
                                    placeholder='Enter your email'
                                    placeholderStyle={{ fontSize: 10 }}
                                    placeholderTextColor="#b3b3b3"
                                    type="email"
                                    style={{ marginLeft: "10%", fontSize: 15 }}
                                    onChangeText={reEnterEmail => { this.setState({ reEnterEmail }); console.log(reEnterEmail) }}
                                />
                                <Icon name="mail" style={styl.icons} />
                            </Item>
                            <View style={{
                                marginVertical: '4%'
                            }}>
                                {(this.props.isMailLoading) ?
                                    <Spinner />
                                    :
                                    <Button style={styl.button} onPress={this.forgetPassword.bind(this)}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 14 }}>SEND</Text>
                                    </Button>
                                }
                            </View>
                            {(this.props.isError) ? <Text style={styl.error}>{this.props.errorMessage}</Text> : null}

                        </View>
                    }
                </Content>
            </Container>

        );
    }
}


const mapStateToProps = (state) => {
    // console.log("Inside mapStateToProps", state.AuthReducer.loadingSendMail)
    // console.log("Inside mapStateToProps", state.AuthReducer.sendMailError)
    // console.log("Inside mapStateToProps", state.AuthReducer.sendMailErrorMassege)
    return {
        isLoading: state.AuthReducer.isLoading,
        isMailLoading: state.AuthReducer.loadingSendMail,
        // loader: state.AuthReducer.loader,
        errorMessage: state.AuthReducer.error,
        isError: state.AuthReducer.isError,
        allQuizsData: state.loadEveryThing,
        isNetAvailable: state.AuthReducer.connectionStatus
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        SignInAction: (userLogin, allQuizsData, quizDetails) => {
            dispatch(SignInAction(userLogin, allQuizsData, quizDetails));
        },
        sendMail: (mail) => {
            dispatch(sendForgotPasswordEmail(mail));
        },
        authWithFBorGoogle: (credential, allQuizsData, quizDetails) => {
            dispatch(authWithFBorGoogle(credential, allQuizsData, quizDetails))
        },
        loginFailed: (message) => {
            dispatch(loginFailed(message))
        }


    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

// export default LoginForm;
const styl = StyleSheet.create({
    input: {
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        shadowColor: '#e6ebf3',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 2,
        width: '80%',
        margin: 10,
        elevation: 4,
    },
    icons: {
        color: '#2196f3',
        marginRight: 10
    },
    button: {
        width: '80%',
        backgroundColor: '#2196f3',
        marginLeft: '10%',
        marginRight: '10%',
        borderColor: '#2196f3',
        borderRadius: 100,
        borderWidth: 1,
        shadowColor: '#d7f0ff',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 1,
        elevation: 5,
    },
    error: {
        color: 'red',
        marginLeft: 30,
        marginRight: 30,
        textAlign: 'center',
        width: '80%',
        fontWeight: "600"
    },
    header: {
        backgroundColor: "#2196f3",
        flexDirection: 'row',
        borderBottomColor: '#cbcacf',
        borderBottomWidth: 1,
        shadowRadius: 1.2,
        shadowOpacity: 0.2,
        height: 50,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3
    },
})