import transformControler from './transform/transform-controler';
import attributeControler from './attribute/attribute-controler';

function applyAnimation(propertiesToAnimateList) {
    const animationList = [];
    propertiesToAnimateList.forEach((element) => {
        const [key, animation, object] = element;
        if (key === 'transform') {
            animationList.push([transformControler(object, animation), animation]);
        } else {
            animationList.push([attributeControler(object, key, animation), animation]);
        }
    });
    return animationList;
}

export default applyAnimation;
