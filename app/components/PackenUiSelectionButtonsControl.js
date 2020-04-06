import React, { Component } from "react";
import { View, TouchableWithoutFeedback, Image } from "react-native";

import PackenUiText from "./PackenUiText";
import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";

class PackenUiSelectionButtonsControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: props.type,
      data: { ...props.data },
      selected: props.selected,
      selection: props.selection,
      state: this.getInitialState(),
      config: this.getConfig()
    }
  }

  getConfig = () => {
    let config = {};

    if (this.props.type === "label") {
      config = {
        label: {
          preset: "s2"
        }
      };
    } else {
      config = {
        image: {
          src: this.props.data.image.src,
          width: this.props.data.image.width,
          height: this.props.data.image.height
        }
      }
    }

    return config;
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

  getImage = () => {
    let image = null;

    if (this.state.type === "image") {
      image = (
        <Image
          source={this.state.config.image.src}
          style={[
            this.getStyles().img.base,
            this.getStyles().img.state[this.state.state],
            { width: this.state.config.image.width, height: this.state.config.image.height }
          ]}
        />
      );
    }

    return image;
  }

  checkIfActive = () => {
    let newState = { ...this.state };

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
    return (
      <TouchableWithoutFeedback onPress={this.newSelection}>
        <View style={[this.getStyles().box.type[this.state.type], this.getStyles().box.state[this.state.state].type[this.state.type]]}>
          {this.getImage()}
          <PackenUiText
            style={{
              ...this.getStyles().label.type[this.state.type],
              ...this.getStyles().label.state[this.state.state].type[this.state.type]
            }}>{this.state.data.label}</PackenUiText>
        </View>
      </TouchableWithoutFeedback>
    );
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
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            height: 120,
            width: "auto",
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: Colors.basic.white.drk,
            backgroundColor: Colors.basic.white.dft,
            borderRadius: 4
          }
        },
        state: {
          default: { type: { label: {}, image: {} } },
          active: {
            type: {
              label: {
                elevation: 5,
                backgroundColor: Colors.brand.primary.snw,
                borderBottomColor: Colors.brand.primary.drk
              },
              image: {
                elevation: 5,
                backgroundColor: Colors.brand.primary.snw,
                borderColor: Colors.brand.primary.ulgt
              }
            }
          }
        }
      },
      img: {
        base: {
          opacity: 0.35,
          marginBottom: 10
        },
        state: {
          default: {},
          active: {
            opacity: 1
          }
        }
      },
      label: {
        type: {
          label: {
            color: "rgba(48, 77, 109, 0.4)"
          },
          image: {
            color: Colors.basic.independence.lgt,
            fontFamily: Typography.family.regular,
            fontSize: Typography.size.small,
            lineHeight: Typography.lineheight.medium_alt
          }
        },
        state: {
          default: { type: { label: {}, image: {} } },
          active: {
            type: {
              label: {
                color: Colors.brand.primary.drk
              },
              image: {
                color: Colors.basic.yankees.dft
              }
            }
          }
        }
      }
    };
  }
}

export default PackenUiSelectionButtonsControl;