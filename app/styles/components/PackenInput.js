import Colors from "../abstracts/colors";
import Typography from "../abstracts/typography";

const heights = {
  tiny: 32,
  small: 40,
  medium: 48,
  large: 56,
  giant: 72
}

export default {
  container: {
    marginBottom: 15
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between"
  },
  label: {
    base: {
      letterSpacing: 1,
      fontFamily: Typography.family.bold,
      color: Colors.basic.independence.dft
    },
    size: {
      tiny: {
        fontSize: Typography.size.tiny,
        lineHeight: Typography.lineheight.tiny
      },
      small: {
        fontSize: Typography.size.small,
        lineHeight: Typography.lineheight.small
      },
      medium: {
        fontSize: Typography.size.small,
        lineHeight:Typography.lineheight.medium
      },
      large: {
        fontSize: Typography.size.medium,
        lineHeight: Typography.lineheight.medium
      },
      giant: {
        fontSize: Typography.size.large,
        lineHeight: Typography.lineheight.large
      }
    },
    state: {
      default: {},
      hover: {},
      focus: {},
      disabled: {
        color: Colors.basic.gray.dft
      }
    }
  },
  help: {
    base: {
      textAlign: "right",
      color: Colors.basic.gray.dft
    },
    size: {
      tiny: {
        fontSize: Typography.size.xtiny,
        lineHeight: Typography.lineheight.xtiny
      },
      small: {
        fontSize: Typography.size.tiny,
        lineHeight: Typography.lineheight.tiny
      },
      medium: {
        fontSize: Typography.size.tiny,
        lineHeight: Typography.lineheight.small
      },
      large: {
        fontSize: Typography.size.small,
        lineHeight: Typography.lineheight.small
      },
      giant: {
        fontSize: Typography.size.small,
        lineHeight: Typography.lineheight.small
      }
    }
  },
  box: {
    marginTop: 5
  },
  icon_wrapper: {
    base: {
      position: "absolute",
      zIndex: 1
    },
    offset: {
      tiny: 11,
      small: 13,
      medium: 21,
      large: 21,
      giant: 24
    }
  },
  icon: {
    base: {
      color: Colors.basic.independence.dft
    },
    size: {
      tiny: {
        size: Typography.size.small
      },
      small: {
        size: Typography.size.medium
      },
      medium: {
        size: Typography.size.medium
      },
      large: {
        size: Typography.size.medium
      },
      giant: {
        size: Typography.size.xhuge
      }
    },
    state: {
      default: {},
      hover: {},
      focus: {},
      disabled: {
        color: Colors.basic.gray.dft
      }
    }
  },
  placeholder: {
    color: Colors.basic.gray.dft
  },
  input: {
    base: {
      padding: 0,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: Colors.basic.independence.drk,
      backgroundColor: Colors.basic.white.dft,
      color: Colors.basic.independence.drk,
      fontFamily: Typography.family.regular
    },
    size: {
      tiny: {
        paddingHorizontal: 8,
        height: heights.tiny,
        fontSize: Typography.size.small,
        lineHeight: Typography.lineheight.small
      },
      small: {
        paddingHorizontal: 16,
        height: heights.small,
        fontSize: Typography.size.medium,
        lineHeight: Typography.lineheight.medium_alt
      },
      medium: {
        paddingHorizontal: 16,
        height: heights.medium,
        fontSize: Typography.size.large,
        lineHeight: Typography.lineheight.large
      },
      large: {
        paddingHorizontal: 16,
        height: heights.large,
        fontSize: Typography.size.large,
        lineHeight: Typography.lineheight.large
      },
      giant: {
        paddingHorizontal: 16,
        height: heights.giant,
        fontSize: Typography.size.giant_alt,
        lineHeight: Typography.lineheight.huge
      }
    },
    theme: {
      default: {
        borderColor: Colors.basic.independence.drk
      },
      danger: {
        borderColor: Colors.danger.default,
        borderWidth: 2
      },
      success: {
        borderColor: Colors.success.default,
        borderWidth: 2
      },
      primary: {
        borderColor: Colors.brand.primary.drk,
        borderWidth: 2
      }
    },
    state: {
      default: {},
      hover: {
        backgroundColor: Colors.basic.white.drk
      },
      focus: {
        borderWidth: 2
      },
      disabled: {
        borderColor: Colors.basic.gray.lgt,
        backgroundColor: Colors.basic.white.drk
      }
    },
    padding: {
      left: {
        tiny: {
          paddingLeft: 32
        },
        small: {
          paddingLeft: 40
        },
        medium: {
          paddingLeft: 48
        },
        large: {
          paddingLeft: 48
        },
        giant: {
          paddingLeft: 62
        }
      },
      right: {
        tiny: {
          paddingRight: 32
        },
        small: {
          paddingRight: 40
        },
        medium: {
          paddingRight: 48
        },
        large: {
          paddingRight: 48
        },
        giant: {
          paddingRight: 62
        }
      }
    }
  },
  textarea: {
    base: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      textAlignVertical: "top"
    },
    size: {
      tiny: {
        height: 96
      },
      small: {
        height: 104
      },
      medium: {
        height: 104
      },
      large: {
        height: 104
      },
      giant: {
        height: 104
      }
    }
  },
  message: {
    box: {
      width: "100%",
      marginTop: 5,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start"
    },
    icon: {
      base: {
        marginRight: 5
      },
      size: {
        tiny: {
          size: Typography.size.tiny
        },
        small: {
          size: Typography.size.small
        },
        medium: {
          size: Typography.size.small
        },
        large: {
          size: Typography.size.medium
        },
        giant: {
          size: Typography.size.medium
        }
      },
      theme: {
        default: {
          color: Colors.basic.gray.drk
        },
        danger: {
          color: Colors.danger.default
        },
        success: {
          color: Colors.success.default
        },
        primary: {
          color: Colors.brand.primary.drk
        }
      },
      state: {
        default: {},
        hover: {},
        focus: {},
        disabled: {
          color: Colors.basic.gray.dft
        }
      }
    },
    text: {
      size: {
        tiny: {
          fontSize: Typography.size.tiny
        },
        small: {
          fontSize: Typography.size.small
        },
        medium: {
          fontSize: Typography.size.small
        },
        large: {
          fontSize: Typography.size.medium
        },
        giant: {
          fontSize: Typography.size.medium
        }
      },
      theme: {
        default: {
          color: Colors.basic.gray.drk
        },
        danger: {
          color: Colors.danger.default
        },
        success: {
          color: Colors.success.default
        },
        primary: {
          color: Colors.brand.primary.drk
        }
      },
      state: {
        default: {},
        hover: {},
        focus: {},
        disabled: {
          color: Colors.basic.gray.dft
        }
      }
    }
  }
}