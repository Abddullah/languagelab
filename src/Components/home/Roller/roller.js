import React, { Component } from "react";
import { View, Text, StatusBar, Image, TouchableOpacity, StyleSheet } from "react-native";
import { ScrollCard, CardSection, Input, Spinner, TextCard } from "../../Common";
import { Container, Header, Body, Left, Right, Button, Card, Thumbnail, CardItem, Icon, Content } from "native-base";
import { connect } from "react-redux";
import Carousel from "react-native-carousel";
import { Actions } from "react-native-router-flux";
import LinkPreview from 'react-native-link-preview';
import ImageLoading from './ImageLoading';

const styles = {
  card: { height: 200, width: "88%", justifyContent: "center", marginHorizontal: "7%", marginVertical: 2, position: "relative" },
  imageCard: { borderRadius: 15, borderColor: "#4caf50", position: "relative", backgroundColor: "#ffff" },
  // cardImage: { height: 140, width: "180%", resizeMode: 'contain', borderWidth: 2, overflow: "hidden" },
  cardImageView: { height: 140, width: "180%", overflow: "hidden" },

  container: { flex: 1, paddingBottom: 10 },
  cardImage: { height: 140, width: '180%', flex: 1, overflow: 'hidden' },
  imgtxtcont: { position: 'absolute', width: '100%', height: '100%', alignItems: 'flex-end', justifyContent: 'flex-end' },
  imgtxt: { color: '#e5d100', backgroundColor: 'transparent' },
  qsCont: { borderRadius: 17, backgroundColor: 'rgba(0, 0, 0, .5)', paddingTop: '2.5%', paddingBottom: '2.5%', paddingRight: '6%', paddingLeft: '6%', margin: '5%', },
  feature: { position: 'absolute', width: '29%', height: '100%', margin: '3%' },
  featuretxt: { width: 100, color: 'black', borderRadius: 14, overflow: 'hidden', backgroundColor: '#fcdb00', paddingTop: '5%', paddingBottom: '5%', paddingRight: '12%', paddingLeft: '12%', margin: '5%', },
  txt1: { color: "#3f94fc", fontSize: 13, fontWeight: "500" },
  txt2: { color: "#818b94", fontSize: 11 },
  txt3cont: { flex: 2, justifyContent: "center", alignItems: "center" },
  txt3: { color: "#818b94", fontSize: 10 }
};

class RollerCards extends Component {
  constructor() {
    super();
    this.state = {
      imageArr: []
    }
  }

  componentDidMount() {
    // console.log(this.props.data)
    let imageArr = this.state.imageArr;
    if (Actions.currentScene === 'myhome') {

      // this.props.data.map((v, i) => {
      //   LinkPreview.getPreview(v.name.introVideos)
      //     .then(data => {
      //       // console.log(data.images[0], 'sjdgjk')
      //       image = data.images[0];
      //       imageArr[i] = image
      //       if (Actions.currentScene === 'myhome') {

      //         this.setState({
      //           imageArr
      //         })
      //       }
      //     });
      // })
    }
  }

  Detailed(data) {
    this.props.closeModal()
    console.log(data, 'dataaaaaa')
    if (this.props.auth === false) {
      Actions.login({ quizDetails: data })
    } else {
      Actions.play({ data });
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('hello receive roller')
    let imageArr = this.state.imageArr;
    // if (Actions.currentScene === 'myhome') {

    //   nextProps.data.map((v, i) => {
    //     LinkPreview.getPreview(v.name.introVideos)
    //       .then(data => {
    //         // console.log(data.images[0], 'sjdgjk')
    //         image = data.images[0];
    //         imageArr[i] = image
    //         if (Actions.currentScene === 'myhome') {

    //           this.setState({
    //             imageArr
    //           })
    //         }
    //       });
    //   })
    // }
  }

  render() {
    // console.log()
    return (
      <View style={styles.container}>
        {
          (this.props.data.length && this.props.data.length > 0) ? (
            this.props.data.map((v, i) => {
              return (
                <TouchableOpacity onPress={() => this.Detailed(v)} key={i} >
                  <View >
                    <ScrollCard>
                      <CardSection>
                        {/* <ImageLoading styleProp={styles.cardImage} sourceProp={} /> */}
                        {
                          (v.name.imgUrl && v.name.imgUrl !== '' && v.name.imgUrl !== 'https' && v.name.imgUrl !== 'http' && v.name.imgUrl !== 'https://') ? (
                            <Image style={styles.cardImage} source={{ uri: v.name.imgUrl }} />
                            // <ImageLoading styleProp={styles.cardImage} sourceProp={v.name.imgUrl} />

                          ) :
                            <ImageLoading styleProp={styles.cardImage} sourceProp={v.name.introVideos} />

                          // (!this.state.imageArr[i]) ?
                          //   <View style={styles.cardImageView} ></View> :
                          //   <ImageLoading styleProp={styles.cardImage} sourceProp={this.state.imageArr[i]} />

                          // <Image style={styles.cardImage} source={{ uri: this.state.imageArr[i] }} />
                        }
                        {
                          v.name.feature ? <View style={styles.feature} >
                            <Text style={styles.featuretxt} >FEATURED</Text>
                          </View> : null
                        }
                        <View style={styles.imgtxtcont} >
                          <View style={styles.qsCont} >
                            <Text style={styles.imgtxt} >{v.questions.length < 10 ? `0${v.questions.length}` : v.questions.length} QUESTIONS</Text>
                          </View>
                        </View>
                      </CardSection>
                      <CardItem>
                        <View style={{ flexDirection: "row" }}>
                          <View style={{ flex: 1 }}>
                            <Text style={styles.txt1}>{v.name.titles}</Text>

                          </View>
                          {/* <View style={styles.txt3cont}>

                          </View> */}
                        </View>
                      </CardItem>
                    </ScrollCard>
                  </View>
                </TouchableOpacity>
              );
            })
          )
            : (
              (this.props.isNetAvailable === true) ? <Text style={{ textAlign: 'center' }}>Your searched keyword not found.</Text> : null
            )



        }
      </View>
    );
  }
}
const mapStateToProps = state => {
  // console.log(state);
  return {
    auth: state.AuthReducer.isLoggedIn,
    isNetAvailable: state.AuthReducer.connectionStatus

  };
};
export default connect(mapStateToProps, null)(RollerCards);
