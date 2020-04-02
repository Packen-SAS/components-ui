import Colors from "../abstracts/colors";
import Shadows from "../abstracts/shadows";

export default {
  wrapper: {},
  input: {},
  menu: {
    backgroundColor: Colors.basic.white.dft,
    shadowColor: Colors.basic.black.dft,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: Shadows.md.elevation,
    position: "absolute",
    zIndex: 10,
    left: 0,
    width: "100%",
    opacity: 0
  }
}