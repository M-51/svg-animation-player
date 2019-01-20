import SVGAnimation from './constructor';
import { findSVGParent } from '../utils';
import AnimatedObject from '../animated-object/constructor';

function createMainObjectAddFunction() {
    SVGAnimation.prototype.add = function add(...objects) {
        const tempObjectList = new Set();
        objects.forEach((object) => {
            // check if object has "object property"
            if (!Object.prototype.hasOwnProperty.call(object, 'object')) {
                throw new Error(`Object ${object} must have "object" property. which is query selector or actual DOM object`);
            }
            // declare DOM object based on user input
            const DOMObject = typeof object.object === 'string' ? this.context.querySelector(object.object) : object.object;
            // check DOM object exsist
            if (!this.context.contains(DOMObject)) {
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

export default createMainObjectAddFunction;
