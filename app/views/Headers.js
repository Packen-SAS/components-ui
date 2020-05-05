import React, { Component } from "react";
import { View } from "react-native";

import Section from "../components/Section";
import PageView from "./PageView";

import PackenUiHeader from "../components/PackenUiHeader";

class Headers extends Component {
  constructor(props) {
    super(props);
  }

  mockCallback = () => true;

  render() {
    return (
      <PageView>
        <Section title="Headers">
          <View style={{ marginTop: 20 }}>
            <PackenUiHeader onBackPress={this.mockCallback}>Título de la vista</PackenUiHeader>
          </View>
        </Section>
      </PageView>
    );
  }
}

export default Headers;