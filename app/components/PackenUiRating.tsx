import { View, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import React, { Component, ReactNode } from "react";

import colors from "../styles/abstracts/colors";

interface PackenUiRatingProps {
  config: ConfigShape;
  onRating: Function;
}

interface ConfigShape {
  stars: number;
  defaultRating: number;
  readonly: boolean;
  size: number;
}

interface PackenUiRatingState {
  stars: StarShape[]
}

interface StarShape {
  id: number;
  rated: boolean;
}

type StarsMappedType = (star: StarShape) => ReactNode;

/**
 * Component for rendering an array of stars to be used as a rating score
 */
class PackenUiRating extends Component<PackenUiRatingProps, PackenUiRatingState> {
  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props: PackenUiRatingProps) {
    super(props);

    /**
     * Variable that stores the state
     * @type {object}
     * @property {object[]} [stars=[]] The stars data array
     */
    this.state = {
      stars: []
    }
  }

  /**
   * Sets initial stars state based on the provided configuration
   * @type {Function}
   */
  componentWillMount() {
    const { config } = this.props;
    const stars = [];
    for (let i = 0; i < config.stars; i++) {
      stars.push({
        id: i + 1,
        rated: (i < config.defaultRating)
      });
    }
    this.setState({ stars });
  }

  /**
   * Updates the visual representation of active stars depending on the rating provided, and propagates it to the parent component
   * @type {Function}
   * @param {number} rate The new rating score to set
   */
  handleRating: Function = (rate: number) => {
    const { config, onRating } = this.props;
    const stars = [];
    for (let i = 0; i < config.stars; i++) {
      stars.push({
        id: i + 1,
        rated: ((i + 1) <= rate)
      });
    }
    this.setState({ stars });
    onRating(rate);
  }

  /**
   * Renders each star icon appropriately depending on the current score
   * @type {Function}
   * @param {object} star The current star data object being mapped
   * @return {node} JSX for the icon
   */
  starsMapped: StarsMappedType = (star: StarShape): ReactNode => (
    <TouchableWithoutFeedback
      key={star.id}
      onPress={() => { this.handleRating(star.id); }}
    >
      <View style={{ marginHorizontal: 4 }}>
        <Icon
          size={this.props.config.size || 35}
          name={(star.rated ? "star" : "staro")}
          color={(star.rated ? colors.warning.default : colors.basic.independence.dft)}
        />
      </View>
    </TouchableWithoutFeedback>
  )

  /**
   * Renders a static array of stars when readonly is set
   * @type {Function}
   * @return {node} JSX for the stars
   */
  starsReadonly: Function = (): ReactNode => {
    const { config } = this.props;
    const stars = [];
    for (let i = 0; i < config.stars; i++) {
      stars.push(
        <Icon
          key={i}
          size={config.size || 35}
          name={((config.defaultRating <= i) ? "staro" : "star")}
          color={(this.state.stars[i].rated ? colors.warning.default : colors.basic.independence.dft)}
        />
      );
    }
    return (
      <View style={this.getStyles().container}>
        {stars}
      </View>
    );
  }

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render(): ReactNode {
    const { config } = this.props;
    if (("readonly" in config)
      && (config.readonly === true)) {
      return this.starsReadonly();
    }
    return (
      <View style={this.getStyles().container}>
        {this.state.stars.map(this.starsMapped)}
      </View>
    );
  }

  /**
   * Returns the current styles object
   * @type {function}
   * @return {object} The current styles object
   */
  getStyles: Function = (): object => ({
    container: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    }
  })
}

export default PackenUiRating;