import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, PixelRatio, Dimensions, Platform, BackHandler } from 'react-native';
import YouTube from 'react-native-youtube';
import { Actions } from 'react-native-router-flux';

export default class RCTYouTubeExample extends React.Component {
    constructor() {
        super();
        this.state = {
            play: true,
            fullscreen: true,
        };
        this.handleBackButton = this.handleBackButton.bind(this)
    }

    // componentDidMount() {
    //     BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    // }

    // componentWillUnmount() {
    //     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    // }

    // handleBackButton() {
    //     this.setState({ isPlaying: false });
    //     Actions.pop()
    //     return true;
    // }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        this.setState({
            fullscreen: false
        })
        Actions.pop()
        return true;
    }

    componentWillMount() {
        let VideoUrl = this.props.data.name.introVideos;
        let youtubeVideoId = VideoUrl.slice(32, 43);
        this.setState({
            youtubeVideoId
        })
    }
    Back() {
        Actions.play();
    }

    render() {
        
        return (
            <View style={styles.playerContainer}>
            <YouTube ref="youtubePlayer"
              videoId={this.state.youtubeVideoId}
              play={true}
              rel={false}
              fullscreen={false}
              showFullscreenButton={true}
              showinfo={false}
              controls={1}
              apiKey="AIzaSyDGUWXktyrlaagqf-ro1wqfu8ApyrNn7wc"
              origin="https://www.youtube.com"
              style={styles.youtube}
                    
            />
          </View>
        );
    }
}

const styles = StyleSheet.create({
    playerContainer : { 
        alignItems: "center",
        justifyContent: "center",
        marginTop: 300,
        marginLeft: 50
      },
      youtube: {
        height: PixelRatio.roundToNearestPixel(Dimensions.get('window').width / (16 / 9)),
        alignSelf: 'stretch',
        backgroundColor: 'black',
        marginVertical: 10,
    },
});



                // <YouTube videoId={this.state.youtubeVideoId} play={true}
                //     fullscreen={false} loop={false}
                //     controls={1}
                //     onReady={(e) => { this.setState({ ready: true }) }}
                //     apiKey="AIzaSyDGUWXktyrlaagqf-ro1wqfu8ApyrNn7wc"
                //     style={{ width: 300, height: 150 }}
                //     onError={(e) => console.log('PlayVideo videoProgress event,videoPosition', e)}
                // />



                {/* <YouTube
                    ref={component => {
                        this._youTubeRef = component;
                    }}
                    apiKey="AIzaSyDGUWXktyrlaagqf-ro1wqfu8ApyrNn7wc"
                    videoId={this.state.youtubeVideoId}
                    play={this.state.isPlaying}
                    loop={false}
                    autoPlay={true}
                    fullscreen={this.state.fullscreen}
                    controls={2}
                    onError={e => {console.log(e); this.setState({ error: e.error })}}
                    onReady={e => this.setState({ height: 300 })}
                    style={{ alignSelf: 'stretch', height: this.state.height, backgroundColor: 'black', marginVertical: 10 }}
                    onChangeState={e => this.setState({ status: e.state })}
                    onChangeQuality={e => this.setState({ quality: e.quality })}
                    // onChangeFullscreen={() => this }
                    onProgress={e => console.log(e)}
                /> */}

                {/* <View style={{ marginTop: '10%', width: '100%', height: 80, justifyContent: 'center', alignItems: 'center', }}>
                    <TouchableOpacity style={{
                        borderRadius: 50,
                        backgroundColor: '#2196f3',
                        padding: '5%',
                        borderRadius: 50,
                        shadowColor: '#e6ebf3',
                        shadowOffset: { width: 2, height: 4 },
                        shadowOpacity: 2,
                        shadowRadius: 12,
                        elevation: 4,
                    }} onPress={this.Back.bind(this)}>
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                            Go Back To Play Game
                    </Text>
                    </TouchableOpacity>
                </View> */}
            // </ScrollView>