import compileSettings from '../settings';

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

export default SVGAnimation;
