import { reset } from './controler';
import frame from './draw';

let animationID = 0;
let startTime = 0;
let time = 0;

function animate() {
    function startLoop() {
        time = Date.now() - startTime;
        frame(time / 1000);
        animationID = window.requestAnimationFrame(startLoop);
    }
    animationID = window.requestAnimationFrame(startLoop);
}

function start() {
    startTime = Date.now();
    animate();
}

function resume() {
    startTime = Date.now() - time;
    animate();
}

function pause() {
    window.cancelAnimationFrame(animationID);
}

function refresh() {
    window.cancelAnimationFrame(animationID);
    startTime = 0;
    time = 0;
    reset();
}

export { start, pause, resume, refresh };
