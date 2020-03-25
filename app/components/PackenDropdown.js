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
      },
      finalSelection: [],
      finalSelectionString: ""
    }
  }

  getMenuDimensions = ({ height }) => {
    this.setState({
      dimensions: {
        ...this.state.dimensions,
        menu: {
          height: height
        }
      }
    }, this.setCustomStyles);
  }

  setCustomStyles = () => {
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

  toggleMenu = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  getFinalSelection = selectedItems => {
    this.setState({
      finalSelection: selectedItems
    }, this.composeFinalSelectionString);
  }

  composeFinalSelectionString = () => {
    let finalSelectionString = "";

    this.state.finalSelection.forEach(item => {
      finalSelectionString += `${item}, `;
    });
    finalSelectionString = finalSelectionString.slice(0, -2);

    this.setState({
      finalSelectionString: finalSelectionString
    });

    return finalSelectionString;
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
      <View
        style={DropdownStyles.wrapper}
        pointerEvents={this.props.isDisabled ? "none" : "auto"}
      >
        <TouchableWithoutFeedback style={DropdownStyles.input} onPress={this.toggleMenu}>
          <View pointerEvents="box-only">
            <PackenInput
              value={this.state.finalSelectionString}
              size={this.props.size}
              placeholder={this.props.input.placeholder}
              onChangeText={this.props.input.onChangeText}
              icon={this.props.input.icon}
              message={this.props.input.message}
              label={this.props.input.label}
              help={this.props.input.help}
              theme={this.props.input.theme}
              isDropdown={true}
              nonEditable={this.props.input.nonEditable}
              disabled={this.props.isDisabled}
              isOpen={this.state.isOpen}
            />
          </View>
        </TouchableWithoutFeedback>
        <View
          onLayout={e => { this.getMenuDimensions(e.nativeEvent.layout) }}
          style={{ ...DropdownStyles.menu, ...this.state.styles.menu }}
          pointerEvents={this.state.isOpen ? "auto" : "none"}
        >
          <PackenList
            items={this.props.list.items}
            config={{ size: this.props.size, ...this.props.list.config }}
            numShownRows={4}
            getFinalSelection={this.getFinalSelection}
            finalSelectionArray={this.state.finalSelection}
            toggleMenu={this.toggleMenu}
          />
        </View>
      </View>
    );
  }
}

export default PackenDropdown;