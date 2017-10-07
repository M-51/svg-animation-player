svganimation.settings = {
    interfaceSize: 0.75,
};

const test = new svganimation.Obj(document.getElementById('test'));
test.animation = {
    transform: {
        translate: {
            x: this.t * 2,
            y: this.t * this.t,
        },
    },
};

svganimation.add(test);
