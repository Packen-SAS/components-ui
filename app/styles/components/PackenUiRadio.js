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
    },
    dropdown: {
      flexDirection: "column",
      alignItems: "stretch",
      justifyContent: "center"
    }
  },
  item: {
    column: {
      marginBottom: 10
    },
    row: {
      marginRight: 20,
      marginBottom: 10
    },
    dropdown: {
      margin: 0
    }
  },
  shape: {
    base: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      flexWrap: "nowrap"
    }
  },
  control: {
    base: {
      height: 18,
      width: 18,
      borderRadius: 18,
      borderWidth: 2,
      borderStyle: "solid",
      borderColor: Colors.primary.default
    },
    checked: {
      borderWidth: 6,
      backgroundColor: Colors.base.white
    },
    default_disabled: {
      borderColor: Colors.base.disabled_alt
    },
    checked_disabled: {
      borderWidth: 6,
      backgroundColor: Colors.base.white,
      borderColor: Colors.base.disabled_alt
    }
  },
  label: {
    base: {
      marginLeft: 8,
      color: Colors.basic.independence.drk,
      fontSize: Typography.size.medium,
      lineHeight: Typography.lineheight.medium_alt
    },
    default_disabled: {
      color: Colors.base.disabled_alt
    },
    checked_disabled: {
      color: Colors.base.disabled_alt
    }
  }
}