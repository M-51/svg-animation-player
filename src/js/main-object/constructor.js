import compileSettings from '../settings';
import { findSVGParent } from '../utils';
import AnimatedObject from '../animated-object/constructor';

class SVGAnimation {
    constructor(settings) {
        this.status = 'not started';
        this.timer = {
            animationId: 0,
            startTime: 0,
            time: 0,
        };
        this.settings = compileSettings(settings);
        this.objectList = new Set();
    }
    add(...objects) {
        objects.forEach((object) => {
            if (!Object.prototype.hasOwnProperty.call(object, 'object')) {
                throw new Error(`Object ${object} must have "object" property. which is query selector or actual DOM object`);
            }
            const DOMObject = typeof object.object === 'string' ? document.querySelector(object.object) : object.object;
            if (!document.contains(DOMObject)) {
                throw new Error(`Cannot find ${typeof object.object === 'string' ? `DOM element that match "${object.object}" query selector` : `${object.object} in DOM`}`);
            }
            const tempObject = new AnimatedObject(DOMObject);

            if (Object.prototype.hasOwnProperty.call(object, 'animation')) {
                tempObject.animation = object.animation;
            } else {
                throw new Error(`Object ${object} must have "animation" property`);
            }
            this.objectList.add(tempObject);
            // }
        });
    }
    init() {
        // check if objectList is not empty
        if (this.objectList.size === 0) { throw new Error('No objects to animate. Add at least one object with "animate" property'); }
        // find svg element
        this.svg = findSVGParent(this.objectList);

        // initialize all animated objects
        this.objectList.forEach((object) => {
            // remember starting attributtes
            object.setVariables();
            // initialize transformation matrix
            object.initMatrix(this.svg);
            // decompose initial matrix
            object.decomposeMatrix();
        });

        this.dispatcher();

        if (this.settings.showInterface) {
            this.interfaceControler = this.interfaceControler();
        }
    }
    reset() {
        this.objectList.forEach((object) => {
            object.resetAttributes();
            object.setVariables();
            object.initMatrix(this.svg);
            object.decomposeMatrix();
        });
        this.dispatcher();
    }
}

export default SVGAnimation;
