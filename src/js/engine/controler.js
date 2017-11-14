import { prepare } from './dispatcher';

const objectList = new Set();

function add(...objects) {
    objects.forEach((object) => {
        if (Object.prototype.hasOwnProperty.call(object, 'animation')) {
            objectList.add(object);
        }
    });
}

function init() {
    objectList.forEach((object) => {
        object.setVariables();
        object.initMatrix();
        object.decomposeMatrix();
        prepare(objectList);
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
