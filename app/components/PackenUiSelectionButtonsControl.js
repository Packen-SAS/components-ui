import React, { Component } from "react";
import { View, TouchableWithoutFeedback, Image } from "react-native";

import PackenUiText from "./PackenUiText";
import Colors from "../styles/abstracts/colors";

class PackenUiSelectionButtonsControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: props.type,
      data: {...props.data},
      selected: props.selected,
      selection: props.selection,
      source: props.source,
      state: this.getInitialState()
    }
  }

  getInitialState = () => {
    return this.props.data.isSelected ? "active" : "default";
  }

  newSelection = () => {
    this.props.onNewSelection(this.state.data.value);
  }

  getBox = () => {
    let box = null;

    if (this.state.type === "label") {
      box = (
        <TouchableWithoutFeedback onPress={this.newSelection}>
          <View style={[this.getStyles().box.type[this.state.type], this.getStyles().box.state[this.state.state]]}>
            <PackenUiText
              preset="s2"
              style={{
                ...this.getStyles().label.type[this.state.type],
                ...this.getStyles().label.state[this.state.state]
              }}>{this.state.data.label}</PackenUiText>
          </View>
        </TouchableWithoutFeedback>
      );
    } else {
      box = (
        <TouchableWithoutFeedback onPress={this.newSelection}>
          <View style={[this.getStyles().box.type[this.state.type], this.getStyles().box.state[this.state.state]]}>
            <Image source={this.state.source} />
            <PackenUiText
              preset="s2"
              style={{
                ...this.getStyles().label.type[this.state.type],
                ...this.getStyles().label.state[this.state.state]
              }}>{this.state.data.label}</PackenUiText>
          </View>
        </TouchableWithoutFeedback>
      );
    }

    return box;
  }

  checkIfActive = () => {
    let newState = this.state.state;

    if (this.state.type === "label") {
      if (this.props.selected === this.state.data.value) {
        newState = "active";
      } else {
        newState = "default";
      }
    } else {
      this.props.selected.forEach(element => {
        if (element === this.state.data.value) {
          newState = "active";
        } else {
          newState = "default";
        }
      });
    }

    this.setState({
      state: newState,
      selected: this.props.selected
    });

    return newState;
  }

  updateState = prevProps => {
    if (prevProps.selected !== this.props.selected) {
      this.checkIfActive();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.updateState(prevProps);
    }
  }

  render() {
    return this.getBox();
  }

  getStyles = () => {
    return {
      box: {
        type: {
          label: {
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            height: 48,
            width: "auto",
            borderBottomWidth: 4,
            borderBottomStyle: "solid",
            borderBottomColor: "rgba(48, 77, 109, 0.2)",
            backgroundColor: "rgba(48, 77, 109, 0.1)"
          },
          image: {

          }
        },
        state: {
          default: {},
          active: {
            elevation: 5,
            backgroundColor: Colors.brand.primary.snw,
            borderBottomColor: Colors.brand.primary.drk
          }
        }
      },
      img: {

      },
      label: {
        type: {
          label: {
            color: "rgba(48, 77, 109, 0.4)"
          },
          image: {

          }
        },
        state: {
          default: {},
          active: {
            color: Colors.brand.primary.drk
          }
        }
      }
    };
  }
}

export default PackenUiSelectionButtonsControl;