import Colors from "../abstracts/colors";
import Shadows from "../abstracts/shadows";

export default {
  backdrop: {
    base: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    },
    open: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    closed: {
      backgroundColor: "transparent"
    }
  },
  wrapper: {
    default: {
      padding: 25
    },
    small: {
      paddingVertical: 25,
      paddingHorizontal: 50
    }
  },
  box: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 8,
    elevation: Shadows.md.elevation,
    shadowColor: Colors.basic.black.dft,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22
  },
  header: {
    width: "100%",
    position: "absolute",
    zIndex: 1,
    top: 0,
    left: 0
  },
  header__inner: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  info: {
    backgroundColor: "transparent"
  },
  banner: {
    base: {
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      paddingVertical: 50,
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center"
    },
    warning: {
      backgroundColor: Colors.warning.lgt
    },
    info: {
      backgroundColor: Colors.info.lgt
    },
    danger: {
      backgroundColor: Colors.danger.lgt
    },
    success: {
      backgroundColor: Colors.success.lgt
    }
  },
  content: {
    base: {
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      backgroundColor: Colors.basic.white.dft
    },
    default: {
      paddingTop: 72,
      paddingBottom: 20,
      paddingHorizontal: 28
    },
    banner: {
      default: {
        paddingTop: 15,
        paddingBottom: 20,
        paddingHorizontal: 28
      },
      small: {
        paddingTop: 15,
        paddingBottom: 34,
        paddingHorizontal: 34
      }
    }
  },
  title: {
    textAlign: "center",
    color: Colors.basic.yankees.dft
  },
  text: {
    base: {
      color: Colors.basic.independence.dft
    },
    default: {
      marginTop: 21,
      marginBottom: 46
    },
    banner: {
      default: {
        marginTop: 10,
        marginBottom: 46
      },
      small: {
        marginTop: 10,
        marginBottom: 23
      }
    }
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  gallery: {
    box: {
      height: 200,
      width: 300
    },
    arrows: {
      base: {
        position: "absolute",
        zIndex: 2
      }
    },
    slide: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      backgroundColor: Colors.basic.black.dft
    },
    image: {
      height: 200,
      width: 300
    }
  }
}