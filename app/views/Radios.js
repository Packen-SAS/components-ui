import React, { Component } from "react";
import { View } from "react-native";

import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";
import Section from "../components/Section";
import PageView from "./PageView";

import PackenUiText from "../components/PackenUiText";
import PackenUiDivider from "../components/PackenUiDivider";
import PackenUiRadio from "../components/PackenUiRadio";

class Radios extends Component {
  constructor(props) {
    super(props);
  }

  handleNotify = (name, newSelectedItem) => {
    /* New checked item can be used here */
    /* console.log(name, newSelectedItem); */
    return {
      id: name,
      value: newSelectedItem
    };
  }

  render() {
    return (
      <PageView>
        <Section title="Radios">
          <View style={{ marginTop: 20 }}>
            <PackenUiText style={{ marginBottom: 10, fontFamily: Typography.family.bold, color: Colors.base.default_alt }}>Column layout</PackenUiText>
            <PackenUiRadio layout="column" items={[
              {
                label: "Place your text",
                value: "Place your text",
                isDisabled: false
              },
              {
                label: "Different text",
                value: "Different text",
                isDisabled: false
              },
              {
                label: "This text is both checked and disabled",
                value: "This text is both checked and disabled",
                isDisabled: true
              }
            ]} initialIndex={0} name="radios1" callback={this.handleNotify} />
            <PackenUiDivider size={1} type="light" margin={{ top: 15, bottom: 15 }} />
            <PackenUiText style={{ marginBottom: 5, fontFamily: Typography.family.bold, color: Colors.base.default_alt }}>Row layout</PackenUiText>
            <PackenUiRadio layout="row" items={[
              {
                label: "Placeholder",
                value: "Placeholder",
                isDisabled: false
              },
              {
                label: "This is checked",
                value: "This is checked",
                isDisabled: false
              },
              {
                label: "Some other text",
                value: "Some other text",
                isDisabled: false
              }
            ]} initialIndex={1} name="radios2" callback={this.handleNotify} />
          </View>
        </Section>
      </PageView>
    );
  }
}

export default Radios;