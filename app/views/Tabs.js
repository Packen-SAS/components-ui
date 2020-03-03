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
          ]} activeIndex={0}/>
        </View>
      </Section>
    );
  }
}

export default Tabs;