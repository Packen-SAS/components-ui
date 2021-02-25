import { View, TouchableNativeFeedback, Image, Platform, PixelRatio } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import React, { Component } from "react";

import PackenUiMapPin from "../components/PackenUiMapPin";
import GeocodingService from "../modules/geocoding";
import PackenUiMapStyle from "../styles/map/style";
import shadows from "../styles/abstracts/shadows";
import colors from "../styles/abstracts/colors";
import * as UTIL from "../modules/utils";
import MapView from "react-native-maps"
import i18n from "../modules/i18n";
import consts from "../constants";

export default class PackenUiMap extends Component {
  constructor(props) {
    super(props);

    this.map = null;
    this.language = i18n();
    this.userMarker = null;
    this.serviceStatusRef = null;
    this.data = { ...this.props.shipment };
    this.onToggleMaximize = this.props.onToggleMaximize || this.ignoreAction;
    this.onNavigationBtnPress = this.props.onNavigationBtnPress || this.ignoreAction;

    this.state = {
      map: {
        isMaximized: false,
        btnIcon: "maximize-2",
        region: {
          latitude: parseFloat(this.data.pickup_origin.location_data.latitude) || 4.598481,
          longitude: parseFloat(this.data.pickup_origin.location_data.longitude) || -74.0765482,
          latitudeDelta: 0.025,
          longitudeDelta: 0.025
        },
        markers: this.getMarkersData(),
        markersDimensions: []
      }
    };
  }

  componentDidUpdate(prevProps) {
    if (!UTIL.objectsEqual(prevProps.currentUserLocation, this.props.currentUserLocation)) {
      this.forceUpdate();
    }
  }

  addMarker = (marker) => {
    const { latitude, longitude, address } = marker;
    const updatedMarkers = [...this.state.map.markers];
    updatedMarkers.push({ id: updatedMarkers.length, latitude, longitude, address });
    const updateState = (prevState) => ({
      map: {
        ...prevState.map,
        markers: updatedMarkers
      }
    });
    this.setState(updateState);
    return updateState;
  }

  ignoreAction = () => true;

  maximizeMap = () => {
    const newState = !this.state.map.isMaximized;
    const newIcon = newState ? "minimize-2" : "maximize-2";
    const updateState = (prevState) => ({
      map: { ...prevState.map, isMaximized: newState, btnIcon: newIcon }
    });
    this.setState(updateState);
    this.centerMarkers();
    const timeout = setTimeout(() => {
      this.onToggleMaximize(newState);
      clearTimeout(timeout);
    }, 250);
    return updateState;
  }

  centerMarkers = () => {
    if (this.map) {
      const timeout = setTimeout(() => {
        const markersIds = this.state.map.markers.map((item) => item.id.toString());
        this.map.fitToSuppliedMarkers(markersIds, {
          edgePadding: { top: 100, right: 200, bottom: 0, left: 0 }
        });
        clearTimeout(timeout);
      }, 500);
    }
  }

  getMapRef = (map) => { this.map = map; }

  getUserMarkerRef = (marker) => { this.userMarker = marker; }

  onMapReady = () => { this.centerMarkers(); }

  getAddressFromCoords = async (lat, lng) => {
    const res = await GeocodingService({
      lat: parseFloat(lat), lng: parseFloat(lng)
    });
    return typeof res === "string" ? res : "Invalid address";
  }

  getMarkersData = () => {
    const markers = [{
      id: 0, // First marker is always origin
      latitude: this.data.pickup_origin.location_data.latitude,
      longitude: this.data.pickup_origin.location_data.longitude
    }];
    if (this.data.all_day && this.data.shipment_locations.length > 0) {
      this.data.shipment_locations.forEach(async (item, i) => {
        const address = await this.getAddressFromCoords(item.latitude, item.longitude);
        markers.push({ id: i + 1, latitude: item.latitude, longitude: item.longitude, address });
      });
    } else {
      this.data.deliveries.forEach((item, i) => {
        const { latitude, longitude } = item.to_contact.location_data;
        if (latitude && longitude) {
          markers.push({ id: i + 1, latitude, longitude });
        }
      });
    }
    return markers;
  }

  getMarkersDimensions = (e) => {
    const markersDimensions = [...this.state.map.markersDimensions, { ...e.nativeEvent.layout }];
    const updateState = (prevState) => ({
      map: {
        ...prevState.map,
        markersDimensions
      }
    });
    this.setState(updateState);
    return updateState;
  }

