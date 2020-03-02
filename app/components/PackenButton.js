import React, { useState, useEffect } from "react";
import { TouchableWithoutFeedback, View } from "react-native"

import Icon from "react-native-vector-icons/Feather";
import Color from "../styles/abstracts/colors";
import PackenText from "./PackenText";
import * as ButtonStyles from "../styles/components/PackenButton";

const PackenButton = props => {
  const { type, level, size, icon, isDisabled } = props;
  const [shapeHeight, setShapeHeight] = useState(0);
  const [shapeWidth, setShapeWidth] = useState(0);
  const [iconHeight, setIconHeight] = useState(0);
  const [iconWidth, setIconWidth] = useState(0);

  const get_styles = () => {
    let styles = {
      shape: {
        ...ButtonStyles.base.shape,
        ...ButtonStyles[type][size].shape,
        ...ButtonStyles[level].shape
      },
      content: {
        position: "relative"
      },
      icon: {
        ...ButtonStyles.base.icon,
        ...ButtonStyles[type][size].icon,
        ...ButtonStyles[level].icon
      }
    };

    switch (type) {
      case "icon":
        styles = {
          ...styles,
          iconWrapper: {
            position: "absolute",
            top: (shapeHeight/2) - (iconHeight/2),
            left: (shapeWidth/2) - (iconWidth/2)
          }
        };
        break;
      case "regular":
        styles = {
          ...styles,
          label: {
            ...ButtonStyles.base.label,
            ...ButtonStyles[type][size].label,
            ...ButtonStyles[level].label
          },
          iconWrapper: {
            position: "absolute",
            top: (shapeHeight/2) - (iconHeight/2),
            right: icon.position === "left" ? "auto" : -(ButtonStyles[type][size].label.marginHorizontal + (iconWidth/2)),
            left: icon.position === "right" ? "auto" : -(ButtonStyles[type][size].label.marginHorizontal + (iconWidth/2))
          }
        };
        break;
      default:
        break;
    }

    /* Custom styles depending on the level */
    switch (level) {
      case "secondary":
        styles.shape = {
          ...styles.shape,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: Color.secondary.default_drk
        }
        break;
      default:
      case "ghost":
      case "primary":
      case "tertiary":
      case "danger":
        break;
    }

    /* Custom styles for isDisabled states */
    if (isDisabled) {
      styles.shape.backgroundColor = Color.base.disabled;
      styles.icon.color = Color.base.white;

      if (styles.label) {
        styles.label.color = Color.base.white;
      }

      if (styles.shape.borderWidth) {
        styles.shape.borderWidth = 0;
      }

      if (level === "ghost") {
        styles.shape.backgroundColor = Color.base.transparent;
        styles.icon.color = Color.base.disabled_alt;

        if (styles.label) {
          styles.label.color = Color.base.disabled_alt;
        }
      }
    }

    return styles;
  }

  const [styles, setStyles] = useState(get_styles());

  useEffect(() => {
    setStyles(get_styles());
  }, [shapeHeight, iconHeight, iconWidth]);

  const get_shape_dimensions = e => {
    setShapeHeight(Math.floor(e.height));
    setShapeWidth(Math.floor(e.width));
  }

  const get_icon_dimensions = e => {
    setIconHeight(Math.floor(e.height));
    setIconWidth(Math.floor(e.width));
  }

  const execute_callback = () => {
    props.callback();
  }

  const pressIn_handler = () => {
    let newStyles = {...get_styles()}
    newStyles.shape.backgroundColor = Color[level].focus;

    /* Custom focus styles */
    switch (level) {
      case "secondary":
        newStyles.shape.borderColor = Color.secondary.focus;
        break;
      default:
      case "primary":
      case "tertiary":
      case "ghost":
      case "danger":
        break;
    }

    setStyles(newStyles);
  }

  const pressOut_handler = () => {
    const newStyles = {...get_styles()}
    newStyles.shape.backgroundColor = Color[level].default;
    setStyles(newStyles);
  }

  return (
    <View pointerEvents={isDisabled ? "none" : "auto"}>
      <TouchableWithoutFeedback onPress={execute_callback} onPressIn={pressIn_handler} onPressOut={pressOut_handler}>
        <View style={styles.shape}>
          <View style={styles.shape__content} onLayout={e => { get_shape_dimensions(e.nativeEvent.layout); }}>
            <PackenText style={styles.label}>{props.children}</PackenText>
            <View style={styles.iconWrapper} onLayout={e => { get_icon_dimensions(e.nativeEvent.layout); }}>
              <Icon name={icon.name} size={styles.icon.fontSize} color={styles.icon.color}/>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

export default PackenButton;