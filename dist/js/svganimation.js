var svganimation = (function (exports) {
'use strict';

class Create {
    constructor() {
        this.objectList = new Set();
        this.status = 'not started';
        this.timer = {
            animationId: 0,
            startTime: 0,
            time: 0,
        };
    }
    init(...objects) {
        objects.forEach((object) => {
            if (Object.prototype.hasOwnProperty.call(object, 'animation')) {
                this.objectList.add(object);
            }
        });
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
            // reset(); REMEMBER TO RESET ALL ITEMS!!! this.objectList
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

const defaultSettings = {
    svg: document.querySelector('svg'),
    showInterface: true,
    interfaceAnimation: true,
    interfaceSize: 1,
    interfaceColor: '#000',
    interfacePosition: 'auto',
};
const compiledSettings = {};

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

function createDrawFunction$1() {
    Create.prototype.frame = function frame() {
        console.log('a');
        /*
        for (let i = 0; i < this.loop.length; i += 1) {
            this.loop[i](this.timer.time);
        }
        */
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
