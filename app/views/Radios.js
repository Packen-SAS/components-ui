import React, { Component } from "react";
import { View } from "react-native";

import Section from "../components/Section";


import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";

import PackenUiText from "../components/PackenUiText";
import PackenUiDivider from "../components/PackenUiDivider";
import PackenUiRadio from "../components/PackenUiRadio";

class Radios extends Component {
  constructor(props) {
    super(props);
  }

  handleNotify = newSelectedItem => {
    /* New checked item can be used here */
    /* console.log(newSelectedItem); */
    return newSelectedItem;
  }

  handleNotifyRow = newSelectedItem => {
    /* New checked item can be used here */
    /* console.log(newSelectedItem); */
    return newSelectedItem;
  }

  render() {
    return (
      <Section title="Radios">
        <View style={{ marginTop: 20 }}>
          <PackenUiText style={{ marginBottom: 10, fontFamily: Typography.family.bold, color: Colors.base.default_alt }}>Column layout</PackenUiText>
          <PackenUiRadio layout="column" items={[
            {
              label: "Place your text",
              isDisabled: false
            },
            {
              label: "Different text",
              isDisabled: false
            },
            {
              label: "This text is both checked and disabled",
              isDisabled: true
            }
          ]} initialIndex={2} callback={this.handleNotify} />
          <PackenUiDivider size={1} type="light" margin={{ top: 15, bottom: 15 }} />
          <PackenUiText style={{ marginBottom: 5, fontFamily: Typography.family.bold, color: Colors.base.default_alt }}>Row layout</PackenUiText>
          <PackenUiRadio layout="row" items={[
            {
              label: "Placeholder",
              isDisabled: false
            },
            {
              label: "This is checked",
              isDisabled: false
            },
            {
              label: "Some other text",
              isDisabled: false
            }
          ]} initialIndex={1} callback={this.handleNotifyRow} />
        </View>
      </Section>
    );
  }
}

export default Radios;