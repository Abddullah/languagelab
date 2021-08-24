import React, { Component } from 'react';
import { StyleSheet, Text, StatusBar, View, Switch, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Container, Content, List, ListItem, Icon } from 'native-base';
import Header from '../myComponents/header';
import Result from '../myComponents/result';
import Favourite from '../myComponents/favourites';
import Circle from '../myComponents/circles';
import MyStatusBar from '../statusbar';
import { LogOut } from '../../Actions/logoutAction';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

class Settings extends Component {

    constructor() {
        super();
        this.state = {
            switch1: false,
            switch2: false
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (Actions.currentScene === 'settings') {
            return true;
        }
        else {
            return false;
        }
    }
    render() {
        return (
            <Container style={{ backgroundColor: '#ffffff' }}>
                <MyStatusBar backgroundColor="#07b3fd" barStyle="light-content" />
                <Header name="Settings" />
                <View style={{ flex: 1 }} >
                    <Content>
                        {/* <View style={styles.title} >
                            <View style={styles.txtcont} >
                                <Text style={styles.txt} >G A M E</Text>
                            </View>
                            <View style={styles.linecont} >
                                <View style={styles.line} ></View>
                            </View>
                        </View> */}
                        <View style={{ marginTop: '2%' }} >
                            {/* <View style={styles.gamelist} >
                                <View style={styles.list} >
                                    <Text style={{ color: '#00345e' }} >Music</Text>
                                </View>
                                <View style={styles.switch} >
                                    <Switch thumbTintColor="white" onTintColor="#2196f3" style={{ marginRight: '10%' }} onValueChange={() => this.setState({ switch1: !this.state.switch1 })} value={this.state.switch1} />
                                    <Icon name="ios-arrow-forward" style={{ fontSize: 10 }} />
                                </View>
                            </View>
                            <View style={styles.gamelist} >
                                <View style={styles.list} >
                                    <Text style={{ color: '#00345e' }} >Sound Effects</Text>
                                </View>
                                <View style={styles.switch} >
                                    <Switch thumbTintColor="white" onTintColor="#2196f3" style={{ marginRight: '10%' }} onValueChange={() => this.setState({ switch2: !this.state.switch2 })} value={this.state.switch2} />
                                    <Icon name="ios-arrow-forward" style={{ fontSize: 10 }} />
                                </View>
                            </View> */}
                            <View style={[styles.title, { marginTop: '10%' }]} >
                                <View style={styles.txtcont} >
                                    <Text style={styles.txt} >G E N E R A L</Text>
                                </View>
                                <View style={[styles.linecont, { flex: 4 }]} >
                                    <View style={styles.line} ></View>
                                </View>
                            </View>
                            <View style={{ marginTop: '2%' }} >
                                <TouchableOpacity style={[styles.gamelist, { paddingVertical: '4%' }]} >
                                    <View style={styles.list} >
                                        <Text style={{ color: '#00345e' }} >Version 1.00alpha</Text>
                                    </View>
                                    <View style={styles.switch} >
                                        <Icon name="ios-arrow-forward" style={{ fontSize: 10 }} />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.gamelist, { paddingVertical: '4%' }]}  >
                                    <View style={styles.list} >
                                        <Text style={{ color: '#00345e' }} >Terms & Conditions</Text>
                                    </View>
                                    <View style={styles.switch} >
                                        <Icon name="ios-arrow-forward" style={{ fontSize: 10 }} />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.gamelist, { paddingVertical: '4%' }]}  >
                                    <View style={styles.list} >
                                        <Text style={{ color: '#00345e' }} >Privacy Policy</Text>
                                    </View>
                                    <View style={styles.switch} >
                                        <Icon name="ios-arrow-forward" style={{ fontSize: 10 }} />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.gamelist, { paddingVertical: '4%' }]}  >
                                    <View style={styles.list} >
                                        <Text style={{ color: '#00345e' }} >Acknowledgements</Text>
                                    </View>
                                    <View style={styles.switch} >
                                        <Icon name="ios-arrow-forward" style={{ fontSize: 10 }} />
                                    </View>
                                </TouchableOpacity>
                                {
                                    (firebase.auth().currentUser && firebase.auth().currentUser !== null && firebase.auth().currentUser.uid) ?
                                        (
                                            <TouchableOpacity onPress={() => this.props.LogOut()} style={[styles.gamelist, { paddingVertical: '4%', borderBottomWidth: 0 }]}  >
                                                <View style={styles.list} >
                                                    <Text style={{ color: '#00345e' }} >Log Out</Text>
                                                </View>
                                                <View style={styles.switch} >
                                                    <Icon name="ios-arrow-forward" style={{ fontSize: 10 }} />
                                                </View>
                                            </TouchableOpacity>
                                        ) : null
                                }
                            </View>
                        </View>
                    </Content>
                </View>
            </Container>
        );
    }
}

export default connect(null, { LogOut })(Settings);

const styles = StyleSheet.create({
    title: {
        flexDirection: 'row',
        marginTop: '6%',
        marginBottom: '1%',
        marginHorizontal: '3%'
    },
    txtcont: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txt: {
        fontSize: 10,
        color: '#014171',
        fontWeight: 'bold'
    },
    linecont: {
        flex: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },
    line: {
        width: '95%',
        backgroundColor: '#d3d2d4',
        height: 1
    },
    list: {
        flex: 1,
        paddingLeft: '2%',
        justifyContent: 'center'
    },
    gamelist: {
        flexDirection: 'row',
        marginHorizontal: '5%',
        borderBottomWidth: 1,
        borderBottomColor: '#dfdee0',
        paddingVertical: '2%'
    },
    switch: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
});
