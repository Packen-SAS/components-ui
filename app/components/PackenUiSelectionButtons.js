import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import PackenUiSelectionButtonsControl from "./PackenUiSelectionButtonsControl";

class PackenUiSelectionButtons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.setPropsToState(),
      selected: this.getInitialSelected()
    }
  }

  setPropsToState = () => {
    return {
      name: this.props.name ? this.props.name : "",
      type: this.props.type ? this.props.type : "label",
      items: this.props.items ? [...this.props.items] : [],
      selection: this.props.selection ? this.props.selection : "single",
      itemsPerRow: this.props.itemsPerRow ? this.props.itemsPerRow : 2,
      onNewSelection: this.props.onNewSelection ? this.props.onNewSelection : false
    };
  }

  getInitialSelected = () => {
    const items = this.props.items ? [...this.props.items] : [];
    let selected;

    if (this.props.selection === "single") {
      const found = items.filter(item => item.isSelected)[0];
      if (found) {
        selected = found.value;
      } else {
        selected = "";
      }
    } else {
      const preSelected = [];
      items.forEach(item => {
        if (item.isSelected) {
          preSelected.push(item.value);
        }
      });
      selected = [...preSelected];
    }

    return selected;
  }

  newSelectionHandler = newValue => {
    let newSelected;

    if (this.state.selection === "single") {
      newSelected = newValue;
    } else {
      newSelected = [...this.state.selected];
      
      if (newSelected.includes(newValue)) {
        const foundIndex = newSelected.findIndex(item => item === newValue);
        if (newSelected.length > 1) {
          newSelected.splice(foundIndex, 1); 
        }
      } else {
        newSelected.push(newValue);
      }

      newSelected = [...new Set(newSelected)];
    }

    this.setState({
      selected: newSelected
    });

    if (this.state.onNewSelection) {
      this.state.onNewSelection(this.state.name, newSelected);
    }

    return newSelected;
  }

  updateState = () => {
    this.setState({ ...this.setPropsToState() });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.updateState();
    }
  }

  render() {
    return (
      <View style={[this.getStyles().wrapper.base, this.getStyles().wrapper.type[this.state.type]]}>
        {
          this.state.items.map((item, i) => (
            <View key={i} style={[this.getStyles().item.type[this.state.type], { width: `${100/this.state.itemsPerRow}%` }]}>
              <PackenUiSelectionButtonsControl
                data={item}
                type={this.state.type}
                selected={this.state.selected}
                selection={this.state.selection}
                onNewSelection={this.newSelectionHandler}
              />
            </View>
          ))
        }
      </View>
    );
  }

  getStyles = () => {
    return {
      wrapper: {
        base: {
          flexDirection: "row",
          alignItems: "stretch",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          flex: 1
        },
        type: {
          label: {
            marginVertical: -4,
            marginHorizontal: -12
          },
          image: {
            margin: -12
          }
        }
      },
      item: {
        type: {
          label: {
            paddingVertical: 4,
            paddingHorizontal: 12
          },
          image: {
            padding: 12
          }
        }
      }
    };
  }
}

PackenUiSelectionButtons.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  selection: PropTypes.string.isRequired,
  itemsPerRow: PropTypes.number.isRequired,
  onNewSelection: PropTypes.func.isRequired
};

export default PackenUiSelectionButtons;