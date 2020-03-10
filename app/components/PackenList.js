import React, { Component } from "react";
import { View, FlatList, ScrollView } from "react-native";

import PackenListItem from "./PackenListItem";

class PackenList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: "100%"
    }
  }

  get_item_height = itemHeight => {
    this.setState({
      height: itemHeight * this.props.numShownRows
    });
  }

  render_item = ({ item }) => {
    return <PackenListItem config={this.props.config} mainContent={item} getItemHeight={this.get_item_height}/>;
  }

  render() {
    return (
      <View style={{ height: this.state.height }}>
        <FlatList
          nestedScrollEnabled
          data={this.props.items}
          renderItem={this.render_item}
          style={{ height: this.state.height }}
        />
      </View>
    );
  }
}

export default PackenList;