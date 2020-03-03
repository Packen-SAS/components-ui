import React, { Component } from "react";

import { View } from "react-native";

import TabsStyles from "../styles/components/PackenTabs";
import PackenTabItem from "./PackenTabItem";

class PackenTabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTabIndex: props.activeIndex
    }
  }

  update_active_index = newActiveIndex => {
    this.setState({
      activeTabIndex: newActiveIndex
    });
  }

  render() {
    return (
      <View style={TabsStyles.container}>
        {
          this.props.items.map((item, i) => (
            <PackenTabItem
              key={`${item.label}-${i}`}
              activeTabIndex={this.state.activeTabIndex}
              selfIndex={i}
              label={item.label}
              updateActiveTabIndex={this.update_active_index}
              callback={item.callback}/>
          ))
        }
      </View>
    );
  }
}

export default PackenTabs;