import React, { Component } from 'react';
import { View, CheckBox } from 'react-native';
import Section from '../components/Section';
import SectionStyles from "../styles/components/Section";
import PackenCheckBox from '../components/PackenCheckBox';


class Checkbox extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        checked: false
    }

    handleNotify = (newState) => {
        console.log(newState);
        this.setState({ checked: newState })
    }

    render() {
        return (

            <Section title="Checkbox">
                <View style={{ marginTop: 10 }}>
                    <View style={SectionStyles.section__contentItem}>
                        <PackenCheckBox
                            notifyParent={this.handleNotify}
                            checked={this.state.checked}
                            title="Default"
                        />
                    </View>

                    <View style={SectionStyles.section__contentItem}>
                        <PackenCheckBox style={{ marginBottom: 10 }}
                            checked={false}
                            disabled={true}
                            title="Checked"
                            notifyParent={this.handleNotify}
                        />
                    </View>
                </View>
            </Section>
        )
    }

}

export default Checkbox; 