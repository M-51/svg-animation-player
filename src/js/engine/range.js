import { animationLoop } from './dispatcher';

function applyRange(animationFunction, range) {
    const rangeFunction = (t) => {
        if (t >= range[0] && t <= range[1]) {
            animationFunction(t);
        } else if (t > range[1]) {
            animationLoop.splice(animationLoop.indexOf(rangeFunction), 1);
        }
    };
    return rangeFunction;
}

export default applyRange;
