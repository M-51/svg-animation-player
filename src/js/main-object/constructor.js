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

export default Create;
