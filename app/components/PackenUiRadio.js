import React, { Component } from "react";
import { View } from "react-native";

import PackenUiRadioControl from "./PackenUiRadioControl";

class PackenUiRadio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [...props.items],
      checkedIndex: props.initialIndex,
      callback: props.callback,
      name: props.name,
      layout: props.layout,
      currentSelection: ""
    }
  }

  updateCheckedIndex = newCheckedIndex => {
    this.setState({
      checkedIndex: newCheckedIndex
    });
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
    this.setState({
      items: [...this.props.items],
      checkedIndex: this.props.initialIndex,
      callback: this.props.callback,
      name: this.props.name,
      layout: this.props.layout
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.checkedIndex !== this.state.checkedIndex) {
      this.updateCurrentSelection(this.findCurrentSelection());
    }
    if (prevState.currentSelection !== this.state.currentSelection) {
      /* New selection can be used here */
      /* console.log(this.state.currentSelection); */
      if (this.state.callback) {
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

  render() {
    return (
      <View style={this.getStyles().container[this.state.layout]}>
        {
          this.state.items.map((item, i) => (
            <View
              key={i}
              style={this.getStyles().item[this.state.layout]}
              pointerEvents={this.state.layout === "dropdown" ?  "none" : "auto"}
            >
              <PackenUiRadioControl
                checkedIndex={this.state.checkedIndex}
                selfIndex={i}
                label={item.label}
                isDisabled={item.isDisabled}
                updateCheckedIndex={this.updateCheckedIndex}/>
            </View>
          ))
        }
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

export default PackenUiRadio;