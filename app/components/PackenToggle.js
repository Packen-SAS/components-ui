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
        width: 0
      },
      dot: {
        height: 0,
        width: 0,
        position: {}
      },
      on: {
        height: 0,
        width: 0,
        position: {}
      },
      off: {
        height: 0,
        width: 0,
        position: {}
      }
    }
  }

  componentDidMount = () => {
    this.position_elements();
    this.check_if_disabled();
  }

  get_disabled_styles = () => {
    let disabledStyles = {};

    if (this.state.isDisabled) {
      disabledStyles = {
        shape: {
          ...ToggleStyles.shape.disabled
        },
        dot: {
          ...ToggleStyles.dot.disabled
        },
        label: {
          on: { ...ToggleStyles.label.on.disabled },
          off: { ...ToggleStyles.label.off.disabled }
        }
      };
    }

    return disabledStyles;
  }

  check_if_disabled = () => {
    if (this.props.isDisabled) {
      this.setState({
        state: "disabled"
      });
    }
  }

  get_shape_dimensions = e => {
    const { height, width } = e.nativeEvent.layout;
    this.setState({
      shape: {
        height: height,
        width: width
      }
    });
  }

  get_dot_dimensions = e => {
    const { height, width } = e.nativeEvent.layout;
    this.setState({
      dot: {
        height: height,
        width: width
      }
    });
  }

  get_on_dimensions = e => {
    const { height, width } = e.nativeEvent.layout;
    this.setState({
      on: {
        height: height,
        width: width
      }
    });
  }

  get_off_dimensions = e => {
    const { height, width } = e.nativeEvent.layout;
    this.setState({
      off: {
        height: height,
        width: width
      }
    });
  }

  position_elements = () => {
    const positionStyles = this.get_position_styles();
    this.setState({
      dot: {
        ...this.state.dot,
        position: positionStyles.dot
      },
      on: {
        ...this.state.on,
        position: positionStyles.on
      },
      off: {
        ...this.state.off,
        position: positionStyles.off
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
    } else {
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
          top: (this.state.shape.height / 2) + (this.state.on.height / 2),
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
    console.log("UPDATED STYLES AFTER TOGGLE");
    console.log(this.state.dot.position);
    console.log(this.state.on.position);
    console.log(this.state.off.position);
    console.log("---------------------------");

    return (
      <View pointerEvents={this.state.isDisabled ? "none" : "auto"}>
        <TouchableWithoutFeedback onPress={this.toggle}>
          <View style={{
            ...ToggleStyles.shape.default,
            ...ToggleStyles.shape[this.state.state],
            ...this.get_disabled_styles().shape
          }} onLayout={e => { this.get_shape_dimensions(e); }}>
            <View style={{
              ...ToggleStyles.dot.default,
              ...ToggleStyles.dot[this.state.state],
              ...this.get_disabled_styles().dot,
              ...this.state.dot.position
            }} onLayout={e => { this.get_dot_dimensions(e); }}></View>
            <View onLayout={e => { this.get_on_dimensions(e); }} style={this.state.on.position}>
              <PackenText style={{
                ...ToggleStyles.label.default,
                ...ToggleStyles.label.on[this.state.state],
                ...this.get_disabled_styles().on
              }}>ON</PackenText>
            </View>
            <View onLayout={e => { this.get_off_dimensions(e); }} style={this.state.off.position}>
              <PackenText style={{
                ...ToggleStyles.label.default,
                ...ToggleStyles.label.off[this.state.state],
                ...this.get_disabled_styles().off
              }}>OFF</PackenText>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default PackenToggle;