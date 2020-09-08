import React, { Component, ReactNode } from "react";
import PropTypes from "prop-types";
import { View, TouchableNativeFeedback } from "react-native";

import * as UTIL from "../utils";
import Colors from "../styles/abstracts/colors";

import PackenUiText from "./PackenUiText";
import PackenUiTag from "./PackenUiTag";

interface LicenseStateShape {
  label: string;
  bg: string;
  text: string;
}

interface LabelsStateShape {
  approved: string,
  expired: string;
  rejected: string;
  pending: string;
}

interface StylingPropShape {
  box: object,
  top: object,
  overview: object,
  bottom: object
}

interface PackenUiLicenseBoxProps {
  overview: string,
  category: string,
  number: string,
  state: string,
  dueDate?: string,
  callback?: VoidFunction,
  labels: LabelsStateShape,
  styling?: StylingPropShape
}

interface PackenUiLicenseBoxState {
  overview: string | null;
  category: string | null;
  number: string | null;
  state: string | null;
  dueDate: string | null;
  callback: VoidFunction;
  labels: LabelsStateShape
  styling: StylingPropShape;
}

/**
 * Component for rendering a license preview box
 */
class PackenUiLicenseBox extends Component<PackenUiLicenseBoxProps, PackenUiLicenseBoxState> {
  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props: PackenUiLicenseBoxProps) {
    super(props);

    /**
     * Variable that stores the state
     * @type {object}
     */
    this.state = { ...this.setPropsToState() }
  }

  /**
   * Placeholder function that does nothing
   * @type {function}
   * @return {boolean} Flag used only for testing purposes
   */
  mockCallback: VoidFunction = (): boolean => true;

  /**
   * Centralizes the received props assignment to set them to the state, determining default values in case any is not provided
   * @type {function}
   * @property {string} [overview=null] The general overview of this license type
   * @property {string} [category=null] The category type of this license
   * @property {string} [number=null] The license number
   * @property {string} [state=null] The license's current status
   * @property {string} [dueDate=null] The license's due date
   * @property {function} [callback=() => true;] The license's callback to be called when pressing on the component
   * @property {object} [labels={ approved: "Aprobado", expired: "Expirado", rejected: "Rechazado", pending: "Pendiente" }] The required i18n labels for the license's status
   * @property {object} [styling={ box: {}, top: {}, overview: {}, bottom: {} }] The optional custom styling props
   * @return {object} The props mapped as the state keys
   */
  setPropsToState: Function = (): PackenUiLicenseBoxState => {
    return {
      overview: this.props.overview ? this.props.overview : null,
      category: this.props.category ? this.props.category : null,
      number: this.props.number ? this.props.number : null,
      state: this.props.state ? this.props.state : null,
      dueDate: this.props.dueDate ? this.props.dueDate : null,
      callback: this.props.callback ? this.props.callback : this.mockCallback,
      labels: this.props.labels ? { ...this.props.labels } : {
        approved: "Aprobado",
        expired: "Expirado",
        rejected: "Rechazado",
        pending: "Pendiente"
      },
      styling: this.props.styling ? { ...this.props.styling } : {
        box: {},
        top: {},
        overview: {},
        bottom: {}
      }
    };
  }

  /**
   * Returns the configuration for the license's status tag
   * @type {function}
   * @return {object} The configuration object for the status' {@link PackenUiTag}
   */
  getLicenseState: Function = (state: string): LicenseStateShape => {
    switch (state) {
      case "approved":
        return { label: this.state.labels.approved, bg: Colors.success.default, text: Colors.white.default };
      case "expired":
        return { label: this.state.labels.expired, bg: Colors.basic.gray.dft, text: Colors.white.default };
      case "blocked":
      case "rejected":
        return { label: this.state.labels.rejected, bg: Colors.danger.default, text: Colors.white.default };
      case "pending":
      default:
        return { label: this.state.labels.pending, bg: Colors.warning.default, text: Colors.white.default };
    }
  }

  /**
   * Returns the background color for the license's due date {@link PackenUiTag}
   * @type {function}
   * @param {string} state The received due date
   * @return {string} The correct background color
   */
  getDueDateState: Function = (state: string): string => {
    if (!state) { return Colors.danger.default; }
    const licenseExpired = (UTIL.datetime()
      .diff(
        UTIL.toMomentObject(new Date(state)),
        UTIL.toMomentObject(Date.now()), "days")
      > 0);
    return licenseExpired
      ? Colors.danger.default
      : Colors.success.default;
  }

  /**
   * Compares props to determine if the component should update its state with new props
   * @type {function}
   * @param {object} prevProps Previous props
   */
  componentDidUpdate(prevProps: PackenUiLicenseBoxProps) {
    if (!UTIL.objectsEqual(prevProps, this.props)) {
      this.setState({ ...this.setPropsToState() });
    }
  }

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render(): ReactNode {
    const state = this.getLicenseState(this.state.state);
    return (
      <TouchableNativeFeedback onPress={this.state.callback}>
        <View style={{
          ...this.getStyles().box,
          ...this.state.styling.box
        }}>
          {/* Descripcion de la licencia */}
          <View style={{
            ...this.getStyles().wt,
            ...this.state.styling.top
          }}>
            <PackenUiText preset="c1" style={{
              ...this.getStyles().subtitle,
              ...this.state.styling.overview
            }}>
              {this.state.overview}
            </PackenUiText>
          </View>
          <View style={{
            ...this.getStyles().licenseData,
            ...this.state.styling.bottom
          }}>
            {/* Numero de licencia */}
            <PackenUiTag
              backgroundColor={Colors.primary.focus}
              textColor={Colors.white.default}>
              {this.state.number}
            </PackenUiTag>
            {/* Categoria de la licencia */}
            <PackenUiTag
              style={this.getStyles().spacing}>
              {this.state.category}
            </PackenUiTag>
            {/* Fecha de expiración de la licencia*/}
            <PackenUiTag
              backgroundColor={this.getDueDateState(this.state.dueDate)}
              textColor={Colors.white.default}
              style={this.getStyles().spacing}>
              {this.state.dueDate}
            </PackenUiTag>
            {/* Estado de la licencia: pending, rejected, approved, expired */}
            <PackenUiTag
              backgroundColor={state.bg}
              textColor={state.text}
              style={this.getStyles().spacing}>
              {state.label}
            </PackenUiTag>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }

  /**
   * Returns the current styles object
   * @type {function}
   * @return {object} The current styles object
   */
  getStyles: Function = (): object => {
    return {
      wt: { width: "100%" },
      box: {
        padding: 8,
        backgroundColor: Colors.basic.white.dft,
        borderRadius: 8,
        marginBottom: 16
      },
      licenseNumber: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: 5
      },
      licenseData: {
        marginTop: 5,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        flexDirection: "row"
      },
      subtitle: {
        color: Colors.basic.gray.drk
      },
      spacing: {
        marginLeft: 5
      }
    };
  }

  /**
   * Defines prop-types for the component
   * @type {object}
   */
  static propTypes: object = {
    overview: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    dueDate: PropTypes.string,
    callback: PropTypes.func,
    labels: PropTypes.object.isRequired,
    styling: PropTypes.object
  };
}

export default PackenUiLicenseBox;