import { switchRefreshOff, switchRefreshOn, refreshButton } from './interface/buttons/refresh';
import { switchToPause, switchToPlay, playButton } from './interface/buttons/playpause';

let status = 'not started';

function playStop() {
    if (status === 'not started') {
        status = 'playing';
        switchRefreshOn();
        switchToPause();
    } else if (status === 'playing') {
        status = 'paused';
        switchToPlay();
    } else if (status === 'paused') {
        status = 'playing';
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