  getMarkersRender = () => {
    const markers = [];
    this.state.map.markers.forEach((item, i) => {
      const { latitude, longitude, id } = item;
      const markerDimensions = this.state.map.markersDimensions[i];
      // 24 comes from PackenUiMapPin styles
      const horizontalOffset = markerDimensions ? 24 / markerDimensions.width : 0;
      let config = {
        type: "info",
        dotPosition: "bottom"
      };
      if (i === 0) {
        config = {
          ...config,
          theme: "primary",
          sub: { icon: "package", position: "left" },
          main: { label: `${this.language.shipment.origin.toUpperCase()}:`, text: UTIL.toCapitalCase(this.data.pickup_origin.address_1) }
        };
      } else {
        let text = "";
        if (this.data.all_day) {
          text = item.address;
        } else {
          text = UTIL.toCapitalCase(this.data.deliveries[i - 1].to_contact.address_1);
        }
        config = {
          ...config,
          theme: "white",
          sub: { character: UTIL.num2ltr(i), position: "left" },
          main: { text }
        };
      }
      const key = i;
      markers.push((
        <MapView.Marker
          key={key}
          tracksViewChanges={false}
          identifier={id.toString()}
          anchor={{ x: horizontalOffset, y: 1 }}
          coordinate={{ latitude: parseFloat(latitude), longitude: parseFloat(longitude) }}
        >
          <View onLayout={this.getMarkersDimensions}>
            <PackenUiMapPin {...config} />
          </View>
        </MapView.Marker>
      ));
    });
    return markers;
  }

  getPolylineRender = () => {
    // Get all markers coordinates
    const allCoords = [];
    this.state.map.markers.forEach((item) => {
      allCoords.push({
        latitude: parseFloat(item.latitude),
        longitude: parseFloat(item.longitude)
      });
    });

    // Divide coordinates into pairs, e.g. A -> B -> C gets transformed into A -> B then B -> C
    const interpolatedCoords = [];
    const interpolatedPairSegments = [];
    const allCoordsByPairs = allCoords.map((point, i) => [{ ...point }, { ...allCoords[i + 1] }]);
    allCoordsByPairs[allCoordsByPairs.length - 1][1] = allCoords[allCoords.length - 1];

    // Interpolate each pair of points, creating a quadratic bÃ©zier curve
    allCoordsByPairs.forEach((pair) => {
      const interpolatedSegment = UTIL.getCurveCoordsBetween2Points(pair);
      interpolatedPairSegments.push(interpolatedSegment);
    });

    // Join all pairs into a single coordinates array again to draw on map
    interpolatedPairSegments.forEach((pairSegment) => {
      pairSegment.forEach((point) => {
        interpolatedCoords.push(point);
      });
    });

    return (
      <MapView.Polyline
        strokeWidth={2}
        coordinates={interpolatedCoords}
        strokeColor={colors.brand.secondary.dft}
      />
    );
  }

  getUserRender = () => {
    if (!this.props.currentUserLocation) { return null; }
    const { latitude, longitude } = this.props.currentUserLocation;
    return (
      <MapView.Marker
        ref={this.getUserMarkerRef}
        coordinate={{
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude)
        }}
      >
        <View
          style={{
            padding: 10,
            transform: [
              { scale: 0.8 },
              { rotateZ: `${this.props.heading || 0}deg` }
            ]
          }}
        >
          <Image
            source={require("../assets/icons/carry.png")}
          />
        </View>
      </MapView.Marker>
    );
  }

  getNavigationBtn = () => {
    if (!this.props.showNavigationBtn) { return null; }
    return (
      <View style={this.getStyles().mapBtn.touchable}>
        <TouchableNativeFeedback onPress={this.onNavigationBtnPress}>
          <View style={this.getStyles().mapBtn.inner}>
            <Icon name="navigation-2" color={colors.basic.independence.dft} size={20} />
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }

  getMapPadding = () => {
    if (Platform.OS === consts.PLATFORM.ANDROID) {
      return { top: PixelRatio.getPixelSizeForLayoutSize(10000) };
    }
    return undefined;
  }

  appendMarkers = (newMarkers) => {
    const updateState = (prevState) => ({
      markers: [...prevState.markers, ...newMarkers]
    });
    this.setState(updateState);
    return updateState;
  }

  render() {
    return (
      <View style={this.getStyles().map}>
        <MapView
          provider="google"
          ref={this.getMapRef}
          style={this.getStyles().map}
          onMapReady={this.onMapReady}
          customMapStyle={PackenUiMapStyle}
          mapPadding={this.getMapPadding()}
          initialRegion={this.state.map.region}
        >
          {this.getMarkersRender()}
          {this.getPolylineRender()}
          {this.getUserRender()}
        </MapView>
        <View style={this.getStyles().mapBtns}>
          {this.getNavigationBtn()}
          <View style={this.getStyles().mapBtn.touchable}>
            <TouchableNativeFeedback onPress={this.centerMarkers}>
              <View style={this.getStyles().mapBtn.inner}>
                <Icon name="map-pin" color={colors.basic.independence.dft} size={20} />
              </View>
            </TouchableNativeFeedback>
          </View>
          <View style={this.getStyles().mapBtn.touchable}>
            <TouchableNativeFeedback onPress={this.maximizeMap}>
              <View style={this.getStyles().mapBtn.inner}>
                <Icon name={this.state.map.btnIcon} color={colors.basic.independence.dft} size={20} />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    );
  }

  getStyles = () => ({
    map: {
      flex: 1,
      minHeight: 100
    },
    mapBtns: {
      right: 15,
      bottom: 20,
      position: "absolute",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end"
    },
    mapBtn: {
      touchable: {
        paddingHorizontal: 5
      },
      inner: {
        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.basic.white.dft,
        ...shadows.sm
      }
    }
  });
}