import { AppRegistry } from 'react-native';
import { getStorybookUI, configure } from '@storybook/react-native';

import './rn-addons';

// import stories
configure(() => {
  require("./stories/PackenUiAlert");
  require("./stories/PackenUiAvatar");
  require("./stories/PackenUiBadge");
  require("./stories/PackenUiButton");
  require("./stories/PackenUiCheckbox");
  require("./stories/PackenUiDivider");
  require("./stories/PackenUiDropdown");
  require("./stories/PackenUiHeader");
}, module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({});

// If you are using React Native vanilla and after installation you don't see your app name here, write it manually.
// If you use Expo you can safely remove this line.
AppRegistry.registerComponent('ui_library', () => StorybookUIRoot);

export default StorybookUIRoot;
