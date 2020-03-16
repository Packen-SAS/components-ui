import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import Colors from "../app/styles/abstracts/colors";

class Wrapper extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.inner}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

export default Wrapper;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  inner: {
    padding: 25,
    borderRadius: 5,
    elevation: 5,
    width: "100%",
    backgroundColor: Colors.basic.white.dft
  }
});