import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TouchableNativeFeedback } from "react-native";

import i18n from "../modules/i18n";
import * as UTIL from "../utils";
import Colors from "../styles/abstracts/colors";

import PackenUiText from "./PackenUiText";
import PackenUiTag from "./PackenUiTag";

class PackenUiLicenseBox extends Component {
  language = i18n();

  constructor(props) {
    super(props);
    this.state = { ...this.setPropsToState() }
  }

  setPropsToState = () => {
    return {
      overview: this.props.overview ? this.props.overview : null,
      category: this.props.category ? this.props.category : null,
      number: this.props.number ? this.props.number : null,
      state: this.props.state ? this.props.state : null,
      due_date: this.props.due_date ? this.props.due_date : null,
      callback: this.props.callback ? this.props.callback : null
    };
  }

  getLicenseState = state => {
    switch (state) {
      case 'approved':
        return { label: this.language.status.approved, bg: Colors.success.default, text: Colors.white.default };
      case 'expired':
        return { label: this.language.status.expired, bg: Colors.base.gray, text: Colors.white.default };
      case 'blocked':
      case 'rejected':
        return { label: this.language.status.declined, bg: Colors.danger.default, text: Colors.white.default };
      case 'pending':
      default:
        return { label: this.language.status.pending, bg: Colors.warning.default, text: Colors.white.default };
    }
  }

  getDueDateState = state => {
    if (!state) { return Colors.danger.default; }
    const licenseExpired = (UTIL.datetime()
      .diff(
        UTIL.toMomentObject(new Date(state)),
        UTIL.toMomentObject(Date.now()), 'days')
      >
      0);
    return licenseExpired
      ? Colors.danger.default
      : Colors.success.default;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      this.setState({ ...this.setPropsToState() });
    }
  }

  render = () => {
    const state = this.getLicenseState(this.state.state);
    return (
      <TouchableNativeFeedback onPress={this.state.callback}>
        <View style={this.getStyles().box}>
          {/* Descripcion de la licencia */}
          <View style={this.getStyles().wt}>
            <PackenUiText preset="c1" style={this.getStyles().subtitle}>
              {this.state.overview}
            </PackenUiText>
          </View>
          <View style={this.getStyles().licenseData}>
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
              backgroundColor={this.getDueDateState(this.state.due_date)}
              textColor={Colors.white.default}
              style={this.getStyles().spacing}>
              {this.state.due_date}
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

  getStyles = () => {
    return {
      wt: { width: '100%' },
      box: {
        padding: 8,
        backgroundColor: Colors.basic.white.dft,
        borderRadius: 8,
        marginBottom: 16
      },
      licenseNumber: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 5
      },
      licenseData: {
        marginTop: 5,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row'
      },
      subtitle: {
        color: Colors.basic.gray.drk
      },
      spacing: {
        marginLeft: 5
      }
    };
  }
}

PackenUiLicenseBox.propTypes = {
  type: PropTypes.string.isRequired,
  make: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  plate: PropTypes.string.isRequired,
  callback: PropTypes.func
};

export default PackenUiLicenseBox;