import React, { Component, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import IconFa from 'react-native-vector-icons/FontAwesome';
import IconMci from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../styles/abstracts/colors';
import * as UTIL from '../utils';

import PackenUiText from './PackenUiText';

interface StylingPropShape {
  box?: object;
  iconSize?: number | null;
  iconColor?: string | null;
  copy?: object;
  label?: object;
  title?: object;
}

interface PackenUiIconInfoProps {
  icon: string;
  label?: string;
  title?: string;
  iconSet?: string;
  disabled?: boolean;
  children?: ReactNode;
  styling?: StylingPropShape
}

interface PackenUiIconInfoState {
  icon: string;
  label: string;
  title: string;
  iconSet: string;
  disabled: boolean;
  children: ReactNode | null;
  styling: StylingPropShape
}

/**
 * Component for rendering an icon with either default elements or custom content to its right
 */
class PackenUiIconInfo extends Component<PackenUiIconInfoProps, PackenUiIconInfoState> {
  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props: PackenUiIconInfoProps) {
    super(props);

    /**
     * Variable that stores the state
     * @type {object}
     */
    this.state = { ...this.setPropsToState() };
  }

  /**
   * Centralizes the received props assignment to set them to the state, determining default values in case any is not provided
   * @type {function}
   * @property {string} [icon="box"] The icon name to render
   * @property {string} [label=""] The text for the default label element
   * @property {string} [title=""] The text for the default title element
   * @property {string} [iconSet="FTR"] The icon set to use (Feather, MaterialCommunityIcons, FontAwesome) - "FTR"; "MCI"; "FA"
   * @property {node} [children=null] The optional custom content to render instead of the default elements
   * @property {object} [styling={ box: {}, iconSize: null, iconColor: null, copy: {}, label: {}, title: {} ] The optional custom styling props
   * @return {object} The props mapped to the state keys
   */
  setPropsToState: Function = (): PackenUiIconInfoState => ({
    icon: this.props.icon || 'box',
    label: this.props.label || '',
    title: this.props.title || '',
    iconSet: this.props.iconSet || 'FTR',
    children: this.props.children || null,
    disabled: this.props.disabled || false,
    styling: this.props.styling ? { ...this.props.styling } : {
      box: {},
      iconSize: null,
      iconColor: null,
      copy: {},
      label: {},
      title: {}
    }
  });

  /**
   * Returns the icon element
   * @type {Function}
   * @return {node}
   */
  getIcon: Function = (): ReactNode => {
    const props = {
      name: this.state.icon,
      size: this.state.styling.iconSize || 18,
      color: this.state.styling.iconColor || Colors.brand.primary.drk
    };
    switch (this.state.iconSet.toUpperCase()) {
      case 'FA':
        return (
          <IconFa {...props} />
        );
      case 'MCI':
        return (
          <IconMci {...props} size={25} />
        );
      case 'FTR':
      default:
        return (
          <Icon {...props} />
        );
    }
  }

  /**
   * Returns the disabled styles for the component
   * @type {Function}
   * @return {object}
   */
  getDisabledStyles: Function = (): object => {
    if (!this.state.disabled) { return {}; }
    return { opacity: 0.35 };
  }

  /**
   * Returns the main content elements (default or custom)
   * @type {Function}
   * @return {node}
   */
  getContent: Function = (): ReactNode => {
    if (this.state.children) { return this.state.children; }
    return (
      <>
        <PackenUiText
          preset="c1"
          style={{
            ...this.getStyles().label,
            ...this.state.styling.label
          }}
        >
          {this.state.label}
        </PackenUiText>
        <PackenUiText
          preset="p1"
          style={{
            ...this.getStyles().title,
            ...this.state.styling.title
          }}
        >
          {this.state.title}
        </PackenUiText>
      </>
    );
  }

  /**
   * Compares props to determine if the component should update its state with new props
   * @type {function}
   * @param {object} prevProps Previous props
   */
  componentDidUpdate(prevProps: PackenUiIconInfoProps) {
    if (!UTIL.objectsEqual(prevProps, this.props)) {
      this.setState({ ...this.setPropsToState() });
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
        ...this.getStyles().box,
        ...this.state.styling.box,
        ...this.getDisabledStyles()
      }}
      >
        {this.getIcon()}
        <View style={{
          ...this.getStyles().copy,
          ...this.state.styling.copy
        }}
        >
          {this.getContent()}
        </View>
      </View>
    );
  }

  /**
   * Returns the styles object
   * @type {function}
   * @return {object} The styles object
   */
  getStyles: Function = (): object => ({
    box: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    copy: {
      paddingLeft: 8
    },
    label: {
      color: Colors.basic.independence.dft
    },
    title: {
      color: Colors.basic.independence.dft
    }
  });

  /**
   * Defines prop-types for the component
   * @type {object}
   */
  static propTypes: object = {
    icon: PropTypes.string.isRequired,
    label: PropTypes.string,
    title: PropTypes.string.isRequired,
    iconSet: PropTypes.oneOf(['FTR', 'FA', 'MCI']),
    disabled: PropTypes.bool,
    styling: PropTypes.object
  };
}

export default PackenUiIconInfo;