import React, { Component } from "react";
import { View } from "react-native";

import Colors from "../styles/abstracts/colors";
import Icon from "react-native-vector-icons/dist/Feather";
import Section from "../components/Section";

import PackenUiAvatar from "../components/PackenUiAvatar";
import PackenUiList from "../components/PackenUiList";

class Lists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [
        {
          size: "default",
          title: "List item one",
          icon: { name: "chevron-right", color: Colors.brand.primary.drk },
          callback: this.mockCallback,
          customWrapperStyle: { marginBottom: 8 }
        },
        {
          size: "default",
          title: "List item two",
          icon: { name: "chevron-right", color: Colors.brand.primary.drk },
          media: (<PackenUiAvatar size="xtiny" src={require("../../assets/images/avatar.jpg")} />),
          callback: this.mockCallback,
          customWrapperStyle: { marginBottom: 8 }
        },
        {
          size: "large",
          title: "List item three",
          subtitle: "Secondary text",
          label: { text: "Verificado", color: Colors.success.default },
          icon: { name: "chevron-right", color: Colors.brand.primary.drk },
          callback: this.mockCallback,
          customWrapperStyle: { marginBottom: 16 }
        },
        {
          size: "large",
          title: "List item four",
          label: { text: "Verificado", color: Colors.success.default },
          icon: { name: "chevron-right", color: Colors.brand.primary.drk },
          media: (<PackenUiAvatar size="tiny" src={require("../../assets/images/avatar.jpg")} />),
          callback: this.mockCallback,
          customWrapperStyle: { marginBottom: 16 }
        },
        {
          size: "large",
          title: "List item five",
          subtitle: "Secondary text",
          label: { text: "Verificado", color: Colors.success.default },
          icon: { name: "chevron-right", color: Colors.brand.primary.drk },
          media: (<Icon name="user" color={Colors.basic.independence.dft} size={20} />),
          callback: this.mockCallback,
          customWrapperStyle: {}
        }
      ]
    }
  }

  mockCallback = () => true;

  render() {
    return (
      <Section title="Lists">
        <View style={{ marginTop: 5 }}>
          <PackenUiList style={{ marginTop: 15 }} items={this.state.items} />
        </View>
      </Section>
    );
  }
}

export default Lists;