import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import { Icon, Card, CardItem, Container, Content, Header, Body, ListItem, List, Button, Right, Left, Title, Drawer, Fab, Footer, FooterTab, Spinner, Text } from 'native-base';
import { ActionConst, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import correct from '../correct';
import { wrongAnswerAction, correctAnswerAction } from '../../../Actions/alldata'

class Jumble extends Component {
    constructor() {
        super();
        this.state = {
            answer1: { value: '', place: 0, correct: false },
            answer2: { value: '', place: 1, correct: false },
            answer3: { value: '', place: 2, correct: false },
            answer4: { value: '', place: 3, correct: false },
            sequance: [],
            answerArray: [],
            selected: false,
            correct: false,
            wrong: false,
            timesUp: false,
            qsState: {}
        }

        // while (i < 5) {
        //     var aRandom = Math.ceil(Math.random()*4);
        //     console.log(aRandom, arr,arr.length, '5555555555')
        //     if(arr.indexOf(aRandom) === -1){
        //         console.log('inside iff')
        //         arr.push(aRandom)
        //         i++
        //     }
        // }
    }

    componentWillMount() {
        const { qs } = this.props;
        let time = +qs.time.replace('Sec', '')
        // console.log(qs)
        this.props.time(time)
        // let random = Math.floor(Math.random() * 4)
        console.log(qs, 'qsqsqsqsqsqs')
        this.setState({
            qsState: qs,
            answer1: { value: qs.answer1.value, place: 0, correct: false },
            answer2: { value: qs.answer2.value, place: 1, correct: false },
            answer3: { value: qs.answer3.value, place: 2, correct: false },
            answer4: { value: qs.answer4.value, place: 3, correct: false },
            sequance: this.props.qs.correctSequence,
        })


        // if (random == 0) {
        //     this.setState({ answer1: { value: qs.answer1, place: random, correct: false }, answer2: { value: qs.answer2, place: 1, correct: false }, answer3: { value: qs.answer3, place: 2, correct: false }, answer4: { value: qs.answer4, place: 3, correct: false } })
        // } else if (random == 1) {
        //     this.setState({ answer1: { value: qs.answer1, place: 3, correct: false }, answer2: { value: qs.answer2, place: random, correct: false }, answer3: { value: qs.answer3, place: 0, correct: false }, answer4: { value: qs.answer4, place: 2, correct: false } })
        // } else if (random == 2) {
        //     this.setState({ answer1: { value: qs.answer1, place: 3, correct: false }, answer2: { value: qs.answer2, place: 1, correct: false }, answer3: { value: qs.answer3, place: random, correct: false }, answer4: { value: qs.answer4, place: 0, correct: false } })
        // } else if (random == 3) {
        //     this.setState({ answer1: { value: qs.answer1, place: 2, correct: false }, answer2: { value: qs.answer2, place: 0, correct: false }, answer3: { value: qs.answer3, place: 1, correct: false }, answer4: { value: qs.answer4, place: random, correct: false } })
        // }
    }

    selectJumble(selectedAnswer) {
        const { answer1, answer2, answer3, answer4, answerArray } = this.state;


        answerArray.push(selectedAnswer.value)


        selectedAnswer.correct = true
        if (selectedAnswer.place === 0) { this.setState({ answer1: selectedAnswer }) }
        else if (selectedAnswer.place === 1) { this.setState({ answer2: selectedAnswer }) }
        else if (selectedAnswer.place === 2) { this.setState({ answer3: selectedAnswer }) }
        else if (selectedAnswer.place === 3) { this.setState({ answer4: selectedAnswer }) }
        else { console.log('nothing') }
        this.setState({
            answerArray
        })
        console.log(answerArray, 'answerArrayanswerArrayanswerArray', this.state.sequance);
        let sequance = this.state.sequance;
        if (answer1.correct && answer2.correct && answer3.correct && answer4.correct) {
            this.props.selected(true)
            let correct = true;
            for (var i = 0; i < sequance.length; i++) {
                if (sequance[i] !== answerArray[i]) {
                    correct = false;
                    break;
                }
            }
            this.props.qs.selectedOoption = answerArray;
            console.log(this.props.qs, '78678678692')
            if (correct === true) {
                this.props.qs.correctAnswer = true;
                this.props.correctAnswerAction(this.props.qs)
                setTimeout(() => { this.props.correct(true) }, 100);
            } else {
                this.props.wrongAnswerAction(this.props.qs)
                setTimeout(() => { this.props.wrong(true) }, 100);
            }
        }
    }


    firstbtn(p1) {
        const { answer1, answer2, answer3, answer4, answerArray } = this.state;
        answerArray.push(p1.value)
        p1.correct = true
        if (answer1.place === 0) { this.setState({ answer1: p1 }) }
        else if (answer2.place === 0) { this.setState({ answer2: p1 }) }
        else if (answer3.place === 0) { this.setState({ answer3: p1 }) }
        else if (answer4.place === 0) { this.setState({ answer4: p1 }) }
        else { console.log('nothing') }
        this.setState({
            answerArray
        })
        if (answer1.correct && answer2.correct && answer3.correct && answer4.correct) {
            this.props.selected(true)
            if (answer1.value === answerArray[0] && answer2.value === answerArray[1] && answer3.value === answerArray[2] && answer4.value === answerArray[3]) {
                setTimeout(() => { this.props.correct(true) }, 500);
            } else {
                setTimeout(() => { this.props.wrong(true) }, 500);
            }
        }
    }
    secondbtn(p2) {
        const { answer1, answer2, answer3, answer4, answerArray } = this.state;
        answerArray.push(p2.value)
        p2.correct = true
        if (answer1.place === 1) { this.setState({ answer1: p2 }) }
        else if (answer2.place === 1) { this.setState({ answer2: p2 }) }
        else if (answer3.place === 1) { this.setState({ answer3: p2 }) }
        else if (answer4.place === 1) { this.setState({ answer4: p2 }) }
        else { console.log('nothing') }
        this.setState({
            answerArray
        })
        if (answer1.correct && answer2.correct && answer3.correct && answer4.correct) {
            this.props.selected(true)
            if (answer1.value === answerArray[0] && answer2.value === answerArray[1] && answer3.value === answerArray[2] && answer4.value === answerArray[3]) {
                setTimeout(() => { this.props.correct(true) }, 500);
            } else {
                setTimeout(() => { this.props.wrong(true) }, 500);
            }
        }
    }
    thirdbtn(p3) {
        const { answer1, answer2, answer3, answer4, answerArray } = this.state;
        answerArray.push(p3.value)
        p3.correct = true
        if (answer1.place === 2) { this.setState({ answer1: p3 }) }
        else if (answer2.place === 2) { this.setState({ answer2: p3 }) }
        else if (answer3.place === 2) { this.setState({ answer3: p3 }) }
        else if (answer4.place === 2) { this.setState({ answer4: p3 }) }
        else { console.log('nothing') }
        this.setState({
            answerArray
        })
        if (answer1.correct && answer2.correct && answer3.correct && answer4.correct) {
            this.props.selected(true)
            if (answer1.value === answerArray[0] && answer2.value === answerArray[1] && answer3.value === answerArray[2] && answer4.value === answerArray[3]) {
                setTimeout(() => { this.props.correct(true) }, 500);
            } else {
                setTimeout(() => { this.props.wrong(true) }, 500);
            }
        }
    }
    forthbtn(p4) {
        const { answer1, answer2, answer3, answer4, answerArray } = this.state;
        answerArray.push(p4.value)
        p4.correct = true
        if (answer1.place === 3) { this.setState({ answer1: p4 }) }
        else if (answer2.place === 3) { this.setState({ answer2: p4 }) }
        else if (answer3.place === 3) { this.setState({ answer3: p4 }) }
        else if (answer4.place === 3) { this.setState({ answer4: p4 }) }
        else { console.log('nothing') }
        this.setState({
            answerArray
        })
        if (answer1.correct && answer2.correct && answer3.correct && answer4.correct) {
            this.props.selected(true)
            if (answer1.value === answerArray[0] && answer2.value === answerArray[1] && answer3.value === answerArray[2] && answer4.value === answerArray[3]) {
                setTimeout(() => { this.props.correct(true) }, 500);
            } else {
                setTimeout(() => { this.props.wrong(true) }, 500);
            }
        }
    }

    componentWillReceiveProps(props) {
        const { allstate } = props.parentData
        console.log('initiated', allstate, props)
        const { answer1, answer2, answer3, answer4, selected, correct, wrong, timesUp, } = this.state;
        if (allstate && props.quizData) {
            let currentQuestion = props.quizData[props.parentData.currentQuizIndex];
            console.log('ended', currentQuestion);
            answer1.correct = false;
            answer2.correct = false;
            answer3.correct = false;
            answer4.correct = false;
            answer1.value = currentQuestion.answer1.value;
            answer2.value = currentQuestion.answer2.value;
            answer3.value = currentQuestion.answer3.value;
            answer4.value = currentQuestion.answer4.value;
            // answerArray= [],
            // selected=false,
            // correct= false,
            // wrong= false,
            // timesUp=false,
            this.setState({
                answer1: { value: currentQuestion.answer1.value, place: 0, correct: false },
                answer2: { value: currentQuestion.answer2.value, place: 1, correct: false },
                answer3: { value: currentQuestion.answer3.value, place: 2, correct: false },
                answer4: { value: currentQuestion.answer4.value, place: 3, correct: false },
                sequance: props.qs.correctSequence,
                answerArray: [],
                selected: false,
                correct: false,
                wrong: false,
                timesUp: false,
            })
            props.changeStateCondition(false)
        }
    }

    render() {

        const { qs } = this.props;
        const { answer1, answer2, answer3, answer4, answerArray } = this.state;
        // let p1 = answer1.place === 0 ? answer1 : answer2.place === 0 ? answer2 : answer3.place === 0 ? answer3 : answer4.place === 0 ? answer4 : null;
        // let p2 = answer1.place === 1 ? answer1 : answer2.place === 1 ? answer2 : answer3.place === 1 ? answer3 : answer4.place === 1 ? answer4 : null;
        // let p3 = answer1.place === 2 ? answer1 : answer2.place === 2 ? answer2 : answer3.place === 2 ? answer3 : answer4.place === 2 ? answer4 : null;
        // let p4 = answer1.place === 3 ? answer1 : answer2.place === 3 ? answer2 : answer3.place === 3 ? answer3 : answer4.place === 3 ? answer4 : null;

        let p1 = answer1;
        let p2 = answer2;
        let p3 = answer3;
        let p4 = answer4;
        console.log(qs, 'ssssssssss');
        const colorScheme = {
            colorA: (('a' in qs.answer1 === true) ? ('#9D1716') : ('b' in qs.answer1 === true) ? ('#612F90') : ('c' in qs.answer1 === true) ? ('#5E9134') : ('d' in qs.answer1 === true) ? ('#DEC629') : '#9D1716'),
            colorB: (('a' in qs.answer2 === true) ? ('#9D1716') : ('b' in qs.answer2 === true) ? ('#612F90') : ('c' in qs.answer2 === true) ? ('#5E9134') : ('d' in qs.answer2 === true) ? ('#DEC629') : '#612F90'),
            colorC: (('a' in qs.answer3 === true) ? ('#9D1716') : ('b' in qs.answer3 === true) ? ('#612F90') : ('c' in qs.answer3 === true) ? ('#5E9134') : ('d' in qs.answer3 === true) ? ('#DEC629') : '#5E9134'),
            colorD: (('a' in qs.answer4 === true) ? ('#9D1716') : ('b' in qs.answer4 === true) ? ('#612F90') : ('c' in qs.answer4 === true) ? ('#5E9134') : ('d' in qs.answer4 === true) ? ('#DEC629') : '#DEC629'),

        }
        const iconScheme = {
            iconA: (('a' in qs.answer1 === true) ? (require('../../images/read_icon1.png')) : ('b' in qs.answer1 === true) ? (require('../../images/write_icon1.png')) : ('c' in qs.answer1 === true) ? (require('../../images/speak_icon1.png')) : ('d' in qs.answer1 === true) ? (require('../../images/hear_icon1.png')) : require('../../images/read_icon1.png')),
            iconB: (('a' in qs.answer2 === true) ? (require('../../images/read_icon1.png')) : ('b' in qs.answer2 === true) ? (require('../../images/write_icon1.png')) : ('c' in qs.answer2 === true) ? (require('../../images/speak_icon1.png')) : ('d' in qs.answer2 === true) ? (require('../../images/hear_icon1.png')) : require('../../images/read_icon1.png')),
            iconC: (('a' in qs.answer3 === true) ? (require('../../images/read_icon1.png')) : ('b' in qs.answer3 === true) ? (require('../../images/write_icon1.png')) : ('c' in qs.answer3 === true) ? (require('../../images/speak_icon1.png')) : ('d' in qs.answer3 === true) ? (require('../../images/hear_icon1.png')) : require('../../images/read_icon1.png')),
            iconD: (('a' in qs.answer4 === true) ? (require('../../images/read_icon1.png')) : ('b' in qs.answer4 === true) ? (require('../../images/write_icon1.png')) : ('c' in qs.answer4 === true) ? (require('../../images/speak_icon1.png')) : ('d' in qs.answer4 === true) ? (require('../../images/hear_icon1.png')) : require('../../images/read_icon1.png')),

        }
        // var arr = [];
        // let allPs = []
        // let flagAns = 1;
        // for (var i = 0; i < 5; i++) {
        //     var aRandom = Math.ceil(Math.random() * 4);
        //     console.log(aRandom, arr, arr.length, '5555555555', i)
        //     if (arr.indexOf(aRandom) === -1) {
        //         console.log('inside iff', i);
        //         if (flagAns === 1) {

        //         }
        //         else if (flagAns === 2) {

        //         }
        //         else if (flagAns === 3) {

        //         }
        //         else if (flagAns === 4) {

        //         }
        //         arr.push(aRandom)

        //     }
        //     else {
        //         i -= 1;
        //     }
        //     if (arr.length === 4) {
        //         console.log(arr, 'arr');
        //         break;
        //     }
        // }
        return (
            <List>
                <ListItem style={{ borderColor: 'white' }}>
                    <Text style={{ fontWeight: 'bold' }} >{qs.questions}</Text>
                </ListItem>
                <CardItem style={{ width: '85%', }} cardBody>
                    <Image source={{ uri: qs.imgUrl }} style={{ borderRadius: 12, height: 190, width: null, flex: 1 }} />
                </CardItem>
                <View style={styles.qlist} >
                    <View style={styles.listBody}>
                        {p1.correct ?
                            <Button iconRight style={[styles.btn, { backgroundColor: '#19D617', }]}>
                                <Image source={require('../../images/checkmark.png')} style={{ height: 85, width: 90, opacity: 0.4, position: 'absolute' }} />
                                <Text>{p1.value}</Text>
                            </Button>
                            :
                            <Button iconRight style={[styles.btn, { backgroundColor: colorScheme.colorA }]}
                                onPress={this.selectJumble.bind(this, p1)}
                            >
                                <Text>{p1.value}</Text>
                                <Image source={iconScheme.iconA} style={{ top: 10, left: '76%', height: 20, width: 20, opacity: 1, position: 'absolute', resizeMode: 'contain' }} />
                            </Button>}
                    </View>
                    <View style={styles.listBody}>
                        {p2.correct ?
                            <Button style={[styles.btn, { backgroundColor: '#19D617' }]}>
                                <Image source={require('../../images/checkmark.png')} style={{ height: 75, width: 80, opacity: 0.4, position: 'absolute', marginLeft: 20 }} />

                                <Text>{p2.value}</Text>
                            </Button>
                            :
                            <Button iconRight style={[styles.btn, { backgroundColor: colorScheme.colorB }]}
                                onPress={this.selectJumble.bind(this, p2)}
                            >
                                <Text>{p2.value}</Text>
                                <Image source={iconScheme.iconB} style={{ top: 10, left: '76%', height: 20, width: 20, opacity: 1, position: 'absolute', resizeMode: 'contain' }} />
                            </Button>}
                    </View>
                </View>
                <View style={styles.qlist}>
                    <View style={styles.listBody}>
                        {p3.correct ?
                            <Button iconRight style={[styles.btn, { backgroundColor: '#19D617' }]} >
                                <Image source={require('../../images/checkmark.png')} style={{ height: 85, width: 90, opacity: 0.4, position: 'absolute', marginLeft: 20 }} />
                                <Text>{p3.value}</Text>
                            </Button> :
                            <Button iconRight style={[styles.btn, { backgroundColor: colorScheme.colorC }]}
                                onPress={this.selectJumble.bind(this, p3)}
                            >
                                <Text >{p3.value}</Text>
                                <Image source={iconScheme.iconC} style={{ top: 10, left: '76%', height: 20, width: 20, opacity: 1, position: 'absolute', resizeMode: 'contain' }} />
                            </Button>}
                    </View>
                    <View style={styles.listBody}>
                        {p4.correct ?
                            <Button style={[styles.btn, { backgroundColor: '#19D617' }]} >
                                <Image source={require('../../images/checkmark.png')} style={{ height: 75, width: 80, opacity: 0.4, position: 'absolute', marginLeft: 20 }} />
                                <Text>{p4.value}</Text>
                            </Button> :
                            <Button iconRight style={[styles.btn, { backgroundColor: colorScheme.colorD }]}
                                onPress={this.selectJumble.bind(this, p4)}
                            >
                                <Text>{p4.value}</Text>
                                <Image source={iconScheme.iconD} style={{ top: 10, left: '76%', height: 20, width: 20, opacity: 1, position: 'absolute', resizeMode: 'contain' }} />
                            </Button>}
                    </View>
                </View>
            </List>
        )
    }
}

function mapStateToProps(state) {
    return {
        userdata_History: state.userdata,
        inprogress_History: state.userdata.inprogressHistory
    }
}
const mapDispatchToProps = dispatch => {
    return {
        correctAnswerAction: (qs) => {
            dispatch(correctAnswerAction(qs));
        },
        wrongAnswerAction: (qs) => {
            dispatch(wrongAnswerAction(qs));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Jumble);

const styles = StyleSheet.create({
    btn: { width: 140, height: 110, borderRadius: 10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' },
    listBody: { flex: 1, alignSelf: 'center', width: '80%' },
    qlist: { marginTop: 12, flexDirection: 'row' },
})