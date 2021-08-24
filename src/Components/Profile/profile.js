import React, { Component } from 'react';
import { StyleSheet, Text, StatusBar, View, TouchableOpacity } from 'react-native';
import { Container, Tab, Tabs, } from 'native-base';
import Header from '../myComponents/header';
import Result from '../myComponents/result';
import Favourite from '../myComponents/favourites';
import Circle from '../myComponents/circles';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import MyStatusBar from '../statusbar';
import * as firebase from "firebase";
import Toast from 'react-native-simple-toast';

class Profile extends Component {
  constructor(props) {
    super(props);
    console.log('5555555555555555555555', this.props.allData.allData);
    let allFavoriteData = [];
    if (this.props.isNetAvailable === true) {
      firebase.database().ref('/favorite/').once('value', (favouriteCoreData) => {
        console.log('maindataarrarrarrarrarr', favouriteCoreData.val());
        let favouriteData = favouriteCoreData.val();
        if (favouriteData !== null) {
          let arr = this.props.allData.allData;
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].name.titles.toLowerCase() in favouriteData && firebase.auth().currentUser && firebase.auth().currentUser.uid && firebase.auth().currentUser.uid in favouriteData[arr[i].name.titles.toLowerCase()]) {
              // arr[i].name.favourite = true;
              allFavoriteData.push(this.props.allData.allData[i]);

              // console.log('favourite found', arr[i].name);
            }
            else {
              // console.log('not found',arr[i].name.titles.toLowerCase());

            }
          }
        }
      })
    }
    else {
      Toast.show('Please check internet connection.');

    }

    // for (var i = 0; i < this.props.allData.allData.length; i++) {
    //   if (this.props.allData.allData[i].name.favourite === true) {
    //     allFavoriteData.push(this.props.allData.allData[i]);
    //   }
    // }
    this.state = { favouriteData: [] }
    this.state = {
      initialPage: 1,
      favouriteData: allFavoriteData
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (Actions.currentScene === 'Profile') {
      return true;
    }
    else {
      return false;
    }
  }
  componentDidMount() {
    // console.log(this.state.favouriteData, '9999999999ssssssssss');
  }
  Login() {
    Actions.login()
  }
  SiginUp() {
    Actions.signup()
  }
  render() {
    const CheckAuth = () => {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '30%' }}>
          <View style={{ width: '70%', }}>
            <Text style={{ textAlign: 'center', fontSize: 16 }}>
              Looks empty here, but that's easy to fix.
              You just need an account to start learning with MAGE.
          </Text>
          </View>
          <View style={{ flexDirection: 'row', width: '60%', marginTop: '10%' }}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <TouchableOpacity style={{
                borderRadius: 8,
                backgroundColor: '#2196f3',
                padding: '10%',
                shadowColor: '#e6ebf3',
                shadowOffset: { width: 4, height: 8 },
                shadowOpacity: 7,
                shadowRadius: 12,
                elevation: 12,
              }} onPress={this.Login.bind(this)}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
                  Log in
              </Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity style={{
                borderRadius: 8,
                backgroundColor: '#2196f3',
                padding: '10%',
                shadowColor: '#e6ebf3',
                shadowOffset: { width: 4, height: 8 },
                shadowOpacity: 7,
                shadowRadius: 12,
                elevation: 12,
              }} onPress={this.SiginUp.bind(this)}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
                  Sign up
              </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    }
    return (
      <Container style={{ backgroundColor: '#ffffff', width: '102%', paddingHorizontal: 1, marginLeft: - 1 }
      }>
        <MyStatusBar backgroundColor="#07b3fd" barStyle="light-content" />
        <Header name="Profile" />
        {
          (this.props.auth === true) ? (

            (this.props.circleClick === true) ?
              (<Tabs tabBarUnderlineStyle={{ backgroundColor: '#feeb08', height: 2 }} initialPage={1}>
                <Tab heading="Results" tabStyle={{ backgroundColor: '#2196f3' }} textStyle={{ color: 'white', fontSize: 12 }} activeTabStyle={{ backgroundColor: '#2196f3' }} activeTextStyle={{ color: '#feeb08', fontSize: 12 }}>
                  <Result />
                </Tab>
                <Tab active heading="Circles" tabStyle={{ backgroundColor: '#2196f3' }} textStyle={{ color: 'white', fontSize: 12 }} active activeTabStyle={{ backgroundColor: '#2196f3' }} activeTextStyle={{ color: '#feeb08', fontSize: 12 }}>
                  <Circle />
                </Tab>
                <Tab heading="Favourites" tabStyle={{ backgroundColor: '#2196f3' }} textStyle={{ color: 'white', fontSize: 12 }} activeTabStyle={{ backgroundColor: '#2196f3' }} activeTextStyle={{ color: '#feeb08', fontSize: 12 }}>
                  <Favourite fav={this.state.favouriteData} />
                </Tab>
              </Tabs>) :
              (<Tabs tabBarUnderlineStyle={{ backgroundColor: '#feeb08', height: 2 }}>
                <Tab heading="Results" tabStyle={{ backgroundColor: '#2196f3' }} textStyle={{ color: 'white', fontSize: 12 }} activeTabStyle={{ backgroundColor: '#2196f3' }} activeTextStyle={{ color: '#feeb08', fontSize: 12 }}>
                  <Result />
                </Tab>
                <Tab heading="Circles" tabStyle={{ backgroundColor: '#2196f3' }} textStyle={{ color: 'white', fontSize: 12 }} activeTabStyle={{ backgroundColor: '#2196f3' }} activeTextStyle={{ color: '#feeb08', fontSize: 12 }}>
                  <Circle />
                </Tab>
                <Tab heading="Favourites" tabStyle={{ backgroundColor: '#2196f3' }} textStyle={{ color: 'white', fontSize: 12 }} activeTabStyle={{ backgroundColor: '#2196f3' }} activeTextStyle={{ color: '#feeb08', fontSize: 12 }}>
                  <Favourite fav={this.state.favouriteData} />
                </Tab>
              </Tabs>)



          ) : (
              <Tabs tabBarUnderlineStyle={{ backgroundColor: '#feeb08', height: 2 }} initialPage={1}>
                <Tab heading="Results" tabStyle={{ backgroundColor: '#2196f3' }} textStyle={{ color: 'white', fontSize: 12 }} activeTabStyle={{ backgroundColor: '#2196f3' }} activeTextStyle={{ color: '#feeb08', fontSize: 12 }}>
                  <CheckAuth />
                </Tab>
                <Tab active heading="Circles" tabStyle={{ backgroundColor: '#2196f3' }} active textStyle={{ color: 'white', fontSize: 12 }} activeTabStyle={{ backgroundColor: '#2196f3' }} activeTextStyle={{ color: '#feeb08', fontSize: 12 }}>
                  <CheckAuth />
                </Tab>
                <Tab heading="Favourites" tabStyle={{ backgroundColor: '#2196f3' }} textStyle={{ color: 'white', fontSize: 12 }} activeTabStyle={{ backgroundColor: '#2196f3' }} activeTextStyle={{ color: '#feeb08', fontSize: 12 }}>
                  <CheckAuth />
                </Tab>
              </Tabs>



            )
        }
      </Container >

    );
  }
}

const styles = StyleSheet.create({

});


const mapStateToProps = (state) => {
  return {
    auth: state.AuthReducer.isLoggedIn,
    mageFlag: state.AuthReducer.mageFlag,
    allData: state.loadEveryThing,
    isNetAvailable: state.AuthReducer.connectionStatus

  };
}
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
export default connect(mapStateToProps, null)(Profile);
