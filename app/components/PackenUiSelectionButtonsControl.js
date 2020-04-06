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
      state: this.getInitialState(),
      config: {
        label: {
          preset: "s2"
        },
        image: {
          source: props.source
        }
      }
    }
  }

  getInitialState = () => {
    let state;

    if (this.props.selection === "single") {
      state = this.props.selected === this.props.data.value ? "active" : "default";
    } else {
      state = this.props.selected.includes(this.props.data.value) ? "active" : "default";
    }

    return state;
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
              preset={this.state.config.label.preset}
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
            <Image source={this.state.config.image.source} />
            <PackenUiText
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
    let newState = {...this.state};

    if (this.state.selection === "single") {
      if (this.props.selected === this.state.data.value) {
        newState.state = "active";
      } else {
        newState.state = "default";
      }
    } else {
      if (this.props.selected.includes(this.state.data.value)) {
        newState.state = "active";
      } else {
        newState.state = "default";
      }
    }

    if (this.state.type === "label") {
      if (newState.state === "active") {
        newState.config.label.preset = "s1";
      } else {
        newState.config.label.preset = "s2";
      }
    }

    newState.selected = this.props.selected;
    this.setState(newState);
    
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