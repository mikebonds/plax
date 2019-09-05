import { bind } from 'toolpouchjs';
import { Element } from 'ellyjs';
import ParticleMap from './ParticleMap';

let laxative_count = 0;

const defaultConfig = {
    scrollTarget: window,
    defaultSpeed: 1,
};

const configureLaxative = (config) => {
    const _config = Object.assign({}, defaultConfig, config);
    const lax_config = {}

    for (let prop in _config) {
        lax_config[prop] = _config[prop];
    }

    return lax_config;
};

const createCSS = () => {
    const css = `
        .laxative {
            position: fixed;
            transition: transform 2s cubic-bezier(0.11, 0.87, 0.13, 0.97);
        }
    `;

    Element('style').text(css).appendTo(document.head);
};

class Laxative {
    constructor(selector, config = {}) {
        this._id = `laxative_${ ++laxative_count }`;
        this._config = configureLaxative(config);
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

    onScroll(event) {
        this._scrollY = this._config.scrollTarget.scrollY;
        this._particles.move(this._scrollY);
    }
}

export default Laxative;