import createPlayPause from '../interface/playpause';
import createRefresh from '../interface/refresh';


function interfaceControler(reference) {
    const playPause = createPlayPause(reference.settings, reference.svg);
    const refresh = createRefresh(reference.settings, reference.svg);


    function controlPlayPause() {
        if (reference.status === 'not started' || reference.status === 'paused') {
            reference.play();
        } else if (reference.status === 'playing') {
            reference.pause();
        }
    }

    function controlRefresh() {
        if (reference.status === 'playing' || reference.status === 'paused' || reference.status === 'ended') {
            reference.refresh();
        }
    }
    playPause.button.addEventListener('click', controlPlayPause, false);
    refresh.button.addEventListener('click', controlRefresh, false);

    return {
        playPause,
        refresh,
    };
}


export default interfaceControler;
