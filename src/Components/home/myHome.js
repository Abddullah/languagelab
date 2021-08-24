import React, { Component } from "react";
import { Platform, ActivityIndicator, View, Text, StatusBar, Image, Modal, TouchableOpacity, ScrollView, Dimensions, Keyboard, RefreshControl, AsyncStorage, NetInfo } from "react-native";
import { CardSection, Spinner, EndCardSection, BtnRounded, ButtonIcon } from "../Common";
import { Button, Card, Container, Form, Item, Thumbnail, CardItem, Title, Icon, Content, Footer, Input } from "native-base";
import { connect } from "react-redux";
import ScrolCards from "./scrollsCard/card";
import PROGRESS from "./inProgress/PROGRESS";
import ProgressClimate from "./inProgress/inProgress";
import RollerCards from "./Roller/roller";
import { Actions } from "react-native-router-flux";
import { Dialog } from "react-native-simple-dialogs";
import * as firebase from "firebase";
import { alldata, getdata, fectchDataFromFirebase } from '../../Actions/alldata';
import { addname } from '../../Actions/user_detail';
import MyStatusBar from '../statusbar';
import Toast from 'react-native-simple-toast';



const styles = {
  header: { backgroundColor: "white", flexDirection: 'row', borderBottomColor: '#cbcacf', borderBottomWidth: 1, shadowRadius: 1.2, shadowOpacity: 0.2, height: 56, shadowOffset: { width: 0, height: 2 }, elevation: 3 },
  logo: { width: 72, height: 35, marginLeft: 20, marginTop: 8, resizeMode: 'contain' },
  masterBack: { height: 30, width: 94 },
  gameBack: { height: 30, width: 60, marginLeft: 12 },
  masterIcon: { position: "absolute", width: 15, height: Platform.OS === 'ios' ? 16 : 15, marginHorizontal: 10 },
  learnerIcon: { width: 98, height: Platform.OS === 'ios' ? 34 : 34, marginHorizontal: 2, marginVertical: 3, marginTop: 5 },
  expertIcon: { width: 94, height: Platform.OS === 'ios' ? 34 : 34, marginHorizontal: 2, marginVertical: 3, marginTop: 5 },

  gameIcon: { position: "absolute", width: 15, height: Platform.OS === 'ios' ? 11 : 11, marginLeft: 23 },
  Footer: { position: "absolute", bottom: 0, width: "100%", height: 60, backgroundColor: "rgba(0,0,0,0.1)", flexDirection: 'row' },
  profile: { backgroundColor: '#ffffff', width: 50, height: 50, borderRadius: 50, justifyContent: 'center', alignItems: 'center', top: 5, bottom: 0 },
  searchBox: { backgroundColor: '#ffffff', width: 50, height: 50, borderRadius: 50, justifyContent: 'center', alignItems: 'center', top: 5, bottom: 0 },
  dialog: { backgroundColor: '#ffffff', paddingBottom: 0, paddingTop: 0, marginTop: 0 },
  circle: { backgroundColor: '#ffffff', width: 50, height: 50, borderRadius: 50, justifyContent: 'center', alignItems: 'center', top: 5, bottom: 0 },
  pin: { backgroundColor: '#ffffff', width: 130, height: 50, borderRadius: 52, justifyContent: 'center', alignItems: 'center', top: 5, bottom: 0, flexDirection: 'row' }
};

class myHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: true,
      nonfeaturedArr: [],
      featuredarr: [],
      modalVisible: false,
      search: '',
      onSearch: true,
      quizes: [],
      progress: false,
      progressArray: [],
      quizPlayedLength: 0,
      onlineUserQuizPlayedLength: 0,
      gotScores: 0,
      badgeText: undefined
    };

    // this.props.alldata();
    this.updateHomePage = this.updateHomePage.bind(this);
  }

  openModal() {
    this.setState({ modalVisible: true });
  }

  closeModal() {
    this.setState({ modalVisible: false, onSearch: true });
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextState.activity === true, nextState.featuredarr.length !== this.state.featuredarr.length, nextState.nonfeaturedArr.length !== this.state.nonfeaturedArr.length, nextState.progress !== this.state.progress, this.state.gotScores !== nextState.gotScores, this.state.badgeText !== nextState.badgeText, '**********///////')
    // && (nextState.onSearch !== this.state.onSearch || nextState.quizes !== this.state.quizes || nextState.modalVisible !== this.state.modalVisible || nextState.activity === true || nextState.featuredarr.length !== this.state.featuredarr.length || nextState.nonfeaturedArr.length !== this.state.nonfeaturedArr.length || nextState.progress !== this.state.progress || this.state.gotScores !== nextState.gotScores || this.state.badgeText !== nextState.badgeText)) {
    if (Actions.currentScene === 'myhome'&& (nextState.onSearch !== this.state.onSearch || nextState.quizes !== this.state.quizes || nextState.modalVisible !== this.state.modalVisible || nextState.activity === true || nextState.featuredarr.length !== this.state.featuredarr.length || nextState.nonfeaturedArr.length !== this.state.nonfeaturedArr.length || nextState.progress !== this.state.progress || this.state.gotScores !== nextState.gotScores || this.state.badgeText !== nextState.badgeText)) {
      console.log('update done true');
      return true;
    }
    else {
      console.log('update done false');

      return false;
    }
  }
  componentDidMount() {
    this.updateHomePage();
  }

  updateHomePage(fectchData) {

    console.log(this.props.allData, 'userDatasuserDatasuserDatas', this.props.allData.allData.length < 1 && this.props.isNetAvailable === true, this.props.allData.allData.length, this.props.isNetAvailable)
    if (this.props.allData.allData.length < 1 && (this.props.isNetAvailable === true || fectchData === 'fectchData')) {
      console.log('inside if statement')
      this.props.fectchDataFromFirebase(this.props.auth);
    }
    else {
      console.log('inside else statement')

      // this.setState({
      //   activity: false
      // })
      this.nonFeaturedCard(this.props.allData.allData)

    }
    if (this.props.allData.currentUser !== {} && firebase.auth().currentUser && firebase.auth().currentUser !== null && firebase.auth().currentUser.uid && firebase.auth().currentUser.uid !== null) {
      if (this.props.isNetAvailable === true) {

        firebase.database().ref(`/user/${firebase.auth().currentUser.uid}`).once('value', (snap) => {
          let userData = snap.val();
          if (userData && 'gotScores' in userData) {
            let gotScoreData = userData.gotScores;
            let badgeText;
            if (gotScoreData === undefined || gotScoreData < 2000) {
              badgeText = 'LEARNER 01'
            }
            else if (gotScoreData >= 2000 && gotScoreData < 3000) {
              badgeText = 'LEARNER 02'
            }
            else if (gotScoreData >= 3000 && gotScoreData < 4000) {
              badgeText = 'LEARNER 03'
            }
            else if (gotScoreData >= 4000 && gotScoreData < 5000) {
              badgeText = 'LEARNER 04'
            }
            else if (gotScoreData >= 5000 && gotScoreData < 6000) {
              badgeText = 'LEARNER 05'
            }
            else if (gotScoreData >= 6000 && gotScoreData < 7000) {
              badgeText = 'LEARNER 06'
            }
            else if (gotScoreData >= 7000 && gotScoreData < 8000) {
              badgeText = 'LEARNER 07'
            }
            else if (gotScoreData >= 8000 && gotScoreData < 9000) {
              badgeText = 'LEARNER 08'
            }
            else if (gotScoreData >= 9000 && gotScoreData < 10000) {
              badgeText = 'LEARNER 09'
            }
            else if (gotScoreData >= 10000 && gotScoreData < 15000) {
              badgeText = 'LEARNER 10'
            }


            else if (gotScoreData >= 15000 && gotScoreData < 20000) {
              badgeText = 'EXPERT 01'
            }
            else if (gotScoreData >= 20000 && gotScoreData < 30000) {
              badgeText = 'EXPERT 02'
            }
            else if (gotScoreData >= 30000 && gotScoreData < 40000) {
              badgeText = 'EXPERT 03'
            }
            else if (gotScoreData >= 40000 && gotScoreData < 50000) {
              badgeText = 'EXPERT 04'
            }
            else if (gotScoreData >= 50000 && gotScoreData < 60000) {
              badgeText = 'EXPERT 05'
            }
            else if (gotScoreData >= 60000 && gotScoreData < 70000) {
              badgeText = 'EXPERT 06'
            }
            else if (gotScoreData >= 70000 && gotScoreData < 80000) {
              badgeText = 'EXPERT 07'
            }
            else if (gotScoreData >= 80000 && gotScoreData < 90000) {
              badgeText = 'EXPERT 08'
            }
            else if (gotScoreData >= 90000 && gotScoreData < 100000) {
              badgeText = 'EXPERT 09'
            }
            else if (gotScoreData >= 100000 && gotScoreData < 150000) {
              badgeText = 'EXPERT 10'
            }

            else if (gotScoreData >= 150000 && gotScoreData < 200000) {
              badgeText = 'MASTER 01'
            }
            else if (gotScoreData >= 200000 && gotScoreData < 300000) {
              badgeText = 'MASTER 02'
            }
            else if (gotScoreData >= 300000 && gotScoreData < 400000) {
              badgeText = 'MASTER 03'
            }
            else if (gotScoreData >= 400000 && gotScoreData < 500000) {
              badgeText = 'MASTER 04'
            }
            else if (gotScoreData >= 500000 && gotScoreData < 600000) {
              badgeText = 'MASTER 05'
            }
            else if (gotScoreData >= 600000 && gotScoreData < 700000) {
              badgeText = 'MASTER 06'
            }
            else if (gotScoreData >= 700000 && gotScoreData < 800000) {
              badgeText = 'MASTER 07'
            }
            else if (gotScoreData >= 800000 && gotScoreData < 900000) {
              badgeText = 'MASTER 08'
            }
            else if (gotScoreData >= 900000 && gotScoreData < 1000000) {
              badgeText = 'MASTER 09'
            }
            else if (gotScoreData >= 100000) {
              badgeText = 'MASTER 10'
            }

            this.setState({
              gotScores: userData.gotScores,
              badgeText: badgeText
            })
          }
          else {
            badgeText = 'LEARNER 01';
            this.setState({
              gotScores: 0,
              badgeText: badgeText
            })
          }
          if (userData && 'quizPlayed' in userData) {
            this.setState({
              onlineUserQuizPlayedLength: userData.quizPlayed.length
            })
          }// console.log(snap.val().quizPlayed.length)
        })
      }
      else {
        Toast.show('Please check internet connection.');

      }
    }
    this.checkQuizPlayed();
    let inProgressArr = [];
    if (firebase.auth().currentUser && firebase.auth().currentUser.uid && this.props.isNetAvailable === true) {
      let currentUser = firebase.auth().currentUser.uid;
      let that = this;
      firebase.database().ref('inprogress/' + currentUser + '/').once('value', (snap) => {
        // console.log(snap.val(), 'row data');
        let inProgressData = snap.val();
        for (var key in inProgressData) {
          inProgressArr.push(inProgressData[key])
        }
        // console.log(inProgressArr, 'inProgressArrinProgressArrinProgressArr', this);
        if (inProgressArr.length && inProgressArr.length > 0) {
          this.setState({
            progressArray: inProgressArr,
            progress: true
          })
        }
        else {
          this.setState({
            progress: false
          })
        }
      })
    }

    // AsyncStorage.getItem('@LocalUser:inprogressData', (err, progressData) => {
    //   var details = JSON.parse(progressData);
    //   console.log(details,'detailsdetailsdetailsdetails');
    //   // console.log() 
    //   if (details === null) {
    //     // alert('PatientList is empty please go back')
    //   }
    //   else {
    //     if (details.length !== 0) {
    //       this.setState({
    //         progress: true,
    //         progressArray: details
    //       })
    //     }
    //   }
    // })

  }
  componentWillUpdate(nextProps, nextState) {
    console.log('this.props.isNetAvailable, nextProps.isNetAvailable, *******')
    if (this.props.isNetAvailable !== true && nextProps.isNetAvailable === true) {
      this.updateHomePage('fectchData');
    }
  }

  checkQuizPlayed() {
    // AsyncStorage.getItem('@LocalUser:questionsPlayed', (err, snap) => {
    //   var arr = JSON.parse(snap);
    //   if (arr !== null) {
    //     // console.log()
    //     this.setState({
    //       quizPlayedLength: arr.length
    //     })
    //   }
    // })
  }

  componentWillReceiveProps(props) {
    const { loading, allData } = props.allData;
    console.log('this.props.isNetAvailable, nextProps.isNetAvailable, /////////')
    // if (props.allData.loading !== this.state.activity) {
    //   console.log('inside will receive  function if')

    //   this.setState({ activity: loading })
    // }
    this.nonFeaturedCard(allData, loading)
  }

  nonFeaturedCard(cardArr, loading) {
    // const { loading, allData } = props.allData;
    console.log(loading, 'loading')
    let arr = [];
    let featuredarrClone = [];
    for (var i = 0; i < cardArr.length; i++) {
      if (cardArr[i].name.feature === false) {
        arr.push(cardArr[i]);
      }
      else {
        featuredarrClone.push(cardArr[i]);
      }
    }
    if (arr.length !== this.state.nonfeaturedArr.length || cardArr.length !== this.state.featuredarr.length) {
      console.log('inside nonfeatuer function if')
      this.setState({
        nonfeaturedArr: arr,
        featuredarr: featuredarrClone,
        activity: false
      })
    }
    else {
      if (loading && loading !== undefined && loading !== this.state.activity) {
        console.log('inside will receive  function if')

        this.setState({ activity: loading })
      }
    }
  }
  componentDidUpdate() {
    console.log('did update')
  }
  ProfileAction() {
    if (this.props.auth === true) {
      Actions.profile();
    } else {
      Actions.login();
    }
  }
  // componentShouldUpdate() {
  //   if (Actions.currentScene === 'myhome') {
  //     return true
  //   }
  //   else {
  //     return false
  //   }
  //   return true
  // }
  Circle(circle, ev) {
    if (circle) {
      Actions.profile({ circleClick: true });
    } else {
      Actions.profile();
    }
  }
  _onRefresh() {
    console.log('onrefresh called');
    this.props.fectchDataFromFirebase(this.props.auth);

  }

  searchData() {
    this.setState({ onSearch: false })
    let searchKeyword = this.state.search.toLowerCase();
    const { allData } = this.props.allData;
    var filteredQuiz = [];
    for (var key in allData) {
      if (allData[key].name.titles.toLowerCase().search(searchKeyword) !== -1) {
        filteredQuiz.push(allData[key]);
      } else if (allData[key].name.description.toLowerCase().search(searchKeyword) !== -1) {
        filteredQuiz.push(allData[key]);
      } else if (allData[key].name.type.toLowerCase().search(searchKeyword) !== -1) {
        filteredQuiz.push(allData[key]);
      }
    }
    this.setState({ quizes: filteredQuiz })
  }

  render() {
    console.log(this.state.featuredarr, 'featuredarr ****** /////')
    return (
      <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <MyStatusBar backgroundColor="#07b3fd" barStyle="light-content" />
        <View style={[styles.header, { position: 'relative', top: 0 }]}>
          <View style={{ flex: 1 }} >
            <Image style={styles.logo} source={require("../images/mage_splash_logo.png")} />
          </View>
          {(this.props.auth === true && this.state.badgeText !== undefined) ?
            (
              <View style={{ flex: 1, flexDirection: 'row', paddingLeft: Platform.OS === 'ios' ? 15 : 0 }} >


                {
                  (this.state.badgeText !== undefined && this.state.gotScores < 14999 || this.state.gotScores === undefined) ? (
                    <TouchableOpacity style={{ justifyContent: "center" }}>
                      {/* <Image style={styles.masterBack} source={require("../images/great_try_BG.png")} />
                      <Image style={styles.masterIcon} source={require("../images/master_icon.png")} /> */}
                      {/* <Image style={styles.learnerIcon} source={require("../images/Learner.png")} /> */}
                      <Image style={styles.learnerIcon} source={require("../images/Learnetemple.png")} />
                      <Text style={{ color: '#332a08', fontWeight: 'bold', fontSize: 10, position: "absolute", marginLeft: 30, backgroundColor: 'transparent' }} >{this.state.badgeText}</Text>

                      {/* <Text style={{ fontWeight: "bold", fontSize: 12, position: "absolute", marginLeft: 35, backgroundColor: 'transparent' }} >MASTER</Text> */}
                    </TouchableOpacity>
                  ) : null
                }
                {
                  (this.state.gotScores >= 15000 && this.state.gotScores < 149999 && this.state.badgeText !== undefined) ? (
                    <TouchableOpacity style={{ justifyContent: "center" }}>
                      {/* <Image style={styles.masterBack} source={require("../images/great_try_BG.png")} />
                      <Image style={styles.masterIcon} source={require("../images/master_icon.png")} /> */}
                      {/* <Image style={styles.learnerIcon} source={require("../images/Expert.png")} /> */}
                      <Image style={styles.learnerIcon} source={require("../images/Experttempl.png")} />
                      <Text style={{ color: '#332a08', fontWeight: 'bold', fontSize: 10, position: "absolute", marginLeft: 30, backgroundColor: 'transparent' }} >{this.state.badgeText}</Text>

                      {/* <Text style={{ fontWeight: "bold", fontSize: 12, position: "absolute", marginLeft: 35, backgroundColor: 'transparent' }} >MASTER</Text> */}
                    </TouchableOpacity>
                  ) : null
                }

                {
                  (this.state.gotScores >= 150000 && this.state.badgeText !== undefined) ? (
                    <TouchableOpacity style={{ justifyContent: "center" }}>
                      <Image style={styles.masterBack} source={require("../images/great_try_BG.png")} />
                      <Image style={styles.masterIcon} source={require("../images/master_icon.png")} />
                      {/* <Image style={styles.learnerIcon} source={require("../images/Expert.png")} /> */}
                      <Text style={{ color: '#332a08', fontWeight: 'bold', fontSize: 10, position: "absolute", marginLeft: 30, backgroundColor: 'transparent' }} >{this.state.badgeText}</Text>
                    </TouchableOpacity>
                  ) : null
                }

                {
                  (this.state.badgeText !== undefined && this.state.gotScores === undefined) ? (
                    <TouchableOpacity style={{ justifyContent: "center" }}>
                      <Image style={styles.gameBack} source={require("../images/btn_blue.png")} />
                      <Image style={styles.gameIcon} source={require("../images/game_control_icon.png")} />
                      <Text style={{ fontWeight: "bold", fontSize: 12, position: "absolute", right: 0, marginRight: 18, color: "white", backgroundColor: 'transparent' }} >
                        0
                        </Text>
                    </TouchableOpacity>
                  ) : null
                }
                {
                  ((this.state.gotScores !== undefined && this.state.gotScores.toString()).length === 1) ?
                    (
                      <TouchableOpacity style={{ justifyContent: "center" }}>
                        <Image style={styles.gameBack} source={require("../images/btn_blue.png")} />
                        <Image style={styles.gameIcon} source={require("../images/game_control_icon.png")} />
                        <Text style={{ fontWeight: "bold", fontSize: 11, position: "absolute", right: 0, marginRight: 18, color: "white", backgroundColor: 'transparent' }} >
                          {this.state.gotScores}
                        </Text>
                      </TouchableOpacity>
                    ) : null

                }
                {
                  ((this.state.gotScores !== undefined && this.state.gotScores.toString()).length === 2) ?
                    (
                      <TouchableOpacity style={{ justifyContent: "center" }}>
                        <Image style={styles.gameBack} source={require("../images/btn_blue.png")} />
                        <Image style={styles.gameIcon} source={require("../images/game_control_icon.png")} />
                        <Text style={{ fontWeight: "bold", fontSize: 11, position: "absolute", right: 0, marginRight: 16, color: "white", backgroundColor: 'transparent' }} >
                          {this.state.gotScores}
                        </Text>
                      </TouchableOpacity>
                    ) :
                    null
                }
                {
                  ((this.state.gotScores !== undefined && this.state.gotScores.toString()).length === 3) ?
                    (
                      <TouchableOpacity style={{ justifyContent: "center" }}>
                        <Image style={styles.gameBack} source={require("../images/btn_blue.png")} />
                        <Image style={styles.gameIcon} source={require("../images/game_control_icon.png")} />
                        <Text style={{ fontWeight: "bold", fontSize: 11, position: "absolute", right: 0, marginRight: 9, color: "white", backgroundColor: 'transparent' }} >
                          {this.state.gotScores}
                        </Text>
                      </TouchableOpacity>
                    ) :
                    null
                }


                {
                  ((this.state.gotScores !== undefined && this.state.gotScores.toString()).length > 3 && this.state.gotScores.toString().length < 6) ?
                    (
                      <TouchableOpacity style={{ justifyContent: "center" }}>
                        <Image style={styles.gameBack} source={require("../images/btn_blue.png")} />
                        <Image style={{ position: "absolute", width: 15, height: Platform.OS === 'ios' ? 12 : 11, marginLeft: 20 }} source={require("../images/game_control_icon.png")} />
                        <Text style={{ fontWeight: "bold", fontSize: 11, position: "absolute", right: 0, marginRight: 9, color: "white", backgroundColor: 'transparent' }} >
                          {(this.state.gotScores / 1000).toFixed(1).toString().slice(0, 3) + 'K'}
                        </Text>
                      </TouchableOpacity>
                    ) :
                    null
                }
                {
                  ((this.state.gotScores !== undefined && this.state.gotScores.toString()).length > 5) ?
                    (
                      <TouchableOpacity style={{ justifyContent: "center" }}>
                        <Image style={styles.gameBack} source={require("../images/btn_blue.png")} />
                        <Image style={{ position: "absolute", width: 15, height: Platform.OS === 'ios' ? 12 : 11, marginLeft: 20 }} source={require("../images/game_control_icon.png")} />
                        <Text style={{ fontWeight: "bold", fontSize: 9, position: "absolute", right: 0, marginRight: 5, color: "white", backgroundColor: 'transparent' }} >
                          {(this.state.gotScores / 1000).toFixed(1).toString().slice(0, 4) + 'K'}
                        </Text>
                      </TouchableOpacity>
                    ) :
                    null
                }



              </View>
            ) :
            null

          }
        </View>

        <View style={{ flex: 1 }} >
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.activity}
                onRefresh={this._onRefresh.bind(this)}
              />
            }
          >
            {this.state.activity && (this.state.featuredData !== [] || this.state.featuredData !== "undefined") ? (
              (this.props.isNetAvailable === true) ? (null) :
                null
            ) : (
                <View>
                  <ScrolCards data={this.state.featuredarr} />
                  {
                    this.state.progress && this.props.auth === true ?
                      <View style={{ marginTop: 15 }} >
                        <PROGRESS name="IN PROGRESS" />
                        <ProgressClimate data={this.state.progressArray} />
                      </View>
                      : null
                  }
                  <View style={{ marginTop: 15 }} >
                    <PROGRESS name="POPULAR SETS" />
                    <RollerCards closeModal={() => this.setState({ modalVisible: false })} data={this.state.nonfeaturedArr} />
                  </View>
                </View>
              )}

            {(this.props.isNetAvailable === false && this.props.allData.allData.length < 1) ? (<Text style={{ textAlign: 'center' }}>Please check internet connection.</Text>) : null}
          </ScrollView>
          <View style={styles.Footer}>
            <TouchableOpacity style={{ flex: 0.5, marginLeft: '5%' }} onPress={this.ProfileAction.bind(this)}>
              <View style={styles.profile}>
                <Image style={{ backgroundColor: 'transparent', height: 20, width: 15 }} source={require('../images/user-icon1.png')} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 0.5 }} onPress={this.Circle.bind(this, 'circle')}>
              <View style={styles.circle}>
                <Image style={{ backgroundColor: 'transparent', height: 25, width: 20 }} source={require('../images/circle_coloured.png')} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Actions.pin()} style={{ flex: 1.1 }} >
              <View style={styles.pin}>
                <Image style={{ height: 19, width: 12.5 }} source={require('../images/pinios.png')} />
                <Text style={{ fontSize: 14, color: '#b3b3b3', marginLeft: 12 }}>Enter Pin</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 0.6 }} onPress={this.openModal.bind(this)}>
              <View style={styles.searchBox}>
                <Image style={{ backgroundColor: 'transparent', height: 20, width: 20 }} source={require('../images/search_iconx.png')} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Modal transparent={true} visible={this.state.modalVisible} animationType={'fade'} onRequestClose={() => this.closeModal()} >
          <TouchableOpacity onPress={this.closeModal.bind(this)} style={{ flex: 1, backgroundColor: 'rgba(0,0,0,.5)' }} />
          <View style={{ position: 'absolute', backgroundColor: this.state.onSearch ? 'transparent' : 'white', height: this.state.onSearch ? 50 : '100%', width: '100%', bottom: this.state.onSearch ? Platform.OS === 'ios' ? '38%' : 0 : null }} >
            <Item style={{ backgroundColor: 'white', paddingLeft: 10 }} >
              <TouchableOpacity onPress={() => this.closeModal()} >
                <Icon name='ios-arrow-back' />
              </TouchableOpacity>
              <Input keyboardType={'web-search'} onSubmitEditing={this.searchData.bind(this)} onChangeText={(search) => this.setState({ search })} placeholder='Search' autoFocus />
            </Item>
            <Content>
              <RollerCards closeModal={() => this.setState({ modalVisible: false })} data={this.state.quizes} />
            </Content>
          </View>
        </Modal>

      </View>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return {
    auth: state.AuthReducer.isLoggedIn,
    allData: state.loadEveryThing,
    userDatas: state.userdata,
    currentUser: state.loadEveryThing,
    // user: state.loadEveryThing.user,
    user: state.AuthReducer.user,
    isNetAvailable: state.AuthReducer.connectionStatus


  };
};
const mapDispatchToProps = (dispatch) => {
  return {

    alldata: (authStatus) => {
      dispatch(alldata(authStatus));
    },
    addname: (data) => {
      dispatch(addname(data))
    },
    getdata: (staleData) => {
      dispatch(getdata(staleData));
    },
    fectchDataFromFirebase: (staleData) => {
      dispatch(fectchDataFromFirebase(staleData));
    }

  };
}
export default connect(mapStateToProps, mapDispatchToProps)(myHome);
