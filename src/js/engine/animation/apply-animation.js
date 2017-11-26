import transformControler from './transform/transform-controler';

function applyAnimation(propertiesToAnimateList) {
    const animationList = [];
    propertiesToAnimateList.forEach((element) => {
        const [key, animation, object] = element;
        if (key === 'transform') {
            animationList.push([transformControler(object, animation), animation]);
        }
    });
    return animationList;
}

export default applyAnimation;
