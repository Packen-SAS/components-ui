import React, { Component } from "react";
import { View } from "react-native";

import Section from "../components/Section";


import PackenUiText from "../components/PackenUiText";
import PackenUiDivider from "../components/PackenUiDivider";

class Dividers extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Section title="Dividers">
        <View style={{ marginTop: 20 }}>
          <PackenUiText style={{marginBottom: 5}}>Light, 1px</PackenUiText>
          <PackenUiDivider size={1} margin={{top: 10, bottom: 10}} type="light"/>
        </View>
        <View style={{ marginTop: 20 }}>
          <PackenUiText style={{marginBottom: 5}}>Dark, 2px</PackenUiText>
          <PackenUiDivider size={2} margin={{top: 10, bottom: 10}} type="dark"/>
        </View>
      </Section>
    );
  }
}

export default Dividers;