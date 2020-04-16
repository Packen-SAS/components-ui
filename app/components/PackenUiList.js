import React, { Component } from "react";
import { View } from "react-native";

import PackenUiListItem from "./PackenUiListItem";

class PackenUiList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [...props.items],
      customWrapperStyles: { ...props.style }
    }
  }

  updateState = () => {
    this.setState({
      items: [ ...this.props.items ],
      customWrapperStyles: { ...this.props.style }
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.updateState();
    }
  }

  render() {
    return (
      <View style={[this.getStyles().wrapper, { ...this.state.customWrapperStyles }]}>
        {
          this.state.items.map((item, i) => (
            <PackenUiListItem data={item} key={i} />
          ))
        }
      </View>
    );
  }

  getStyles = () => {
    return {
      wrapper: {
        flex: 1,
        width: "100%"
      }
    };
  }
}

export default PackenUiList;