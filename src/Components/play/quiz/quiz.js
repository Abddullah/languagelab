import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import { Icon, Card, CardItem, Container, Content, Header, Body, ListItem, List, Button, Right, Left, Title, Drawer, Fab, Footer, FooterTab, Spinner, Text } from 'native-base';
import { ActionConst, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { wrongAnswerAction, correctAnswerAction } from '../../../Actions/alldata'

class Quiz extends Component {
    constructor() {
        super();
        this.state = {
            correctAns: "",
            correctA: false,
            correctB: false,
            correctC: false,
            correctD: false,
            wrongA: false,
            wrongB: false,
            wrongC: false,
            wrongD: false,
            wrongSelectedA: false,
            wrongSelectedB: false,
            wrongSelectedC: false,
            wrongSelectedD: false,
            selected: false,
            correct: false,
            wrong: false,
            timesUp: false
        }
        this.handler = this.handler.bind(this);
    }

    componentWillMount() {
        const { qs } = this.props;
        let time = +qs.time.replace('Sec', '')
        // console.log(time)
        this.props.time(time)
        // console.log(qs,'qsqsqsqsqsqsqs');
        if (qs.answer1.correctAns == true) {
            this.setState({ correctAns: qs.answer1.optionName.toUpperCase() })
        } else if (qs.answer2.correctAns == true) {
            this.setState({ correctAns: qs.answer2.optionName.toUpperCase() })
        } else if (qs.answer3.correctAns == true) {
            this.setState({ correctAns: qs.answer3.optionName.toUpperCase() })
        } else if (qs.answer4.correctAns == true) {
            this.setState({ correctAns: qs.answer4.optionName.toUpperCase() })
        }
    }



    handler(opt, optionName) {
        this.props.selected(true)
        this.props.qs.selectedOoption = optionName;
        console.log(optionName, 'optionNameoptionNameoptionName', this.props.qs)
        if (optionName === this.state.correctAns) {
            this.props.correctAnswerAction(this.props.qs)
            setTimeout(() => { this.props.correct(true) }, 100);
            if (optionName === "A") {
                this.setState({ correctA: true, wrongB: true, wrongC: true, wrongD: true })
            } else if (optionName === "B") {
                this.setState({ correctB: true, wrongA: true, wrongC: true, wrongD: true })
            } else if (optionName === "C") {
                this.setState({ correctC: true, wrongA: true, wrongD: true, wrongB: true })
            } else if (optionName === "D") {
                this.setState({ correctD: true, wrongA: true, wrongC: true, wrongB: true })
            }
        }
        else {
            this.props.wrongAnswerAction(this.props.qs)
            setTimeout(() => { this.props.wrong(true) }, 100);
            if (this.state.correctAns === "A") {
                this.setState({ correctA: true, wrongSelectedB: true, wrongSelectedC: true, wrongSelectedD: true })
            } else if (this.state.correctAns === "B") {
                this.setState({ correctB: true, wrongSelectedA: true, wrongSelectedC: true, wrongSelectedD: true })
            } else if (this.state.correctAns === "C") {
                this.setState({ correctC: true, wrongSelectedB: true, wrongSelectedA: true, wrongSelectedD: true })
            } else if (this.state.correctAns === "D") {
                this.setState({ correctD: true, wrongSelectedB: true, wrongSelectedC: true, wrongSelectedA: true })
            }
        }
    }

    componentWillReceiveProps(props) {
        const { allstate } = props.parentData
        if (allstate) {
            this.setState({
                wrong: false,
                selected: false,
                correctA: false,
                correctB: false,
                correctC: false,
                correctD: false,
                wrongA: false,
                wrongB: false,
                wrongC: false,
                wrongD: false,
                wrongSelectedA: false,
                wrongSelectedB: false,
                wrongSelectedC: false,
                wrongSelectedD: false
            })
            props.changeStateCondition(false)
            console.log(props, 'fdadfasdfasdfadsfasdf')
            const { qs } = props;
            let time = +qs.time.replace('Sec', '')
            // console.log(time)
            this.props.time(time)
            console.log(qs, 'qsqsqsqsqsqsqs');
            if (qs.answer1.correctAns == true) {
                this.setState({ correctAns: qs.answer1.optionName.toUpperCase() })
            } else if (qs.answer2.correctAns == true) {
                this.setState({ correctAns: qs.answer2.optionName.toUpperCase() })
            } else if (qs.answer3.correctAns == true) {
                this.setState({ correctAns: qs.answer3.optionName.toUpperCase() })
            } else if (qs.answer4.correctAns == true) {
                this.setState({ correctAns: qs.answer4.optionName.toUpperCase() })
            }
        }

    }

    render() {
        const { qs } = this.props;
        console.log(qs,'qssss')
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
        return (
            <List>
                <ListItem style={{ borderColor: 'white' }}>
                    <Text style={{ fontWeight: 'bold' }} >{qs.questions}</Text>
                </ListItem>
                <CardItem style={{ width: '100%' }} cardBody>
                    <Image source={{ uri: qs.imgUrl }} style={{ borderRadius: 0, height: 190, width: '90%', resizeMode: 'contain', }} />
                </CardItem>
                <View style={styles.qlist} >
                    <View style={styles.listBody}>
                        {this.state.correctA ?
                            <Button iconRight style={[styles.btn, { backgroundColor: '#19D617', }]}
                                onPress={this.handler.bind(this, qs.answer1, "A")}
                            >
                                <Image source={require('../../images/checkmark.png')} style={{ height: 85, width: 90, opacity: 0.4, position: 'absolute' }} />
                                <Text>{qs.answer1.value}</Text>
                            </Button>
                            :
                            this.state.wrongA ?
                                <Button iconRight style={[styles.btn, { backgroundColor: '#F72F2F' }]}
                                    onPress={this.handler.bind(this, qs.answer1, "A")}
                                >
                                    <Text>{qs.answer1.value}</Text>
                                </Button> :
                                this.state.wrongSelectedA ?
                                    <Button iconRight style={[styles.btn, { backgroundColor: '#FB3134', }]}
                                        onPress={this.handler.bind(this, qs.answer1, "A")}
                                    >
                                        <Image source={require('../../images/x.png')} style={{ height: 75, width: 80, opacity: 0.4, position: 'absolute', }} />

                                        <Text>{qs.answer1.value}</Text>
                                    </Button>
                                    :

                                    <Button iconRight style={[styles.btn, { backgroundColor: colorScheme.colorA }]}
                                        onPress={this.handler.bind(this, qs.answer1, "A")}
                                    >

                                        <Text>{qs.answer1.value}</Text>
                                        <Image source={iconScheme.iconA} style={{ top: 10, left: '76%', height: 20, width: 20, opacity: 1, position: 'absolute', resizeMode: 'contain' }} />
                                    </Button>}
                    </View>
                    <View style={styles.listBody}>
                        {this.state.correctB ?
                            <Button style={[styles.btn, { backgroundColor: '#19D617' }]}
                                onPress={this.handler.bind(this, qs.answer2, "B")}
                            >
                                <Image source={require('../../images/checkmark.png')} style={{ height: 75, width: 80, opacity: 0.4, position: 'absolute', marginLeft: 20 }} />

                                <Text>{qs.answer2.value}</Text>
                            </Button>
                            :
                            this.state.wrongB ?
                                <Button iconRight style={[styles.btn, { backgroundColor: '#F72F2F' }]}
                                    onPress={this.handler.bind(this, qs.answer2, "B")}
                                >
                                    <Text>{qs.answer2.value}</Text>
                                </Button> :
                                this.state.wrongSelectedB ?
                                    <Button iconRight style={[styles.btn, { backgroundColor: '#FB3134', }]}
                                        onPress={this.handler.bind(this, qs.answer2, "B")}
                                    >
                                        <Image source={require('../../images/x.png')} style={{ height: 85, width: 90, opacity: 0.4, position: 'absolute', marginLeft: 20 }} />

                                        <Text>{qs.answer2.value}</Text>
                                    </Button>
                                    :
                                    <Button iconRight style={[styles.btn, { backgroundColor: colorScheme.colorB }]}
                                        onPress={this.handler.bind(this, qs.answer2, "B")}
                                    >
                                        <Text>{qs.answer2.value}</Text>
                                        <Image source={iconScheme.iconB} style={{ top: 10, left: '76%',  height: 20, width: 20, opacity: 1, position: 'absolute', resizeMode: 'contain' }} />
                                    </Button>}
                    </View>
                </View>
                <View style={styles.qlist}>
                    <View style={styles.listBody}>
                        {/* </Body> */}
                        {this.state.correctC ?
                            <Button iconRight style={[styles.btn, { backgroundColor: '#19D617' }]}
                                onPress={this.handler.bind(this, qs.answer3, "C")}
                            >
                                <Image source={require('../../images/checkmark.png')} style={{ height: 85, width: 90, opacity: 0.4, position: 'absolute', marginLeft: 20 }} />
                                <Text>{qs.answer3.value}</Text>
                            </Button> :
                            this.state.wrongC ?
                                <Button iconRight style={[styles.btn, { backgroundColor: '#F72F2F' }]}
                                    onPress={this.handler.bind(this, qs.answer3, "C")}
                                >
                                    <Text>{qs.answer3.value}</Text>
                                </Button> :
                                this.state.wrongSelectedC ?
                                    <Button iconRight style={[styles.btn, { backgroundColor: '#FB3134', }]}
                                        onPress={this.handler.bind(this, qs.answer3, "C")}
                                    >
                                        <Image source={require('../../images/x.png')} style={{ height: 75, width: 80, opacity: 0.4, position: 'absolute', marginLeft: 20 }} />

                                        <Text>{qs.answer3.value}</Text>
                                    </Button>
                                    :
                                    <Button iconRight style={[styles.btn, { backgroundColor: colorScheme.colorC }]}
                                        onPress={this.handler.bind(this, qs.answer3, "C")}
                                    >
                                        <Text >{qs.answer3.value}</Text>
                                        <Image source={iconScheme.iconC} style={{ top: 10, left: '76%', height: 20, width: 20, opacity: 1, position: 'absolute', resizeMode: 'contain' }} />
                                    </Button>}
                    </View>

                    <View style={styles.listBody}>
                        {this.state.correctD ?
                            <Button style={[styles.btn, { backgroundColor: '#19D617', }]}
                                onPress={this.handler.bind(this, qs.answer4, "D")}
                            >
                                <Image source={require('../../images/checkmark.png')} style={{ height: 75, width: 80, opacity: 0.4, position: 'absolute', marginLeft: 20 }} />

                                <Text > {qs.answer4.value}</Text>
                            </Button> :
                            this.state.wrongD ?
                                <Button iconRight style={[styles.btn, { backgroundColor: '#F72F2F' }]}
                                    onPress={this.handler.bind(this, qs.answer4, "D")}
                                >
                                    <Text>{qs.answer4.value}</Text>
                                </Button> :
                                this.state.wrongSelectedD ?
                                    <Button iconRight style={[styles.btn, { backgroundColor: '#FB3134', }]}
                                        onPress={this.handler.bind(this, qs.answer4, "D")}
                                    >
                                        <Image source={require('../../images/x.png')} style={{ height: 85, width: 90, opacity: 0.4, position: 'absolute', marginLeft: 20 }} />

                                        <Text>{qs.answer4.value}</Text>
                                    </Button>
                                    :
                                    <Button iconRight style={[styles.btn, { backgroundColor: colorScheme.colorD }]}
                                        onPress={this.handler.bind(this, qs.answer4, "D")}
                                    >
                                        <Text>{qs.answer4.value}</Text>
                                        <Image source={iconScheme.iconD} style={{ top: 10, left: '76%', height: 20, width: 20, opacity: 1, position: 'absolute', resizeMode: 'contain' }} />
                                    </Button>}
                    </View>
                </View>
            </List>
        );
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


export default connect(mapStateToProps, mapDispatchToProps)(Quiz);

const styles = StyleSheet.create({
    btn: { width: 140, height: 110, borderRadius: 10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' },
    listBody: { flex: 1, alignSelf: 'center', width: '80%' },
    qlist: { marginTop: 12, flexDirection: 'row' },
})