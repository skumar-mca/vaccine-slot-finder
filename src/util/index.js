export const setItem = (key, val) => {
    localStorage.setItem(key, JSON.stringify(val));
}

export const getItem = (key, defaultValue) => {
    const val = localStorage.getItem(key);
    if (val) {
        return JSON.parse(val);
    }
    return defaultValue || null;
}

export const removeItem = (key) => {
    localStorage.removeItem(key);
}

export const SECRET_KEY = 'I4096';
export const SECRET_CODE = '4096';
