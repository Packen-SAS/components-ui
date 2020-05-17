import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import PackenUiTabItem from "./PackenUiTabItem";

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
      onTabChange: this.props.onTabChange ? this.props.onTabChange : false
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
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.updateState();
    }
  }

  render() {
    return (
      <View style={this.getStyles().container}>
        {
          this.state.items.map((item, i) => (
            <PackenUiTabItem
              key={`${item.label}-${i}`}
              activeTabIndex={this.state.activeTabIndex}
              selfIndex={i}
              label={item.label}
              icon={item.icon}
              updateActiveTabIndex={this.updateActiveIndex}
              callback={item.callback}/>
          ))
        }
      </View>
    );
  }

  getStyles = () => {
    return {
      container: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-around"
      }
    };
  }
}

PackenUiTabs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
  activeIndex: PropTypes.number.isRequired,
  onTabChange: PropTypes.func.isRequired
};

export default PackenUiTabs;