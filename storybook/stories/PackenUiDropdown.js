import React from "react";
import { storiesOf } from "@storybook/react-native";

import Colors from "../../app/styles/abstracts/colors";
import { genKey } from "../../app/utils/index";

import Wrapper from "../wrapper";
import PackenUiDropdown from "../../app/components/PackenUiDropdown";
import PackenUiText from "../../app/components/PackenUiText";

const menus = {
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
};

storiesOf("PackenUiDropdown", module)
  .add("Tiny single simple", () => (
    <Wrapper
      full
      title="PackenUiDropdown"
      description="Dropdown with single selection, simple content, optional help text and size set to tiny."
      code={
`<PackenUiDropdown
  size="tiny"
  list={menus.simple}
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
/>`
      }
    >
      <PackenUiDropdown
        size="tiny"
        list={menus.simple}
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
    </Wrapper>
  ))
  .add("Small multiple simple", () => (
    <Wrapper
      full
      title="PackenUiDropdown"
      description="Dropdown with multiple selections, simple content and size set to small."
      code={
`<PackenUiDropdown
  size="small"
  list={menus.mulitple}
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
/>`
      }
    >
      <PackenUiDropdown
        size="small"
        list={menus.mulitple}
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
    </Wrapper>
  ));