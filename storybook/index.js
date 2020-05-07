import { AppRegistry } from 'react-native';
import { getStorybookUI, configure } from '@storybook/react-native';

import './rn-addons';

configure(() => {
  require("./stories/PackenUiAlert.story");
  require("./stories/PackenUiAvatar.story");
  require("./stories/PackenUiBadge.story");
  require("./stories/PackenUiButton.story");
  require("./stories/PackenUiCheckbox.story");
  require("./stories/PackenUiDivider.story");
  require("./stories/PackenUiDropdown.story");
  require("./stories/PackenUiHeader.story");
  require("./stories/PackenUiIconText.story");
  require("./stories/PackenUiInfoAction.story");
  require("./stories/PackenUiInput.story");
  require("./stories/PackenUiList.story");
  require("./stories/PackenUiLoaderButton.story");
  require("./stories/PackenUiMapPin.story");
  require("./stories/PackenUiModal.story");
  require("./stories/PackenUiNotificationBanner.story");
  require("./stories/PackenUiProgressbar.story");
  require("./stories/PackenUiRadar.story");
  require("./stories/PackenUiRadio.story");
  require("./stories/PackenUiSelectionButtons.story");
  require("./stories/PackenUiServiceStatus.story");
  require("./stories/PackenUiTabs.story");
  require("./stories/PackenUiToggle.story");
  require("./stories/PackenUiVehicleBox.story");
}, module);

const StorybookUIRoot = getStorybookUI({});

AppRegistry.registerComponent("ui_library", () => StorybookUIRoot);

export default StorybookUIRoot;