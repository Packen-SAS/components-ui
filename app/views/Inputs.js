import React, { Component } from "react";
import { View } from "react-native";

import SectionStyles from "../styles/components/Section";
import Section from "../components/Section";

import PackenUiInput from "../components/PackenUiInput";

class Inputs extends Component {
  constructor(props) {
    super(props);
  }

  handleChangeText = value => {
    /* Content can be used here */
    /* console.log(value); */
    return value;
  }

  mockCallback = () => {
    /* console.log("Pressed"); */
    return true;
  };

  render() {
    return (
      <Section title="Inputs">
        <View style={SectionStyles.section__content}>
          <View style={SectionStyles.section__contentItem}>
            <PackenUiInput
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
              help="Help text tiny"
              theme="default"
            />
          </View>
          <View style={SectionStyles.section__contentItem}>
            <PackenUiInput
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
              help="Help text small"
              theme="danger"
            />
          </View>
          <View style={SectionStyles.section__contentItem}>
            <PackenUiInput
              size="medium"
              placeholder="Placeholder"
              onChangeText={this.handleChangeText}
              message={{
                text: "Caption text, description, error notification",
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
          <View style={SectionStyles.section__contentItem}>
            <PackenUiInput
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
              help="Help text large"
              theme="primary"
            />
          </View>
          <View style={SectionStyles.section__contentItem}>
            <PackenUiInput
              size="giant"
              placeholder="Placeholder"
              onChangeText={this.handleChangeText}
              icon={{
                name: "user",
                position: "right"
              }}
              label="Label giant"
              help="Help text giant"
              theme="default"
            />
          </View>
          <View style={SectionStyles.section__contentItem}>
            <PackenUiInput
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
          <View style={SectionStyles.section__contentItem}>
            <PackenUiInput
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
          <View style={SectionStyles.section__contentItem}>
            <PackenUiInput
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
          <View style={SectionStyles.section__contentItem}>
            <PackenUiInput
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
          <View style={SectionStyles.section__contentItem}>
            <PackenUiInput
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