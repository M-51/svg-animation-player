import SVGAnimation from './constructor';

function createDrawFunction() {
    SVGAnimation.prototype.frame = function frame(time) {
        for (let i = 0; i < this.loop.length; i += 1) {
            this.loop[i](time);
        }
    };
}

export default createDrawFunction;
