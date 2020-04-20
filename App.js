import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';

import UILibrary from "./app/UILibrary"
/* import StorybookUIRoot from "./storybook"; */

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <UILibrary/>
      </NavigationContainer>
    );
  }
}

/* export default StorybookUIRoot; */