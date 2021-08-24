import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, AsyncStorage } from 'react-native';
import { Content } from 'native-base';
import * as firebase from 'firebase';
import LinkPreview from 'react-native-link-preview';
import { Actions } from "react-native-router-flux";

export default class Result extends Component {
  constructor() {
    super();
    this.state = {
      quizPlayedLength: 0,
      onlineUserQuizPlayedLength: 0,
      quizesPlayed: [],
      correctAnswers: 0,
      questionsAswered: 0,
      imageArr: [],
      wonStatus: 0
    }
  }

  componentWillMount() {
    if (firebase.auth().currentUser !== null) {
      firebase.database().ref(`/user/${firebase.auth().currentUser.uid}`).once('value', (snap) => {
        console.log(snap.val(),'****88s88888888')
        if ('quizPlayed' in snap.val()) {
          snap.val().quizPlayed.map((v, i) => {
            let that = this;
            LinkPreview.getPreview(v.name.introVideos)
              .then(data => {
                image = data.images[0];
                let imageArrr = this.state.imageArr;
                imageArrr[i] = image
                console.log(data.images[0], 'sjdgjk', imageArrr)
                that.setState({
                  imageArr: imageArrr
                })
              });
          })
          let wonNumber = 0;
          let totalCorrectAnswersNumber = 0;
          if ('totalWon' in snap.val()) {
            console.log(snap.val().totalCorrectAnswers,'total incorrect answers')

            wonNumber = snap.val().totalWon
          }    
          if ('totalCorrectAnswers' in snap.val()) {
            console.log(snap.val().totalCorrectAnswers,'total correct answers')
            totalCorrectAnswersNumber = snap.val().totalCorrectAnswers
          }
          this.setState({
            onlineUserQuizPlayedLength: snap.val().quizPlayed.length,
            quizesPlayed: snap.val().quizPlayed,
            correctAnswers:totalCorrectAnswersNumber,
            questionsAswered: snap.val().questionsAswered,
            wonStatus: wonNumber
          })
        }
      })
    } else {
      this.checkQuizPlayed();
    }
  }

  checkQuizPlayed() {
    AsyncStorage.getItem('@LocalUser:questionsPlayed', (err, snap) => {
      var arr = JSON.parse(snap);
      if (arr !== null) {
        console.log(arr, 'arrarrarr');
        this.setState({
          quizPlayedLength: arr.length
        })
      }
    })
  }

  Detailed(data) {
    Actions.play({ data });
  }

