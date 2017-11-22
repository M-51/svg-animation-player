// import buttons from './interface/interface';
import player from './main-object/player';
// import { compileSettings } from './settings';
import Obj from './engine/object';
// import { add, init } from './engine/controler';
import Create from './main-object/constructor';
import draw from './main-object/draw';

player();
draw();

export { Obj, Create };
