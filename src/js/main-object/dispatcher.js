import SVGAnimation from './constructor';
import separate from '../engine/separate';
import applyAnimation from '../engine/animation/apply-animation';
import applyRange from '../engine/range/apply-range';

function createMainObjectDispatcher() {
    SVGAnimation.prototype.dispatcher = function dispatcher(objectList) {
        // array of [key, animation, objecy] items
        const propertiesToAnimateList = separate(objectList);
        // array of [animationFunction, animation (equation. range etc...)]
        const animationList = applyAnimation(propertiesToAnimateList);
        // array of animationFunction with range applied
        const deleteItemFromLoop = this.deleteItemFromLoop.bind(this);
        this.loop.push(...applyRange(animationList, deleteItemFromLoop));
    };
}

export default createMainObjectDispatcher;
