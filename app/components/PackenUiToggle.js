import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TouchableWithoutFeedback } from "react-native";

import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";

import PackenUiText from "../components/PackenUiText";

class PackenUiToggle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.setPropsToState(),
      initialState: this.setInitialState(),
      shape: {
        height: 0,
        width: 0,
        disabled: {}
      },
      dot: {
        height: 0,
        width: 0,
        positioning: {},
        disabled: {}
      },
      on: {
        height: 0,
        width: 0,
        positioning: {},
        disabled: {}
      },
      off: {
        height: 0,
        width: 0,
        positioning: {},
        disabled: {}
      }
    }
  }

  setPropsToState = () => {
    return {
      isActive: this.props.isActive ? this.props.isActive : false,
      isDisabled: this.props.isDisabled ? this.props.isDisabled : false,
      toggleHandler: this.props.toggleHandler ? this.props.toggleHandler : false,
      name: this.props.name ? this.props.name : "",
      onLabel: this.props.onLabel ? this.props.onLabel : "",
      offLabel: this.props.offLabel ? this.props.offLabel : "",
      state: this.setInitialState()
    };
  }

  setInitialState = () => {
    return this.props.isActive ? "active" : "inactive";
  }

  componentDidMount = () => {
    this.positionElement();
    this.checkIfDisabled();

    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
  }

  setDisabledStyles = () => {
    this.setState({
      shape: {
        ...this.state.shape,
        disabled: {
          ...this.getStyles().shape.disabled
        }
      },
      dot: {
        ...this.state.dot,
        disabled: {
          ...this.getStyles().dot.disabled
        }
      },
      on: {
        ...this.state.on,
        disabled: {
          ...this.getStyles().label.on.disabled
        }
      },
      off: {
        ...this.state.off,
        disabled: {
          ...this.getStyles().label.off.disabled
        }
      }
    });
  }

  checkIfDisabled = () => {
    if (this.state.isDisabled) {
      this.setState({
        state: "disabled"
      }, this.setDisabledStyles);
    }
  }

  getShapeDimensions = e => {
    const { height, width } = e.nativeEvent.layout;
    this.setState({
      shape: {
        ...this.state.shape,
        height: height,
        width: width
      }
    }, this.positionElement);
  }

  getDotDimensions = e => {
    const { height, width } = e.nativeEvent.layout;
    this.setState({
      dot: {
        ...this.state.dot,
        height: height,
        width: width
      }
    }, this.positionElement);
  }

  getOnDimensions = e => {
    const { height, width } = e.nativeEvent.layout;
    this.setState({
      on: {
        ...this.state.on,
        height: height,
        width: width
      }
    }, this.positionElement);
  }

  getOffDimensions = e => {
    const { height, width } = e.nativeEvent.layout;
    this.setState({
      off: {
        ...this.state.off,
        height: height,
        width: width
      }
    }, this.positionElement);
  }

  positionElement = () => {
    const positionStyles = this.getPositionStyles();
    this.setState({
      dot: {
        ...this.state.dot,
        positioning: positionStyles.dot
      },
      on: {
        ...this.state.on,
        positioning: positionStyles.on
      },
      off: {
        ...this.state.off,
        positioning: positionStyles.off
      }
    });
  }

  getPositionStyles = () => {
    let positionStyles = {};
    const state = this.state.isDisabled ? this.state.initialState : this.state.state;

    if (state === "active") {
      positionStyles = {
        dot: {
          top: 2,
          right: 2
        },
        on: {
          position: "absolute",
          top: (this.state.shape.height / 2) + (this.state.on.height / 2),
          left: 8,
          bottom: "auto",
          right: "auto"
        },
        off: {
          opacity: 0
        }
      }
    } else if (state === "inactive") {
      positionStyles = {
        dot: {
          top: 2,
          left: 2
        },
        on: {
          opacity: 0
        },
        off: {
          position: "absolute",
          top: (this.state.shape.height / 2) + (this.state.off.height / 2),
          right: 8,
          bottom: "auto",
          left: "auto"
        }
      }
    }

    return positionStyles;
  }

  toggle = () => {
    this.setState({
      state: this.state.state === "active" ? "inactive" : "active"
    }, () => {
      if (this.state.toggleHandler) {
        this.state.toggleHandler(this.state.name, this.state.state === "active" ? true : false);
      }
    });
  }

  updateState = () => {
    this.setState({ ...this.setPropsToState() });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.state !== this.state.state) {
      this.positionElement();
      this.checkIfDisabled();
    }
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.updateState();
    }
  }

  render() {
    return (
      <View pointerEvents={this.state.isDisabled ? "none" : "auto"}>
        <TouchableWithoutFeedback onPress={this.toggle}>
          <View style={{
            ...this.getStyles().shape.default,
            ...this.getStyles().shape[this.state.state],
            ...this.state.shape.disabled
          }} onLayout={e => { this.getShapeDimensions(e); }}>
            <View style={{
              ...this.getStyles().dot.default,
              ...this.getStyles().dot[this.state.state],
              ...this.state.dot.positioning,
              ...this.state.dot.disabled
            }} onLayout={e => { this.getDotDimensions(e); }}></View>
            <View onLayout={e => { this.getOnDimensions(e); }} style={this.state.on.positioning}>
              <PackenUiText style={{
                ...this.getStyles().label.default,
                ...this.getStyles().label.on[this.state.state],
                ...this.state.on.disabled
              }}>{this.state.onLabel}</PackenUiText>
            </View>
            <View onLayout={e => { this.getOffDimensions(e); }} style={this.state.off.positioning}>
              <PackenUiText style={{
                ...this.getStyles().label.default,
                ...this.getStyles().label.off[this.state.state],
                ...this.state.off.disabled
              }}>{this.state.offLabel}</PackenUiText>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  getStyles = () => {
    return {
      shape: {
        default: {
          height: 24,
          width: 56,
          borderRadius: 100
        },
        active: {
          backgroundColor: Colors.brand.primary.drk
        },
        inactive: {
          backgroundColor: Colors.basic.independence.drk
        },
        disabled: {
          backgroundColor: Colors.base.disabled_alt
        }
      },
      dot: {
        default: {
          height: 20,
          width: 20,
          borderRadius: 50,
          position: "absolute"
        },
        active: {
          backgroundColor: Colors.brand.primary.snw
        },
        inactive: {
          backgroundColor: Colors.basic.gray.lgt
        },
        disabled: {
          backgroundColor: Colors.basic.white.dft
        }
      },
      label: {
        default: {
          opacity: 0.6,
          fontFamily: Typography.family.bold,
          fontSize: Typography.size.tiny,
          lineHeight: Typography.lineheight.tiny,
          position: "absolute"
        },
        on: {
          active: {
            color: Colors.brand.primary.ulgt,
            top: -6,
            left: 0
          },
          inactive: {
            top: -6,
            left: 0,
            opacity: 0
          },
          disabled: {
            top: -6,
            left: 0,
            opacity: 0.6,
            color: Colors.basic.white.dft
          }
        },
        off: {
          active: {
            opacity: 0,
            top: -6,
            right: 0
          },
          inactive: {
            top: -6,
            right: 0,
            color: Colors.basic.gray.drk
          },
          disabled: {
            top: -6,
            right: 0,
            opacity: 0.6,
            color: Colors.basic.white.dft
          }
        }
      }
    };
  }
}

PackenUiToggle.propTypes = {
  isActive: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool,
  toggleHandler: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onLabel: PropTypes.string.isRequired,
  offLabel: PropTypes.string.isRequired
};

export default PackenUiToggle;