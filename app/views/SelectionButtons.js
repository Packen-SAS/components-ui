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

  newSelectionHandler = (name, newSelection) => {
    /* console.log(`Nueva selección de ${name}: ${newSelection}`); */
    return newSelection;
  }

  render() {
    return (
      <Section title="Selection Buttons">
        <View style={SectionStyles.section__content}>
          <PackenUiText style={{ marginBottom: 10, fontFamily: Typography.family.bold, color: Colors.base.default_alt }}>Label, single selection</PackenUiText>
          <PackenUiSelectionButtons
            type="label"
            selection="single"
            itemsPerRow={4}
            name="selectionButtons1"
            onNewSelection={this.newSelectionHandler}
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
          <PackenUiText style={{ marginBottom: 10, fontFamily: Typography.family.bold, color: Colors.base.default_alt }}>Image, single selection</PackenUiText>
          <PackenUiSelectionButtons
            type="image"
            selection="single"
            itemsPerRow={2}
            name="selectionButtons2"
            onNewSelection={this.newSelectionHandler}
            items={[
              { image: { src: require("../../assets/images/i-propietario.png"), width: 51, height: 45 }, label: "Sí", value: true, isSelected: true },
              { image: { src: require("../../assets/images/i-propietario.png"), width: 51, height: 45 }, label: "No", value: false, isSelected: false }
            ]}
          />
        </View>
        <View style={SectionStyles.section__content}>
          <PackenUiText style={{ marginBottom: 10, fontFamily: Typography.family.bold, color: Colors.base.default_alt }}>Label, multiple selection</PackenUiText>
          <PackenUiSelectionButtons
            type="label"
            selection="multiple"
            itemsPerRow={4}
            name="selectionButtons3"
            onNewSelection={this.newSelectionHandler}
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
        <View style={SectionStyles.section__content}>
          <PackenUiText style={{ marginBottom: 10, fontFamily: Typography.family.bold, color: Colors.base.default_alt }}>Image, multiple selection</PackenUiText>
          <PackenUiSelectionButtons
            type="image"
            selection="multiple"
            itemsPerRow={2}
            name="selectionButtons4"
            onNewSelection={this.newSelectionHandler}
            items={[
              { image: { src: require("../../assets/images/i-propietario.png"), width: 51, height: 45 }, label: "Sí", value: true, isSelected: false },
              { image: { src: require("../../assets/images/i-propietario.png"), width: 51, height: 45 }, label: "No", value: false, isSelected: true }
            ]}
          />
        </View>
      </Section>
    );
  }
}

export default SelectionButtons;