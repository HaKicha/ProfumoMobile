function getAuthData(name) {
    return window.localStorage.getItem(name);
}

function setAuthData(name, value, options) {
    window.localStorage.setItem(name, value);
}

function deleteAuthData(name) {
    window.localStorage.removeItem(name);
}

export {
    setAuthData,
    getAuthData,
    deleteAuthData
}