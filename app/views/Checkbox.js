import React, { Component } from 'react';
import { View, CheckBox } from 'react-native';
import Section from '../components/Section';
import SectionStyles from "../styles/components/Section";
import PackenCheckBox from '../components/PackenCheckBox';
import PackenText from '../components/PackenText';
import Colors from '../styles/abstracts/colors';
import Typography from '../styles/abstracts/typography';



class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          checked: true,
          title: "Check",
          disabled: false,
        },
        {
          checked: false,
          title: "UnCheck",
          disabled: false,
        },
        {
          checked: null,
          title: "Null",
          disabled: false,
        },
        {
          checked: true,
          title: "Check",
          disabled: true,
        },
        {
          checked: false,
          title: "UnCheck",
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
    this.setState({ items: newItems });
  }

  render() {
    return (
      <Section title="Checkbox">
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

export default Checkbox; 