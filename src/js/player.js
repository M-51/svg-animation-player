import { switchRefreshOff, switchRefreshOn, refreshButton } from './interface/buttons/refresh';
import { switchToPause, switchToPlay, playButton } from './interface/buttons/playpause';
import { start as play, pause, resume, refresh } from './engine/timer';

let status = 'not started';

function playStop() {
    if (status === 'not started') {
        status = 'playing';
        switchRefreshOn();
        switchToPause();
        play();
    } else if (status === 'playing') {
        status = 'paused';
        pause();
        switchToPlay();
    } else if (status === 'paused') {
        status = 'playing';
        resume();
        switchToPause();
    }
}

function reset() {
    if (status === 'playing' || status === 'paused' || status === 'ended') {
        status = 'not started';
        switchRefreshOff();
        refresh();
        switchToPlay();
    }
}
function start() {
    playButton.addEventListener('click', playStop, false);
    switchRefreshOff();
    refreshButton.addEventListener('click', reset, false);
}

export default start;
