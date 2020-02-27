import Color from "../abstracts/colors";

const base = {
  textAlign: "center",
  alignItems: "center",
  justifyContent: "center"
}

export const icon = {
  tiny: {
    height: tiny.minHeight,
    width: tiny.minHeight
  }
}

export const regular = {
  tiny: {
    ...tiny,
    paddingVertical: 7,
    paddingHorizontal: 11
  }
}

export const primary = {
  ...base,
  bg: {
    default: Color.primary.default,
    focus: Color.primary.focus
  }
}

export const tiny = {
  minHeight: 24
}

export const small = {
  minHeight: 32
}

export const medium = {
  minHeight: 40
}

export const larger = {
  minHeight: 48
}

export const giant = {
  minHeight: 56
}