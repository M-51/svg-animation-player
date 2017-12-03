import compileSettings from '../settings';
import { findSVGParent } from '../utils';

class SVGAnimation {
    constructor() {
        this.status = 'not started';
        this.timer = {
            animationId: 0,
            startTime: 0,
            time: 0,
        };
    }
    init(...objects) {
        // check if objects exist
        if (objects.length === 0) { throw new Error('No objects to animate. Add objects to "init" function'); }
        // add all animated objects to "objectList" set
        this.objectList = new Set();
        objects.forEach((object) => {
            if (Object.prototype.hasOwnProperty.call(object, 'animation')) {
                this.objectList.add(object);
            }
        });
        // check if objectList is not empty
        if (this.objectList.size === 0) { throw new Error('No objects to animate. At least one object must have "animate" property'); }
        // find svg element
        this.svg = findSVGParent(objects[0].item);
        // compile user settings
        this.settings = compileSettings(this.settings);

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
