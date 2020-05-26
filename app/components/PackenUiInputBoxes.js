import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import * as UTIL from "../modules/utils";
import PackenUiInput from "./PackenUiInput";

export default class PackenInputBoxes extends Component {
  state = {
    boxes: [],
    boxesRefs: []
  };

  items = [];

  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    const { boxes } = this.props;
    for (var i = 0; i < boxes; i++) {
      this.items.push(i + 1);
    }
    this.setState({ boxes: this.items.map(this.renderBox) });
  }

  setInputRef = (input, ref) => {
    this.items[ref] = { ref: ref, input: input, text: null };
  }

  reducer = (a, b) => (a.text + b.text);

  getVerificationCode = () => {
    var code = "";
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].text != null) {
        code += this.items[i].text;
      }
    }
    return code;
  }

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
  clearInputs = () => {
    for (var i = 0; this.items[i] != null; i++) {
      if (this.items[i].input != null) {
        this.items[i].input.clear();
      }
    }
    return 0;
  }

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
      if (currentItem.text != null) {
        const nextItem = this.items[currentItem.ref + 1];
        nextItem.input.focus();
      }
    } else {
      currentItem.input.blur();
      if (typeof this.props.emitCode === "function") {
        this.props.emitCode(this.getVerificationCode());
        //this.clearInputs();
      }
    }
  }

  renderBox = id => (
    <View
      key={id}
      style={{ padding: 5 }}>
      <PackenUiInput
        instance={this.setInputRef}
        name={id}
        size="medium"
        onSubmit={this.handleOnSubmit}
        placeholder="0"
        onChangeText={this.handleInputText}
        max={1}
        alignText="center"
        theme="default"
        style={{ textAlign: "center", padding: 5 }}
        keyboardType="numeric"
      />
    </View>
  );

  render = () => {
    return (
      <View style={PackenInputBoxesStyles.box_container}>
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