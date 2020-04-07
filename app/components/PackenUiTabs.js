import React, { Component } from "react";
import { View } from "react-native";

import PackenUiTabItem from "./PackenUiTabItem";

class PackenUiTabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTabIndex: props.activeIndex
    }
  }

  updateActiveIndex = newActiveIndex => {
    this.setState({
      activeTabIndex: newActiveIndex
    });
  }

  render() {
    return (
      <View style={this.getStyles().container}>
        {
          this.props.items.map((item, i) => (
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