import Colors from "../abstracts/colors";
import Typography from "../abstracts/typography";

export default tabsStyles = {
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around"
  },
  item: {
    base: {
      shape: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
        borderBottomWidth: 4,
        borderBottomStyle: "solid",
        paddingTop: 12,
        paddingBottom: 8
      },
      label: {
        textAlign: "center",
        fontFamily: Typography.family.semibold,
        fontSize: Typography.size.medium,
        lineHeight: Typography.lineheight.huge
      },
      icon: {
        textAlign: "center",
        fontFamily: Typography.family.semibold,
        fontSize: Typography.size.medium,
        lineHeight: Typography.lineheight.huge,
        fontSize: Typography.size.medium * 1.65
      }
    },
    default: {
      shape: {
        borderBottomColor: Colors.base.disabled_alt
      },
      label: {
        color: Colors.base.disabled_alt_drk
      },
      icon: {
        color: Colors.base.disabled_alt_drk
      }
    },
    focus: {
      shape: {
        backgroundColor: Colors.ghost.focus,
        borderBottomColor: Colors.base.disabled_alt_drk
      },
      label: {
        color: Colors.secondary.focus
      },
      icon: {
        color: Colors.secondary.focus
      }
    },
    active: {
      shape: {
        backgroundColor: Colors.base.transparent,
        borderBottomColor: Colors.primary.default
      },
      label: {
        color: Colors.primary.default
      },
      icon: {
        color: Colors.primary.default
      }
    }
  }
}