var SVGAnimation = (function () {
'use strict';

// check if argument is undefined
function undef(item) {
    return (typeof item === 'undefined');
}

// check if expresion is a number
function isNumeric(number) {
    return !Number.isNaN(parseFloat(number)) && Number.isFinite(number);
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

function findSVGParent(element) {
    let el = element.item;
    while (el.tagName) {
        if (el.tagName.toLowerCase() === 'svg') {
            return el;
        }
        el = el.parentNode;
    }
    throw new Error('Cannot find SVG element! All animated elements must have SVG parent');
}

const defaultSettings = {
    showInterface: true,
    interfaceAnimation: true,
    interfaceSize: 1,
    interfaceColor: '#000',
    interfacePosition: 'auto',
    restartAtTheEnd: false,
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

class SVGAnimation$1 {
    constructor(settings) {
        this.status = 'not started';
        this.timer = {
            animationId: 0,
            startTime: 0,
            time: 0,
        };
        this.settings = compileSettings(settings);
        this.objectList = new Set();
        this.loop = [];
    }
    reset() {
        this.objectList.forEach((object) => {
            object.resetAttributes();
            object.setVariables();
            object.initMatrix(this.svg);
            object.decomposeMatrix();
        });
        this.loop = [];
        this.dispatcher(this.objectList);
    }
}

const refreshEvent = new CustomEvent('svgRefresh');

function createPlayer() {
    SVGAnimation$1.prototype.play = function play() {
        const that = this;
        function startLoop() {
            that.timer.time = Date.now() - that.timer.startTime;
            that.frame(that.timer.time / 1000);
            that.timer.animationId = window.requestAnimationFrame(startLoop);
        }
        if (this.status === 'not started') {
            this.status = 'playing';
            this.timer.startTime = Date.now();
            this.timer.animationId = window.requestAnimationFrame(startLoop);
            if (this.settings.showInterface) {
                this.interfaceControler.playPause.pause();
                this.interfaceControler.refresh.on();
            }
        } else if (this.status === 'paused') {
            this.status = 'playing';
            this.timer.startTime = Date.now() - this.timer.time;
            this.timer.animationId = window.requestAnimationFrame(startLoop);
            if (this.settings.showInterface) {
                this.interfaceControler.playPause.pause();
            }
        }
    };

    SVGAnimation$1.prototype.pause = function pause() {
        if (this.status === 'playing') {
            this.status = 'paused';
            window.cancelAnimationFrame(this.timer.animationId);
            if (this.settings.showInterface) {
                this.interfaceControler.playPause.play();
            }
        }
    };

    SVGAnimation$1.prototype.refresh = function refresh() {
        if (this.status === 'playing' || this.status === 'paused' || this.status === 'ended') {
            if (this.settings.showInterface) {
                if (this.status === 'playing') {
                    this.interfaceControler.playPause.play();
                } else if (this.status === 'ended') {
                    this.interfaceControler.playPause.on();
                }
                this.interfaceControler.refresh.off();
            }
            this.status = 'not started';
            window.cancelAnimationFrame(this.timer.animationId);
            this.timer.startTime = 0;
            this.timer.time = 0;

            // reset all animated object to starting attributtes
            this.reset();
            this.svg.dispatchEvent(refreshEvent);
        }
    };
    SVGAnimation$1.prototype.end = function end() {
        if (this.status === 'playing' || this.status === 'paused') {
            this.status = 'ended';
            const that = this;
            window.setTimeout(() => {
                window.cancelAnimationFrame(that.timer.animationId);
                if (that.settings.restartAtTheEnd) {
                    that.refresh();
                }
                if (this.settings.showInterface) {
                    this.interfaceControler.playPause.off();
                }
            }, 0);
        }
    };
}

function createDrawFunction() {
    SVGAnimation$1.prototype.frame = function frame(time) {
        for (let i = 0; i < this.loop.length; i += 1) {
            this.loop[i](time);
        }
    };
}

function splitArray(key, object) {
    const keyEquationObject = [];
    if (Array.isArray(object.animation[key])) {
        object.animation[key].forEach((item) => {
            keyEquationObject.push([key, item, object]);
        });
    } else {
        keyEquationObject.push([key, object.animation[key], object]);
    }
    return keyEquationObject;
}


function separate(objectsList) {
    const propertiesToAnimateList = [];
    objectsList.forEach((object) => {
        Object.keys(object.animation).forEach((key) => {
            propertiesToAnimateList.push(...splitArray(key, object));
        });
    });
    return propertiesToAnimateList;
}

function translateX(matrix, x) {
    const modifiedMatrix = matrix;

    modifiedMatrix.e = x;

    return modifiedMatrix;
}

function translateY(matrix, y) {
    const modifiedMatrix = matrix;

    modifiedMatrix.f = y;

    return modifiedMatrix;
}

function translateXY(matrix, x, y) {
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

function translateXRotate(matrix, x, angle, s) {
    const modifiedMatrix = matrix;

    const c = Math.sin(angle) * s;
    const a = Math.cos(angle) * s;

    modifiedMatrix.a = a;
    modifiedMatrix.b = -c;
    modifiedMatrix.c = c;
    modifiedMatrix.d = a;
    modifiedMatrix.e = x;

    return modifiedMatrix;
}

function translateYRotate(matrix, y, angle, s) {
    const modifiedMatrix = matrix;

    const c = Math.sin(angle) * s;
    const a = Math.cos(angle) * s;

    modifiedMatrix.a = a;
    modifiedMatrix.b = -c;
    modifiedMatrix.c = c;
    modifiedMatrix.d = a;
    modifiedMatrix.f = y;

    return modifiedMatrix;
}

function translateXYRotate(matrix, x, y, angle, s) {
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

function translateXScale(matrix, x, s, angle) {
    const modifiedMatrix = matrix;

    const c = Math.sin(angle) * s;
    const a = Math.cos(angle) * s;

    modifiedMatrix.a = a;
    modifiedMatrix.b = -c;
    modifiedMatrix.c = c;
    modifiedMatrix.d = a;
    modifiedMatrix.e = x;

    return modifiedMatrix;
}

function translateYScale(matrix, y, s, angle) {
    const modifiedMatrix = matrix;

    const c = Math.sin(angle) * s;
    const a = Math.cos(angle) * s;

    modifiedMatrix.a = a;
    modifiedMatrix.b = -c;
    modifiedMatrix.c = c;
    modifiedMatrix.d = a;
    modifiedMatrix.f = y;

    return modifiedMatrix;
}

function translateXYScale(matrix, x, y, s, angle) {
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

function translateXScaleRotate(matrix, x, s, angle) {
    const modifiedMatrix = matrix;
    const c = Math.sin(angle) * s;
    const a = Math.cos(angle) * s;

    modifiedMatrix.a = a;
    modifiedMatrix.b = -c;
    modifiedMatrix.c = c;
    modifiedMatrix.d = a;
    modifiedMatrix.e = x;

    return modifiedMatrix;
}

function translateYScaleRotate(matrix, y, s, angle) {
    const modifiedMatrix = matrix;
    const c = Math.sin(angle) * s;
    const a = Math.cos(angle) * s;

    modifiedMatrix.a = a;
    modifiedMatrix.b = -c;
    modifiedMatrix.c = c;
    modifiedMatrix.d = a;
    modifiedMatrix.f = y;

    return modifiedMatrix;
}

function translateXYScaleRotate(matrix, x, y, s, angle) {
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

function chooseTransformMethod(object, transform) {
    // shortcuts
    const v = object.currentAttributes.transform; // current position/scale/rotation object
    const t = v.translate; // current translation
    const keys = Object.keys(transform);

    // check of property exist
    function check(property) {
        return keys.indexOf(property);
    }

    let animationFunc;

    if (check('translate') !== -1 && check('rotate') === -1 && check('scale') === -1) {
        // only translate
        if (transform.translate.x && transform.translate.y) {
            animationFunc = (time) => {
                t.x = transform.translate.x(time);
                t.y = transform.translate.y(time);
                const matrix = translateXY(object.matrix, t.x, t.y);
                object.setMatrix(matrix);
            };
        } else if (transform.translate.x) {
            animationFunc = (time) => {
                t.x = transform.translate.x(time);
                const matrix = translateX(object.matrix, t.x);
                object.setMatrix(matrix);
            };
        } else if (transform.translate.y) {
            animationFunc = (time) => {
                t.y = transform.translate.y(time);
                const matrix = translateY(object.matrix, t.y);
                object.setMatrix(matrix);
            };
        }
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
        if (transform.translate.x && transform.translate.y) {
            animationFunc = (time) => {
                t.x = transform.translate.x(time);
                t.y = transform.translate.y(time);
                const angle = transform.rotate(time);
                const matrix = translateXYRotate(object.matrix, t.x, t.y, angle, v.scale);
                object.setMatrix(matrix);
            };
        } else if (transform.translate.x) {
            animationFunc = (time) => {
                t.x = transform.translate.x(time);
                const angle = transform.rotate(time);
                const matrix = translateXRotate(object.matrix, t.x, angle, v.scale);
                object.setMatrix(matrix);
            };
        } else if (transform.translate.y) {
            animationFunc = (time) => {
                t.y = transform.translate.y(time);
                const angle = transform.rotate(time);
                const matrix = translateYRotate(object.matrix, t.y, angle, v.scale);
                object.setMatrix(matrix);
            };
        }
    } else if (check('translate') !== -1 && check('rotate') === -1 && check('scale') !== -1) {
        // translate and scale
        if (transform.translate.x && transform.translate.y) {
            animationFunc = (time) => {
                t.x = transform.translate.x(time);
                t.y = transform.translate.y(time);
                v.scale = transform.scale(time);
                const matrix = translateXYScale(object.matrix, t.x, t.y, v.scale, v.rotate);
                object.setMatrix(matrix);
            };
        } else if (transform.translate.x) {
            animationFunc = (time) => {
                t.x = transform.translate.x(time);
                v.scale = transform.scale(time);
                const matrix = translateXScale(object.matrix, t.x, v.scale, v.rotate);
                object.setMatrix(matrix);
            };
        } else if (transform.translate.y) {
            animationFunc = (time) => {
                t.y = transform.translate.y(time);
                v.scale = transform.scale(time);
                const matrix = translateYScale(object.matrix, t.y, v.scale, v.rotate);
                object.setMatrix(matrix);
            };
        }
    } else if (check('translate') === -1 && check('rotate') !== -1 && check('scale') !== -1) {
        // scale and rotate
        animationFunc = (time) => {
            v.rotate = transform.rotate(time);
            v.scale = transform.scale(time);
            const matrix = scaleRotate(object.matrix, v.scale, v.rotate);
            object.setMatrix(matrix);
        };
    } else if (check('translate') !== -1 && check('rotate') !== -1 && check('scale') !== -1) {
        // translate, scale, rotate
        if (transform.translate.x && transform.translate.y) {
            animationFunc = (time) => {
                t.x = transform.translate.x(time);
                t.y = transform.translate.y(time);
                v.rotate = transform.rotate(time);
                v.scale = transform.scale(time);
                const matrix = translateXYScaleRotate(object.matrix, t.x, t.y, v.scale, v.rotate);
                object.setMatrix(matrix);
            };
        } else if (transform.translate.x) {
            animationFunc = (time) => {
                t.x = transform.translate.x(time);
                v.rotate = transform.rotate(time);
                v.scale = transform.scale(time);
                const matrix = translateXScaleRotate(object.matrix, t.x, v.scale, v.rotate);
                object.setMatrix(matrix);
            };
        } else if (transform.translate.y) {
            animationFunc = (time) => {
                t.y = transform.translate.y(time);
                v.rotate = transform.rotate(time);
                v.scale = transform.scale(time);
                const matrix = translateYScaleRotate(object.matrix, t.y, v.scale, v.rotate);
                object.setMatrix(matrix);
            };
        }
    }
    return animationFunc;
}

function applyAttributeAnimation(object, key, animation) {
    const { currentAttributes } = object;
    const animationFunction = (time) => {
        const { value } = animation;
        currentAttributes[key] = value(time);
        object.setAttribute(key, currentAttributes[key]);
    };
    return animationFunction;
}

function applyAnimation(propertiesToAnimateList) {
    const animationList = [];
    propertiesToAnimateList.forEach((element) => {
        const [key, animation, object] = element;
        if (key === 'transform') {
            animationList.push([chooseTransformMethod(object, animation), animation]);
        } else {
            animationList.push([applyAttributeAnimation(object, key, animation), animation]);
        }
    });
    return animationList;
}

function infiniteEndpoint(animationFunction, animation) {
    let rangeFunction;
    if (animation.local) {
        rangeFunction = (t) => {
            if (t >= animation.range[0]) {
                animationFunction(t - animation.range[0]);
            }
        };
    } else {
        rangeFunction = (t) => {
            if (t >= animation.range[0]) {
                animationFunction(t);
            }
        };
    }
    return rangeFunction;
}

function interval(animationFunction, animation, deleteItemFromLoop) {
    let rangeFunction;
    if (animation.local) {
        rangeFunction = (t) => {
            if (t >= animation.range[0] && t <= animation.range[1]) {
                animationFunction(t - animation.range[0]);
            } else if (t > animation.range[1]) {
                animationFunction(animation.range[1] - animation.range[0]);
                deleteItemFromLoop(rangeFunction);
            }
        };
    } else {
        rangeFunction = (t) => {
            if (t >= animation.range[0] && t <= animation.range[1]) {
                animationFunction(t);
            } else if (t > animation.range[1]) {
                animationFunction(animation.range[1]);
                deleteItemFromLoop(rangeFunction);
            }
        };
    }
    return rangeFunction;
}

function oneTime(animationFunction, animation, deleteItemFromLoop) {
    let rangeFunction;
    if (animation.local) {
        rangeFunction = (t) => {
            if (t >= animation.range) {
                animationFunction(0);
                deleteItemFromLoop(rangeFunction);
            }
        };
    } else {
        rangeFunction = (t) => {
            if (t >= animation.range) {
                animationFunction(animation.range);
                deleteItemFromLoop(rangeFunction);
            }
        };
    }

    return rangeFunction;
}

function chooseRangeType(animationFunction, animation, deleteItemFromLoop) {
    let rangeFunction;
    const { range } = animation;
    if (Array.isArray(range)) {
        if (range.length === 1) {
            rangeFunction = infiniteEndpoint(animationFunction, animation);
        } else if (range.length === 2) {
            rangeFunction = interval(animationFunction, animation, deleteItemFromLoop);
        }
    } else if (isNumeric(range)) {
        rangeFunction = oneTime(animationFunction, animation, deleteItemFromLoop);
    }
    return rangeFunction;
}

function applyRange(animationList, deleteItemFromLoop) {
    const loop = [];
    animationList.forEach((element) => {
        const [animationFunction, animation] = element;
        if (animation.range) {
            loop.push(chooseRangeType(animationFunction, animation, deleteItemFromLoop));
        } else {
            loop.push(animationFunction);
        }
    });
    return loop;
}

function constantsReplacer(item) {
    const values = item[1];
    const keys = Object.keys(values);
    keys.forEach((key) => {
        if (key === 'translate') {
            if (typeof values[key].x === 'number') {
                const x = Object.assign(values[key].x);
                values[key].x = () => x;
            }
            if (typeof values[key].y === 'number') {
                const y = Object.assign(values[key].y);
                values[key].x = () => y;
            }
        } else if (key === 'rotate' || key === 'scale') {
            if (typeof values[key] === 'number') {
                const num = Object.assign(values[key]);
                values[key] = () => num;
            }
        } else if (key === 'value') {
            if (typeof values[key] === 'number' || typeof values[key] === 'string') {
                const numOrString = Object.assign(values[key]);
                values[key] = () => numOrString;
            }
        }
    });
}

function linear(t, b, c, d) {
	return c*t/d + b;
}
function easeInQuad(t, b, c, d) {
	t /= d;
	return c*t*t + b;
}
function easeOutQuad(t, b, c, d) {
	t /= d;
	return -c * t*(t-2) + b;
}
 function easeInOutQuad(t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
}
function easeInCubic(t, b, c, d) {
	t /= d;
	return c*t*t*t + b;
}
function easeOutCubic(t, b, c, d) {
	t /= d;
	t--;
	return c*(t*t*t + 1) + b;
}
function easeInOutCubic(t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t + b;
	t -= 2;
	return c/2*(t*t*t + 2) + b;
}




var e = Object.freeze({
	linear: linear,
	easeInQuad: easeInQuad,
	easeOutQuad: easeOutQuad,
	easeInOutQuad: easeInOutQuad,
	easeInCubic: easeInCubic,
	easeOutCubic: easeOutCubic,
	easeInOutCubic: easeInOutCubic
});

function interpret(obj, range, current, name) {
    const duration = range[1] - range[0];
    let start = obj.from;
    let difference = obj.to - start;
    const easingFunction = e[obj.easing] || linear;

    if (start) {
        return t => easingFunction(t, start, difference, duration);
    }

    let getCurrentAttribute = () => {
        start = current[name];
        if (typeof start === 'undefined') {
            throw new Error('No starting value! Specify "from" value, or add it to animatated SVG element');
        }
        difference = obj.to - start;
        getCurrentAttribute = () => start;
        return start;
    };

    return t => easingFunction(t, getCurrentAttribute(), difference, duration);
}


function fromToInterpreter(item) {
    if (Array.isArray(item[1].range) && item[1].range.length === 2) {
        const { currentAttributes } = item[2];
        const key = item[0];
        if (key === 'transform') {
            const transform = item[1];
            const other = currentAttributes.transform; // scale or rotate
            if (typeof transform.translate === 'object') {
                transform.local = true;
                const tr = currentAttributes.transform.translate; // actual translation
                if (typeof transform.translate.x === 'object') {
                    transform.translate.x = interpret(transform.translate.x, transform.range, tr, 'x');
                }
                if (typeof transform.translate.y === 'object') {
                    transform.translate.y = interpret(transform.translate.y, transform.range, tr, 'y');
                }
            }
            if (typeof transform.rotate === 'object') {
                transform.local = true;
                transform.rotate = interpret(transform.rotate, transform.range, other, 'rotate');
            }
            if (typeof transform.scale === 'object') {
                transform.local = true;
                transform.scale = interpret(transform.scale, transform.range, other, 'scale');
            }
        } else {
            const property = item[1];
            if (typeof property.value === 'object') {
                property.local = true;
                property.value = interpret(property.value, property.range, currentAttributes, key);
            }
        }
    }
}

function interpreter(list) {
    const interpretedList = [];
    list.forEach((item) => {
        // replace constants with functions
        constantsReplacer(item);
        fromToInterpreter(item);
        interpretedList.push(item);
    });
    return interpretedList;
}

function createMainObjectDispatcher() {
    SVGAnimation$1.prototype.dispatcher = function dispatcher(objectList) {
        // array of [key, animation, objecy] items
        const propertiesToAnimateList = separate(objectList);
        // array of [animationFunction, animation (equation. range etc...)]
        // translate user input
        const inerpetedPropertiesToAnimateList = interpreter(propertiesToAnimateList);

        const animationList = applyAnimation(inerpetedPropertiesToAnimateList);
        // array of animationFunction with range applied
        const deleteItemFromLoop = this.deleteItemFromLoop.bind(this);
        this.loop.push(...applyRange(animationList, deleteItemFromLoop));
    };
}

function createMainObjectHelpers() {
    SVGAnimation$1.prototype.deleteItemFromLoop = function deleteItemFromLoop(item) {
        this.loop.splice(this.loop.indexOf(item), 1);
        if (this.loop < 1) {
            this.end();
        }
    };
}

function createPlayPause(s, svg) {
    const group = createElNS('g');
    const playPause1 = createElNS('polygon');
    const playPause2 = createElNS('polygon');

    setAttrs(playPause1, ['points', '0,0 0,-20 20,-10 20,-10']);
    setAttrs(playPause2, ['points', '0,0 0,-20 20,-10 20,-10']);


    group.appendChild(playPause1);
    group.appendChild(playPause2);

    // button
    const button = createElNS('rect');
    setAttrs(button, ['x', '0'], ['y', '-20'], ['width', '20'], ['height', '20'], ['fill-opacity', '0']);

    // group button and icon

    const playPauseGroup = createElNS('g');
    playPauseGroup.appendChild(group);
    playPauseGroup.appendChild(button);

    // set button and icons to correct position at the bottom left of svg
    function setPosition() {
        const viewBox = svg.viewBox.baseVal;
        const matrix = svg.createSVGMatrix();
        matrix.e = viewBox.x + (viewBox.width * 0.05);
        matrix.f = viewBox.y + (viewBox.height * 0.95);
        const interfaceSize = viewBox.height / 400;
        matrix.a = interfaceSize;
        matrix.d = interfaceSize;
        playPauseGroup.transform.baseVal.initialize(svg.createSVGTransformFromMatrix(matrix));
    }

    function addUserSettings() {
        // set color
        setAttrs(group, ['fill', s.interfaceColor]);

        // set interface size
        const { matrix } = playPauseGroup.transform.baseVal.getItem(0);
        matrix.a *= s.interfaceSize;
        matrix.d *= s.interfaceSize;


        // set interface position
        if (s.interfacePosition !== 'auto') {
            [matrix.e, matrix.f] = s.interfacePosition;
        }

        playPauseGroup.transform.baseVal.getItem(0).setMatrix(matrix);
    }
    setPosition();
    addUserSettings();
    svg.appendChild(playPauseGroup);

    function switchToPause() {
        let steps = 1;
        if (!s.interfaceAnimation) {
            steps = 10;
        }
        function animate() {
            if (steps <= 10) {
                playPause1.setAttribute('points', `${steps / 10},0 ${steps / 10},-20 ${10 - (steps / 10)},${-15 - (steps / 2)} ${10 - (steps / 10)},${-5 + (steps / 2)}`);
                playPause2.setAttribute('points', `${10 + (steps / 10)},${-5 + (steps / 2)} ${10 + (steps / 10)},${-15 - (steps / 2)} ${20 - (steps / 10)},${-10 - steps} ${20 - (steps / 10)},${-10 + steps}`);
                steps += 1;
                window.requestAnimationFrame(animate);
            }
        }
        animate();
        // setAttrs(playPause1, ['points', '1,0 1,-20 9,-20 9,0']);
        // setAttrs(playPause2, ['points', '11,0 11,-20 19,-20 19,0']);
    }
    function switchToPlay() {
        let steps = 10;
        if (!s.interfaceAnimation) {
            steps = 1;
        }
        function animate() {
            if (steps >= 0) {
                playPause1.setAttribute('points', `${steps / 10},0 ${steps / 10},-20 ${10 - (steps / 10)},${-15 - (steps / 2)} ${10 - (steps / 10)},${-5 + (steps / 2)}`);
                playPause2.setAttribute('points', `${10 + (steps / 10)},${-5 + (steps / 2)} ${10 + (steps / 10)},${-15 - (steps / 2)} ${20 - (steps / 10)},${-10 - steps} ${20 - (steps / 10)},${-10 + steps}`);
                steps -= 1;
                window.requestAnimationFrame(animate);
            } else {
                playPause1.setAttribute('points', '0,0 0,-20 20,-10 20,-10');
                playPause2.setAttribute('points', '0,0 0,-20 20,-10 20,-10');
            }
        }
        animate();
        // setAttrs(playPause1, ['points', '0,0 0,-20 10,-15 10,-5']);
        // setAttrs(playPause2, ['points', '10,-5 10,-15 20,-10 20,-10']);
    }
    function switchPlayPauseOff() {
        let steps = 1;
        if (!s.interfaceAnimation) {
            steps = 10;
        }
        function animate() {
            if (steps <= 10) {
                playPause1.setAttribute('points', `1,${-steps} 1,${-20 + steps} 9,${-20 + steps} 9,${-steps}`);
                playPause2.setAttribute('points', `11,${-steps} 11,${-20 + steps} 19,${-20 + steps} 19,${-steps}`);
                steps += 1;
                window.requestAnimationFrame(animate);
            } else {
                setAttrs(group, ['display', 'none']);
            }
        }
        animate();
    }
    function switchPlayPauseOn() {
        let steps = 10;
        if (!s.interfaceAnimation) {
            steps = 0;
        }
        function animate() {
            if (steps >= 0) {
                playPause1.setAttribute('points', `0,${-steps} 0,${-20 + steps} 20,-10 20,-10`);
                playPause2.setAttribute('points', `0,${-steps} 0,${-20 + steps} 20,-10 20,-10`);
                steps -= 1;
                window.requestAnimationFrame(animate);
            } else {
                playPause1.setAttribute('points', '0,0 0,-20 20,-10 20,-10');
                playPause2.setAttribute('points', '0,0 0,-20 20,-10 20,-10');
            }
        }
        setAttrs(group, ['display', 'block']);
        animate();
        // setAttrs(playPause1, ['points', '0,0 0,-20 10,-15 10,-5']);
        // setAttrs(playPause2, ['points', '10,-5 10,-15 20,-10 20,-10']);
    }

    return {
        play: switchToPlay,
        pause: switchToPause,
        off: switchPlayPauseOff,
        on: switchPlayPauseOn,
        button,
    };
}

function createRefresh(s, svg) {
    // arrows
    const marker = createElNS('marker');
    marker.id = Math.random() * 10;
    setAttrs(marker, ['viewBox', '0 0 10 10'], ['refX', '1'], ['refY', '5'], ['markerWidth', '3'], ['markerHeight', '3'], ['orient', 'auto']);


    // arrow path
    const path = createElNS('path');
    setAttrs(path, ['d', 'M 0 0 L 10 5 L 0 10 z']);
    marker.appendChild(path);


    // icons
    const refresh = createElNS('g');
    const arc1 = createElNS('path');
    const arc2 = createElNS('path');
    setAttrs(arc1, ['d', 'M0 -10 a 10 10, 90 0 1 10 -10'], ['marker-end', `url(#${marker.id})`], ['stroke-dasharray', '15']);
    setAttrs(arc2, ['d', 'M20 -10 a 10 10, 90 0 1 -10 10'], ['marker-end', `url(#${marker.id})`], ['stroke-dasharray', '15']);
    refresh.appendChild(arc1);
    refresh.appendChild(arc2);
    setAttrs(refresh, ['fill', 'none'], ['stroke-width', '2'], ['transform', 'translate(30, 0)'], ['display', 'none']);


    // button
    const button = createElNS('rect');
    setAttrs(button, ['x', '0'], ['y', '-20'], ['width', '20'], ['height', '20'], ['fill-opacity', '0'], ['transform', 'translate(30, 0)']);

    // group button and icon

    const refreshGroup = createElNS('g');
    refreshGroup.appendChild(refresh);
    refreshGroup.appendChild(button);

    // set button and icons to correct position at the bottom left of svg
    function setPosition() {
        const viewBox = svg.viewBox.baseVal;
        const matrix = svg.createSVGMatrix();
        matrix.e = viewBox.x + (viewBox.width * 0.05);
        matrix.f = viewBox.y + (viewBox.height * 0.95);
        const interfaceSize = viewBox.height / 400;
        matrix.a = interfaceSize;
        matrix.d = interfaceSize;
        refreshGroup.transform.baseVal.initialize(svg.createSVGTransformFromMatrix(matrix));
    }

    function addUserSettings() {
    // set color
        setAttrs(refresh, ['stroke', s.interfaceColor]);
        setAttrs(marker, ['fill', s.interfaceColor]);
        // set interface size
        const { matrix } = refreshGroup.transform.baseVal.getItem(0);
        matrix.a *= s.interfaceSize;
        matrix.d *= s.interfaceSize;

        // set interface position
        if (s.interfacePosition !== 'auto') {
            [matrix.e, matrix.f] = s.interfacePosition;
        }

        refreshGroup.transform.baseVal.getItem(0).setMatrix(matrix);
    }
    let defs = svg.getElementsByTagName('defs')[0];

    // check for defs element in DOM, if not exist - add it
    if (!defs) {
        defs = createElNS('defs');
        svg.insertBefore(defs, svg.firstChild);
    }

    setPosition();

    addUserSettings();

    // add button to DOM
    defs.appendChild(marker);
    svg.appendChild(refreshGroup);

    function switchRefreshOff() {
        let steps = 1;
        if (!s.interfaceAnimation) {
            steps = 10;
        }
        function animate() {
            if (steps <= 10) {
                arc1.setAttribute('stroke-dashoffset', -steps * 1.5);
                arc2.setAttribute('stroke-dashoffset', -steps * 1.5);
                steps += 1;
                window.requestAnimationFrame(animate);
            } else {
                setAttrs(refresh, ['display', 'none']);
            }
        }
        animate();
    }

    function switchRefreshOn() {
        setAttrs(refresh, ['display', 'block']);
        let steps = 10;
        if (!s.interfaceAnimation) {
            steps = 1;
        }
        function animate() {
            if (steps >= 0) {
                arc1.setAttribute('stroke-dashoffset', -steps * 1.5);
                arc2.setAttribute('stroke-dashoffset', -steps * 1.5);
                steps -= 1;
                window.requestAnimationFrame(animate);
            }
        }
        animate();
    }

    return {
        off: switchRefreshOff,
        on: switchRefreshOn,
        button,
    };
}

function createInterfaceControler() {
    SVGAnimation$1.prototype.interfaceControler = function interfaceControler() {
        const playPause = createPlayPause(this.settings, this.svg);
        const refresh = createRefresh(this.settings, this.svg);

        const that = this;

        function controlPlayPause() {
            if (that.status === 'not started' || that.status === 'paused') {
                that.play();
            } else if (that.status === 'playing') {
                that.pause();
            }
        }

        function controlRefresh() {
            if (that.status === 'playing' || that.status === 'paused' || that.status === 'ended') {
                that.refresh();
            }
        }
        playPause.button.addEventListener('click', controlPlayPause, false);
        refresh.button.addEventListener('click', controlRefresh, false);

        return {
            playPause,
            refresh,
        };
    };
}

function getAttributes(object) {
    const list = new Map();
    const { attributes } = object;
    for (let i = 0; i < attributes.length; i += 1) {
        if (attributes[i].specified) {
            list.set(attributes[i].name, attributes[i].value);
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

function parseAttributes(attributes) {
    const variables = {};
    attributes.forEach((value, key) => {
        if (key !== 'id' && key !== 'class' && key !== 'transform') {
            const parsedValue = parseFloat(value);
            if (!Number.isNaN(parsedValue) && parsedValue.toString() === value) {
                variables[key] = parsedValue;
            } else {
                variables[key] = value;
            }
        }
    });
    return variables;
}

function initMatrix(object, svg) {
    let matrix = null;
    const svgTransform = object.transform.baseVal;
    if (svgTransform.length) {
        svgTransform.consolidate();
        ({ matrix } = svgTransform.getItem(0));
    } else {
        matrix = svg.createSVGMatrix();
    }
    svgTransform.initialize(svg.createSVGTransformFromMatrix(matrix));
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

class AnimatedObject {
    constructor(item) {
        this.item = item;
    }
    setVariables() {
        this.startingAttributes = getAttributes(this.item);
        this.currentAttributes = parseAttributes(this.startingAttributes);
    }
    initMatrix(settings) {
        initMatrix(this.item, settings);
        this.matrix = this.item.transform.baseVal.getItem(0).matrix;
        this.SVGTransform = this.item.transform.baseVal.getItem(0);
    }
    resetAttributes() {
        resetAttributes(this.item, this.startingAttributes);
    }
    decomposeMatrix() {
        this.currentAttributes.transform = decomposeMatrix(this.matrix);
    }
    setMatrix(matrix) {
        this.SVGTransform.setMatrix(matrix);
    }
    setAttribute(name, value) {
        this.item.setAttributeNS(null, name, value);
    }
}

function createMainObjectAddFunction() {
    SVGAnimation$1.prototype.add = function add(...objects) {
        const tempObjectList = new Set();
        objects.forEach((object) => {
            // check if object has "object property"
            if (!Object.prototype.hasOwnProperty.call(object, 'object')) {
                throw new Error(`Object ${object} must have "object" property. which is query selector or actual DOM object`);
            }
            // declare DOM object based on user input
            const DOMObject = typeof object.object === 'string' ? document.querySelector(object.object) : object.object;
            // check DOM object exsist
            if (!document.contains(DOMObject)) {
                throw new Error(`Cannot find ${typeof object.object === 'string' ? `DOM element that match "${object.object}" query selector` : `${object.object} in DOM`}`);
            }
            // create animated object
            const tempObject = new AnimatedObject(DOMObject);

            if (Object.prototype.hasOwnProperty.call(object, 'animation')) {
                tempObject.animation = object.animation;
            } else {
                throw new Error(`Object ${object} must have "animation" property`);
            }
            // find SVG parent
            if (!this.svg) {
                this.svg = findSVGParent(tempObject);
            }
            tempObjectList.add(tempObject);
            tempObject.setVariables();
            // initialize transformation matrix
            tempObject.initMatrix(this.svg);
            // decompose initial matrix
            tempObject.decomposeMatrix();
            this.objectList.add(tempObject);
        });
        // enable interface if needed
        if (typeof this.interfaceControler === 'function' && this.settings.showInterface) {
            this.interfaceControler = this.interfaceControler();
        }
        this.dispatcher(tempObjectList);
    };
}

createPlayer();
createDrawFunction();
createMainObjectDispatcher();
createMainObjectHelpers();
createInterfaceControler();
createMainObjectAddFunction();

return SVGAnimation$1;

}());
//# sourceMappingURL=svganimation.js.map
