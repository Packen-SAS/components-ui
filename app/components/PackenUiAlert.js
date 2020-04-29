import React, { Component } from "react";
import { View, TouchableWithoutFeedback } from "react-native";

import Icon from "react-native-vector-icons/dist/Feather";
import Colors from "../styles/abstracts/colors";
import PackenUiText from "./PackenUiText";
import Typography from "../styles/abstracts/typography";

class PackenUiAlert extends Component {
  constructor(props) {
    super(props);

    this.state = { ...this.setPropsToState() }
  }

  setPropsToState = () => {
    return {
      type: this.props.type ? this.props.type : "static",
      theme: this.props.theme ? this.props.theme : "default",
      text: this.props.text ? { ...this.props.text } : {
        title: "",
        main: "",
        preset: undefined
      },
      onClose: this.props.onClose ? this.props.onClose : false,
      countdown: this.props.countdown ? this.props.countdown : false
    };
  }

  componentDidMount() {
    this.checkIfTimed();
  }

  checkIfTimed = () => {
    if(this.state.type === "timed" && this.state.countdown) {
      const timeout = setTimeout(() => {
        this.close();
        clearTimeout(timeout);
      }, this.state.countdown);
    } else {
      return false;
    }
  }

  close = () => {
    if (this.state.onClose) {
      this.state.onClose();
    } else {
      return false;
    }
  }

  getIconName = () => {
    let iconName = "info";

    switch(this.state.theme) {
      case "success":
        iconName = "check-circle";
        break;
      case "warning":
      case "danger":
        iconName = "alert-triangle";
        break;
    }

    return iconName;
  }

  getTitle = () => {
    let title = "";

    if (this.state.text.title) {
      title = this.state.text.title + ": ";
    }

    return title;
  }

  updateState = () => {
    this.setState({
      ...this.setPropsToState()
    }, this.checkIfTimed);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.updateState();
    }
  }

  render() {
    return (
      <View style={[
        this.getStyles().box.base,
        this.getStyles().box.theme[this.state.theme]
      ]}>
        <View style={this.getStyles().iconWrapper}>
          <Icon
            name={this.getIconName()}
            size={this.getStyles().icon.base.size}
            color={this.getStyles().icon.theme[this.state.theme].color}
          />
        </View>
        <View style={this.getStyles().main}>
          <PackenUiText
            preset={this.state.text.preset}
            style={this.getStyles().text.theme[this.state.theme]}
          >
            <PackenUiText
              preset={this.state.text.preset}
              style={{
                ...this.getStyles().text.theme[this.state.theme],
                fontFamily: Typography.family.bold
              }}
            >{this.getTitle()}</PackenUiText>{this.state.text.main}</PackenUiText>
        </View>
        <TouchableWithoutFeedback onPress={this.close}>
          <View style={this.getStyles().iconWrapper}>
            <Icon
              name="x"
              size={this.getStyles().icon.base.size}
              color={this.getStyles().icon.theme[this.state.theme].color}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  getStyles = () => {
    return {
      box: {
        base: {
          width: "100%",
          paddingVertical: 16,
          paddingHorizontal: 16,
          borderWidth: 1,
          borderStyle: "solid",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 4,
          elevation: 5,
          shadowColor: Colors.basic.black.dft,
          shadowOffset: {
            width: 0,
            height: 4
          },
          shadowOpacity: 0.1,
          shadowRadius: 5
        },
        theme: {
          default: {
            borderColor: Colors.basic.independence.lgt,
            backgroundColor: Colors.basic.gray.lgt
          },
          primary: {
            borderColor: Colors.brand.primary.drk,
            backgroundColor: Colors.brand.primary.snw
          },
          info: {
            borderColor: Colors.info.drk,
            backgroundColor: Colors.info.lgt
          },
          warning: {
            borderColor: Colors.warning.drk,
            backgroundColor: Colors.warning.lgt
          },
          danger: {
            borderColor: Colors.danger.focus,
            backgroundColor: Colors.danger.lgt
          },
          success: {
            borderColor: Colors.success.drk,
            backgroundColor: Colors.success.lgt
          }
        }
      },
      iconWrapper: {
        width: 16
      },
      icon: {
        base: {
          size: 16
        },
        theme: {
          default: {
            color: Colors.basic.independence.lgt
          },
          primary: {
            color: Colors.brand.primary.drk
          },
          info: {
            color: Colors.info.default
          },
          warning: {
            color: Colors.warning.drk
          },
          danger: {
            color: Colors.danger.focus
          },
          success: {
            color: Colors.success.drk
          }
        }
      },
      main: {
        flex: 1,
        paddingHorizontal: 10
      },
      text: {
        theme: {
          default: {
            color: Colors.basic.independence.lgt
          },
          primary: {
            color: Colors.brand.primary.drk
          },
          info: {
            color: Colors.info.default
          },
          warning: {
            color: Colors.warning.drk
          },
          danger: {
            color: Colors.danger.focus
          },
          success: {
            color: Colors.success.drk
          }
        }
      }
    };
  }
}

export default PackenUiAlert;