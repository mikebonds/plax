const bind = (obj, methods) => {
    if (typeof methods === 'string') {
        obj[methods] = obj[methods].bind(obj);
        return;
    }

    for (let method of methods) {
        obj[method] = obj[method].bind(obj);
    }
};

function camelCaseToDash (str) {
    return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
  }

const toCamelCase = (str) => {
    str = str.replace(/-([a-z])/g, (g) => { 
        return g[1].toUpperCase(); 
    })
    
    return str[0].toLowerCase() + str.slice(1);
};

const isElement = (element) => {
    return element instanceof HTMLElement;
};

export {
    bind,
    camelCaseToDash,
    toCamelCase,
    isElement,
};