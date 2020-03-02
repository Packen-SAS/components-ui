import Colors from "../abstracts/colors";
import Typography from "../abstracts/typography";

export default {
  container: {
    column: {
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center"
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      flexWrap: "wrap"
    }
  },
  item: {
    column: {
      marginBottom: 10
    },
    row: {
      marginRight: 20,
      marginBottom: 10
    }
  },
  shape: {
    default: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      flexWrap: "nowrap"
    }
  },
  control: {
    default: {
      height: 18,
      width: 18,
      borderRadius: 18,
      borderColor: Colors.primary.default,
      borderWidth: 2,
      borderStyle: "solid"
    },
    checked: {
      height: 18,
      width: 18,
      borderRadius: 18,
      borderColor: Colors.primary.default,
      borderWidth: 6,
      borderStyle: "solid",
      backgroundColor: Colors.base.white
    },
    default_disabled: {
      height: 18,
      width: 18,
      borderRadius: 18,
      borderWidth: 2,
      borderStyle: "solid",
      borderColor: Colors.base.disabled_alt
    },
    checked_disabled: {
      height: 18,
      width: 18,
      borderRadius: 18,
      borderColor: Colors.base.disabled_alt,
      borderWidth: 6,
      borderStyle: "solid",
      backgroundColor: Colors.base.white
    }
  },
  label: {
    default: {
      marginLeft: 8,
      color: Colors.basic.independence.drk,
      fontSize: Typography.size.medium,
      lineHeight: Typography.lineheight.medium_alt
    }
  }
}