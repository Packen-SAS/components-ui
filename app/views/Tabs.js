import React, { Component } from "react";
import { View } from "react-native";

import Section from "../components/Section";
import SectionStyles from "../styles/components/Section";

import PackenUiTabs from "../components/PackenUiTabs";

class Tabs extends Component {
  constructor(props) {
    super(props);
  }

  mockCallback = () => { return true; }
  
  render() {
    return (
      <Section title="Tabs">
        <View style={SectionStyles.section__content}>
          <View style={SectionStyles.section__contentItem}>
            <PackenUiTabs items={[
              {
                label: "Button",
                icon: "»",
                callback: this.mockCallback
              },
              {
                label: "Button",
                icon: "»",
                callback: this.mockCallback
              },
              {
                label: "Button",
                icon: "»",
                callback: this.mockCallback
              }
            ]} activeIndex={0}/>
          </View>
          <View style={SectionStyles.section__contentItem}>
            <PackenUiTabs items={[
              {
                label: "Button",
                callback: this.mockCallback
              },
              {
                label: "Button",
                callback: this.mockCallback
              },
              {
                label: "Button",
                callback: this.mockCallback
              }
            ]} activeIndex={1}/>
          </View>
          <View style={SectionStyles.section__contentItem}>
            <PackenUiTabs items={[
              {
                label: "Button",
                icon: "clock",
                callback: this.mockCallback
              },
              {
                label: "Button",
                icon: "rotate-cw",
                callback: this.mockCallback
              },
              {
                label: "Button",
                icon: "check-circle",
                callback: this.mockCallback
              }
            ]} activeIndex={2}/>
          </View>
        </View>
      </Section>
    );
  }
}

export default Tabs;