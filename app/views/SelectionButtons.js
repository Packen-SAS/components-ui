import React, { Component } from "react";
import { View } from "react-native";

import Section from "../components/Section";
import SectionStyles from "../styles/components/Section";
import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";

import PackenUiText from "../components/PackenUiText";
import PackenUiSelectionButtons from "../components/PackenUiSelectionButtons";

class SelectionButtons extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Section title="Selection Buttons">
        <View style={SectionStyles.section__content}>
          <PackenUiText style={{ marginBottom: 10, fontFamily: Typography.family.bold, color: Colors.base.default_alt }}>Simple, single selection</PackenUiText>
          <PackenUiSelectionButtons
            type="label"
            selection="single"
            itemsPerRow={4}
            items={[
              { label: "A1", value: "A1", isSelected: false },
              { label: "A2", value: "A2", isSelected: false },
              { label: "B1", value: "B1", isSelected: false },
              { label: "B2", value: "B2", isSelected: false },
              { label: "B3", value: "B3", isSelected: false },
              { label: "C1", value: "C1", isSelected: true },
              { label: "C2", value: "C2", isSelected: false },
              { label: "C3", value: "C3", isSelected: false }
            ]}
          />
        </View>
        <View style={SectionStyles.section__content}>
          <PackenUiText style={{ marginBottom: 10, fontFamily: Typography.family.bold, color: Colors.base.default_alt }}>Simple, multiple selection</PackenUiText>
          <PackenUiSelectionButtons
            type="label"
            selection="multiple"
            itemsPerRow={4}
            items={[
              { label: "A1", value: "A1", isSelected: true },
              { label: "A2", value: "A2", isSelected: false },
              { label: "B1", value: "B1", isSelected: false },
              { label: "B2", value: "B2", isSelected: false },
              { label: "B3", value: "B3", isSelected: false },
              { label: "C1", value: "C1", isSelected: true },
              { label: "C2", value: "C2", isSelected: false },
              { label: "C3", value: "C3", isSelected: false }
            ]}
          />
        </View>
      </Section>
    );
  }
}

export default SelectionButtons;