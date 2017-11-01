
function frame(time) {
    console.log(time);
}

export default frame;

/*
function frame(time, object) {
    const x = object.animation.transform.translate.x(time);
    const y = object.animation.transform.translate.y(time);
    const matrix = translate(object.matrix, x, y);
    object.setMatrix(matrix);
}
*/
