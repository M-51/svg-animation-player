import Create from './constructor';

function createDrawFunction() {
    Create.prototype.frame = function frame() {
        console.log('a');
        /*
        for (let i = 0; i < this.loop.length; i += 1) {
            this.loop[i](this.timer.time);
        }
        */
    };
}

export default createDrawFunction;
