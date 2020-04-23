import React, { Component } from "react";
import { View, ScrollView, SafeAreaView, StyleSheet } from "react-native";

import Spacing from "../styles/abstracts/spacing";

class PageView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            {this.props.children}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.padding.horizontal.base
  }
});

export default PageView;