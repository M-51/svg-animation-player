import * as e from './easing';

function interpret(obj, range) {
    const duration = range[1] - range[0];
    const start = obj.from;
    const difference = obj.to - start;
    if (e[obj.easing]) {
        return t => e[obj.easing](t, start, difference, duration);
    }
    return t => e.linear(t, start, difference, duration);
}


function fromToInterpreter(item) {
    if (Array.isArray(item[1].range) && item[1].range.length === 2) {
        if (item[0] === 'transform') {
            const transform = item[1];
            if (typeof transform.translate.x === 'object') {
                transform.translate.x = interpret(transform.translate.x, transform.range);
            }
            if (typeof transform.translate.y === 'object') {
                transform.translate.y = interpret(transform.translate.y, transform.range);
            }
            if (typeof transform.rotate === 'object') {
                transform.rotate = interpret(transform.rotate, transform.range);
            }
            if (typeof transform.scale === 'object') {
                transform.scale = interpret(transform.scale, transform.range);
            }
        } else {
            const property = item[1];
            if (typeof property.value === 'object') {
                property.value = interpret(property.value, property.range);
            }
        }
    }
}

export default fromToInterpreter;
