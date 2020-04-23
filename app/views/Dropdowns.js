import React, { Component } from "react";
import { View } from "react-native";

import Colors from "../styles/abstracts/colors";

import Section from "../components/Section";
import PageView from "./PageView";

import PackenUiDropdown from "../components/PackenUiDropdown";
import PackenUiText from "../components/PackenUiText";

import { genKey } from "../utils";

class Dropdowns extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: {
        simple: {
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
              main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Bogotá, D.C.</PackenUiText>)
            },
            {
              key: genKey(),
              left: false,
              right: false,
              value: "Medellín",
              isSelected: false,
              main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Medellín</PackenUiText>)
            },
            {
              key: genKey(),
              left: false,
              right: false,
              value: "Bucaramanga",
              isSelected: false,
              isDisabled: true,
              main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Bucaramanga</PackenUiText>)
            },
            {
              key: genKey(),
              left: false,
              right: false,
              value: "Santa Marta",
              isSelected: false,
              main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Santa Marta</PackenUiText>)
            },
            {
              key: genKey(),
              left: false,
              right: false,
              value: "Cali",
              isSelected: false,
              main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Cali</PackenUiText>)
            },
            {
              key: genKey(),
              left: false,
              right: false,
              value: "Cartagena",
              isSelected: false,
              main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Cartagena</PackenUiText>)
            },
            {
              key: genKey(),
              left: false,
              right: false,
              value: "Leticia",
              isSelected: false,
              main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Leticia</PackenUiText>)
            }
          ]
        },
        mulitple: {
          config: {
            size: "medium",
            checkedIcon: "check",
            selectionType: "multiple"
          },
          items: [
            {
              key: genKey(),
              left: false,
              right: false,
              value: "Bogotá, D.C.",
              isSelected: false,
              main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Bogotá, D.C.</PackenUiText>)
            },
            {
              key: genKey(),
              left: false,
              right: false,
              value: "Test",
              isSelected: false,
              main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Test</PackenUiText>)
            },
            {
              key: genKey(),
              left: false,
              right: false,
              value: "Test 2",
              isSelected: false,
              main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Test 2</PackenUiText>)
            },
            {
              key: genKey(),
              left: false,
              right: false,
              value: "Test 3",
              isSelected: false,
              main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Test 3</PackenUiText>)
            },
            {
              key: genKey(),
              left: false,
              right: false,
              value: "Lorem ipsum dolor sit amet consectetur adipiscing elit!",
              isSelected: false,
              main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Lorem ipsum dolor sit amet consectetur adipiscing elit!</PackenUiText>)
            },
            {
              key: genKey(),
              left: false,
              right: false,
              value: "Medellín",
              isSelected: false,
              main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Medellín</PackenUiText>)
            },
            {
              key: genKey(),
              left: false,
              right: false,
              value: "Bucaramanga",
              isSelected: false,
              isDisabled: true,
              main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Bucaramanga</PackenUiText>)
            },
            {
              key: genKey(),
              left: false,
              right: false,
              value: "Santa Marta",
              isSelected: false,
              main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Santa Marta</PackenUiText>)
            },
            {
              key: genKey(),
              left: false,
              right: false,
              value: "Cali",
              isSelected: false,
              main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Cali</PackenUiText>)
            },
            {
              key: genKey(),
              left: false,
              right: false,
              value: "Cartagena",
              isSelected: false,
              main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Cartagena</PackenUiText>)
            },
            {
              key: genKey(),
              left: false,
              right: false,
              value: "Leticia",
              isSelected: false,
              main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Leticia</PackenUiText>)
            }
          ]
        },
        avatarsAlt: {
          config: {
            size: "medium",
            selectionType: "multiple"
          },
          items: [
            {
              key: genKey(),
              left: {
                type: "avatar",
                config: {
                  size: "small",
                  src: require("../../assets/images/avatar.jpg")
                }
              },
              right: false,
              value: "Bogotá, D.C.",
              isSelected: false,
              main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Bogotá, D.C.</PackenUiText>)
            },
            {
              key: genKey(),
              left: {
                type: "avatar",
                config: {
                  size: "small",
                  src: require("../../assets/images/avatar.jpg")
                }
              },
              right: false,
              value: "Medellín",
              isSelected: false,
              main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Medellín</PackenUiText>)
            },
            {
              key: genKey(),
              left: {
                type: "avatar",
                config: {
                  size: "small",
                  src: require("../../assets/images/avatar.jpg")
                }
              },
              right: false,
              value: "Bucaramanga",
              isSelected: false,
              isDisabled: true,
              main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Bucaramanga</PackenUiText>)
            },
            {
              key: genKey(),
              left: {
                type: "avatar",
                config: {
                  size: "small",
                  src: require("../../assets/images/avatar.jpg")
                }
              },
              right: false,
              value: "Santa Marta",
              isSelected: false,
              main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Santa Marta</PackenUiText>)
            },
            {
              key: genKey(),
              left: {
                type: "avatar",
                config: {
                  size: "small",
                  src: require("../../assets/images/avatar.jpg")
                }
              },
              right: false,
              value: "Cali",
              isSelected: false,
              main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Cali</PackenUiText>)
            },
            {
              key: genKey(),
              left: {
                type: "avatar",
                config: {
                  size: "small",
                  src: require("../../assets/images/avatar.jpg")
                }
              },
              right: false,
              value: "Cartagena",
              isSelected: false,
              main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Cartagena</PackenUiText>)
            },
            {
              key: genKey(),
              left: {
                type: "avatar",
                config: {
                  size: "small",
                  src: require("../../assets/images/avatar.jpg")
                }
              },
              right: false,
              value: "Leticia",
              isSelected: false,
              main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Leticia</PackenUiText>)
            }
          ]
        },
        avatarsInfo: {
          config: {
            size: "medium",
            selectionType: "single"
          },
          items: [
            {
              key: genKey(),
              left: {
                type: "avatar",
                config: {
                  size: "small",
                  src: require("../../assets/images/avatar.jpg")
                }
              },
              right: false,
              value: "Bogotá, D.C.",
              isSelected: false,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Bogotá, D.C.</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            },
            {
              key: genKey(),
              left: {
                type: "avatar",
                config: {
                  size: "small",
                  src: require("../../assets/images/avatar.jpg")
                }
              },
              right: false,
              value: "Medellín",
              isSelected: false,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Medellín</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            },
            {
              key: genKey(),
              left: {
                type: "avatar",
                config: {
                  size: "small",
                  src: require("../../assets/images/avatar.jpg")
                }
              },
              right: false,
              value: "Bucaramanga",
              isSelected: false,
              isDisabled: true,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Bucaramanga</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            },
            {
              key: genKey(),
              left: {
                type: "avatar",
                config: {
                  size: "small",
                  src: require("../../assets/images/avatar.jpg")
                }
              },
              right: false,
              value: "Santa Marta",
              isSelected: false,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Santa Marta</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            },
            {
              key: genKey(),
              left: {
                type: "avatar",
                config: {
                  size: "small",
                  src: require("../../assets/images/avatar.jpg")
                }
              },
              right: false,
              value: "Cali",
              isSelected: false,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Cali</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            },
            {
              key: genKey(),
              left: {
                type: "avatar",
                config: {
                  size: "small",
                  src: require("../../assets/images/avatar.jpg")
                }
              },
              right: false,
              value: "Cartagena",
              isSelected: false,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Cartagena</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            },
            {
              key: genKey(),
              left: {
                type: "avatar",
                config: {
                  size: "small",
                  src: require("../../assets/images/avatar.jpg")
                }
              },
              right: false,
              value: "Leticia",
              isSelected: false,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Leticia</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            }
          ]
        },
        avatars: {
          config: {
            size: "medium",
            selectionType: "single"
          },
          items: [
            {
              key: genKey(),
              right: {
                type: "avatar",
                config: {
                  size: "small",
                  src: require("../../assets/images/avatar.jpg")
                }
              },
              left: false,
              value: "Bogotá, D.C.",
              isSelected: false,
              main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Bogotá, D.C.</PackenUiText>)
            },
            {
              key: genKey(),
              right: {
                type: "avatar",
                config: {
                  size: "small",
                  src: require("../../assets/images/avatar.jpg")
                }
              },
              left: false,
              value: "Medellín",
              isSelected: false,
              main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Medellín</PackenUiText>)
            },
            {
              key: genKey(),
              right: {
                type: "avatar",
                config: {
                  size: "small",
                  src: require("../../assets/images/avatar.jpg")
                }
              },
              left: false,
              value: "Bucaramanga",
              isSelected: false,
              isDisabled: true,
              main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Bucaramanga</PackenUiText>)
            },
            {
              key: genKey(),
              right: {
                type: "avatar",
                config: {
                  size: "small",
                  src: require("../../assets/images/avatar.jpg")
                }
              },
              left: false,
              value: "Santa Marta",
              isSelected: false,
              main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Santa Marta</PackenUiText>)
            },
            {
              key: genKey(),
              right: {
                type: "avatar",
                config: {
                  size: "small",
                  src: require("../../assets/images/avatar.jpg")
                }
              },
              left: false,
              value: "Cali",
              isSelected: false,
              main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Cali</PackenUiText>)
            },
            {
              key: genKey(),
              right: {
                type: "avatar",
                config: {
                  size: "small",
                  src: require("../../assets/images/avatar.jpg")
                }
              },
              left: false,
              value: "Cartagena",
              isSelected: false,
              main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Cartagena</PackenUiText>)
            },
            {
              key: genKey(),
              right: {
                type: "avatar",
                config: {
                  size: "small",
                  src: require("../../assets/images/avatar.jpg")
                }
              },
              left: false,
              value: "Leticia",
              isSelected: false,
              main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Leticia</PackenUiText>)
            }
          ]
        },
        info: {
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
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Bogotá, D.C.</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            },
            {
              key: genKey(),
              left: false,
              right: false,
              value: "Medellín",
              isSelected: false,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Medellín</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            },
            {
              key: genKey(),
              left: false,
              right: false,
              value: "Bucaramanga",
              isSelected: false,
              isDisabled: true,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Bucaramanga</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            },
            {
              key: genKey(),
              left: false,
              right: false,
              value: "Santa Marta",
              isSelected: false,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Santa Marta</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            },
            {
              key: genKey(),
              left: false,
              right: false,
              value: "Cali",
              isSelected: false,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Cali</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            },
            {
              key: genKey(),
              left: false,
              right: false,
              value: "Cartagena",
              isSelected: false,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Cartagena</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            },
            {
              key: genKey(),
              left: false,
              right: false,
              value: "Leticia",
              isSelected: false,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Leticia</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            }
          ]
        },
        icons: {
          config: {
            size: "medium",
            selectionType: "multiple"
          },
          items: [
            {
              key: genKey(),
              left: {
                type: "icon",
                config: {
                  name: "arrow-up"
                }
              },
              right: false,
              value: "Bogotá, D.C.",
              isSelected: false,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Bogotá, D.C.</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            },
            {
              key: genKey(),
              left: {
                type: "icon",
                config: {
                  name: "arrow-up"
                }
              },
              right: false,
              value: "Medellín",
              isSelected: false,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Medellín</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            },
            {
              key: genKey(),
              left: {
                type: "icon",
                config: {
                  name: "arrow-up"
                }
              },
              right: false,
              value: "Bucaramanga",
              isSelected: false,
              isDisabled: true,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Bucaramanga</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            },
            {
              key: genKey(),
              left: {
                type: "icon",
                config: {
                  name: "arrow-up"
                }
              },
              right: false,
              value: "Santa Marta",
              isSelected: false,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Santa Marta</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            },
            {
              key: genKey(),
              left: {
                type: "icon",
                config: {
                  name: "arrow-up"
                }
              },
              right: false,
              value: "Cali",
              isSelected: false,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Cali</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            },
            {
              key: genKey(),
              left: {
                type: "icon",
                config: {
                  name: "arrow-up"
                }
              },
              right: false,
              value: "Cartagena",
              isSelected: false,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Cartagena</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            },
            {
              key: genKey(),
              left: {
                type: "icon",
                config: {
                  name: "arrow-up"
                }
              },
              right: false,
              value: "Leticia",
              isSelected: false,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Leticia</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            }
          ]
        },
        iconsAlt: {
          config: {
            size: "medium",
            selectionType: "single"
          },
          items: [
            {
              key: genKey(),
              right: {
                type: "icon",
                config: {
                  name: "arrow-up"
                }
              },
              left: false,
              value: "Bogotá, D.C.",
              isSelected: false,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Bogotá, D.C.</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            },
            {
              key: genKey(),
              right: {
                type: "icon",
                config: {
                  name: "arrow-up"
                }
              },
              left: false,
              value: "Medellín",
              isSelected: false,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Medellín</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            },
            {
              key: genKey(),
              right: {
                type: "icon",
                config: {
                  name: "arrow-up"
                }
              },
              left: false,
              value: "Bucaramanga",
              isSelected: false,
              isDisabled: true,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Bucaramanga</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            },
            {
              key: genKey(),
              right: {
                type: "icon",
                config: {
                  name: "arrow-up"
                }
              },
              left: false,
              value: "Santa Marta",
              isSelected: false,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Santa Marta</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            },
            {
              key: genKey(),
              right: {
                type: "icon",
                config: {
                  name: "arrow-up"
                }
              },
              left: false,
              value: "Cali",
              isSelected: false,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Cali</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            },
            {
              key: genKey(),
              right: {
                type: "icon",
                config: {
                  name: "arrow-up"
                }
              },
              left: false,
              value: "Cartagena",
              isSelected: false,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Cartagena</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            },
            {
              key: genKey(),
              right: {
                type: "icon",
                config: {
                  name: "arrow-up"
                }
              },
              left: false,
              value: "Leticia",
              isSelected: false,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Leticia</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            }
          ]
        },
        iconsLeft: {
          config: {
            size: "medium",
            checkedIcon: "check",
            selectionType: "single"
          },
          items: [
            {
              key: genKey(),
              left: {
                type: "icon",
                config: {
                  name: "arrow-up"
                }
              },
              right: false,
              value: "Bogotá, D.C.",
              isSelected: false,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Bogotá, D.C.</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            },
            {
              key: genKey(),
              left: {
                type: "icon",
                config: {
                  name: "arrow-up"
                }
              },
              right: false,
              value: "Medellín",
              isSelected: false,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Medellín</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            },
            {
              key: genKey(),
              left: {
                type: "icon",
                config: {
                  name: "arrow-up"
                }
              },
              right: false,
              value: "Bucaramanga",
              isSelected: false,
              isDisabled: true,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Bucaramanga</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            },
            {
              key: genKey(),
              left: {
                type: "icon",
                config: {
                  name: "arrow-up"
                }
              },
              right: false,
              value: "Santa Marta",
              isSelected: false,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Santa Marta</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            },
            {
              key: genKey(),
              left: {
                type: "icon",
                config: {
                  name: "arrow-up"
                }
              },
              right: false,
              value: "Cali",
              isSelected: false,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Cali</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            },
            {
              key: genKey(),
              left: {
                type: "icon",
                config: {
                  name: "arrow-up"
                }
              },
              right: false,
              value: "Cartagena",
              isSelected: false,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Cartagena</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            },
            {
              key: genKey(),
              left: {
                type: "icon",
                config: {
                  name: "arrow-up"
                }
              },
              right: false,
              value: "Leticia",
              isSelected: false,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Leticia</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            }
          ]
        },
        iconsBoth: {
          config: {
            size: "medium",
            selectionType: "single"
          },
          items: [
            {
              key: genKey(),
              left: {
                type: "icon",
                config: {
                  name: "arrow-up"
                }
              },
              right: {
                type: "icon",
                config: {
                  name: "arrow-down"
                }
              },
              value: "Bogotá, D.C.",
              isSelected: false,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Bogotá, D.C.</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            },
            {
              key: genKey(),
              left: {
                type: "icon",
                config: {
                  name: "arrow-up"
                }
              },
              right: {
                type: "icon",
                config: {
                  name: "arrow-down"
                }
              },
              value: "Medellín",
              isSelected: false,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Medellín</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            },
            {
              key: genKey(),
              left: {
                type: "icon",
                config: {
                  name: "arrow-up"
                }
              },
              right: {
                type: "icon",
                config: {
                  name: "arrow-down"
                }
              },
              value: "Bucaramanga",
              isSelected: false,
              isDisabled: true,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Bucaramanga</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            },
            {
              key: genKey(),
              left: {
                type: "icon",
                config: {
                  name: "arrow-up"
                }
              },
              right: {
                type: "icon",
                config: {
                  name: "arrow-down"
                }
              },
              value: "Santa Marta",
              isSelected: false,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Santa Marta</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            },
            {
              key: genKey(),
              left: {
                type: "icon",
                config: {
                  name: "arrow-up"
                }
              },
              right: {
                type: "icon",
                config: {
                  name: "arrow-down"
                }
              },
              value: "Cali",
              isSelected: false,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Cali</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            },
            {
              key: genKey(),
              left: {
                type: "icon",
                config: {
                  name: "arrow-up"
                }
              },
              right: {
                type: "icon",
                config: {
                  name: "arrow-down"
                }
              },
              value: "Cartagena",
              isSelected: false,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Cartagena</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            },
            {
              key: genKey(),
              left: {
                type: "icon",
                config: {
                  name: "arrow-up"
                }
              },
              right: {
                type: "icon",
                config: {
                  name: "arrow-down"
                }
              },
              value: "Leticia",
              isSelected: false,
              main: (
                <>
                  <PackenUiText style={{ color: Colors.basic.independence.dft }}>Leticia</PackenUiText>
                  <PackenUiText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenUiText>
                </>
              )
            }
          ]
        },
        checkboxes: {
          config: {
            size: "medium",
            selectionType: "checkbox"
          },
          items: [
            {
              key: genKey(),
              left: false,
              right: false,
              value: "Bogotá, D.C.",
              isSelected: false,
              main: {
                control: {
                  type: "checkbox",
                  layout: "dropdown",
                  items: [{ isChecked: false, label: "Bogotá, D.C.", isDisabled: false }],
                  notifyParent: this.mockCallback
                }
              }
            },
            {
              key: genKey(),
              left: false,
              right: false,
              value: "Medellín",
              isSelected: false,
              main: {
                control: {
                  type: "checkbox",
                  layout: "dropdown",
                  items: [{ isChecked: false, label: "Medellín", isDisabled: false }],
                  notifyParent: this.mockCallback
                }
              }
            },
            {
              key: genKey(),
              left: false,
              right: false,
              value: "Bucaramanga",
              isSelected: false,
              isDisabled: true,
              main: {
                control: {
                  type: "checkbox",
                  layout: "dropdown",
                  items: [{ isChecked: false, label: "Bucaramanga", isDisabled: true }],
                  notifyParent: this.mockCallback
                }
              }
            },
            {
              key: genKey(),
              left: false,
              right: false,
              value: "Santa Marta",
              isSelected: false,
              main: {
                control: {
                  type: "checkbox",
                  layout: "dropdown",
                  items: [{ isChecked: false, label: "Santa Marta", isDisabled: false }],
                  notifyParent: this.mockCallback
                }
              }
            },
            {
              key: genKey(),
              left: false,
              right: false,
              value: "Cali",
              isSelected: false,
              main: {
                control: {
                  type: "checkbox",
                  layout: "dropdown",
                  items: [{ isChecked: false, label: "Cali", isDisabled: false }],
                  notifyParent: this.mockCallback
                }
              }
            },
            {
              key: genKey(),
              left: false,
              right: false,
              value: "Cartagena",
              isSelected: false,
              main: {
                control: {
                  type: "checkbox",
                  layout: "dropdown",
                  items: [{ isChecked: false, label: "Cartagena", isDisabled: false }],
                  notifyParent: this.mockCallback
                }
              }
            },
            {
              key: genKey(),
              left: false,
              right: false,
              value: "Leticia",
              isSelected: false,
              main: {
                control: {
                  type: "checkbox",
                  layout: "dropdown",
                  items: [{ isChecked: false, label: "Leticia", isDisabled: false }],
                  notifyParent: this.mockCallback
                }
              }
            }
          ]
        },
        radio: {
          config: {
            size: "medium",
            selectionType: "radio"
          },
          items: [
            {
              key: genKey(),
              left: false,
              right: false,
              value: "Bogotá, D.C.",
              isSelected: false,
              main: {
                control: {
                  type: "radio",
                  label: "Bogotá, D.C.",
                  isDisabled: false
                }
              }
            },
            {
              key: genKey(),
              left: false,
              right: false,
              value: "Medellín",
              isSelected: false,
              main: {
                control: {
                  type: "radio",
                  label: "Medellín",
                  isDisabled: false
                }
              }
            },
            {
              key: genKey(),
              left: false,
              right: false,
              value: "Bucaramanga",
              isSelected: false,
              isDisabled: true,
              main: {
                control: {
                  type: "radio",
                  label: "Bucaramanga",
                  isDisabled: true
                }
              }
            },
            {
              key: genKey(),
              left: false,
              right: false,
              value: "Santa Marta",
              isSelected: false,
              main: {
                control: {
                  type: "radio",
                  label: "Santa Marta",
                  isDisabled: false
                }
              }
            },
            {
              key: genKey(),
              left: false,
              right: false,
              value: "Cali",
              isSelected: false,
              main: {
                control: {
                  type: "radio",
                  label: "Cali",
                  isDisabled: false
                }
              }
            },
            {
              key: genKey(),
              left: false,
              right: false,
              value: "Cartagena",
              isSelected: false,
              main: {
                control: {
                  type: "radio",
                  label: "Cartagena",
                  isDisabled: false
                }
              }
            },
            {
              key: genKey(),
              left: false,
              right: false,
              value: "Leticia",
              isSelected: false,
              main: {
                control: {
                  type: "radio",
                  label: "Leticia",
                  isDisabled: false
                }
              }
            }
          ]
        }
      }
    }
  }

  mockCallback = () => { return true; }

  changeHandler = (name, newSelection) => {
    /* New selection can be used here */
    /* console.log(name, newSelection); */
    return {
      id: name,
      value: newSelection
    }
  }

  render() {
    return (
      <PageView>  
        <Section title="Dropdowns">
          <View style={{ marginTop: 20 }}>
            <View style={{ marginBottom: 20 }}>
              <PackenUiDropdown
                size="medium"
                list={this.state.menus.simple}
                input={{
                  label: "Single selection",
                  placeholder: "Selecciona tu ciudad",
                  onChangeText: this.mockCallback,
                  icon: {
                    name: "chevron-down",
                    position: "right",
                    style: { color: Colors.brand.primary.drk }
                  },
                  theme: "default",
                  nonEditable: true,
                  help: "Help text"
                }}
                name="dropdown1"
                callback={this.changeHandler}
              />
            </View>
            <View style={{ marginBottom: 20 }}>
              <PackenUiDropdown
                size="medium"
                list={this.state.menus.mulitple}
                input={{
                  label: "Multiple selections",
                  placeholder: "Selecciona tu ciudad",
                  onChangeText: this.mockCallback,
                  icon: {
                    name: "chevron-down",
                    position: "right",
                    style: { color: Colors.brand.primary.drk }
                  },
                  theme: "default",
                  nonEditable: true
                }}
                name="dropdown2"
                callback={this.changeHandler}
              />
            </View>
            <View style={{ marginBottom: 20 }}>
              <PackenUiDropdown
                size="medium"
                list={this.state.menus.info}
                input={{
                  label: "Single information selection",
                  placeholder: "Selecciona tu ciudad",
                  onChangeText: this.mockCallback,
                  icon: {
                    name: "chevron-down",
                    position: "right"
                  },
                  theme: "success",
                  nonEditable: true,
                  message: {
                    text: "Caption text, description, error notification",
                    icon: "info"
                  }
                }}
                name="dropdown3"
                callback={this.changeHandler}
              />
            </View>
            <View style={{ marginBottom: 20 }}>
              <PackenUiDropdown
                size="medium"
                list={this.state.menus.avatarsAlt}
                input={{
                  label: "Multiple avatars selection",
                  placeholder: "Selecciona el usuario",
                  onChangeText: this.mockCallback,
                  icon: {
                    name: "chevron-down",
                    position: "right",
                    style: { color: Colors.brand.primary.drk }
                  },
                  theme: "default",
                  nonEditable: true
                }}
                name="dropdown4"
                callback={this.changeHandler}
              />
            </View>
            <View style={{ marginBottom: 20 }}>
              <PackenUiDropdown
                size="medium"
                list={this.state.menus.avatarsInfo}
                input={{
                  label: "Single avatar + info selection",
                  placeholder: "Selecciona el usuario",
                  onChangeText: this.mockCallback,
                  icon: {
                    name: "chevron-down",
                    position: "right",
                    style: { color: Colors.brand.primary.drk }
                  },
                  theme: "default",
                  nonEditable: true,
                  message: {
                    text: "Caption text, description, error notification",
                    icon: "info"
                  }
                }}
                name="dropdown5"
                callback={this.changeHandler}
              />
            </View>
            <View style={{ marginBottom: 20 }}>
              <PackenUiDropdown
                isDisabled
                size="medium"
                list={this.state.menus.avatars}
                input={{
                  label: "Disabled selection",
                  placeholder: "Selecciona el usuario",
                  onChangeText: this.mockCallback,
                  icon: {
                    name: "chevron-down",
                    position: "right"
                  },
                  theme: "default",
                  nonEditable: true
                }}
                name="dropdown6"
                callback={this.changeHandler}
              />
            </View>
            <View style={{ marginBottom: 20 }}>
              <PackenUiDropdown
                size="medium"
                list={this.state.menus.icons}
                input={{
                  label: "Multiple icon selection",
                  placeholder: "Selecciona tu ciudad",
                  onChangeText: this.mockCallback,
                  icon: {
                    name: "chevron-down",
                    position: "right",
                    style: { color: Colors.brand.primary.drk }
                  },
                  theme: "default",
                  nonEditable: true
                }}
                name="dropdown7"
                callback={this.changeHandler}
              />
            </View>
            <View style={{ marginBottom: 20 }}>
              <PackenUiDropdown
                size="medium"
                list={this.state.menus.iconsAlt}
                input={{
                  label: "Single icon selection",
                  placeholder: "Selecciona tu ciudad",
                  onChangeText: this.mockCallback,
                  icon: {
                    name: "chevron-down",
                    position: "right"
                  },
                  theme: "danger",
                  nonEditable: true,
                  help: "Error help text",
                  message: {
                    text: "Caption text, description, error notification",
                    icon: "info"
                  }
                }}
                name="dropdown8"
                callback={this.changeHandler}
              />
            </View>          
            <View style={{ marginBottom: 20 }}>
              <PackenUiDropdown
                size="medium"
                list={this.state.menus.iconsLeft}
                input={{
                  label: "Single icon + check selection",
                  placeholder: "Selecciona tu ciudad",
                  onChangeText: this.mockCallback,
                  icon: {
                    name: "chevron-down",
                    position: "right"
                  },
                  theme: "primary",
                  nonEditable: true
                }}
                name="dropdown9"
                callback={this.changeHandler}
              />
            </View>          
            <View style={{ marginBottom: 20 }}>
              <PackenUiDropdown
                size="medium"
                list={this.state.menus.iconsBoth}
                input={{
                  label: "Double icon selection",
                  placeholder: "Selecciona tu ciudad",
                  onChangeText: this.mockCallback,
                  icon: {
                    name: "chevron-down",
                    position: "right"
                  },
                  theme: "primary",
                  nonEditable: true
                }}
                name="dropdown10"
                callback={this.changeHandler}
              />
            </View>
            <View style={{ marginBottom: 20 }}>
              <PackenUiDropdown
                size="medium"
                list={this.state.menus.radio}
                input={{
                  label: "Radio selection",
                  placeholder: "Selecciona tu ciudad",
                  onChangeText: this.mockCallback,
                  icon: {
                    name: "chevron-down",
                    position: "right",
                    style: { color: Colors.brand.primary.drk }
                  },
                  theme: "default",
                  nonEditable: true
                }}
                name="dropdown11"
                callback={this.changeHandler}
              />
            </View>
            <View style={{ marginBottom: 20 }}>
              <PackenUiDropdown
                size="medium"
                list={this.state.menus.checkboxes}
                input={{
                  label: "Checkbox selection",
                  placeholder: "Selecciona tu ciudad",
                  onChangeText: this.mockCallback,
                  icon: {
                    name: "chevron-down",
                    position: "right",
                    style: { color: Colors.brand.primary.drk }
                  },
                  theme: "default",
                  nonEditable: true
                }}
                name="dropdown12"
                callback={this.changeHandler}
              />
            </View>
          </View>
        </Section>
      </PageView>
    );
  }
}

export default Dropdowns;