import React, { Component } from 'react';
import { View, Button } from 'react-native';

import Section from '../components/Section';

import PackenInput from '../components/PackenInput';

class Inputs extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      errorMessage: "Mensaje de error",
      value: "Value"
    }
  }

  notifyParent = value => {
    this.setState({
      errorMessage: "",
      value: value  
    });
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