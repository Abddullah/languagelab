import ActionTypes from "./ActionTypes";
import firebase from "firebase";
import { Actions } from "react-native-router-flux";
import Sound from 'react-native-sound';
import userdata from "../Reducers/userdata";
import { AsyncStorage } from 'react-native';

let flagAllData = true;
export function alldata(authStatus) {
  return dispatch => {
    console.log(Actions.currentScene, '9********', Actions.prevScene)
    if (Actions.currentScene !== 'splesh' || flagAllData === true) {
      console.log('inside if alldata')
      flagAllData = false;
      let dataNotFound = true;
      dispatch(fectchDataFromFirebase(authStatus))
      // AsyncStorage.getItem('staleDataOfQuizzes')
      //   .then((staleData) => {
      //     // console.log(staleData, 'staledataaaaaa')
      //     if (JSON.parse(staleData) !== null) {
      //       // this.props.getdata(JSON.parse(staleData))
      //       console.log(Actions.currentScene, '55555555')


      //       if (Actions.currentScene === 'myhome' || Actions.currentScene === 'splesh') {
      //         // dispatch(getdata(JSON.parse(staleData)));
      //         dispatch(fectchDataFromFirebase(authStatus))

      //       }

      //       dataNotFound = false;
      //     }
      //     else {
      //       dispatch(fectchDataFromFirebase(authStatus))
      //     }
      //   })
    }
    dispatch(initializeMusicAndSound());



  }
}
let flagFetchData = true;