  render() {
    console.log(this.state.imageArr[0], 'this.state.imageArr[0]')
    return (
      <Content style={{ backgroundColor: '#ffffff' }}>
        <View style={{ flex: 1 }} >
          <View>
            <View style={{ flexDirection: 'row', marginTop: '6%', marginBottom: '1%', marginHorizontal: '3%' }} >
              <View style={styles.caption} >
                <Text style={styles.captiontxt} >GAME STATS</Text>
              </View>
              <View style={styles.line} >
                <View style={{ width: '92%', backgroundColor: '#dfdee0', height: 1 }} ></View>
              </View>
            </View>
            <View>
              <View style={{ paddingHorizontal: '2%' }} >
                <View style={styles.card} >
                  <View style={{ flex: 1 }} >
                    <Text style={styles.cardtitle} >Games Played</Text>
                    <View style={styles.cardItem} >
                      <Image source={require('../images/game_stat_card.png')} />
                      <View style={styles.cardImagetxt}  >
                        <Text style={styles.cardtxt} >{firebase.auth().currentUser === null ? this.state.quizPlayedLength : this.state.onlineUserQuizPlayedLength}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={{ flex: 1 }} >
                    <Text style={styles.cardtitle} >Games Won</Text>
                    <View style={styles.cardItem} >
                      <Image source={require('../images/game_stat_card.png')} />
                      <View style={styles.cardImagetxt}  >
                        <Text style={styles.cardtxt} >{this.state.wonStatus}</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.card} >
                  <View style={{ flex: 1 }} >
                    <Text style={styles.cardtitle} >Questions Answered</Text>
                    <View style={styles.cardItem} >
                      <Image source={require('../images/game_stat_card.png')} />
                      <View style={styles.cardImagetxt}  >
                        <Text style={styles.cardtxt} >{this.state.questionsAswered}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={{ flex: 1 }} >
                    <Text style={styles.cardtitle} >Correct Answers</Text>
                    <View style={styles.cardItem} >
                      <Image source={require('../images/game_stat_card.png')} />
                      <View style={styles.cardImagetxt}  >
                        <Text style={styles.cardtxt} >{this.state.correctAnswers}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {(
            this.state.quizesPlayed.length && this.state.quizesPlayed.length > 0) ? (
              <View>
                <View style={{ flexDirection: 'row', marginTop: '6%', marginBottom: '1%', marginHorizontal: '5%' }} >
                  <View style={styles.caption} >
                    <Text style={styles.captiontxt} >G A M E {" "} H I S T O R Y</Text>
                  </View>
                  <View style={styles.line} >
                    <View style={{ width: '95%', backgroundColor: '#dfdee0', height: 1 }} ></View>
                  </View>
                </View>
                <View>



                  {
                    this.state.quizesPlayed.map((v, ind) => {
                      // console.log(this.state.quizesPlayed, 'this.state.quizesPlayed[ind+1].name.titles', this.state.quizesPlayed[ind + 1])
                      return (
                        (ind % 2 === 0) ? (

                          <View key={ind}>
                            {

                              (this.state.quizesPlayed[ind + 1] !== undefined && this.state.quizesPlayed[ind + 1].name && this.state.quizesPlayed[ind + 1].name.titles) ? (
                                <View style={{ paddingHorizontal: '2%' }} >
                                  <View style={styles.card} >
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                                      <TouchableOpacity onPress={() => this.Detailed(v)} style={{ height: 110, width: '90%' }} >
                                        <Image source={{ uri: this.state.imageArr[ind] }} style={{ height: 110, width: '90%' }} />
                                        <View style={{ position: 'absolute', width: '100%', height: '100%' }}  >
                                          <View style={{ marginLeft: '10%', marginTop: '10%', backgroundColor: 'transparent' }} >
                                            <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }} >{v.name.titles}</Text>
                                            {/* <Text style={{ color: 'white', fontSize: 12 }} >by Ericwee77</Text> */}
                                          </View>
                                        </View>
                                      </TouchableOpacity>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                                      <TouchableOpacity onPress={() => this.Detailed(this.state.quizesPlayed[ind + 1])} style={{ height: 110, width: '90%' }} >
                                        <Image source={{ uri: this.state.imageArr[ind + 1] }} style={{ height: 110, width: '90%' }} />
                                        <View style={{ position: 'absolute', width: '100%', height: '100%' }}  >
                                          <View style={{ marginLeft: '10%', marginTop: '10%', backgroundColor: 'transparent' }} >
                                            <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }} >{this.state.quizesPlayed[ind + 1].name.titles}</Text>
                                            {/* <Text style={{ color: 'white', fontSize: 12 }} >by Ericwee77</Text> */}
                                          </View>
                                        </View>
                                      </TouchableOpacity>
                                    </View>

                                  </View>
                                </View>
                              ) : (
                                  <View style={{ paddingHorizontal: '4%' }}>
                                    <View style={styles.card} >
                                      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }} >
                                        <TouchableOpacity onPress={() => this.Detailed(v)} style={{ height: 110, width: '90%' }} >
                                          <Image source={{ uri: this.state.imageArr[ind] }} style={{ height: 110, width: '47%' }} />
                                          <View style={{ position: 'absolute', width: '100%', height: '100%' }}  >
                                            <View style={{ marginLeft: '10%', marginTop: '10%', backgroundColor: 'transparent' }} >
                                              <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }} >{v.name.titles}</Text>
                                              {/* <Text style={{ color: 'white', fontSize: 12 }} >by Ericwee77</Text> */}
                                            </View>
                                          </View>
                                        </TouchableOpacity>
                                      </View>
                                    </View>
                                  </View>
                                )
                            }
                          </View>
                          // </View>
                        ) : null
                      )
                    })
                  }



                </View>



              </View>
            ) : null}

        </View>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  caption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  captiontxt: {
    fontSize: 10,
    color: '#014171',
    fontWeight: 'bold'
  },
  line: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    flexDirection: 'row',
    marginTop: '5%'
  },
  cardtitle: {
    color: '#30323e',
    fontWeight: '500',
    marginLeft: '6%'
  },
  cardItem: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%'
  },
  cardImagetxt: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardtxt: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
    backgroundColor: 'transparent'
  },

})