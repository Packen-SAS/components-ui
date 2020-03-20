import "react-native";
import React from "react";
import { shallow } from "enzyme";

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
    render = shallow(
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

    renderInstance = render.instance();

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
      renderInstance.props = {
        mainContent: {
          main: {
            props: {
              style: {
                color: ""
              }
            },
            type: {}
          },
          left: undefined,
          right: undefined
        }
      };
      const renderedSidesContent = renderInstance.getSidesContent();

      expect(renderedSidesContent.left).toBe(null);
      expect(renderedSidesContent.right).toBe(null);
    });

    it("renders correct content if left and right are defined with Avatar and Icon", () => {
      renderInstance.props = {
        config: {
          size: "small"
        },
        mainContent: {
          main: {
            props: {
              children: {},
              style: {
                color: ""
              }
            },
            type: {
              displayName: "PackenText"
            }
          },
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
      };
      const renderedSidesContent = renderInstance.getSidesContent();

      expect(renderedSidesContent.left).toBeDefined();
      expect(renderedSidesContent.right).toBeDefined();
    });

    it("renders correct content if left and right are defined with Icon and Avatar", () => {
      renderInstance.props = {
        config: {
          size: "small"
        },
        mainContent: {
          main: {
            props: {
              children: {},
              style: {
                color: ""
              }
            },
            type: {
              displayName: "PackenText"
            }
          },
          left: {
            type: "icon",
            config: {
              name: "arrow-up"
            }
          },
          right: {
            type: "avatar",
            config: {
              size: "small",
              src: require("../../assets/images/avatar.jpg")
            }
          }
        }
      };
      const renderedSidesContent = renderInstance.getSidesContent();

      expect(renderedSidesContent.left).toBeDefined();
      expect(renderedSidesContent.right).toBeDefined();
    });

    it("returns left content", () => {
      renderInstance.props = {
        config: {
          size: "small"
        },
        mainContent: {
          left: {},
          right: {},
          main: {}
        }
      };
      const returnedContent = renderInstance.getLeftContent();
      
      expect(returnedContent).not.toBe(undefined);
    });

    it("returns right content", () => {
      renderInstance.props = {
        config: {
          size: "small"
        },
        mainContent: {
          left: {},
          right: {},
          main: {}
        }
      };
      const returnedContent = renderInstance.getRightContent();
      
      expect(returnedContent).not.toBe(undefined);
    });
  });

  describe("triggering actions", () => {
    it("executes onLayout event callback for the touchable", () => {
      const spyGetItemHeight = jest.spyOn(renderInstance, "getItemHeight");
      render.setProps({
        getItemHeight: mockCallback
      });
      render.props().children.props.onLayout({
        nativeEvent: {
          layout: {
            height: 10,
            width: 10
          }
        }
      });

      expect(spyGetItemHeight).toHaveBeenCalled();
    });

    it("executes correct code on componentDidMount", () => {
      const spySetMainContent = jest.spyOn(renderInstance, "setMainContent");
      renderInstance.props = {
        mainContent: {
          main: {
            type: {
              displayName: "PackenText"
            },
            props: {
              children: {}
            }
          }
        }
      };
      renderInstance.componentDidMount();
      
      expect(spySetMainContent).toHaveBeenCalled();
      spySetMainContent.mockRestore();
    });

    it("executes correct code on componentDidUpdate", () => {
      renderInstance.checkboxRef = { setCheckedState: mockCallback }
      const spyCheckIfUnselected = jest.spyOn(renderInstance, "checkIfUnselected");
      const prevProps = {
        selectedItems: ["Test"]
      };
      renderInstance.props = {
        selectedItems: ["Test 2", "Test 3"],
        mainContent: {
          value: "",
          main: {}
        },
        currentCheckboxesState: {
          finalSelectionArray: []
        }
      }
      renderInstance.setState({ newSelectedState: true });
      renderInstance.componentDidUpdate(prevProps, null, null);

      expect(spyCheckIfUnselected).toHaveBeenCalled();
      spyCheckIfUnselected.mockRestore();

      expect(renderInstance.state.prevState).toBe("default");
      expect(renderInstance.state.state).toBe("default");
      expect(renderInstance.checkboxRef.setCheckedState)
        .toHaveBeenCalledWith(renderInstance.props.mainContent.value, renderInstance.state.newSelectedState, renderInstance.props.currentCheckboxesState.finalSelectionArray);
    });

    it("checks if unselected if selection type is 'radio'", () => {
      renderInstance.radioRef = { setCheckedIndex: mockCallback };
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

      expect(renderInstance.radioRef.setCheckedIndex).toHaveBeenCalled();
    });

    it("checks if unselected if selection type is 'checkbox'", () => {
      renderInstance.checkboxRef = { setCheckedState: mockCallback };
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

      expect(renderInstance.checkboxRef.setCheckedState)
        .toHaveBeenCalledWith(renderInstance.props.mainContent.value, false, renderInstance.props.currentCheckboxesState.finalSelectionArray);
    });

    it("executes correct code on pressIn", () => {
      renderInstance.props = {
        mainContent: {
          isSelected: false
        }
      };
      renderInstance.props.mainContent.isSelected = false;
      renderInstance.pressInHandler();

      expect(renderInstance.state.state).toBe("focus");
    });

    it("executes correct code on pressOut", () => {
      renderInstance.setState({ prevState: "active" });
      renderInstance.state.prevState = "active";
      renderInstance.pressOutHandler();

      expect(renderInstance.state.state).toBe("active");
    });

    it("executes correct code on press if selection type is 'single'", () => {
      renderInstance.props = {
        config: {
          selectionType: "single"
        },
        mainContent: {
          value: "Test"
        },
        updateSelectedItems: mockCallback
      };

      renderInstance.pressHandler();

      expect(renderInstance.state.prevState).toBe("active");
      expect(renderInstance.state.state).toBe("active");
      expect(renderInstance.props.updateSelectedItems).toHaveBeenCalled();
    });

    it("executes correct code on press if selection type is 'radio'", () => {
      renderInstance.props = {
        config: {
          selectionType: "single"
        },
        mainContent: {
          value: "Test"
        },
        updateSelectedItems: mockCallback
      };
      renderInstance.radioRef = { setCheckedIndex: mockCallback };

      renderInstance.pressHandler();

      expect(renderInstance.state.prevState).toBe("active");
      expect(renderInstance.state.state).toBe("active");
      expect(renderInstance.radioRef.setCheckedIndex).toHaveBeenCalled();
      expect(renderInstance.props.updateSelectedItems).toHaveBeenCalled();
    });

    it("executes correct code on press if selection type is 'multiple'", () => {
      renderInstance.props = {
        config: {
          selectionType: "multiple"
        },
        mainContent: {
          value: "Test"
        },
        updateSelectedItems: mockCallback
      };
      renderInstance.setState({ prevState: "default" });

      renderInstance.pressHandler();

      expect(renderInstance.state.prevState).toBe("active");
      expect(renderInstance.state.state).toBe("active");
      expect(renderInstance.state.newSelectedState).toBe(true);
      expect(renderInstance.props.updateSelectedItems).toHaveBeenCalled();
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

      renderInstance.pressHandler();

      expect(renderInstance.state.prevState).toBe("active");
      expect(renderInstance.state.state).toBe("active");
      expect(renderInstance.state.newSelectedState).toBe(true);
      expect(renderInstance.props.updateSelectedItems).toHaveBeenCalled();
    });

    it("executes correct code on press if selection type is not defined", () => {
      renderInstance.props = {
        config: {
          selectionType: undefined
        }
      };
      const res = renderInstance.pressHandler();

      expect(res).toBe(false);
    });

    it("gets item height", () => {
      renderInstance.props.getItemHeight = mockCallback;
      renderInstance.getItemHeight({ height: 10 });
      
      expect(renderInstance.props.getItemHeight).toHaveBeenCalledWith(10);
    });
  });

  describe("state changing", () => {
    it("sets correct initial state if it's disabled", () => {
      render.setProps({
        mainContent: {
          isDisabled: true,
          main: {
            control: {}
          }
        }
      });
      const res = renderInstance.setInitialState();

      expect(res).toBe("disabled");
    });

    it("sets correct initial state if it's not disabled, and not selected", () => {
      render.setProps({
        mainContent: {
          isDisabled: false,
          isSelected: false,
          main: {
            control: {}
          }
        }
      });
      const res = renderInstance.setInitialState();

      expect(res).toBe("default");
    });

    it("sets correct initial state if it's not disabled, and selected", () => {
      render.setProps({
        mainContent: {
          isDisabled: false,
          isSelected: true,
          main: {
            control: {}
          }
        }
      });
      const res = renderInstance.setInitialState();

      expect(res).toBe("active");
    });

    it("creates refs if it's a control", () => {
      render.setProps({
        mainContent: {
          main: {
            control: {}
          }
        }
      });
      renderInstance.createRefs();

      expect(renderInstance.radioRef).toBeDefined();
      expect(renderInstance.checkboxRef).toBeDefined();
    });

    it("returns false if it's not a control", () => {
      render.setProps({
        mainContent: {
          main: {
            control: undefined,
            props: {
              children: []
            }
          }
        }
      });
      const res = renderInstance.createRefs();

      expect(res).toBe(false);
    });

    it("sets the radio ref", () => {
      renderInstance.setRadioRef("ref");

      expect(renderInstance.radioRef).toBe("ref");
    });

    it("sets the checkbox ref", () => {
      renderInstance.setCheckboxRef("ref");

      expect(renderInstance.checkboxRef).toBe("ref");
    });

    it("sets main content if it's not a control type", () => {
      renderInstance.props = {
        mainContent: {
          main: {}
        }
      };
      renderInstance.setMainContent();

      expect(renderInstance.state.mainContent).toBeDefined();
    });

    it("sets main content if it's a control of type 'radio'", () => {
      renderInstance.props = {
        config: {
          selectionType: "radio"
        },
        mainContent: {
          main: {
            control: {
              type: "radio"
            }
          }
        }
      };
      renderInstance.setMainContent();

      expect(renderInstance.state.mainContent).toBeDefined();
    });

    it("sets main content if it's a control of type 'checkbox'", () => {
      renderInstance.props = {
        config: {
          selectionType: "checkbox"
        },
        mainContent: {
          main: {
            control: {
              type: "checkbox"
            }
          }
        }
      };
      renderInstance.setMainContent();

      expect(renderInstance.state.mainContent).toBeDefined();
    });

    it("sets main content if it's a control of type not defined", () => {
      renderInstance.props = {
        mainContent: {
          main: {
            control: {
              type: undefined
            }
          }
        }
      };
      const res = renderInstance.setMainContent();

      expect(res).toBe(false);
    });
  });

  describe("styling", () => {
    it("returns an empty active styles object if selection type is 'radio' or 'checkbox'", () => {
      renderInstance.props = {
        config: {
          selectionType: "radio"
        }
      };
      const returnedStyles = renderInstance.getActiveStyles();
      
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
      const returnedStyles = renderInstance.getActiveStyles();
      
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
      const returnedStyles = renderInstance.getActiveStyles();
      
      expect(returnedStyles).toEqual({ ...ListStyles.box.state.default });
    });

    it("returns an empty focus styles object if selection type is 'radio' or 'checkbox'", () => {
      renderInstance.props = {
        config: {
          selectionType: "radio"
        }
      };
      const returnedStyles = renderInstance.getFocusStyles();
      
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
      const returnedStyles = renderInstance.getFocusStyles();
      
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
      renderInstance.state.state = "focus";
      const returnedStyles = renderInstance.getFocusStyles();
      
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
      renderInstance.state.state = "default";
      const returnedStyles = renderInstance.getFocusStyles();
      
      expect(returnedStyles).toEqual({ ...ListStyles.box.state.default });
    });

    it("returns an empty disabled styles object if its state is not defined like so", () => {
      renderInstance.props = {
        mainContent: {
          isDisabled: false
        }
      };
      const returnedStyles = renderInstance.getDisabledStyles();
      
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
      const returnedStyles = renderInstance.getDisabledStyles();
      
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
      renderInstance.checkMainContentStyles();
      
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
      renderInstance.checkMainContentStyles();
      
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
      renderInstance.checkMainContentStyles();
      
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
      renderInstance.checkMainContentStyles();
      
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
      renderInstance.checkMainContentStyles();
      
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
      renderInstance.checkMainContentStyles();
      
      expect(renderInstance.props.mainContent.main.props.children[0].props.style.color).toBe("#000000");
    });

    it("returns an empty object if it's a control", () => {
      render.setProps({
        mainContent: {
          main: {
            control: {}
          }
        }
      });
      const returnedStyles = renderInstance.getOriginalStyles();

      expect(returnedStyles).toEqual({});
    });

    it("returns correct styles if it's not a control, it's not an array, and it's not a radio or checkbox", () => {
      render.setProps({
        mainContent: {
          main: {
            control: undefined,
            type: {
              displayName: "PackenText"
            },
            props: {
              style: {
                color: "#FFFFFF"
              },
              children: "Test"
            }
          }
        }
      });
      renderInstance.props.mainContent.main.props.style.color = "#FFFFFF";
      const returnedStyles = renderInstance.getOriginalStyles();

      expect(returnedStyles).toEqual({ color: "#FFFFFF" });
    });

    it("returns correct styles if it's not a control, it's an array, and it's not a radio or checkbox", () => {
      renderInstance.props = {
        mainContent: {
          main: {
            control: undefined,
            type: {
              displayName: "PackenText"
            },
            props: {
              children: [
                {
                  type: { displayName: "PackenText" },
                  props: { style: { color: "#FFFFFF" } }
                },
                {
                  type: { displayName: "PackenText" },
                  props: { style: { color: "#FFFFFF" } }
                }
              ]
            }
          }
        }
      };
      renderInstance.state = {
        ...renderInstance.state,
        originalStyles: [
          { color: "#FFFFFF" },
          { color: "#FFFFFF" }
        ]
      };
      const returnedStyles = renderInstance.getOriginalStyles();

      expect(returnedStyles).toEqual([
        { color: "#FFFFFF" },
        { color: "#FFFFFF" }
      ]);
    });
  });
});