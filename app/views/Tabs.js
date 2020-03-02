import React from "react";
import { View } from "react-native";

import Section from "../components/Section";
import SectionStyles from "../styles/components/Section";

import PackenTabs from "../components/PackenTabs";

const Tabs = () => {
  const mock_callback = () => { return; }
  
  return (
    <Section title="Tabs">
      <View style={SectionStyles.section__content}>
        <PackenTabs items={[
          {
            label: "Button",
            callback: mock_callback
          },
          {
            label: "Button",
            callback: mock_callback
          },
          {
            label: "Button",
            callback: mock_callback
          }
        ]} activeIndex={0}/>
      </View>
    </Section>
  );
}

export default Tabs;