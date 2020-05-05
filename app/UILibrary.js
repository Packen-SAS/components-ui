import React, { Component } from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Buttons from "./views/Buttons";
import Avatars from "./views/Avatars";
import Dividers from "./views/Dividers";
import Tabs from "./views/Tabs";
import ServiceStatus from "./views/ServiceStatus";
import Radios from "./views/Radios";
import Toggles from "./views/Toggles";
import Checkboxes from "./views/Checkboxes";
import Modals from "./views/Modals";
import Inputs from "./views/Inputs";
import MapPins from "./views/MapPins";
import Dropdowns from "./views/Dropdowns";
import NotificationBanners from "./views/NotificationBanners";
import Radars from "./views/Radars";
import IconTexts from "./views/IconTexts";
import InfoActions from "./views/InfoActions";
import SelectionButtons from "./views/SelectionButtons";
import Progressbars from "./views/Progressbars";
import LoaderButtons from "./views/LoaderButtons";
import VehicleBoxes from "./views/VehicleBoxes";
import Lists from "./views/Lists";
import Alerts from "./views/Alerts";

const Drawer = createDrawerNavigator();

class UILibrary extends Component {
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Avatars">
          <Drawer.Screen name="Alerts" component={Alerts} />
          <Drawer.Screen name="Lists" component={Lists} />
          <Drawer.Screen name="VehicleBoxes" component={VehicleBoxes} />
          <Drawer.Screen name="LoaderButtons" component={LoaderButtons} />
          <Drawer.Screen name="Progressbars" component={Progressbars} />
          <Drawer.Screen name="SelectionButtons" component={SelectionButtons} />
          <Drawer.Screen name="InfoActions" component={InfoActions} />
          <Drawer.Screen name="IconTexts" component={IconTexts} />
          <Drawer.Screen name="Radars" component={Radars} />
          <Drawer.Screen name="NotificationBanners" component={NotificationBanners} />
          <Drawer.Screen name="ServiceStatus" component={ServiceStatus} />
          <Drawer.Screen name="MapPins" component={MapPins} />
          <Drawer.Screen name="Dropdowns" component={Dropdowns} />
          <Drawer.Screen name="Modals" component={Modals} />
          <Drawer.Screen name="Inputs" component={Inputs} />
          <Drawer.Screen name="Toggles" component={Toggles} />
          <Drawer.Screen name="Checkboxes" component={Checkboxes} />
          <Drawer.Screen name="Radios" component={Radios} />
          <Drawer.Screen name="Tabs" component={Tabs} />
          <Drawer.Screen name="Dividers" component={Dividers} />
          <Drawer.Screen name="Avatars" component={Avatars} />
          <Drawer.Screen name="Buttons" component={Buttons} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

export default UILibrary;