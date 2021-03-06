import React, { Component } from 'react';
import {SafeAreaView, StyleSheet, Text, View, Button, Image,TouchableOpacity,FlatList,Dimensions } from 'react-native';
import styles from './styles.js';
import standardLens from '../../styles/images/lens/uvmax/standard_lens.png';
import uvMax from '../../styles/images/lens/uvmax/uv-max.png';
import ComparisonSlider from '../comparison_slider/ComparisonSlider';
import BackButton from '../backbtn/BackButton.component';
class UVMax extends Component {

    constructor(props){
        super(props);
        this.state={
            title:'',
        }
    }
   
    componentDidMount = ()=>{

       this.setState({
        title:'UV Max',
    })
  }
    render() {
        const {navigation}= this.props;

        return (
           <View style={styles.Container}> 
                    <BackButton navigation={navigation} data={this.state.title} />
                <View style={styles.imageContainer}>
             <ComparisonSlider 
                  imageWidth={Math.round(Dimensions.get('window').width)-15}
                  imageHeight={400}
                  initialPosition={50}
                  leftImage={standardLens}
                  rightImage={uvMax} />  
            </View>
           </View>
        );
    }
}

export default UVMax;