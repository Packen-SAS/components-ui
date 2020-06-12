import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, FlatList } from "react-native";
import * as UTIL from "../utils";

import PackenUiDropdownListItem from "./PackenUiDropdownListItem";

class PackenUiDropdownList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.setPropsToState(),
      height: "100%",
      itemHeight: 0,
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

  componentDidMount() {
    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
  }

  checkReset = () => {
    if (this.state && this.state.items && this.props.items && this.props.items.length <= 0 && this.props.resetDropdown) {
      this.props.resetDropdown();
    }
  }

  getItems = () => {
    let items = [];

    if (this.props.theme === "list") {
      items = this.state && this.state.items ? [...this.state.items] : this.props.items ? [...this.props.items] : [];
    } else {
      items = this.props.items ? [...this.props.items] : [];
    }

    return [...new Map(items.map(item => [item.value, item])).values()];
  }

  setPropsToState = () => {
    this.checkReset();

    return {
      items: this.getItems(),
      theme: this.props.theme ? this.props.theme : "default",
      numShownRows: this.props.numShownRows ? this.props.numShownRows : 4,
      config: this.props.config ? { ...this.props.config } : {},
      toggleMenu: this.props.toggleMenu ? this.props.toggleMenu : false,
      getFinalSelection: this.props.getFinalSelection ? this.props.getFinalSelection : false,
      styling: this.props.styling ? { ...this.props.styling } : {
        wrapper: {},
        flatlist: {},
        item: {}
      }
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
      height: itemHeight * finalNumShownRows,
      itemHeight: itemHeight
    });
  }

  findItemSingleRadio = (item, itemValue) => item.value === itemValue;

  handleSingleRadioUpdate = (itemValue, payload) => {
    const newItems = [...this.state.items];
    newItems.forEach(item => {
      item.isSelected = false;
    });

    const foundItem = newItems.find(item => this.findItemSingleRadio(item, itemValue));
    foundItem.isSelected = true;

    this.setState({
      items: newItems,
      selectedItems: [itemValue]
    });

    if (payload && payload.checkedType === "radio") {
      this.setState({
        currentRadiosState: {
          checkedValue: payload.checkedValue
        }
      });
    }

    if (this.state.toggleMenu) {
      this.state.toggleMenu();
    } else {
      return false;
    }
  }

  findItemMultipleCheckbox = (item, itemValue) => item.value === itemValue;

  filterNewItems = item => item.isSelected;

  mapNewItems = item => item.value;

  handleMultipleCheckboxUpdate = (itemValue, isSelected, payload) => {
    const newItems = [...this.state.items];

    const foundItem = newItems.find(item => this.findItemMultipleCheckbox(item, itemValue));
    foundItem.isSelected = isSelected;

    let newSelectedItems = newItems.filter(this.filterNewItems);
    newSelectedItems = newSelectedItems.map(this.mapNewItems);

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
  }

  updateSelectedItems = (itemValue, isSelected, payload) => {
    switch (this.state.config.selectionType) {
      case "single":
      case "radio": {
        this.handleSingleRadioUpdate(itemValue, payload);
      } break;
      case "multiple":
      case "checkbox": {
        this.handleMultipleCheckboxUpdate(itemValue, isSelected, payload);
      } break;
      default:
        return false;
    }
  }

  renderItem = ({ item }) => {
    return (
      <PackenUiDropdownListItem
        mainContent={item}
        config={this.state.config}
        styling={this.state.styling.item}
        getItemHeight={this.getItemHeight}
        selectedItems={this.state.selectedItems}
        updateSelectedItems={this.updateSelectedItems}
        currentRadiosState={this.state.currentRadiosState}
        currentCheckboxesState={this.state.currentCheckboxesState}
      />
    );
  }

  getItemLayout = (data, index) => ({
    length: this.state.itemHeight,
    offset: this.state.itemHeight * index,
    index: index
  })

  updateState = () => {
    this.setState({ ...this.setPropsToState() });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!UTIL.objectsEqual(prevProps, this.props)) {
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
      <View style={{ height: this.state.height, ...this.state.styling.wrapper }}>
        <FlatList
          nestedScrollEnabled
          removeClippedSubviews
          data={this.state.items}
          renderItem={this.renderItem}
          getItemLayout={this.getItemLayout}
          initialNumToRender={this.state.numShownRows + 2}
          maxToRenderPerBatch={this.state.numShownRows + 2}
          style={{ height: this.state.height, ...this.state.styling.flatlist }}
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
  finalSelectionArray: PropTypes.array,
  styling: PropTypes.object
};

export default PackenUiDropdownList;