import React, { Component } from "react";
import { View, FlatList } from "react-native";

import PackenListItem from "./PackenListItem";

class PackenList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: "100%",
      items: [...this.props.items],
      selectedItems: [],
      currentRadiosState: {
        checkedValue: ""
      },
      currentCheckboxesState: {
        checkedValues: []
      }
    }
  }

  get_item_height = itemHeight => {
    let finalNumShownRows;
    if (this.state.items.length < this.props.numShownRows) {
      finalNumShownRows = this.state.items.length;
    } else {
      finalNumShownRows = this.props.numShownRows;
    }

    this.setState({
      height: itemHeight * finalNumShownRows
    });
  }

  update_selected_items = (itemValue, isSelected, payload) => {
    switch (this.props.config.selectionType) {
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
  
        if (this.props.toggleMenu) {
          this.props.toggleMenu();
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
      } break;
      default:
        break;
    }
  }

  render_item = ({ item }) => {
    return (
      <PackenListItem
        config={this.props.config}
        mainContent={item}
        getItemHeight={this.get_item_height}
        updateSelectedItems={this.update_selected_items}
        currentRadiosState={this.state.currentRadiosState}
        currentCheckboxesState={this.state.currentCheckboxesState}
      />
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.selectedItems !== this.state.selectedItems) {
      /* Latest selected items can be used here */
      if (this.props.getFinalSelection) {
        this.props.getFinalSelection(this.state.selectedItems);
      }
    }
  }

  render() {
    return (
      <View style={{ height: this.state.height }}>
        <FlatList
          nestedScrollEnabled
          data={this.state.items}
          renderItem={this.render_item}
          style={{ height: this.state.height }}
        />
      </View>
    );
  }
}

export default PackenList;