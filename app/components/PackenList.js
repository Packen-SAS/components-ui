import React, { Component } from "react";
import { View, FlatList } from "react-native";

import PackenListItem from "./PackenListItem";

class PackenList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: "100%",
      items: [...this.props.items],
      selectedItems: []
    }
  }

  get_item_height = itemHeight => {
    this.setState({
      height: itemHeight * this.props.numShownRows
    });
  }

  update_selected_items = (itemValue, isSelected) => {
    if (this.props.config.selectionType === "single") {
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

      if (this.props.toggleMenu) {
        this.props.toggleMenu();
      }
    } else {

    }
  }

  render_item = ({ item }) => {
    return (
      <PackenListItem
        config={this.props.config}
        mainContent={item}
        getItemHeight={this.get_item_height}
        updateSelectedItems={this.update_selected_items}
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