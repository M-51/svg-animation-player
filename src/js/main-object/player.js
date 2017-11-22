import Create from './constructor';

function createPlayer() {
    Create.prototype.play = function play() {
        if (this.status === 'not started') {
            this.status = 'playing';
            this.timer.startTime = Date.now();
        } else if (this.status === 'paused') {
            this.status = 'playing';
            this.timer.startTime = Date.now() - this.timer.time;
        }
        const that = this;
        function startLoop() {
            that.timer.time = Date.now() - that.timer.startTime;
            that.frame(that.timer.time / 1000);
            that.timer.animationID = window.requestAnimationFrame(startLoop);
        }
        this.timer.animationID = window.requestAnimationFrame(startLoop);
    };

    Create.prototype.pause = function pause() {
        if (this.status === 'playing') {
            this.status = 'paused';
            window.cancelAnimationFrame(this.timer.animationID);
        }
    };

    Create.prototype.refresh = function refresh() {
        if (this.status === 'playing' || this.status === 'paused' || this.status === 'ended') {
            this.status = 'not started';
            window.cancelAnimationFrame(this.timer.animationID);
            this.timer.startTime = 0;
            this.timer.time = 0;
            // reset(); REMEMBER TO RESET ALL ITEMS!!! this.objectList
        }
    };
}

export default createPlayer;
