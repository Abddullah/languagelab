import * as firebase from 'firebase';

export function playsUpdateDb(quizData) {
    return dispatch => {
        firebase.database().ref(`/test/${quizData.titles.toLowerCase()}`).once('value', (snap) => {
            if (snap.val() !== null && 'playcount' in snap.val()) {
                let increase = snap.val().playcount + 1;
                firebase.database().ref('/').child(`test/${quizData.titles.toLowerCase()}`).update({ playcount: increase })
            } else {
                firebase.database().ref('/').child(`test/${quizData.titles.toLowerCase()}`).update({ playcount: 1 })
            }
        }
        )
    }
}

// Create by Salman
function playedQusetionsResult(user, quizData) {
    return dispatch => {
        firebase.database().ref('challengeResult/' + user.uid + '/' + quizData.name.titles + '/').once("value", (obj) => {
            let getResult = obj.val()
            if (getResult === null) {
                let played = {
                    attempt: 1,
                    score: 10
                }
                firebase.database().ref('challengeResult/' + user.uid + '/' + quizData.name.titles + '/').set(played)
            }
            else {
                let playedAgain = {
                    attempt: getResult.attempt += 1,
                    score: getResult.score += 10
                }
                firebase.database().ref('challengeResult/' + user.uid + '/' + quizData.name.titles + '/').set(playedAgain)
            }
        })
    }
}

// end Create by Salman

export function onlineUserQuestionsPlayed(user, quizData, type) {
    return dispatch => {
        // console.log("playedQusetionsResultplayedQusetionsResultplayedQusetionsResult")
        dispatch(playedQusetionsResult(user, quizData))
        firebase.database().ref(`/user/${user.uid}`).once('value', (snap) => {
            if ('quizPlayed' in snap.val()) {
                var quizArrayDb = snap.val().quizPlayed
                // console.log(quizArrayDb)
                var quizesArray = [];
                if (quizArrayDb !== null) {
                    var flagMatch = false;
                    quizArrayDb.map((v, i) => {
                        if (quizData.name.titles === v.name.titles) {
                            flagMatch = true
                            quizesArray.push(v)
                        } else {
                            quizesArray.push(v)
                        }
                    })
                    if (!flagMatch) {
                        quizesArray.push(quizData)
                    }
                }
                firebase.database().ref('/').child(`user/${user.uid}`).update({ quizPlayed: quizesArray })
            } else {
                // console.log(quizData)
                let quizArray = [];
                quizArray.push(quizData)
                firebase.database().ref('/').child(`user/${user.uid}`).update({ quizPlayed: quizArray })
            }
        }
        )
    }
}

export function onlineUserScore(user) {
    return dispatch => {
        console.log('this function is commented');
        // firebase.database().ref(`/user/${user.uid}`).once('value', (snap) => {
        //     if ('gotScores' in snap.val()) {
        //         let increase = snap.val().gotScores + 10;
        //         firebase.database().ref(`/user/${user.uid}`).update({ gotScores: increase })
        //     } else {
        //         firebase.database().ref(`/user/${user.uid}`).update({ gotScores: 10 })
        //     }
        // }
        // )
    }
}

export function onlineUserScoreUpdatOnViewScore(user, score) {
    return dispatch => {
        console.log(user, score, 'score');
        firebase.database().ref(`/user/${user.uid}`).once('value', (snap) => {
            if ('gotScores' in snap.val()) {
                let increase = snap.val().gotScores + score;
                firebase.database().ref(`/user/${user.uid}`).update({ gotScores: increase })
            } else {

                firebase.database().ref(`/user/${user.uid}/gotScores/`).set(score)
            }
        }
        )
    }
}


export function addQuestionsLengthDb(user, quizData) {
    return dispatch => {
        firebase.database().ref(`/user/${user.uid}`).once('value', (snap) => {
            if ('questionsAswered' in snap.val()) {
                var questionsAswered = snap.val().questionsAswered + quizData.questions.length;
                firebase.database().ref('/').child(`user/${user.uid}`).update({ questionsAswered })
            } else {
                var questionsAswered = quizData.questions.length;
                // console.log(questionsAswered)
                firebase.database().ref('/').child(`user/${user.uid}`).update({ questionsAswered })
            }
        }
        )
    }
}