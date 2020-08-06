import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Image, TouchableWithoutFeedback } from "react-native";
import * as UTIL from "../utils";

import Icon from "react-native-vector-icons/dist/Feather";
import Colors from "../styles/abstracts/colors";

import PackenUiText from "./PackenUiText";
import PackenUiTag from "./PackenUiTag";

/**
 * Component for displaying a driver's vehicle overview
 */
class PackenUiVehicleBox extends Component {
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
   * @property {string} [type=""] The type of vehicle
   * @property {string} [overview=""] The overview of the vehicle
   * @property {string} [year=""] The year of the vehicle model
   * @property {string} [plate=""] The plate of the vehicle
   * @property {string} [state=""] The current status of the vehicle - "pending"; "approved"; "rejected"
   * @property {function} [callback=false] The callback function to be called when pressing on the component
   * @property {string} [image=null] The vehicle's type preview image
   * @property {object} [labels={ approved: "Aprobado", rejected: "Rechazado", pending: "Pendiente" }] The correct i18n labels for the status
   * @property {object} [styling={ box: {}, imgWrapper: {}, image: {}, copy: {}, type: {}, overview: {}, year: {}, plateWrapper: {}, tag: {}, stateWrapper: {}, state: {}, stateIconSize: undefined, stateIconColor: undefined }] The optional custom styling props
   * @return {object} The props mapped to the state keys
   */
  setPropsToState = () => {
    return {
      type: this.props.type ? this.props.type : "",
      overview: this.props.overview ? this.props.overview : "",
      year: this.props.year ? this.props.year : "",
      plate: this.props.plate ? this.props.plate : "",
      state: this.props.state ? this.props.state : "pending",
      callback: this.props.callback ? this.props.callback : false,
      image: this.props.image ? this.props.image : null,
      labels: this.props.labels ? { ...this.props.labels } : {
        approved: "Aprobado",
        rejected: "Rechazado",
        pending: "Pendiente"
      },
      styling: this.props.styling ? { ...this.props.styling } : {
        box: {},
        imgWrapper: {},
        image: {},
        copy: {},
        type: {},
        overview: {},
        year: {},
        plateWrapper: {},
        tag: {},
        stateWrapper: {},
        state: {},
        stateIconSize: undefined,
        stateIconColor: undefined
      }
    };
  }

  /**
   * Returns the correct configuration object for the status element
   * @type {function}
   * @return {object} The configuration object
   */
  getState = () => {
    let state = null;

    switch (this.state.state) {
      case "taken":
      case "approved":
        state = {
          label: this.state.labels.approved,
          icon: {
            name: "check-circle",
            color: Colors.success.default
          }
        };
        break;
      case "blocked":
      case "rejected":
        state = {
          label: this.state.labels.rejected,
          icon: {
            name: "alert-circle",
            color: Colors.danger.default
          }
        };
        break;
      case "pending":
        state = {
          label: this.state.labels.pending,
          icon: {
            name: "pause-circle",
            color: Colors.basic.gray.drk
          }
        };
        break;
    }

    return state;
  }

  /**
   * Returns the correct image styles depending on the type of vehicle
   * @type {function}
   * @return {object} The styles object
   */
  getImgStyles = () => {
    let styles = {};
    if (this.state.type !== "moto") {
      styles = { ...this.getStyles().img, width: 206, height: 95 };
    } else {
      styles = { width: 121, height: 80 };
    }
    return styles;
  }

  /**
   * Updates the state with new props
   * @type {function}
   */
  updateState = () => {
    this.setState({ ...this.setPropsToState() });
  }

  /**
   * Returns the correct content depending on whether it's touchable
   * @type {function}
   * @return {node} JSX for the content
   */
  getContent = () => {
    let content = (
      <View style={{ ...this.getStyles().box, ...this.state.styling.box }}>
        <View style={{ ...this.getStyles().imgWrapper, ...this.state.styling.imgWrapper }}>
          <Image source={{ uri: this.state.image }} style={{ ...this.getImgStyles(), ...this.state.styling.image }} />
        </View>
        <View style={{ ...this.getStyles().copy, ...this.state.styling.copy }}>
          <PackenUiText preset="t1" style={{ ...this.getStyles().type, ...this.state.styling.type }}>{this.state.type.charAt(0).toUpperCase() + this.state.type.substring(1)}</PackenUiText>
          <PackenUiText preset="c1" style={{ ...this.getStyles().subtitle, ...this.state.styling.overview }}>{this.state.overview}</PackenUiText>
          <PackenUiText preset="c1" style={{ ...this.getStyles().subtitle, ...this.state.styling.year }}>{this.state.year}</PackenUiText>
          <View style={{ marginVertical: 5, ...this.state.styling.plateWrapper }}>
            <PackenUiTag styling={this.state.styling.tag}>{this.state.plate.toUpperCase()}</PackenUiTag>
          </View>
          <View style={{ ...this.getStyles().state, ...this.state.styling.stateWrapper }}>
            <PackenUiText preset="c1" style={{ color: this.getState().icon.color, marginRight: 10, ...this.state.styling.state }}>{this.getState().label}</PackenUiText>
            <Icon name={this.getState().icon.name} color={this.state.styling.stateIconColor ? this.state.styling.stateIconColor : this.getState().icon.color} size={this.state.styling.stateIconSize ? this.state.styling.stateIconSize : 14} />
          </View>
        </View>
      </View>
    );

    if (this.state.callback) {
      content = (
        <TouchableWithoutFeedback onPress={this.state.callback}>
          {content}
        </TouchableWithoutFeedback>
      );
    }

    return content;
  }

  /**
   * Compares props to determine if the component should update its state with new props
   * @type {function}
   * @param {object} prevProps Previous props
   */
  componentDidUpdate(prevProps) {
    if (!UTIL.objectsEqual(prevProps, this.props)) {
      this.updateState();
    }
  }

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render() {
    return this.getContent();
  }

  /**
   * Returns the current styles object
   * @type {function}
   * @return {object} The current styles object
   */
  getStyles = () => {
    return {
      box: {
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: Colors.basic.white.dft,
        overflow: "hidden",
        borderRadius: 8,
        marginBottom: 16
      },
      imgWrapper: {
        width: "42%",
        height: 95,
        paddingRight: 12,
        alignItems: "center",
        justifyContent: "center"
      },
      img: {
        position: "absolute",
        top: 0,
        right: 0
      },
      copy: {
        flex: 1
      },
      type: {
        color: Colors.basic.independence.dft
      },
      subtitle: {
        color: Colors.basic.gray.drk
      },
      state: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end"
      }
    };
  }
}

PackenUiVehicleBox.propTypes = {
  overview: PropTypes.string,
  type: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  plate: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  callback: PropTypes.func,
  labels: PropTypes.object,
  styling: PropTypes.object
};

export default PackenUiVehicleBox;