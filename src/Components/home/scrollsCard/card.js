import React, { Component } from "react";
import { View, Text, StatusBar, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { ScrollCard, CardSection, Input, Spinner, TextCard } from "../../Common";
import { Container, Header, Body, Left, Right, Button, Card, Thumbnail, CardItem, Icon, Content } from "native-base";
import { connect } from "react-redux";
import Carousel from "react-native-carousel";
import { Actions } from "react-native-router-flux";
import LinkPreview from 'react-native-link-preview';
import ImageLoading from '../Roller/ImageLoading';

const styles = {
  card: { height: 200, width: '88%', justifyContent: 'center', marginHorizontal: '7%', marginVertical: 2, position: 'relative', },
  imageCard: { borderRadius: 15, borderColor: '#4caf50', position: 'relative', backgroundColor: '#ffff', },
  cardImage: { height: '100%', width: '100%', resizeMode: 'contain', overflow: 'hidden' },
  cardImageView: { height: '100%', width: '100%', overflow: "hidden" },

  imgtxtcont: { position: 'absolute', width: '100%', height: '100%', alignItems: 'flex-end', justifyContent: 'flex-end' },
  imgtxt: { color: '#fcea00', backgroundColor: 'transparent' },
  qsCont: { borderRadius: 17, backgroundColor: 'rgba(0, 0, 0, .5)', paddingTop: '2.5%', paddingBottom: '2.5%', paddingRight: '6%', paddingLeft: '6%', margin: '5%', },
  feature: { position: 'absolute', width: '29%', height: '100%', margin: '3%' },
  featuretxt: { width: 100, color: 'black', borderRadius: 14, overflow: 'hidden', backgroundColor: '#fcdb00', paddingTop: '5%', paddingBottom: '5%', paddingRight: '12%', paddingLeft: '12%', margin: '5%', },
  featuretxtImg: { margin: '5%', },

  txt1: { color: '#3f94fc', fontSize: 13, fontWeight: '500' },
  txt2: { color: '#818b94', fontSize: 12 },
  txt3cont: { flex: 2, justifyContent: 'center', alignItems: 'center' },
  txt3: { color: '#a3adb4', fontSize: 10 }
}
const { width, height } = Dimensions.get('window');

class ScrolCards extends Component {
  constructor() {
    super();
    this.state = {
      size: { width, height },
      featuredArr: [],
      imageArr: []
    };
  }
  _onLayoutDidChange = (e) => {
    const layout = e.nativeEvent.layout;
    this.setState({ size: { width: layout.width, height: layout.height } });
  }
  Detailed(data) {
    if (this.props.auth === false) {
      Actions.login({ quizDetails: data })
    } else {
      Actions.play({ data });
    }

    // Actions.login()
    // Actions.play({ data });
  }
  componentDidMount() {
    let arr = [];
    for (var i = 0; i < this.props.data.length; i++) {
      if (this.props.data[i].name.feature === true) {
        arr.push(this.props.data[i]);
      }
    }
    this.setState({
      featuredArr: arr
    })

    let imageArr = this.state.imageArr;
    // if (Actions.currentScene === 'myhome') {
    //   arr.map((v, i) => {
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
  componentWillReceiveProps(nextProps) {
    console.log('hello receive', nextProps)
    let arr = [];
    for (var i = 0; i < nextProps.data.length; i++) {
      if (nextProps.data[i].name.feature === true) {
        arr.push(nextProps.data[i]);
      }
    }
    this.setState({
      featuredArr: arr
    })
    console.log(arr, 'arrrrrrr')
    let imageArr = this.state.imageArr;
    // if (Actions.currentScene === 'myhome') {

    //   arr.map((v, i) => {
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
    const { data } = this.props;
    return (
      <View style={{ height: this.state.featuredArr.length !== 0 ? 270 : null }}>
        <View style={{ flex: 1 }} onLayout={this._onLayoutDidChange}>
          <Carousel hideIndicators={false} delay={4000} animate={true} indicatorOffset={0} inactiveIndicatorColor="#b3b3b3" indicatorColor="#00bcd4" style={this.state.size} autoplay pageInfo >
            {this.state.featuredArr.map((v, i) => {
              return (
                <TouchableOpacity onPress={() => this.Detailed(v)} key={i} >
                  <View style={[this.state.size]}>
                    <ScrollCard>
                      <CardSection >
                        {
                          (v.name.imgUrl && v.name.imgUrl !== '' && v.name.imgUrl !== 'https' && v.name.imgUrl !== 'http' && v.name.imgUrl !== 'https://') ? (
                            <Image style={styles.cardImage} source={{ uri: v.name.imgUrl }} />
                            // <ImageLoading styleProp={styles.cardImage} sourceProp={v.name.imgUrl} />

                          ) :
                            <ImageLoading styleProp={styles.cardImage} sourceProp={v.name.introVideos} />

                          // (!this.state.imageArr[i]) ?
                          //   <View style={styles.cardImageView} ></View> :
                          //   // <Image style={styles.cardImage} source={{ uri: this.state.imageArr[i] }} />
                          //   <ImageLoading styleProp={styles.cardImage} sourceProp={this.state.imageArr[i]} />

                        }
                        {/* <Image style={styles.cardImage} source={{ uri: this.state.imageArr[i] }} /> */}
                        <View style={styles.feature} >
                          {/* <Text style={styles.featuretxt} >FEATURED</Text> */}
                          <Image style={styles.featuretxtImg} source={require("../../images/feature.png")} />

                        </View>
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
                            {/* <Text style={styles.txt2} >By Debbiestrazza</Text> */}
                          </View>
                        </View>
                      </CardItem>
                    </ScrollCard>
                  </View>
                </TouchableOpacity>

              );
            })}
          </Carousel>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return {
    auth: state.AuthReducer.isLoggedIn,
  };
};
export default connect(mapStateToProps, null)(ScrolCards);