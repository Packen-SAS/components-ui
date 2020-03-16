import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import PackenListItem from "../../app/components/PackenListItem";
import PackenText from "../../app/components/PackenText";

import Colors from "../../app/styles/abstracts/colors";
import ListStyles from "../../app/styles/components/PackenList";
import { genKey } from "../../app/utils/index";

describe("<PackenListItem/>", () => {
  let render, renderInstance;
  const list = {
    config: {
      size: "medium",
      checkedIcon: "check",
      selectionType: "single"
    },
    items: [
      {
        key: genKey(),
        left: false,
        right: false,
        value: "Bogotá, D.C.",
        isSelected: false,
        main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Bogotá, D.C.</PackenText>)
      },
      {
        key: genKey(),
        left: false,
        right: false,
        value: "Medellín",
        isSelected: false,
        main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Medellín</PackenText>)
      },
      {
        key: genKey(),
        left: false,
        right: false,
        value: "Bucaramanga",
        isSelected: false,
        isDisabled: true,
        main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Bucaramanga</PackenText>)
      },
      {
        key: genKey(),
        left: false,
        right: false,
        value: "Santa Marta",
        isSelected: false,
        main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Santa Marta</PackenText>)
      },
      {
        key: genKey(),
        left: false,
        right: false,
        value: "Cali",
        isSelected: false,
        main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Cali</PackenText>)
      },
      {
        key: genKey(),
        left: false,
        right: false,
        value: "Cartagena",
        isSelected: false,
        main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Cartagena</PackenText>)
      },
      {
        key: genKey(),
        left: false,
        right: false,
        value: "Leticia",
        isSelected: false,
        main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Leticia</PackenText>)
      }
    ]
  };
  const mockCallback = jest.fn();

  beforeAll(() => {
    render = renderer.create(
      <PackenListItem
        config={{ size: "medium", ...list.config }}
        mainContent={list.items[0]}
        getItemHeight={mockCallback}
        updateSelectedItems={mockCallback}
        currentRadiosState={{
          checkedValue: ""
        }}
        currentCheckboxesState={{
          finalSelectionArray: [],
          checkedValues: []
        }}
      />
    );

    renderInstance = render.getInstance();

    renderInstance.setState = state => {
      renderInstance.state = {
        ...renderInstance.state,
        ...state
      }
    }

    renderInstance.setState({
      prevState: "default",
      state: "default",
      originalStyles: {},
      mainContent: null,
      newSelectedState: false
    });
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });

    it("renders nothing if there's no left or right defined", () => {
      renderInstance.props.mainContent = {
        left: undefined,
        right: undefined
      };
      const renderedSidesContent = renderInstance.getSidesContent();
      expect(renderedSidesContent.left).toBe(null);
      expect(renderedSidesContent.right).toBe(null);
    });

    it("renders correct content if left and right are defined", () => {
      renderInstance.props.mainContent = {
        left: {
          type: "avatar",
          config: {
            size: "small",
            src: require("../../assets/images/avatar.jpg")
          }
        },
        right: {
          type: "icon",
          config: {
            name: "arrow-up"
          }
        }
      }
      const renderedSidesContent = renderInstance.getSidesContent();
      expect(renderedSidesContent.left).toBeDefined();
      expect(renderedSidesContent.right).toBeDefined();
    });

    it("returns left content", () => {
      const returnedContent = renderInstance.get_left_content();
      expect(returnedContent).not.toBe(undefined);
    });

    it("returns right content", () => {
      const returnedContent = renderInstance.get_right_content();
      expect(returnedContent).not.toBe(undefined);
    });
  });

  describe("triggering actions", () => {
    it("executes correct code on componentDidMount", () => {
      renderInstance.set_main_content = jest.fn();
      renderInstance.componentDidMount();
      expect(renderInstance.set_main_content).toHaveBeenCalled();
    });

    it("executes correct code on componentDidUpdate", () => {
      renderInstance.checkIfUnselected = jest.fn();
      renderInstance.checkboxRef = { setCheckedState: jest.fn() }
      renderInstance.props = {
        mainContent: {
          value: ""
        },
        currentCheckboxesState: {
          finalSelectionArray: []
        }
      };
      renderInstance.setState({ newSelectedState: true });
      renderInstance.componentDidUpdate(null, null, null);
      expect(renderInstance.checkboxRef.setCheckedState)
        .toHaveBeenCalledWith(renderInstance.props.mainContent.value, renderInstance.state.newSelectedState, renderInstance.props.currentCheckboxesState.finalSelectionArray);
    });

    it("checks if unselected if selection type is 'radio'", () => {
      renderInstance.radioRef = { setCheckedIndex: jest.fn() };
      renderInstance.props = {
        config: {
          selectionType: "radio"
        },
        mainContent: {
          main: {
            control: {}
          },
          value: "Test"
        },
        currentRadiosState: {
          checkedValue: "Test 2"
        }
      };

      renderInstance.checkIfUnselected();

      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.radioRef.setCheckedIndex).toHaveBeenCalled();
        clearTimeout(timeout);
      }, 4000);
    });

    it("checks if unselected if selection type is 'checkbox'", () => {
      renderInstance.checkboxRef = { setCheckedState: jest.fn() };
      renderInstance.props = {
        config: {
          selectionType: "checkbox"
        },
        mainContent: {
          main: {
            control: {}
          },
          value: "Test"
        },
        currentCheckboxesState: {
          checkedValues: ["Test 2"],
          finalSelectionArray: ["Test 2"]
        }
      };

      renderInstance.checkIfUnselected();

      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.checkboxRef.setCheckedState)
          .toHaveBeenCalledWith(renderInstance.props.mainContent.value, false, renderInstance.props.currentCheckboxesState.finalSelectionArray);
        clearTimeout(timeout);
      }, 4000);
    });

    it("executes correct code on pressIn", () => {
      renderInstance.setState({ state: "active" });
      renderInstance.props.mainContent.isSelected = false;
      renderInstance.pressIn_handler();

      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.state.prevState).toBe("active");
        expect(renderInstance.state.state).toBe("focus");
        clearTimeout(timeout);
      }, 2000);
    });

    it("executes correct code on pressOut", () => {
      renderInstance.setState({ prevState: "active" });

      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.state.state).toBe("active");
        clearTimeout(timeout);
      }, 2000);
    });

    it("executes correct code on press if selection type is 'single'", () => {
      renderInstance.props = {
        config: {
          selectionType: "single"
        },
        mainContent: {
          value: "Test"
        },
        updateSelectedItems: jest.fn()
      };

      renderInstance.press_handler();

      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.state.prevState).toBe("active");
        expect(renderInstance.state.state).toBe("active");
        expect(renderInstance.props.updateSelectedItems).toHaveBeenCalledWith("Test", true);
        clearTimeout(timeout);
      }, 2000);
    });

    it("executes correct code on press if selection type is 'radio'", () => {
      renderInstance.props = {
        config: {
          selectionType: "single"
        },
        mainContent: {
          value: "Test"
        },
        updateSelectedItems: jest.fn()
      };
      renderInstance.radioRef = {
        setCheckedIndex: jest.fn()
      };

      renderInstance.press_handler();

      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.state.prevState).toBe("active");
        expect(renderInstance.state.state).toBe("active");
        expect(renderInstance.radioRef.setCheckedIndex).toHaveBeenCalledWith(0);
        expect(renderInstance.props.updateSelectedItems)
          .toHaveBeenCalledWith("Test", true, {
            checkedType: "radio",
            checkedValue: "Test"
          });
        clearTimeout(timeout);
      }, 2000);
    });

    it("executes correct code on press if selection type is 'multiple'", () => {
      renderInstance.props = {
        config: {
          selectionType: "multiple"
        },
        mainContent: {
          value: "Test"
        },
        updateSelectedItems: jest.fn()
      };
      renderInstance.setState({ prevState: "default" });

      renderInstance.press_handler();

      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.state.prevState).toBe("active");
        expect(renderInstance.state.state).toBe("active");
        expect(renderInstance.state.newSelectedState).toBe(true);
        expect(renderInstance.props.updateSelectedItems).toHaveBeenCalledWith("Test", true);
        clearTimeout(timeout);
      }, 2000);
    });

    it("executes correct code on press if selection type is 'checkbox'", () => {
      renderInstance.props = {
        config: {
          selectionType: "multiple"
        },
        mainContent: {
          value: "Test"
        },
        updateSelectedItems: jest.fn()
      };
      renderInstance.checkboxRef = true;
      renderInstance.setState({ prevState: "default" });

      renderInstance.press_handler();

      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.state.prevState).toBe("active");
        expect(renderInstance.state.state).toBe("active");
        expect(renderInstance.state.newSelectedState).toBe(true);
        expect(renderInstance.props.updateSelectedItems)
          .toHaveBeenCalledWith("Test", true, {
            checkedType: "checkbox",
            checkedValue: "Test"
          });
        clearTimeout(timeout);
      }, 2000);
    });

    it("gets item height", () => {
      renderInstance.props.getItemHeight = jest.fn();
      renderInstance.get_item_height({ height: 10 });
      expect(renderInstance.props.getItemHeight).toHaveBeenCalledWith(10);
    });
  });

  describe("styling", () => {
    it("returns an empty active styles object if selection type is 'radio' or 'checkbox'", () => {
      renderInstance.props = {
        config: {
          selectionType: "radio"
        }
      };
      const returnedStyles = renderInstance.get_active_styles();
      expect(returnedStyles).toEqual({});
    });

    it("returns active styles it selection type is 'single' or 'multiple' and is selected", () => {
      renderInstance.props = {
        config: {
          selectionType: "single"
        },
        mainContent: {
          isSelected: true
        }
      };
      const returnedStyles = renderInstance.get_active_styles();
      expect(returnedStyles).toEqual({ ...ListStyles.box.state.active });
    });

    it("returns default active styles it selection type is 'single' or 'multiple' and is not selected", () => {
      renderInstance.props = {
        config: {
          selectionType: "multiple"
        },
        mainContent: {
          isSelected: false
        }
      };
      const returnedStyles = renderInstance.get_active_styles();
      expect(returnedStyles).toEqual({ ...ListStyles.box.state.default });
    });

    it("returns an empty focus styles object if selection type is 'radio' or 'checkbox'", () => {
      renderInstance.props.config.selectionType = "radio";
      const returnedStyles = renderInstance.get_focus_styles();
      expect(returnedStyles).toEqual({});
    });

    it("returns focus styles if selection type is 'single' or 'multiple' and is selected", () => {
      renderInstance.props = {
        config: {
          selectionType: "single"
        },
        mainContent: {
          isSelected: true
        }
      };
      const returnedStyles = renderInstance.get_focus_styles();
      expect(returnedStyles).toEqual({ ...ListStyles.box.state.active });
    });

    it("returns focus styles if selection type is 'single' or 'multiple', is not selected, and is focused", () => {
      renderInstance.props = {
        config: {
          selectionType: "multiple"
        },
        mainContent: {
          isSelected: false
        }
      };
      renderInstance.setState({ state: "focus" });
      const returnedStyles = renderInstance.get_focus_styles();
      expect(returnedStyles).toEqual({ ...ListStyles.box.state.focus });
    });

    it("returns focus styles if selection type is 'single' or 'multiple', is not selected, and is not focused", () => {
      renderInstance.props = {
        config: {
          selectionType: "multiple"
        },
        mainContent: {
          isSelected: false
        }
      };
      renderInstance.setState({ state: "default" });
      const returnedStyles = renderInstance.get_focus_styles();
      expect(returnedStyles).toEqual({ ...ListStyles.box.state.default });
    });

    it("returns an empty disabled styles object if its state is not defined like so", () => {
      renderInstance.props = {
        mainContent: {
          isDisabled: false
        }
      };
      const returnedStyles = renderInstance.get_disabled_styles();
      expect(returnedStyles).toEqual({
        box: {},
        content: { wrapper: {} }
      });
    });

    it("returns disabled styles if is disabled", () => {
      renderInstance.props = {
        mainContent: {
          isDisabled: true
        }
      };
      const returnedStyles = renderInstance.get_disabled_styles();
      expect(returnedStyles).toEqual({
        box: {
          ...ListStyles.box.state.disabled
        },
        content: {
          wrapper: {
            ...ListStyles.content.wrapper.state.disabled
          }
        }
      });
    });

    it("checks main content styles before rendering if it's disabled, not a 'PackenRadio' or 'PackenCheckbox' and an array", () => {
      renderInstance.props = {
        mainContent: {
          isDisabled: true,
          main: {
            props: {
              children: [
                {
                  type: { displayName: "Test" },
                  props: {
                    style: { color: "" }
                  }
                }
              ]
            }
          }
        }
      };
      renderInstance.check_main_content_styles();
      expect(renderInstance.props.mainContent.main.props.children[0].props.style.color).toBe(Colors.basic.gray.lgt);
    });

    it("checks main content styles before rendering if it's disabled, not a 'PackenRadio' or 'PackenCheckbox' and not an array", () => {
      renderInstance.props = {
        mainContent: {
          isDisabled: true,
          main: {
            type: {
              displayName: "Test"
            },
            props: {
              children: {},
              style: { color: "" }
            }
          }
        }
      };
      renderInstance.check_main_content_styles();
      expect(renderInstance.props.mainContent.main.props.style.color).toBe(Colors.basic.gray.lgt);
    });

    it("checks main content styles before rendering if it's not disabled, is selected, not a 'PackenRadio' or 'PackenCheckbox', and not an array", () => {
      renderInstance.props = {
        mainContent: {
          isSelected: true,
          main: {
            type: {
              displayName: "Test"
            },
            props: {
              children: {},
              style: {
                color: ""
              }
            }
          }
        }
      };
      renderInstance.check_main_content_styles();
      expect(renderInstance.props.mainContent.main.props.style.color).toBe(Colors.basic.white.dft);
    });

    it("checks main content styles before rendering if it's not disabled, is selected, is a 'PackenText', not a 'PackenRadio' or 'PackenCheckbox', and an array", () => {
      renderInstance.props = {
        mainContent: {
          isSelected: true,
          main: {
            props: {
              children: [
                {
                  type: {
                    displayName: "PackenText"
                  },
                  props: {
                    style: {
                      color: ""
                    }
                  }
                }
              ]
            }
          }
        }
      };
      renderInstance.check_main_content_styles();
      expect(renderInstance.props.mainContent.main.props.children[0].props.style.color).toBe(Colors.basic.white.dft);
    });

    it("checks main content styles before rendering if it's not disabled, not selected, not a 'PackenRadio' or 'PackenCheckbox', and not an array", () => {
      renderInstance.setState({
        originalStyles: {
          color: "#000000"
        }
      });
      renderInstance.props = {
        mainContent: {
          main: {
            type: {
              displayName: "Test"
            },
            props: {
              style: {
                color: ""
              }
            }
          }
        }
      };
      renderInstance.check_main_content_styles();
      expect(renderInstance.props.mainContent.main.props.style.color).toBe("#000000");
    });

    it("checks main content styles before rendering if it's not disabled, not selected, a 'PackenText', and an array", () => {
      renderInstance.setState({
        originalStyles: [{ color: "#000000" }]
      });
      renderInstance.props = {
        mainContent: {
          main: {
            type: {
              displayName: "Test"
            },
            props: {
              children: [
                {
                  type: {
                    displayName: "PackenText"
                  },
                  props: {
                    style: {
                      color: ""
                    }
                  }
                }
              ]
            }
          }
        }
      };
      renderInstance.check_main_content_styles();
      expect(renderInstance.props.mainContent.main.props.children[0].props.style.color).toBe("#000000");
    });
  });

  describe("state changing", () => {
    it("sets main content if it's not a control type", () => {
      renderInstance.props.mainContent.main = {};
      renderInstance.set_main_content();
      
      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.state.mainContent).toBeDefined();
        clearTimeout(timeout);
      }, 2000);
    });

    it("sets main content if it's a control", () => {
      renderInstance.props = {
        mainContent: {
          main: {
            control: {
              type: "radio"
            }
          }
        }
      };
      renderInstance.set_main_content();
      
      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.state.mainContent).toBeDefined();
        clearTimeout(timeout);
      }, 2000);
    });
  });
});