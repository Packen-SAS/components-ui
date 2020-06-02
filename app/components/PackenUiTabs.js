import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import ViewPager from '@react-native-community/viewpager';

import PackenUiTabsItem from "./PackenUiTabsItem";

class PackenUiTabs extends Component {
  constructor(props) {
    super(props);

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
      onTabChange: this.props.onTabChange ? this.props.onTabChange : false,
      styling: this.props.styling ? { ...this.props.styling } : {
        container: {},
        item: {}
      }
    };
  }

  updateActiveIndex = newActiveIndex => {
    this.setState({
      activeTabIndex: newActiveIndex
    }, () => {
      if (this.state.onTabChange) {
        this.state.onTabChange(this.state.name, this.state.activeTabIndex);
      }
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
      <View key={i}>
        {item.view}
      </View>
    );
  }

  render() {
    return (
      <React.Fragment>
        <View style={{ ...this.getStyles().container, ...this.state.styling.container }}>
          {this.state.items.map(this.mapItems)}
        </View>
        <ViewPager
          initialPage={0}
          scrollEnabled={true}
          transitionStyle="scroll"
          orientation="horizontal"
          showPageIndicator={false}
          style={this.getStyles().viewpager}
        >
          {this.state.items.map(this.mapViews)}
        </ViewPager>
      </React.Fragment>
    );
  }

  getStyles = () => {
    return {
      container: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-around"
      },
      viewpager: {
        height: 500,
        
      }
    };
  }
}

PackenUiTabs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
  activeIndex: PropTypes.number.isRequired,
  onTabChange: PropTypes.func.isRequired,
  styling: PropTypes.object
};

export default PackenUiTabs;