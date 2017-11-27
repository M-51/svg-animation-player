import Create from './constructor';

function createDrawFunction() {
    Create.prototype.frame = function frame(time) {
        for (let i = 0; i < this.loop.length; i += 1) {
            this.loop[i](time);
        }
    };
}

export default createDrawFunction;
