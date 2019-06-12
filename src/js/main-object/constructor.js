import compileSettings from '../settings';
import add from './add';

import {
    play,
    pause,
    refresh,
    end,
} from './player';

import dispatcher from './dispatcher';


class SVGAnimationPlayer {
    constructor(settings, context = document) {
        this.status = 'not started';
        this.timer = {
            animationId: 0,
            startTime: 0,
            time: 0,
        };
        this.settings = compileSettings(settings);
        this.objectList = new Set();
        this.loop = [];
        this.context = context;
    }

    reset() {
        this.objectList.forEach((object) => {
            object.resetAttributes();
            object.setVariables();
            object.initMatrix(this.svg);
            object.decomposeMatrix();
        });
        this.loop = [];
        dispatcher(this.objectList, this);
    }
}
// player
SVGAnimationPlayer.prototype.play = play;
SVGAnimationPlayer.prototype.pause = pause;
SVGAnimationPlayer.prototype.refresh = refresh;
SVGAnimationPlayer.prototype.end = end;

// add objects for animation
SVGAnimationPlayer.prototype.add = add;

export default SVGAnimationPlayer;
