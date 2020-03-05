import React, { Component } from 'react';
import { View } from 'react-native';

import Section from '../components/Section';
import SectionStyles from "../styles/components/Section";

import Colors from '../styles/abstracts/colors';
import Typography from '../styles/abstracts/typography';

import PackenText from '../components/PackenText';
import PackenCheckBox from '../components/PackenCheckBox';

class Checkboxes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [
        {
          checked: true,
          title: "Checked",
          disabled: false,
        },
        {
          checked: false,
          title: "Unchecked",
          disabled: false,
        },
        {
          checked: null,
          title: "Null",
          disabled: false,
        },
        {
          checked: true,
          title: "Checked",
          disabled: true,
        },
        {
          checked: false,
          title: "Unchecked",
          disabled: true,
        },
        {
          checked: null,
          title: "Null",
          disabled: true,
        }

      ]
    }
  }

  handleNotify = (index, value) => {
    const newItems = this.state.items.slice();
    newItems[index].checked = value;
    this.setState({
      items: newItems
    });
  }

  render() {
    return (
      <Section title="Checkboxes">
        <View style={{ marginTop: 10 }}>
          <PackenText style={{ marginBottom: 10, fontFamily: Typography.family.bold, color: Colors.base.default_alt }}>Column layout</PackenText>
          <View style={SectionStyles.section__contentItem}>
            <PackenCheckBox
              layout="column"
              items={this.state.items}
              notifyParent={this.handleNotify}
            />
          </View>
          <View style={SectionStyles.section__contentItem}>
            <PackenCheckBox
              layout="row"
              items={this.state.items}
              notifyParent={this.handleNotify}
            />
          </View>
        </View>
      </Section>
    )
  }
}

export default Checkboxes; 