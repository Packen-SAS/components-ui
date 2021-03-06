import React, { Component, ReactNode } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import * as UTIL from "../utils";

import PackenUiListItem from "./PackenUiListItem";

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

interface DropdownStylingPropShape {
  wrapper: object;
  inputWrapper: object;
  contentSizer: {
    wrapper: object;
    inner: object;
    text: object;
  };
  menu: object;
  list: {
    wrapper: object;
    flatlist: object;
    item: object;
  };
  input: InputStylingPropShape;
}

interface ItemStylingPropShape {
  wrapper: object;
  media: object;
  main: object;
  sub: object;
  title: object;
  subtitle: object;
  dropdown: DropdownStylingPropShape;
  input: InputStylingPropShape;
  label: object;
  iconWrapper: object;
  iconSize: number | undefined;
  iconColor: string | undefined;
}

interface StylingPropShape {
  wrapper: object;
  inner: object;
  item: ItemStylingPropShape;
}

interface PackenUiListProps {
  items: object[];
  style?: object;
  styling?: StylingPropShape;
  instance?: Function;
}

interface PackenUiListState {
  items: object[];
  customWrapperStyles: object;
  styling: StylingPropShape;
}

type MapItemsType = (item: object, i: number) => ReactNode;

/**
 * Component for rendering a list (NOT a dropdown list)
 */
class PackenUiList extends Component<PackenUiListProps, PackenUiListState> {
  /**
   * Initializes the component
   * @param {object} props Props passed to the component
   */
  constructor(props: PackenUiListProps) {
    super(props);

    /**
     * Variable that stores the state
     * @type {object}
     */
    this.state = { ...this.setPropsToState() }
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
    * @property {object[]} [items=[]] The items for the list
    * @property {object} [customWrapperStyles={}] The optional custom styles specifically for the wrapper element
    * @property {object} [styling={ wrapper: {}, inner: {}, item: {} }] The optional custom styling props
    * @return {object} The props mapped to the state keys
    */
  setPropsToState: Function = (): PackenUiListState => {
    return {
      items: this.props.items ? [...this.props.items] : [],
      customWrapperStyles: this.props.style ? { ...this.props.style } : {},
      styling: this.props.styling ? { ...this.props.styling } : {
        wrapper: {},
        inner: {},
        item: {
          wrapper: {},
          media: {},
          main: {},
          sub: {},
          title: {},
          subtitle: {},
          dropdown: {
            wrapper: {},
            inputWrapper: {},
            contentSizer: {
              wrapper: {},
              inner: {},
              text: {},
            },
            menu: {},
            list: {
              wrapper: {},
              flatlist: {},
              item: {},
            },
            input: {
              header: {
                base: {},
                label: {},
              },
              help: {
                touchable: {},
                text: {},
              },
              box: {},
              input: {},
              message: {
                box: {},
                icon: {},
                iconSize: undefined,
                iconColor: undefined,
                text: {},
              },
              loader: {
                shape: {},
                shapeContent: {},
                label: {},
                iconWrapper: {},
                iconSize: undefined,
                iconColor: undefined,
              },
              iconWrapper: {},
              icon: {},
              iconSize: undefined,
              iconColor: undefined,
            },
          },
          input: {
            header: {
              base: {},
              label: {},
            },
            help: {
              touchable: {},
              text: {},
            },
            box: {},
            input: {},
            message: {
              box: {},
              icon: {},
              iconSize: undefined,
              iconColor: undefined,
              text: {},
            },
            loader: {
              shape: {},
              shapeContent: {},
              label: {},
              iconWrapper: {},
              iconSize: undefined,
              iconColor: undefined,
            },
            iconWrapper: {},
            icon: {},
            iconSize: undefined,
            iconColor: undefined,
          },
          label: {},
          iconWrapper: {},
          iconSize: undefined,
          iconColor: undefined,
        }
      }
    }
  }

  /**
   * Returns a {@link PackenUiListItem} component for each element
   * @type {function}
   * @param {object} item The configuration object for this item
   * @param {number} i The index of this item
   * @return {node} JSX for this item
   */
  mapItems: MapItemsType = (item: object, i: number): ReactNode => (
    <View style={{ zIndex: this.state.items.length - i, ...this.state.styling.inner }}>
      <PackenUiListItem data={item} key={i} styling={this.state.styling.item} />
    </View>
  )

  /**
   * Updates the state with new props
   * @type {function}
   */
  updateState: Function = () => {
    this.setState({ ...this.setPropsToState() });
  }

  /**
   * Compares props to determine if the component should update its state with new props
   * @type {function}
   * @param {object} prevProps Previous props
   */
  componentDidUpdate(prevProps: PackenUiListProps) {
    if (!UTIL.objectsEqual(prevProps, this.props)) {
      this.updateState();
    }
  }

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render(): ReactNode {
    return (
      <View style={{
        ...this.getStyles().wrapper,
        ...this.state.customWrapperStyles,
        ...this.state.styling.wrapper
      }}>
        {this.state.items.map(this.mapItems)}
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
      wrapper: {
        flex: 1,
        width: "100%"
      }
    };
  }

  /**
   * Defines prop-types for the component
   * @type {object}
   */
  static propTypes: object = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    customWrapperStyles: PropTypes.object,
    style: PropTypes.object,
    styling: PropTypes.object,
    instance: PropTypes.func
  };
}

export default PackenUiList;