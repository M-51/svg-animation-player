var svganimation = (function (exports) {
'use strict';

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

// check if argument is undefined
function undef(item) {
    return (typeof item === 'undefined');
}

// check if expresion is a number
function isNumeric(number) {
    return !Number.isNaN(parseFloat(number)) && Number.isFinite(number);
}

function interval(animationFunction, range, local, loop) {
    let rangeFunction;
    if (local) {
        rangeFunction = (t) => {
            if (t >= range[0] && t <= range[1]) {
                animationFunction(t - range[0]);
            } else if (t > range[1]) {
                loop.splice(loop.indexOf(rangeFunction), 1);
            }
        };
    } else {
        rangeFunction = (t) => {
            if (t >= range[0] && t <= range[1]) {
                animationFunction(t);
            } else if (t > range[1]) {
                loop.splice(loop.indexOf(rangeFunction), 1);
            }
        };
    }
    return rangeFunction;
}

function infiniteEndpoint(animationFunction, range, local) {
    let rangeFunction;
    if (local) {
        rangeFunction = (t) => {
            if (t >= range[0]) {
                animationFunction(t - range[0]);
            }
        };
    } else {
        rangeFunction = (t) => {
            if (t >= range[0]) {
                animationFunction(t);
            }
        };
    }
    return rangeFunction;
}

function oneTime(animationFunction, range, local, loop) {
    let rangeFunction;
    if (local) {
        rangeFunction = (t) => {
            if (t >= range) {
                animationFunction(t - range);
                loop.splice(loop.indexOf(rangeFunction), 1);
            }
        };
    } else {
        rangeFunction = (t) => {
            if (t >= range) {
                animationFunction(t);
                loop.splice(loop.indexOf(rangeFunction), 1);
            }
        };
    }

    return rangeFunction;
}

function applyRange$1(animationFunction, range, local, loop) {
    let rangeFunction;
    if (Array.isArray(range)) {
        if (range.length === 1) {
            rangeFunction = infiniteEndpoint(animationFunction, range, local);
        } else if (range.length === 2) {
            rangeFunction = interval(animationFunction, range, local, loop);
        }
    } else if (isNumeric(range)) {
        rangeFunction = oneTime(animationFunction, range, local, loop);
    }
    return rangeFunction;
}

function applyRange(animationFunction, animation, loop) {
    if (animation.range) {
        loop.push(applyRange$1(animationFunction, animation.range, animation.local, loop));
    } else {
        loop.push(animationFunction);
    }
}

function sort(key, animation, object, loop) {
    let animationFunction;
    if (key === 'transform') {
        animationFunction = chooseTransformMethod$1(object, animation);
    }
    applyRange(animationFunction, animation, loop);
}

function separate(key, object, loop) {
    if (Array.isArray(object.animation[key])) {
        object.animation[key].forEach((item) => {
            sort(key, item, object, loop);
        });
    } else {
        sort(key, object.animation[key], object, loop);
    }
}

function prepare(objectsList) {
    const loop = [];

    objectsList.forEach((object) => {
        const keys = Object.keys(object.animation);
        keys.forEach((key) => {
            separate(key, object, loop);
        });
    });
    return loop;
}

const defaultSettings = {
    svg: document.querySelector('svg'),
    showInterface: true,
    interfaceAnimation: true,
    interfaceSize: 1,
    interfaceColor: '#000',
    interfacePosition: 'auto',
};


function compileSettings(settings) {
    const compiledSettings = {};
    Object.keys(defaultSettings).forEach((rule) => {
        if (!undef(settings) && !undef(settings[rule])) {
            compiledSettings[rule] = settings[rule];
        } else {
            compiledSettings[rule] = defaultSettings[rule];
        }
    });
    return compiledSettings;
}

class Create {
    constructor() {
        this.status = 'not started';
        this.timer = {
            animationId: 0,
            startTime: 0,
            time: 0,
        };
    }
    init(...objects) {
        // add all animated objects to "objectList" set
        this.objectList = new Set();
        objects.forEach((object) => {
            if (Object.prototype.hasOwnProperty.call(object, 'animation')) {
                this.objectList.add(object);
            }
        });
        // compile user settings
        this.settings = compileSettings(this.settings);

        // initialize all animated objects
        this.objectList.forEach((object) => {
            // remember starting attributtes
            object.setVariables();
            // initialize transformation matrix
            object.initMatrix(this.settings);
            // decompose initial matrix
            object.decomposeMatrix();
        });

        this.loop = prepare(this.objectList);
    }
    reset() {
        this.objectList.forEach((object) => {
            object.resetAttributes();
            object.setVariables();
            object.initMatrix(this.settings);
            object.decomposeMatrix();
        });
        this.loop = prepare(this.objectList);
    }
}

function createPlayer$1() {
    Create.prototype.play = function play() {
        if (this.status === 'not started') {
            this.status = 'playing';
            this.timer.startTime = Date.now();
        } else if (this.status === 'paused') {
            this.status = 'playing';
            this.timer.startTime = Date.now() - this.timer.time;
        }
        const that = this;
        function startLoop() {
            that.timer.time = Date.now() - that.timer.startTime;
            that.frame(that.timer.time / 1000);
            that.timer.animationID = window.requestAnimationFrame(startLoop);
        }
        this.timer.animationID = window.requestAnimationFrame(startLoop);
    };

    Create.prototype.pause = function pause() {
        if (this.status === 'playing') {
            this.status = 'paused';
            window.cancelAnimationFrame(this.timer.animationID);
        }
    };

    Create.prototype.refresh = function refresh() {
        if (this.status === 'playing' || this.status === 'paused' || this.status === 'ended') {
            this.status = 'not started';
            window.cancelAnimationFrame(this.timer.animationID);
            this.timer.startTime = 0;
            this.timer.time = 0;

            // reset all animated object to starting attributtes
            this.reset();
        }
    };
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

function initMatrix(object, settings) {
    let matrix = null;
    const svgTransform = object.transform.baseVal;
    if (svgTransform.length) {
        svgTransform.consolidate();
        ({ matrix } = svgTransform.getItem(0));
    } else {
        matrix = settings.svg.createSVGMatrix();
    }
    svgTransform.initialize(settings.svg.createSVGTransformFromMatrix(matrix));
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
    }
    setVariables() {
        this.variables = getAttributes(this.item);
    }
    initMatrix(settings) {
        initMatrix(this.item, settings);
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

function createDrawFunction$1() {
    Create.prototype.frame = function frame(time) {
        for (let i = 0; i < this.loop.length; i += 1) {
            this.loop[i](time);
        }
    };
}

// import buttons from './interface/interface';
// import { compileSettings } from './settings';
// import { add, init } from './engine/controler';
createPlayer$1();
createDrawFunction$1();

exports.Obj = Obj;
exports.Create = Create;

return exports;

}({}));
//# sourceMappingURL=svganimation.js.map
