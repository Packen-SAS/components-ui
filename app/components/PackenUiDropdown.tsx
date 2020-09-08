import React, { Component, ReactNode } from "react";
import PropTypes from "prop-types";
import { View, TouchableWithoutFeedback, LayoutChangeEvent, ImageSourcePropType } from "react-native";
import * as UTIL from "../utils";

import Colors from "../styles/abstracts/colors";
import Shadows from "../styles/abstracts/shadows";
import Typography from "../styles/abstracts/typography";

import PackenUiText from "./PackenUiText";
import PackenUiInput from "./PackenUiInput";
import PackenUiDropdownList from "./PackenUiDropdownList";

interface HelpShape {
  callback: Function;
  touchable: object;
  text: string;
}

interface IconShape {
  callback: VoidFunction;
  position: string;
  name: string;
  style: object;
}

interface MessageShape {
  icon: string;
  text: string;
}

interface SideConfigShape {
  type: "icon" | "avatar";
  config: {
    name: string;
    size: string;
    src: ImageSourcePropType;
  };
}

interface ItemShape {
  key: string | number;
  isDisabled: boolean;
  isSelected: boolean;
  value: string;
  left: SideConfigShape | boolean;
  right: SideConfigShape | boolean;
  main: {
    control: {
      type: string;
      label: string;
      value: string;
      isDisabled: boolean;
      items: any[];
      handleNotify: Function;
    };
    props: {
      children: object | object[];
      style: object;
    };
    type: {
      displayName: string;
    };
  };
}

interface ConfigShape {
  size: string;
  name: string;
  checkedIcon?: string;
  src: ImageSourcePropType;
  selectionType: "single" | "radio" | "multiple" | "checkbox";
}

interface ListShape {
  items: ItemShape[];
  config: ConfigShape;
}

interface InputStylingPropShape {
  header: {
    base: object;
    label: object;
  };
  help: {
    touchable: object;
    text: object;
  };
  box: object;
  input: object;
  message: {
    box: object;
    icon: object;
    iconSize: number | undefined;
    iconColor: string | undefined;
    text: object;
  };
  loader: {
    shape: object;
    shapeContent: object;
    label: object;
    iconWrapper: object;
    iconSize: number | undefined;
    iconColor: string | undefined;
  };
  iconWrapper: object;
  icon: object;
  iconSize: number | undefined;
  iconColor: string | undefined;
}

interface StylingPropShape {
  wrapper: object;
  inputWrapper: object;
  contentSizer: {
    wrapper: object;
    inner: object;
    text: object
  };
  menu: object;
  list: {
    wrapper: object;
    flatlist: object;
    item: object;
  };
  input: InputStylingPropShape;
}

interface InputStateShape {
  theme: string;
  size: string;
  onChangeText: Function | boolean;
  onOpenStateChange: Function;
  style: object;
  placeholder: string;
  placeholderTextColor: string,
  nonEditable: boolean;
  isOpen: boolean;
  icon: IconShape;
  message: MessageShape | undefined;
  label: string;
  help: HelpShape | undefined;
  isDropdown: boolean;
  disabled: boolean;
  multiline: boolean;
  name: string;
}

interface PackenUiDropdownProps {
  callback: Function;
  name: string;
  isDisabled?: boolean;
  input: InputStateShape;
  list: ListShape;
  size: string;
  styling?: StylingPropShape;
  instance?: Function;
}

interface PackenUiDropdownState {
  callback: Function;
  name: string;
  isDisabled: boolean;
  input: InputStateShape;
  list: ListShape;
  size: "tiny" | "small" | "medium" | "large" | "giant";
  styling: StylingPropShape;
  flag: boolean;
  contentSizerHeight: number;
  isOpen: boolean;
  dimensions: {
    menu: {
      height: number;
    }
  };
  styles: {
    menu: object;
  };
  finalSelection: string[];
  finalSelectionString: string;
}

type LayoutChangeType = (e: LayoutChangeEvent) => void;

/**
 * Component for rendering a dropdown, either as a standalone component or as part of a {@link PackenUiListItem} component
 */
