import Typography from "../abstracts/typography";
import Colors from "../abstracts/colors";
import Shadows from "../abstracts/shadows";

export default {
  container: {
    padding: 11
  },
  inner: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "flex-start",
    shadowColor: Colors.basic.black.dft,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: Shadows.md.elevation
  },
  dot: {
    base: {
      width: 6,
      height: 6,
      borderWidth: 2,
      borderRadius: 10,
      borderStyle: "solid",
      borderColor: Colors.basic.independence.drk,
      backgroundColor: Colors.brand.primary.dft,
      position: "absolute"
    },
    positioning: {
      type: {
        icon: {
          top: {
            top: -11,
            left: 13
          },
          right: {
            top: 13,
            right: -11
          },
          bottom: {
            left: 13,
            bottom: -11
          },
          left: {
            top: 13,
            left: -11
          }
        },
        info: {
          top: {
            top: -11,
            left: 9
          },
          right: {
            top: 9,
            right: -11
          },
          bottom: {
            left: 9,
            bottom: -11
          },
          left: {
            top: 9,
            left: -11
          }
        }
      }
    }
  },
  sub: {
    base: {
      position: "relative",
      zIndex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Colors.basic.independence.drk,
      shadowColor: Colors.basic.black.dft,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      elevation: 7
    },
    type: {
      icon: {
        height: 32,
        width: 32
      },
      info: {
        height: 24,
        width: 24
      }
    },
    theme: {
      primary: {
        backgroundColor: Colors.basic.independence.drk
      },
      white: {
        backgroundColor: Colors.basic.independence.drk
      },
      white_primary: {
        backgroundColor: Colors.brand.secondary.dft
      }
    }
  },
  icon: {
    type: {
      icon: {
        fontSize: Typography.size.medium,
        color: Colors.brand.primary.dft
      },
      info: {
        fontSize: Typography.size.tiny
      }
    },
    theme: {
      primary: {
        color: Colors.brand.primary.dft
      },
      white: {
        color: Colors.brand.primary.dft
      },
      white_primary: {
        color: Colors.basic.white.dft
      }
    }
  },
  character: {
    base: {
      fontFamily: Typography.family.bold,
      fontSize: Typography.size.large,
      lineHeight: Typography.lineheight.huge,
      paddingBottom: 3
    },
    theme: {
      primary: {
        color: Colors.brand.primary.dft
      },
      white: {
        color: Colors.brand.primary.dft
      },
      white_primary: {
        color: Colors.basic.white.dft
      }
    }
  },
  main: {
    base: {
      height: 24,
      paddingVertical: 6,
      paddingHorizontal: 8,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      position: "relative",
      zIndex: 2,
      shadowColor: Colors.basic.black.dft,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: Shadows.md.elevation
    },
    theme: {
      primary: {
        backgroundColor: Colors.brand.secondary.dft
      },
      white: {
        backgroundColor: Colors.basic.white.dft
      },
      white_primary: {
        backgroundColor: Colors.basic.white.dft
      }
    }
  },
  label: {
    base: {
      textAlign: "center",
      fontFamily: Typography.family.regular,
      fontSize: Typography.size.xtiny,
      lineHeight: Typography.lineheight.xtiny
    },
    theme: {
      primary: {
        color: Colors.brand.primary.ulgt
      },
      white: {
        color: Colors.basic.independence.drk
      },
      white_primary: {
        color: Colors.basic.independence.drk
      }
    }
  },
  text: {
    base: {
      textAlign: "center",
      fontFamily: Typography.family.regular,
      fontSize: Typography.size.xtiny,
      lineHeight: Typography.lineheight.xtiny
    },
    theme: {
      primary: {
        color: Colors.basic.white.dft
      },
      white: {
        color: Colors.basic.independence.drk
      },
      white_primary: {
        color: Colors.basic.independence.drk
      }
    }
  }
}