import { prepare } from './dispatcher';

const objectList = new Set();

function add(...objects) {
    objects.forEach((object) => {
        if (Object.prototype.hasOwnProperty.call(object, 'animation')) {
            objectList.add(object);
        }
    });
    prepare(objectList);
}

function init() {
    objectList.forEach((object) => {
        object.setVariables();
        object.initMatrix();
        object.decomposeMatrix();
    });
}

function reset() {
    objectList.forEach((object) => {
        object.resetAttributes();
        object.setVariables();
        object.initMatrix();
        object.decomposeMatrix();
    });
}

export { add, init, reset };
