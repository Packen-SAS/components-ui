import React from "react";
import PropTypes from "prop-types";

import PackenLogoInverted from "../../assets/images/packen_logo_inverted.svg";
import PackenIconVehicle from "../../assets/images/icon_packen_vehicle.svg";
import PackenLogoMain from "../../assets/images/packen_logo_main.svg";
import PackenWhatsApp from "../../assets/icons/whatsapp_logo.svg";
import PackenWhatsAppInverted from "../../assets/icons/whatsapp_logo_inverted.svg";
import PackenBackHandler from "../../assets/icons/back_arrow.svg";
import PackenDocumentBack from "../../assets/icons/document_back_icon.svg";
import PackenDocumentFile from "../../assets/icons/document_file_icon.svg";
import PackenSwipe from "../../assets/icons/swipe.svg";
import PackenDocumentFront from "../../assets/icons/document_front_icon.svg";
import PackenNavigation from "../../assets/icons/navigation.svg";
import PackenNavigationBlur from "../../assets/icons/navigation_blur.svg";
import PackenShipments from "../../assets/icons/shipments.svg";
import PackenShipmentsBlur from "../../assets/icons/shipments_blur.svg";
import PackenMyShipments from "../../assets/icons/myshipments.svg";
import PackenMyShipmentsBlur from "../../assets/icons/myshipments_blur.svg";
import PackenSupport from "../../assets/icons/support.svg";
import PackenSupportBlur from "../../assets/icons/support_blur.svg";
import PackenProfile from "../../assets/icons/profile.svg";
import PackenProfileBlur from "../../assets/icons/profile_blur.svg";

import PackenUiText from "./PackenUiText";

/**
 * Inner, dynamically created, subcomponent for each imported SVG file
 * @type {function}
 * @param {number} width The width for the SVG
 * @param {number} height The height for the SVG
 * @param {string} name The predefined name of the SVG file to render
 * @return {node} JSX element for the SVG file
 */
export const Icon = ({ width, height, name }) => {
  const icons = {
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
  };
  return icons[name] || <PackenUiText>Icon not found.</PackenUiText>
}

/**
 * Component for rendering a predefined SVG icon or image
 * @type {function}
 * @param {object} props Props passed to the component
 * @return {node} JSX for the component
 */
const PackenUiSvgIcon = props => {
  return <Icon {...props} />
}

PackenUiSvgIcon.propTypes = {
  name: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

export default PackenUiSvgIcon;