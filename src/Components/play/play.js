import React, { Component } from "react";
import { StyleSheet, Text, StatusBar, View, Image, TouchableOpacity, AsyncStorage, ScrollView, PixelRatio, Dimensions, Platform, TouchableHighlight, Vibration } from "react-native";
import { Container, Tab, Tabs, Icon, Card, CardItem, Content, Button } from "native-base";
import DialogPlayBox from './dialogBox';
import DialogFeaturedBox from './featureddialogBox';
import AuthRequiredDialogeBox from './authrequireddialogebox';
import { Actions } from "react-native-router-flux";
import { CheckPlayer } from "../../Actions/checkVideos";
import { connect } from "react-redux";
import LinkPreview from 'react-native-link-preview';
import MyStatusBar from '../statusbar';
import YouTube from 'react-native-youtube';
import Prompt from 'rn-prompt';
import * as firebase from 'firebase';
import { addname, addquestions } from "../../Actions/user_detail";
import { reInitializeQuizStatus, getdata } from "../../Actions/alldata";
import Toast from 'react-native-simple-toast';

import { playsUpdateDb, onlineUserQuestionsPlayed, addQuestionsLengthDb } from '../../Actions/playUpdateDbAction';
import { updateGameType } from '../../Actions/alldata';


class VideosThumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogVisible: false,
      imguri: '',
      featuredDialogVisible: false,
      authRequiredDialogeBoxVisible: false,
      played: 0,
      youtubeVideoId: '',
      message: '',
      favouriteState: false,
      showVideo: false
    };
    console.log(this.props.data, 'this.props.data')
    if (firebase.auth().currentUser && firebase.auth().currentUser !== null && firebase.auth().currentUser.uid) {
      let userUid = firebase.auth().currentUser.uid;
      console.log(this.props.data.favouriteData, 'favorite Jeee')
      if (this.props.data.favouriteData && userUid in this.props.data.favouriteData === true) {
        this.state.favouriteState = true;
      }
      else {
        this.state.favouriteState = false;
      }
    }
  }

  LetsPlayNow(type) {
    console.log(type, 'dfasdfasdfasdfadsfasfdasdfasdfa')
    this.setState({ dialogVisible: false })
    this.addQuizList();
    if (firebase.auth().currentUser !== null) {
      console.log('online user is not equl  to null')
      if (type === 'solo' && this.props.isNetAvailable === true) {
        console.log(type, 'inside if statement', this.props.data)
        this.props.onlineUserQuestionsPlayed(firebase.auth().currentUser, this.props.data, 'solo')
        this.props.addQuestionsLengthDb(firebase.auth().currentUser, this.props.data)
        this.updateAndSwitch(this.props.data, 'solo')
        this.setState({ showVideo: false })
      }
      else {
        Toast.show('Please check internet connection.');
      }
    }
  }

  updateAndSwitch(data, gameType) {
    console.log(gameType, 'inside updateandswitch function')
    this.props.reInitQuizStatus();
    this.props.updateGameType(gameType)
    this.props.playsUpdateDb(data.name)
    Actions.test({ data, historyStatus: false, currentQuestionIndex: 0, gameType });
  }

  addQuizList() {
  }


  componentWillMount() {
    const { name } = this.props.data;

    let VideoUrl = name.introVideos;


    let youtubeVideoId;

    if (VideoUrl.length > 28) {
      youtubeVideoId = VideoUrl.slice(32, 43);
    }
    else {
      youtubeVideoId = VideoUrl.slice(17, 28)
    }

    this.setState({
      youtubeVideoId,
      showVideo: true
    })
  }


  PlayAction() {
    const { name } = this.props.data;
    this.setState({ dialogVisible: true })
  }
  ArrowBack() { Actions.myhome({ type: 'reset' }) }

  doFavourite(favourite, quizDetails) {
    var currentUser = firebase.auth().currentUser.uid;
    if (this.props.isNetAvailable === true) {

      if (favourite === 'mark') {
        let that = this;
        firebase.database().ref('/favorite/' + quizDetails.titles.toLowerCase() + '/' + currentUser + '/').set(currentUser)
          .then(() => {
            AsyncStorage.getItem('staleDataOfQuizzes')
              .then((quizzes) => {
                quizzes = JSON.parse(quizzes);
                console.log(that.props.allQuizesData, quizzes, 'stale favorite data to update.')
                for (var i = 0; i < quizzes.length; i++) {
                  if (quizzes[i].name.titles.toLowerCase() === quizDetails.titles.toLowerCase()) {
                    if (quizzes[i].favouriteData !== undefined && quizzes[i].favouriteData !== null) {
                      quizzes[i].favouriteData[currentUser] = currentUser;
                    }
                    else {
                      quizzes[i].favouriteData = {};
                      quizzes[i].favouriteData[currentUser] = currentUser;
                    }
                  }
                  that.props.getdata(quizzes);
                  AsyncStorage.setItem('staleDataOfQuizzes', JSON.stringify(quizzes));
                }
              })


            that.setState({
              favouriteState: true
            })
          })
      }
      else if (favourite === 'unmark') {
        let that = this;
        firebase.database().ref('/favorite/' + quizDetails.titles.toLowerCase() + '/' + currentUser + '/').remove()
          .then(() => {
            AsyncStorage.getItem('staleDataOfQuizzes')
              .then((quizzes) => {
                console.log(that.props.allQuizesData, JSON.parse(quizzes), 'stale favorite data to update.')
                quizzes = JSON.parse(quizzes);
                console.log(that.props.allQuizesData, quizzes, 'stale favorite data to update.')
                for (var i = 0; i < quizzes.length; i++) {
                  if (quizzes[i].name.titles.toLowerCase() === quizDetails.titles.toLowerCase()) {
                    if (quizzes[i].favouriteData !== undefined && quizzes[i].favouriteData !== null) {
                      delete quizzes[i].favouriteData[currentUser];
                    }
                    else {
                      console.log('no favorite found')
                      // quizzes[i].favouriteData = {};
                      // quizzes[i].favouriteData[currentUser] = currentUser;
                    }
                  }
                  that.props.getdata(quizzes);
                  AsyncStorage.setItem('staleDataOfQuizzes', JSON.stringify(quizzes));
                }


              })


            that.setState({
              favouriteState: false
            })
          })

      }
    }
    else {
      Toast.show('Please check internet connection.');

    }
  }

  render() {
    console.log(this.props.isLoggedIn, 'islogged in');

    const { name, questions } = this.props.data;
    let qs = questions.slice(0, 2)
    return (
      <Container style={{ backgroundColor: "#ffffff" }}>
        <MyStatusBar backgroundColor="#07b3fd" barStyle="dark-content" />
        <View style={{ flex: 1 }}>
          {
            (this.state.showVideo) ?
              <YouTube ref="youtubePlayer" videoId={this.state.youtubeVideoId} play={false} rel={false} fullscreen={false} showFullscreenButton={true} showinfo={false} controls={1} apiKey="AIzaSyDGUWXktyrlaagqf-ro1wqfu8ApyrNn7wc" origin="https://www.youtube.com" style={{ height: '30%', backgroundColor: 'black' }} />
              : <View style={{ height: '30%', backgroundColor: 'black' }}></View>

          }
          <View style={{ height: "55%" }}>
            <Content>
              <View style={{ flex: 1 }}>
                <View style={{ marginHorizontal: "5%" }}>

                  {
                    (this.props.isLoggedIn) ?
                      (
                        <View>
                          <Text style={{ color: "#111713", fontSize: 20, paddingTop: "5%" }} >{name.titles} </Text>
                          {(this.state.favouriteState === true) ? (
                            <TouchableOpacity onPress={this.doFavourite.bind(this, 'unmark', name)}>
                              <Icon style={{ color: 'red', alignSelf: 'flex-end' }} name='ios-heart' />
                            </TouchableOpacity>
                          ) : (
                              <TouchableOpacity onPress={this.doFavourite.bind(this, 'mark', name)}>
                                <Icon style={{ color: 'red', alignSelf: 'flex-end' }} name='ios-heart-outline' />
                              </TouchableOpacity>
                            )}
                        </View>
                      ) : (
                        <Text style={{ color: "#111713", fontSize: 20, paddingTop: "5%" }} >{name.titles} </Text>
                      )
                  }


                  <Card style={{ marginTop: 10 }}>
                    <CardItem>
                      <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                          <View style={styles.titlecontainer} />
                        </View>
                        <View style={{ flex: 9 }}>
                          <Text style={{ fontSize: 12, fontWeight: "bold" }}>{name.description}</Text>
                        </View>
                      </View>
                    </CardItem>
                  </Card>
                  <View style={styles.captionContainer} >
                    <View style={styles.caption}>
                      <Text style={styles.captiontxt}>SAMPLE QUESTIONS</Text>
                    </View>
                    <View style={styles.line}>
                      <View style={styles.line} />
                    </View>
                  </View>
                  <View style={{ marginTop: 5 }}>
                    {
                      qs.map((v, i) => {
                        return (
                          <Card key={i} style={{ marginTop: 10 }}>
                            <CardItem>
                              <View style={{ flexDirection: "row" }}>
                                <View style={styles.pointImage} >
                                  <Image style={{ width: "100%", height: "100%", borderRadius: 5 }} source={{ uri: v.imgUrl }} />
                                </View>
                                <View style={{ flex: 6, paddingHorizontal: "5%" }}>
                                  <Text style={{ fontSize: 12, fontWeight: "400" }}>{v.questions}</Text>
                                </View>
                              </View>
                            </CardItem>
                          </Card>
                        )
                      })
                    }
                  </View>
                </View>
              </View>
            </Content>
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <View style={{ flexDirection: "row", marginHorizontal: "8%" }}>
              <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={this.ArrowBack.bind(this)} style={styles.iconbtn} >
                  <Icon style={{ color: "#48a9f5" }} name="ios-arrow-back" />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>
                <Button onPress={this.PlayAction.bind(this)} style={styles.playBtn} >
                  <Text style={{ fontSize: 18, color: "white" }}>Play</Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
        <DialogPlayBox videoBoolFlag={this} soloQuizStart={() => this.LetsPlayNow('solo')} quizData={this.props.data} thatData={this} visible={this.state.dialogVisible} outsideTouch={(invisible) => this.setState({ dialogVisible: invisible })} />
        <DialogFeaturedBox visible={this.state.featuredDialogVisible} outsideTouch={(invisible) => this.setState({ featuredDialogVisible: invisible })} />
        <AuthRequiredDialogeBox visible={this.state.authRequiredDialogeBoxVisible} outsideTouch={(invisible) => this.setState({ authRequiredDialogeBoxVisible: invisible })} />


        {/* <Prompt title="Your Name" placeholder="Type Your Name" visible={this.state.promptVisible} onCancel={() => this.setState({ promptVisible: false, message: "You cancelled" })} onSubmit={(value) => this.submitprompt(value)} /> */}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  titlecontainer: { width: 3, backgroundColor: "#00baff", height: "100%", borderRadius: 20 },
  captionContainer: { flexDirection: "row", marginTop: "6%", marginBottom: "1%" },
  line: { width: "95%", backgroundColor: "#dfdee0", height: 1 },
  pointImage: { flex: 1, alignItems: "center", justifyContent: "center" },
  playBtn: { backgroundColor: "#2196f3", width: "70%", justifyContent: "center", borderRadius: 22, alignSelf: "flex-end" },
  imgtxt: { color: 'white', fontSize: 12 },
  imgtxtcont: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: '2%', marginVertical: '2%' },
  caption: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  captiontxt: { fontSize: 10, color: '#014171', fontWeight: 'bold' },
  line: { flex: 2, alignItems: 'center', justifyContent: 'center' },
  iconbtn: { height: 50, width: 50, backgroundColor: '#ffffff', borderRadius: 50, borderWidth: 1, borderColor: '#ffffff', shadowColor: '#e1e4ec', shadowOpacity: 12, elevation: 15, shadowOffset: { width: -4, height: 6 }, justifyContent: 'center', alignItems: 'center' },
});

