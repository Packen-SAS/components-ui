import React, { Component } from "react";
import { View, TouchableWithoutFeedback } from "react-native";

import DropdownStyles from "../styles/components/PackenDropdown";

import PackenInput from "../components/PackenInput";
import PackenList from "./PackenList";

class PackenDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      dimensions: {
        menu: {
          height: 0
        }
      },
      styles: {
        menu: {}
      }
    }
  }

  get_menu_dimensions = ({ height }) => {
    this.setState({
      dimensions: {
        ...this.state.dimensions,
        menu: {
          height: height
        }
      }
    }, this.set_custom_styles);
  }

  set_custom_styles = () => {
    let customStyles = {
      bottom: -(this.state.dimensions.menu.height + 8)
    };

    this.setState({
      styles: {
        ...this.state.styles,
        menu: customStyles
      }
    });
  }

  toggle_menu = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.isOpen !== this.state.isOpen) {
      this.setState({
        styles: {
          ...this.state.styles,
          menu: {
            ...this.state.styles.menu,
            opacity: this.state.isOpen ? 1 : 0
          }
        }
      });
    }
  }

  render() {
    return (
      <View style={DropdownStyles.wrapper}>
        <TouchableWithoutFeedback style={DropdownStyles.input} onPress={this.toggle_menu}>
          <View pointerEvents="box-only">
            <PackenInput
              size={this.props.size}
              placeholder={this.props.input.placeholder}
              onChangeText={this.props.input.onChangeText}
              icon={this.props.input.icon}
              message={this.props.input.message}
              label={this.props.input.label}
              help={this.props.input.help}
              theme={this.props.input.theme}
              nonEditable={this.props.input.nonEditable}
            />
          </View>
        </TouchableWithoutFeedback>
        <View
          onLayout={e => { this.get_menu_dimensions(e.nativeEvent.layout) }}
          style={{ ...DropdownStyles.menu, ...this.state.styles.menu }}
          pointerEvents={this.state.isOpen ? "auto" : "none"}
        >
          <PackenList
            items={this.props.list.items}
            config={{ size: this.props.size, ...this.props.list.config }}
            numShownRows={4}
          />
        </View>
      </View>
    );
  }
}

export default PackenDropdown;