import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/dist/Feather';
import CheckBoxStyles from '../styles/components/PackenCheckBox';

export default class PackecnCheckBox extends React.Component {

    constructor(props) {
        super(props);

    }
    state ={
        checked: null
    }

    componentDidMount(){
        this.setState({checked: this.props.checked});
    }
    
    changeState = async() => {
        if (!this.props.disabled) {
            await this.setState({checked: !this.state.checked});
            this.props.notifyParent(this.state.checked);
        }
    }

    getStylesCheckBox = () => {
        if (this.props.disabled) {
            if(this.props.checked !== true && this.props.checked !== false){
                return CheckBoxStyles.content.disabledCheckUnChecked;
            }
            return CheckBoxStyles.content.disabled;
        }
        if (this.props.checked === true || this.props.checked === false) {
            return CheckBoxStyles.content.active;
        } else {
            return CheckBoxStyles.content.default;
        }
    }

    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={this.changeState}>
                    <View style={this.getStylesCheckBox()} >
                        {this.props.checked === true ? <Icon style={CheckBoxStyles.icon} name="check" /> : null}
                        {this.props.checked === false ? <Icon style={CheckBoxStyles.icon} name="minus" /> : null}
                    </View>
                </TouchableOpacity>
                {this.props.title ? <Text style={CheckBoxStyles.title}>{this.props.title}</Text> : null}
              
            </View>
        )
    }
}

