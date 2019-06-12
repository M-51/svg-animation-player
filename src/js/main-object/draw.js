
function frame(time, loop) {
    for (let i = 0; i < loop.length; i += 1) {
        loop[i](time);
    }
}


export default frame;
