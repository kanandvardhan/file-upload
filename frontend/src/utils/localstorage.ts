export const setLocalStorageItem = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Error setting item in localStorage", error);
  }
};
export const getLocalStorageItem = (key) => {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) return null;
    return JSON.parse(serializedValue);
  } catch (error) {
    console.error("Error getting item from localStorage", error);
    return null;
  }
};

export const removeLocalStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing item from localStorage", error);
  }
};
