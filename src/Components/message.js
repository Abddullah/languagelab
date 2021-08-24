import React, { Component } from "react";
import { Alert, ToastAndroid, ActivityIndicator, View, StatusBar, Platform, Modal, Image, TouchableOpacity, ScrollView, Dimensions, Keyboard, AsyncStorage, KeyboardAvoidingView } from "react-native";
import { Header, Body, Left, Right, Button, Card, Container, Form, Item, Thumbnail, CardItem, Title, Icon, Content, Footer, Input, Text } from "native-base";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { Dialog } from "react-native-simple-dialogs";
import * as firebase from "firebase";
import { alldata } from '../Actions/alldata';
import { addname } from '../Actions/user_detail'
import MyStatusBar from './statusbar';
import { challengeAction } from '../Actions/challengeAction'
// import RollerCards from "./home/Roller/roller";
import RollerCardsForPickingQuiz from "./home/Roller/rollerforpickquiz";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-simple-toast';


const styles = {
  container: { flex: 1, backgroundColor: "#ffffff" },
  containerView: { flex: 1, backgroundColor: "#ffffff", height: Dimensions.get('window').height },
  input: { flex: 5, borderColor: 'black', backgroundColor: 'white', borderColor: '#07b3fd', paddingLeft: 10, shadowColor: '#07b3fd', shadowOpacity: .5, shadowOffset: { width: -1, height: -1 }, shadowRadius: 10, elevation: 3 },
  btn: { backgroundColor: '#07b3fd', borderRadius: 50, width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }, shadowColor: '#07b3fd', shadowOpacity: .5, shadowOffset: { width: -1, height: -1 }, shadowRadius: 10, elevation: 3,
  header: { zIndex: 10, backgroundColor: "white", flexDirection: 'row', borderBottomColor: '#cbcacf', borderBottomWidth: 1, shadowRadius: 1.2, shadowOpacity: 0.2, height: 56, shadowOffset: { width: 0, height: 2 }, elevation: 3 },
  logo: { width: 72, height: 35, marginLeft: 20, marginTop: 8, resizeMode: 'contain' },
  masterBack: { height: "70%", width: 115 },
  gameBack: { height: "70%", width: 80, marginLeft: 12 },
  masterIcon: { position: "absolute", width: "18%", height: "40%", marginHorizontal: 14 },
  gameIcon: { position: "absolute", width: "26%", height: "30%", marginHorizontal: 30 },
  Footer: { position: "absolute", bottom: 0, paddingBottom: 0, width: "100%", height: 60, backgroundColor: "rgba(0,0,0,0.1)" }
};

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '',
      msgstatus: false,
      listHeight: 0,
      scrollViewHeight: 0,
      modalVisible: false,
    };
    this.challenge = this.challenge.bind(this);
  }

  msg(msg) {
    // console.log(msg, 'msg /////');
    if (msg === '') {
      this.setState({ msgstatus: false, msg })
    } else {
      this.setState({ msgstatus: true, msg })
    }
  }

  openModal() {
    this.setState({ modalVisible: true });
  }

  closeModal() {
    this.setState({ modalVisible: false, onSearch: true });
  }


  componentDidUpdate() {
    this.scrollToBottom()
  }

  scrollToBottom() {
    const bottomOfList = this.state.listHeight - this.state.scrollViewHeight
    console.log('scrollToBottom ----', bottomOfList, Dimensions.get('window').height);
    this.scrollView.scrollTo({ y: bottomOfList })
  }
  challenge(quiz) {
    let quizObject = quiz;
    // console.log('titles' in quizObject, quizObject,'quizObjectquizObjectquizObject')
    // if ('titles' in quizObject) {
    let challengeObj = {
      senderID: firebase.auth().currentUser.uid,
      receiverUid: this.props.data.onlineUser.uid,
      titles: quizObject.name.titles
    }
    let msgObjs = {
      senderID: firebase.auth().currentUser.uid,
      receiverUid: this.props.data.onlineUser.uid,
      msg: this.props.userInfo.userName + ' has challenged to play ' + quizObject.name.titles,
      timeStamp: firebase.database.ServerValue.TIMESTAMP,
      type: 'challenge',
      quizToChellange: quizObject

    }
    console.log(msgObjs, "=***********************************************==", challengeObj)
    if (this.props.isNetAvailable === true) {
      this.props.challengeAction(challengeObj, msgObjs)
    }
    else {
      Toast.show('Please check internet connection.');

    }

    // } else {
    //   // console.log('yahoo')
    //   this.openModal()
    // }

    // let that = this;
    this.setState({ msg: '', msgstatus: false })
  }
  openModelToChallenge() {
    this.openModal()
    this.setState({ msg: '', msgstatus: false })
  }


  sendMsg() {
    // console.log(this.props.data.quiz,'fdasfadsfadsfadsfadsfasd');
    let msgObj = {
      senderID: firebase.auth().currentUser.uid,
      receiverUid: this.props.data.onlineUser.uid,
      msg: this.state.msg,
      timeStamp: firebase.database.ServerValue.TIMESTAMP,
      type: 'message',
      quizToChellange: this.props.data.quiz
    }

    // console.log(msgObj,'msgObj');
    if (msgObj.quizToChellange === undefined) {
      msgObj.quizToChellange = {}
    }
    // console.log(msgObj,'msgObj');
    let that = this;
    if (!(/\S/.test(this.state.msg))) {
      Toast.show('Empty message are note Allowed');
    }
    else {
      if (this.props.isNetAvailable === true) {
        firebase.database().ref('chat/').push(msgObj)
          .then((msgSent) => {

          })
      }
      else {
        Toast.show('Please check internet connection.');


      }

    }
    this.setState({
      msg: '',
      msgstatus: false
    })
  }
  _scrollToInput(reactNode) {
    // Add a 'scroll' ref to your ScrollView
    this.scroll.scrollToFocusedInput(reactNode)
  }
  render() {
    // console.log(this.props.allData)
    let currentUser = firebase.auth().currentUser.uid;
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

    // console.log(this.props.allData.allData, '99999999999999');
    return (
      <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <MyStatusBar backgroundColor="#07b3fd" barStyle="light-content" />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => Actions.profile({ circleClick: true })} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
            <Text style={{ fontSize: 15 }} >Back</Text>
          </TouchableOpacity>
          <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }} >
            <Image style={styles.logo} source={require("./images/mage_splash_logo.png")} />
          </View>
          <View style={{ flex: 1 }} />
        </View>
        {/* <KeyboardAwareScrollView scrollEnabled={true} contentContainerStyle={styles.container}      > */}
        {/* <View style={styles.containerView}> */}
        {/* <KeyboardAvoidingView style={styles.container} behavior="position"> */}

          <ScrollView onContentSizeChange={(contentWidth, contentHeight) => this.setState({ listHeight: contentHeight })}
            onLayout={(e) => { const height = e.nativeEvent.layout.height; this.setState({ scrollViewHeight: height }) }}
            ref={(ref) => this.scrollView = ref}>
            <View style={{ paddingBottom: 70, zIndex: -10, }} >
              {
                this.props.userDatas.chat.map((message, index) => {
                  let date = new Date(message.timeStamp).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

                  // console.log(message.senderID === currentUser, message.receiverUid === this.props.data.onlineUser.uid, message.senderID === this.props.data.onlineUser.uid, message.receiverUid === currentUser, 'testing conditions')
                  return (
                    ((message.senderID === currentUser && message.receiverUid === this.props.data.onlineUser.uid) || (message.senderID === this.props.data.onlineUser.uid && message.receiverUid === currentUser)) ?
                      (
                        (message.senderID === currentUser && message.receiverUid === this.props.data.onlineUser.uid) ?
                          (
                            <View key={index} style={{ marginTop: 10, justifyContent: 'flex-end', alignItems: 'flex-end', width: '50%', alignSelf: 'flex-end' }} >
                              <Image style={{ position: 'absolute', height: 50, width: 50 }} source={require('./images/chat.png')} />
                              <View style={{ width: '100%', backgroundColor: '#2196f3', paddingVertical: 10, borderRadius: 20, marginRight: 22 }} >
                                <Text style={{ backgroundColor: 'transparent', width: '80%', alignSelf: 'center', color: 'white' }} >{message.msg}</Text>
                                <Text style={{ fontSize: 8, color: 'white', width: '80%', alignSelf: 'center', }} >{date}</Text>
                              </View>
                            </View>
                          ) :
                          (<View key={index} style={{ marginTop: 10, justifyContent: 'flex-end', alignItems: 'flex-start', width: '50%', alignSelf: 'flex-start' }} >
                            <Image style={{ position: 'absolute', height: 50, width: 50 }} source={require('./images/chat1.png')} />
                            <View style={{ width: '100%', backgroundColor: '#cbcacf', paddingVertical: 10, borderRadius: 20, marginLeft: 22 }} >
                              <Text style={{ backgroundColor: 'transparent', width: '80%', alignSelf: 'center' }} >{message.msg}</Text>
                              <Text style={{ fontSize: 8, width: '80%', alignSelf: 'center' }} >{date}</Text>
                            </View>
                          </View>)
                      ) : null
                    // <Text>{message.msg}</Text>
                  )
                })
              }
            </View>
          </ScrollView>
          {
            ((this.state.listHeight - this.state.scrollViewHeight) < Dimensions.get('window').height) ? (<View style={{ height: (Dimensions.get('window').height - (this.state.listHeight + 80)) }}></View>) : null
          }
          <View style={{ flexDirection: 'row', position: 'absolute', bottom: 7 }} >
            <Item rounded style={styles.input} >
              <Input style={{ color: '#4caaf4' }} value={this.state.msg} onChangeText={this.msg.bind(this)} autoFocus={true} />
            </Item>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
              {
                this.state.msgstatus ?
                  <TouchableOpacity style={styles.btn} onPress={this.sendMsg.bind(this)} >
                    <Icon style={{ color: 'white', marginLeft: 5 }} name='send' />
                  </TouchableOpacity>
                  :
                  <TouchableOpacity style={styles.btn} onPress={this.openModelToChallenge.bind(this)} >
                    <Image style={{ width: 27, height: 25 }} source={require('./images/challenge.png')} />
                  </TouchableOpacity>
              }
            </View>
          </View>
          {/* </KeyboardAwareScrollView> */}
        {/* </KeyboardAvoidingView> */}
        {/* </View> */}
        <Modal transparent={true} visible={this.state.modalVisible} animationType={'fade'} onRequestClose={() => this.closeModal()} >
          <View style={{ position: 'absolute', backgroundColor: 'white', height: '100%', width: '100%', }} >
            <View style={{ flex: 1 }} >
              <Text style={{ fontSize: 18, textAlign: 'center', fontWeight: 'bold', marginVertical: 15 }} >Select Quiz</Text>
              <Content>
                <RollerCardsForPickingQuiz closeModal={() => this.setState({ modalVisible: false })} data={this.props.allData.allData} challengeFunc={this.challenge} />
              </Content>
            </View>
          </View>
        </Modal>
      </View >

    );
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return {
    auth: state.AuthReducer.isLoggedIn,
    userInfo: state.AuthReducer.user,
    allData: state.loadEveryThing,
    userDatas: state.userdata,
    isNetAvailable: state.AuthReducer.connectionStatus

  };
};
const mapDispatchToProps = (dispatch) => {
  return {

    alldata: () => {
      dispatch(alldata());
    },
    addname: (data) => {
      dispatch(addname(data))
    },
    challengeAction: (challengeObj, msgObjs) => {
      dispatch(challengeAction(challengeObj, msgObjs))
    }

  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Messages);
