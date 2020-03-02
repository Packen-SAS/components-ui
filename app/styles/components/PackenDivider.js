import Color from "../abstracts/colors";

export const base = {
  width: "100%",
  alignItems: "stretch"
}

export const light = {
  ...base,
  backgroundColor: Color.secondary.focus
}

export const dark = {
  ...base,
  backgroundColor: Color.base.gray
}