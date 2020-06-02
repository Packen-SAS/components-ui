import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import ViewPager from '@react-native-community/viewpager';

import PackenUiTabsItem from "./PackenUiTabsItem";

class PackenUiTabs extends Component {
  constructor(props) {
    super(props);
    this.viewPagerRef = null;
    this.state = { ...this.setPropsToState() }
  }

  componentDidMount() {
    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
  }

  setPropsToState = () => {
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

  propagateTabChange = () => {
    if (this.state.onTabChange) {
      this.state.onTabChange(this.state.name, this.state.activeTabIndex);
    }
  }

  updatePagePosition = () => {
    if (this.viewPagerRef) {
      this.viewPagerRef.setPage(this.state.activeTabIndex);
    }
  }

  updateActiveIndex = newActiveIndex => {
    this.setState({
      activeTabIndex: newActiveIndex
    }, () => {
      this.updatePagePosition();
      this.propagateTabChange();
    });
  }

  updateState = () => {
    this.setState({ ...this.setPropsToState() });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      this.updateState();
    }
  }

  getViewPagerRef = ref => { this.viewPagerRef = ref; }

  onPageSelected = e => {
    const newIndex = e.nativeEvent.position;
    this.setState({ activeTabIndex: newIndex }, this.propagateTabChange);
  }

  mapItems = (item, i) => (
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

  mapViews = (item, i) => {
    return (
      <View key={i} style={{ ...this.getStyles().view, ...this.state.styling.view }}>
        {item.view}
      </View>
    );
  }

  render() {
    return (
      <View style={this.getStyles().wrapper}>
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
            style={this.getStyles().viewpager}
            orientation={this.state.orientation}
            onPageSelected={this.onPageSelected}
          >
            {this.state.items.map(this.mapViews)}
          </ViewPager>
        </View>
        {this.state.footerComponent}
      </View>
    );
  }

  getStyles = () => {
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
}

PackenUiTabs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
  activeIndex: PropTypes.number.isRequired,
  orientation: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
  styling: PropTypes.object
};

export default PackenUiTabs;