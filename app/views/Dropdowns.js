import React, { Component } from "react";
import { View } from "react-native";

import Section from "../components/Section";
import SectionStyles from "../styles/components/Section";

import Colors from "../styles/abstracts/colors";

import PackenDropdown from "../components/PackenDropdown";
import PackenTag from "../components/PackenTag";
import PackenText from "../components/PackenText";

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
              key: this.gen_key(),
              left: false,
              right: false,
              value: "Bogotá, D.C.",
              isSelected: false,
              main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Bogotá, D.C.</PackenText>)
            },
            {
              key: this.gen_key(),
              left: false,
              right: false,
              value: "Medellín",
              isSelected: false,
              main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Medellín</PackenText>)
            },
            {
              key: this.gen_key(),
              left: false,
              right: false,
              value: "Bucaramanga",
              isSelected: false,
              isDisabled: true,
              main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Bucaramanga</PackenText>)
            },
            {
              key: this.gen_key(),
              left: false,
              right: false,
              value: "Santa Marta",
              isSelected: false,
              main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Santa Marta</PackenText>)
            },
            {
              key: this.gen_key(),
              left: false,
              right: false,
              value: "Cali",
              isSelected: false,
              main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Cali</PackenText>)
            },
            {
              key: this.gen_key(),
              left: false,
              right: false,
              value: "Cartagena",
              isSelected: false,
              main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Cartagena</PackenText>)
            },
            {
              key: this.gen_key(),
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
              key: this.gen_key(),
              left: false,
              right: false,
              value: "Bogotá, D.C.",
              isSelected: false,
              main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Bogotá, D.C.</PackenText>)
            },
            {
              key: this.gen_key(),
              left: false,
              right: false,
              value: "Medellín",
              isSelected: false,
              main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Medellín</PackenText>)
            },
            {
              key: this.gen_key(),
              left: false,
              right: false,
              value: "Bucaramanga",
              isSelected: false,
              isDisabled: true,
              main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Bucaramanga</PackenText>)
            },
            {
              key: this.gen_key(),
              left: false,
              right: false,
              value: "Santa Marta",
              isSelected: false,
              main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Santa Marta</PackenText>)
            },
            {
              key: this.gen_key(),
              left: false,
              right: false,
              value: "Cali",
              isSelected: false,
              main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Cali</PackenText>)
            },
            {
              key: this.gen_key(),
              left: false,
              right: false,
              value: "Cartagena",
              isSelected: false,
              main: (<PackenText style={{ color: Colors.basic.independence.dft }}>Cartagena</PackenText>)
            },
            {
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
        tags: {
          config: {
            size: "medium",
            checkedIcon: "check",
            selectionType: "single"
          },
          items: [
            {
              key: this.gen_key(),
              left: false,
              right: false,
              value: "Bogotá, D.C.",
              isSelected: false,
              main: (
                <>
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Bogotá, D.C.</PackenText>
                  <PackenText style={{ marginBottom: 5, color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
                  <PackenTag style={{ color: Colors.basic.independence.lgt }}>NGH152</PackenTag>
                </>
              )
            },
            {
              key: this.gen_key(),
              left: false,
              right: false,
              value: "Medellín",
              isSelected: false,
              main: (
                <>
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Medellín</PackenText>
                  <PackenText style={{ marginBottom: 5, color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
                  <PackenTag style={{ color: Colors.brand.primary.drk }}>Facturado</PackenTag>
                </>
              )
            },
            {
              key: this.gen_key(),
              left: false,
              right: false,
              value: "Bucaramanga",
              isSelected: false,
              isDisabled: true,
              main: (
                <>
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Bucaramanga</PackenText>
                  <PackenText style={{ marginBottom: 5, color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
                  <PackenTag style={{ color: Colors.basic.independence.lgt }}>NGH152</PackenTag>
                </>
              )
            },
            {
              key: this.gen_key(),
              left: false,
              right: false,
              value: "Santa Marta",
              isSelected: false,
              main: (
                <>
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Santa Marta</PackenText>
                  <PackenText style={{ marginBottom: 5, color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
                  <PackenTag style={{ color: Colors.brand.primary.drk }}>Facturado</PackenTag>
                </>
              )
            },
            {
              key: this.gen_key(),
              left: false,
              right: false,
              value: "Cali",
              isSelected: false,
              main: (
                <>
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Cali</PackenText>
                  <PackenText style={{ marginBottom: 5, color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
                  <PackenTag style={{ color: Colors.basic.independence.lgt }}>NGH152</PackenTag>
                </>
              )
            },
            {
              key: this.gen_key(),
              left: false,
              right: false,
              value: "Cartagena",
              isSelected: false,
              main: (
                <>
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Cartagena</PackenText>
                  <PackenText style={{ marginBottom: 5, color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
                  <PackenTag style={{ color: Colors.brand.primary.drk }}>Facturado</PackenTag>
                </>
              )
            },
            {
              key: this.gen_key(),
              left: false,
              right: false,
              value: "Leticia",
              isSelected: false,
              main: (
                <>
                  <PackenText style={{ color: Colors.basic.independence.dft }}>Leticia</PackenText>
                  <PackenText style={{ marginBottom: 5, color: Colors.basic.gray.drk, fontSize: 12, lineHeight: 16 }}>Information</PackenText>
                  <PackenTag style={{ color: Colors.basic.independence.lgt }}>NGH152</PackenTag>
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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
              key: this.gen_key(),
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

  gen_key = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
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
              list={this.state.menus.tags}
              input={{
                label: "Single tag selection",
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