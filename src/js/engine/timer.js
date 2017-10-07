import { dispatch } from './controler';

let animationID = 0;
let startTime = 0;
let time = 0;

function animate() {
    function startLoop() {
        time = Date.now() - startTime;
        dispatch(time / 1000);
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

export { start, pause, resume };
