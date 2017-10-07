import icons from './interface/interface';
import { compileSettings } from './settings';
import player from './player';
import Obj from './engine/object';
import { add } from './engine/controler';

document.addEventListener('DOMContentLoaded', () => {
    compileSettings();
    icons();
    player();
});

export { Obj, add };
