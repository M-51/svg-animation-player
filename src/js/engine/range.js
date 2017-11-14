import { animationLoop } from './dispatcher';
import { isNumeric } from '../utils';

function interval(animationFunction, range, local) {
    let rangeFunction;
    if (local) {
        rangeFunction = (t) => {
            if (t >= range[0] && t <= range[1]) {
                animationFunction(t - range[0]);
            } else if (t > range[1]) {
                animationLoop.splice(animationLoop.indexOf(rangeFunction), 1);
            }
        };
    } else {
        rangeFunction = (t) => {
            if (t >= range[0] && t <= range[1]) {
                animationFunction(t);
            } else if (t > range[1]) {
                animationLoop.splice(animationLoop.indexOf(rangeFunction), 1);
            }
        };
    }
    return rangeFunction;
}

function infiniteEndpoint(animationFunction, range, local) {
    let rangeFunction;
    if (local) {
        rangeFunction = (t) => {
            if (t >= range[0]) {
                animationFunction(t - range[0]);
            }
        };
    } else {
        rangeFunction = (t) => {
            if (t >= range[0]) {
                animationFunction(t);
            }
        };
    }
    return rangeFunction;
}

function oneTime(animationFunction, range, local) {
    let rangeFunction;
    if (local) {
        rangeFunction = (t) => {
            if (t >= range) {
                animationFunction(t - range);
                animationLoop.splice(animationLoop.indexOf(rangeFunction), 1);
            }
        };
    } else {
        rangeFunction = (t) => {
            if (t >= range) {
                animationFunction(t);
                animationLoop.splice(animationLoop.indexOf(rangeFunction), 1);
            }
        };
    }

    return rangeFunction;
}

function applyRange(animationFunction, range, local) {
    let rangeFunction;
    if (Array.isArray(range)) {
        if (range.length === 1) {
            rangeFunction = infiniteEndpoint(animationFunction, range, local);
        } else if (range.length === 2) {
            rangeFunction = interval(animationFunction, range, local);
        }
    } else if (isNumeric(range)) {
        rangeFunction = oneTime(animationFunction, range, local);
    }
    return rangeFunction;
}

export default applyRange;
