import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import * as UTIL from "../utils";

import Icon from "react-native-vector-icons/dist/Feather";
import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";

import PackenUiText from "./PackenUiText";

/**
 * Component for rendering an individual step of a {@link PackenUiServiceStatus} component, and should not be used standalone
 */
class PackenUiServiceStatusItem extends Component {
  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props) {
    super(props);

    /**
     * Variable to control the vertical space between each item
     * @type {number}
     */
    this.spaceBetweenItems = 25;

    /**
     * Variable that stores the state
     * @type {object}
     * @property {string} [state="default"] The item's current status
     * @property {node|null} time JSX for the time element or null if the step is not yet reached
     * @property {object} dimensions Stores the item's element's dimensions
     */
    this.state = {
      ...this.setPropsToState(),
      state: this.getInitialState(),
      time: this.getInitialTime(),
      dimensions: {
        box: {
          height: 0
        },
        line: {
          height: 0,
          bottom: 0
        }
      }
    }
  }

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
   * Centralizes the received props assignment to set them to the state, determining default values in case any is not provided
   * @type {function}
   * @property {object} [data={ isComplete: false, isCurrent: false, time: "00:00" }] The data for this step
   * @property {number} [index=0] The step's index in the timeline
   * @property {number[]} [itemsHeights=[]] Stores the height of each {@link PackenUiServiceStatusItem} component of the timeline
   * @property {function} [setItemsHeights=false] Callback function to be propagate this step's height
   * @property {number} [currentStepIndex=-1] The currently selected step item
   * @property {object} [styling={ box: {}, sub: {}, time: {}, spacer: {}, line: {}, dot: {}, dotIconSize: undefined, dotIconColor: undefined, main: {}, title: {}, subtitle: {} }] The optional custom styling props
   * @return {object} The props mapped to the state keys
   */
  setPropsToState = () => {
    return {
      data: this.props.data ? { ...this.props.data } : {
        isComplete: false,
        isCurrent: false,
        time: "00:00"
      },
      index: this.props.index ? this.props.index : 0,
      itemsHeights: this.props.itemsHeights ? [...this.props.itemsHeights] : [],
      setItemsHeights: this.props.setItemsHeights ? this.props.setItemsHeights : false,
      currentStepIndex: this.props.currentStepIndex ? this.props.currentStepIndex : -1,
      styling: this.props.styling ? { ...this.props.styling } : {
        box: {},
        sub: {},
        time: {},
        spacer: {},
        line: {},
        dot: {},
        dotIconSize: undefined,
        dotIconColor: undefined,
        main: {},
        title: {},
        subtitle: {}
      }
    };
  }

  /**
   * Returns the step's current status
   * @type {function}
   * @return {string} The current status
   */
  getInitialState = () => {
    let initialState = "default";
    const data = this.setPropsToState().data;

    if (data.isComplete) {
      initialState = "completed";
    } else if (data.isCurrent) {
      initialState = "active";
    }

    return initialState;
  }

  /**
   * Returns the time element
   * @type {function}
   * @return {node|null} JSX for the time or null
   */
  getInitialTime = () => {
    let time = null;
    const data = this.setPropsToState().data;
    const customStyles = this.state && this.state.styling ? { ...this.state.styling.time } : this.props.styling ? { ...this.props.styling.time } : {};
    
    if (data.time) {
      time = (
        <PackenUiText
          style={{ ...this.getStyles().time, ...customStyles }}
        >{data.time}</PackenUiText>
      );
    }

    return time;
  }

  /**
   * Sets the current time element to the state
   * @type {function}
   * @param {date} date The date object to display
   */
  setCurrentTime = date => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const strTime = `${hours}:${minutes} ${ampm}`;

    this.setState({
      time: (
        <PackenUiText
        style={{ ...this.getStyles().time, ...this.state.styling.time }}
        >{strTime}</PackenUiText>
      )
    });
  }

  /**
   * Returns the subtitle element
   * @type {function}
   * @return {node|null} JSX for the subtitle
   */
  getSubtitle = () => {
    let subtitle = null;

    if (this.state.data.subtitle) {
      subtitle = (
        <PackenUiText
          style={{
            ...this.getStyles().subtitle.base,
            ...this.getStyles().subtitle.state[this.state.state],
            ...this.state.styling.subtitle
          }}
        >{this.state.data.subtitle}</PackenUiText>
      );
    }

    return subtitle;
  }

  /**
   * Returns the positioning styles for the step's line element
   * @type {function}
   * @return {object} The styles object with "height" and "bottom" defined
   */
  getLinePositioning = () => {
    return {
      height: this.state.dimensions.line.height,
      bottom: this.state.dimensions.line.bottom
    };
  }

  /**
   * Returns the line element
   * @type {function}
   * @return {node|null} JSX for the line element or null if it's the first step
   */
  getLine = () => {
    let line = (
      <View style={{
        ...this.getStyles().line.base,
        ...this.getStyles().line.state[this.state.state],
        ...this.getLinePositioning(),
        ...this.state.styling.line
      }}></View>
    );

    if (this.state.index === 0) {
      line = null;
    }

    return line;
  }

  /**
   * Returns the styles object for the box element
   * @type {function}
   * @return {object} The styles object with "marginTop" and "zIndex" defined
   */
  getBoxStyles = () => {
    return {
      marginTop: this.state.index === 0 ? 0 : this.spaceBetweenItems,
      zIndex: this.state.itemsHeights.length - this.state.index
    };
  }

  /**
   * Returns the dot element if the step is completed
   * @type {function}
   * @return {node|null} JSX for the dot or null
   */
  getDotIcon = () => {
    let icon = null;

    if (this.state.state === "completed") {
      icon = (
        <Icon
          name="check"
          size={this.state.styling.dotIconSize ? this.state.styling.dotIconSize : this.getStyles().icon.size}
          color={this.state.styling.dotIconColor ? this.state.styling.dotIconColor : this.getStyles().icon.color} />
      );
    }

    return icon;
  }

  /**
   * Returns the previous step's height
   * @type {function}
   * @return {number} The previous step's height
   */
  getPreviousBoxHeight = () => {
    if (this.state.index > 0) {
      return this.state.itemsHeights[this.state.index - 1];
    } else {
      return 0;
    }
  }

  /**
   * Sets the box dimensions to the state and propagates its height
   * @type {function}
   */
  setBoxDimensions = e => {
    const { height } = e.nativeEvent.layout;

    this.setState({
      dimensions: {
        box: {
          height: height
        },
        line: {
          height: (height / 2) + this.spaceBetweenItems + (this.getPreviousBoxHeight() / 2),
          bottom: height / 2
        }
      }
    });

    if (this.state.setItemsHeights) {
      this.state.setItemsHeights(this.state.index, height);
    } else {
      return false;
    }
  }

  /**
   * Updates the state with new props, and checks if its status changed
   * @type {function}
   * @param {object} prevProps Previous props
   */
  updateState = () => {
    this.setState({
      ...this.setPropsToState()
    }, () => {
      if (this.props.currentStepIndex === this.props.index) {
        this.setState({
          state: "active"
        });
        this.setCurrentTime(new Date());
      } else if (this.props.index < this.props.currentStepIndex) {
        this.setState({
          state: "completed"
        });
      } else {
        this.setState({
          state: "default",
          time: null
        });
      }
    });
  }

  /**
   * Compares props to determine if the component should update its state with new props
   * @type {function}
   * @param {object} prevProps Previous props
   */
  componentDidUpdate(prevProps) {
    if (!UTIL.objectsEqual(prevProps, this.props)) {
      this.updateState();
    }
  }

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render() {
    return (
      <View
        style={{
          ...this.getStyles().item,
          ...this.getBoxStyles(),
          ...this.state.styling.box
        }}
        onLayout={e => { this.setBoxDimensions(e); }}
      >
        <View style={{ ...this.getStyles().sub, ...this.state.styling.sub }}>
          {this.state.time}
        </View>
        <View style={{ ...this.getStyles().spacer, ...this.state.styling.spacer }}>
          {this.getLine()}
          <View style={{
            ...this.getStyles().dot.base,
            ...this.getStyles().dot.state[this.state.state],
            ...this.state.styling.dot
          }}>
            {this.getDotIcon()}
          </View>
        </View>
        <View style={{ ...this.getStyles().main, ...this.state.styling.main }}>
          <PackenUiText
            style={{
              ...this.getStyles().title.state[this.state.state],
              ...this.state.styling.title
            }}
          >{this.state.data.title}</PackenUiText>
          {this.getSubtitle()}
        </View>
      </View>
    );
  }

  /**
   * Returns the current styles object
   * @type {function}
   * @return {object} The current styles object
   */
  getStyles = () => {
    return {
      item: {
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "space-between",
        position: "relative"
      },
      sub: {
        width: 35,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
      },
      time: {
        fontFamily: Typography.family.regular,
        fontSize: Typography.size.xtiny,
        lineHeight: Typography.lineheight.xtiny,
        color: Colors.basic.gray.drk
      },
      spacer: {
        width: 40,
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
      },
      line: {
        base: {
          width: 1,
          position: "absolute",
          left: 20,
          zIndex: 1
        },
        state: {
          default: {
            backgroundColor: Colors.basic.gray.drk
          },
          completed: {
            backgroundColor: Colors.basic.independence.dft
          },
          active: {
            backgroundColor: Colors.basic.independence.dft
          }
        }
      },
      dot: {
        base: {
          borderRadius: 20,
          position: "relative",
          zIndex: 2,
          alignItems: "center",
          justifyContent: "center"
        },
        state: {
          default: {
            height: 11,
            width: 11,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: Colors.basic.gray.drk,
            backgroundColor: Colors.basic.white.dft
          },
          completed: {
            height: 8,
            width: 8,
            backgroundColor: Colors.basic.independence.drk
          },
          active: {
            height: 24,
            width: 24,
            borderWidth: 6,
            borderStyle: "solid",
            borderColor: "rgba(32, 210, 146, 0.3)",
            backgroundColor: Colors.success.default
          }
        }
      },
      icon: {
        color: Colors.basic.white.dft,
        size: Typography.size.xtiny * 0.65
      },
      main: {
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        flex: 1
      },
      title: {
        state: {
          default: {
            fontFamily: Typography.family.semibold,
            fontSize: Typography.size.medium,
            lineHeight: Typography.lineheight.huge,
            color: Colors.basic.gray.drk
          },
          completed: {
            fontFamily: Typography.family.semibold,
            fontSize: Typography.size.medium,
            lineHeight: Typography.lineheight.huge,
            color: Colors.basic.independence.dft
          },
          active: {
            fontFamily: Typography.family.bold,
            fontSize: Typography.size.giant,
            lineHeight: Typography.lineheight.huge,
            color: Colors.basic.independence.drk
          }
        }
      },
      subtitle: {
        base: {
          fontFamily: Typography.family.regular,
          fontSize: Typography.size.xtiny,
          lineHeight: Typography.lineheight.xtiny,
          color: Colors.basic.gray.drk
        },
        state: {
          default: {},
          completed: {},
          active: {
            fontSize: Typography.size.small,
            lineHeight: Typography.lineheight.small
          }
        }
      }
    };
  }
}

PackenUiServiceStatusItem.propTypes = {
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  itemsHeights: PropTypes.arrayOf(PropTypes.number).isRequired,
  setItemsHeights: PropTypes.func.isRequired,
  currentStepIndex: PropTypes.number.isRequired,
  styling: PropTypes.object
};

export default PackenUiServiceStatusItem;