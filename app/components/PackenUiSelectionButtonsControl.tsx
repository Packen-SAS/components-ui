import React, { Component, ReactNode } from "react";
import PropTypes from "prop-types";
import { View, TouchableWithoutFeedback, Image, ImageSourcePropType } from "react-native";
import * as UTIL from "../utils";

import PackenUiText from "./PackenUiText";
import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";
import Shadows from "../styles/abstracts/shadows";

interface StylingPropShape {
  box: object;
  image: object;
  label: object;
}

interface ItemImageShape {
  src: ImageSourcePropType;
  width: number;
  height: number;
}

interface DataShape {
  value: string;
  label: string;
  isSelected: boolean;
  image: {
    default: ItemImageShape;
    active: ItemImageShape;
  };
}

interface ConfigShape {
  label?: {
    preset?: string;
  };
  image?: ImageSourcePropType;
}

interface PackenUiSelectionButtonsControlProps {
  type: string;
  data: DataShape;
  selected: string | boolean | any[];
  selection: string;
  onNewSelection: Function;
  altStyle: boolean;
  styling?: StylingPropShape;
  instance?: Function;
}

interface PackenUiSelectionButtonsControlState {
  altStyle: boolean,
  type: string,
  data: DataShape,
  selected: string | string[],
  selection: string,
  onNewSelection: Function | boolean,
  styling: StylingPropShape;
  state: string;
  config: ConfigShape;
  labelPreset: string;
}

/**
 * Component for rendering an individual selectable button for a {@link PackenUiSelectionButtons} component, and should not be used standalone
 */
