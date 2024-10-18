export const Utils = {
    saveToLocalStorage(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
  
    getFromLocalStorage(key) {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    },
  
    clearLocalStorage() {
      localStorage.clear();
    }
  };
  