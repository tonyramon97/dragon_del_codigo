const Storage = {
  async get(key) {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return null;
      return { value: raw };
    } catch (e) {
      return null;
    }
  },
  async set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) { /* quota exceeded, silent */ }
  },
  async remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) { /* silent */ }
  }
};
