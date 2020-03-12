import Colors from "../abstracts/colors";
import Typography from "../abstracts/typography";

export default {
  content: {
    default: {
      width: 18,
      height: 18,
      backgroundColor: Colors.brand.primary.snw,
      borderRadius: 3,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: Colors.brand.primary.drk
    },
    active: {
      width: 18,
      height: 18,
      backgroundColor: Colors.primary.default,
      borderRadius: 3,
      alignItems: "center",
      justifyContent: "center"
    },
    disabled: {
      width: 18,
      height: 18,
      backgroundColor: Colors.base.disabled_alt,
      borderRadius: 3,
      alignItems: "center",
      justifyContent: "center"
    },
    disabledCheckUnChecked: {
      width: 18,
      height: 18,
      backgroundColor: Colors.base.disabled,
      borderRadius: 3,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: Colors.base.disabled_alt
    },
    disabledUnChecked: {
      width: 18,
      height: 18,
      backgroundColor: Colors.ghost.focus,
      borderRadius: 3,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: Colors.ghost.focus
    }
  },
  icon: {
    fontSize: Typography.size.small,
    color: Colors.base.white
  },
  title: {
    base: {
      fontSize: Typography.size.medium,
      lineHeight: 18,
      color: Colors.base.default_alt,
      marginLeft: 8
    },
    state: {
      disabled: {
        color: Colors.base.disabled_alt
      }
    }
  }
}