/*
    Basic helper class that works on a single DOM Object at a time.
    A new Element can be instantiated by passing a node type, or 
    a pre-existing DOM Object.

    Example: Element('div') or Element(document.querySelector('body'))
*/

import { isElement, toCamelCase, camelCaseToDash } from './tools';

const elements = [];

const Element = (tag) => {
    return new CreateElement(tag);
};

const rect = (element) => {
    return element.getBoundingClientRect();
};

const splitClassNames = (classNames) => {
    return classNames.replace(/\s/g, '').split(',');
};

const sizeStore = {};

class CreateElement {
    constructor(tag) {
        this._id = Symbol('Element');
        elements.push(this);

        if (isElement(tag)) {
            this.el = tag;
        } else {
            this.el = document.createElement(tag);
        }
        
        return this;
    }

    append(child) {
        if (isElement(child)) {
            this.el.appendChild(child);
        }

        try {
            this.el.appendChild(child.el);
        } catch(error) {
            console.error(error);
        }
        
        return this;
    }

    appendTo(element) {
        if (!isElement(element)) {
            element = document.querySelector(element);
        }

        element.appendChild(this.el);

        return this;
    }

    text(text) {
        this.el.appendChild(document.createTextNode(text));
        return this;
    }

    html(html) {
        this.el.innerHTML = html;
        return this;
    }

    data(dataProp, value = undefined) {
        if (typeof value !== 'undefined') {
            this.el.dataset[toCamelCase(dataProp)] = value;
        }

        if (this.el.dataset) {
            return this.el.dataset[toCamelCase(dataProp)];
        } else {
            return this.el.getAttribute(`data-${ camelCaseToDash(dataProp) }`);
        }
    }

    addClass(classNames) {
        this.el.classList.add(...splitClassNames(classNames));
        return this;
    }

    removeClass(classNames) {
        this.el.classList.remove(...splitClassNames(classNames));
        return this;
    }

    size() {
        if (sizeStore[this._id]) {
            return sizeStore[this._id];
        }

        const size = rect(this.el);
        const sizeObj = { width: size.width, height: size.height };

        sizeStore[this._id] = sizeObj;

        return sizeObj;
    }

    width() {
        return this.size().width;
    }

    height() {
        return this.size().height;
    }

    position() {
        const pos = rect(this.el);
        return { x: pos.x, y: pos.y };
    }

    css(styles, value) {
        if (typeof styles === 'string') {
            this.el.style[styles] = value;
            return this;
        }

        for (let prop in styles) {
            this.el.style[prop] = styles[prop];
        }
        
        return this;
    }

    clone() {
        return this.el.cloneNode(true);
    }
}

export {
    Element,
};