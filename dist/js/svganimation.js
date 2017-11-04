var svganimation = (function (exports) {
'use strict';

// check if argument is undefined
function undef(item) {
    return (typeof item === 'undefined');
}

// create element NS
// accepts element name as paramater
function createElNS(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}

// set multiple attributtes NS
// setAttrs(element, [name, value], [name2,value2]...)
function setAttrs(element, ...attributtes) {
    attributtes.forEach((attributte) => {
        element.setAttributeNS(null, attributte[0], attributte[1]);
    });
}

const defaultSettings = {
    svg: document.querySelector('svg'),
    showInterface: true,
    interfaceAnimation: true,
    interfaceSize: 1,
    interfaceColor: '#000',
    interfacePosition: 'auto',
};
const compiledSettings = {};

function compileSettings() {
    Object.keys(defaultSettings).forEach((rule) => {
        if (!undef(svganimation.settings) && !undef(svganimation.settings[rule])) {
            compiledSettings[rule] = svganimation.settings[rule];
        } else {
            compiledSettings[rule] = defaultSettings[rule];
        }
    });
}

// arrows
const marker = createElNS('marker');
marker.id = 'arrow';
setAttrs(marker, ['viewBox', '0 0 10 10'], ['refX', '1'], ['refY', '5'], ['markerWidth', '3'], ['markerHeight', '3'], ['orient', 'auto']);


// arrow path
const path = createElNS('path');
setAttrs(path, ['d', 'M 0 0 L 10 5 L 0 10 z']);
marker.appendChild(path);


// icons
const refresh = createElNS('g');
const arc1 = createElNS('path');
const arc2 = createElNS('path');
setAttrs(arc1, ['d', 'M-10 0 A 10 10 0 0 1 0 -10'], ['marker-end', 'url(#arrow)']);
setAttrs(arc2, ['d', 'M10 0 A 10 10 0 0 1 0 10'], ['marker-end', 'url(#arrow)']);
refresh.appendChild(arc1);
refresh.appendChild(arc2);
setAttrs(refresh, ['fill', 'none'], ['stroke-width', '2'], ['transform', 'translate(30, 0)']);


// button
const button = createElNS('rect');
button.id = 'refresh';
setAttrs(button, ['x', '-10'], ['y', '-10'], ['width', '20'], ['height', '20'], ['fill-opacity', '0'], ['transform', 'translate(30, 0)']);

// group button and icon

const refreshGroup = createElNS('g');
refreshGroup.appendChild(refresh);
refreshGroup.appendChild(button);

// set button and icons to correct position at the bottom left of svg
function setPosition() {
    const viewBox = compiledSettings.svg.viewBox.baseVal;
    const matrix = compiledSettings.svg.createSVGMatrix();
    matrix.e = viewBox.x + 25;
    matrix.f = viewBox.y + (viewBox.height - 25);
    refreshGroup.transform.baseVal.initialize(compiledSettings.svg.createSVGTransformFromMatrix(matrix));
}

function addUserSettings() {
    // set color
    setAttrs(refresh, ['stroke', compiledSettings.interfaceColor]);
    setAttrs(marker, ['fill', compiledSettings.interfaceColor]);

    // set interface size
    const { matrix } = refreshGroup.transform.baseVal.getItem(0);
    matrix.a = compiledSettings.interfaceSize;
    matrix.d = compiledSettings.interfaceSize;

    // set interface position
    if (compiledSettings.interfacePosition !== 'auto') {
        [matrix.e, matrix.f] = compiledSettings.interfacePosition;
    }

    refreshGroup.transform.baseVal.getItem(0).setMatrix(matrix);
}

function switchRefreshOff() {
    setAttrs(refresh, ['display', 'none']);
}

function switchRefreshOn() {
    setAttrs(refresh, ['display', 'block']);
}

function addButtonToDOM() {
    let defs = compiledSettings.svg.getElementsByTagName('defs')[0];

    // check for defs element in DOM, if not exist - add it
    if (!defs) {
        defs = createElNS('defs');
        compiledSettings.svg.insertBefore(defs, compiledSettings.svg.firstChild);
    }

    setPosition();

    addUserSettings();

    // add button to DOM
    defs.appendChild(marker);
    compiledSettings.svg.appendChild(refreshGroup);
}

const group = createElNS('g');
const playPause1 = createElNS('polygon');
const playPause2 = createElNS('polygon');

setAttrs(playPause1, ['points', '-10,-10 -10,10 0,-5 0,5']);
setAttrs(playPause2, ['points', '-10,-10 -10,10 10,0 10,0']);


group.appendChild(playPause1);
group.appendChild(playPause2);

// button
const button$1 = createElNS('rect');
button$1.id = 'playPause';
setAttrs(button$1, ['x', '-10'], ['y', '-10'], ['width', '20'], ['height', '20'], ['fill-opacity', '0']);

// group button and icon

const playPauseGroup = createElNS('g');
playPauseGroup.appendChild(group);
playPauseGroup.appendChild(button$1);

// set button and icons to correct position at the bottom left of svg
function setPosition$1() {
    const viewBox = compiledSettings.svg.viewBox.baseVal;
    const matrix = compiledSettings.svg.createSVGMatrix();
    matrix.e = viewBox.x + 25;
    matrix.f = viewBox.y + (viewBox.height - 25);
    playPauseGroup.transform.baseVal.initialize(compiledSettings.svg.createSVGTransformFromMatrix(matrix));
}

function addUserSettings$1() {
    // set color
    setAttrs(group, ['fill', compiledSettings.interfaceColor]);

    // set interface size
    const { matrix } = playPauseGroup.transform.baseVal.getItem(0);
    matrix.a = compiledSettings.interfaceSize;
    matrix.d = compiledSettings.interfaceSize;

    // set interface position
    if (compiledSettings.interfacePosition !== 'auto') {
        [matrix.e, matrix.f] = compiledSettings.interfacePosition;
    }

    playPauseGroup.transform.baseVal.getItem(0).setMatrix(matrix);
}

function switchToPause() {
    setAttrs(playPause1, ['points', '-9,-10 -9,10 -2,10 -2,-10']);
    setAttrs(playPause2, ['points', '2,-10 2,10 9,10 9,-10']);
}
function switchToPlay() {
    setAttrs(playPause1, ['points', '-10,-10 -10,10 0,-5 0,5']);
    setAttrs(playPause2, ['points', '-10,-10 -10,10 10,0 10,0']);
}

function addButtonToDOM$1() {
    setPosition$1();
    addUserSettings$1();
    compiledSettings.svg.appendChild(playPauseGroup);
}

function start$1() {
    addButtonToDOM();
    addButtonToDOM$1();
}

function translate(matrix, x, y) {
    const modifiedMatrix = matrix;

    modifiedMatrix.e = x;
    modifiedMatrix.f = y;

    return modifiedMatrix;
}

function rotate(matrix, angle, s) {
    const modifiedMatrix = matrix;

    const c = Math.sin(angle) * s;
    const a = Math.cos(angle) * s;

    modifiedMatrix.a = a;
    modifiedMatrix.b = -c;
    modifiedMatrix.c = c;
    modifiedMatrix.d = a;

    return modifiedMatrix;
}

function scale(matrix, s, angle) {
    const modifiedMatrix = matrix;

    const c = Math.sin(angle) * s;
    const a = Math.cos(angle) * s;

    modifiedMatrix.a = a;
    modifiedMatrix.b = -c;
    modifiedMatrix.c = c;
    modifiedMatrix.d = a;

    return modifiedMatrix;
}

function translateRotate(matrix, x, y, angle, s) {
    const modifiedMatrix = matrix;

    const c = Math.sin(angle) * s;
    const a = Math.cos(angle) * s;

    modifiedMatrix.a = a;
    modifiedMatrix.b = -c;
    modifiedMatrix.c = c;
    modifiedMatrix.d = a;
    modifiedMatrix.e = x;
    modifiedMatrix.f = y;

    return modifiedMatrix;
}

function translateScale(matrix, x, y, s, angle) {
    const modifiedMatrix = matrix;

    const c = Math.sin(angle) * s;
    const a = Math.cos(angle) * s;

    modifiedMatrix.a = a;
    modifiedMatrix.b = -c;
    modifiedMatrix.c = c;
    modifiedMatrix.d = a;
    modifiedMatrix.e = x;
    modifiedMatrix.f = y;

    return modifiedMatrix;
}

function scaleRotate(matrix, s, angle) {
    const modifiedMatrix = matrix;

    const c = Math.sin(angle) * s;
    const a = Math.cos(angle) * s;

    modifiedMatrix.a = a;
    modifiedMatrix.b = -c;
    modifiedMatrix.c = c;
    modifiedMatrix.d = a;

    return modifiedMatrix;
}

function translateScaleRotate(matrix, x, y, s, angle) {
    const modifiedMatrix = matrix;
    const c = Math.sin(angle) * s;
    const a = Math.cos(angle) * s;

    modifiedMatrix.a = a;
    modifiedMatrix.b = -c;
    modifiedMatrix.c = c;
    modifiedMatrix.d = a;
    modifiedMatrix.e = x;
    modifiedMatrix.f = y;

    return modifiedMatrix;
}

function chooseTransformMethod$1(object, transform) {
    // shortcuts
    const v = object.transform; // current position/scale/rotation object
    const t = v.translate; // current translation
    const keys = Object.keys(transform);

    // check of property exist
    function check(property) {
        return keys.indexOf(property);
    }

    let animationFunc;

    if (check('translate') !== -1 && check('rotate') === -1 && check('scale') === -1) {
        // only translate
        animationFunc = (time) => {
            t.x = transform.translate.x(time);
            t.y = transform.translate.y(time);
            const matrix = translate(object.matrix, t.x, t.y);
            object.setMatrix(matrix);
        };
    } else if (check('translate') === -1 && check('rotate') !== -1 && check('scale') === -1) {
        // only rotate
        animationFunc = (time) => {
            v.rotate = transform.rotate(time);
            const matrix = rotate(object.matrix, v.rotate, v.scale);
            object.setMatrix(matrix);
        };
    } else if (check('translate') === -1 && check('rotate') === -1 && check('scale') !== -1) {
        // only scale
        animationFunc = (time) => {
            v.scale = transform.scale(time);
            const matrix = scale(object.matrix, v.scale, v.rotate);
            object.setMatrix(matrix);
        };
    } else if (check('translate') !== -1 && check('rotate') !== -1 && check('scale') === -1) {
        // translate and rotate
        animationFunc = (time) => {
            t.x = transform.translate.x(time);
            t.y = transform.translate.y(time);
            const angle = transform.rotate(time);
            const matrix = translateRotate(object.matrix, t.x, t.y, angle, v.scale);
            object.setMatrix(matrix);
        };
    } else if (check('translate') !== -1 && check('rotate') === -1 && check('scale') !== -1) {
        // translate and scale
        animationFunc = (time) => {
            t.x = transform.translate.x(time);
            t.y = transform.translate.y(time);
            v.scale = transform.scale(time);
            const matrix = translateScale(object.matrix, t.x, t.y, v.scale, v.rotate);
            object.setMatrix(matrix);
        };
    } else if (check('translate') === -1 && check('rotate') !== -1 && check('scale') !== -1) {
        animationFunc = (time) => {
            v.rotate = transform.rotate(time);
            v.scale = transform.scale(time);
            const matrix = scaleRotate(object.matrix, v.scale, v.rotate);
            object.setMatrix(matrix);
        };
    } else if (check('translate') !== -1 && check('rotate') !== -1 && check('scale') !== -1) {
        animationFunc = (time) => {
            t.x = transform.translate.x(time);
            t.y = transform.translate.y(time);
            v.rotate = transform.rotate(time);
            v.scale = transform.scale(time);
            const matrix = translateScaleRotate(object.matrix, t.x, t.y, v.scale, v.rotate);
            object.setMatrix(matrix);
        };
    }
    return animationFunc;
}

const animationLoop = [];

function sort(key, object) {
    if (key === 'transform') {
        if (Array.isArray(object.animation.transform)) {
            object.animation.transform.forEach((item) => {
                animationLoop.push(chooseTransformMethod$1(object, item));
            });
        } else {
            animationLoop.push(chooseTransformMethod$1(object, object.animation.transform));
        }
    } else {
        console.log(key);
    }
}

function prepare(objectsList) {
    objectsList.forEach((object) => {
        const keys = Object.keys(object.animation);
        keys.forEach((key) => {
            sort(key, object);
        });
    });
}

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

function reset$1() {
    objectList.forEach((object) => {
        object.resetAttributes();
        object.setVariables();
        object.initMatrix();
        object.decomposeMatrix();
    });
}

function frame(time) {
    for (let i = 0; i < animationLoop.length; i += 1) {
        animationLoop[i](time);
    }
}

let animationID = 0;
let startTime = 0;
let time = 0;

function animate() {
    function startLoop() {
        time = Date.now() - startTime;
        frame(time / 1000);
        animationID = window.requestAnimationFrame(startLoop);
    }
    animationID = window.requestAnimationFrame(startLoop);
}

function start$3() {
    startTime = Date.now();
    animate();
}

function resume() {
    startTime = Date.now() - time;
    animate();
}

function pause() {
    window.cancelAnimationFrame(animationID);
}

function refresh$1() {
    window.cancelAnimationFrame(animationID);
    startTime = 0;
    time = 0;
    reset$1();
}

let status = 'not started';

function playStop() {
    if (status === 'not started') {
        status = 'playing';
        switchRefreshOn();
        switchToPause();
        start$3();
    } else if (status === 'playing') {
        status = 'paused';
        pause();
        switchToPlay();
    } else if (status === 'paused') {
        status = 'playing';
        resume();
        switchToPause();
    }
}

function reset() {
    if (status === 'playing' || status === 'paused' || status === 'ended') {
        status = 'not started';
        switchRefreshOff();
        refresh$1();
        switchToPlay();
    }
}
function start$2() {
    button$1.addEventListener('click', playStop, false);
    switchRefreshOff();
    button.addEventListener('click', reset, false);
}

function getAttributes(object) {
    const list = new Map();
    const { attributes } = object;
    for (let i = 0; i < attributes.length; i += 1) {
        if (attributes[i].specified) {
            list.set(attributes[i].name, parseFloat(attributes[i].value) || attributes[i].value);
        }
    }
    return list;
}

function resetAttributes(object, attributes) {
    // remove all attributes
    while (object.attributes.length > 0) {
        object.removeAttribute(object.attributes[0].name);
    }
    // set new attributes
    attributes.forEach((value, key) => {
        object.setAttribute(key, value);
    });
}

function initMatrix(object) {
    let matrix = null;
    const svgTransform = object.transform.baseVal;
    if (svgTransform.length) {
        svgTransform.consolidate();
        ({ matrix } = svgTransform.getItem(0));
    } else {
        matrix = compiledSettings.svg.createSVGMatrix();
    }
    svgTransform.initialize(compiledSettings.svg.createSVGTransformFromMatrix(matrix));
}

function decomposeMatrix(m) {
    const transform = {};
    transform.translate = {
        x: m.e,
        y: m.f,
    };
    transform.scale = Math.sign(m.a) * Math.sqrt((m.a * m.a) + (m.c * m.c));
    transform.rotate = Math.atan2(-m.c, m.a) * (180 / Math.PI);

    return transform;
}

class Obj {
    constructor(item) {
        this.item = item;
        this.t = null;
    }
    setVariables() {
        this.variables = getAttributes(this.item);
    }
    initMatrix() {
        initMatrix(this.item);
        this.matrix = this.item.transform.baseVal.getItem(0).matrix;
        this.SVGTransform = this.item.transform.baseVal.getItem(0);
    }
    resetAttributes() {
        resetAttributes(this.item, this.variables);
    }
    decomposeMatrix() {
        this.transform = decomposeMatrix(this.matrix);
    }
    setMatrix(matrix) {
        this.SVGTransform.setMatrix(matrix);
    }
}

function start(...objects) {
    add(...objects);
    compileSettings();
    start$1();
    start$2();
    init();
}

exports.Obj = Obj;
exports.start = start;

return exports;

}({}));
//# sourceMappingURL=svganimation.js.map
