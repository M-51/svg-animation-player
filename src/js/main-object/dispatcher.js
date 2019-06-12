import separate from '../engine/separate';
import applyAnimation from '../engine/animation/apply-animation';
import applyRange from '../engine/range/apply-range';
import interpreter from '../engine/interpreter/interpreter';
import deleteItemFromLoop from './delete-from-loop';


function dispatcher(objectList, reference) {
    // array of [key, animation, objecy] items
    const propertiesToAnimateList = separate(objectList);
    // array of [animationFunction, animation (equation. range etc...)]
    // translate user input
    const inerpetedPropertiesToAnimateList = interpreter(propertiesToAnimateList);
    const animationList = applyAnimation(inerpetedPropertiesToAnimateList);
    // array of animationFunction with range applied
    const thisDeleteItemFromLoop = deleteItemFromLoop.bind(reference);
    reference.loop.push(...applyRange(animationList, thisDeleteItemFromLoop));
}


export default dispatcher;