class PackenUiSelectionButtonsControl extends Component<PackenUiSelectionButtonsControlProps, PackenUiSelectionButtonsControlState> {
  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props: PackenUiSelectionButtonsControlProps) {
    super(props);

    /**
     * Variable that stores the state
     * @type {object}
     * @property {string} state The current status of this item
     * @property {object} config The configuration for the particular inner elements depending on the type of item
     * @property {string} [labelPreset="s2"] The initial label preset to pass to the inner {@link PackenUiText} component
     */
    this.state = {
      ...this.setPropsToState(),
      state: this.getInitialState(),
      config: this.getConfig(),
      labelPreset: "s2"
    }
  }

  /**
   * Propagates the component instance if a callback is provided via props, and sets the labelPreset to the one defined in the config if its a "label" type item
   * @type {function}
   */
  componentDidMount() {
    if (this.state.type === "label" && this.state.config.label && typeof this.state.config.label.preset === "string") {
      this.setState({
        labelPreset: this.state.config.label.preset
      });
    }
    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
  }

  /**
   * Centralizes the received props assignment to set them to the state, determining default values in case any is not provided
   * @type {function}
   * @property {boolean} [altStyle="false"] Flag to switch to the alternative styles
   * @property {string} [type="label"] Determines which type of selection buttons to render - "label" for small, simple text buttons; or "image" for big buttons with an image and text
   * @property {object} [data={ value: string, label: string, isSelected: boolean, image: { default: { src: "", width: 0, height: 0 }, active: { src: "", width: 0, height: 0 } } }] The data for this item
   * @property {string[]} [selected=[]] The array of currently selected items' values
   * @property {string} [selection="single"] The type of selection - "single" for single selection; or "multiple" for multiple selections
   * @property {function} [onNewSelection=false] The callback function to be called when this item is selected
   * @property {object} [styling={ box: {}, image: {}, label: {} }] The optional custom styling props
   * @return {object} The props mapped to the state keys
   */
  setPropsToState: Function = (): object => {
    return {
      altStyle: this.props.altStyle ? this.props.altStyle : false,
      type: this.props.type ? this.props.type : "label",
      data: this.props.data ? { ...this.props.data } : {
        value: "",
        label: "",
        image: {
          src: "",
          width: 0,
          height: 0
        }
      },
      selected: this.props.selected === false ? false : this.props.selected ? this.props.selected : [],
      selection: this.props.selection ? this.props.selection : "single",
      onNewSelection: this.props.onNewSelection ? this.props.onNewSelection : false,
      styling: this.props.styling ? { ...this.props.styling } : {
        box: {},
        image: {},
        label: {}
      }
    };
  }

  /**
   * Returns the correct configuration
   * @type {function}
   * @return {object} The configuration object
   */
  getConfig: Function = (): ConfigShape => {
    let config = {};
    const { data, altStyle } = this.setPropsToState();

    if (this.props.type === "label") {
      config = {
        label: {
          preset: altStyle ? "h6" : "s2"
        }
      };
    } else {
      config = {
        image: { ...data.image }
      }
    }

    return config;
  }

  /**
   * Returns the status of this item
   * @type {function}
   * @return {string} The current status
   */
  getInitialState: Function = (): string => {
    let state;
    const data = this.setPropsToState().data;
    const selection = this.setPropsToState().selection;
    const selected = this.setPropsToState().selected;

    if (selection === "single") {
      state = selected === data.value ? "active" : "default";
    } else {
      state = selected.includes(data.value) ? "active" : "default";
    }

    return state;
  }

  /**
   * Handles a press on this item to propagate the new selection
   * @type {function}
   * @return {boolean} Flag used only for testing purposes
   */
  newSelection: VoidFunction = (): boolean | void => {
    if (typeof this.state.onNewSelection === "function") {
      this.state.onNewSelection(this.state.data.value);
    } else {
      return false;
    }
  }

  /**
   * Returns the image element if set so
   * @type {function}
   * @return {node|null} JSX for the image or null
   */
  getImage: Function = (): ReactNode | null => {
    let image = null;

    if (this.state.type === "image" && this.state.config.image) {
      image = (
        <Image
          source={this.state.config.image[this.state.state].src}
          style={{
            ...this.getStyles().img.base,
            ...this.getStyles().img.state[this.state.state],
            width: this.state.config.image[this.state.state].width,
            height: this.state.config.image[this.state.state].height,
            ...this.state.styling.image
          }}
        />
      );
    }

    return image;
  }

  /**
   * Determines whether this item should be active
   * @type {function}
   * @return {object} The new state for this item
   */
  checkIfActive: Function = (): object => {
    let newState = { ...this.state };

    if (this.state.selection === "single") {
      if (this.state.selected === this.state.data.value) {
        newState.state = "active";
      } else {
        newState.state = "default";
      }
    } else {
      if (this.state.selected.includes(this.state.data.value)) {
        newState.state = "active";
      } else {
        newState.state = "default";
      }
    }

    if (this.state.type === "label") {
      if (newState.state === "active") {
        newState.config = {
          label: {
            preset: "s1"
          }
        };
      } else {
        newState.config = {
          label: {
            preset: "s2"
          }
        };
      }
    }

    newState.selected = this.state.selected;
    this.setState(newState);

    return newState;
  }

  /**
   * Updates the state with new props, and checks if it's an active item
   * @type {function}
   * @param {object} prevProps Previous props
   */
  updateState: Function = (prevProps: PackenUiSelectionButtonsControlProps) => {
    this.setState({
      ...this.setPropsToState()
    }, () => {
      if (prevProps.selected !== this.props.selected && this.state.selected !== undefined) {
        this.checkIfActive();
      }
    });
  }

  /**
   * Compares props to determine if the component should update its state with new props
   * @type {function}
   * @param {object} prevProps Previous props
   */
  componentDidUpdate(prevProps: PackenUiSelectionButtonsControlProps) {
    if (!UTIL.objectsEqual(prevProps, this.props)) {
      this.updateState(prevProps);
    }
  }

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render(): ReactNode {
    return (
      <TouchableWithoutFeedback onPress={this.newSelection}>
        <View style={{
          ...this.getStyles().box.type[this.state.type],
          ...this.getStyles().box.state[this.state.state].type[this.state.type],
          ...this.getStyles().box.altStyle[this.state.altStyle.toString()].base,
          ...this.getStyles().box.altStyle[this.state.altStyle.toString()].state[this.state.state],
          ...this.state.styling.box
        }}>
          {this.getImage()}
          <PackenUiText
            preset={this.state.labelPreset}
            style={{
              ...this.getStyles().label.type[this.state.type],
              ...this.getStyles().label.state[this.state.state].type[this.state.type],
              ...this.getStyles().label.altStyle[this.state.altStyle.toString()].state[this.state.state],
              ...this.state.styling.label
            }}>{this.state.data.label}</PackenUiText>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  /**
   * Returns the current styles object
   * @type {function}
   * @return {object} The current styles object
   */
  getStyles: Function = (): Object => {
    return {
      box: {
        type: {
          label: {
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            height: 48,
            width: "auto",
            borderBottomWidth: 4,
            borderBottomStyle: "solid",
            borderBottomColor: "rgba(48, 77, 109, 0.2)",
            backgroundColor: "rgba(48, 77, 109, 0.1)"
          },
          image: {
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            height: 120,
            width: "auto",
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: Colors.basic.gray.lgt,
            backgroundColor: Colors.basic.gray.lgt,
            borderRadius: 8
          }
        },
        state: {
          default: { type: { label: {}, image: {} } },
          active: {
            type: {
              label: {
                backgroundColor: Colors.brand.primary.snw,
                borderBottomColor: Colors.brand.primary.drk,
                ...Shadows.md
              },
              image: {
                backgroundColor: Colors.brand.primary.snw,
                borderColor: Colors.brand.primary.drk,
                ...Shadows.md
              }
            }
          }
        },
        altStyle: {
          false: { base: {}, state: { default: {}, active: {} } },
          true: {
            base: {
              borderRadius: 8,
              borderWidth: 1,
              borderBottomWidth: 1,
              borderColor: Colors.basic.gray.lgt
            },
            state: {
              default: {
                backgroundColor: Colors.basic.gray.lgt,
                borderBottomColor: Colors.basic.gray.lgt
              },
              active: {
                borderColor: Colors.brand.primary.drk
              }
            }
          }
        }
      },
      img: {
        base: {
          marginBottom: 10
        },
        state: {
          default: {},
          active: {}
        }
      },
      label: {
        type: {
          label: {
            color: "rgba(48, 77, 109, 0.4)"
          },
          image: {
            color: Colors.basic.independence.dft,
            fontFamily: Typography.family.bold,
            fontSize: Typography.size.giant,
            lineHeight: Typography.lineheight.huge
          }
        },
        state: {
          default: { type: { label: {}, image: {} } },
          active: {
            type: {
              label: {
                color: Colors.brand.primary.drk
              },
              image: {
                color: Colors.brand.primary.udrk
              }
            }
          }
        },
        altStyle: {
          false: { state: { default: {}, active: {} } },
          true: {
            state: {
              default: {
                color: Colors.basic.independence.lgt
              },
              active: {
                color: Colors.brand.primary.udrk
              }
            }
          }
        }
      }
    };
  }

  static propTypes: object = {
    type: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    selected: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.bool]).isRequired,
    selection: PropTypes.string.isRequired,
    onNewSelection: PropTypes.func.isRequired,
    styling: PropTypes.object,
    instance: PropTypes.func
  };
}

export default PackenUiSelectionButtonsControl;