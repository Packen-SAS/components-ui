import React, { Component } from "react";
import { View, TouchableWithoutFeedback } from "react-native";

import ToggleStyles from "../styles/components/PackenToggle";
import PackenText from "../components/PackenText";

class PackenToggle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      state: props.isActive ? "active" : "inactive",
      isDisabled: props.isDisabled,
      shape: {
        height: 0,
        width: 0,
        disabled: {}
      },
      dot: {
        height: 0,
        width: 0,
        position: {},
        disabled: {}
      },
      on: {
        height: 0,
        width: 0,
        position: {},
        disabled: {}
      },
      off: {
        height: 0,
        width: 0,
        position: {},
        disabled: {}
      }
    }
  }

  componentDidMount = () => {
    this.position_elements();
    this.check_if_disabled();
  }

  set_disabled_styles = prevState => {
    this.setState({
      shape: {
        ...this.state.shape,
        disabled: {
          ...ToggleStyles.shape.disabled
        }
      },
      dot: {
        ...this.state.dot,
        disabled: {
          ...ToggleStyles.dot.disabled
        }
      },
      on: {
        ...this.state.on,
        disabled: {
          ...ToggleStyles.label.on.disabled
        }
      },
      off: {
        ...this.state.off,
        disabled: {
          ...ToggleStyles.label.off.disabled
        }
      }
    });
  }

  check_if_disabled = () => {
    if (this.props.isDisabled) {
      let newState = "";

      if (this.state.state === "active") {
        newState = "disabled_active";
      } else {
        newState = "disabled_inactive"
      }

      this.setState({
        state: newState
      }, () => {
        this.set_disabled_styles();
      });
    }
  }

  get_shape_dimensions = e => {
    const { height, width } = e.nativeEvent.layout;
    this.setState({
      shape: {
        ...this.state.shape,
        height: height,
        width: width
      }
    }, this.position_elements);
  }

  get_dot_dimensions = e => {
    const { height, width } = e.nativeEvent.layout;
    this.setState({
      dot: {
        ...this.state.dot,
        height: height,
        width: width
      }
    }, this.position_elements);
  }

  get_on_dimensions = e => {
    const { height, width } = e.nativeEvent.layout;
    this.setState({
      on: {
        ...this.state.on,
        height: height,
        width: width
      }
    }, this.position_elements);
  }

  get_off_dimensions = e => {
    const { height, width } = e.nativeEvent.layout;
    this.setState({
      off: {
        ...this.state.off,
        height: height,
        width: width
      }
    }, this.position_elements);
  }

  position_elements = () => {
    const positionStyles = this.get_position_styles();
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

  get_position_styles = () => {
    let positionStyles = {};

    if (this.state.state === "active") {
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
    } else if (this.state.state === "inactive") {
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
      this.props.toggleHandler(this.state.state);
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.state !== this.state.state) {
      this.position_elements();
    }
  }

  render() {
    return (
      <View pointerEvents={this.state.isDisabled ? "none" : "auto"}>
        <TouchableWithoutFeedback onPress={this.toggle}>
          <View style={{
            ...ToggleStyles.shape.default,
            ...ToggleStyles.shape[this.state.state],
            ...this.state.shape.disabled
          }} onLayout={e => { this.get_shape_dimensions(e); }}>
            <View style={{
              ...ToggleStyles.dot.default,
              ...ToggleStyles.dot[this.state.state],
              ...this.state.dot.positioning,
              ...this.state.dot.disabled
            }} onLayout={e => { this.get_dot_dimensions(e); }}></View>
            <View onLayout={e => { this.get_on_dimensions(e); }} style={this.state.on.positioning}>
              <PackenText style={{
                ...ToggleStyles.label.default,
                ...ToggleStyles.label.on[this.state.state],
                ...this.state.on.disabled
              }}>{this.props.onLabel}</PackenText>
            </View>
            <View onLayout={e => { this.get_off_dimensions(e); }} style={this.state.off.positioning}>
              <PackenText style={{
                ...ToggleStyles.label.default,
                ...ToggleStyles.label.off[this.state.state],
                ...this.state.off.disabled
              }}>{this.props.offLabel}</PackenText>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default PackenToggle;