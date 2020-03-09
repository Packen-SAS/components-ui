import React, { Component } from "react";
import { View } from "react-native";

import Section from "../components/Section";
import SectionStyles from "../styles/components/Section";

import PackenTabs from "../components/PackenTabs";

class Tabs extends Component {
  constructor(props) {
    super(props);
  }

  mock_callback = () => { return; }
  
  render() {
    return (
      <Section title="Tabs">
        <View style={SectionStyles.section__content}>
          <View style={SectionStyles.section__contentItem}>
            <PackenTabs items={[
              {
                label: "Button",
                icon: "»",
                callback: this.mock_callback
              },
              {
                label: "Button",
                icon: "»",
                callback: this.mock_callback
              },
              {
                label: "Button",
                icon: "»",
                callback: this.mock_callback
              }
            ]} activeIndex={0}/>
          </View>
          <View style={SectionStyles.section__contentItem}>
            <PackenTabs items={[
              {
                label: "Button",
                callback: this.mock_callback
              },
              {
                label: "Button",
                callback: this.mock_callback
              },
              {
                label: "Button",
                callback: this.mock_callback
              }
            ]} activeIndex={1}/>
          </View>
          <View style={SectionStyles.section__contentItem}>
            <PackenTabs items={[
              {
                label: "Button",
                icon: "clock",
                callback: this.mock_callback
              },
              {
                label: "Button",
                icon: "rotate-cw",
                callback: this.mock_callback
              },
              {
                label: "Button",
                icon: "check-circle",
                callback: this.mock_callback
              }
            ]} activeIndex={2}/>
          </View>
        </View>
      </Section>
    );
  }
}

export default Tabs;