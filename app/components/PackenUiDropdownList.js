import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, FlatList } from "react-native";

import PackenUiDropdownListItem from "./PackenUiDropdownListItem";

class PackenUiDropdownList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.setPropsToState(),
      height: "100%",
      selectedItems: [],
      currentRadiosState: {
        checkedValue: ""
      },
      currentCheckboxesState: {
        finalSelectionArray: props.finalSelectionArray,
        checkedValues: []
      }
    }
  }

  setPropsToState = () => {
    return {
      items: this.props.items ? [...this.props.items] : [],
      numShownRows: this.props.numShownRows ? this.props.numShownRows : 4,
      config: this.props.config ? { ...this.props.config } : {},
      toggleMenu: this.props.toggleMenu ? this.props.toggleMenu : false,
      getFinalSelection: this.props.getFinalSelection ? this.props.getFinalSelection : false
    };
  }

  getItemHeight = itemHeight => {
    let finalNumShownRows;
    if (this.state.items.length < this.state.numShownRows) {
      finalNumShownRows = this.state.items.length;
    } else {
      finalNumShownRows = this.state.numShownRows;
    }

    this.setState({
      height: itemHeight * finalNumShownRows
    });
  }

  updateSelectedItems = (itemValue, isSelected, payload) => {
    switch (this.state.config.selectionType) {
      case "single":
      case "radio": {
        const newItems = [...this.state.items];
        newItems.forEach(item => {
          item.isSelected = false;
        });

        const foundItem = newItems.find(item => item.value === itemValue);
        foundItem.isSelected = true;

        this.setState({
          items: newItems,
          selectedItems: [itemValue]
        });

        if (payload) {
          if (payload.checkedType === "radio") {
            this.setState({
              currentRadiosState: {
                checkedValue: payload.checkedValue
              }
            });
          }
        }

        if (this.state.toggleMenu) {
          this.state.toggleMenu();
        } else {
          return false;
        }
      } break;
      case "multiple":
      case "checkbox": {
        const newItems = [...this.state.items];

        const foundItem = newItems.find(item => item.value === itemValue);
        foundItem.isSelected = isSelected;

        let newSelectedItems = newItems.filter(item => item.isSelected);
        newSelectedItems = newSelectedItems.map(item => item.value);

        this.setState({
          items: newItems,
          selectedItems: newSelectedItems
        });

        if (payload) {
          if (payload.checkedType === "checkbox") {
            let newCheckedValues = [...this.state.currentCheckboxesState.checkedValues];
            newCheckedValues.push(payload.checkedValue);
            newCheckedValues = [...new Set(newCheckedValues)];

            this.setState({
              currentCheckboxesState: {
                ...this.state.currentCheckboxesState,
                checkedValues: newCheckedValues
              }
            });
          }
        }
      } break;
      default:
        return false;
    }
  }

  renderItem = ({ item }) => {
    return (
      <PackenUiDropdownListItem
        config={this.state.config}
        mainContent={item}
        getItemHeight={this.getItemHeight}
        selectedItems={this.state.selectedItems}
        updateSelectedItems={this.updateSelectedItems}
        currentRadiosState={this.state.currentRadiosState}
        currentCheckboxesState={this.state.currentCheckboxesState}
      />
    );
  }

  updateState = () => {
    this.setState({ ...this.setPropsToState() });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.updateState();
    }
    if (prevState.selectedItems !== this.state.selectedItems) {
      /* Latest selected items can be used here */
      if (this.state.getFinalSelection) {
        this.state.getFinalSelection(this.state.selectedItems);
        this.setState({
          currentCheckboxesState: {
            ...this.state.currentCheckboxesState,
            finalSelectionArray: [...this.state.selectedItems]
          }
        });
      } else {
        return false;
      }
    }
  }

  render() {
    return (
      <View style={{ height: this.state.height }}>
        <FlatList
          nestedScrollEnabled
          data={this.state.items}
          renderItem={this.renderItem}
          style={{ height: this.state.height }}
        />
      </View>
    );
  }
}

PackenUiDropdownList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  numShownRows: PropTypes.number.isRequired,
  config: PropTypes.object.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  getFinalSelection: PropTypes.func.isRequired,
  finalSelectionArray: PropTypes.array
};

export default PackenUiDropdownList;