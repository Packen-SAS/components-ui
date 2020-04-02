import Colors from "../abstracts/colors";
import InputStyles from "./PackenUiInput";

export default {
  box: {
    base: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderBottomColor: Colors.basic.white.drk
    },
    state: {
      default: {
        backgroundColor: Colors.basic.white.dft
      },
      focus: {
        backgroundColor: Colors.brand.primary.snw
      },
      active: {
        backgroundColor: Colors.brand.primary.drk
      },
      disabled: {
        backgroundColor: Colors.basic.white.dft
      }
    },
    selection: {
      single: {},
      multiple: {},
      radio: {
        padding: 0
      },
      checkbox: {
        padding: 0
      }
    }
  },
  content: {
    wrapper: {
      base: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
      },
      state: {
        default: {},
        focus: {},
        active: {},
        disabled: {}
      }
    },
    left: {
      base: {
        marginRight: 12,
      },
      state: {
        default: {},
        focus: {},
        active: {},
        disabled: {
          opacity: 0.2
        }
      }
    },
    main: {
      flex: 1
    },
    right: {
      base: {
        marginLeft: 12
      },
      state: {
        default: {},
        focus: {},
        active: {},
        disabled: {
          opacity: 0.2
        }
      }
    }
  },
  icon: {
    base: {
      color: Colors.basic.independence.dft
    },
    size: {
      ...InputStyles.icon.size
    },
    state: {
      default: {
        color: Colors.basic.independence.dft
      },
      focus: {},
      active: {
        color: Colors.basic.white.dft
      },
      disabled: {
        color: Colors.basic.gray.dft
      }
    }
  }
}