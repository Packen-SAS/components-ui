import React, { Component } from 'react';
import { TextInput, View, Text } from 'react-native';
import PackenText from './PackenText';
import PackenTextAreaStyles from '../styles/components/PackenTextArea';


class PackenTextArea extends Component {
    constructor(props) {
        super(props);
    }

    handleTextArea = (e) =>{
        this.props.changeTextValue(e);
    }

    render() {
        return (
            <View>
                <PackenText style={PackenTextAreaStyles.label}>{this.props.label}</PackenText>
                <TextInput style={PackenTextAreaStyles.text_area}
                    value={this.props.value ? this.props.value : null}
                    multiline={true} placeholder={this.props.placeholder ? this.props.placeholder : null}
                    onChangeText={(e) => this.handleTextArea(e)} />
            </View>
        )
    }
}

export default PackenTextArea;