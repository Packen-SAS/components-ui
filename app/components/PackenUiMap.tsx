import { View, TouchableNativeFeedback, Image, Platform, PixelRatio, LayoutChangeEvent, GestureResponderEvent, ImageSourcePropType } from "react-native";
import React, { Component, createRef, LegacyRef, ReactNode } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import Icon from "react-native-vector-icons/Feather";

import PackenUiMapPin from "../components/PackenUiMapPin";
import PackenUiMapStyle from "../styles/map/style";
import shadows from "../styles/abstracts/shadows";
import colors from "../styles/abstracts/colors";
import * as UTIL from "../utils";

interface StateMapRegionShape {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface StateMapShape {
  isMaximized: boolean;
  btnIcon: string;
  region: StateMapRegionShape;
  markers: MarkerShape[];
  markersDimensions: MarkerDimensionShape[];
}

interface MarkerDimensionShape {
  width: number;
}

interface MarkerShape {
  id: number;
  latitude: string;
  longitude: string;
  address?: string;
}

interface ShipmentLocationShape {
  latitude: string;
  longitude: string;
}

interface DeliveryShape {
  to_contact: {
    address_1: string;
    location_data: {
      latitude: string;
      longitude: string;
    }
  }
}

interface ShipmentShape {
  all_day: boolean;
  shipment_locations: ShipmentLocationShape[];
  deliveries: DeliveryShape[];
  pickup_origin: {
    address_1: string;
    location_data: {
      latitude: string;
      longitude: string;
    }
  }
}

interface GenericLocationShape {
  latitude: number;
  longitude: number;
}

interface CurrentUserLocationShape {
  latitude: string;
  longitude: string;
}

interface PackenUiMapProps {
  shipment: ShipmentShape;
  onToggleMaximize: Function;
  onNavigationBtnPress: VoidFunction;
  currentUserLocation: CurrentUserLocationShape;
  onFinishRendering?: Function;
  heading: number;
  showNavigationBtn: boolean;
  GeocodingService: Function;
  userIcon: ImageSourcePropType;
}

interface PackenUiMapState {
  map: StateMapShape
}

interface I18nShape {
  shipment: {
    origin: string;
  }
}

/**
 * Component for rendering a map
 */
export default class PackenUiMap extends Component<PackenUiMapProps, PackenUiMapState> {
  /**
   * Variable that holds the MapView component reference
   * @type {object}
   */
  map: LegacyRef<MapView> | undefined = createRef();

  /**
   * Variable that holds the function to be called when zoom in/out button is pressed
   * @type {function|null}
   */
  onToggleMaximize: null | Function = null;

  /**
   Variable that holds the function to be called when navigation button is pressed
   * @type {Function|null}
   */
  onNavigationBtnPress: ((event: GestureResponderEvent) => void) | undefined = undefined;

  /**
   * Variable that holds the passed shipment data
   * @type {object}
   */
  data: ShipmentShape = { ...this.props.shipment };

