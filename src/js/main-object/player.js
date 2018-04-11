import SVGAnimation from './constructor';

const refreshEvent = new CustomEvent('svgRefresh');

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
            if (this.settings.showInterface) {
                this.interfaceControler.playPause.pause();
                this.interfaceControler.refresh.on();
            }
        } else if (this.status === 'paused') {
            this.status = 'playing';
            this.timer.startTime = Date.now() - this.timer.time;
            this.timer.animationId = window.requestAnimationFrame(startLoop);
            if (this.settings.showInterface) {
                this.interfaceControler.playPause.pause();
            }
        }
    };

    SVGAnimation.prototype.pause = function pause() {
        if (this.status === 'playing') {
            this.status = 'paused';
            window.cancelAnimationFrame(this.timer.animationId);
            if (this.settings.showInterface) {
                this.interfaceControler.playPause.play();
            }
        }
    };

    SVGAnimation.prototype.refresh = function refresh() {
        if (this.status === 'playing' || this.status === 'paused' || this.status === 'ended') {
            if (this.settings.showInterface) {
                if (this.status === 'playing') {
                    this.interfaceControler.playPause.play();
                } else if (this.status === 'ended') {
                    this.interfaceControler.playPause.on();
                }
                this.interfaceControler.refresh.off();
            }
            this.status = 'not started';
            window.cancelAnimationFrame(this.timer.animationId);
            this.timer.startTime = 0;
            this.timer.time = 0;

            // reset all animated object to starting attributtes
            this.reset();
            this.svg.dispatchEvent(refreshEvent);
        }
    };
    SVGAnimation.prototype.end = function end() {
        if (this.status === 'playing' || this.status === 'paused') {
            this.status = 'ended';
            const that = this;
            window.setTimeout(() => {
                window.cancelAnimationFrame(that.timer.animationId);
                if (this.settings.showInterface) {
                    this.interfaceControler.playPause.off();
                }
            }, 0);
        }
    };
}

export default createPlayer;
