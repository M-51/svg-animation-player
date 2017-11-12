import { animationLoop } from './dispatcher';
import { isNumeric } from '../utils';

function interval(animationFunction, range) {
    const rangeFunction = (t) => {
        if (t >= range[0] && t <= range[1]) {
            animationFunction(t);
        } else if (t > range[1]) {
            animationLoop.splice(animationLoop.indexOf(rangeFunction), 1);
        }
    };
    return rangeFunction;
}

function infiniteEndpoint(animationFunction, range) {
    const rangeFunction = (t) => {
        if (t >= range[0]) {
            animationFunction(t);
        }
    };
    return rangeFunction;
}

function oneTime(animationFunction, range) {
    const rangeFunction = (t) => {
        if (t >= range) {
            animationFunction(t);
            animationLoop.splice(animationLoop.indexOf(rangeFunction), 1);
        }
    };
    return rangeFunction;
}

function applyRange(animationFunction, range) {
    let rangeFunction;
    if (Array.isArray(range)) {
        if (range.length === 1) {
            rangeFunction = infiniteEndpoint(animationFunction, range);
        } else if (range.length === 2) {
            rangeFunction = interval(animationFunction, range);
        }
    } else if (isNumeric(range)) {
        rangeFunction = oneTime(animationFunction, range);
    }
    return rangeFunction;
}

export default applyRange;
