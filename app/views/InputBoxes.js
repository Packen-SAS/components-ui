import React, { Component } from "react";
import { View } from "react-native";

import Section from "../components/Section";
import PageView from "./PageView";

import PackenUiInputBoxes from "../components/PackenUiInputBoxes";

class InputBoxes extends Component {
  constructor(props) {
    super(props);
  }

  mockCallback = () => false;

  render() {
    return (
      <PageView>
        <Section title="Input Boxes">
          <View style={{ marginTop: 20 }}>
            <View style={{ marginBottom: 10 }}>
              <PackenUiInputBoxes boxes={4} emitCode={this.mockCallback} />
            </View>
          </View>
        </Section>
      </PageView>
    );
  }
}

export default InputBoxes;