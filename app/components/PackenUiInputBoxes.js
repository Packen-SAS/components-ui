import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";

import * as UTIL from "../utils";
import PackenUiInput from "./PackenUiInput";

/**
 * Component for rendering a horizontal sequence of 1-digit inputs
 */
class PackenUiInputBoxes extends Component {
  /**
   * Variable that stores the state
   * @type {object}
   * @property {node[]} boxes The array of JSX elements for each input
   * @property {object[]} boxesRefs The array of {@link PackenUiInput} refs/instances
   */
  state = {
    boxes: [],
    boxesRefs: []
  };

  /**
   * Variable that stores each combined input data (ref, component JSX, input value)
   * @type {object[]}
   */
  items = [];

  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props) {
    super(props);
  }

  /**
   * Sets the initial configuration for the component
   * @type {function}
   */
  componentDidMount = () => {
    const { boxes } = this.props;
    for (let i = 0; i < boxes; i++) {
      this.items.push(i + 1);
    }
    this.setState({ boxes: this.items.map(this.renderBox) });
  }

  /**
   * Returns the optional custom styling props
   * @type {function}
   * @return {object} The styling object
   */
  getPropStyling = () => {
    return this.props.styling ? { ...this.props.styling } : {
      container: {},
      item: {},
      input: {}
    }
  }

  /**
   * Sets an input's ref to the global variable
   * @type {function}
   * @param {node} input The JSX for the input component
   * @param {object} ref The {@link PackenUiInput} component's ref/instance
   */
  setInputRef = (input, ref) => {
    this.items[ref] = { ref: ref, input: input, text: null };
  }

  /**
   * Returns the combined inputs value
   * @type {function}
   * @returns {string} The combined inputs value
   */
  getVerificationCode = () => {
    let code = "";
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].text != null) {
        code += this.items[i].text;
      }
    }
    return code;
  }

  /**
   * Handler function called when an input is submitted, to automatically focus the next one
   * @type {function}
   * @param {number} id The index identifier for the current input on focus
   */
  handleOnSubmit = id => {
    const lastItem = this.items[this.items.length - 1];
    const currentItem = this.items[id];
    if (currentItem.ref !== lastItem.ref) {
      if (currentItem.text != null) {
        const nextItem = this.items[currentItem.ref + 1];
        nextItem.input.focus();
      }
    } else {
      if (lastItem.text == null) { return; }
      if (typeof this.props.emitCode === "function") { this.props.emitCode(this.getVerificationCode()); }
    }
  }

  /**
   * Clears all inputs' values
   * @type {function}
   */
  clearInputs = () => {
    for (let i = 0; this.items[i] != null; i++) {
      if (this.items[i].input != null) {
        this.items[i].input.clear();
      }
    }
    return 0;
  }

  /**
   * Handler function called when an input's content changes, to automatically focus the next one
   * @type {function}
   * @param {number} ref The index identifier for the current input on focus
   * @param {string} text The input's value
   */
  handleInputText = (ref, text) => {
    const lastItem = this.items[this.items.length - 1];
    const currentItem = this.items[ref];
    if (!UTIL.isNumber(text)) {
      currentItem.input.clear();
      currentItem.text = null;
      return;
    }
    currentItem.text = text;
    this.items[ref] = currentItem;
    if (currentItem.ref !== lastItem.ref) {
      const nextItem = this.items[currentItem.ref + 1];
      nextItem.input.focus();
    } else {
      currentItem.input.blur();
      if (typeof this.props.emitCode === "function") {
        this.props.emitCode(this.getVerificationCode());
        /* this.clearInputs(); */
      }
    }
  }

  /**
   * Renders each individual {@link PackenUiInput} component
   * @type {function}
   * @param {number} id The identifier for this box
   * @return {node} JSX for this box
   */
  renderBox = id => (
    <View
      key={id}
      style={{ padding: 5, ...this.getPropStyling().item }}>
      <PackenUiInput
        instance={this.setInputRef}
        name={id}
        size="medium"
        onSubmit={this.handleOnSubmit}
        placeholder="0"
        onChangeText={this.handleInputText}
        maxLength={1}
        alignText="center"
        theme="default"
        style={{ textAlign: "center", padding: 5 }}
        styling={this.getPropStyling().input}
        keyboardType="numeric"
      />
    </View>
  );

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render = () => {
    return (
      <View style={{
        ...PackenInputBoxesStyles.box_container,
        ...this.getPropStyling().container
      }}>
        {this.state.boxes}
      </View>
    );
  }
}

const PackenInputBoxesStyles = StyleSheet.create({
  box_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15
  }
});

PackenUiInputBoxes.propTypes = {
  boxes: PropTypes.number.isRequired,
  emitCode: PropTypes.func.isRequired,
  styling: PropTypes.object
};

export default PackenUiInputBoxes;