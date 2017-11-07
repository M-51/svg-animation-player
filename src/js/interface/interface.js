import { refresh } from './buttons/refresh';
import { playPause } from './buttons/playpause';
import { compiledSettings } from '../settings';

function start() {
    if (compiledSettings.showInterface) {
        refresh();
        playPause();
    }
}

export default start;
