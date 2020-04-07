import React, { Component } from "react";
import { View } from "react-native";


import Section from "../components/Section";

import PackenUiInput from "../components/PackenUiInput";

class Inputs extends Component {
  constructor(props) {
    super(props);
  }

  handleChangeText = (name, value) => {
    /* Content can be used here */
    /* console.log(`New value for ${name} is: ${value}`); */
    return value;
  }

  mockCallback = () => {
    /* console.log("Pressed"); */
    return true;
  };

  render() {
    return (
      <Section title="Inputs">
        <View style={{ marginTop: 20 }}>
          <View style={{ marginBottom: 10 }}>
            <PackenUiInput
              name="input1"
              size="tiny"
              placeholder="Placeholder"
              onChangeText={this.handleChangeText}
              icon={{
                name: "lock",
                position: "left"
              }}
              message={{
                text: "Caption text, description, error notification",
                icon: "info"
              }}
              label="Label tiny"
              help="Number-pad keyboard"
              keyboardType="number-pad"
              theme="default"
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <PackenUiInput
              name="input2"
              size="small"
              placeholder="Placeholder"
              onChangeText={this.handleChangeText}
              icon={{
                name: "x-circle",
                position: "right"
              }}
              message={{
                text: "Caption text, description, error notification",
                icon: "info"
              }}
              label="Label small"
              help="Decimal keyboard"
              keyboardType="decimal-pad"
              theme="danger"
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <PackenUiInput
              name="input3"
              size="medium"
              isPassword
              placeholder="Placeholder"
              onChangeText={this.handleChangeText}
              message={{
                text: "This is a password input",
                icon: "info"
              }}
              label="Label medium"
              help={{
                text: "This triggers an internal callback",
                touchable: true,
                callback: this.mockCallback
              }}
              theme="success"
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <PackenUiInput
              name="input4"
              size="large"
              placeholder="Placeholder"
              onChangeText={this.handleChangeText}
              icon={{
                name: "lock",
                position: "left"
              }}
              message={{
                text: "Caption text, description, error notification",
                icon: "info"
              }}
              label="Label large"
              help="Phone-pad keyboard"
              keyboardType="phone-pad"
              theme="primary"
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <PackenUiInput
              name="input5"
              size="giant"
              placeholder="Placeholder"
              onChangeText={this.handleChangeText}
              icon={{
                name: "user",
                position: "right",
                callback: this.mockCallback
              }}
              label="Label giant"
              help="Email-address keyboard"
              keyboardType="email-address"
              theme="default"
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <PackenUiInput
              name="input6"
              size="medium"
              placeholder="Placeholder"
              onChangeText={this.handleChangeText}
              icon={{
                name: "clock",
                position: "left"
              }}
              message={{
                text: "Caption text, description, error notification",
                icon: "info"
              }}
              label="Label disabled"
              help="Help text disabled"
              theme="success"
              disabled
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <PackenUiInput
              name="input7"
              size="medium"
              placeholder="Placeholder"
              onChangeText={this.handleChangeText}
              message={{
                text: "Caption text, description, error notification",
                icon: "info"
              }}
              label="Label textarea"
              help="Help text textarea"
              theme="default"
              multiline
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <PackenUiInput
              name="input8"
              size="tiny"
              placeholder="Placeholder"
              onChangeText={this.handleChangeText}
              message={{
                text: "Caption text, description, error notification",
                icon: "info"
              }}
              label="Label textarea"
              theme="danger"
              multiline
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <PackenUiInput
              name="input9"
              size="tiny"
              placeholder="Placeholder"
              onChangeText={this.handleChangeText}
              message={{
                text: "Caption text, description, error notification",
                icon: "info"
              }}
              label="Label textarea"
              theme="success"
              multiline
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <PackenUiInput
              name="input10"
              size="large"
              placeholder="Placeholder"
              onChangeText={this.handleChangeText}
              message={{
                text: "Caption text, description, error notification",
                icon: "info"
              }}
              label="Label textarea"
              help="Help primary large"
              theme="primary"
              multiline
            />
          </View>
        </View>
      </Section>
    )
  }
}

export default Inputs;