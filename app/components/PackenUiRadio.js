import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import PackenUiRadioControl from "./PackenUiRadioControl";

class PackenUiRadio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.setPropsToState(),
      currentSelection: ""
    }
  }

  componentDidMount() {
    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
  }

  setPropsToState = () => {
    return {
      items: this.props.items ? [...this.props.items] : [],
      checkedIndex: this.props.initialIndex === 0 ? 0 : this.props.initialIndex ? this.props.initialIndex : -1,
      callback: this.props.callback ? this.props.callback : false,
      name: this.props.name ? this.props.name : "",
      layout: this.props.layout ? this.props.layout : "column",
      styling: this.props.styling ? { ...this.props.styling } : {
        container: {},
        item: {},
        control: {}
      }
    };
  }

  findCurrentSelection = () => {
    return this.state.items[this.state.checkedIndex];
  }

  updateCurrentSelection = newSelection => {
    this.setState({
      currentSelection: newSelection
    });
  }

  updateState = () => {
    this.setState({ ...this.setPropsToState() });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.checkedIndex !== this.state.checkedIndex) {
      this.updateCurrentSelection(this.findCurrentSelection());
    }
    if (prevState.currentSelection !== this.state.currentSelection) {
      /* New selection can be used here */
      /* console.log(this.state.currentSelection); */
      if (this.state.callback && this.state.currentSelection) {
        this.state.callback(this.state.name, this.state.currentSelection.value);
      }
      return this.state.currentSelection;
    }
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.updateState();
    }
  }

  setCheckedIndex = newCheckedIndex => {
    this.setState({
      checkedIndex: newCheckedIndex
    });
  }

  mapItems = (item, i) => (
    <View
      key={i}
      pointerEvents={this.state.layout === "dropdown" ? "none" : "auto"}
      style={{ ...this.getStyles().item[this.state.layout], ...this.state.styling.item }}
    >
      <PackenUiRadioControl
        checkedIndex={this.state.checkedIndex}
        selfIndex={i}
        label={item.label}
        isDisabled={item.isDisabled}
        updateCheckedIndex={this.setCheckedIndex}
        styling={this.state.styling.control} />
    </View>
  )

  render() {
    return (
      <View style={{
        ...this.getStyles().container[this.state.layout],
        ...this.state.styling.container
      }}>
        {this.state.items.map(this.mapItems)}
      </View>
    );
  }

  getStyles = () => {
    return {
      container: {
        column: {
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center"
        },
        row: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          flexWrap: "wrap"
        },
        dropdown: {
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "center"
        }
      },
      item: {
        column: {
          marginBottom: 10
        },
        row: {
          marginRight: 20,
          marginBottom: 10
        },
        dropdown: {
          margin: 0
        }
      }
    };
  }
}

PackenUiRadio.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  initialIndex: PropTypes.number.isRequired,
  callback: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  layout: PropTypes.string.isRequired,
  styling: PropTypes.object
}

export default PackenUiRadio;