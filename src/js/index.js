import animatedObject from './animated-object/constructor'; // Objects to animate
import SVGAnimation from './main-object/constructor'; // SVGanimation objects

import createPlayer from './main-object/player';
import createDrawFunction from './main-object/draw';
import createMainObjectDispatcher from './main-object/dispatcher';
import createMainObjectHelpers from './main-object/helpers';
import createInterfaceControler from './main-object/interface-controler';

createPlayer();
createDrawFunction();
createMainObjectDispatcher();
createMainObjectHelpers();
createInterfaceControler();

export { animatedObject as Obj, SVGAnimation as Create };
