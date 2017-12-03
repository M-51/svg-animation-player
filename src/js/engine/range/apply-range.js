import { isNumeric } from '../../utils';
import infiniteEndpoint from './infnite-endpoint';
import interval from './interval';
import oneTime from './one-time';

function chooseRangeType(animationFunction, animation, deleteItemFromLoop) {
    let rangeFunction;
    const { range } = animation;
    if (Array.isArray(range)) {
        if (range.length === 1) {
            rangeFunction = infiniteEndpoint(animationFunction, animation);
        } else if (range.length === 2) {
            rangeFunction = interval(animationFunction, animation, deleteItemFromLoop);
        }
    } else if (isNumeric(range)) {
        rangeFunction = oneTime(animationFunction, animation, deleteItemFromLoop);
    }
    return rangeFunction;
}

function applyRange(animationList, deleteItemFromLoop) {
    const loop = [];
    animationList.forEach((element) => {
        const [animationFunction, animation] = element;
        if (animation.range) {
            loop.push(chooseRangeType(animationFunction, animation, deleteItemFromLoop));
        } else {
            loop.push(animationFunction);
        }
    });
    return loop;
}

export default applyRange;
