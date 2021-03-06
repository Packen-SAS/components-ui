import React, { Component, ReactNode, ReactElement } from "react";
import PropTypes from "prop-types";
import { View, FlatList, ListRenderItem, ImageSourcePropType } from "react-native";
import * as UTIL from "../utils";

import PackenUiDropdownListItem from "./PackenUiDropdownListItem";

interface SideConfigShape {
  type: "icon" | "avatar";
  config: {
    name: string;
    size: string;
    src: ImageSourcePropType;
  };
}

interface ItemShape {
  isDisabled: boolean;
  isSelected: boolean;
  value: string;
  left: SideConfigShape | boolean;
  right: SideConfigShape | boolean;
  main: {
    control: {
      type: string;
      label: string;
      value: string;
      isDisabled: boolean;
      items: any[];
      handleNotify: Function;
    };
    props: {
      children: object | object[];
      style: object;
    };
    type: {
      displayName: string;
    };
  };
}

interface ConfigShape {
  size: string;
  name: string;
  checkedIcon?: string;
  src: ImageSourcePropType;
  selectionType: "single" | "radio" | "multiple" | "checkbox";
}

interface PayloadShape {
  checkedType: string;
  checkedValue: string;
}

interface StylingPropShape {
  wrapper: object;
  flatlist: object;
  item: object;
}

interface PackenUiDropdownListProps {
  items: ItemShape[];
  theme: string;
  numShownRows: number;
  config: ConfigShape;
  toggleMenu: Function;
  getFinalSelection: Function;
  finalSelectionArray?: string[];
  styling?: StylingPropShape;
  instance?: Function;
  resetDropdown: Function;
}

interface PackenUiDropdownListState {
  items: ItemShape[];
  theme: string;
  numShownRows: number;
  config: ConfigShape;
  toggleMenu: Function | boolean;
  getFinalSelection: Function | boolean;
  styling: StylingPropShape;
  height: number | string;
  itemHeight: number;
  selectedItems: string[];
  currentRadiosState: {
    checkedValue: string;
  };
  currentCheckboxesState: {
    finalSelectionArray: string[];
    checkedValues: string[];
  }
}

type FilterNewItemsType = (item: ItemShape | string) => boolean;
type MapNewItemsType = (item: ItemShape | string) => string;
type GetItemLayoutReturnType = { length: number; offset: number; index: number; };
type GetItemLayoutType = (data: ItemShape[] | null | undefined, index: number) => GetItemLayoutReturnType;
type MappedItemsArrType = [string, ItemShape][];

/**
 * Component for rendering a {@link PackenUiDropdown} inner menu list and should not be used standalone
 */
