import Spacing from "../abstracts/spacing";
import Colors from "../abstracts/colors";
import Typography from "../abstracts/typography";

export default {
  section: {
    padding: Spacing.padding.all.base,
    paddingHorizontal: 0,
    marginBottom: 10
  },
  section__title: {
    color: Colors.base.default_alt,
    fontSize: Typography.size.huge,
    fontFamily: Typography.family.bold,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: Colors.base.default_lgt
  },
  section__content: {
    marginTop: 20,
    alignItems: "flex-start",
    alignSelf: "flex-start"
  },
  section__contentItem: {
    marginBottom: 10
  }
}