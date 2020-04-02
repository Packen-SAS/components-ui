import Colors from "../abstracts/colors";
import Typography from "../abstracts/typography";

export default {
  wrapper: {
    flexDirection: "column"
  },
  item: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    position: "relative"
  },
  sub: {
    width: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  time: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.xtiny,
    lineHeight: Typography.lineheight.xtiny,
    color: Colors.basic.gray.drk
  },
  spacer: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },
  line: {
    base: {
      width: 1,
      position: "absolute",
      left: 20,
      zIndex: 1
    },
    state: {
      default: {
        backgroundColor: Colors.basic.gray.drk
      },
      completed: {
        backgroundColor: Colors.basic.independence.dft
      },
      active: {
        backgroundColor: Colors.basic.independence.dft
      }
    }
  },
  dot: {
    base: {
      borderRadius: 20,
      position: "relative",
      zIndex: 2,
      alignItems: "center",
      justifyContent: "center"
    },
    state: {
      default: {
        height: 11,
        width: 11,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: Colors.basic.gray.drk,
        backgroundColor: Colors.basic.white.dft
      },
      completed: {
        height: 8,
        width: 8,
        backgroundColor: Colors.basic.independence.drk
      },
      active: {
        height: 24,
        width: 24,
        borderWidth: 6,
        borderStyle: "solid",
        borderColor: "rgba(32, 210, 146, 0.3)",
        backgroundColor: Colors.success.default
      }
    }
  },
  icon: {
    color: Colors.basic.white.dft,
    size: Typography.size.xtiny * 0.65
  },
  main: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1
  },
  title: {
    state: {
      default: {
        fontFamily: Typography.family.semibold,
        fontSize: Typography.size.medium,
        lineHeight: Typography.lineheight.huge,
        color: Colors.basic.gray.drk
      },
      completed: {
        fontFamily: Typography.family.semibold,
        fontSize: Typography.size.medium,
        lineHeight: Typography.lineheight.huge,
        color: Colors.basic.independence.dft
      },
      active: {
        fontFamily: Typography.family.bold,
        fontSize: Typography.size.giant,
        lineHeight: Typography.lineheight.huge,
        color: Colors.basic.independence.drk
      }
    }
  },
  subtitle: {
    base: {
      fontFamily: Typography.family.regular,
      fontSize: Typography.size.xtiny,
      lineHeight: Typography.lineheight.xtiny,
      color: Colors.basic.gray.drk
    },
    state: {
      default: {},
      completed: {},
      active: {
        fontSize: Typography.size.small,
        lineHeight: Typography.lineheight.small
      }
    }
  }
}