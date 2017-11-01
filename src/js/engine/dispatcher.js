import transformControler from './animation-functions/transform/transform-controler';

function prepare(objectsList) {
    objectsList.forEach((object) => {
        const keys = Object.keys(object.animation);
        keys.forEach((key) => {
            if (key === 'transform') {
                transformControler(object);
            }
        });
    });
}

export { prepare };
