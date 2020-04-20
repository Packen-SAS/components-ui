import React, { Component } from "react";
import { View } from "react-native";

import Colors from "../styles/abstracts/colors";

import Section from "../components/Section";
import PageView from "./PageView";

import PackenUiText from "../components/PackenUiText";

class IconTexts extends Component {
  constructor(props) {
    super(props);
  }

  mockCallback = () => {
    return true;
  }

  render() {
    return (
      <PageView>
        <Section title="Icon Texts">
          <View style={{ marginTop: 20 }}>
            <PackenUiText
              preset="p2"
              touchable={{
                color: Colors.brand.secondary.dft,
                underline: true,
                callback: this.mockCallback
              }}
              icon={{
                name: "plus-circle",
                position: "left",
                color: Colors.brand.secondary.dft,
                size: 14
              }}
            >This triggers an internal callback</PackenUiText>
          </View>
          <View style={{ marginTop: 20 }}>
            <PackenUiText
              preset="p2"
              icon={{
                name: "check",
                position: "right",
                color: Colors.basic.independence.drk,
                size: 14
              }}
            >This is just a text with an icon</PackenUiText>
          </View>
        </Section>
      </PageView>
    );
  }
}

export default IconTexts;