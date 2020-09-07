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

class PackenUiIconInfo extends Component<PackenUiIconInfoProps, PackenUiIconInfoState> {
  constructor(props: PackenUiIconInfoProps) {
    super(props);
    this.state = { ...this.setPropsToState() };
  }

  setPropsToState = () => ({
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

  getIcon = () => {
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

  getDisabledStyles = () => {
    if (!this.state.disabled) { return {}; }
    return { opacity: 0.35 };
  }

  getContent = () => {
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

  componentDidUpdate(prevProps: PackenUiIconInfoProps) {
    if (!UTIL.objectsEqual(prevProps, this.props)) {
      this.setState({ ...this.setPropsToState() });
    }
  }

  render() {
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