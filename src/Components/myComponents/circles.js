import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { Content, Card, CardItem, Button } from 'native-base';
import { Actions } from "react-native-router-flux";
import { getCircleMembers } from '../../Actions/alldata';
import { connect } from "react-redux";
import Toast from 'react-native-simple-toast';

class Circle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      circleMembers: [],
      loader: true
    }
  }
  componentWillMount() {

    if (this.props.isNetAvailable === true) {
      this.props.getCircleMembers();
    }
    else {
      Toast.show('Please check internet connection.');

    }
  }
  showAllUsers() {
    // console.log('click show all users')
    Actions.showAllUsers()
  }
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.circleMembers, '//////', nextProps.allUsers);
    this.setState({ circleMembers: nextProps.circleMembers, loader: false })
  }

  openCircle(circleMember) {
    if ('online' in circleMember && circleMember.online === true) {
      let data = {
        onlineUser: circleMember,
        quiz: {}
      }
      Actions.message({ data })
    }
    else {
      console.log('user is not online');
    }
  }
  render() {
    let deviceHeight = Dimensions.get('window').height
    console.log(deviceHeight / 1.85, 'deviceHeightdeviceHeightdeviceHeightdeviceHeight')

    return (
      <Content style={{ backgroundColor: '#ffffff' }} >
        <View style={{ flex: 1 }} >
          <View style={{ flexDirection: 'row', marginTop: '6%', marginBottom: '1%', marginHorizontal: '3%' }} >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
              <Text style={{ fontSize: 10, color: '#014171', fontWeight: 'bold' }} >CIRCLE MEMBER</Text>
            </View>
            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }} >
              <View style={{ width: '92%', backgroundColor: '#dfdee0', height: 1 }} ></View>
            </View>
          </View>
          <View style={{ marginTop: '3%', height: deviceHeight / 1.80 }} >
            <Content>

              {
                (this.state.circleMembers && this.state.circleMembers.length > 0) ? (
                  this.state.circleMembers.map((circleMember, ind) => {
                    return (
                      <TouchableOpacity key={ind} onPress={this.openCircle.bind(this, circleMember)} >
                        <View style={{ width: '90%', alignSelf: 'center', shadowOffset: { width: -1, height: -1 }, marginTop: '4%', flexDirection: 'row', marginVertical: 10, backgroundColor: 'white', elevation: 5, paddingVertical: 10 }} >
                          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                            <Image source={require('../images/user_icon_dark.png')} />
                          </View>
                          {
                            ('userName' in circleMember) ?
                              (
                                <View style={{ flex: 4, justifyContent: 'center' }} >
                                  <Text style={{ color: '#1a1c19', fontWeight: '500', marginLeft: '5%' }} >{circleMember.userName}</Text>
                                </View>
                              ) :
                              (
                                <View style={{ flex: 4, justifyContent: 'center' }} >
                                  <Text style={{ color: '#1a1c19', fontWeight: '500', marginLeft: '5%' }} >{circleMember.email}</Text>
                                </View>
                              )
                          }
                          {

                            ('online' in circleMember && circleMember.online === true) ? (
                              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                                <View style={{ width: 15, height: 15, backgroundColor: 'green', borderRadius: 50 }} />
                              </View>
                            ) : (<View style={{ flex: 1 }} />)
                          }
                        </View>
                      </TouchableOpacity>
                    )
                  })

                ) : (this.state.loader) ? <ActivityIndicator /> :
                    (
                      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '30%' }}>
                        <View style={{ width: '70%', }}>
                          <Text style={{ textAlign: 'center', fontSize: 16 }}>
                            You have no user in your circle.
                           </Text>
                        </View>
                      </View>
                    )
              }
            </Content>
          </View>
          <View style={{ marginTop: 30 }} >
            <Button onPress={this.showAllUsers.bind(this)} style={{ backgroundColor: '#2196f3', width: '80%', alignSelf: 'center', justifyContent: 'center', borderRadius: 5 }} >
              <Text style={{ color: 'white' }} >Add More</Text>
            </Button>
          </View>
        </View>
      </Content>
    );
  }
}
const mapStateToProps = state => {
  // console.log(state);
  return {
    allUsers: state.loadEveryThing.allUsers,
    circleMembers: state.loadEveryThing.getCircleMembers,
    // allUsers: state.loadEveryThing.allUsers,
    //   allData: state.loadEveryThing,
    //   userDatas: state.userdata,
    isNetAvailable: state.AuthReducer.connectionStatus

  };
};
const mapDispatchToProps = (dispatch) => {
  return {

    getCircleMembers: () => {
      dispatch(getCircleMembers());
    },
    //   addname: (data) => {
    //     dispatch(addname(data))
    //   }

  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Circle);