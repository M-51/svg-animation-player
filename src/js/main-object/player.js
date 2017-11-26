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
            that.timer.animationId = window.requestAnimationFrame(startLoop);
        }
        this.timer.animationId = window.requestAnimationFrame(startLoop);
    };

    Create.prototype.pause = function pause() {
        if (this.status === 'playing') {
            this.status = 'paused';
            window.cancelAnimationFrame(this.timer.animationId);
        }
    };

    Create.prototype.refresh = function refresh() {
        if (this.status === 'playing' || this.status === 'paused' || this.status === 'ended') {
            this.status = 'not started';
            window.cancelAnimationFrame(this.timer.animationId);
            this.timer.startTime = 0;
            this.timer.time = 0;

            // reset all animated object to starting attributtes
            this.reset();
        }
    };
    Create.prototype.end = function end() {
        this.status = 'ended';
        const that = this;
        window.setTimeout(() => {
            window.cancelAnimationFrame(that.timer.animationId);
        }, 25);
        // switch play off and leave only refresh !!!! TO DO
    };
}

export default createPlayer;
