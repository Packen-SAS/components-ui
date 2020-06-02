import "react-native";
import React from "react";
import { shallow } from "enzyme";

import { RNCamera } from "react-native-camera";
import
  PackenUiCamera,
  { CameraImagePreviewTriggers,
    CameraTopTriggers,
    CameraBottomTriggers,
    DocumentLayout,
    AvatarLayout
  } from "../../app/components/PackenUiCamera";

describe("<PackenUiCamera/>", () => {
  const mockCallback = jest.fn();
  const labels = {
    camera: {
      access_title: "Acceso a la cámara",
      access_message: "Deberá permitir el acceso a la cámara para anexarlas como soporte al servicio activo."
    },
    mic: {
      access_title: "Acceso al micrófono",
      access_message: "Está función es requerida por la cámara"
    },
    buttons: {
      ok: "Aceptar",
      cancel: "Cancelar"
    }
  };
  const render = shallow(
    <PackenUiCamera
      dismiss={mockCallback}
      VISIBLE={true}
    />
  );
  const renderLabels = shallow(
    <PackenUiCamera
      dismiss={mockCallback}
      VISIBLE={true}
      labels={labels}
    />
  );
  const renderInstance = render.instance();
  const renderLabelsInstance = renderLabels.instance();

  const renderTopTriggers = shallow(
    <CameraTopTriggers
      image={""}
      closeCameraTrigger={mockCallback}
      showPicture={mockCallback}
    />
  );
  const renderTopTriggersInstance = renderTopTriggers.instance();

  const renderTopTriggersNoImage = shallow(
    <CameraTopTriggers
      closeCameraTrigger={mockCallback}
      showPicture={mockCallback}
    />
  );

  const renderBottomTriggers = shallow(
    <CameraBottomTriggers
      flashTrigger={mockCallback}
      cameraIsLoading={mockCallback}
      reverseCameraTrigger={mockCallback}
      pictureTrigger={mockCallback}
    />
  );
  const renderBottomTriggersInstance = renderBottomTriggers.instance();

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
      expect(renderLabels).toBeDefined();
    });

    it("returns the camera layout for documents", () => {
      render.setProps({ MODE: "document" });
      const res = renderInstance.getCameraLayout()
      expect(res).toBeDefined();
    });

    it("returns the camera layout for avatars", () => {
      render.setProps({ MODE: "avatar" });
      const res = renderInstance.getCameraLayout()
      expect(res).toBeDefined();
    });

    it("renders the camera image preview triggers", () => {
      const triggers = CameraImagePreviewTriggers({
        confirmPicture: renderInstance.restoreImagePreviewModal,
        deletePicture: renderInstance.discardCurrentPicture
      });
      expect(triggers).toBeDefined();
    });

    it("renders the camera top triggers", () => {
      expect(renderTopTriggers).toBeDefined();
      expect(renderTopTriggersNoImage).toBeDefined();
    });

    it("renders the camera bottom triggers", () => {
      expect(renderBottomTriggers).toBeDefined();
    });

    it("renders the camera bottom triggers variations", () => {
      renderBottomTriggers.setProps({ cameraIsLoading: false });
      expect(renderBottomTriggers).toBeDefined();
    });

    it("returns the svg for the documents and avatars layout", () => {
      expect(DocumentLayout({ width: 10, height: 10, color: "#FFFFFF" })).toBeDefined();
      expect(AvatarLayout({ width: 10, height: 10, color: "#FFFFFF" })).toBeDefined();
    });
  });

  describe("state changing", () => {
    it("executes correct code on componentDidMount", () => {
      renderInstance.componentDidMount();
      expect(renderInstance.state.flashMode).toBe(RNCamera.Constants.FlashMode.off);
      expect(renderInstance.state.cameraType).toBe(RNCamera.Constants.Type.back);
    });

    it("restores the image preview modal", () => {
      renderInstance.restoreImagePreviewModal();
      expect(renderInstance.state.imageViewble).toBe(false);
    });

    it("finalizes the process", () => {
      renderInstance.finalize();
      expect(renderInstance.state.proccessing).toBe(false);
    });
  });

  describe("triggering actions", () => {
    it("emits the picture taken if props are valid", () => {
      render.setProps({ EMIT_TRIGGER: mockCallback });
      renderInstance.setState({ picture: {} });
      renderInstance.emitPicture();

      expect(renderInstance.state.picture).toBe(null);
      expect(renderInstance.props.EMIT_TRIGGER).toHaveBeenCalled();
    });

    it("dismisses the modal while emitting the picture taken if props are not valid", () => {
      render.setProps({ EMIT_TRIGGER: undefined, dismiss: mockCallback });
      renderInstance.setState({ picture: null });
      const spyRestoreImagePreviewModal = jest.spyOn(renderInstance, "restoreImagePreviewModal");
      renderInstance.emitPicture();

      expect(renderInstance.props.dismiss).toHaveBeenCalled();
      expect(spyRestoreImagePreviewModal).toHaveBeenCalled();
      spyRestoreImagePreviewModal.mockRestore();
    });

    it("captures a picture", () => {
      renderInstance.setState({ camera: {} });
      renderInstance.capturePicture();
      expect(renderInstance.state.proccessing).toBe(true);
    });

    it("returns -1 while trying to capture a picture if the camera is null", () => {
      renderInstance.setState({ camera: null });
      const res = renderInstance.capturePicture();
      expect(res).toEqual({ "_40": 0, "_55": null, "_65": 0, "_72": null });
    });

    it("sets the camera", () => {
      renderInstance.setCamera("test");
      expect(renderInstance.state.camera).toBe("test");
    });

    it("turns on the flash", () => {
      renderInstance.setState({ flashMode: RNCamera.Constants.FlashMode.off });
      renderInstance.setFlash();
      expect(renderInstance.state.flashMode).toBe(RNCamera.Constants.FlashMode.on);
    });

    it("turns off the flash", () => {
      renderInstance.setState({ flashMode: RNCamera.Constants.FlashMode.on });
      renderInstance.setFlash();
      expect(renderInstance.state.flashMode).toBe(RNCamera.Constants.FlashMode.off);
    });

    it("sets the back camera", () => {
      renderInstance.setState({ cameraType: RNCamera.Constants.Type.back });
      renderInstance.setCameraType();
      expect(renderInstance.state.cameraType).toBe(RNCamera.Constants.Type.front);
    });

    it("sets the front camera", () => {
      renderInstance.setState({ cameraType: RNCamera.Constants.Type.front });
      renderInstance.setCameraType();
      expect(renderInstance.state.cameraType).toBe(RNCamera.Constants.Type.back);
    });

    it("sets the camera as ready", () => {
      renderInstance.cameraReady();
      expect(renderInstance.state.proccessing).toBe(false);
    });

    it("returns undefined while showing the current picture if it's null", () => {
      renderInstance.setState({ picture: null });
      const res = renderInstance.showCurrentPicture();
      expect(res).toBe(undefined);
    });

    it("shows the current picture if it's not null", () => {
      renderInstance.setState({ picture: {} });
      renderInstance.showCurrentPicture();
      expect(renderInstance.state.imageViewble).toBe(true);
    });

    it("discards the current picture", () => {
      renderInstance.discardCurrentPicture();
      expect(renderInstance.state.picture).toBe(null);
    });

    it("propagates the picture", () => {
      renderTopTriggers.setProps({ showPicture: mockCallback });
      renderTopTriggersInstance.propagePicture();
      expect(renderTopTriggersInstance.props.showPicture).toHaveBeenCalled();
    });

    it("returns undefined while propagating the picture if prop is not valid", () => {
      renderTopTriggers.setProps({ showPicture: undefined });
      const res = renderTopTriggersInstance.propagePicture();
      expect(res).toBe(undefined);
    });

    it("propagates the flash mode", () => {
      renderBottomTriggers.setProps({ flashTrigger: mockCallback });
      renderBottomTriggersInstance.setState({ loading: false });
      renderBottomTriggersInstance.propagateFlashMode();
      expect(renderBottomTriggersInstance.props.flashTrigger).toHaveBeenCalled();
    });

    it("returns undefined while propagating the flash mode", () => {
      renderBottomTriggers.setProps({ flashTrigger: mockCallback });
      renderBottomTriggersInstance.setState({ loading: true });
      const res = renderBottomTriggersInstance.propagateFlashMode();
      expect(res).toBe(undefined);
    });

    it("propagates the taken picture", () => {
      renderBottomTriggers.setProps({ pictureTrigger: mockCallback });
      renderBottomTriggersInstance.setState({ loading: false });
      renderBottomTriggersInstance.propagatePictureTaked();
      expect(renderBottomTriggersInstance.props.pictureTrigger).toHaveBeenCalled();
    });

    it("returns undefined while propagating the taken picture", () => {
      renderBottomTriggers.setProps({ pictureTrigger: mockCallback });
      renderBottomTriggersInstance.setState({ loading: true });
      const res = renderBottomTriggersInstance.propagatePictureTaked();
      expect(res).toBe(undefined);
    });

    it("propagates the taken picture", () => {
      renderBottomTriggers.setProps({ reverseCameraTrigger: mockCallback });
      renderBottomTriggersInstance.setState({ loading: false });
      renderBottomTriggersInstance.propagateReverseCamera();
      expect(renderBottomTriggersInstance.props.reverseCameraTrigger).toHaveBeenCalled();
    });

    it("returns undefined while propagating the taken picture", () => {
      renderBottomTriggers.setProps({ reverseCameraTrigger: mockCallback });
      renderBottomTriggersInstance.setState({ loading: true });
      const res = renderBottomTriggersInstance.propagateReverseCamera();
      expect(res).toBe(undefined);
    });
  });
});