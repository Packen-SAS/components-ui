import PackenUiMap from "../../app/components/PackenUiMap";
import MockShipment from "../../models/shipment.json";
import { Platform } from "react-native";
import { shallow } from "enzyme";
import React from "react";

describe("<PackenUiMap/>", () => {
  let render, instance, renderAlt;
  const mockShipment = { ...MockShipment };
  const altShipment = { ...MockShipment };
  altShipment.pickup_origin.location_data.latitude = null;
  altShipment.pickup_origin.location_data.longitude = null;
  const mockOnToggleMaximize = jest.fn();
  const mockOnNavigationBtnPress = jest.fn();
  const mockOnFinishRendering = jest.fn();
  const mockCurrentUserLocation = { latitude: 1234, longitude: 4321 };
  const mockGeocodingService = jest.fn();
  beforeAll(() => {
    render = shallow(
      <PackenUiMap
        shipment={mockShipment}
        onToggleMaximize={mockOnToggleMaximize}
        onNavigationBtnPress={mockOnNavigationBtnPress}
        onFinishRendering={mockOnFinishRendering}
        currentUserLocation={mockCurrentUserLocation}
        heading={45}
        showNavigationBtn
        GeocodingService={mockGeocodingService}
        userIcon={require("../../assets/images/perfil.png")}
      />
    );
    instance = render.instance();
    renderAlt = shallow(
      <PackenUiMap
        shipment={altShipment}
        currentUserLocation={{ latitude: 1234, longitude: 4321 }}
      />
    );
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
      expect(renderAlt).toBeDefined();
    });

    it("returns the user icon elements", () => {
      render.setProps({ currentUserLocation: undefined });
      let res = instance.getUserRender();
      expect(res).toBeNull();

      [undefined, 45].forEach((val) => {
        render.setProps({ currentUserLocation: { latitude: 1234, longitude: 4321 }, heading: val });
        res = instance.getUserRender();
        expect(res).toBeDefined();
      });
    });

    it("returns the location markers array", () => {
      const newState = { ...instance.state };
      newState.map.markers = [
        { latitude: 1234, longitude: 4321, id: 0 },
        { latitude: 4321, longitude: 1234, id: 1 },
        { latitude: 4321, longitude: 1234, id: 2, address: "test" }
      ];
      newState.map.markersDimensions = [{ width: 123 }, { width: 321 }];
      instance.setState(newState);
      let res = instance.getMarkersRender();
      expect(res).toBeInstanceOf(Array);
      expect(res).toHaveLength(3);

      const spyGetMarkersDimensions = jest.spyOn(instance, "getMarkersDimensions");
      const e = { nativeEvent: { layout: { width: 123 } } };
      res[0].props.children.props.onLayout(e);
      expect(spyGetMarkersDimensions).toHaveBeenCalledWith(e, expect.any(Number));
      spyGetMarkersDimensions.mockRestore();
    });

    it("returns the markers data to be rendered", async () => {
      instance.data.all_day = true;
      instance.data.shipment_locations = [{ latitude: 1234, longitude: 4321 }];
      let res = await instance.getMarkersData();
      expect(res).toHaveLength(2);

      instance.data.all_day = false;
      instance.data.deliveries = [{ to_contact: { location_data: { latitude: 1234, longitude: 4321 } } }];
      res = await instance.getMarkersData();
      expect(res).toHaveLength(2);

      instance.data.deliveries = [{ to_contact: { location_data: {} } }];
      res = await instance.getMarkersData();
      expect(res).toHaveLength(1);
      instance.data.all_day = true;
    });
  });

  describe("state changing", () => {
    it("re-renders component after user location changes", () => {
      render.setProps({ heading: 50 });
      const spyForceUpdate = jest.spyOn(instance, "forceUpdate");
      instance.componentDidUpdate({ heading: 45 });
      expect(spyForceUpdate).toHaveBeenCalled();
    });

    it("updates state with markers to be rendered", async () => {
      const spyGetMarkersData = jest.spyOn(instance, "getMarkersData");
      spyGetMarkersData.mockReturnValueOnce([{ id: 1, test: "test" }]);
      await instance.displayMarkers();
      expect(instance.state.map.markers).toEqual([{ id: 1, test: "test" }]);
      spyGetMarkersData.mockRestore();
    });

    it("programmatically creates a new marker", () => {
      const newState = { ...instance.state };
      newState.map.markers = [];
      instance.setState(newState);
      const marker = { latitude: 1234, longitude: 4321, address: "test" };
      const updater = instance.addMarker(marker);
      expect(updater).toBeInstanceOf(Function);
      const res = updater(newState);
      expect(res.map.markers).toEqual([{ ...marker, id: 0 }]);
    });
  });

  describe("triggering actions", () => {
    it("centers markers and calls prop function after finishing rendering", () => {
      const spyCenterMarkers = jest.spyOn(instance, "centerMarkers");
      instance.onFinishRendering();
      expect(spyCenterMarkers).toHaveBeenCalled();
      expect(mockOnFinishRendering).toHaveBeenCalled();

      mockOnFinishRendering.mockReset();
      render.setProps({ onFinishRendering: undefined });
      instance.onFinishRendering();
      expect(mockOnFinishRendering).not.toHaveBeenCalled();
      spyCenterMarkers.mockRestore();
    });

    it("tests the placeholder function", () => {
      const res = instance.ignoreAction();
      expect(res).toBe(true);
    });

    it("centers markers onMapReady", () => {
      const spyCenterMarkers = jest.spyOn(instance, "centerMarkers");
      instance.onMapReady();
      expect(spyCenterMarkers).toHaveBeenCalled();
      spyCenterMarkers.mockRestore();
    });

    it("toggles map zoom in/out", () => {
      jest.useFakeTimers();
      [false, true].forEach((val) => {
        instance.onToggleMaximize = val ? jest.fn() : null;
        const newState = { ...instance.state };
        newState.map.isMaximized = val;
        instance.setState(newState);
        const updater = instance.maximizeMap();
        jest.advanceTimersByTime(1000);
        expect(updater).toBeInstanceOf(Function);
        const res = updater(instance.state);
        expect(res).toHaveProperty("map.isMaximized", !val);
        expect(res).toHaveProperty("map.btnIcon", val ? "maximize-2" : "minimize-2");
      });
      jest.useRealTimers();
    });

    it("returns the corresponding address from a pair of coordinates", async () => {
      mockGeocodingService.mockReturnValueOnce({ error: "test" });
      let res = await instance.getAddressFromCoords();
      expect(res).toBe("Invalid address");

      mockGeocodingService.mockReturnValueOnce("Test address");
      res = await instance.getAddressFromCoords();
      expect(res).toBe("Test address");
    });

    it("centers markers", () => {
      jest.useFakeTimers();
      instance.map = null;
      const res = instance.centerMarkers();
      expect(res).toBeUndefined();

      ["ios", "android"].forEach((val, i) => {
        render.setProps({ userIcon: "test", currentUserLocation: i === 0 ? undefined : { latitude: 1234, longitude: 4321 } });
        Platform.OS = val;
        instance.map = { current: { fitToSuppliedMarkers: jest.fn() } };
        instance.centerMarkers();
        jest.advanceTimersByTime(1000);
        expect(instance.map.current.fitToSuppliedMarkers).toHaveBeenCalledWith(expect.any(Array), expect.any(Object));
      });
      jest.useRealTimers();
    });
  });

  describe("styling", () => {
    it("returns the correct mapPadding prop for the native MapView component", () => {
      Platform.OS = "ios";
      let res = instance.getMapPadding();
      expect(res).toBeUndefined();

      Platform.OS = "android";
      res = instance.getMapPadding();
      expect(res).toHaveProperty("top", expect.any(Number));
    });
  });
});