const mapStateToProps = state => {
  // return state;
  return {
    // isPlaying: state.checkVideosReducers.IsPlayed
    isLoggedIn: state.AuthReducer.isLoggedIn,
    user: state.AuthReducer.user,
    isNetAvailable: state.AuthReducer.connectionStatus,
    allQuizesData: state.loadEveryThing.allData,

  };
};
const mapDispatchToProps = dispatch => {
  return {
    CheckPlayer: () => {
      dispatch(CheckPlayer());
    },
    addname: (data) => {
      dispatch(addname(data));
    },
    addquestions: (data) => {
      dispatch(addquestions(data));
    },
    playsUpdateDb: (data) => {
      dispatch(playsUpdateDb(data));
    },
    onlineUserQuestionsPlayed: (useruid, quizData) => {
      dispatch(onlineUserQuestionsPlayed(useruid, quizData));
    },
    addQuestionsLengthDb: (useruid, quizData) => {
      dispatch(addQuestionsLengthDb(useruid, quizData));
    },
    reInitQuizStatus: () => {
      dispatch(reInitializeQuizStatus());
    },

    updateGameType: (gameType) => {
      dispatch(updateGameType(gameType));
    },
    getdata: (updatedQuizData) => {
      dispatch(getdata(updatedQuizData));

    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VideosThumbnail);
