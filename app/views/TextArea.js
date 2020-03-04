import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PackenTextArea from '../components/PackenTextArea';

class TextArea extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        text: ''
    }

    changeTextValue = (textChanged) => {
        this.setState({text: textChanged});
    }

    render() {
        return (
            <View>
                <PackenTextArea placeholder="Placeholder test" 
                    label="Label props" value={this.state.text}
                    changeTextValue={this.changeTextValue} 
                />
            </View>
        )
    }
}

export default TextArea;