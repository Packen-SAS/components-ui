import React, { Component } from "react";
import { View } from "react-native";

import PackenTextArea from "../components/PackenTextArea";

class TextAreas extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      text: ""
    }
  }

  changeTextValue = textChanged => {
    this.setState({
      text: textChanged
    });
  }

  render() {
    return (
      <View>
        <PackenTextArea placeholder="Placeholder test"
          label="Label props" value={this.state.text}
          changeTextValue={this.changeTextValue}
        />
      </View>
    )
  }
}

export default TextAreas;