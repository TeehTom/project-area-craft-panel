const Storage = {
    clear() {
        localStorage.clear();
    },
    get(key) {
        return localStorage.getItem(key);
    },
    key(index) {
        return localStorage.key(index);
    },
    length() {
        return localStorage.length();
    },
    remove(key) {
        localStorage.removeItem(key);
    },
    set(key, value) {
        localStorage.setItem(key, value);
    },
};

export default Storage;
