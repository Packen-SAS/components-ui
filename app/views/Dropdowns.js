import React, { Component } from "react";
import { View } from "react-native";

import Section from "../components/Section";
import SectionStyles from "../styles/components/Section";

import Colors from "../styles/abstracts/colors";

import PackenDropdown from "../components/PackenDropdown";
import PackenTag from "../components/PackenTag";
import PackenText from "../components/PackenText";

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
              main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Bogotá, D.C.</PackenText>)
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
              main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Medellín</PackenText>)
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
              main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Bucaramanga</PackenText>)
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
              main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Santa Marta</PackenText>)
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
              main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Cali</PackenText>)
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
              main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Cartagena</PackenText>)
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
              main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Leticia</PackenText>)
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Bogotá, D.C.</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Medellín</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Bucaramanga</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Santa Marta</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Cali</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Cartagena</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Leticia</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
              main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Bogotá, D.C.</PackenText>)
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
              main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Medellín</PackenText>)
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
              main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Bucaramanga</PackenText>)
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
              main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Santa Marta</PackenText>)
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
              main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Cali</PackenText>)
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
              main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Cartagena</PackenText>)
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
              main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Leticia</PackenText>)
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Bogotá, D.C.</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Medellín</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Bucaramanga</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Santa Marta</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Cali</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Cartagena</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Leticia</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Bogotá, D.C.</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Medellín</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Bucaramanga</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Santa Marta</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Cali</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Cartagena</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Leticia</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Bogotá, D.C.</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Medellín</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Bucaramanga</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Santa Marta</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Cali</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Cartagena</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Leticia</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Bogotá, D.C.</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Medellín</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Bucaramanga</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Santa Marta</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Cali</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Cartagena</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Leticia</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Bogotá, D.C.</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Medellín</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Bucaramanga</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Santa Marta</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Cali</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Cartagena</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Leticia</PackenText>
                  <PackenText style={{ color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
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
                  notifyParent: () => { return; }
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
                  notifyParent: () => { return; }
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
                  notifyParent: () => { return; }
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
                  notifyParent: () => { return; }
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
                  notifyParent: () => { return; }
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
                  notifyParent: () => { return; }
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
                  notifyParent: () => { return; }
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

  render() {
    return (
      <Section title="Dropdowns">
        <View style={SectionStyles.section__content}>
          <View style={{ marginBottom: 20 }}>
            <PackenDropdown
              size="medium"
              list={this.state.menus.simple}
              input={{
                label: "Single selection",
                placeholder: "Selecciona tu ciudad",
                onChangeText: () => { return; },
                icon: {
                  name: "chevron-down",
                  position: "right",
                  style: { color: Colors.brand.primary.drk }
                },
                theme: "default",
                nonEditable: true,
                help: "Help text"
              }}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <PackenDropdown
              size="medium"
              list={this.state.menus.mulitple}
              input={{
                label: "Multiple selections",
                placeholder: "Selecciona tu ciudad",
                onChangeText: () => { return; },
                icon: {
                  name: "chevron-down",
                  position: "right",
                  style: { color: Colors.brand.primary.drk }
                },
                theme: "default",
                nonEditable: true
              }}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <PackenDropdown
              size="medium"
              list={this.state.menus.info}
              input={{
                label: "Single information selection",
                placeholder: "Selecciona tu ciudad",
                onChangeText: () => { return; },
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
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <PackenDropdown
              size="medium"
              list={this.state.menus.avatarsAlt}
              input={{
                label: "Multiple avatars selection",
                placeholder: "Selecciona el usuario",
                onChangeText: () => { return; },
                icon: {
                  name: "chevron-down",
                  position: "right",
                  style: { color: Colors.brand.primary.drk }
                },
                theme: "default",
                nonEditable: true
              }}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <PackenDropdown
              size="medium"
              list={this.state.menus.avatarsInfo}
              input={{
                label: "Single avatar + info selection",
                placeholder: "Selecciona el usuario",
                onChangeText: () => { return; },
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
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <PackenDropdown
              isDisabled
              size="medium"
              list={this.state.menus.avatars}
              input={{
                label: "Disabled selection",
                placeholder: "Selecciona el usuario",
                onChangeText: () => { return; },
                icon: {
                  name: "chevron-down",
                  position: "right"
                },
                theme: "default",
                nonEditable: true
              }}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <PackenDropdown
              size="medium"
              list={this.state.menus.icons}
              input={{
                label: "Multiple icon selection",
                placeholder: "Selecciona tu ciudad",
                onChangeText: () => { return; },
                icon: {
                  name: "chevron-down",
                  position: "right",
                  style: { color: Colors.brand.primary.drk }
                },
                theme: "default",
                nonEditable: true
              }}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <PackenDropdown
              size="medium"
              list={this.state.menus.iconsAlt}
              input={{
                label: "Single icon selection",
                placeholder: "Selecciona tu ciudad",
                onChangeText: () => { return; },
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
            />
          </View>          
          <View style={{ marginBottom: 20 }}>
            <PackenDropdown
              size="medium"
              list={this.state.menus.iconsLeft}
              input={{
                label: "Single icon + check selection",
                placeholder: "Selecciona tu ciudad",
                onChangeText: () => { return; },
                icon: {
                  name: "chevron-down",
                  position: "right"
                },
                theme: "primary",
                nonEditable: true
              }}
            />
          </View>          
          <View style={{ marginBottom: 20 }}>
            <PackenDropdown
              size="medium"
              list={this.state.menus.iconsBoth}
              input={{
                label: "Double icon selection",
                placeholder: "Selecciona tu ciudad",
                onChangeText: () => { return; },
                icon: {
                  name: "chevron-down",
                  position: "right"
                },
                theme: "primary",
                nonEditable: true
              }}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <PackenDropdown
              size="medium"
              list={this.state.menus.radio}
              input={{
                label: "Radio selection",
                placeholder: "Selecciona tu ciudad",
                onChangeText: () => { return; },
                icon: {
                  name: "chevron-down",
                  position: "right",
                  style: { color: Colors.brand.primary.drk }
                },
                theme: "default",
                nonEditable: true
              }}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <PackenDropdown
              size="medium"
              list={this.state.menus.checkboxes}
              input={{
                label: "Checkbox selection",
                placeholder: "Selecciona tu ciudad",
                onChangeText: () => { return; },
                icon: {
                  name: "chevron-down",
                  position: "right",
                  style: { color: Colors.brand.primary.drk }
                },
                theme: "default",
                nonEditable: true
              }}
            />
          </View>
        </View>
      </Section>
    );
  }
}

export default Dropdowns;