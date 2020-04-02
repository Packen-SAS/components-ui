import Colors from "../abstracts/colors";
import Typography from "../abstracts/typography";

export default {
  box: {
    base: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: 4,
      flex: 1,
      width: "100%",
      minHeight: 32
    },
    theme: {
      success: {
        type: {
          default: {
            backgroundColor: Colors.success.lgt
          },
          accent: {
            backgroundColor: Colors.success.default
          }
        }
      },
      primary: {
        type: {
          default: {
            backgroundColor: Colors.brand.primary.snw
          },
          accent: {
            backgroundColor: Colors.brand.primary.drk
          }
        }
      },
      info: {
        type: {
          default: {
            backgroundColor: Colors.info.lgt
          },
          accent: {
            backgroundColor: Colors.info.default
          }
        }
      },
      warning: {
        type: {
          default: {
            backgroundColor: Colors.warning.lgt
          },
          accent: {
            backgroundColor: Colors.warning.default
          }
        }
      },
      danger: {
        type: {
          default: {
            backgroundColor: Colors.danger.lgt
          },
          accent: {
            backgroundColor: Colors.danger.default
          }
        }
      }
    }
  },
  logo: {
    width: 26,
    height: 14,
    marginRight: 8
  },
  icon: {
    base: {
      marginRight: 8,
      size: Typography.size.large
    },
    theme: {
      success: {
        type: {
          default: {
            color: Colors.success.default
          },
          accent: {
            color: Colors.basic.white.dft
          }
        }
      },
      primary: {
        type: {
          default: {
            color: Colors.brand.primary.drk
          },
          accent: {
            color: Colors.basic.white.dft
          }
        }
      },
      info: {
        type: {
          default: {
            color: Colors.info.default
          },
          accent: {
            color: Colors.basic.white.dft
          }
        }
      },
      warning: {
        type: {
          default: {
            color: Colors.warning.default
          },
          accent: {
            color: Colors.basic.white.dft
          }
        }
      },
      danger: {
        type: {
          default: {
            color: Colors.danger.default
          },
          accent: {
            color: Colors.basic.white.dft
          }
        }
      }
    }
  },
  title: {
    base: {
      fontFamily: Typography.family.semibold,
      fontSize: Typography.size.medium,
      lineHeight: Typography.lineheight.medium_alt
    },
    theme: {
      success: {
        type: {
          default: {
            color: Colors.success.default
          },
          accent: {
            color: Colors.basic.white.dft
          }
        }
      },
      primary: {
        type: {
          default: {
            color: Colors.brand.primary.drk
          },
          accent: {
            color: Colors.basic.white.dft
          }
        }
      },
      info: {
        type: {
          default: {
            color: Colors.info.default
          },
          accent: {
            color: Colors.basic.white.dft
          }
        }
      },
      warning: {
        type: {
          default: {
            color: Colors.warning.default
          },
          accent: {
            color: Colors.basic.white.dft
          }
        }
      },
      danger: {
        type: {
          default: {
            color: Colors.danger.default
          },
          accent: {
            color: Colors.basic.white.dft
          }
        }
      }
    }
  }
};