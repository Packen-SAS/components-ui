import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TouchableWithoutFeedback } from "react-native";

import Icon from "react-native-vector-icons/dist/Feather";
import Colors from "../styles/abstracts/colors";

import PackenUiInput from "./PackenUiInput";
import PackenUiDropdown from "./PackenUiDropdown";
import PackenUiText from "./PackenUiText";

class PackenUiListItem extends Component {
  constructor(props) {
    super(props);
    this.dropdownRef = null;
    this.state = { ...this.setPropsToState() }
  }

  componentDidMount() {
    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
  }

  setPropsToState = () => {
    return {
      data: {
        input: this.props.data.input ? { ...this.props.data.input } : false,
        size: this.props.data.size ? this.props.data.size : "default",
        title: this.props.data.title ? this.props.data.title : "",
        subtitle: this.props.data.subtitle ? this.props.data.subtitle : false,
        label: this.props.data.label ? this.props.data.label : false,
        icon: this.props.data.icon ? { ...this.props.data.icon } : false,
        media: this.props.data.media ? this.props.data.media : false,
        callback: this.props.data.callback ? this.props.data.callback : false,
        customWrapperStyle: this.props.data.customWrapperStyle ? this.props.data.customWrapperStyle : {}
      },
      styling: this.props.styling ? { ...this.props.styling } : {
        wrapper: {},
        media: {},
        main: {},
        sub: {},
        title: {},
        subtitle: {},
        dropdown: {},
        input: {},
        label: {},
        iconWrapper: {},
        iconSize: undefined,
        iconColor: undefined
      }
    };
  }

  onPressHandler = () => {
    if (this.state.data.callback) {
      this.state.data.callback();
    } else {
      return false;
    }
  }

  onOpenStateChangeHandler = (newState, height) => {
    this.setState({
      data: {
        ...this.state.data,
        input: {
          ...this.state.data.input,
          isOpen: newState,
          dropdownHeight: height
        }
      }
    });
  }

  getMedia = () => {
    let media = null;

    if (this.state.data.media) {
      media = (
        <View style={{ ...this.getStyles().media, ...this.state.styling.media }}>
          {this.state.data.media}
        </View>
      );
    }

    return media;
  }

  inputChangeHandler = (name, val) => {
    if (this.state.data.input.onChange) {
      this.state.data.input.onChange(name, val);
    } else {
      return false;
    }
  }

  getMainWrapper = children => {
    return (
      <View style={{ ...this.getStyles().main, ...this.state.styling.main }}>
        {children}
        {
          this.state.data.subtitle ? (
            <PackenUiText style={{
              color: "rgba(48, 77, 109, 0.4)",
              transform: [
                { translateY: this.state.data.input && this.state.data.input.isOpen ? -this.state.data.input.dropdownHeight : 0 }
              ],
              ...this.state.styling.subtitle
            }} preset="c1">{this.state.data.subtitle}</PackenUiText>
          ) : null
        }
      </View>
    );
  }

  getPlaceholder = () => {
    let config = {
      val: this.state.data.input.placeholder,
      color: Colors.basic.gray.dft
    };

    if (this.state.data.input.value !== "") {
      config = {
        val: this.state.data.input.value,
        color: Colors.basic.independence.drk
      };
    }

    return config;
  }

  getDropdownRef = ref => { this.dropdownRef = ref; }

  toggleDropdown = () => {
    if (this.dropdownRef) {
      this.dropdownRef.toggleMenu();
    }
  }

