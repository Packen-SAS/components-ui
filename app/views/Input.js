import React from 'react';
import { View, Button } from 'react-native';
import PackenInput from '../components/PackenInput';
import Section from '../components/Section';



class Inputs extends React.Component {

    state = {
        errorMessage: 'Mensaje de error',
        value: 'Value'
    }


    notifyParent = (value) => {
        this.setState({ value: value, errorMessage: '' });
        
    }

    render() {
        return (
            <View>
                <Section title="Inputs">
                    <View>
                        <PackenInput
                            placeholder="Placeholder"
                            errorMessage={this.state.errorMessage}
                            icon="lock"
                            value={this.state.value}
                            label="Input error"
                            notifyParent={this.notifyParent}
                            positionIcon={"left"}
                            />
                    </View>

                    <View>
                        <PackenInput
                            placeholder="Placeholder"
                            icon="lock"
                            label="Disabled"
                            disabled={true} />
                    </View>
                </Section>
                <Button onPress={() => this.setState({ errorMessage: "Mensaje de error" })} title="Cambiar estado" />
            </View>


        )
    }
}

export default Inputs;

