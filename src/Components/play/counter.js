import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { recordTimeOfSubmission } from '../../Actions/alldata';
import { wrongAnswerAction, correctAnswerAction } from '../../Actions/alldata'

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 10,
            time: 10,
            percentage: '95%',
            stopPercentage: '100%',
            stopCounter: 10,
            stop: false
        }
    }

    cleartimeInterval;
    componentDidMount() {
        if (this.state.counter !== undefined && this.state.timer !== undefined) {
            // this.props.recordTime(this.state.counter / this.state.timer * 100);
            this.props.recordTime((this.state.counter / this.state.timer * 100), this.state.counter);

        }
        this.setState({
            counter: this.props.timer,
            timer: this.props.timer,
            percentage: '95%'
        })
        this.counter()
    }

    counter() {
        if (this.state.counter > 0) {
            let that = this
            this.cleartimeInterval = setInterval(() => {
                if (this.state.counter > 0) {
                    if (this.state.counter !== undefined && this.state.timer !== undefined) {
                        this.props.recordTime((this.state.counter / this.state.timer * 100), this.state.counter);
                    }
                    // this.props.recordTime(this.state.counter / this.state.timer * 100);
                    this.setState({
                        counter: this.state.counter - 1,
                        percentage: `${(this.state.counter / this.state.timer * 95)}%`
                    })
                } else {
                    console.log(that.props.qs, 'that.props.qs')
                    that.props.wrongAnswerAction(that.props.qs)
                    clearInterval(this.cleartimeInterval)
                    // this.props.recordTimeOfSubmission(this.state.counter)

                    this.props.timesUp(true)
                }
            }, 1000);
        }
    }
    componentWillUnmount() {
        clearInterval(this.cleartimeInterval)

    }

    componentWillReceiveProps(props) {
        console.log(props.pause, 'click on')
        if (props.pause) {
            clearInterval(this.cleartimeInterval)
        }
        else {
            if (props.timer) {
                clearInterval(this.cleartimeInterval)
                this.setState({ counter: props.timer, timer: props.timer, percentage: '95%' })
                this.counter()
            }
            if (props.stopCounter) {
                // console.log('time interval clear')
                this.setState({ stop: true })
                clearInterval(this.cleartimeInterval)
            }
            if (props.stop) {
                this.setState({ stop: true, stopCounter: this.state.counter, stopPercentage: this.state.percentage })
                clearInterval(this.cleartimeInterval)
            } else {
                this.setState({ stop: false })
            }
        }
    }

    render() {
        const { stop, counter, percentage, stopPercentage, stopCounter } = this.state;
        return (
            <View style={styles.main}>
                <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', height: 50, alignItems: 'center' }}>
                    {/* <View style={[styles.child]}> */}
                    {/* {!this.state.selected ?
                                <View style={{ justifyContent: 'center', alignItems: 'center', width: 40, height: 40, backgroundColor: '#FD01AC', borderRadius: 50 }}>
                                <Text style={{ position: 'absolute', color: 'white', marginTop: 4, backgroundColor: 'transparent',paddingLeft: '1%' }}>{this.state.counter}</Text>
                                </View>
                                :
                                <View style={{ justifyContent: 'center', alignItems: 'center', width: 40, height: 40, backgroundColor: '#CEE1F8', borderRadius: 50 }}>
                                <Text style={{ position: 'absolute', color: 'white', marginTop: 4, }}>{this.state.stopcounter}</Text>
                                </View>
                            } */}
                    <View style={[styles.length, { backgroundColor: !stop ? '#FD01AC' : '#CEE1F8', width: '95%', marginLeft: 20, width: !stop ? percentage : stopPercentage }]} />
                    <View style={[{ justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 50, position: 'absolute', left: 0, backgroundColor: !stop ? '#FD01AC' : '#CEE1F8' }]}>
                        <Text style={styles.circleText}>{!stop ? counter : stopCounter}</Text>
                    </View>
                    {/* </View> */}
                    {/* <View style={styles.main1}> */}
                    {/* {!this.state.selected ?
                                    <View style={{ marginLeft: 5,width: this.state.percentage, height: 30, backgroundColor: '#FD01AC', borderTopLeftRadius: 0, borderTopRightRadius: 20, borderBottomLeftRadius: 0, borderBottomRightRadius: 20, borderColor: 'white' }} >
                                    </View>
                                    :
                                    <View style={{ width: this.state.stoppercentage, height: 30, backgroundColor: '#CEE1F8', borderTopLeftRadius: 0, borderTopRightRadius: 20, borderBottomLeftRadius: 0, borderBottomRightRadius: 20, borderColor: 'white' }} >
!selected ? percentage : stoppercentage 
                                    </View>
                                } */}
                    {/* </View> */}
                </View>
            </View>
        );
    }
}
// function mapStateToProps(state) {
//     return {
//         userdata_History: state.userdata,
//         inprogress_History: state.userdata.inprogressHistory
//     }
// }

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



export default connect(null, { wrongAnswerAction })(Counter);

const styles = StyleSheet.create({
    main: {
        marginTop: "12%",
        width: '100%'
    },
    main1: {
        flex: 5,
        marginHorizontal: '-12%',
        marginRight: 35,
        marginTop: 5
    },
    child: {
        flex: 1,
    },
    circle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 50,
        position: 'absolute'
    },
    circleText: {
        color: 'white',
        backgroundColor: 'transparent'
    },
    length: {
        height: 30,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 20,
        borderColor: 'white'
    }
})


