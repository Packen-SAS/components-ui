import React from "react";

import PackenLogoInverted from "../../assets/images/packen_logo_inverted.svg";
import PackenIconVehicle from "../../assets/images/icon_packen_vehicle.svg";
import PackenLogoMain from "../../assets/images/packen_logo_main.svg";
import PackenWhatsApp from "../../assets/icons/whatsapp_logo.svg";
import PackenWhatsAppInverted from "../../assets/icons/whatsapp_logo_inverted.svg";
import PackenBackHandler from "../../assets/icons/back_arrow.svg";
import PackenDocumentBack from "../../assets/icons/document_back_icon.svg";
import PackenDocumentFile from "../../assets/icons/document_file_icon.svg";
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

const Icon = ({ width, heigth, name }) => {
  const icons = {
    "logo-inverted": <PackenLogoInverted width={width} heigth={heigth} />,
    "logo-main": <PackenLogoMain width={width} heigth={heigth} />,
    "icon-vehicle": <PackenIconVehicle width={width} heigth={heigth} />,
    "whatsapp": <PackenWhatsApp width={width} heigth={heigth} />,
    "whatsapp_inverted": <PackenWhatsAppInverted width={width} heigth={heigth} />,
    "backhandler": <PackenBackHandler width={width} heigth={heigth} />,
    "document_back": <PackenDocumentBack width={width} heigth={heigth} />,
    "document_front": <PackenDocumentFront width={width} heigth={heigth} />,
    "document_file": <PackenDocumentFile width={width} heigth={heigth} />,
    /* Toolbar icons */
    "navigation": <PackenNavigation width={width} heigth={heigth} />,
    "navigation_blur": <PackenNavigationBlur width={width} heigth={heigth} />,
    "shipments": <PackenShipments width={width} heigth={heigth} />,
    "shipments_blur": <PackenShipmentsBlur width={width} heigth={heigth} />,
    "myshipments": <PackenMyShipments width={width} heigth={heigth} />,
    "myshipments_blur": <PackenMyShipmentsBlur width={width} heigth={heigth} />,
    "support": <PackenSupport width={width} heigth={heigth} />,
    "support_blur": <PackenSupportBlur width={width} heigth={heigth} />,
    "myshipments": <PackenMyShipments width={width} heigth={heigth} />,
    "myshipments_blur": <PackenMyShipmentsBlur width={width} heigth={heigth} />,
    "profile": <PackenProfile width={width} heigth={heigth} />,
    "profile_blur": <PackenProfileBlur width={width} heigth={heigth} />
  };
  return icons[name] || <PackenUiText>Icon not found.</PackenUiText>
}

const PackenUiSvgIcon = props => {
  return <Icon {...props} />
}

export default PackenUiSvgIcon;