export function fectchDataFromFirebase(authStatus) {
  return dispatch => {
    console.log('fetched data called');
    // dispatch(getdata([]));
    if (flagFetchData === true) {
      console.log('inside fetch if')
      flagFetchData = false;
      function randomNumberGenerator(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
      }
      const range = []


      // if (authStatus !== true) {
      let arr = []
      firebase.database().ref().child("test").once("value", snapshot => {
        let data = [];
        snapshot.forEach(childSnapshot => {
          data.push(childSnapshot.val());
        });
        // console.log("data", data);
        let newdata = [];
        firebase.database().ref("/questions/").once("value", snapshot => {
          Object.keys(snapshot.val()).forEach(function (key) {
            let obj = {
              key,
              qs: snapshot.val()[key]
            }
            return newdata.push(obj)
          })
          console.log(newdata, 'newdata')
          const maindata = []
          var arr1 = []
          newdata.filter(e => {
            // console.log('e'+ JSON.stringify(e.key))
            data.map((v, i) => {
              // console.log(v.titles.toLowerCase() == e.key)
              if (v.titles !== undefined && v.titles.toLowerCase() == e.key) {
                // console.log(v)
                let qdata = {
                  mainDataPart: v,
                  qs: e.qs
                }
                return maindata.push(qdata)
              }
            })
          });
          console.log(maindata, 'maindata')
          maindata.map((v, i) => {
            // console.log(v)
            let arr1 = []
            for (var key in v.qs) {
              //  console.log(v.qs[key])
              arr1.push(v.qs[key])
            }
            // console.log(arr1)
            return arr.push({
              name: v.mainDataPart,
              questions: arr1
            })
          })



          for (var j = 0; j < arr.length; j++) {
            var questionsArr = arr[j].questions;
            for (var k = 0; k < questionsArr.length; k++) {
              questionNumber = questionsArr[k];
              // console.log(questionNumber, 'questionNumber', range);
              let questionObject = {
                imgUrl: questionNumber.imgUrl,
                questions: questionNumber.questions,
                time: questionNumber.time,
                titles: questionNumber.titles
              }
              for (var i = 0; i < range.length; i++) {
                if (range[i] === 0) {
                  if (i === 0) {
                    questionNumber.answer1.optionName = 'a';
                    if ('a' in questionNumber.answer1 === false) {
                      questionNumber.answer1.a = false;
                    }
                    questionObject.answer1 = questionNumber.answer1;
                  }
                  else if (i === 1) {
                    questionNumber.answer2.optionName = 'a';
                    if ('b' in questionNumber.answer2 === false) {
                      questionNumber.answer2.b = false;
                    }
                    questionObject.answer1 = questionNumber.answer2;
                  }
                  else if (i === 2) {
                    questionNumber.answer3.optionName = 'a';
                    if ('c' in questionNumber.answer3 === false) {
                      questionNumber.answer3.c = false;
                    }
                    questionObject.answer1 = questionNumber.answer3;
                  }
                  else if (i === 3) {
                    questionNumber.answer4.optionName = 'a';
                    if ('d' in questionNumber.answer4 === false) {
                      questionNumber.answer4.d = false;
                    }
                    questionObject.answer1 = questionNumber.answer4;
                  }
                }
                else if (range[i] === 1) {
                  if (i === 0) {
                    questionNumber.answer1.optionName = 'b';
                    if ('a' in questionNumber.answer1 === false) {
                      questionNumber.answer1.a = false;
                    }
                    questionObject.answer2 = questionNumber.answer1;
                  }
                  else if (i === 1) {
                    questionNumber.answer2.optionName = 'b';
                    if ('b' in questionNumber.answer2 === false) {
                      questionNumber.answer2.b = false;
                    }
                    questionObject.answer2 = questionNumber.answer2;
                  }
                  else if (i === 2) {
                    questionNumber.answer3.optionName = 'b';
                    if ('c' in questionNumber.answer3 === false) {
                      questionNumber.answer3.c = false;
                    }
                    questionObject.answer2 = questionNumber.answer3;
                  }
                  else if (i === 3) {
                    questionNumber.answer4.optionName = 'b';
                    if ('d' in questionNumber.answer4 === false) {
                      questionNumber.answer4.d = false;
                    }
                    questionObject.answer2 = questionNumber.answer4;
                  }
                }
                else if (range[i] === 2) {
                  if (i === 0) {
                    questionNumber.answer1.optionName = 'c';
                    if ('a' in questionNumber.answer1 === false) {
                      questionNumber.answer1.a = false;
                    }
                    questionObject.answer3 = questionNumber.answer1;
                  }
                  else if (i === 1) {
                    questionNumber.answer2.optionName = 'c';
                    if ('b' in questionNumber.answer2 === false) {
                      questionNumber.answer2.b = false;
                    }
                    questionObject.answer3 = questionNumber.answer2;
                  }
                  else if (i === 2) {
                    questionNumber.answer3.optionName = 'c';
                    if ('c' in questionNumber.answer3 === false) {
                      questionNumber.answer3.c = false;
                    }
                    questionObject.answer3 = questionNumber.answer3;
                  }
                  else if (i === 3) {
                    questionNumber.answer4.optionName = 'c';
                    if ('d' in questionNumber.answer4 === false) {
                      questionNumber.answer4.d = false;
                    }
                    questionObject.answer3 = questionNumber.answer4;
                  }
                }
                else if (range[i] === 3) {
                  if (i === 0) {
                    questionNumber.answer1.optionName = 'd';
                    if ('a' in questionNumber.answer1 === false) {
                      questionNumber.answer1.a = false;
                    }
                    questionObject.answer4 = questionNumber.answer1;
                  }
                  else if (i === 1) {
                    questionNumber.answer2.optionName = 'd';
                    if ('b' in questionNumber.answer2 === false) {
                      questionNumber.answer2.b = false;
                    }
                    questionObject.answer4 = questionNumber.answer2;
                  }
                  else if (i === 2) {
                    questionNumber.answer3.optionName = 'd';
                    if ('c' in questionNumber.answer3 === false) {
                      questionNumber.answer3.c = false;
                    }
                    questionObject.answer4 = questionNumber.answer3;
                  }
                  else if (i === 3) {
                    questionNumber.answer4.optionName = 'd';
                    if ('d' in questionNumber.answer4 === false) {
                      questionNumber.answer4.d = false;
                    }
                    questionObject.answer4 = questionNumber.answer4;
                  }
                }
              }

              arr[j].questions[k] = questionObject;
              if ('correctSequence' in questionNumber) {
                arr[j].questions[k].correctSequence = questionNumber.correctSequence
              }

              // console.log(questionNumber, 'questionNumber updated', questionObject);
            }

          }
          console.log(arr, 'arrrrrrrr')
          // if (authStatus === true) {
          firebase.database().ref('/favorite/').once('value', (favouriteCoreData) => {
            console.log(arr, 'maindataarrarrarrarrarr', favouriteCoreData.val());
            let favouriteData = favouriteCoreData.val();
            if (favouriteData !== null) {

              for (var i = 0; i < arr.length; i++) {
                console.log(arr[i], '*****////')
                let quizName = arr[i].name.titles;
                // checkNew = quizName.replace('"', '')
                // console.log(favouriteData[quizName], 'favouriteData[quizName]', quizName, favouriteData)
                for (var key in favouriteData) {
                  if (key.toLocaleLowerCase() === quizName.toLocaleLowerCase()) {
                    arr[i].favouriteData = favouriteData[key]
                  }
                }
              }
            }
            console.log(arr, 'quizNamequizNamequizName', Actions.currentScene)
            if (Actions.currentScene === 'myhome') {
              dispatch(getdata(arr));
            }
            flagFetchData = true
            AsyncStorage.setItem('staleDataOfQuizzes', JSON.stringify(arr))
            dispatch(initializeMusicAndSound());
          })
        })
      });
      console.log('randome numbers')
      while (range.length < (3 - 0 + 1)) {
        var randomNumber = randomNumberGenerator(0, 3)

        if (range.indexOf(randomNumber) === -1) {
          range.push(randomNumber)
        }
      }
      console.log(range, 'range')
    }
  }
}



