import Colors from "../abstracts/colors";

export default {
  wrapper: {
    height: 112,
    width: 112,
    borderRadius: 115,
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },
  shadow: {
    base: {
      height: 112,
      width: 112,
      borderRadius: 115,
      position: "absolute",
      top: 0,
      left: 0
    },
    theme: {
      search: {
        backgroundColor: Colors.success.lgt
      },
      wait: {
        backgroundColor: Colors.brand.primary.snw
      },
      alert: {
        backgroundColor: Colors.danger.lgt
      }
    }
  },
  dot: {
    base: {
      height: 10,
      width: 10,
      borderRadius: 15,
      borderWidth: 2,
      borderColor: Colors.basic.white.dft
    },
    theme: {
      search: {
        backgroundColor: Colors.success.default
      },
      wait: {
        backgroundColor: Colors.brand.secondary.dft
      },
      alert: {
        backgroundColor: Colors.danger.default
      }
    }
  }
};