import "react-native";
import { Animated } from "react-native";
import React from "react";
import { shallow } from "enzyme";

import PackenUiRadar from "../../app/components/PackenUiRadar";

describe("<PackenUiRadar/>", () => {
  let render, renderStatic, renderInstance, renderStaticInstance;

  beforeAll(() => {
    render = shallow(
      <PackenUiRadar
        theme="search"
        animated={true}
        isAnimating={true}
      />);
    renderInstance = render.instance();

    renderStatic = shallow(
      <PackenUiRadar
        theme="search"
        animated={false}
      />);
    renderStaticInstance = renderStatic.instance();

    renderInstance.setState({
      theme: "search",
      animated: true,
      isAnimating: true,
      transforms: {
        shadow: {
          transform: [{ scale: 0.2 }]
        }
      }
    });

    renderInstance.shadowAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(renderInstance.state.transforms.shadow.transform, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }),
        Animated.timing(renderInstance.state.transforms.shadow.transform, {
          toValue: 0.2,
          duration: 500,
          useNativeDriver: true
        })
      ])
    );
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });

  describe("state changing", () => {
    it("returns false as initial 'isAnimating' state if it's not animated", () => {
      renderStatic.setProps({ animated: false });
      const res = renderStaticInstance.getInitialAnimatingState();

      expect(res).toBe(false);
    });

    it("returns correct prop as initial 'isAnimating' state if it's animated", () => {
      render.setProps({ animated: true, isAnimating: true });
      const res = renderInstance.getInitialAnimatingState();

      expect(res).toBe(true);
    });

    it("returns a regular transform if it's not animated", () => {
      renderStatic.setProps({ animated: false });
      const res = renderStaticInstance.getInitialShadowTransform();

      expect(res).toEqual([{ scale: 1 }]);
    });

    it("returns an animated transform if it's animated", () => {
      render.setProps({ animated: true });
      const spySetShadowAnimation = jest.spyOn(renderInstance, "setShadowAnimation");
      const res = renderInstance.getInitialShadowTransform();

      expect(res).toEqual([{ scale: new Animated.Value(0.2) }]);
      expect(spySetShadowAnimation).toHaveBeenCalled();
      spySetShadowAnimation.mockRestore();
    });
  });

  describe("styling", () => {
    it("sets the shadow animation", () => {
      const spyAnimatedLoop = jest.spyOn(Animated, "loop");
      renderInstance.setShadowAnimation([{ scale: new Animated.Value(0.2) }]);

      expect(spyAnimatedLoop).toHaveBeenCalled();
      spyAnimatedLoop.mockRestore();
    });
  });

  describe("triggering actions", () => {
    it("starts the shadow animation", () => {
      const spySetShadowAnimation = jest.spyOn(renderInstance, "setShadowAnimation");
      renderInstance.setState({
        transforms: {
          shadow: {
            transform: [{ scale: new Animated.Value(0.2) }]
          }
        }
      });
      renderInstance.startShadowAnimation();

      expect(spySetShadowAnimation).toHaveBeenCalled();
      spySetShadowAnimation.mockRestore();
    });

    it("stops the shadow animation", () => {
      /* renderInstance.shadowAnim = { stop: jest.fn() }; */
      const spyStop = jest.spyOn(renderInstance.shadowAnim, "stop");
      renderInstance.stopShadowAnimation();

      expect(spyStop).toHaveBeenCalled();
      spyStop.mockRestore();
    });

    it("starts the animation when checking its current state", () => {
      const spyStartShadowAnimation = jest.spyOn(renderInstance, "startShadowAnimation");
      render.setProps({
        isAnimating: true
      });
      renderInstance.setState({
        transforms: {
          shadow: {
            transform: [{ scale: new Animated.Value(0.2) }]
          }
        }
      });
      renderInstance.checkAnimationState();

      expect(spyStartShadowAnimation).toHaveBeenCalled();
      spyStartShadowAnimation.mockRestore();
    });

    it("stops the animation when checking its current state", () => {
      const spyStopShadowAnimation = jest.spyOn(renderInstance, "stopShadowAnimation");
      render.setProps({
        isAnimating: false
      });
      renderInstance.setState({
        transforms: {
          shadow: {
            transform: [{ scale: new Animated.Value(0.2) }]
          }
        }
      });
      renderInstance.checkAnimationState();

      expect(spyStopShadowAnimation).toHaveBeenCalled();
      spyStopShadowAnimation.mockRestore();
    });

    it("executes correct code on componentDidMount", () => {
      renderInstance.setState({
        animated: true,
        isAnimating: true
      });
      const spyStartShadowAnimation = jest.spyOn(renderInstance, "startShadowAnimation");
      renderInstance.componentDidMount();

      expect(spyStartShadowAnimation).toHaveBeenCalled();
      spyStartShadowAnimation.mockRestore();
    });

    it("returns false on componentDidMount", () => {
      renderInstance.setState({
        animated: false,
        isAnimating: false
      });
      const res = renderInstance.componentDidMount();

      expect(res).toBe(false);
    });

    it("executes correct code on componentDidUpdate", () => {
      const prevProps = {
        isAnimating: false
      };
      render.setProps({
        isAnimating: true
      });
      const spyCheckAnimationState = jest.spyOn(renderInstance, "checkAnimationState");
      renderInstance.componentDidUpdate(prevProps, null, null);

      expect(spyCheckAnimationState).toHaveBeenCalled();
      spyCheckAnimationState.mockRestore();
    });

    it("returns false on componentDidUpdate", () => {
      const prevProps = {
        theme: "search",
        animated: true,
        isAnimating: true,
        test: "Test"
      };
      render.setProps({ test: "Test" });
      const res = renderInstance.componentDidUpdate(prevProps, null, null);

      expect(res).toBe(false);
    });
  });
});