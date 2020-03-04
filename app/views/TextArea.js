import React, { Component } from 'react';
import {Text, View} from 'react-native';
import PackenTextArea from '../components/PackenTextArea';

class TextArea extends Component{
    render(){
        return(
            <View>
                <Text>Tex</Text>
                <PackenTextArea />
            </View>
        )
    }
}

export default TextArea;