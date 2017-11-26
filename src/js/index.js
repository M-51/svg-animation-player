// import buttons from './interface/interface';
import player from './main-object/player';
// import { compileSettings } from './settings';
import Obj from './animated-object/constructor';
// import { add, init } from './engine/controler';
import Create from './main-object/constructor';
import draw from './main-object/draw';
import dispatcher from './main-object/dispatcher';
import mainObjectHelpers from './main-object/helpers';

player();
draw();
dispatcher();
mainObjectHelpers();

export { Obj, Create };
