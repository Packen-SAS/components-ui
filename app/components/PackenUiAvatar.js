import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Image, TouchableWithoutFeedback } from "react-native";

import Icon from "react-native-vector-icons/dist/Feather";

import Colors from "../styles/abstracts/colors";

/**
 * Component for displaying an avatar or images contained within a circle in general
 */
class PackenUiAvatar extends Component {
  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props) {
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
   * @property {string|object} [src=false] The "source" attribute for RN's Image component
   * @property {string} [size="medium"] The size for the component styles - "xtiny"; "tiny"; "small"; "medium", "medium_alt"; "large"; "giant"
   * @property {function} [callback=false] A callback function to be triggered when pressing over the component
   * @property {object} [styling={ container: {}, image: {}, iconSize: undefined, iconColor: undefined }] The optional custom styling props
   * @return {object} The props mapped to the state keys
   */
  setPropsToState = () => {
    return {
      src: this.props.src ? this.props.src : false,
      size: this.props.size ? this.props.size : "medium",
      callback: this.props.callback ? this.props.callback : false,
      styling: this.props.styling ? { ...this.props.styling } : {
        container: {},
        image: {},
        iconSize: undefined,
        iconColor: undefined
      }
    };
  }

  /**
   * Returns the inner content
   * @type {function}
   * @return {node} JSX for the inner content
   */
  getInner = () => {
    let inner = null;

    if (this.state.src) {
      inner = (
        <Image
          source={this.state.src}
          resizeMode="cover"
          style={{
            height: "100%",
            width: "100%",
            borderRadius: 100,
            ...this.state.styling.image
          }}
        />
      );
    } else {
      inner = (
        <Icon
          name="user"
          size={this.state.styling.iconSize ? this.state.styling.iconSize : this.getStyles().container.size[this.state.size].width / 1.5}
          color={this.state.styling.iconColor ? this.state.styling.iconColor : Colors.basic.white.dft}
        />
      );
    }

    return inner;
  }

  /**
   * Returns the outer content
   * @type {function}
   * @return {node} JSX for the main, outer content
   */
  getContent = () => {
    let content = null;

    if (this.state.callback) {
      content = (
        <TouchableWithoutFeedback onPress={this.state.callback} >
          <View
            style={[
              this.getStyles().touchable,
              {
                height: this.getStyles().container.size[this.state.size.height],
                width: this.getStyles().container.size[this.state.size.width]
              },
              this.state.styling.container
            ]}
          >
            {this.getInner()}
          </View>
        </TouchableWithoutFeedback>
      )
    } else {
      content = this.getInner();
    }

    return content;
  }

  /**
   * Updates the state with new props
   * @type {function}
   */
  updateState = () => {
    this.setState({ ...this.setPropsToState() });
  }

  /**
   * Compares props to determine if the component should update its state with new props
   * @type {function}
   * @param {object} prevProps Previous props
   */
  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.updateState();
    }
  }

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render() {
    return (
      <View style={[
        this.getStyles().container.base,
        this.getStyles().container.size[this.state.size],
        this.state.styling.container
      ]}>
        {this.getContent()}
      </View>
    );
  }

  /**
   * Returns the styles for the component
   * @type {function}
   * @return {object} The styles object
   */
  getStyles = () => {
    return {
      container: {
        base: {
          borderRadius: 100,
          overflow: "hidden",
          backgroundColor: !this.state.src ? Colors.brand.primary.ulgt : "transparent"
        },
        size: {
          xtiny: {
            height: 24,
            width: 24
          },
          tiny: {
            height: 32,
            width: 32
          },
          small: {
            height: 40,
            width: 40
          },
          medium: {
            height: 64,
            width: 64
          },
          medium_alt: {
            height: 72,
            width: 72
          },
          large: {
            height: 80,
            width: 80
          },
          giant: {
            height: 96,
            width: 96
          }
        }
      },
      touchable: {
        flex: 1,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center"
      }
    };
  }
}

PackenUiAvatar.propTypes = {
  src: Image.propTypes.source,
  size: PropTypes.string.isRequired,
  callback: PropTypes.func,
  styling: PropTypes.object
};

export default PackenUiAvatar;