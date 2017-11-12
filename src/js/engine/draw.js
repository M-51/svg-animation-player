import { animationLoop as loop } from './dispatcher';

function frame(time) {
    for (let i = 0; i < loop.length; i += 1) {
        loop[i](time);
    }
    console.log(loop);
}

export default frame;
