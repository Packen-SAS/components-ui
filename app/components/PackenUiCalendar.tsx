import DateTimePicker from "@react-native-community/datetimepicker";
import { View, Modal, Platform, Appearance } from "react-native";
import React, { Component } from "react";

import Colors from "../styles/abstracts/colors";
import PackenUiText from "./PackenUiText";
import * as UTIL from "../modules/utils";

export default class PackenUiCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.setPropsToState() }
  };

  setPropsToState = () => ({
    mode: this.props.mode || "date",
    label: this.props.label || "OK",
    isOpen: this.props.isOpen || false,
    value: this.props.value || new Date(),
    display: this.props.display || "calendar",
    onChange: this.props.onChange || this.mockFn,
    minimumDate: this.props.minimumDate || new Date(),
    onRequestClose: this.props.onRequestClose || this.mockFn
  });

  mockFn = () => false;

  componentDidUpdate(prevProps) {
    if (!UTIL.objectsEqual(prevProps, this.props)) {
      this.setState({ ...this.setPropsToState() });
    }
  }

  closePicker = () => { this.state.onRequestClose(); }

  onChangeHandler = (_, date) => {
    this.state.onChange(_, date);
    if (Platform.OS === "android") {
      this.closePicker();
    }
  }

  getRender = () => {
    const main = (
      <DateTimePicker
        mode={this.state.mode}
        value={this.state.value}
        display={this.state.display}
        onChange={this.onChangeHandler}
        minimumDate={this.state.minimumDate}
      />
    );
    if (Platform.OS === "android") {
      return this.state.isOpen ? main : null;
    }
    return (
      <Modal
        transparent
        animationType="fade"
        visible={this.state.isOpen}
      >
        <View style={this.getStyles().wrapper}>
          <View style={this.getStyles().inner}>
            <View style={this.getStyles().cta}>
              <PackenUiText
                preset="label"
                style={this.getStyles().btn}
                touchable={{ callback: this.closePicker }}
              >
                {this.state.label.toUpperCase()}
              </PackenUiText>
            </View>
            {main}
          </View>
        </View>
      </Modal>
    );
  }

  getPanelBg = () => {
    if (Appearance.getColorScheme() === "light") {
      return Colors.basic.white.dft;
    }
    return Colors.basic.independence.drk;
  }

  getStyles = () => ({
    wrapper: {
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      position: "absolute",
      justifyContent: "flex-end",
      backgroundColor: UTIL.hex2rgba(Colors.basic.black.dft, 0.5)
    },
    inner: {
      padding: 24,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor: this.getPanelBg()
    },
    cta: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end"
    },
    btn: {
      color: Colors.brand.primary.drk
    }
  });

  render() {
    return this.getRender();
  };
}