
import SVGAnimation from './main-object/constructor';

import createPlayer from './main-object/player';
import createDrawFunction from './main-object/draw';
import createMainObjectDispatcher from './main-object/dispatcher';
import createMainObjectHelpers from './main-object/helpers';
import createInterfaceControler from './main-object/interface-controler';
import createMainObjectAddFunction from './main-object/add';

createPlayer();
createDrawFunction();
createMainObjectDispatcher();
createMainObjectHelpers();
createInterfaceControler();
createMainObjectAddFunction();

export default SVGAnimation;
