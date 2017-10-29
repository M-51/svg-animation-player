import draw from './draw';

const objectList = [];

function add(...objects) {
    objectList.push(...objects);
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

function dispatch(time) {
    for (let i = 0; i < objectList.length; i += 1) {
        draw(time, objectList[i]);
    }
}

export { add, dispatch, init, reset };
