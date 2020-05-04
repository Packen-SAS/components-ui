import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import PackenUiListItem from "./PackenUiListItem";

class PackenUiList extends Component {
  constructor(props) {
    super(props);

    this.state = { ...this.setPropsToState() }
  }

  setPropsToState = () => {
    return {
      items: this.props.items ? [...this.props.items] : [],
      customWrapperStyles: this.props.style ? { ...this.props.style } : {}
    };
  }

  updateState = () => {
    this.setState({ ...this.setPropsToState() });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      this.updateState();
    }
  }

  render() {
    return (
      <View style={[this.getStyles().wrapper, { ...this.state.customWrapperStyles }]}>
        {
          this.state.items.map((item, i) => (
            <View
              style={{
                zIndex: this.state.items.length - i
              }}
            >
              <PackenUiListItem data={item} key={i} />
            </View>
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

PackenUiList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  customWrapperStyles: PropTypes.object
};

export default PackenUiList;