class PackenUiDropdown extends Component<PackenUiDropdownProps, PackenUiDropdownState> {
  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props: PackenUiDropdownProps) {
    super(props);

    /**
     * Variable that stores the state
     * @type {object}
     * @property {boolean} flag A flag used to re-mount the component and ensure a correct update of inner elements
     * @property {number} contentSizerHeight The height of the hidden element used to capture the input content's height and resize the real, visible input accordingly
     * @property {boolean} isOpen Determines whether the dropdown is open or not
     * @property {object} dimensions Object that holds the dimensions of some of the component's inner elements
     * @property {object} styles The optional styles to be applied specifically to the menu wrapper element
     * @property {string[]} finalSelection The current selection(s)
     * @property {string} finalSelectionString The formatted selection string to be set to the input and content sizer elements
     * @return {object} The props mapped to the state keys
     */
    let innerState: object = {
      flag: true,
      contentSizerHeight: 0,
      isOpen: false,
      dimensions: {
        menu: {
          height: 0
        }
      },
      styles: {
        menu: {}
      },
      finalSelection: [],
      finalSelectionString: props.input && props.input.theme !== "list" ? "" : undefined
    };

    this.state = {
      ...this.setPropsToState(),
      ...innerState
    }
  }

  /**
   * Programmatically opens the menu
   * @type {function}
   */
  openMenu: Function = () => { this.setState({ isOpen: true }) };

  /**
   * Programmatically close the menu
   * @type {function}
   */
  closeMenu: Function = () => { this.setState({ isOpen: false }) };

  /**
   * Propagates the component instance if a callback is provided via props
   * @type {function}
   */
  componentDidMount() {
    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
  }

  /**
   * Placeholder function that does nothing
   * @type {function}
   * @return {boolean} Returned false value used for testing purposes
   */
  mockCallback: Function = (): boolean => false;

  /**
   * Centralizes the received props assignment to set them to the state, determining default values in case any is not provided
   * @type {function}
   * @property {function} [callback=mockCallback] The propagation function to be triggered when a new selection is made
   * @property {string} [name=""] The identifier for this dropdown
   * @property {boolean} [isDisabled=false] Determines if the dropdown should be disabled
   * @property {object} [input={ placeholder: "", onChangeText: mockCallback, onOpenStateChange: mockCallback, icon: { name: "chevron-down", position: "right" }, message: undefined, label: "", help: undefined, theme: "default", isDropdown: true, nonEditable: true, disabled: false, isOpen: false, multiline: true, name: "", style: {} }] The configuration for the inner {@link PackenUiInput}
   * @property {object} [list={ items: [], config: {} }] Contains the dropdown items and configuration
   * @property {string} [size="medium"] The size of the component for applying the correct styles - "tiny"; "small"; "medium"; "large"; "giant"
   * @property {object} [styling={ wrapper: {}, inputWrapper: {}, contentSizer: { wrapper: {}, inner: {}, text: {} }, menu: {}, list: {}, input: {} }] The optional custom styling props
   * @return {object} The props mapped to the state keys
   */
  setPropsToState: Function = (): object => {
    let newState = {
      callback: this.props.callback ? this.props.callback : this.mockCallback,
      name: this.props.name ? this.props.name : "",
      isDisabled: this.props.isDisabled ? this.props.isDisabled : false,
      input: this.props.input ? { ...this.props.input } : {
        placeholder: "",
        onChangeText: this.mockCallback,
        onOpenStateChange: this.mockCallback,
        icon: { name: "chevron-down", position: "right" },
        message: undefined,
        label: "",
        help: undefined,
        theme: "default",
        isDropdown: true,
        nonEditable: true,
        disabled: false,
        isOpen: false,
        multiline: true,
        name: "",
        style: {}
      },
      list: this.props.list ? { ...this.props.list } : { items: [], config: {} },
      size: this.props.size ? this.props.size : "medium",
      styling: this.props.styling ? { ...this.props.styling, contentSizer: { ...this.props.styling.contentSizer } } : {
        wrapper: {},
        inputWrapper: {},
        contentSizer: {
          wrapper: {},
          inner: {},
          text: {}
        },
        menu: {},
        list: {},
        input: {}
      },
      finalSelectionString:
        this.props.input && this.props.input.theme === "list"
          ? this.props.input.placeholder || ''
          : undefined
    };
    return newState;
  }

  /**
   * Sets the menu dimensions to the state
   * @type {function}
   * @param {number} height The height of the menu element
   */
  getMenuDimensions: LayoutChangeType = ({ nativeEvent }: LayoutChangeEvent) => {
    const { height } = nativeEvent.layout;
    this.setState({
      dimensions: {
        ...this.state.dimensions,
        menu: {
          height: height
        }
      }
    }, this.setCustomStyles);
  }

  /**
   * Combines and sets to the state the custom styles for the menu wrapper element
   * @type {function}
   */
  setCustomStyles: VoidFunction = () => {
    let customStyles = {};
    if (this.state.input && this.state.input.theme === "list") {
      customStyles = {
        bottom: 0
      };
    } else {
      customStyles = {
        bottom: -(this.state.dimensions.menu.height - 8)
      };
    }

    this.setState({
      styles: {
        ...this.state.styles,
        menu: customStyles
      }
    }, this.onOpenStateChange);
  }

  /**
   * Event handler for when the menu is toggled
   * @type {function}
   */
  onOpenStateChange: VoidFunction = () => {
    if (this.state.input.onOpenStateChange) {
      this.state.input.onOpenStateChange(this.state.isOpen, this.state.dimensions.menu.height);
    }
  }

  /**
   * Programmatically toggles the menu
   * @type {function}
   */
  toggleMenu: VoidFunction = () => {
    this.setState({
      isOpen: !this.state.isOpen
    }, this.onOpenStateChange);
  }

  /**
   * Sets the newly selected items to the state and triggers the callback to propagate the selection
   * @type {function}
   * @param {string[]} selectedItems The newly selected items
   */
  getFinalSelection: Function = (selectedItems: string[]) => {
    this.setState({
      finalSelection: selectedItems
    }, this.composeFinalSelectionString);

    this.state.callback(this.state.name, selectedItems);
  }

  /**
   * Concatenates the currently selected values into a single, formatted string
   * @type {function}
   * @param {string} item The current item being concatenated
   * @param {string} finalSelectionString The current string
   * @return {string} The updated final selection string
   */
  concatFinalSelectionString: Function = (item: string, finalSelectionString: string): string => finalSelectionString += `${item}, `;

  /**
   * Sets the formatted string to be displayed as the current selection to the state
   * @type {function}
   * @return {string} The final selection string
   */
  composeFinalSelectionString: VoidFunction = (): string => {
    let finalSelectionString = "";

    this.state.finalSelection.forEach(item => finalSelectionString = this.concatFinalSelectionString(item, finalSelectionString));
    finalSelectionString = finalSelectionString.slice(0, -2);

    this.setState({
      finalSelectionString: finalSelectionString
    });

    return finalSelectionString;
  }

  /**
   * Programmatically resets the current selection
   * @type {function}
   */
  reset: Function = () => { this.getFinalSelection([]); }

  /**
   * Updates the state with new props
   * @type {function}
   */
  updateState: Function = () => {
    const newFlagState = this.state.list.items.length > 0 ? true : !this.state.flag;
    this.setState({ ...this.setPropsToState(), flag: newFlagState });
  }

  /**
   * Compares props to determine if the component should update its state with new props
   * @type {function}
   * @param {object} prevProps Previous props
   */
  componentDidUpdate(prevProps: PackenUiDropdownProps) {
    if (!UTIL.objectsEqual(prevProps, this.props)) {
      this.updateState();
    }
  }

  /**
   * Returns the inner {@link PackenUiInput} placeholder's correct text and color
   * @type {function}
   * @return {object} The configuration object
   */
  getPlaceholderConfig: Function = (): object => {
    let config = {
      text: this.state.input.placeholder,
      color: Colors.basic.gray.dft
    };

    if (this.state.finalSelectionString !== "" && this.state.finalSelectionString !== undefined && this.state.finalSelectionString !== null) {
      config = {
        text: this.state.finalSelectionString,
        color: Colors.basic.independence.drk
      }
    }

    return config;
  }

  /**
   * Sets the content sizer actual dimensions to the state
   * @type {function}
   * @param {object} nativeEvent The event data
   */
  getContentSizerDimensions: LayoutChangeType = ({ nativeEvent }: LayoutChangeEvent) => {
    let { height } = nativeEvent.layout;
    const minHeight = this.getStyles().contentSizer.wrapper.size[this.state.size].minHeight;

    if (this.state.input.theme !== "list" && (height < minHeight)) {
      height = minHeight;
    }

    this.setState({
      contentSizerHeight: height
    });
  }

  /**
   * Returns the styles object to be applied to the inner {@link PackenUiInput} component
   * @type {function}
   * @returns {object} The styles object containing the appropriate height to update according to the current input value
   */
  getCustomStyle: Function = (): object => {
    let styles = {};

    if (this.state.contentSizerHeight !== 0) {
      styles = {
        height: this.state.contentSizerHeight
      }
    }

    return styles;
  }

  /**
   * Returns the inner {@link PackenUiInput} component
   * @type {function}
   * @return {node} JSX for the input element
   */
  getInput: Function = (): ReactNode => (
    <PackenUiInput
      size={this.state.size}
      placeholder={this.getPlaceholderConfig().text}
      placeholderTextColor={this.getPlaceholderConfig().color}
      onChangeText={this.state.input.onChangeText}
      icon={this.state.input.icon}
      message={this.state.input.message}
      label={this.state.input.label}
      help={this.state.input.help}
      theme={this.state.input.theme}
      isDropdown={true}
      nonEditable={this.state.input.nonEditable}
      disabled={this.state.isDisabled}
      isOpen={this.state.isOpen}
      multiline
      style={{
        ...this.getCustomStyle(),
        ...this.state.input.style,
        ...this.getStyles().input.base,
        ...this.getStyles().input.theme[this.state.input.theme]
      }}
      name="dropdownInput"
      styling={this.state.styling.input}
    />
  )

  /**
   * Returns the inner content sizer element
   * @type {function}
   * @return {node} JSX for the content sizer element
   */
  getContentSizer: Function = (): ReactNode => (
    <View
      pointerEvents="none"
      style={{
        ...this.getStyles().contentSizer.wrapper.base,
        ...this.getStyles().contentSizer.wrapper.size[this.state.size],
        ...this.getStyles().contentSizer.wrapper.padding[this.state.input.icon.position][this.state.size],
        ...this.getStyles().contentSizer.wrapper.theme[this.state.input.theme],
        ...this.state.styling.contentSizer.wrapper
      }}
    >
      <View
        onLayout={this.getContentSizerDimensions}
        style={{
          ...this.getStyles().contentSizer.inner.base,
          ...this.getStyles().contentSizer.inner.size[this.state.size],
          ...this.getStyles().contentSizer.inner.theme[this.state.input.theme],
          ...this.state.styling.contentSizer.inner
        }}
      >
        <PackenUiText
          style={{
            ...this.getStyles().contentSizer.text.base,
            ...this.getStyles().contentSizer.text.size[this.state.size],
            ...this.getStyles().contentSizer.text.theme[this.state.input.theme],
            ...this.state.styling.contentSizer.text
          }}
        >{this.state.finalSelectionString}</PackenUiText>
      </View>
    </View>
  )

  /**
   * Returns the inner {@link PackenUiDropdownList} component
   * @type {function}
   * @return {node} JSX for the {@link PackenUiDropdownList} component
   */
  getMenu: Function = (): ReactNode => (
    <View
      onLayout={this.getMenuDimensions}
      style={[
        this.getStyles().menu.base,
        this.getStyles().menu.theme[this.state.input.theme],
        this.state.styles.menu,
        this.state.styling.menu,
        { opacity: this.state.isOpen ? 1 : 0 }
      ]}
      pointerEvents={this.state.isOpen ? "auto" : "none"}
    >
      <PackenUiDropdownList
        key={this.state.flag.toString()}
        items={this.state.list.items}
        config={{ ...this.state.list.config }}
        numShownRows={4}
        resetDropdown={this.reset}
        theme={this.state.input.theme}
        getFinalSelection={this.getFinalSelection}
        finalSelectionArray={this.state.finalSelection}
        toggleMenu={this.toggleMenu}
        styling={this.state.styling.list}
      />
    </View>
  )

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render(): ReactNode {
    return (
      <View
        style={{
          ...this.getStyles().wrapper,
          ...this.state.styling.wrapper,
          ...{ paddingBottom: this.state.input && this.state.input.theme === "list" ? this.state.isOpen ? this.state.dimensions.menu.height : 0 : 0 }
        }}
        pointerEvents={this.state.isDisabled ? "none" : "auto"}
      >
        <TouchableWithoutFeedback onPress={this.toggleMenu}>
          <View style={{ ...this.getStyles().inputWrapper, ...this.state.styling.inputWrapper }} pointerEvents={this.state.input.nonEditable ? "box-only" : "auto"}>
            {this.getInput()}
            {this.getContentSizer()}
          </View>
        </TouchableWithoutFeedback>
        {this.getMenu()}
      </View>
    );
  }

  /**
   * Returns the current styles object
   * @type {function}
   * @return {object} The current styles object
   */
  getStyles: Function = (): object => {
    return {
      wrapper: {},
      inputWrapper: {},
      input: {
        base: {},
        theme: {
          default: {},
          success: {},
          danger: {},
          list: {
            marginTop: 0,
            marginBottom: 0,
            paddingTop: 0,
            paddingBottom: 0,
            height: this.state.contentSizerHeight
          }
        }
      },
      contentSizer: {
        wrapper: {
          base: {
            position: "absolute",
            height: "100%",
            width: "104%",
            opacity: 0
          },
          size: {
            tiny: {
              minHeight: 32,
              paddingHorizontal: 8
            },
            small: {
              minHeight: 40,
              paddingHorizontal: 16
            },
            medium: {
              minHeight: 48,
              paddingHorizontal: 16
            },
            large: {
              minHeight: 56,
              paddingHorizontal: 16
            },
            giant: {
              minHeight: 72,
              paddingHorizontal: 16
            }
          },
          theme: {
            default: {},
            success: {},
            danger: {},
            list: {
              minHeight: 48,
              paddingHorizontal: 0
            }
          },
          padding: {
            left: {
              tiny: {
                paddingLeft: 32
              },
              small: {
                paddingLeft: 40
              },
              medium: {
                paddingLeft: 48
              },
              large: {
                paddingLeft: 48
              },
              giant: {
                paddingLeft: 62
              }
            },
            right: {
              tiny: {
                paddingRight: 32
              },
              small: {
                paddingRight: 40
              },
              medium: {
                paddingRight: 48
              },
              large: {
                paddingRight: 48
              },
              giant: {
                paddingRight: 62
              }
            }
          }
        },
        inner: {
          base: {
            width: "100%"
          },
          size: {
            tiny: { paddingVertical: 7 },
            small: { paddingVertical: 10 },
            medium: { paddingVertical: 13 },
            large: { paddingVertical: 17 },
            giant: { paddingVertical: 23 }
          },
          theme: {
            default: {},
            success: {},
            danger: {},
            list: { paddingVertical: 0 }
          }
        },
        text: {
          base: {
            fontFamily: Typography.family.regular
          },
          size: {
            tiny: {
              fontSize: Typography.size.small,
              lineHeight: Typography.lineheight.small
            },
            small: {
              fontSize: Typography.size.medium,
              lineHeight: Typography.lineheight.medium_alt
            },
            medium: {
              fontSize: Typography.size.large,
              lineHeight: Typography.lineheight.large
            },
            large: {
              fontSize: Typography.size.large,
              lineHeight: Typography.lineheight.large
            },
            giant: {
              fontSize: Typography.size.giant_alt,
              lineHeight: Typography.lineheight.huge
            }
          },
          theme: {
            default: {},
            success: {},
            danger: {},
            list: {
              fontSize: Typography.size.large,
              lineHeight: Typography.lineheight.large
            }
          }
        }
      },
      menu: {
        base: {
          backgroundColor: Colors.basic.white.dft,
          position: "absolute",
          zIndex: 10,
          left: 0,
          width: "100%",
          opacity: 0,
          ...Shadows.md
        },
        theme: {
          default: {},
          success: {},
          danger: {},
          list: {
            transform: [{ translateY: 20 }],
            ...Shadows.xs
          }
        }
      }
    };
  }

  /**
   * Defines prop-types for the component
   * @type {object}
   */
  static propTypes: object = {
    callback: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
    input: PropTypes.object.isRequired,
    list: PropTypes.object.isRequired,
    size: PropTypes.string.isRequired,
    styling: PropTypes.object,
    instance: PropTypes.func
  };
}

export default PackenUiDropdown;