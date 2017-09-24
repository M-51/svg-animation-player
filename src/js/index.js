import icons from './interface/interface';
import { compileSettings } from './settings';
import player from './player';

class addObject {
    constructor(name) {
        this.name = name;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    compileSettings();
    icons();
    player();
});

export { addObject };
