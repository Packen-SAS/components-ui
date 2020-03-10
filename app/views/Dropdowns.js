import React, { Component } from "react";
import { View } from "react-native";

import Section from "../components/Section";
import SectionStyles from "../styles/components/Section";

import Colors from "../styles/abstracts/colors";

import PackenDropdown from "../components/PackenDropdown";
import PackenTag from "../components/PackenTag";
import PackenText from "../components/PackenText";

class Dividers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: {
        simple: {
          config: {
            checkedIcon: "check",
            selectionType: "single"
          },
          items: [
            {
              key: this.gen_key(),
              left: false,
              right: false,
              main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Bogotá, D.C.</PackenText>)
            },
            {
              key: this.gen_key(),
              left: false,
              right: false,
              main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Medellín</PackenText>)
            },
            {
              key: this.gen_key(),
              left: false,
              right: false,
              main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Bucaramanga</PackenText>)
            },
            {
              key: this.gen_key(),
              left: false,
              right: false,
              main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Santa Marta</PackenText>)
            },
            {
              key: this.gen_key(),
              left: false,
              right: false,
              main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Cali</PackenText>)
            },
            {
              key: this.gen_key(),
              left: false,
              right: false,
              main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Cartagena</PackenText>)
            },
            {
              key: this.gen_key(),
              left: false,
              right: false,
              main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Leticia</PackenText>)
            }
          ]
        },
        avatars: {

        },
        info: {

        },
        checkboxes: {

        },
        radio: {

        }
      }
    }
  }

  gen_key = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  render() {
    return (
      <Section title="Dropdowns">
        <View style={SectionStyles.section__content}>
          <View style={SectionStyles.section__contentItem}>
            <PackenDropdown
              size="medium"
              list={this.state.menus.simple}
              input={{
                label: "Conductor",
                placeholder: "Selecciona tu ciudad",
                onChangeText: () => { return; },
                icon: {
                  name: "chevron-down",
                  position: "right",
                  style: { color: Colors.brand.primary.drk }
                },
                theme: "default",
                nonEditable: true
              }}
            />
          </View>
          <PackenTag style={{ color: Colors.basic.independence.lgt }}>NGH152</PackenTag>
          <PackenTag style={{ color: Colors.brand.primary.drk }}>Facturado</PackenTag>
        </View>
      </Section>
    );
  }
}

export default Dividers;