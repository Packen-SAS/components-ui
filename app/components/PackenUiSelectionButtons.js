import React, { Component } from "react";
import { View } from "react-native";

import PackenUiSelectionButtonsControl from "./PackenUiSelectionButtonsControl";

class PackenUiSelectionButtons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: props.type,
      items: [...props.items],
      selection: props.selection,
      itemsPerRow: props.itemsPerRow,
      selected: this.getInitialSelected()
    }
  }

  getInitialSelected = () => {
    return this.props.selection === "single" ? "" : [];
  }

  newSelectionHandler = newValue => {
    let newSelected;

    if (this.state.type === "label") {
      newSelected = newValue;
    } else {
      newSelected = [...this.state.selected];
      newSelected.push(newValue);
      newSelected = [...new Set(newSelected)];
    }

    this.setState({
      selected: newSelected
    });

    console.log(newSelected);

    return newSelected;
  }

  render() {
    return (
      <View style={[this.getStyles().wrapper.base, this.getStyles().wrapper.type[this.state.type]]}>
        {
          this.state.items.map((item, i) => (
            <View key={i} style={[this.getStyles().item.type[this.state.type], { width: `${100/this.state.itemsPerRow}%` }]}>
              <PackenUiSelectionButtonsControl
                data={item}
                type={this.state.type}
                selected={this.state.selected}
                selection={this.state.selection}
                onNewSelection={this.newSelectionHandler}
              />
            </View>
          ))
        }
      </View>
    );
  }

  getStyles = () => {
    return {
      wrapper: {
        base: {
          flexDirection: "row",
          alignItems: "stretch",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          flex: 1
        },
        type: {
          label: {
            marginVertical: -4,
            marginHorizontal: -12
          },
          image: {
            margin: -12
          }
        }
      },
      item: {
        type: {
          label: {
            paddingVertical: 4,
            paddingHorizontal: 12
          },
          image: {
            padding: 12
          }
        }
      }
    };
  }
}

export default PackenUiSelectionButtons;