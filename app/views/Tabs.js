import React, { Component } from "react";
import { View } from "react-native";

import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";
import Section from "../components/Section";
import PageView from "./PageView";
import Buttons from "./Buttons";
import Avatars from "./Avatars";
import InfoActions from "./InfoActions";

import PackenUiText from "../components/PackenUiText";
import PackenUiDivider from "../components/PackenUiDivider";
import PackenUiTabs from "../components/PackenUiTabs";

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.header = (
      <View style={{ padding: 25, paddingBottom: 10 }}>
        <PackenUiText style={{
          color: Colors.basic.independence.drk,
          fontSize: Typography.size.huge,
          fontFamily: Typography.family.bold,
          paddingBottom: 10,
          borderBottomWidth: 2,
          borderBottomColor: Colors.base.default_lgt
        }}>Tabs</PackenUiText>
        <PackenUiDivider size={1} type="light" />
      </View>
    );
    this.footer = (
      <View style={{ backgroundColor: Colors.brand.primary.drk, padding: 15 }}>
        <PackenUiText preset="s1" style={{ color: Colors.basic.white.dft, textAlign: "center" }}>Footer Component</PackenUiText>
      </View>
    );
  }

  mockCallback = () => true;

  onTabChange = (name, newIndex) => true;

  render() {
    return (
      <PackenUiTabs
        items={[
          {
            icon: "»",
            label: "Buttons",
            view: <Buttons />,
            callback: this.mockCallback,
          },
          {
            icon: "user",
            label: "Avatars",
            view: <Avatars />,
            callback: this.mockCallback
          },
          {
            label: "InfoActions",
            view: <InfoActions />,
            callback: this.mockCallback
          }
        ]}
        name="tabs1"
        activeIndex={0}
        orientation="horizontal"
        onTabChange={this.onTabChange}
        headerComponent={this.header}
        footerComponent={this.footer}
      />
    );
  }
}

export default Tabs;