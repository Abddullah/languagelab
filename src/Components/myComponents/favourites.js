import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Content, Card, CardItem } from 'native-base';
import LinkPreview from 'react-native-link-preview';
import { Actions } from "react-native-router-flux";
import { CardSection } from "../Common";

export default class Favourite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageArr: []
    }

    this.props.fav.map((v, i) => {
      LinkPreview.getPreview(v.name.introVideos)
        .then(data => {
          // console.log(data.images[0], 'sjdgjk')
          image = data.images[0];
          let imageArr = this.state.imageArr;
          imageArr[i] = image
          this.setState({
            imageArr
          })
        });
    })
  }
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps, 'nextProps');
  }
  goToDetails(data) {
    Actions.play({ data });
  }
  render() {
    return (
      <Content style={{ backgroundColor: '#ffffff' }}>
        <View style={{ flex: 1 }} >
          {
            (this.props.fav.length && this.props.fav.length > 0) ? (
              this.props.fav.map((favourite, ind) => {
                return (
                  <TouchableOpacity onPress={this.goToDetails.bind(this, favourite)} key={ind}>
                    <Card style={styles.card}>
                      <View>
                        <CardSection>
                          {
                            (favourite.name.imgUrl && favourite.name.imgUrl !== '' && favourite.name.imgUrl !== 'https' && favourite.name.imgUrl !== 'http' && favourite.name.imgUrl !== 'https://') ? (
                              <Image style={styles.cardImage} source={{ uri: favourite.name.imgUrl }} />
                            ) :
                              <Image style={styles.cardImage} source={{ uri: this.state.imageArr[ind] }} />
                          }
                          {/* <Image style={{ width: '100%', height: 140 }} source={{ uri: this.state.imageArr[ind] }} /> */}
                          <View style={styles.imgtxtcont} >
                            <View style={styles.qsCont} >
                              <Text style={styles.imgtxt} >{favourite.questions.length < 10 ? `0${favourite.questions.length}` : favourite.questions.length} Questions</Text>
                            </View>
                          </View>
                        </CardSection>
                      </View>
                      <CardItem>
                        <View style={{ flexDirection: 'row' }} >
                          <View style={{ flex: 5 }} >
                            <Text style={styles.txt1} >{favourite.name.titles}</Text>
                            {/* <Text style={styles.txt2} ></Text> */}
                          </View>
                          <View style={styles.txt3cont} >
                            {(favourite.name.playcount) ? (
                              <Text style={styles.txt3} >{favourite.name.playcount} Plays</Text>
                            ) :
                              (<Text style={styles.txt3} >0 Plays</Text>

                              )}
                          </View>
                        </View>
                      </CardItem>
                    </Card>
                  </TouchableOpacity>)
              })
            ) :
              (
                // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%' }} >
                //   <Text style={styles.txt1NotFound}>You hav not marked any set favourite.</Text>
                // </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '30%' }}>
                  <View style={{ width: '70%', }}>
                    <Text style={{ textAlign: 'center', fontSize: 16 }}>
                      You have not marked any set favourite.
                  </Text>
                  </View>
                </View>
              )

          }
          {/* <Card style={styles.card} >
            <View>
              <Image style={{ width: '100%' }} source={require('../images/top_pick_card02.png')} />
              <View style={styles.imgtxtcont} >
                <Text style={styles.imgtxt} >09 Questions</Text>
              </View>
            </View>
            <CardItem>
              <View style={{ flexDirection: 'row' }} >
                <View style={{ flex: 1 }} >
                  <Text style={styles.txt1} >Autumn Season</Text>
                  <Text style={styles.txt2} >by Debbiestrazza</Text>
                </View>
                <View style={styles.txt3cont} >
                  <Text style={styles.txt3} >Created 1 Year ago {"  "} 75.7K Plays</Text>
                </View>
              </View>
            </CardItem>
          </Card> */}
        </View>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  cardImage: { height: '100%', width: "100%", resizeMode: 'contain', overflow: "hidden" },

  card: {
    marginTop: '6%',
    overflow: 'hidden',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 10
  },
  imgtxtcont: { position: 'absolute', width: '100%', height: '100%', alignItems: 'flex-end', justifyContent: 'flex-end' },

  imgtxt: { color: '#e5d100', backgroundColor: 'transparent' },
  qsCont: { borderRadius: 17, backgroundColor: 'rgba(0, 0, 0, .5)', paddingTop: '2.5%', paddingBottom: '2.5%', paddingRight: '6%', paddingLeft: '6%', margin: '5%', },

  txt1: {
    color: '#338ad7',
    fontSize: 11,
    fontWeight: '500'
  },
  txt1NotFound: {
    color: '#338ad7',
    fontSize: 32,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: '30%'
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  txt2: {
    color: '#818b94',
    fontSize: 11
  },
  txt3cont: {
    flex: 2,
    // justifyContent: 'center',
    alignItems: 'flex-end'
  },
  txt3: {
    color: '#818b94',
    fontSize: 10
  }
})