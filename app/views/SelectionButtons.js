import React, { Component } from "react";
import { View } from "react-native";

import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";
import Section from "../components/Section";
import PageView from "./PageView";

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
      <PageView>
        <Section title="Selection Buttons">
          <View style={{ marginTop: 20 }}>
            <PackenUiText style={{ marginBottom: 10, fontFamily: Typography.family.bold, color: Colors.basic.independence.drk }}>Label, single selection, alternative style</PackenUiText>
            <PackenUiSelectionButtons
              type="label"
              selection="single"
              itemsPerRow={4}
              name="selectionButtons1"
              altStyle
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
          <View style={{ marginTop: 20 }}>
            <PackenUiText style={{ marginBottom: 10, fontFamily: Typography.family.bold, color: Colors.basic.independence.drk }}>Image, single selection</PackenUiText>
            <PackenUiSelectionButtons
              type="image"
              selection="single"
              itemsPerRow={2}
              name="selectionButtons2"
              onNewSelection={this.newSelectionHandler}
              items={[
                {
                  image: {
                    default: {
                      src: require("../../assets/images/i-propietario-default.png"),
                      width: 26,
                      height: 45
                    },
                    active: {
                      src: require("../../assets/images/i-propietario.png"),
                      width: 51,
                      height: 45
                    }
                  },
                  label: "SÍ",
                  value: true,
                  isSelected: true
                },
                {
                  image: {
                    default: {
                      src: require("../../assets/images/i-propietario-default.png"),
                      width: 26,
                      height: 45
                    },
                    active: {
                      src: require("../../assets/images/i-propietario.png"),
                      width: 51,
                      height: 45
                    }
                  },
                  label: "NO",
                  value: false,
                  isSelected: false
                }
              ]}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <PackenUiText style={{ marginBottom: 10, fontFamily: Typography.family.bold, color: Colors.basic.independence.drk }}>Label, multiple selection</PackenUiText>
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
          <View style={{ marginTop: 20 }}>
            <PackenUiText style={{ marginBottom: 10, fontFamily: Typography.family.bold, color: Colors.basic.independence.drk }}>Image, multiple selection</PackenUiText>
            <PackenUiSelectionButtons
              type="image"
              selection="multiple"
              itemsPerRow={2}
              name="selectionButtons4"
              onNewSelection={this.newSelectionHandler}
              items={[
                {
                  image: {
                    default: {
                      src: require("../../assets/images/i-propietario-default.png"),
                      width: 26,
                      height: 45
                    },
                    active: {
                      src: require("../../assets/images/i-propietario.png"),
                      width: 51,
                      height: 45
                    }
                  },
                  label: "SÍ",
                  value: true,
                  isSelected: true
                },
                {
                  image: {
                    default: {
                      src: require("../../assets/images/i-propietario-default.png"),
                      width: 26,
                      height: 45
                    },
                    active: {
                      src: require("../../assets/images/i-propietario.png"),
                      width: 51,
                      height: 45
                    }
                  },
                  label: "NO",
                  value: false,
                  isSelected: false
                }
              ]}
            />
          </View>
        </Section>
      </PageView>
    );
  }
}

export default SelectionButtons;