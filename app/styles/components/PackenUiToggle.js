import Colors from "../abstracts/colors";
import Typography from "../abstracts/typography";

export default {
  shape: {
    default: {
      height: 24,
      width: 56,
      borderRadius: 100
    },
    active: {
      backgroundColor: Colors.brand.primary.drk
    },
    inactive: {
      backgroundColor: Colors.basic.independence.drk
    },
    disabled: {
      backgroundColor: Colors.base.disabled_alt
    }
  },
  dot: {
    default: {
      height: 20,
      width: 20,
      borderRadius: 50,
      position: "absolute"
    },
    active: {
      backgroundColor: Colors.brand.primary.snw
    },
    inactive: {
      backgroundColor: Colors.basic.gray.lgt
    },
    disabled: {
      backgroundColor: Colors.basic.white.dft
    }
  },
  label: {
    default: {
      opacity: 0.6,
      fontFamily: Typography.family.bold,
      fontSize: Typography.size.tiny,
      lineHeight: Typography.lineheight.tiny
    },
    on: {
      active: {
        color: Colors.brand.primary.ulgt
      },
      inactive: {
        opacity: 0
      },
      disabled: {
        opacity: 1,
        color: Colors.basic.white.dft
      }
    },
    off: {
      active: {
        opacity: 0
      },
      inactive: {
        color: Colors.basic.gray.drk
      },
      disabled: {
        opacity: 1,
        color: Colors.basic.white.dft
      }
    }
  }
}