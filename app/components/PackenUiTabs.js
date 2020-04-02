import React, { Component } from "react";

import { View } from "react-native";

import TabsStyles from "../styles/components/PackenUiTabs";
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
      <View style={TabsStyles.container}>
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
}

export default PackenUiTabs;