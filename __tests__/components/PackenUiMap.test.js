import PackenUiMap from "../../app/components/PackenUiMap";
import MockShipment from "../../models/shipment.json";
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
    renderAlt = shallow(<PackenUiMap shipment={altShipment} />);
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
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
  });
});
