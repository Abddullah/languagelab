import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Dialog } from "react-native-simple-dialogs";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import Toast from 'react-native-simple-toast';

class DialogPlayBox extends Component {
  constructor(props){
    super(props);
  }
  MageCircle() {
    this.props.outsideTouch(false);
    this.props.videoBoolFlag.setState({showVideo: false})
    Actions.profile({ circleClick: true });

    // if (this.props.auth === true) {
    //   this.props.outsideTouch(false);
    //   Actions.profile({ circleClick: true });
    // }
    // else {
    //   this.props.thatData.setState({
    //     authRequiredDialogeBoxVisible: true
    //   })
    // }
    // Actions.profile({ circleClick: true });
    // Actions.mageCircle({ data: this.props.quizData });
  }
  playSolo() {
    if (this.props.isNetAvailable === true) {

      if (this.props.auth === true) {
        this.props.outsideTouch(false);
        this.props.soloQuizStart();
      }
      else {
        this.props.outsideTouch(false);

        this.props.thatData.setState({
          dialogVisible: false,
          authRequiredDialogeBoxVisible: true
        })
      }
    }
    else {
      Toast.show('Please check internet connection.');

    }
    // this.props.soloQuizStart();
  }
  render() {
    return (
      <Dialog contentStyle={{ borderRadius: 5 }} visible={this.props.visible} onTouchOutside={() => this.props.outsideTouch(false)} >
        <View>
          <Text style={{ fontWeight: "bold", textAlign: "center" }}>Choose your Opponent</Text>
          <View style={styles.dialogueline} />
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <View style={styles.dialogcard}>
                <Image style={{ height: 40, width: 40 }} source={require("../images/circle_coloured.png")} />
                <TouchableOpacity onPress={this.MageCircle.bind(this)}>
                  <Image style={{ marginTop: 20, height: 30, width: 80 }} source={require("../images/mage_circle_btn.png")} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.dialogcard}>
                <Image style={{ height: 50, width: 50 }} source={require("../images/dialogueimage.png")} />
                <TouchableOpacity onPress={this.playSolo.bind(this)} >
                  <Image style={{ marginTop: 15, height: 30, width: 80 }} source={require("../images/solo_btn.png")} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Dialog>
    )
  }
}


const mapStateToProps = state => {
  // console.log(state);
  return {
    auth: state.AuthReducer.isLoggedIn,
    // allData: state.loadEveryThing,
    // userDatas: state.userdata,
    isNetAvailable: state.AuthReducer.connectionStatus

  };
};
const mapDispatchToProps = (dispatch) => {
  return {

    // alldata: (authStatus) => {
    //   dispatch(alldata(authStatus));
    // },
    // addname: (data) => {
    //   dispatch(addname(data))
    // }

  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DialogPlayBox);


const styles = StyleSheet.create({
  dialogueline: {
    width: '10%',
    height: 2,
    backgroundColor: '#26293a',
    alignSelf: 'center',
    marginVertical: '5%'
  },
  dialogcard: {
    height: 150,
    borderRadius: 5,
    width: '90%',
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: 'rgba(255, 255, 255, .3)',
    shadowColor: '#fff',
    shadowOpacity: .4,
    elevation: 5,
    shadowOffset: { width: -1, height: -1 },
    justifyContent: 'center',
    alignItems: 'center'
  }
})