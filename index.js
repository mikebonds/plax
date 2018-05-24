import Laxative from './src/Laxative';
import { Element } from './src/Element';

const random = (min, max) => {
    return Math.floor(Math.random() * max) + min; 
}

const container = Element(document.querySelector('.container'));
const body = Element(document.querySelector('body'));


for (let i = 0; i < 200; i++) {
    const div = Element('div').addClass('dot');
    div.addClass('lax');
    const size = random(5, 100);

    div.css({
        width: `${ size }px`,
        height: `${ size }px`,
        opacity: random(1, 100) / 100,
        top: `${ random(-window.scrollY, body.height()) }px`,
        left: `${ random(1, body.width()) }px`,
    });

    div.data('laxative-speed', random(1, 100) / 100);

    container.append(div)
}

window.lax = new Laxative('.lax');
lax.start();