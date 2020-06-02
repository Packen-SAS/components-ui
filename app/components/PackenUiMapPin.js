import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import Typography from "../styles/abstracts/typography";
import Colors from "../styles/abstracts/colors";
import Shadows from "../styles/abstracts/shadows";

import PackenUiMapPinSub from "./PackenUiMapPinSub";
import PackenUiText from "./PackenUiText";

class PackenUiMapPin extends Component {
  constructor(props) {
    super(props);

    this.state = { ...this.setPropsToState() }
  }

  componentDidMount() {
    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
  }

  setPropsToState = () => {
    return {
      main: this.props.main ? { ...this.props.main } : {
        label: "",
        text: ""
      },
      sub: this.props.sub ? { ...this.props.sub } : false,
      theme: this.props.theme ? this.props.theme : "primary",
      type: this.props.type ? this.props.type : "info",
      dotPosition: this.props.dotPosition ? this.props.dotPosition : false,
      styling: this.props.styling ? { ...this.props.styling } : {
        container: {},
        inner: {},
        main: {},
        label: {},
        text: {},
        sub: {}
      }
    };
  }

  getLabel = () => {
    if (this.state.main.label) {
      return <PackenUiText style={{ ...this.getStyles().label.base, ...this.getStyles().label.theme[this.state.theme], ...this.state.styling.label }}>{this.state.main.label.toUpperCase() + " "}</PackenUiText>;
    } else {
      return null;
    }
  }

  getInfoRender = () => (
    <View style={{
      ...this.getStyles().inner,
      ...this.state.styling.inner
    }}>
      {
        this.state.sub && this.state.sub.position === "left" ? this.getSubRender() : null
      }
      <View style={{ ...this.getStyles().main.base, ...this.getStyles().main.theme[this.state.theme], ...this.state.styling.main }}>
        <PackenUiText style={{ ...this.getStyles().text.base, ...this.getStyles().text.theme[this.state.theme], ...this.state.styling.text }}>
          {this.getLabel()}
          {this.state.main.text}
        </PackenUiText>
      </View>
      {
        this.state.sub && this.state.sub.position === "right" ? this.getSubRender() : null
      }
    </View>
  )

  getSubRender = () => (
    <PackenUiMapPinSub styling={this.state.styling.sub} type={this.state.type} theme={this.state.theme} label={this.state.sub.character} icon={this.state.sub.icon} dotPosition={this.state.dotPosition} />
  )

  updateState = () => {
    this.setState({ ...this.setPropsToState() });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.updateState();
    }
  }

  render() {
    return (
      <View style={{
        ...this.getStyles().container,
        ...this.state.styling.container
      }}>
        {
          this.state.type === "info" ? this.getInfoRender() : this.getSubRender()
        }
      </View>
    );
  }

  getStyles = () => {
    return {
      container: {
        padding: 11
      },
      inner: {
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "flex-start",
        ...Shadows.md
      },
      main: {
        base: {
          height: 24,
          paddingVertical: 6,
          paddingHorizontal: 8,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          position: "relative",
          zIndex: 2,
          ...Shadows.md
        },
        theme: {
          primary: {
            backgroundColor: Colors.brand.secondary.dft
          },
          white: {
            backgroundColor: Colors.basic.white.dft
          },
          white_primary: {
            backgroundColor: Colors.basic.white.dft
          }
        }
      },
      label: {
        base: {
          textAlign: "center",
          fontFamily: Typography.family.regular,
          fontSize: Typography.size.xtiny,
          lineHeight: Typography.lineheight.xtiny
        },
        theme: {
          primary: {
            color: Colors.brand.primary.ulgt
          },
          white: {
            color: Colors.basic.independence.drk
          },
          white_primary: {
            color: Colors.basic.independence.drk
          }
        }
      },
      text: {
        base: {
          textAlign: "center",
          fontFamily: Typography.family.regular,
          fontSize: Typography.size.xtiny,
          lineHeight: Typography.lineheight.xtiny
        },
        theme: {
          primary: {
            color: Colors.basic.white.dft
          },
          white: {
            color: Colors.basic.independence.drk
          },
          white_primary: {
            color: Colors.basic.independence.drk
          }
        }
      }
    };
  }
}

PackenUiMapPin.propTypes = {
  main: PropTypes.object,
  sub: PropTypes.object,
  theme: PropTypes.string,
  type: PropTypes.string.isRequired,
  dotPosition: PropTypes.string,
  styling: PropTypes.object
};

export default PackenUiMapPin;