import React, { Component, ReactNode } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import * as UTIL from "../utils";

import Typography from "../styles/abstracts/typography";
import Colors from "../styles/abstracts/colors";
import Shadows from "../styles/abstracts/shadows";

import PackenUiMapPinSub from "./PackenUiMapPinSub";
import PackenUiText from "./PackenUiText";

interface StylingPropShape {
  container: object;
  inner: object;
  main: object;
  label: object;
  text: object;
  sub: {
    box: object;
    iconSize: number | undefined;
    iconColor: string | undefined;
    character: object;
    dot: object;
  };
}

interface MainPropShape {
  label: string;
  text: string;
}

interface SubPropShape {
  position: string;
  character: string;
  icon: string;
}

interface PackenUiMapPinProps {
  main?: MainPropShape;
  sub?: SubPropShape;
  theme?: string;
  type: string;
  dotPosition?: string;
  instance?: Function;
  styling?: StylingPropShape;
}

interface PackenUiMapPinState {
  main: MainPropShape;
  sub: SubPropShape | boolean;
  theme: string;
  type: string;
  dotPosition: string | boolean;
  styling: StylingPropShape;
}

/**
 * Component for rendering pins to be overlaid on a map
 */
class PackenUiMapPin extends Component<PackenUiMapPinProps, PackenUiMapPinState> {
  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props: PackenUiMapPinProps) {
    super(props);

    /**
     * Variable that stores the state
     * @type {object}
     */
    this.state = { ...this.setPropsToState() }
  }

  /**
   * Propagates the component instance if a callback is provided via props
   * @type {function}
   */
  componentDidMount() {
    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
  }

  /**
   * Centralizes the received props assignment to set them to the state, determining default values in case any is not provided
   * @type {function}
   * @property {object} [main={ label: "", text: "" }] The texts to be used for the main elements
   * @property {object} [sub=false] The data for the "sub" part of the component. This can be configured to be an icon or a character and its position
   * @property {string} [theme="primary"] The theme to be used for styling - "primary"; "white"; "white_primary"
   * @property {string} [type="info"] The type of component - "info" for displaying text and an optional sub element; or "icon" for just a sub element
   * @property {string} [dotPosition=false] The position for the dot - "top"; "right"; "bottom"; "left"
   * @property {object} [styling={ container: {}, inner: {}, main: {}, label: {}, text: {}, sub: {} }] The optional custom styling props
   * @return {object} The props mapped to the state keys
   */
  setPropsToState: Function = (): PackenUiMapPinState => {
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
        sub: {
          box: {},
          iconSize: undefined,
          iconColor: undefined,
          character: {},
          dot: {}
        }
      }
    };
  }

  /**
   * Returns the label if provided
   * @type {function}
   * @return {node|null} JSX for the label or null
   */
  getLabel: Function = (): ReactNode | null => {
    if (this.state.main.label) {
      return <PackenUiText style={{ ...this.getStyles().label.base, ...this.getStyles().label.theme[this.state.theme], ...this.state.styling.label }}>{this.state.main.label.toUpperCase() + " "}</PackenUiText>;
    } else {
      return null;
    }
  }

  /**
   * Returns the main element of the component if set so
   * @type {function}
   * @return {node} JSX for the main element
   */
  getInfoRender: Function = (): ReactNode => (
    <View style={{
      ...this.getStyles().inner,
      ...this.state.styling.inner
    }}>
      {
        typeof this.state.sub === "object" && this.state.sub.position === "left" ? this.getSubRender() : null
      }
      <View style={{ ...this.getStyles().main.base, ...this.getStyles().main.theme[this.state.theme], ...this.state.styling.main }}>
        <PackenUiText style={{ ...this.getStyles().text.base, ...this.getStyles().text.theme[this.state.theme], ...this.state.styling.text }}>
          {this.getLabel()}
          {this.state.main.text}
        </PackenUiText>
      </View>
      {
        typeof this.state.sub === "object" && this.state.sub.position === "right" ? this.getSubRender() : null
      }
    </View>
  )

  /**
   * Returns the {@link PackenUiMapPinSub} element for the component if set so
   * @type {function}
   * @return {node|null} JSX for the sub element
   */
  getSubRender: Function = (): ReactNode | null => (
    typeof this.state.sub === "object" ? <PackenUiMapPinSub styling={this.state.styling.sub} type={this.state.type} theme={this.state.theme} label={this.state.sub.character} icon={this.state.sub.icon} dotPosition={this.state.dotPosition} /> : null
  )

  /**
   * Updates the state with new props
   * @type {function}
   */
  updateState: Function = () => {
    this.setState({ ...this.setPropsToState() });
  }

  /**
   * Compares props to determine if the component should update its state with new props
   * @type {function}
   * @param {object} prevProps Previous props
   */
  componentDidUpdate(prevProps: PackenUiMapPinProps) {
    if (!UTIL.objectsEqual(prevProps, this.props)) {
      this.updateState();
    }
  }

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render(): ReactNode {
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

  /**
   * Returns the current styles object
   * @type {function}
   * @return {object} The current styles object
   */
  getStyles: Function = (): object => {
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

  /**
   * Defines prop-types for the component
   * @type {object}
   */
  static propTypes: object = {
    main: PropTypes.object,
    sub: PropTypes.object,
    theme: PropTypes.string,
    type: PropTypes.string.isRequired,
    dotPosition: PropTypes.string,
    styling: PropTypes.object,
    instance: PropTypes.func
  };
}

export default PackenUiMapPin;