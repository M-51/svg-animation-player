import * as e from './easing';

function interpret(obj, range, current, name) {
    const duration = range[1] - range[0];
    let start = obj.from;
    let difference = obj.to - start;
    const easingFunction = e[obj.easing] || e.linear;

    if (start) {
        return t => easingFunction(t, start, difference, duration);
    }

    let getCurrentAttribute = () => {
        start = current[name];
        if (typeof start === 'undefined') {
            throw new Error('No starting value! Specify "from" value, or add it to animatated SVG element');
        }
        difference = obj.to - start;
        getCurrentAttribute = () => start;
        return start;
    };

    return t => easingFunction(t, getCurrentAttribute(), difference, duration);
}


function fromToInterpreter(item) {
    if (Array.isArray(item[1].range) && item[1].range.length === 2) {
        const { currentAttributes } = item[2];
        const key = item[0];
        if (key === 'transform') {
            const transform = item[1];
            const other = currentAttributes.transform; // scale or rotate
            if (typeof transform.translate === 'object') {
                transform.local = true;
                const tr = currentAttributes.transform.translate; // actual translation
                if (typeof transform.translate.x === 'object') {
                    transform.translate.x = interpret(transform.translate.x, transform.range, tr, 'x');
                }
                if (typeof transform.translate.y === 'object') {
                    transform.translate.y = interpret(transform.translate.y, transform.range, tr, 'y');
                }
            }
            if (typeof transform.rotate === 'object') {
                transform.local = true;
                transform.rotate = interpret(transform.rotate, transform.range, other, 'rotate');
            }
            if (typeof transform.scale === 'object') {
                transform.local = true;
                transform.scale = interpret(transform.scale, transform.range, other, 'scale');
            }
        } else {
            const property = item[1];
            if (typeof property.value === 'object') {
                property.local = true;
                property.value = interpret(property.value, property.range, currentAttributes, key);
            }
        }
    }
}

export default fromToInterpreter;
