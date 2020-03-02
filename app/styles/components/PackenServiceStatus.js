import Colors from "../abstracts/colors";
import Typography from "../abstracts/typography";

export default {
  timeline: {
    flexDirection: "row",

  },
  timeline__item: {
    flexDirection: "row",
    alignItems: "center"
  },
  timeline__icon_wrapper: {
    height: 16,
    width: 16,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  timeline__divider: {
    marginLeft: 3,
    marginRight: 4,
    height: 2,
    width: 34,
    backgroundColor: Colors.base.gray_alt
  },
  icon: {
    default: {
      color: Colors.base.gray_drk,
      fontSize: Typography.size.small
    },
    active: {
      color: Colors.primary.default,
      fontSize: Typography.size.large
    }
  },
  copy: {
    marginTop: 9
  },
  title: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.giant,
    lineHeight: Typography.lineheight.huge,
    color: Colors.base.default_drk
  },
  date: {
    fontFamily: Typography.family.semibold,
    fontSize: Typography.size.small,
    lineHeight: Typography.lineheight.small,
    color: Colors.base.gray_drk
  },
  time: {
    fontFamily: Typography.family.semibold,
    fontSize: Typography.size.small,
    lineHeight: Typography.lineheight.small,
    color: Colors.base.default_drk
  }
}