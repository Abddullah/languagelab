import React, { Component } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, CardSection, ScrollCard, TextCard } from '../../Common';
// import { Container, Header, Body, Left, Right, Button, Card, Thumbnail, CardItem, Icon, Content } from 'native-base'
// import { SignInAction, LogOutAction } from '../../Actions/AuthAction';
import { connect } from 'react-redux';
import Carousel from "react-native-carousel-control";
import { Actions } from "react-native-router-flux";
import { inProgressQuizStatus } from '../../../Actions/alldata';
import LinkPreview from 'react-native-link-preview';
import ImageLoading from '../Roller/ImageLoading';
import Thumbnail from 'react-native-thumbnail-video';

const styles = {
    wrapper: {
        // height: 50,
        width: '50%'
    },
    cardImage: {
        // height: 20,
        width: '137%',
        flex: 1,
        marginLeft: 7,
        borderRadius: 10,
        borderRadius: 10,
        position: 'relative',
        left: -34,
    },
    cardImageThumbnails: {
        width: '137%',

        flex: 1,
        position: 'relative',
        left: -34,
        marginLeft: 7,

        borderRadius: 50

    },
    cardImageView: {
        // height: 20,
        width: '93%',
        flex: 1,
        marginLeft: 7,

    },
    // cardImageView: { height: '100%', width: '93%', borderWidth: 2, overflow: "hidden" },

    slide: {
        flex: 1,
        width: '90%',

        overflow: 'hidden',
        borderWidth: 1,

        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ebebeb',
    },

}

class ProgressClimate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            localProgressArr: [],
            imageArr: []
        }

    }
    componentDidMount() {
        // if (Actions.currentScene === 'myhome') {

        //     this.props.data.map((v, i) => {
        //         LinkPreview.getPreview(v.quiz.name.introVideos)
        //             .then(data => {
        //                 console.log(data.images[0], 'inprogress sjdgjk')
        //                 image = data.images[0];
        //                 let imageArr = this.state.imageArr;
        //                 imageArr[i] = image
        //                 if (Actions.currentScene === 'myhome') {
        //                     this.setState({
        //                         imageArr
        //                     })

        //                 }
        //             });
        //     })
        // }
    }
    startInProgressQuiz(v) {
        console.log(v, 'vvvvvvvv');
        this.props.inProgressQuizStatus(v.resultObject);

        Actions.test({ data: v.quiz, historyStatus: true, currentQuestionIndex: v.currentQuizIndex });
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.data, 'nextPropsnextPropsnextPropsnextPropsnextProps');
        // if (Actions.currentScene === 'myhome') {
        //     nextProps.data.map((v, i) => {
        //         LinkPreview.getPreview(v.quiz.name.introVideos)
        //             .then(data => {
        //                 console.log(data.images[0], 'inprogress sjdgjk')
        //                 image = data.images[0];
        //                 let imageArr = this.state.imageArr;
        //                 imageArr[i] = image
        //                 if (Actions.currentScene === 'myhome') {
        //                     this.setState({
        //                         imageArr
        //                     })

        //                 }
        //             });
        //     })
        // }
        this.setState({
            localProgressArr: nextProps.data
        })
    }

    render() {
        // console.log(this.props.data)
        return (
            <Carousel
                pageStyle={{ width: 160, height: 110, marginBottom: 15, marginTop: 15, marginLeft: 5, marginRight: 0, position: 'relative', left: -16 }}
            >
                {
                    this.props.data.map((v, i) => {
                        console.log(v, 'vvv')
                        return (
                            <TouchableOpacity onPress={this.startInProgressQuiz.bind(this, v)} key={i} style={styles.slide}>
                                {/* <Image style={styles.cardImage} source={{ uri: v.currentQuestion.imgUrl }} /> */}
                                {
                                    (v.quiz.name.imgUrl && v.quiz.name.imgUrl !== '' && v.quiz.name.imgUrl !== 'https' && v.quiz.name.imgUrl !== 'http' && v.quiz.name.imgUrl !== 'https://') ? (
                                        <Image style={styles.cardImage} source={{ uri: v.quiz.name.imgUrl }} />
                                        // <ImageLoading styleProp={styles.cardImage} sourceProp={v.quiz.name.imgUrl} />

                                    ) :

                                        // <TouchableOpacity style={styles.cardImageView}>
                                        //     <Thumbnail url={v.quiz.name.introVideos} containerStyle={styles.slide} imageWidth={'100%'} imageHeight={'100%'} iconStyle={{ opacity: 0 }} />
                                        // </TouchableOpacity>
                                        <Thumbnail url={v.quiz.name.introVideos} containerStyle={styles.cardImageThumbnails} imageWidth={'100%'} imageHeight={'100%'} iconStyle={{ opacity: 0 }} onPress={this.startInProgressQuiz.bind(this, v)} />
                                    // <ImageLoading styleProp={styles.cardImageThumbnails} sourceProp={v.quiz.name.introVideos} />

                                    //         (!this.state.imageArr[i]) ?
                                    //             <View style={styles.cardImageView} ></View> :
                                    //             // <Image style={styles.cardImage} source={{ uri: this.state.imageArr[i] }} />
                                    // <ImageLoading styleProp={styles.cardImage} sourceProp={this.state.imageArr[i]} />

                                }


                            </TouchableOpacity>
                            // <TouchableOpacity onPress={(v) => console.log(v)} key={i} style={styles.slide} >
                            //     <Image style={styles.cardImage} source={{ uri: v.quiz.name.imgUrl }} />
                            // </TouchableOpacity>   
                        )
                    })
                }
                {/* <TouchableOpacity style={{flex: 1}} >
                                <Image style={{width: '100%'}} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/mageproject-beadb.appspot.com/o/quiz%2Fdeathnote-1280-1490294885083_1280w.jpg?alt=media&token=9f777d30-a4de-43ff-82c9-093eac950506' }} />
                            </TouchableOpacity> */}
            </Carousel>
        );
    }
}


// const mapStateToProps = (state) => {
//     return {
//         auth: state.AuthReducer.authLogOut,
//         userEmail: state.AuthReducer.authSignIn,
//         loader: state.AuthReducer.loader,
//         errorMessage: state.AuthReducer.authErrors,
//     };
// }
// const mapDispatchToProps = (dispatch) => {
//     return {
//         SignInAction: (userLogin) => {
//             dispatch(SignInAction(userLogin));
//         },
//         LogOutAction: () => {
//             dispatch(LogOutAction());
//         }
//     };
// }
export default connect(null, { inProgressQuizStatus })(ProgressClimate);

// export default LoginForm;