  /**
   * Variable that holds the language labels
   * @type {object}
   */
  language: I18nShape = { shipment: { origin: "Origen" } };

  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props: PackenUiMapProps) {
    super(props);

    this.onToggleMaximize = this.props.onToggleMaximize || this.ignoreAction;
    this.onNavigationBtnPress = this.props.onNavigationBtnPress || this.ignoreAction;

    /**
     * Variable that stores the state
     * @type {object}
     */
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
        markers: [],
        markersDimensions: []
      }
    };
  }

  /**
   * Displays markers on mount
   * @type {function}
   */
  componentDidMount: VoidFunction = () => {
    this.displayMarkers();
  }

  /**
   * Compares props to determine if the component should update
   * @type {function}
   * @param prevProps Previous props
   */
  componentDidUpdate(prevProps: PackenUiMapProps): void {
    if (!UTIL.objectsEqual(prevProps.currentUserLocation, this.props.currentUserLocation)) {
      this.forceUpdate();
    }
  }

  /**
   * Updates state with markers to be rendered
   * @type {function}
   */
  displayMarkers: VoidFunction = async () => {
    const markers = await this.getMarkersData();
    this.setState({
      map: {
        ...this.state.map,
        markers
      }
    }, this.onFinishRendering);
  }

  /**
   * Centers markers and triggers optional callback function when map finishes rendering markers
   * @type {function}
   */
  onFinishRendering: VoidFunction = () => {
    this.centerMarkers();
    if (typeof this.props.onFinishRendering === "function") {
      this.props.onFinishRendering();
    }
  }

  /**
   * Programmatically creates a new marker
   * @type {function}
   * @param {object} marker The marker data (latitude, longitude, address) to be rendered
   */
  addMarker: Function = (marker: MarkerShape): Function => {
    const { latitude, longitude, address } = marker;
    const updatedMarkers = [...this.state.map.markers];
    updatedMarkers.push({ id: updatedMarkers.length, latitude, longitude, address });
    const updateState = (prevState: PackenUiMapState) => ({
      map: {
        ...prevState.map,
        markers: updatedMarkers
      }
    });
    this.setState(updateState);
    return updateState;
  }

  /**
   * Placeholder function that does nothing
   * @type {function}
   * @return {true} The static boolean value returned
   */
  ignoreAction: Function = (): true => true;

  /**
   * Toggles map zoom in/out
   * @type {function}
   */
  maximizeMap: VoidFunction = (): Function => {
    const newState = !this.state.map.isMaximized;
    const newIcon = newState ? "minimize-2" : "maximize-2";
    const updateState = (prevState: PackenUiMapState) => ({
      map: { ...prevState.map, isMaximized: newState, btnIcon: newIcon }
    });
    this.setState(updateState);
    this.centerMarkers();
    const timeout = setTimeout(() => {
      if (typeof this.onToggleMaximize === "function") { this.onToggleMaximize(newState); }
      clearTimeout(timeout);
    }, 250);
    return updateState;
  }

  /**
   * Centers markers
   * @type {function}
   */
  centerMarkers: VoidFunction = () => {
    if (this.map) {
      const timeout = setTimeout(() => {
        const markersIds = this.state.map.markers.map((item) => item.id.toString());
        if (this.props.currentUserLocation && this.props.userIcon) { markersIds.push("driver"); }
        const edgePadding = Platform.OS === "android"
          ? { top: 100, right: 200, bottom: 0, left: 0 }
          : { top: 50, right: 100, bottom: 15, left: 15 }
        if (this.map && typeof this.map === "object" && this.map.current) {
          this.map.current.fitToSuppliedMarkers(markersIds, { edgePadding });
        }
        clearTimeout(timeout);
      }, 500);
    }
  }

  /**
   * Centers markers when native map callback is triggered
   * @type {function}
   */
  onMapReady: VoidFunction = () => { this.centerMarkers(); }

  /**
   * Decodes a latitude, longitude coordinate into an address
   * @type {function}
   * @param lat latitude
   * @param lng longitude
   * @return {Promise<string>} The decoded address
   */
  getAddressFromCoords: Function = async (lat: string, lng: string): Promise<string> => {
    const res = await this.props.GeocodingService({
      lat: parseFloat(lat), lng: parseFloat(lng)
    });
    return typeof res === "string" ? res : "Invalid address";
  }

  /**
   * Maps each marker to a predefined schema to be rendered
   * @type {function}
   * @return {Promise<object[]>} The markers data array
   */
  getMarkersData: Function = async (): Promise<MarkerShape[]> => {
    const markers: MarkerShape[] = [{
      id: 0, // First marker is always origin
      latitude: this.data.pickup_origin.location_data.latitude,
      longitude: this.data.pickup_origin.location_data.longitude
    }];
    if (this.data.all_day && this.data.shipment_locations.length > 0) {
      for (const [i, item] of this.data.shipment_locations.entries()) {
        const address = await this.getAddressFromCoords(item.latitude, item.longitude);
        markers.push({ id: i + 1, latitude: item.latitude, longitude: item.longitude, address });
      }
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

  /**
   * Receives the dimensions of a rendered marker and saves it to the state
   * @type {function}
   * @param e The event data object
   * @param i The marker index
   */
  getMarkersDimensions: Function = (e: LayoutChangeEvent, i: number): Function => {
    const markersDimensions = [...this.state.map.markersDimensions];
    markersDimensions[i] = { ...e.nativeEvent.layout };
    const updateState = (prevState: PackenUiMapState) => ({
      map: {
        ...prevState.map,
        markersDimensions
      }
    });
    this.setState(updateState);
    return updateState;
  }

  /**
   * Returns the actual JSX array of markers to be rendered
   * @type {function}
   * @return {node[]} JSX array to be rendered
   */
  getMarkersRender: Function = (): ReactNode[] => {
    const markers: ReactNode[] = [];
    this.state.map.markers.forEach((item, i) => {
      const { latitude, longitude, id } = item;
      const markerDimensions = this.state.map.markersDimensions[i];
      // 24 comes from PackenUiMapPin styles
      const horizontalOffset = markerDimensions ? 24 / markerDimensions.width : 0;
      let config = {};
      if (i === 0) {
        config = {
          theme: "primary",
          sub: { icon: "package", position: "left" },
          main: { label: `${this.language.shipment.origin.toUpperCase()}:`, text: UTIL.toCapitalCase(this.data.pickup_origin.address_1) }
        };
      } else {
        let text = "";
        if (this.data.all_day && item.address) {
          text = item.address;
        } else {
          text = UTIL.toCapitalCase(this.data.deliveries[i - 1].to_contact.address_1);
        }
        config = {
          theme: "white",
          sub: { character: UTIL.num2ltr(i), position: "left" },
          main: { text }
        };
      }
      const key = i;
      markers.push((
        <Marker
          key={key}
          tracksViewChanges={false}
          identifier={id.toString()}
          anchor={{ x: horizontalOffset, y: 1 }}
          coordinate={{ latitude: parseFloat(latitude), longitude: parseFloat(longitude) }}
        >
          <View onLayout={(e) => { this.getMarkersDimensions(e, i); }}>
            <PackenUiMapPin type="info" dotPosition="bottom" {...config} />
          </View>
        </Marker>
      ));
    });
    return markers;
  }

  /**
   * Calculates and creates an interpolated polyline between markers
   * @type {function}
   * @return {node} Polyline component to be rendered
   */
  getPolylineRender: Function = (): ReactNode => {
    // Get all markers coordinates
    const allCoords: GenericLocationShape[] = [];
    this.state.map.markers.forEach((item) => {
      allCoords.push({
        latitude: parseFloat(item.latitude),
        longitude: parseFloat(item.longitude)
      });
    });

    // Divide coordinates into pairs, e.g. A -> B -> C gets transformed into A -> B then B -> C
    const interpolatedCoords: GenericLocationShape[] = [];
    const interpolatedPairSegments: GenericLocationShape[][] = [];
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
      <Polyline
        strokeWidth={2}
        coordinates={interpolatedCoords}
        strokeColor={colors.brand.secondary.dft}
      />
    );
  }

  /**
   * Returns the user icon to be rendered on the map
   * @type {function}
   * @return {node|null} The user icon
   */
  getUserRender: Function = (): ReactNode | null => {
    if (!this.props.currentUserLocation) { return null; }
    const { latitude, longitude } = this.props.currentUserLocation;
    return (
      <Marker
        identifier="driver"
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
            source={this.props.userIcon}
          />
        </View>
      </Marker>
    );
  }

  /**
   * Returns the overlaid items (markers, user icon, and polyline)
   * @type {function}
   * @return {node|null} JSX to be rendered
   */
  getMapContentRender: Function = (): ReactNode | null => {
    if (!this.state.map.markers.length) { return null; }
    return (
      <>
        {this.getMarkersRender()}
        {this.getPolylineRender()}
        {this.getUserRender()}
      </>
    );
  }

  /**
   * Returns the navigation button element if set so
   * @type {function}
   * @return {node|null} JSX for the navigation button or null
   */
  getNavigationBtn: Function = (): ReactNode | null => {
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

  /**
   * Returns an object containing the mapPadding prop for the MapView component
   * depending on the platform OS
   * @return {object|undefined} The map padding object
   */
  getMapPadding: Function = (): undefined | { top: number } => {
    if (Platform.OS === "android") {
      return { top: PixelRatio.getPixelSizeForLayoutSize(10000) };
    }
    return undefined;
  }

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render(): ReactNode {
    return (
      <View style={this.getStyles().map}>
        <MapView
          ref={this.map}
          provider="google"
          style={this.getStyles().map}
          onMapReady={this.onMapReady}
          customMapStyle={PackenUiMapStyle}
          mapPadding={this.getMapPadding()}
          initialRegion={this.state.map.region}
        >
          {this.getMapContentRender()}
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

  /**
   * Returns the current styles object
   * @type {function}
   * @return {object} The current styles object
   */
  getStyles: Function = (): object => ({
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