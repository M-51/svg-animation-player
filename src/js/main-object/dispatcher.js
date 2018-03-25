import SVGAnimation from './constructor';
import separate from '../engine/separate';
import applyAnimation from '../engine/animation/apply-animation';
import applyRange from '../engine/range/apply-range';
import interpreter from '../engine/interpreter/interpreter';

function createMainObjectDispatcher() {
    SVGAnimation.prototype.dispatcher = function dispatcher(objectList) {
        // array of [key, animation, objecy] items
        const propertiesToAnimateList = separate(objectList);
        // array of [animationFunction, animation (equation. range etc...)]
        // translate user input
        const inerpetedPropertiesToAnimateList = interpreter(propertiesToAnimateList);

        const animationList = applyAnimation(inerpetedPropertiesToAnimateList);
        // array of animationFunction with range applied
        const deleteItemFromLoop = this.deleteItemFromLoop.bind(this);
        this.loop.push(...applyRange(animationList, deleteItemFromLoop));
    };
}

export default createMainObjectDispatcher;
