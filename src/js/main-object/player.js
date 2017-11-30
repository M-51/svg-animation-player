import SVGAnimation from './constructor';

function createPlayer() {
    SVGAnimation.prototype.play = function play() {
        const that = this;
        function startLoop() {
            that.timer.time = Date.now() - that.timer.startTime;
            that.frame(that.timer.time / 1000);
            that.timer.animationId = window.requestAnimationFrame(startLoop);
        }
        if (this.status === 'not started') {
            this.status = 'playing';
            this.timer.startTime = Date.now();
            this.timer.animationId = window.requestAnimationFrame(startLoop);
        } else if (this.status === 'paused') {
            this.status = 'playing';
            this.timer.startTime = Date.now() - this.timer.time;
            this.timer.animationId = window.requestAnimationFrame(startLoop);
        }
    };

    SVGAnimation.prototype.pause = function pause() {
        if (this.status === 'playing') {
            this.status = 'paused';
            window.cancelAnimationFrame(this.timer.animationId);
        }
    };

    SVGAnimation.prototype.refresh = function refresh() {
        if (this.status === 'playing' || this.status === 'paused' || this.status === 'ended') {
            this.status = 'not started';
            window.cancelAnimationFrame(this.timer.animationId);
            this.timer.startTime = 0;
            this.timer.time = 0;

            // reset all animated object to starting attributtes
            this.reset();
        }
    };
    SVGAnimation.prototype.end = function end() {
        this.status = 'ended';
        const that = this;
        window.setTimeout(() => {
            window.cancelAnimationFrame(that.timer.animationId);
            if (that.settings.restartAtTheEnd) {
                that.refresh();
            }
        }, 25);
        // switch play off and leave only refresh !!!! TO DO
    };
}

export default createPlayer;
