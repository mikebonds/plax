import { bind } from 'toolpouchjs';
import { Element } from 'ellyjs';
import ParticleMap from './ParticleMap';

let plax_count = 0;

const defaultConfig = {
    scrollTarget: window,
    defaultSpeed: 1,
};

const configurePlax = (config) => {
    const _config = Object.assign({}, defaultConfig, config);
    const plax_config = {}

    for (let prop in _config) {
        plax_config[prop] = _config[prop];
    }

    return plax_config;
};

const createCSS = () => {
    const css = `
        .plax {
            position: fixed;
            transition: transform 2s cubic-bezier(0.11, 0.87, 0.13, 0.97);
        }
    `;

    Element('style').text(css).appendTo(document.head);
};

class Plax {
    constructor(selector, config = {}) {
        this._id = `plax_${ ++plax_count }`;
        this._config = configurePlax(config);
        this._particles = new ParticleMap(selector, this._config.scrollTarget.scrollY);
        this._scrollY = 0;

        createCSS();
        bind(this, ['onScroll']);
    }

    start() {
        this._config.scrollTarget.addEventListener(`scroll`, this.onScroll);
    }

    dump(shouldRevert) {
        this._config.scrollTarget.removeEventListener(`scroll`, this.onScroll);
        this._particles.decompose(shouldRevert);
    }

    onScroll() {
        this._scrollY = this._config.scrollTarget.scrollY;
        this._particles.move(this._scrollY);
    }
}

export default Plax;