  determineInputContent = () => {
    let content = null;
    if (this.state.data.input.isDropdown) {
      content = (
        <PackenUiDropdown
          size="medium"
          ref={this.getDropdownRef}
          name={this.state.data.input.name}
          list={this.state.data.input.list}
          callback={this.inputChangeHandler}
          styling={this.state.styling.dropdown}
          input={{
            theme: "list",
            size: "medium",
            onChangeText: false,
            onOpenStateChange: this.onOpenStateChangeHandler,
            style: {
              paddingHorizontal: 24,
              marginHorizontal: -24,
              paddingVertical: 15,
              marginVertical: -15
            },
            placeholder: this.getPlaceholder().val,
            placeholderTextColor: this.getPlaceholder().color,
            nonEditable: this.state.data.input.nonEditable,
            isOpen: this.state.data.input.isOpen,
            icon: { position: "right" }
          }}
        />
      );
    } else {
      content = (
        <PackenUiInput
          theme="list"
          size="medium"
          name={this.state.data.input.name}
          style={{ marginVertical: -5 }}
          keyboardType={this.state.data.input.keyboardType}
          onChangeText={this.inputChangeHandler}
          placeholder={this.getPlaceholder().val}
          placeholderTextColor={this.getPlaceholder().color}
          nonEditable={this.state.data.input.nonEditable}
          multiline={this.state.data.input.multiline}
          maxLength={this.state.data.input.maxLength}
          styling={this.state.styling.input}
        />
      )
    }
    return content;
  }

  getMainContent = () => {
    let content = null;

    if (this.state.data.input) {
      content = this.determineInputContent();
    } else {
      content = (
        <PackenUiText preset="p1" styling={this.state.styling.title}>{this.state.data.title}</PackenUiText>
      );
    }

    return this.getMainWrapper(content);
  }

  getSubContent = () => {
    return (
      <View style={{ ...this.getStyles().sub, ...this.state.styling.sub }}>
        {
          this.state.data.label ? (
            <PackenUiText style={{
              color: this.state.data.label.color,
              ...this.state.styling.label
            }} preset="c1">{this.state.data.label.text}</PackenUiText>
          ) : null
        }
        {
          this.state.data.icon ? (
            <View style={{
              ...this.getStyles().icon,
              ...this.state.styling.iconWrapper
            }}>
              <Icon
                name={this.state.data.icon.name}
                size={this.state.styling.iconSize ? this.state.styling.iconSize : 14}
                color={this.state.styling.iconColor ? this.state.styling.iconColor : this.state.data.icon.color} />
            </View>
          ) : null
        }
      </View>
    )
  }

  getTouchableArea = () => {
    return (
      <View style={{ ...this.getStyles().touchable.area }} pointerEvents={this.state.data.input && this.state.data.input.isDropdown ? "auto" : "none"}>
        <TouchableWithoutFeedback onPress={this.toggleDropdown}>
          <View style={{ ...this.getStyles().touchable.inner }}></View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  updateState = () => {
    this.setState({ ...this.setPropsToState() });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      this.updateState();
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={this.onPressHandler}
      >
        <View style={{ ...this.state.data.customWrapperStyle }}>
          {this.getTouchableArea()}
          <View style={{
            ...this.getStyles().wrapper.base,
            ...this.getStyles().wrapper.size[this.state.data.size],
            ...this.state.styling.wrapper
          }}>
            {this.getMedia()}
            {this.getMainContent()}
            {this.getSubContent()}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  getStyles = () => {
    return {
      wrapper: {
        base: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 12,
          paddingHorizontal: 24,
          backgroundColor: Colors.basic.white.dft
        },
        size: {
          default: {
            minHeight: 48
          },
          large: {
            minHeight: 56
          }
        }
      },
      touchable: {
        area: {
          top: 0,
          left: 0,
          zIndex: 1,
          width: "100%",
          height: "100%",
          maxHeight: 50,
          position: "absolute"
        },
        inner: {
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          position: "absolute"
        }
      },
      media: {
        marginRight: 15
      },
      main: {
        flex: 1
      },
      sub: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end"
      },
      icon: {
        marginLeft: 10
      }
    };
  }
}

PackenUiListItem.propTypes = {
  data: PropTypes.shape({
    input: PropTypes.object,
    size: PropTypes.string.isRequired,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    label: PropTypes.shape({
      text: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired
    }),
    icon: PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired
    }),
    media: PropTypes.node,
    callback: PropTypes.func,
    customWrapperStyle: PropTypes.object
  }).isRequired,
  styling: PropTypes.object
};

export default PackenUiListItem;