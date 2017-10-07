import { switchRefreshOff, switchRefreshOn, refreshButton } from './interface/buttons/refresh';
import { switchToPause, switchToPlay, playButton } from './interface/buttons/playpause';
import { start as play, pause, resume } from './engine/timer';

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

function refresh() {
    if (status === 'playing' || status === 'paused' || status === 'ended') {
        switchRefreshOff();
    }
}
function start() {
    playButton.addEventListener('click', playStop, false);
    switchRefreshOff();
    refreshButton.addEventListener('click', refresh, false);
}

export default start;