let flagBFMusicInit = false;
let flagCAMusicInit = false;
let flagWAMusicInit = false;


export function initializeMusicAndSound() {
  return dispatch => {
    if (flagBFMusicInit === true) {
      console.log('Excitement music is already initialize.');
    }
    else {
      Sound.setCategory('Playback');
      let excitementMusic = new Sound('bf.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        flagBFMusicInit = true;
        dispatch(excitementMusicAction(excitementMusic));

      });
    }
    if (flagCAMusicInit === true) {
      console.log('Correct music is already initialize.');
    }
    else {
      Sound.setCategory('Playback');
      let caMusic = new Sound('ca.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        flagCAMusicInit = true;
        dispatch(correctMusicAction(caMusic));

      });
    }
    if (flagWAMusicInit === true) {
      console.log('Correct music is already initialize.');
    }
    else {
      Sound.setCategory('Playback');
      let waMusic = new Sound('wa.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        flagWAMusicInit = true;
        dispatch(wrongMusicAction(waMusic));

      });
    }
  }
}
export function excitementMusicAction(payload) {
  return {
    type: ActionTypes.INITBFMUSIC,
    payload
  };
}
export function correctMusicAction(payload) {
  return {
    type: ActionTypes.INITCORRECTMUSIC,
    payload
  };
}
export function wrongMusicAction(payload) {
  return {
    type: ActionTypes.INITWRONGTMUSIC,
    payload
  };
}

export function getdata(payload) {
  return {
    type: ActionTypes.LOAD_EVERYTHING,
    payload
  };
}



export function bringAllUsers() {
  return dispatch => {
    let allUsers = [];
    // console.log('fadsfadsfadsf');
    firebase.database().ref('/user/').once('value', (allUsersCore) => {
      // console.log(allUsersCore.val(), '111111');
      let allUsersData = allUsersCore.val();
      for (var key in allUsersData) {
        allUsers.push(allUsersData[key]);
      }
      // console.log(allUsers, '9999999');
      dispatch(updateAllUsers(allUsers));
    })
  }
}


function updateAllUsers(payload) {
  return {
    type: ActionTypes.GETALLUSERS,
    payload
  };
}

export function getCircleMembers() {
  return dispatch => {
    let allUsers = [];
    let circleMembersArr = [];
    firebase.database().ref('/user/').once('value', (allUsersCore) => {
      let allUsersData = allUsersCore.val();
      if (firebase.auth().currentUser !== null) {

        let currentUser = firebase.auth().currentUser.uid;
        firebase.database().ref('/circleMembers/' + currentUser + '/').once('value', (circleMembersCore) => {
          let circleMembers = circleMembersCore.val();
          firebase.database().ref('/activeUsers/').once('value', (activeUsersCore) => {
            for (var key in circleMembers) {
              let activeUsers = activeUsersCore.val();
              if (activeUsers && circleMembers[key].circleMemberUid in activeUsers) {
                allUsersData[circleMembers[key].circleMemberUid].online = true;
              }
              circleMembersArr.push(allUsersData[circleMembers[key].circleMemberUid]);
            }
            dispatch(updateCircleMembers(circleMembersArr));
          })
        })
      }

    })
  }
}

function updateCircleMembers(payload) {
  return {
    type: ActionTypes.GETCIRCLEMEMBERS,
    payload
  };
}


export function recordTimeOfSubmission(timeofSubmission) {
  return dispatch => {
    console.log('timeofSubmission', timeofSubmission);
    dispatch({
      type: ActionTypes.RECORDTIME,
      payload: timeofSubmission
    });
  }
}
export function setNumberOfOpponent(numberOfOpponent) {
  return dispatch => {
    console.log('numberOfOpponent', numberOfOpponent);
    dispatch({
      type: ActionTypes.SETNUMBEROFOPPONENT,
      payload: numberOfOpponent
    });
  }
}



