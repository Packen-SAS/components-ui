import React, { Component, ReactNode } from "react";
import PropTypes from "prop-types";
import { View, NativeSyntheticEvent } from "react-native";
import ViewPager, { ViewPagerOnPageSelectedEventData } from '@react-native-community/viewpager';
import * as UTIL from "../utils";

import PackenUiTabsItem from "./PackenUiTabsItem";

interface ItemShape {
  view: ReactNode;
  label: string;
  icon: string;
  callback: Function;
}

interface StylingPropShape {
  wrapper: object;
  main: object;
  triggers: object;
  item: {
    shape: object;
    iconWrapper: object;
    iconCharacter: object;
    iconSize: number | undefined;
    iconColor: string | undefined;
    label: object;
  };
  viewpager: object;
  view: object;
}

interface PackenUiTabsProps {
  items: ItemShape[];
  name: string;
  activeIndex: number;
  orientation: string;
  onTabChange: Function;
  styling?: object;
  instance?: Function;
  headerComponent: ReactNode;
  footerComponent: ReactNode;
}

interface PackenUiTabsState {
  items: ItemShape[];
  name: string;
  activeTabIndex: number;
  orientation: "vertical" | "horizontal" | undefined;
  onTabChange: Function | boolean;
  headerComponent: ReactNode | null;
  footerComponent: ReactNode | null;
  styling: StylingPropShape;
}

type MapItemsType = (item: ItemShape, i: number) => ReactNode;
type OnPageSelectedType = (event: NativeSyntheticEvent<ViewPagerOnPageSelectedEventData>) => void;
type GetViewPagerRefType = (instance: ViewPager | null) => void;

/**
 * Component for rendering both tabs triggers and content views with optional static header and footer components
 */
