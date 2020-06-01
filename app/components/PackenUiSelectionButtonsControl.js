import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TouchableWithoutFeedback, Image } from "react-native";

import PackenUiText from "./PackenUiText";
import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";
import Shadows from "../styles/abstracts/shadows";

class PackenUiSelectionButtonsControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.setPropsToState(),
      state: this.getInitialState(),
      config: this.getConfig(),
      labelPreset: "s2"
    }
  }

  componentDidMount() {
    if (this.state.type === "label") {
      this.setState({
        labelPreset: this.state.config.label.preset
      });
    }
    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
  }

  setPropsToState = () => {
    return {
      altStyle: this.props.altStyle ? this.props.altStyle : false,
      type: this.props.type ? this.props.type : "label",
      data: this.props.data ? { ...this.props.data } : {
        value: "",
        label: "",
        image: {
          src: "",
          width: 0,
          height: 0
        }
      },
      selected: this.props.selected === false ? false : this.props.selected ? this.props.selected : [],
      selection: this.props.selection ? this.props.selection : "single",
      onNewSelection: this.props.onNewSelection ? this.props.onNewSelection : false,
      styling: this.props.styling ? { ...this.props.styling } : {
        box: {},
        image: {},
        label: {}
      }
    };
  }

  getConfig = () => {
    let config = {};
    const { data, altStyle } = this.setPropsToState();

    if (this.props.type === "label") {
      config = {
        label: {
          preset: altStyle ? "h6" : "s2"
        }
      };
    } else {
      config = {
        image: { ...data.image }
      }
    }

    return config;
  }

  getInitialState = () => {
    let state;
    const data = this.setPropsToState().data;
    const selection = this.setPropsToState().selection;
    const selected = this.setPropsToState().selected;

    if (selection === "single") {
      state = selected === data.value ? "active" : "default";
    } else {
      state = selected.includes(data.value) ? "active" : "default";
    }

    return state;
  }

  newSelection = () => {
    if (this.state.onNewSelection) {
      this.state.onNewSelection(this.state.data.value);
    } else {
      return false;
    }
  }

  getImage = () => {
    let image = null;

    if (this.state.type === "image") {
      image = (
        <Image
          source={this.state.config.image[this.state.state].src}
          style={{
            ...this.getStyles().img.base,
            ...this.getStyles().img.state[this.state.state],
            width: this.state.config.image[this.state.state].width,
            height: this.state.config.image[this.state.state].height,
            ...this.state.styling.image
          }}
        />
      );
    }

    return image;
  }

  checkIfActive = () => {
    let newState = { ...this.state };

    if (this.state.selection === "single") {
      if (this.state.selected === this.state.data.value) {
        newState.state = "active";
      } else {
        newState.state = "default";
      }
    } else {
      if (this.state.selected.includes(this.state.data.value)) {
        newState.state = "active";
      } else {
        newState.state = "default";
      }
    }

    if (this.state.type === "label") {
      if (newState.state === "active") {
        newState.config = {
          label: {
            preset: "s1"
          }
        };
      } else {
        newState.config = {
          label: {
            preset: "s2"
          }
        };
      }
    }

    newState.selected = this.state.selected;
    this.setState(newState);

    return newState;
  }

  updateState = prevProps => {
    this.setState({
      ...this.setPropsToState()
    }, () => {
      if (prevProps.selected !== this.props.selected && this.state.selected !== undefined) {
        this.checkIfActive();
      }
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.updateState(prevProps);
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.newSelection}>
        <View style={{
          ...this.getStyles().box.type[this.state.type],
          ...this.getStyles().box.state[this.state.state].type[this.state.type],
          ...this.getStyles().box.altStyle[this.state.altStyle].base,
          ...this.getStyles().box.altStyle[this.state.altStyle].state[this.state.state],
          ...this.state.styling.box
        }}>
          {this.getImage()}
          <PackenUiText
            preset={this.state.labelPreset}
            style={{
              ...this.getStyles().label.type[this.state.type],
              ...this.getStyles().label.state[this.state.state].type[this.state.type],
              ...this.getStyles().label.altStyle[this.state.altStyle].state[this.state.state],
              ...this.state.styling.label
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
            borderColor: Colors.basic.gray.lgt,
            backgroundColor: Colors.basic.gray.lgt,
            borderRadius: 8
          }
        },
        state: {
          default: { type: { label: {}, image: {} } },
          active: {
            type: {
              label: {
                backgroundColor: Colors.brand.primary.snw,
                borderBottomColor: Colors.brand.primary.drk,
                ...Shadows.md
              },
              image: {
                backgroundColor: Colors.brand.primary.snw,
                borderColor: Colors.brand.primary.drk,
                ...Shadows.md
              }
            }
          }
        },
        altStyle: {
          false: { base: {}, state: { default: {}, active: {} } },
          true: {
            base: {
              borderRadius: 8,
              borderWidth: 1,
              borderBottomWidth: 1,
              borderColor: Colors.basic.gray.lgt
            },
            state: {
              default: {
                backgroundColor: Colors.basic.gray.lgt,
                borderBottomColor: Colors.basic.gray.lgt
              },
              active: {
                borderColor: Colors.brand.primary.drk
              }
            }
          }
        }
      },
      img: {
        base: {
          marginBottom: 10
        },
        state: {
          default: {},
          active: {}
        }
      },
      label: {
        type: {
          label: {
            color: "rgba(48, 77, 109, 0.4)"
          },
          image: {
            color: Colors.basic.independence.dft,
            fontFamily: Typography.family.bold,
            fontSize: Typography.size.giant,
            lineHeight: Typography.lineheight.huge
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
                color: Colors.brand.primary.udrk
              }
            }
          }
        },
        altStyle: {
          false: { state: { default: {}, active: {} } },
          true: {
            state: {
              default: {
                color: Colors.basic.independence.lgt
              },
              active: {
                color: Colors.brand.primary.udrk
              }
            }
          }
        }
      }
    };
  }
}

PackenUiSelectionButtonsControl.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  selected: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.bool]).isRequired,
  selection: PropTypes.string.isRequired,
  onNewSelection: PropTypes.func.isRequired
};

export default PackenUiSelectionButtonsControl;