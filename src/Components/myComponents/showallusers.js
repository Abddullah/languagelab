import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Content, Card, CardItem, Button, Item, Input, Icon, Text } from 'native-base';
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { bringAllUsers, getCircleMembers } from '../../Actions/alldata';
import * as firebase from "firebase";
import MyStatusBar from '../statusbar';

class ShowAllUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allUsers: [],
            filteredUser: null,
            circleMembers: [],
            originalAllUsers: []
        }
    }
    componentWillMount() {
        this.props.bringAllUsers();
        this.props.getCircleMembers();
    }
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps, 'sdkjhsld')
        // if (nextProps.getCircleMembersStatus) {
        //     console.log('hello')
        // }
        this.setState({
            allUsers: [],
            circleMembers: nextProps.circleMembers
        })

        let allUsersClone = nextProps.allUsers
        let circleMembersClone = nextProps.circleMembers
        // console.log(allUsersClone, circleMembersClone, '222222222')
        if (circleMembersClone.length && circleMembersClone.length > 0 && allUsersClone.length && allUsersClone.length > 0) {
            // console.log('aaaa');
            for (var i = 0; i < circleMembersClone.length; i++) {
                // console.log('bbbbbb', circleMembersClone[i]);
                for (var j = 0; j < allUsersClone.length; j++) {
                    // console.log('cccccccccccccccccccccccccccc', allUsersClone[j]);
                    if (circleMembersClone[i].email === allUsersClone[j].email) {
                        allUsersClone[j].alreadyMembered = true;
                    }

                }
            }
        }
        // console.log(allUsersClone, 'hello world')
        this.setState({
            allUsers: [],
            originalAllUsers: allUsersClone
        })
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (Actions.currentScene === 'showAllUsers') {
            return true;
        }
        else {
            return false;
        }
    }
    searchData(search) {
        if (search === '') {
            this.setState({
                allUsers: [],
            })
        } else {
            var searchKeyword = search.toLowerCase();
            var searchingArr = this.state.originalAllUsers;
            var filteredUser = [];
            for (var i = 0; i < searchingArr.length; i++) {
                if (searchingArr[i].email.toLowerCase().search(searchKeyword) !== -1) {
                    filteredUser.push(searchingArr[i]);
                }
                else if ('userName' in searchingArr[i] && searchingArr[i].userName.toLowerCase().search(searchKeyword) !== -1) {
                    filteredUser.push(searchingArr[i]);
                }
            }
            this.setState({ allUsers: filteredUser })


        }
    }
    addToCircle(userToAddToCircle) {
        // console.log(userToAddToCircle);
        let currentUser = firebase.auth().currentUser.uid;
        firebase.database().ref('/circleMembers/' + currentUser + '/').push({ circleMemberUid: userToAddToCircle.uid });
        Actions.profile({ circleClick: true });
    }


    render() {



        // if (this.state.allUsers !== undefined && this.state.circleMembers !== undefined && this.state.circleMembers.length && this.state.circleMembers.length > 0 && this.state.allUsers.length && this.state.allUsers.length > 0) {
        //     for (var i = 0; i < this.state.circleMembers.length; i++) {
        //         // console.log(this.state.circleMembers[i],'++++++++++');
        //         for (var j = 0; j < this.state.allUsers.length; i++) {
        //             console.log(this.state.allUsers[j], '0000000000000');
        //             console.log(this.state.circleMembers[i], '3333333333333333');

        //             // console.log(this.state.circleMembers[i], 'inside loop here', this.state.allUsers[j],this.state.circleMembers[i].email === this.state.allUsers[j].email )
        //             // if(this.state.circleMembers[i].email === this.state.allUsers[j].email  ){
        //             //     this.state.allUsers[j].alreadyMembered = true;
        //             // }
        //         }
        //     }
        // }
        // console.log('after here', this.state.allUsers)

        return (
            <View style={{ flex: 1 }} >
                <MyStatusBar backgroundColor="#07b3fd" barStyle="light-content" />

                <Item style={{ backgroundColor: 'white', paddingLeft: 10 }} >
                    <TouchableOpacity onPress={() => Actions.pop()} >
                        <Icon name='ios-arrow-back' />
                    </TouchableOpacity>
                    <Input onChangeText={this.searchData.bind(this)} placeholder='Search by username' autoFocus={true} />
                </Item>
                <Content>
                    {
                        (this.state.allUsers.length > 0) ? (
                            this.state.allUsers.map((v, i) => {
                                if (v.uid === firebase.auth().currentUser.uid) {
                                    // console.log('exiting user')
                                    return null
                                }
                                // if ('alreadyMembered' in v ) {
                                //     console.log(' user exist avhsdlkfhslkj')
                                //     // return null
                                // }
                                // console.log(' users ', v)
                                return (
                                    ('userName' in v) ?
                                        <View key={i} style={styles.card}  >
                                            <View style={{ flex: 4 }} >
                                                <Text style={{ fontSize: 15, fontWeight: '500' }} >{v.userName}</Text>
                                            </View>
                                            <View style={{ flex: 1 }} >
                                                {'alreadyMembered' in v ?
                                                    <TouchableOpacity style={[styles.btn, { backgroundColor: 'green' }]} >
                                                        <Icon style={{ color: 'white' }} name='md-checkmark' />
                                                    </TouchableOpacity> :
                                                    <TouchableOpacity style={styles.btn} onPress={this.addToCircle.bind(this, v)}>
                                                        <Icon style={{ color: 'white' }} name='md-add' />
                                                    </TouchableOpacity>}
                                            </View>
                                        </View>
                                        :
                                        <View key={i} style={styles.card}  >
                                            <View style={{ flex: 4 }} >
                                                <Text style={{ fontSize: 15, fontWeight: '500' }} >{v.email}</Text>
                                            </View>
                                            <View style={{ flex: 1 }} >
                                                {'alreadyMembered' in v ?
                                                    <TouchableOpacity style={[styles.btn, { backgroundColor: 'green' }]} onPress={this.addToCircle.bind(this, v)}>
                                                        <Icon style={{ color: 'white' }} name='md-checkmark' />
                                                    </TouchableOpacity> :
                                                    <TouchableOpacity style={styles.btn} onPress={this.addToCircle.bind(this, v)}>
                                                        <Icon style={{ color: 'white' }} name='md-add' />
                                                    </TouchableOpacity>}
                                            </View>
                                        </View>
                                )
                            })
                        ) : (
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '30%' }}>
                                    <View style={{ width: '70%', }}>
                                        <Text style={{ textAlign: 'center', fontSize: 16 }}>
                                            No user found.
                           </Text>
                                    </View>
                                </View>)
                    }
                    {/* {
                        this.state.filteredUser !== null ?
                            this.state.filteredUser.length === 0 ?
                                <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }} >
                                    <Text >Sorry there is no match</Text>
                                </View> :


                                this.state.filteredUser.map((user, index) => {

                                    return this.state.circleMembers.map((members, i) => {
                                        if (user.uid === firebase.auth().currentUser.uid) {
                                            return null
                                        }
                                        // console.log(members.userName === user.userName, members.email === user.email, user, members)
                                        if (members.userName === user.userName || members.email === user.email) {
                                            return (('userName' in members) ?
                                                <View key={index} style={styles.card}  >
                                                    <View style={{ flex: 4 }} >
                                                        <Text style={{ fontSize: 15, fontWeight: '500' }} >{members.userName}</Text>
                                                    </View>
                                                    <View style={{ flex: 1 }} >
                                                        <TouchableOpacity style={[styles.btn, { backgroundColor: 'green' }]} onPress={this.addToCircle.bind(this, user)}>
                                                            <Icon style={{ color: 'white' }} name='md-checkmark' />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                                :
                                                <View key={index} style={styles.card}  >
                                                    <View style={{ flex: 4 }} >
                                                        <Text style={{ fontSize: 15, fontWeight: '500' }} >{members.email}</Text>
                                                    </View>
                                                    <View style={{ flex: 1 }} >
                                                        <TouchableOpacity style={[styles.btn, { backgroundColor: 'green' }]} onPress={this.addToCircle.bind(this, user)}>
                                                            <Icon style={{ color: 'white' }} name='md-checkmark' />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>)
                                        } else {
                                            return (
                                                ('userName' in user) ?
                                                    <View key={index} style={styles.card}  >
                                                        <View style={{ flex: 4 }} >
                                                            <Text style={{ fontSize: 15, fontWeight: '500' }} >{user.userName}</Text>
                                                        </View>
                                                        <View style={{ flex: 1 }} >
                                                            <TouchableOpacity style={styles.btn} onPress={this.addToCircle.bind(this, user)}>
                                                                <Icon style={{ color: 'white' }} name='md-add' />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                    :
                                                    <View key={index} style={styles.card}  >
                                                        <View style={{ flex: 4 }} >
                                                            <Text style={{ fontSize: 15, fontWeight: '500' }} >{user.email}</Text>
                                                        </View>
                                                        <View style={{ flex: 1 }} >
                                                            <TouchableOpacity style={styles.btn} onPress={this.addToCircle.bind(this, user)}>
                                                                <Icon style={{ color: 'white' }} name='md-add' />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>

                                            )
                                        }

                                    })

                                }) : this.state.allUsers.map((user, index) => {
                                    if (user.uid === firebase.auth().currentUser.uid) {
                                        return null
                                    }
                                    return (
                                        ('userName' in user) ?
                                            <View key={index} style={styles.card}  >
                                                <View style={{ flex: 4 }} >
                                                    <Text style={{ fontSize: 15, fontWeight: '500' }} >{user.userName}</Text>
                                                </View>
                                                <View style={{ flex: 1 }} >
                                                    <TouchableOpacity style={styles.btn} onPress={this.addToCircle.bind(this, user)}>
                                                        <Icon style={{ color: 'white' }} name='md-add' />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            :
                                            <View key={index} style={styles.card}  >
                                                <View style={{ flex: 4 }} >
                                                    <Text style={{ fontSize: 15, fontWeight: '500' }} >{user.email}</Text>
                                                </View>
                                                <View style={{ flex: 1 }} >
                                                    <TouchableOpacity style={styles.btn} onPress={this.addToCircle.bind(this, user)}>
                                                        <Icon style={{ color: 'white' }} name='md-add' />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                    )
                                })
                    }
                </Content> */}
                </Content>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        width: '90%', alignSelf: 'center',
        marginVertical: 10, flexDirection: 'row',
        alignItems: 'center', backgroundColor: '#FFFFFF',
        paddingHorizontal: 10, paddingVertical: 10, borderRadius: 10,
        shadowColor: '#e1e4ec', shadowOpacity: 12, elevation: 3, shadowOffset: { width: -1, height: 1 },
    },
    btn: { backgroundColor: '#07b3fd', height: 40, width: 40, alignSelf: 'flex-end', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }
})


const mapStateToProps = state => {
    // console.log(state);
    return {
        circleMembers: state.loadEveryThing.getCircleMembers,
        allUsers: state.loadEveryThing.allUsers,
        //   allData: state.loadEveryThing,
        //   userDatas: state.userdata,

    };
};
const mapDispatchToProps = (dispatch) => {
    return {

        bringAllUsers: () => {
            dispatch(bringAllUsers());
        },
        getCircleMembers: () => {
            dispatch(getCircleMembers());
        },

    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ShowAllUsers);
