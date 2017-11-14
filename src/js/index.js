import buttons from './interface/interface';
import { compileSettings } from './settings';
import player from './player';
import Obj from './engine/object';
import { add, init } from './engine/controler';

function start(...objects) {
    add(...objects);
    compileSettings();
    buttons();
    player();
    init();
}

export { Obj, start };
