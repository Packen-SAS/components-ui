import "react-native";
import { Animated } from "react-native";
import React from "react";
import { shallow } from "enzyme";

import PackenUiProgressbar from "../../app/components/PackenUiProgressbar";

describe("<PackenUiProgressbar/>", () => {
  let render, renderInstance;

  beforeAll(() => {
    render = shallow(
      <PackenUiProgressbar
        wrapperStyle={{ marginBottom: 10 }}
        type="determinate"
        height={12}
        radius={4}
        progress={0.5}
        trackColor="#E6E6E6"
        indicatorColor="#20D292"
      />
    );
    renderInstance = render.instance();

    renderInstance.setState({
      wrapperStyle: undefined,
      radius: 0,
      type: "determinate",
      heightVal: 8,
      height: new Animated.Value(8),
      progress: new Animated.Value(0.5),
      progressLeft: new Animated.Value(0),
      isComplete: false,
      colors: {
        track: "#000000",
        indicator: "#FFFFFF"
      }
    });
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });

  describe("triggering actions", () => {
    it("returns the correct progress if it's determinate", () => {
      render.setProps({ type: "determinate", progress: 0.5 });
      const returnedProgress = renderInstance.getProgress();

      expect(returnedProgress).toEqual(new Animated.Value(0.5));
    });

    it("returns the correct progress if it's indeterminate", () => {
      render.setProps({ type: "indeterminate" });
      const returnedProgress = renderInstance.getProgress();

      expect(returnedProgress).toEqual(new Animated.Value(1));
    });

    it("returns the correct type if it's determinate", () => {
      render.setProps({ type: "determinate" });
      const returnedType = renderInstance.getDeterminate();

      expect(returnedType).toBe("determinate");
    });

    it("returns the correct type if it's indeterminate", () => {
      render.setProps({ type: "indeterminate" });
      const returnedType = renderInstance.getDeterminate();

      expect(returnedType).toBe("indeterminate");
    });

    it("executes the correct code on componentDidMount", () => {
      const spyCheckAnimToStart = jest.spyOn(renderInstance, "checkAnimToStart");
      renderInstance.componentDidMount();

      expect(spyCheckAnimToStart).toHaveBeenCalled();
      spyCheckAnimToStart.mockRestore();
    });

    it("executes the correct code on componentDidUpdate", () => {
      const prevProps = { test: "Test" };
      render.setProps({ test: "Test 2" });
      const spyUpdateState = jest.spyOn(renderInstance, "updateState");
      renderInstance.componentDidUpdate(prevProps, null, null);

      expect(spyUpdateState).toHaveBeenCalled();
      spyUpdateState.mockRestore();
    });

    it("updates the state", () => {
      const spySetState = jest.spyOn(renderInstance, "setState");
      renderInstance.updateState();

      expect(spySetState).toHaveBeenCalled();
      spySetState.mockRestore();
    });

    it("sets the indeterminate animation while checking which to run", () => {
      renderInstance.setState({ type: "indeterminate" });
      const spySetIndeterminateAnim = jest.spyOn(renderInstance, "setIndeterminateAnim");
      renderInstance.checkAnimToStart();

      expect(spySetIndeterminateAnim).toHaveBeenCalled();
      spySetIndeterminateAnim.mockRestore();
    });

    it("sets the progress animation while checking which to run", () => {
      renderInstance.setState({ type: "determinate" });
      const spySetProgressAnim = jest.spyOn(renderInstance, "setProgressAnim");
      renderInstance.checkAnimToStart();

      expect(spySetProgressAnim).toHaveBeenCalled();
      spySetProgressAnim.mockRestore();
    });

    it("sets the complete animation", () => {
      const spyAnimatedTiming = jest.spyOn(Animated, "timing");
      renderInstance.setCompleteAnim();

      expect(spyAnimatedTiming).toHaveBeenCalled();
      spyAnimatedTiming.mockRestore();
    });

    it("sets the progress animation", () => {
      const spyAnimatedTiming = jest.spyOn(Animated, "timing");
      renderInstance.setProgressAnim();

      expect(spyAnimatedTiming).toHaveBeenCalled();
      spyAnimatedTiming.mockRestore();
    });

    it("sets the progress and complete animations if it reached 100%", () => {
      const spyAnimatedTiming = jest.spyOn(Animated, "timing");
      render.setProps({ progress: 1 });
      renderInstance.setProgressAnim();

      expect(spyAnimatedTiming).toHaveBeenCalled();
      spyAnimatedTiming.mockRestore();
    });

    it("sets the indeterminate animation", () => {
      const spyAnimatedLoop = jest.spyOn(Animated, "loop");
      renderInstance.setIndeterminateAnim();
      renderInstance.setState({ isComplete: false });
      expect(spyAnimatedLoop).toHaveBeenCalled();
      spyAnimatedLoop.mockRestore();
    });

    it("sets the indeterminate and complete animations if it reached 100%", () => {
      const spyAnimatedTiming = jest.spyOn(Animated, "loop");
      const spySetCompleteAnim = jest.spyOn(renderInstance, "setCompleteAnim");
      renderInstance.setState({ isComplete: true });
      renderInstance.setIndeterminateAnim();

      expect(spyAnimatedTiming).toHaveBeenCalled();
      expect(spySetCompleteAnim).toHaveBeenCalled();
      spyAnimatedTiming.mockRestore();
      spySetCompleteAnim.mockRestore();
    });
  });

  describe("styling", () => {
    it("returns the styles object", () => {
      const returnedStyles = renderInstance.getStyles();

      expect(returnedStyles).toBeDefined();
    });
  });
});