export function correctAnswerAction(payload) {
  return dispatch => {
    console.log('correct answer action dispatched', payload);
    dispatch({
      type: ActionTypes.CORRECTANSWERINCR,
      payload
    });
  }
}


export function wrongAnswerAction(payload) {
  return dispatch => {
    console.log('wrong answer action dispatched', payload);
    dispatch({
      type: ActionTypes.WRONGANSWERINCR,
      payload
    });
  }
}



export function saveResultToDb(resultObject) {
  return dispatch => {
    console.log(resultObject, 'resultObject in action')
    let currentUserUid = firebase.auth().currentUser.uid;
    console.log('path', 'result/' + resultObject.gameType + '/' + currentUserUid + '/')
    firebase.database().ref('result/' + resultObject.gameType + '/' + currentUserUid + '/').push(resultObject)
      .then((savedResult) => {
        firebase.database().ref(`/user/${currentUserUid}`).once('value', (snap) => {
          console.log(snap.val(), '5555555544444444')
          if ('totalCorrectAnswers' in snap.val()) {
            let correctAnswer = snap.val().totalCorrectAnswers + resultObject.totalCorrectAnswers;
            firebase.database().ref(`/user/${currentUserUid}`).update({ totalCorrectAnswers: correctAnswer })
          } else {
            let correctAnswer = resultObject.totalCorrectAnswers;
            let userData = snap.val();
            userData.totalCorrectAnswers = correctAnswer;
            firebase.database().ref(`/user/${currentUserUid}/`).set(userData)
          }
          console.log(resultObject)
          if (resultObject.opponentId) {

            var keyName = resultObject.opponentId;
            // if (keyname !== undefined || keyname !== null) {
            firebase.database().ref('user/' + currentUserUid + '/playedWith/').set({ [keyName]: keyName })
              .then(() => {
                console.log('saved ************')

              })
            // console.log(user, score, 'score');
            // }
          }


        })
        // console.log(keyName, 'keyNamekeyName', resultObject);
        // if (keyname !== undefined) {
        //   firebase.database().ref('user/' + currentUserUid + '/playedWith/').set({ [keyName]: keyName })
        //     .then(() => {
        //       console.log('saved ************')

        //     })
        //   console.log(user, score, 'score');
        // }
        // else {

        //   firebase.database().ref(`/user/${currentUserUid}/`).once('value', (snap) => {
        //     console.log(snap.val(), 'saved ************', resultObject)
        //     if ('totalCorrectAnswers' in snap.val()) {
        //       let correctAnswer = snap.val().totalCorrectAnswers + resultObject.totalCorrectAnswers;
        //       firebase.database().ref(`/user/${currentUserUid}/`).update({ totalCorrectAnswers: correctAnswer })
        //     } else {
        //       firebase.database().ref(`/user/${currentUserUid}/`).update({ totalCorrectAnswers: resultObject.totalCorrectAnswers })
        //     }
        //   })
        // }




        // console.log(savedResult,'savedResult in action');
        dispatch(reInitializeScore())
      })
    // if (resultObject.gameType.toLowerCase() === 'solo') {

    // }
  }
}

export function saveWonStatus() {
  return dispatch => {
    let user = firebase.auth().currentUser;
    if (user !== null) {

      firebase.database().ref(`/user/${user.uid}/`).once('value', (snap) => {
        if ('totalWon' in snap.val()) {
          let totalWon = snap.val().totalWon + 1;
          firebase.database().ref(`/user/${user.uid}`).update({ totalWon: totalWon })
        } else {
          console.log(snap.val(), 'line 705')
          let totalWon = 1;
          let userData = snap.val();
          console.log(userData, 'userData')

          userData.totalWon = 1
          console.log('708 line', userData)
          firebase.database().ref(`/user/${user.uid}/`).set(userData)
        }
      })
    }


    // console.log(savedResult,'savedResult in action');

  }
}

export function reInitializeScore() {
  return dispatch => {
    dispatch({
      type: ActionTypes.REINITIALIZESCORE

    });
  }
}


export function reInitializeQuizStatus() {
  return dispatch => {
    dispatch({
      type: ActionTypes.REINITIALIZEQUIZSTATUS

    });
  }
}


export function updateGameType(gameType) {
  return dispatch => {
    dispatch({
      type: ActionTypes.UPDATEGAMETYPE,
      payload: gameType
    });
  }
}

export function inProgressQuizStatus(data) {
  return dispatch => {
    console.log('data', data);
    dispatch({
      type: ActionTypes.INPROGRESSQUIZSTATUS,
      payload: data
    });
  }
}

