import compileSettings from '../settings';

class SVGAnimation {
    constructor(settings, context = document) {
        this.status = 'not started';
        this.timer = {
            animationId: 0,
            startTime: 0,
            time: 0,
        };
        this.settings = compileSettings(settings);
        this.objectList = new Set();
        this.loop = [];
        this.context = context;
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

export default SVGAnimation;
