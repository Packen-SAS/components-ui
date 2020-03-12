import Colors from "../abstracts/colors";
import Typography from "../abstracts/typography";

export default {
  wrapper: {
    layout: {
      column: {
        flexDirection: "column"
      },
      row: {
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
      },
      dropdown: {
        flexDirection: "column"
      }
    }
  },
  content: {
    layout: {
      column: {
        marginBottom: 10
      },
      row: {
        marginRight: 15,
        marginBottom: 10
      },
      dropdown: {
        marginRight: 0,
        marginBottom: 0
      }
    }
  },
  inner: {
    base: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      alignSelf: "flex-start"
    }
  },
  iconBox: {
    base: {
      height: 18,
      width: 18,
      borderWidth: 1,
      borderRadius: 3,
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center"
    },
    state: {
      active: {
        backgroundColor: Colors.brand.primary.drk,
        borderColor: Colors.brand.primary.drk
      },
      inactive: {
        backgroundColor: Colors.brand.primary.snw,
        borderColor: Colors.brand.primary.drk
      },
      disabled: {
        active: {
          backgroundColor: Colors.base.disabled_alt,
          borderColor: Colors.base.disabled_alt
        },
        inactive: {
          backgroundColor: Colors.ghost.focus,
          borderColor: Colors.base.disabled_alt
        }
      }
    }
  },
  icon: {
    base: {
      size: Typography.size.small,
      color: Colors.basic.white.dft
    }
  },
  label: {
    base: {
      color: Colors.basic.independence.drk,
      fontSize: Typography.size.medium,
      lineHeight: Typography.lineheight.medium_alt,
      marginLeft: 8
    },
    state: {
      default: {},
      disabled: {
        color: Colors.base.disabled_alt
      }
    }
  }
}