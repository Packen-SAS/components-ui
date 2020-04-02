import React, { Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import SyntaxHighlighter from "react-native-syntax-highlighter";

import Colors from "../app/styles/abstracts/colors";
import Typography from "../app/styles/abstracts/typography";

import PackenUiText from "../app/components/PackenUiText";
import PackenUiDivider from "../app/components/PackenUiDivider";

class Wrapper extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <PackenUiText preset="h6" style={styles.header__title}>{this.props.title}</PackenUiText>
          <PackenUiText preset="s2" style={styles.header__subtitle}>Component</PackenUiText>
        </View>
        <ScrollView contentContainerStyle={styles.scrolling}>
          <View style={styles.rendered}>
            <PackenUiText preset="s1">Rendered component</PackenUiText>
          </View>
          <View style={this.props.full ? styles.innerFull : styles.inner}>
            {this.props.children}
          </View>
          <View style={styles.info}>
            <PackenUiDivider size={1} type="light" margin={{ top: 0, bottom: 25 }}/>
            <PackenUiText preset="s1" style={{ marginBottom: 5 }}>Description</PackenUiText>
            <PackenUiText preset="p2">{this.props.description}</PackenUiText>
            <PackenUiDivider size={1} type="light" margin={{ top: 25, bottom: 25 }}/>
            <PackenUiText preset="s1" style={{ marginBottom: 15 }}>Code example</PackenUiText>
            <SyntaxHighlighter
              language="javascript"
              wrapLines={true}
            >
              {this.props.code}
            </SyntaxHighlighter>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Wrapper;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.basic.white.dft
  },
  header: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: Colors.brand.primary.drk
  },
  header__title: {
    color: Colors.basic.white.dft
  },
  header__subtitle: {
    color: Colors.basic.white.dft,
    fontFamily: Typography.family.regular,
    fontSize: 12,
    lineHeight: 14
  },
  scrolling: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start"
  },
  rendered: {
    paddingTop: 25,
    paddingRight: 25,
    paddingLeft: 25
  },
  inner: {
    padding: 25,
    borderRadius: 5,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  innerFull: {
    padding: 25,
    borderRadius: 5,
    width: "100%",
    alignItems: "stretch",
    justifyContent: "center"
  },
  info: {
    paddingBottom: 25,
    paddingLeft: 25,
    paddingRight: 25,
    flex: 1
  }
});