import prepare from '../engine/dispatcher';
import compileSettings from '../settings';

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

export default Create;
