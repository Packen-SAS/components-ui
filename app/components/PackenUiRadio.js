import React, { Component } from "react";
import { View } from "react-native";

import PackenUiRadioControl from "./PackenUiRadioControl";

class PackenUiRadio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedIndex: props.initialIndex,
      currentSelection: ""
    }
  }

  updateCheckedIndex = newCheckedIndex => {
    this.setState({
      checkedIndex: newCheckedIndex
    });
  }

  findCurrentSelection = () => {
    return this.props.items[this.state.checkedIndex];
  }

  updateCurrentSelection = newSelection => {
    this.setState({
      currentSelection: newSelection
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.checkedIndex !== this.state.checkedIndex) {
      this.updateCurrentSelection(this.findCurrentSelection());
    }
    if (prevState.currentSelection !== this.state.currentSelection) {
      /* New selection can be used here */
      /* console.log(this.state.currentSelection); */
      if (this.props.callback) {
        this.props.callback(this.props.name, this.state.currentSelection.value);
      }
      return this.state.currentSelection;
    }
  }

  setCheckedIndex = newCheckedIndex => {
    this.setState({
      checkedIndex: newCheckedIndex
    });
  }

  render() {
    return (
      <View style={this.getStyles().container[this.props.layout]}>
        {
          this.props.items.map((item, i) => (
            <View
              key={i}
              style={this.getStyles().item[this.props.layout]}
              pointerEvents={this.props.layout === "dropdown" ?  "none" : "auto"}
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