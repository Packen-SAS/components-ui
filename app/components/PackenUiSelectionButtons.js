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

  componentDidMount() {
    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
  }

  setPropsToState = () => {
    return {
      altStyle: this.props.altStyle ? this.props.altStyle : false,
      name: this.props.name ? this.props.name : "",
      type: this.props.type ? this.props.type : "label",
      items: this.props.items ? [...this.props.items] : [],
      selection: this.props.selection ? this.props.selection : "single",
      itemsPerRow: this.props.itemsPerRow ? this.props.itemsPerRow : 2,
      onNewSelection: this.props.onNewSelection ? this.props.onNewSelection : false
    };
  }

  filterInitialSelected = item => item.isSelected;

  pushPreselected = (item, preSelected) => {
    if (item.isSelected) {
      preSelected.push(item.value);
    }
  }

  getInitialSelected = () => {
    const items = this.setPropsToState().items;
    let selected;

    if (this.props.selection === "single") {
      const found = items.filter(this.filterInitialSelected)[0];
      if (found) {
        selected = found.value;
      } else {
        selected = "";
      }
    } else {
      const preSelected = [];
      items.forEach(item => this.pushPreselected(item, preSelected));
      selected = [...preSelected];
    }

    return selected;
  }

  findNewSelectedIndex = (item, newValue) => item === newValue;

  newSelectionHandler = newValue => {
    let newSelected;

    if (this.state.selection === "single") {
      newSelected = newValue;
    } else {
      newSelected = [...this.state.selected];

      if (newSelected.includes(newValue)) {
        const foundIndex = newSelected.findIndex(item => this.findNewSelectedIndex(item, newValue));
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

  mapItems = (item, i) => (
    <View key={i} style={[
      this.getStyles().item.type[this.state.type],
      this.getStyles().item.altStyle[this.state.altStyle],
      { width: `${100 / this.state.itemsPerRow}%` }
    ]}>
      <PackenUiSelectionButtonsControl
        data={item}
        altStyle={this.state.altStyle}
        type={this.state.type}
        selected={this.state.selected}
        selection={this.state.selection}
        onNewSelection={this.newSelectionHandler}
      />
    </View>
  )

  render() {
    return (
      <View style={[
        this.getStyles().wrapper.base,
        this.getStyles().wrapper.type[this.state.type],
        this.getStyles().wrapper.altStyle[this.state.altStyle]
      ]}>
        {this.state.items.map(this.mapItems)}
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
        },
        altStyle: {
          false: {},
          true: {
            marginVertical: -16,
            marginHorizontal: -16
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
        },
        altStyle: {
          false: {},
          true: {
            paddingVertical: 16,
            paddingHorizontal: 16
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