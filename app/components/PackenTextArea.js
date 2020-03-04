import React, { Component } from 'react';
import { TextInput, View } from 'react-native';
import PackenText from './PackenText';

class PackenTextArea extends Component{
    render(){
        return(
            <View>
                <PackenText>Label</PackenText>
                <TextInput  style={{borderWidth: 1, width: '100%', paddingTop: 10, paddingLeft: 10}}
      multiline={true}/>
            </View>

        )
    }
}

export default PackenTextArea;