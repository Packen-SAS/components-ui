import React, { Component } from "react";
import { View } from "react-native";

import Section from "../components/Section";
import PageView from "./PageView";

import PackenUiInput from "../components/PackenUiInput";

class Inputs extends Component {
  constructor(props) {
    super(props);
  }

  handleChangeText = (name, value, isValid) => {
    /* Content can be used here */
    /* console.log(`New value for ${name} is: ${value} and its validity is: ${isValid}`); */
    return value;
  }

  mockCallback = () => {
    /* console.log("Pressed"); */
    return true;
  };

  mockFocus = name => {
    /* console.log("Focus", name); */
    return true;
  }

  mockBlur = name => {
    /* console.log("Blur", name); */
    return true;
  }

  mockSubmitEditing = name => {
    /* console.log("submitEditing", name); */
    return true;
  }

  render() {
    return (
      <PageView>
        <Section title="Inputs">
          <View style={{ marginTop: 20 }}>
            <View style={{ marginBottom: 10 }}>
              <PackenUiInput
                name="inputNumber"
                size="tiny"
                placeholder="Número"
                onChangeText={this.handleChangeText}
                maxLength={10}
                minLength={5}
                icon={{
                  name: "hash",
                  position: "left"
                }}
                message={{
                  text: "Este input sólo acepta números",
                  icon: "info"
                }}
                label="Label tiny"
                help="Number-pad keyboard"
                keyboardType="number-pad"
                theme="primary"
                eventHandlers={{
                  onFocus: this.mockFocus,
                  onBlur: this.mockBlur,
                  onSubmitEditing: this.mockSubmitEditing
                }}
                validator="number"
              />
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiInput
                name="inputEmail"
                size="tiny"
                placeholder="Email"
                onChangeText={this.handleChangeText}
                icon={{
                  name: "at-sign",
                  position: "left"
                }}
                message={{
                  text: "Este input sólo acepta emails",
                  icon: "info"
                }}
                label="Label tiny"
                help="Email keyboard"
                keyboardType="email-address"
                theme="default"
                eventHandlers={{
                  onFocus: this.mockFocus,
                  onBlur: this.mockBlur,
                  onSubmitEditing: this.mockSubmitEditing
                }}
                validator="email"
              />
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiInput
                name="inputEspeciales"
                size="tiny"
                placeholder="Especiales"
                onChangeText={this.handleChangeText}
                icon={{
                  name: "command",
                  position: "left"
                }}
                message={{
                  text: "Este input sólo acepta caracteres especiales",
                  icon: "info"
                }}
                label="Label tiny"
                help="Regular keyboard"
                theme="default"
                eventHandlers={{
                  onFocus: this.mockFocus,
                  onBlur: this.mockBlur,
                  onSubmitEditing: this.mockSubmitEditing
                }}
                validator="special"
              />
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiInput
                name="inputLetrasEspeciales"
                size="tiny"
                placeholder="Letras y especiales"
                onChangeText={this.handleChangeText}
                icon={{
                  name: "command",
                  position: "left"
                }}
                message={{
                  text: "Este input sólo acepta letras y caracteres especiales",
                  icon: "info"
                }}
                label="Label tiny"
                help="Regular keyboard"
                theme="default"
                eventHandlers={{
                  onFocus: this.mockFocus,
                  onBlur: this.mockBlur,
                  onSubmitEditing: this.mockSubmitEditing
                }}
                validator="lettersSpecial"
              />
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiInput
                name="inputLetras"
                size="tiny"
                placeholder="Letras"
                onChangeText={this.handleChangeText}
                icon={{
                  name: "edit-2",
                  position: "left"
                }}
                message={{
                  text: "Este input sólo acepta letras",
                  icon: "info"
                }}
                label="Label tiny"
                help="Regular keyboard"
                theme="default"
                eventHandlers={{
                  onFocus: this.mockFocus,
                  onBlur: this.mockBlur,
                  onSubmitEditing: this.mockSubmitEditing
                }}
                validator="letters"
              />
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiInput
                name="inputLetrasNumeros"
                size="tiny"
                placeholder="Letras y números"
                onChangeText={this.handleChangeText}
                icon={{
                  name: "plus",
                  position: "left"
                }}
                message={{
                  text: "Este input sólo acepta letras y números",
                  icon: "info"
                }}
                label="Label tiny"
                help="Regular keyboard"
                theme="default"
                eventHandlers={{
                  onFocus: this.mockFocus,
                  onBlur: this.mockBlur,
                  onSubmitEditing: this.mockSubmitEditing
                }}
                validator="lettersNumbers"
              />
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiInput
                name="inputUrls"
                size="tiny"
                placeholder="Urls"
                onChangeText={this.handleChangeText}
                icon={{
                  name: "globe",
                  position: "left"
                }}
                message={{
                  text: "Este input sólo acepta urls",
                  icon: "info"
                }}
                label="Label tiny"
                help="Regular keyboard"
                theme="default"
                eventHandlers={{
                  onFocus: this.mockFocus,
                  onBlur: this.mockBlur,
                  onSubmitEditing: this.mockSubmitEditing
                }}
                validator="url"
              />
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiInput
                name="input1"
                size="tiny"
                placeholder="Placeholder"
                onChangeText={this.handleChangeText}
                maxLength={10}
                icon={{
                  name: "lock",
                  position: "right"
                }}
                message={{
                  text: "Caption text, description, error notification",
                  icon: "info"
                }}
                label="Label tiny"
                help="Number-pad keyboard"
                keyboardType="number-pad"
                theme="default"
                eventHandlers={{
                  onFocus: this.mockFocus,
                  onBlur: this.mockBlur,
                  onSubmitEditing: this.mockSubmitEditing
                }}
                loading
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
      </PageView>
    );
  }
}

export default Inputs;