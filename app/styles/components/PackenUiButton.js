import Color from "../abstracts/colors";
import Typography from "../abstracts/typography";

export const base = {
  shape: {
    position: "relative",
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center"
  },
  label: {
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1,
    fontFamily: Typography.family.bold
  },
  icon: {}
}

const iconSizeMultiplier = 1.5;
export const tiny = {
  shape: {
    minHeight: 24
  },
  label: {
    fontSize: Typography.size.tiny,
    lineHeight: Typography.lineheight.tiny,
    marginHorizontal: 10
  },
  icon: {
    fontSize: Typography.size.tiny * iconSizeMultiplier
  }
}

export const small = {
  shape: {
    minHeight: 32
  },
  label: {
    fontSize: Typography.size.small,
    lineHeight: Typography.lineheight.small,
    marginHorizontal: 11
  },
  icon: {
    fontSize: Typography.size.small * iconSizeMultiplier
  }
}

export const medium = {
  shape: {
    minHeight: 40
  },
  label: {
    fontSize: Typography.size.medium,
    lineHeight: Typography.lineheight.medium,
    marginHorizontal: 12
  },
  icon: {
    fontSize: Typography.size.medium * iconSizeMultiplier
  }
}

export const large = {
  shape: {
    minHeight: 48
  },
  label: {
    fontSize: Typography.size.large,
    lineHeight: Typography.lineheight.large,
    marginHorizontal: 12
  },
  icon: {
    fontSize: Typography.size.large * iconSizeMultiplier
  }
}

export const giant = {
  shape: {
    minHeight: 56
  },
  label: {
    fontSize: Typography.size.giant,
    lineHeight: Typography.lineheight.giant,
    marginHorizontal: 22
  },
  icon: {
    fontSize: Typography.size.giant * iconSizeMultiplier
  }
}

export const primary = {
  shape: {
    backgroundColor: Color.primary.default
  },
  label: {
    color: Color.base.white
  },
  icon: {
    color: Color.base.white
  }
}

export const secondary = {
  shape: {
    backgroundColor: Color.secondary.default
  },
  label: {
    color: Color.secondary.default_drk
  },
  icon: {
    color: Color.secondary.default_drk
  }
}

export const tertiary = {
  shape: {
    backgroundColor: Color.tertiary.default
  },
  label: {
    color: Color.base.white
  },
  icon: {
    color: Color.base.white
  }
}

export const ghost = {
  shape: {
    backgroundColor: Color.ghost.default
  },
  label: {
    color: Color.tertiary.default
  },
  icon: {
    color: Color.tertiary.default
  }
}

export const danger = {
  shape: {
    backgroundColor: Color.danger.default
  },
  label: {
    color: Color.base.white
  },
  icon: {
    color: Color.base.white
  }
}

export const icon = {
  tiny: {
    shape: {
      height: tiny.shape.minHeight,
      width: tiny.shape.minHeight
    },
    icon: {
      ...tiny.icon
    }
  },
  small: {
    shape: {
      height: small.shape.minHeight,
      width: small.shape.minHeight
    },
    icon: {
      ...small.icon
    }
  },
  medium: {
    shape: {
      height: medium.shape.minHeight,
      width: medium.shape.minHeight
    },
    icon: {
      ...medium.icon
    }
  },
  large: {
    shape: {
      height: large.shape.minHeight,
      width: large.shape.minHeight
    },
    icon: {
      ...large.icon
    }
  },
  giant: {
    shape: {
      height: giant.shape.minHeight,
      width: giant.shape.minHeight
    },
    icon: {
      ...giant.icon
    }
  }
}

export const regular = {
  tiny: {
    shape: {
      ...tiny.shape,
      paddingVertical: 6,
      paddingHorizontal: 32
    },
    label: {
      ...tiny.label
    },
    icon: {
      ...tiny.icon
    }
  },
  small: {
    shape: {
      ...small.shape,
      paddingVertical: 8,
      paddingHorizontal: 44
    },
    label: {
      ...small.label
    },
    icon: {
      ...small.icon
    }
  },
  medium: {
    shape: {
      ...medium.shape,
      paddingVertical: 12,
      paddingHorizontal: 46
    },
    label: {
      ...medium.label
    },
    icon: {
      ...medium.icon
    }
  },
  large: {
    shape: {
      ...large.shape,
      paddingVertical: 14,
      paddingHorizontal: 56
    },
    label: {
      ...large.label
    },
    icon: {
      ...large.icon
    }
  },
  giant: {
    shape: {
      ...giant.shape,
      paddingVertical: 17,
      paddingHorizontal: 74
    },
    label: {
      ...giant.label
    },
    icon: {
      ...giant.icon
    }
  }
}