class PackenUiTabs extends Component<PackenUiTabsProps, PackenUiTabsState> {
  /**
   * Variable that stores the ViewPager's ref/instance
   * @type {object}
   */
  viewPagerRef: ViewPager | null = null;

  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props: PackenUiTabsProps) {
    super(props);

    /**
     * Variable that stores the state
     * @type {object}
     */
    this.state = { ...this.setPropsToState() }
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
   * Centralizes the received props assignment to set them to the state, determining default values in case any is not provided
   * @type {function}
   * @property {object[]} [items=[]] The array of items data objects
   * @property {string} [name=""] The identifier of this set of tabs
   * @property {number} [activeTabIndex=0] The initially active tab index
   * @property {string} [orientation="horizontal"] The transition direction for the inner ViewPager
   * @property {function} [onTabChange=false] The callback function to be called when changing tabs
   * @property {node} [headerComponent=null] The optional header component
   * @property {node} [footerComponent=null] The optional footer component
   * @property {object} [styling={ wrapper: {}, main: {}, triggers: {}, item: {}, viewpager: {}, view: {} }] The optional custom styling props
   * @return {object} The props mapped to the state keys
   */
  setPropsToState: Function = (): object => {
    return {
      items: this.props.items ? [...this.props.items] : [],
      name: this.props.name ? this.props.name : "",
      activeTabIndex: this.props.activeIndex ? this.props.activeIndex : 0,
      orientation: this.props.orientation ? this.props.orientation : "horizontal",
      onTabChange: this.props.onTabChange ? this.props.onTabChange : false,
      headerComponent: this.props.headerComponent ? this.props.headerComponent : null,
      footerComponent: this.props.footerComponent ? this.props.footerComponent : null,
      styling: this.props.styling ? { ...this.props.styling } : {
        wrapper: {},
        main: {},
        triggers: {},
        item: {},
        viewpager: {},
        view: {}
      }
    };
  }

  /**
   * Propagates the new index when changing tabs
   * @type {function}
   */
  propagateTabChange: Function = () => {
    if (typeof this.state.onTabChange === "function") {
      this.state.onTabChange(this.state.name, this.state.activeTabIndex);
    }
  }

  /**
   * Triggers the optional callback when a specific tab is displayed if it's provided
   * @type {function}
   */
  triggerTabCallback: Function = () => {
    if (this.state.items.length > 0 && this.state.items[this.state.activeTabIndex].callback) {
      this.state.items[this.state.activeTabIndex].callback();
    }
  }

  /**
   * Programmatically changes the displayed ViewPager's page to match the currently selected tab index
   * @type {function}
   */
  updatePagePosition: Function = () => {
    if (this.viewPagerRef) {
      this.viewPagerRef.setPage(this.state.activeTabIndex);
    }
  }

  /**
   * Updates the currently selected tab index, the displayed page, and propagates the change
   * @type {function}
   * @param {number} newActiveIndex The newly selected tab index
   */
  updateActiveIndex: Function = (newActiveIndex: number) => {
    this.setState({
      activeTabIndex: newActiveIndex
    }, () => {
      this.updatePagePosition();
      this.propagateTabChange();
    });
  }

  /**
   * Updates the state with new props
   * @type {function}
   */
  updateState: Function = () => {
    this.setState({ ...this.setPropsToState() });
  }

  /**
   * Compares props to determine if the component should update its state with new props
   * @type {function}
   * @param {object} prevProps Previous props
   */
  componentDidUpdate(prevProps: PackenUiTabsProps) {
    if (!UTIL.objectsEqual(prevProps, this.props)) {
      this.updateState();
    }
  }

  /**
   * Sets the ViewPager's ref to the global variable
   * @type {function}
   * @param {object} ref The ViewPager's ref/instance
   */
  getViewPagerRef: GetViewPagerRefType = (ref: ViewPager | null) => { this.viewPagerRef = ref; }

  /**
   * Handles when a new page from the ViewPager is displayed, setting the new position index to the state
   * @type {function}
   * @param {object} e The event object
   */
  onPageSelected: OnPageSelectedType = (e: NativeSyntheticEvent<ViewPagerOnPageSelectedEventData>) => {
    const newIndex = e.nativeEvent.position;
    this.setState({ activeTabIndex: newIndex }, () => {
      this.propagateTabChange();
      this.triggerTabCallback();
    });
  }

  /**
   * Returns a {@link PackenUiTabsItem} component for each item to be used as a trigger
   * @type {function}
   * @param {object} item The item's data object
   * @param {number} i The item's index
   * @return {node} JSX for the item's trigger
   */
  mapItems: MapItemsType = (item: ItemShape, i: number): ReactNode => (
    <PackenUiTabsItem
      key={`${item.label}-${i}`}
      activeTabIndex={this.state.activeTabIndex}
      selfIndex={i}
      label={item.label}
      icon={item.icon}
      updateActiveTabIndex={this.updateActiveIndex}
      callback={item.callback}
      styling={this.state.styling.item}
    />
  )

  /**
   * Returns each item's view
   * @type {function}
   * @param {object} item The item's data object
   * @param {number} i The item's index
   * @return {node} JSX for the item's view
   */
  mapViews: MapItemsType = (item: ItemShape, i: number): ReactNode => (
    <View key={i} style={{ ...this.getStyles().view, ...this.state.styling.view }}>
      {item.view}
    </View>
  );

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render(): ReactNode {
    return (
      <View style={{ ...this.getStyles().wrapper, ...this.state.styling.wrapper }}>
        {this.state.headerComponent}
        <View style={{ ...this.getStyles().main, ...this.state.styling.main }}>
          <View style={{ ...this.getStyles().triggers, ...this.state.styling.triggers }}>
            {this.state.items.map(this.mapItems)}
          </View>
          <ViewPager
            ref={this.getViewPagerRef}
            initialPage={this.state.activeTabIndex}
            pageMargin={0}
            scrollEnabled={true}
            transitionStyle="scroll"
            showPageIndicator={false}
            keyboardDismissMode="on-drag"
            orientation={this.state.orientation}
            onPageSelected={this.onPageSelected}
            style={{ ...this.getStyles().viewpager, ...this.state.styling.viewpager }}
          >
            {this.state.items.map(this.mapViews)}
          </ViewPager>
        </View>
        {this.state.footerComponent}
      </View>
    );
  }

  /**
   * Returns the current styles object
   * @type {function}
   * @return {object} The current styles object
   */
  getStyles: Function = (): object => {
    return {
      wrapper: { flex: 1 },
      main: { flex: 1 },
      triggers: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-around"
      },
      viewpager: { flex: 1 },
      view: { flex: 1 }
    };
  }

  /**
   * Defines prop-types for the subcomponent
   * @type {object}
   */
  static propTypes: object = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    name: PropTypes.string.isRequired,
    activeIndex: PropTypes.number.isRequired,
    orientation: PropTypes.string.isRequired,
    onTabChange: PropTypes.func.isRequired,
    styling: PropTypes.object,
    instance: PropTypes.func,
    headerComponent: PropTypes.node,
    footerComponent: PropTypes.node
  };
}

export default PackenUiTabs;