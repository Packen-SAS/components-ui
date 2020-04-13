import React, { Component } from "react";
import { View } from "react-native";

import PackenUiTabItem from "./PackenUiTabItem";

class PackenUiTabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [...props.items],
      activeTabIndex: props.activeIndex
    }
  }

  updateActiveIndex = newActiveIndex => {
    this.setState({
      activeTabIndex: newActiveIndex
    });
  }

  updateState = () => {
    this.setState({
      items: [...this.props.items],
      activeTabIndex: this.props.activeIndex
    });
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

export default PackenUiTabs;