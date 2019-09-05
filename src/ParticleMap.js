import { Element } from 'ellyjs';

const selectParticles = (selector) => {
    return document.querySelectorAll(selector);
}

const setAbsolutePosition = (particle, scrollY) => {
    particle.el.css({
        width: `${ particle.el.width() }px`,
        height: `${ particle.el.height() }px`,
        top: `${ particle.yPos + scrollY }px`,
        left: `${ particle.xPos }px`,
    });
};

class ParticleMap {
    constructor(selector, scrollY) {
        this._scrollY = scrollY || 0;
        this._particle_map = [];
        this._particles = selectParticles(selector);
        this.setup();
    }

    setup() {
        this._particles.forEach((particle) => {
            const el = Element(particle);
            const original = el.clone();
            const particleObj = {
                el,
                xPos: el.position().x,
                yPos: el.position().y,
                speed: Number(el.data('laxative-speed')),
                original,
            };

            el.addClass('laxative');
            setAbsolutePosition(particleObj, this._scrollY);
            this._particle_map.push(particleObj)
        });

        // We do this last to ensure that elements with margin
        // get spaced correctly.
        this._particle_map.forEach((particle) => {
            particle.el.css({
                margin: 0,
            });
        });
    }

    decompose(shouldRevert = false) {
        // If shouldRevert is true, we replace every particle element with it's
        // original before it became a particle object.
        // This is very much destructive.
        if (shouldRevert) {
            this._particle_map.forEach((particle) => {
                particle.el.el.parentNode.replaceChild(particle.original, particle.el.el);
            });
        }

        this._particle_map = [];
        this._particles = [];
    }

    move(scrollAmount = 0) {
        this._particle_map.forEach((particle) => {
            const move = -(scrollAmount * particle.speed);
            particle.el.css({
                transform: `translateY(${move}px)`,
            });
        });
    }
}

export default ParticleMap;