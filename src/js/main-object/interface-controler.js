import SVGAnimation from './constructor';
import createPlayPause from '../interface/playpause';
import createRefresh from '../interface/refresh';

function createInterfaceControler() {
    SVGAnimation.prototype.interfaceControler = function interfaceControler() {
        const playPause = createPlayPause(this.settings, this.svg);
        const refresh = createRefresh(this.settings, this.svg);

        const that = this;

        function controlPlayPause() {
            if (that.status === 'not started' || that.status === 'paused') {
                that.play();
            } else if (that.status === 'playing') {
                that.pause();
            }
        }

        function controlRefresh() {
            if (that.status === 'playing' || that.status === 'paused' || that.status === 'ended') {
                that.refresh();
            }
        }
        playPause.button.addEventListener('click', controlPlayPause, false);
        refresh.button.addEventListener('click', controlRefresh, false);

        return {
            playPause,
            refresh,
        };
    };
}

export default createInterfaceControler;
