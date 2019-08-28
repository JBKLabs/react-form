const expand = (obj, keys, value) => {
  if (keys.length === 1) {
    return { [keys[0]]: value};
  }

  const section = obj[keys[0]] || {};
  return {
    [keys[0]]: {
      ...section,
      ...expand(section, keys.slice(1), value)
    }
  };
}

const transposeObject = (raw) => {
  const transposed = Object
    .keys(raw)
    .reduce((obj, key) => ({
      ...obj,
      ...expand(obj, key.split('.'), raw[key])
    }),{})

  return transposed;
};

export default transposeObject;