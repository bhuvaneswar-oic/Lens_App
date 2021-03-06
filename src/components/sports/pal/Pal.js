import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import styles from './styles';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import DynamicBtn from "../../dynamicButton/DynamicButton.component";
import ordinaryPalVideo from '../../../styles/images/lens/suns&sports/ordinary_pal.mp4';
import novaSunSportsPalVideo from '../../../styles/images/lens/suns&sports/novasun_pal.mp4';

class Pal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            btnList: [],
            video:ordinaryPalVideo,
            currentTime: 0,
            duration: 0,
            isFullScreen: false,
            isLoading: true,
            paused: false,
            playerState: PLAYER_STATES.PLAYING,
            screenType: 'content',
        }
    }

    componentDidMount = ()=>{

        this.setState({
         title:'Sun & Sports',
         video:ordinaryPalVideo,
         btnList: [
            {
                id: 0,
                name: "Ordinary Lens",
              },
              {
                id: 1,
                name: "Nova Sun & Sports",
              },
         ],
         
       
     })
   }
   btnPressed = item => {
    switch (item.id) {
      case 0:
        this.setState({
         video:ordinaryPalVideo,
        });
        break;

      case 1:
        this.setState({
          video:novaSunSportsPalVideo,
        });
        break;
      
      default:
    }
  };

    onSeek = seek => {
        //Handler for change in seekbar
        this.videoPlayer.seek(seek);
      };
    
      onPaused = playerState => {
        //Handler for Video Pause
        this.setState({
          paused: !this.state.paused,
          playerState,
        });
      };
    
      onReplay = () => {
        //Handler for Replay
        this.setState({ playerState: PLAYER_STATES.PLAYING });
        this.videoPlayer.seek(0);
      };
    
      onProgress = data => {
        const { isLoading, playerState } = this.state;
        // Video Player will continue progress even if the video already ended
        if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
          this.setState({ currentTime: data.currentTime });
        }
      };
      
      onLoad = data => this.setState({ duration: data.duration, isLoading: false });
      
      onLoadStart = data => this.setState({ isLoading: true });
      
      onEnd = () => this.setState({ playerState: PLAYER_STATES.ENDED });
      
      onError = () => alert('Oh! ', error);
      
      exitFullScreen = () => {
        alert('Exit full screen');
      };
      
      enterFullScreen = () => {};
      
      onFullScreen = () => {
        if (this.state.screenType == 'content')
          this.setState({ screenType: 'cover' });
        else this.setState({ screenType: 'content' });
      };
    
      onSeeking = currentTime => this.setState({ currentTime });
    
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                 <View style={{ flexDirection: "row", justifyContent: "center", margin:10, }}>
            {this.state.btnList.map((item, key) => {
              return (
                <DynamicBtn
                  key={key}
                  data={item}
                  navigation={navigation}
                  btnPressed={this.btnPressed}
                />
              );
            })}
          </View>
       <View style={styles.container}>
       <Video
          onEnd={this.onEnd}
          onLoad={this.onLoad}
          onLoadStart={this.onLoadStart}
          onProgress={this.onProgress}
          paused={this.state.paused}
          ref={videoPlayer => (this.videoPlayer = videoPlayer)}
          resizeMode={this.state.screenType}
          onFullScreen={this.state.isFullScreen}
          source={this.state.video}
          style={styles.mediaPlayer}
          volume={10}
        />
        <MediaControls
          duration={this.state.duration}
          isLoading={this.state.isLoading}
          mainColor="#333"
          onFullScreen={this.onFullScreen}
          onPaused={this.onPaused}
          onReplay={this.onReplay}
          onSeek={this.onSeek}
          onSeeking={this.onSeeking}
          playerState={this.state.playerState}
          progress={this.state.currentTime}
        />
       </View>
      </View>
        );
    }
}

export default Pal;