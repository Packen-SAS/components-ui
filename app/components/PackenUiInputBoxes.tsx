import React, { Component, ReactNode } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";

import * as UTIL from "../utils";
import PackenUiInput from "./PackenUiInput";

interface EventHandlersShape {
  onFocus?: Function;
  onBlur?: Function;
  onSubmitEditing?: Function;
}

interface PackenUiInputBoxesProps {
  boxes: number;
  emitCode: Function;
  styling?: object;
}

interface PackenUiInputBoxesState {
  boxes: ReactNode[];
}

type RenderBoxType = (id: number) => ReactNode;

/**
 * Component for rendering a horizontal sequence of 1-digit inputs
 */
class PackenUiInputBoxes extends Component<PackenUiInputBoxesProps, PackenUiInputBoxesState> {
  /**
   * Variable that stores the state
   * @type {object}
   * @property {node[]} boxes The array of JSX elements for each input
   */
  state: PackenUiInputBoxesState = {
    boxes: []
  };

  /**
   * Variable that stores each combined input data (ref, component JSX, input value)
   * @type {object[]}
   */
  items: any[] = [];

  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props: PackenUiInputBoxesProps) {
    super(props);
  }

  /**
   * Sets the initial configuration for the component
   * @type {function}
   */
  componentDidMount() {
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
  getPropStyling: Function = (): object => {
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
   * @param {number} ref The {@link PackenUiInput} component's identifier/name
   */
  setInputRef: Function = (input: ReactNode, ref: number) => {
    this.items[ref] = { ref: ref, input: input, text: null };
  }

  /**
   * Returns the combined inputs value
   * @type {function}
   * @returns {string} The combined inputs value
   */
  getVerificationCode: Function = (): string => {
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
  handleOnSubmit: Function = (id: number) => {
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
  clearInputs: Function = () => {
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
  handleInputText: Function = (ref: number, text: string) => {
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
    }
    if (typeof this.props.emitCode === "function") {
      this.props.emitCode(this.getVerificationCode());
      /* this.clearInputs(); */
    }
  }

  /**
   * Returns the event handlers to be passed to the inner {@link PackenUiInput} component
   * @type {function}
   * @return {object} The formatted event handlers object
   */
  getEventHandlers: Function = (): EventHandlersShape => ({
    onSubmitEditing: this.handleOnSubmit
  })

  /**
   * Renders each individual {@link PackenUiInput} component
   * @type {function}
   * @param {number} id The identifier for this box
   * @return {node} JSX for this box
   */
  renderBox: RenderBoxType = (id: number): ReactNode => (
    <View
      key={id}
      style={{ padding: 5, ...this.getPropStyling().item }}
    >
      <PackenUiInput
        name={id}
        size="medium"
        maxLength={1}
        theme="default"
        placeholder="-"
        textAlign="center"
        keyboardType="numeric"
        instance={this.setInputRef}
        onChangeText={this.handleInputText}
        style={PackenInputBoxesStyles.input}
        styling={this.getPropStyling().input}
        eventHandlers={this.getEventHandlers()}
      />
    </View>
  );

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render(): ReactNode {
    return (
      <View style={{
        ...PackenInputBoxesStyles.box_container,
        ...this.getPropStyling().container
      }}>
        {this.state.boxes}
      </View>
    );
  }

  /**
   * Defines prop-types for the component
   * @type {object}
   */
  static propTypes: object = {
    boxes: PropTypes.number.isRequired,
    emitCode: PropTypes.func.isRequired,
    styling: PropTypes.object
  };
}

const PackenInputBoxesStyles = StyleSheet.create({
  box_container: {
    width: "100%",
    display: "flex",
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    width: 56,
    height: 56,
    padding: 5,
    borderWidth: 2,
    textAlign: "center"
  }
});

export default PackenUiInputBoxes;