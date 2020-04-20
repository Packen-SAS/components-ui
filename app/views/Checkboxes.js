import React, { Component } from "react";
import { View } from "react-native";

import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";

import Section from "../components/Section";
import PageView from "./PageView";

import PackenUiText from "../components/PackenUiText";
import PackenUiDivider from "../components/PackenUiDivider";
import PackenUiCheckbox from "../components/PackenUiCheckbox";

class Checkboxes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [
        {
          label: "This is checked",
          value: "This is checked",
          isChecked: true,
          isDisabled: false
        },
        {
          label: "This is unchecked",
          value: "This is unchecked",
          isChecked: false,
          isDisabled: false
        },
        {
          label: "This is both checked and disabled",
          value: "This is both checked and disabled",
          isChecked: true,
          isDisabled: true
        },
        {
          label: "This is both unchecked and disabled",
          value: "This is both unchecked and disabled",
          isChecked: false,
          isDisabled: true
        }
      ],
      itemsRow: [
        {
          label: "This is checked",
          value: "This is checked",
          isChecked: true,
          isDisabled: false
        },
        {
          label: "This is unchecked",
          value: "This is unchecked",
          isChecked: false,
          isDisabled: false
        },
        {
          label: "This is both checked and disabled",
          value: "This is both checked and disabled",
          isChecked: true,
          isDisabled: true
        },
        {
          label: "This is both unchecked and disabled",
          value: "This is both unchecked and disabled",
          isChecked: false,
          isDisabled: true
        }
      ]
    }
  }

  handleNotify = (name, newCheckedItems) => {
    /* New checked items can be used here */
    /* console.log(name, newCheckedItems); */
    return {
      id: name,
      value: newCheckedItems
    };
  }

  render() {
    return (
      <PageView>
        <Section title="Checkboxes">
          <View style={{ marginTop: 10 }}>
            <PackenUiText style={{ marginBottom: 10, fontFamily: Typography.family.bold, color: Colors.base.default_alt }}>Column layout</PackenUiText>
            <View style={{ marginBottom: 10 }}>
              <PackenUiCheckbox
                layout="column"
                items={this.state.items}
                callback={this.handleNotify}
                name="checkbox1"
              />
            </View>
            <PackenUiDivider size={1} type="light" margin={{top: 5, bottom: 15}}/>
            <PackenUiText style={{marginBottom: 10, fontFamily: Typography.family.bold, color: Colors.base.default_alt}}>Row layout</PackenUiText>
            <View style={{ marginBottom: 10 }}>
              <PackenUiCheckbox
                layout="row"
                items={this.state.itemsRow}
                callback={this.handleNotify}
                name="checkbox2"
              />
            </View>
          </View>
        </Section>
      </PageView>
    )
  }
}

export default Checkboxes; 