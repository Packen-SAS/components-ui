export const tiny = {
  size: 32
};

export const small = {
  size: 40
};

export const medium = {
  size: 64
};

export const large = {
  size: 80
};

export const giant = {
  size: 96
};

export const base = {
  borderRadius: 100,
  overflow: "hidden"
}

export const container = {
  tiny: {
    ...base,
    height: tiny.size,
    width: tiny.size
  },
  small: {
    ...base,
    height: small.size,
    width: small.size
  },
  medium: {
    ...base,
    height: medium.size,
    width: medium.size
  },
  large: {
    ...base,
    height: large.size,
    width: large.size
  },
  giant: {
    ...base,
    height: giant.size,
    width: giant.size
  }
}