import React, { Component, ReactNode } from "react";
import PropTypes from "prop-types";

import PackenUiText from "./PackenUiText";

/**
 * Imported SVG files for each Icon identifier/name
 * Uses @ts-ignore to prevent false-positives since the TypeScript compiler flags each import
 * as invalid because no actual module is exported from the .svg files themselves
 */
// @ts-ignore
import PackenLogoInverted from "../../assets/images/packen_logo_inverted.svg";
// @ts-ignore
import PackenIconVehicle from "../../assets/images/icon_packen_vehicle.svg";
// @ts-ignore
import PackenLogoMain from "../../assets/images/packen_logo_main.svg";
// @ts-ignore
import PackenWhatsApp from "../../assets/icons/whatsapp_logo.svg";
// @ts-ignore
import PackenWhatsAppInverted from "../../assets/icons/whatsapp_logo_inverted.svg";
// @ts-ignore
import PackenBackHandler from "../../assets/icons/back_arrow.svg";
// @ts-ignore
import PackenDocumentBack from "../../assets/icons/document_back_icon.svg";
// @ts-ignore
import PackenDocumentFile from "../../assets/icons/document_file_icon.svg";
// @ts-ignore
import PackenSwipe from "../../assets/icons/swipe.svg";
// @ts-ignore
import PackenDocumentFront from "../../assets/icons/document_front_icon.svg";
// @ts-ignore
import PackenNavigation from "../../assets/icons/navigation.svg";
// @ts-ignore
import PackenNavigationBlur from "../../assets/icons/navigation_blur.svg";
// @ts-ignore
import PackenShipments from "../../assets/icons/shipments.svg";
// @ts-ignore
import PackenShipmentsBlur from "../../assets/icons/shipments_blur.svg";
// @ts-ignore
import PackenMyShipments from "../../assets/icons/myshipments.svg";
// @ts-ignore
import PackenMyShipmentsBlur from "../../assets/icons/myshipments_blur.svg";
// @ts-ignore
import PackenSupport from "../../assets/icons/support.svg";
// @ts-ignore
import PackenSupportBlur from "../../assets/icons/support_blur.svg";
// @ts-ignore
import PackenProfile from "../../assets/icons/profile.svg";
// @ts-ignore
import PackenProfileBlur from "../../assets/icons/profile_blur.svg";

interface PackenUiSvgIconProps {
  name: string;
  width: number;
  height: number;
}

interface IconState {
  icons: object
}

/**
 * Inner, dynamically created, subcomponent for each imported SVG file
 * @type {function}
 * @param {number} width The width for the SVG
 * @param {number} height The height for the SVG
 * @param {string} name The predefined name of the SVG file to render
 * @return {node} JSX element for the SVG file
 */
class Icon extends Component<PackenUiSvgIconProps, IconState> {
  /**
   * Initializes the subcomponent
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props: PackenUiSvgIconProps) {
    super(props);
    const { width, height } = props;
    
    /**
     * Variable that stores the state
     * @type {object}
     * @property {object} icons Holds all the generated subcomponents for each SVG file
     */
    this.state = {
      icons: {
        "logo-inverted": <PackenLogoInverted width={width} height={height} />,
        "logo-main": <PackenLogoMain width={width} height={height} />,
        "icon-vehicle": <PackenIconVehicle width={width} height={height} />,
        "whatsapp": <PackenWhatsApp width={width} height={height} />,
        "whatsapp_inverted": <PackenWhatsAppInverted width={width} height={height} />,
        "backhandler": <PackenBackHandler width={width} height={height} />,
        "document_back": <PackenDocumentBack width={width} height={height} />,
        "document_front": <PackenDocumentFront width={width} height={height} />,
        "document_file": <PackenDocumentFile width={width} height={height} />,
        "swipe": <PackenSwipe width={width} height={height} />,
        /* Toolbar icons */
        "navigation": <PackenNavigation width={width} height={height} />,
        "navigation_blur": <PackenNavigationBlur width={width} height={height} />,
        "shipments": <PackenShipments width={width} height={height} />,
        "shipments_blur": <PackenShipmentsBlur width={width} height={height} />,
        "myshipments": <PackenMyShipments width={width} height={height} />,
        "myshipments_blur": <PackenMyShipmentsBlur width={width} height={height} />,
        "support": <PackenSupport width={width} height={height} />,
        "support_blur": <PackenSupportBlur width={width} height={height} />,
        "profile": <PackenProfile width={width} height={height} />,
        "profile_blur": <PackenProfileBlur width={width} height={height} />
      }
    }
  }

  /**
   * Renders the subcomponent
   * @type {function}
   * @return {node} JSX for the subcomponent
   */
  render(): ReactNode {
    return this.state.icons[this.props.name] || <PackenUiText>Icon not found.</PackenUiText>
  }

  /**
   * Defines prop-types for the subcomponent
   * @type {object}
   */
  static propTypes: object = {
    name: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  };
}

/**
 * Component for rendering a predefined SVG icon or image
 * @type {function}
 * @param {object} props Props passed to the component
 * @return {node} JSX for the component
 */
class PackenUiSvgIcon extends Component<PackenUiSvgIconProps> {
  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props: PackenUiSvgIconProps) {
    super(props);
  }

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render(): ReactNode {
    return <Icon {...this.props} />;
  }

  /**
   * Defines prop-types for the component
   * @type {object}
   */
  static propTypes: object = {
    name: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  };
}

export default PackenUiSvgIcon;