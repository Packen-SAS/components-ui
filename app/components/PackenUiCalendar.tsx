import DateTimePicker, { Event, AndroidEvent } from "@react-native-community/datetimepicker";
import { View, Modal, Platform, Appearance } from "react-native";
import React, { Component, ReactNode } from "react";

import Colors from "../styles/abstracts/colors";
import PackenUiText from "./PackenUiText";
import * as UTIL from "../utils";

interface PackenUiCalendarProps {
  mode: "date" | "time" | undefined;
  label: string;
  isOpen: boolean;
  value: Date;
  display: "calendar" | "default" | "compact" | "inline" | "spinner";
  onChange: Function;
  minimumDate: Date;
  onRequestClose: Function;
}

interface PackenUiCalendarState {
  mode: "date" | "time" | undefined;
  label: string;
  isOpen: boolean;
  value: Date;
  display: "calendar" | "default" | "compact" | "inline" | "spinner";
  onChange: Function;
  minimumDate: Date;
  onRequestClose: Function;
}

type onChangeHandlerType = ((event: Event | AndroidEvent, date?: Date | undefined) => void);

/**
 * Component for rendering a calendar (modal on Android and spinner panel on iOS)
 */
export default class PackenUiCalendar extends Component<PackenUiCalendarProps, PackenUiCalendarState> {
  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props: PackenUiCalendarProps) {
    super(props);

    /**
     * Variable that stores the state
     * @type {object}
     */
    this.state = { ...this.setPropsToState() }
  }

  /**
   * Centralizes the received props assignment to set them to the state, determining default values in case any is not provided
   * @type {function}
   * @property {string} [mode="date"] The "mode" prop for the DateTimePicker component
   * @property {string} [label="OK"] The label to display on iOS to close the calendar panel
   * @property {boolean} [isOpen=false] Whether the calendar should be displayed or not
   * @property {Date} [value=new Date()] The selected date
   * @property {string} [display="calendar"] The "display" prop for the DateTimePicker component
   * @property {function} [onChange=mockFn]  The function to trigger when changing the selected date
   * @property {Date} [minimumDate=new Date()] The optional minimum date to be able to be selected
   * @property {function} [onRequestClose=mockFn] The function to trigger when closing the calendar
   * @return {object} The props mapped to the state keys
   */
  setPropsToState: Function = (): PackenUiCalendarProps => ({
    mode: this.props.mode || "date",
    label: this.props.label || "OK",
    isOpen: this.props.isOpen || false,
    value: this.props.value || new Date(),
    display: this.props.display || "calendar",
    onChange: this.props.onChange || this.mockFn,
    minimumDate: this.props.minimumDate || new Date(),
    onRequestClose: this.props.onRequestClose || this.mockFn
  });

  /**
   * Placeholder function
   * @type {function}
   * @return {boolean} Returns false
   */
  mockFn: Function = (): false => false;

  /**
   * Compares props to determine if the component should update its state with new props
   * @type {function}
   * @param {object} prevProps Previous props
   */
  componentDidUpdate(prevProps: PackenUiCalendarProps) {
    if (!UTIL.objectsEqual(prevProps, this.props)) {
      this.setState({ ...this.setPropsToState() });
    }
  }

  /**
   * Closes the date picker by calling prop function
   * @type {function}
   */
  closePicker: Function = () => { this.state.onRequestClose(); }

  /**
   * Event handler to be triggered after selecting a new date
   * @param {object} _ Object containing the event data
   * @param {Date | undefined} date The selected date
   */
  onChangeHandler: onChangeHandlerType = (_: Event | AndroidEvent, date?: Date | undefined) => {
    this.state.onChange(_, date);
    if (Platform.OS === "android") {
      this.closePicker();
    }
  }

  /**
   * Returns the main elements of the component
   * @type {function}
   * @return {node|null} JSX for the main elements or null if calendar is closed on Android
   */
  getRender: Function = (): ReactNode | null => {
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

  /**
   * Returns the correct background color on iOS depending on the system appearance mode
   * @type {function}
   * @return {string} The background color to be applied to the calendar panel
   */
  getPanelBg: Function = (): string => {
    if (Appearance.getColorScheme() === "light") {
      return Colors.basic.white.dft;
    }
    return Colors.basic.independence.drk;
  }

  /**
   * Returns the current styles object
   * @type {function}
   * @return {object} The styles object
   */
  getStyles: Function = (): object => ({
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

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render(): ReactNode {
    return this.getRender();
  }
}