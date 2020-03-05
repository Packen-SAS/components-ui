import React, { Component } from "react";
import { View } from "react-native";

import SectionStyles from "../styles/components/Section";
import Section from "../components/Section";

import PackenInput from "../components/PackenInput";

class Inputs extends Component {
  constructor(props) {
    super(props);
  }

  handle_change_text = value => {
    /* Content can be used here */
    /* console.log(value); */
  }

  render() {
    return (
      <Section title="Inputs">
        <View style={SectionStyles.section__content}>
          <View style={SectionStyles.section__contentItem}>
            <PackenInput
              size="tiny"
              placeholder="Placeholder"
              onChangeText={this.handle_change_text}
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
            <PackenInput
              size="small"
              placeholder="Placeholder"
              onChangeText={this.handle_change_text}
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
            <PackenInput
              size="medium"
              placeholder="Placeholder"
              onChangeText={this.handle_change_text}
              message={{
                text: "Caption text, description, error notification",
                icon: "info"
              }}
              label="Label medium"
              help="Help text medium"
              theme="success"
            />
          </View>
          <View style={SectionStyles.section__contentItem}>
            <PackenInput
              size="large"
              placeholder="Placeholder"
              onChangeText={this.handle_change_text}
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
            <PackenInput
              size="giant"
              placeholder="Placeholder"
              onChangeText={this.handle_change_text}
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
            <PackenInput
              size="medium"
              placeholder="Placeholder"
              onChangeText={this.handle_change_text}
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
            <PackenInput
              size="medium"
              placeholder="Placeholder"
              onChangeText={this.handle_change_text}
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
        </View>
      </Section>
    )
  }
}

export default Inputs;