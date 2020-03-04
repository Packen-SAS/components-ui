import React, { Component } from 'react';
import { View, TextInput, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import PackenText from '../components/PackenText';
import PackenInputStyles from '../styles/components/PackenInput';
import Typography from '../styles/abstracts/typography';
import Colors from '../styles/abstracts/colors';


class PackenInput extends Component {

    constructor(props) {
        super(props);
    }


    state = {
        hoverInput: "contentInput",
        valueInput: ""
    }

    onFocusInput = () => {
        this.setState({ hoverInput: "contentInputFocus" });
    }

    onBlur = () => {
        this.setState({ hoverInput: "contentInput" })
    }

    onChangeText = (text) => {
        this.props.notifyParent(text);
    }
    messageIsString = (value) => {
        if (this.props.errorMessage) {
            return String(value) ? true : false;
        }
        return false;
    }

    getStyleContentInput = () => {
        if (this.props.disabled) {
            return PackenInputStyles.content.contentInputDisabled
        } else if (this.props.errorMessage) {
            return PackenInputStyles.content.contentInputError
        } else {
            return PackenInputStyles.content[this.state.hoverInput];
        }
    }

    getColorIcon = () => {
        return this.props.disabled ? Colors.basic.gray.dft : Colors.basic.independence.dft
    }

    renderErrorMessage = () => {
        return (
            this.messageIsString(this.props.errorMessage) ?
                <View style={{ flexDirection: 'row', top: 3, }}>
                    <Icon name="alert-circle" size={12} color="red" />
                    <Text style={PackenInputStyles.content.icon}>{this.props.errorMessage}</Text>
                </View>
                : null
        )
    }

    render() {
        return (
            <View style={{ marginTop: 10 }}>
                <PackenText style={PackenInputStyles.labelInput}>{this.props.label}</PackenText>
                <View style={this.getStyleContentInput()}>
                    <TextInput
                        editable={this.props.disabled === true ? false : true}
                        onFocus={this.onFocusInput}
                        onBlur={this.onBlur}
                        onChangeText={(e) => this.onChangeText(e)}
                        style={PackenInputStyles.content.textInput}
                        placeholder={this.props.placeholder ? this.props.placeholder : null}
                        value={this.props.value ? this.props.value : null}
                    />
                    <Icon name={this.props.icon} size={20} color={this.getColorIcon()} />
                </View>
                {this.renderErrorMessage()}
            </View>
        )
    }
}


export default PackenInput;