class PackenUiDropdownList extends Component<PackenUiDropdownListProps, PackenUiDropdownListState> {
  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the state
   */
  constructor(props: PackenUiDropdownListProps) {
    super(props);

    /**
     * Variable that stores the state
     * @type {object}
     * @property {string|number} height The component's height
     * @property {number} itemHeight The inner {@link PackenUiDropdownListItem} items height
     * @property {string[]} selectedItems The currently selected items's values
     * @property {object} currentRadiosState Holds the checked value in case it's a radio dropdown
     * @property {object} currentCheckboxesState Holds both the checked values array and the final selection array in case it's a checkbox dropdown
     */
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

  /**
   * Propagates the component instance if a callback is provided via props
   * @type {function}
   */
  componentDidMount() {
    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
  }

  /**
   * Determines whether the parent {@link PackenUiDropdown} should reset its currrent selection state
   * @type {function}
   */
  checkReset: Function = () => {
    if (this.state && this.state.items && this.props.items && this.props.items.length <= 0 && this.props.resetDropdown) {
      this.props.resetDropdown();
    }
  }

  /**
   * Returns the items from the correct data source and removes possible duplicates
   * @type {function}
   * @return {object[]} The list items
   */
  getItems: Function = (): ItemShape[] => {
    let items = [];

    if (this.props.theme === "list") {
      items = this.state && this.state.items ? [...this.state.items] : this.props.items ? [...this.props.items] : [];
    } else {
      items = this.props.items ? [...this.props.items] : [];
    }

    const mappedItemsArr: MappedItemsArrType = this.getItemsAsMappedArrays(items);
    const uniqueItems: ItemShape[] = [...new Map(mappedItemsArr).values()];

    return uniqueItems;
  }

  /**
   * Returns each item mapped to an array to be passed for creating a JavaScript Map
   * @type {function}
   * @param {object[]} items The items array to be displayed
   * @return {Array[]} An array containing each item as another array with two elements: a key which is the item's value, and the actual complete item object
   */
  getItemsAsMappedArrays: Function = (items: ItemShape[]): MappedItemsArrType => items.map(item => [item.value, item]);

  /**
   * Centralizes the received props assignment to set them to the state, determining default values in case any is not provided
   * @type {function}
   * @property {object[]} [items=[]] The items to render
   * @property {string} [theme="default"] The identifier for the type of component to process - "default" if it's a standalone {@link PackenUiDropdown} component, or "list" if it's part of a {@link PackenUiList} and {@link PackenUiListItem} components
   * @property {number} [numShownRows=4] The number of item rows to show at the same time
   * @property {object} [config={}] The configuration for the component's behaviour
   * @property {function} [toggleMenu=false] The passed parent function to toggle the dropdown menu
   * @property {function} [getFinalSelection=false] The callback function to trigger when a new selection is made to pass the value
   * @property {object} [styling={ wrapper: {}, flatlist: {}, item: {} }] The optional custom styling props
   * @return {object} The props mapped to the state keys
   */
  setPropsToState: Function = (): object => {
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

  /**
   * Sets the general item height and total component height to the state
   * @type {function}
   * @param {number} itemHeight The items height
   */
  getItemHeight: Function = (itemHeight: number) => {
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

  /**
   * Returns the selected item if it's a "single" or "radio" selection type
   * @type {function}
   * @param {object} item The item data object
   * @param {string} itemValue The value to compare against
   * @return {object} The same item data object if it's the selected one
   */
  findItemSingleRadio: Function = (item: ItemShape, itemValue: string): boolean => item.value === itemValue;

  /**
   * Handles processing a new selection when it's a "single" or "radio" selection type
   * @type {function}
   * @param {string} itemValue The newly selected value
   * @param {object} payload The additional data to handle each selection type
   */
  handleSingleRadioUpdate: Function = (itemValue: string, payload: PayloadShape): boolean | void => {
    const newItems = [...this.state.items];
    newItems.forEach(item => {
      if (typeof item === "object") { item.isSelected = false; }
    });

    const foundItem = newItems.find(item => this.findItemSingleRadio(item, itemValue));
    if (foundItem && typeof foundItem === "object") { foundItem.isSelected = true; }

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

    if (typeof this.state.toggleMenu === "function") {
      this.state.toggleMenu();
    } else {
      return false;
    }
  }

  /**
   * Returns the selected item if it's a "multiple" or "checkbox" selection type
   * @type {function}
   * @param {object} item The item data object
   * @param {string} itemValue The value to compare against
   * @return {object} The same item data object if it's the selected one
   */
  findItemMultipleCheckbox: Function = (item: ItemShape, itemValue: string): boolean => item.value === itemValue;

  /**
   * Returns only the selected items
   * @type {function}
   * @param {object} item The item to check
   * @return {boolean} Whether the item is currently selected
   */
  filterNewItems: FilterNewItemsType = (item: ItemShape | string): boolean => typeof item === "object" ? item.isSelected : false;

  /**
   * Returns the item's value
   * @type {function}
   * @param {object} item The item to extract its value from
   * @return {string} The item's value
   */
  mapNewItems: MapNewItemsType = (item: ItemShape | string): string => typeof item === "object" ? item.value : "";

  /**
   * Handles processing a new selection when it's a "multiple" or "checkbox" selection type
   * @type {function}
   * @param {string} itemValue The newly selected value
   * @param {boolean} isSelected Flag to determine whether the received item value is selected
   * @param {object} payload The additional data to handle each selection type
   */
  handleMultipleCheckboxUpdate: Function = (itemValue: string, isSelected: boolean, payload: PayloadShape) => {
    const newItems = [...this.state.items];

    const foundItem = newItems.find(item => this.findItemMultipleCheckbox(item, itemValue));
    if (foundItem && typeof foundItem === "object") { foundItem.isSelected = isSelected; }

    const newSelectedItems = newItems.filter(this.filterNewItems);
    const newSelectedItemsStrings = newSelectedItems.map(this.mapNewItems);

    this.setState({
      items: newItems,
      selectedItems: newSelectedItemsStrings
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

  /**
   * Determines how to update the state upon a new selection depending on the selection type
   * @type {function}
   * @param {string} itemValue The selected value
   * @param {boolean} isSelected The selected value's new state
   * @param {object} payload The optional payload with information on how to handle each selection type case
   */
  updateSelectedItems: Function = (itemValue: string, isSelected: boolean, payload: PayloadShape): boolean | void => {
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

  /**
   * Renders a {@link PackenUiDropdownListItem} component for each item
   * @type {function}
   * @param {object} item The item data object
   * @return {node} JSX for an item's {@link PackenUiDropdownListItem} component
   */
  renderItem: ListRenderItem<ItemShape> = ({ item }: { item: ItemShape }): ReactElement => {
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

  /**
   * Returns the layout dimensions of all items for performance optimizations on the inner FlatList
   * @type {function}
   * @return {object} The layout configuration object for the inner {@link PackenUiDropdownListItem} components
   */
  getItemLayout: GetItemLayoutType = (_data: ItemShape[] | null | undefined, index: number): GetItemLayoutReturnType => ({
    length: this.state.itemHeight,
    offset: this.state.itemHeight * index,
    index: index
  })

  /**
   * Updates the state with new props
   * @type {function}
   */
  updateState: Function = () => {
    this.setState({ ...this.setPropsToState() });
  }

  /**
   * Compares props to determine if the component should update its state with new props, and propagates the newly selected items
   * @type {function}
   * @param {object} prevProps Previous props
   * @param {object} prevState Previous state
   */
  componentDidUpdate(prevProps: PackenUiDropdownListProps, prevState: PackenUiDropdownListState): boolean | void {
    if (!UTIL.objectsEqual(prevProps, this.props)) {
      this.updateState();
    }
    if (prevState.selectedItems !== this.state.selectedItems) {
      /* Latest selected items can be used here */
      if (typeof this.state.getFinalSelection === "function") {
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

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render(): ReactNode {
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

  /**
   * Defines prop-types for the component
   * @type {object}
   */
  static propTypes: object = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    numShownRows: PropTypes.number.isRequired,
    config: PropTypes.object.isRequired,
    toggleMenu: PropTypes.func.isRequired,
    getFinalSelection: PropTypes.func.isRequired,
    finalSelectionArray: PropTypes.array,
    styling: PropTypes.object,
    instance: PropTypes.func,
    resetDropdown: PropTypes.func.isRequired,
    theme: PropTypes.string.isRequired
  };
}

export default PackenUiDropdownList;