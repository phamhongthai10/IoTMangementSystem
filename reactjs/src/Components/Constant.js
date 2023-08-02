 // constants.js
let globalValue = "Giá trị global variable";

export const getGlobalValue = () => {
  return globalValue;
};

export const setGlobalValue = (newValue) => {
  globalValue = newValue;
};
