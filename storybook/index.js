import { AppRegistry } from 'react-native';
import { getStorybookUI, configure } from '@storybook/react-native';

import './rn-addons';

configure(() => {
  require("./stories/PackenUiAlert");
  require("./stories/PackenUiAvatar");
  require("./stories/PackenUiBadge");
  require("./stories/PackenUiButton");
  require("./stories/PackenUiCheckbox");
  require("./stories/PackenUiDivider");
  require("./stories/PackenUiDropdown");
  require("./stories/PackenUiHeader");
  require("./stories/PackenUiIconText");
  require("./stories/PackenUiInfoAction");
  require("./stories/PackenUiInput");
  require("./stories/PackenUiList");
  require("./stories/PackenUiLoaderButton");
  require("./stories/PackenUiMapPin");
  require("./stories/PackenUiModal");
  require("./stories/PackenUiNotificationBanner");
  require("./stories/PackenUiProgressbar");
  require("./stories/PackenUiRadar");
  require("./stories/PackenUiRadio");
  require("./stories/PackenUiSelectionButtons");
  require("./stories/PackenUiServiceStatus");
  require("./stories/PackenUiTabs");
  require("./stories/PackenUiToggle");
  require("./stories/PackenUiVehicleBox");
}, module);

const StorybookUIRoot = getStorybookUI({});

AppRegistry.registerComponent("ui_library", () => StorybookUIRoot);

export default StorybookUIRoot;