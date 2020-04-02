import Typography from "../abstracts/typography";
import Colors from "../abstracts/colors";

export default {
  box: {
    base: {
      borderRadius: 3,
      paddingVertical: 2,
      paddingHorizontal: 8,
      textAlign: "center",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Colors.basic.white.drk,
      alignSelf: "flex-start"
    }
  },
  label: {
    base: {
      fontFamily: Typography.family.bold,
      fontSize: Typography.size.tiny_alt,
      lineHeight: Typography.lineheight.medium_alt
    }
  }
}