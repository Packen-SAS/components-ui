const families = {
  regular: "Muli-Regular",
  semibold: "Muli-Semibold",
  bold: "Muli-Bold"
}

export default {
  family: {
    ...families
  },
  size: {
    xtiny: 8,
    tiny: 10,
    small: 12,
    medium: 14,
    large: 16,
    giant: 18,
    huge: 24
  },
  lineheight: {
    xtiny: 12,
    tiny: 12,
    small: 16,
    medium: 16,
    medium_alt: 18,
    large: 20,
    giant: 22,
    huge: 24
  },
  h1: {
    fontFamily: families.bold,
    fontSize: 36,
    lineHeight: 48
  },
  h2: {
    fontFamily: families.bold,
    fontSize: 32,
    lineHeight: 40
  },
  h3: {
    fontFamily: families.bold,
    fontSize: 30,
    lineHeight: 40
  },
  h4: {
    fontFamily: families.bold,
    fontSize: 26,
    lineHeight: 32
  },
  h5: {
    fontFamily: families.bold,
    fontSize: 22,
    lineHeight: 28
  },
  h6: {
    fontFamily: families.bold,
    fontSize: 18,
    lineHeight: 24
  },
  t1: {
    fontFamily: families.semibold,
    fontSize: 20,
    lineHeight: 24
  },
  t2: {
    fontFamily: families.regular,
    fontSize: 20,
    lineHeight: 24
  },
  s1: {
    fontFamily: families.semibold,
    fontSize: 16,
    lineHeight: 20
  },
  s2: {
    fontFamily: families.semibold,
    fontSize: 14,
    lineHeight: 24
  },
  p1: {
    fontFamily: families.regular,
    fontSize: 16,
    lineHeight: 20
  },
  p2: {
    fontFamily: families.regular,
    fontSize: 14,
    lineHeight: 18
  },
  c1: {
    fontFamily: families.regular,
    fontSize: 12,
    lineHeight: 16
  },
  c2: {
    fontFamily: families.semibold,
    fontSize: 12,
    lineHeight: 16
  },
  label: {
    fontFamily: families.bold,
    fontSize: 12,
    lineHeight: 16
  }
}