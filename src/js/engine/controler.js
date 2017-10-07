import draw from './draw';

const objectList = [];

function add(...objects) {
    objectList.push(...objects);
}

function dispatch(time) {
    for (let i = 0; i < objectList.length; i += 1) {
        draw(time, objectList[i]);
    }
}

export { add, dispatch };
