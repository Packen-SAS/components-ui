import React, { Component } from "react";
import { View } from "react-native";

import Section from "../components/Section";
import SectionStyles from "../styles/components/Section";

import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";

import PackenText from "../components/PackenText";
import PackenDivider from "../components/PackenDivider";
import PackenCheckbox from "../components/PackenCheckbox";

class Checkboxes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [
        {
          label: "This is checked",
          isChecked: true,
          isDisabled: false
        },
        {
          label: "This is unchecked",
          isChecked: false,
          isDisabled: false
        },
        {
          label: "This is both checked and disabled",
          isChecked: true,
          isDisabled: true
        },
        {
          label: "This is both unchecked and disabled",
          isChecked: false,
          isDisabled: true
        }
      ],
      itemsRow: [
        {
          label: "This is checked",
          isChecked: true,
          isDisabled: false
        },
        {
          label: "This is unchecked",
          isChecked: false,
          isDisabled: false
        },
        {
          label: "This is both checked and disabled",
          isChecked: true,
          isDisabled: true
        },
        {
          label: "This is both unchecked and disabled",
          isChecked: false,
          isDisabled: true
        }
      ]
    }
  }

  handleNotify = newCheckedItems => {
    /* New checked items can be used here */
    /* console.log(newCheckedItems); */
    return newCheckedItems;
  }

  handleNotifyRow = newCheckedItems => {
    /* New checked items can be used here */
    /* console.log(newCheckedItems); */
    return newCheckedItems;
  }

  render() {
    return (
      <Section title="Checkboxes">
        <View style={{ marginTop: 10 }}>
          <PackenText style={{ marginBottom: 10, fontFamily: Typography.family.bold, color: Colors.base.default_alt }}>Column layout</PackenText>
          <View style={SectionStyles.section__contentItem}>
            <PackenCheckbox
              layout="column"
              items={this.state.items}
              callback={this.handleNotify}
            />
          </View>
          <PackenDivider size={1} type="light" margin={{top: 5, bottom: 15}}/>
          <PackenText style={{marginBottom: 10, fontFamily: Typography.family.bold, color: Colors.base.default_alt}}>Row layout</PackenText>
          <View style={SectionStyles.section__contentItem}>
            <PackenCheckbox
              layout="row"
              items={this.state.itemsRow}
              callback={this.handleNotifyRow}
            />
          </View>
        </View>
      </Section>
    )
  }
}

export default Checkboxes; 