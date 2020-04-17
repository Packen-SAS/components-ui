import React, { Component } from "react";
import { View, TouchableWithoutFeedback } from "react-native";

import Colors from "../styles/abstracts/colors";
import Shadows from "../styles/abstracts/shadows";

import PackenUiInput from "./PackenUiInput";
import PackenUiList from "./PackenUiList";

class PackenUiDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      callback: props.callback,
      name: props.name,
      isDisabled: props.isDisabled,
      input: {...props.input},
      list: {...props.list},
      size: props.size,
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

    this.state.callback(this.state.name, selectedItems);
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

  updateState = () => {
    this.setState({
      callback: this.props.callback,
      name: this.props.name,
      isDisabled: this.props.isDisabled,
      input: {...this.props.input},
      list: {...this.props.list},
      size: this.props.size
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.updateState();
    }
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
        style={this.getStyles().wrapper}
        pointerEvents={this.state.isDisabled ? "none" : "auto"}
      >
        <TouchableWithoutFeedback style={this.getStyles().input} onPress={this.toggleMenu}>
          <View pointerEvents="box-only">
            <PackenUiInput
              value={this.state.finalSelectionString}
              size={this.state.size}
              placeholder={this.state.input.placeholder}
              onChangeText={this.state.input.onChangeText}
              icon={this.state.input.icon}
              message={this.state.input.message}
              label={this.state.input.label}
              help={this.state.input.help}
              theme={this.state.input.theme}
              isDropdown={true}
              nonEditable={this.state.input.nonEditable}
              disabled={this.state.isDisabled}
              isOpen={this.state.isOpen}
            />
          </View>
        </TouchableWithoutFeedback>
        <View
          onLayout={e => { this.getMenuDimensions(e.nativeEvent.layout) }}
          style={{ ...this.getStyles().menu, ...this.state.styles.menu }}
          pointerEvents={this.state.isOpen ? "auto" : "none"}
        >
          <PackenUiList
            items={this.state.list.items}
            config={{ size: this.state.size, ...this.state.list.config }}
            numShownRows={4}
            getFinalSelection={this.getFinalSelection}
            finalSelectionArray={this.state.finalSelection}
            toggleMenu={this.toggleMenu}
          />
        </View>
      </View>
    );
  }

  getStyles = () => {
    return {
      wrapper: {},
      input: {},
      menu: {
        backgroundColor: Colors.basic.white.dft,
        shadowColor: Colors.basic.black.dft,
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: Shadows.md.elevation,
        position: "absolute",
        zIndex: 10,
        left: 0,
        width: "100%",
        opacity: 0
      }
    };
  }
}

export default PackenUiDropdown;