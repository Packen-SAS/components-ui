import React, { Component } from "react";
import { View, TouchableNativeFeedback } from "react-native";

import colors from "../styles/abstracts/colors";
import PackenUiSvgIcon from "../PackenUiSvgIcon";
import PackenUiText from "./PackenUiText";

class PackenUiWhatsAppLink extends Component {
  constructor(props) {
    super(props);
    this.setState({ ...this.setPropsToState() });
  }

  componentDidMount() {
    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
  }

  setPropsToState = () => {
    return {
      style: this.props.style ? { ...this.props.style } : {},
      text: this.props.text ? this.props.text : "¿Necesitas ayuda?",
      trigger: this.props.trigger ? this.props.trigger : false,
      visible: this.props.visible ? this.props.visible : false,
      inverted: this.props.inverted ? this.props.inverted : false,
      color: this.props.color ? this.props.color : colors.basic.independence.drk_alt
    }
  }

  trigger = () => {
    if (typeof this.state.trigger === "function") {
      this.state.trigger();
    }
  }

  getStyles = () => (
    [
      {
        display: "flex", justifyContent: "flex-end",
        alignItems: "center", flexDirection: "row", width: "auto",
        height: "auto", padding: 5
      },
      (this.state.style !== null ? this.state.style : null)
    ]
  )

  updateState = () => {
    this.setState({ ...this.setPropsToState() });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.updateState();
    }
  }

  render = () => {
    return (
      <React.Fragment>
        {
          this.state.visible ? (
            <TouchableNativeFeedback
              onPress={this.trigger}>
              <View style={this.getStyles()}>
                <PackenUiSvgIcon name={!this.state.inverted ? "whatsapp" : "whatsapp_inverted"} width={24} height={24} />
                <PackenUiText
                  style={{
                    textDecorationStyle: "solid",
                    textDecorationLine: "underline",
                    textTransform: "uppercase",
                    fontSize: 12,
                    color: this.state.color,
                    textDecorationColor: this.state.color,
                  }}>
                  {this.state.text}
                </PackenUiText>
              </View>
            </TouchableNativeFeedback>
          ) : null
        }
      </React.Fragment>
    )
  };
}

export default PackenUiWhatsAppLink;