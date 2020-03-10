import Colors from "../abstracts/colors";
import InputStyles from "./PackenInput";

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
      marginRight: 12
    },
    main: {
      flex: 1
    },
    right: {
      marginLeft: 12
    }
  },
  avatar: {
    state: {
      default: {},
      focus: {},
      active: {},
      disabled: {
        opacity: 0.2
      }
    }
  },
  checkedIcon: {
    position: "absolute",
    zIndex: 1,
    top: 2,
    right: 16
  },
  icon: {
    base: {
      color: Colors.basic.independence.dft
    },
    size: {
      ...InputStyles.icon.size
    },
    state: {
      default: {},
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