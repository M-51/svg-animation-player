
function translate(matrix, x, y) {
    const modifiedMatrix = matrix;

    modifiedMatrix.e = x;
    modifiedMatrix.f = y;

    return modifiedMatrix;
}
function rotate(matrix, angle, s) {
    const modifiedMatrix = matrix;

    const c = Math.sin(angle) * s;
    const a = Math.cos(angle) * s;

    modifiedMatrix.a = a;
    modifiedMatrix.b = -c;
    modifiedMatrix.c = c;
    modifiedMatrix.d = a;

    return modifiedMatrix;
}

function scale(matrix, s, angle) {
    const modifiedMatrix = matrix;

    const c = Math.sin(angle) * s;
    const a = Math.cos(angle) * s;

    modifiedMatrix.a = a;
    modifiedMatrix.b = -c;
    modifiedMatrix.c = c;
    modifiedMatrix.d = a;

    return modifiedMatrix;
}

function translateRotate(matrix, x, y, angle, s) {
    const modifiedMatrix = matrix;

    const c = Math.sin(angle) * s;
    const a = Math.cos(angle) * s;

    modifiedMatrix.a = a;
    modifiedMatrix.b = -c;
    modifiedMatrix.c = c;
    modifiedMatrix.d = a;
    modifiedMatrix.e = x;
    modifiedMatrix.f = y;

    return modifiedMatrix;
}

function translateScale(matrix, x, y, s, angle) {
    const modifiedMatrix = matrix;

    const c = Math.sin(angle) * s;
    const a = Math.cos(angle) * s;

    modifiedMatrix.a = a;
    modifiedMatrix.b = -c;
    modifiedMatrix.c = c;
    modifiedMatrix.d = a;
    modifiedMatrix.e = x;
    modifiedMatrix.f = y;

    return modifiedMatrix;
}

function scaleRotate(matrix, s, angle) {
    const modifiedMatrix = matrix;

    const c = Math.sin(angle) * s;
    const a = Math.cos(angle) * s;

    modifiedMatrix.a = a;
    modifiedMatrix.b = -c;
    modifiedMatrix.c = c;
    modifiedMatrix.d = a;

    return modifiedMatrix;
}

function translateScaleRotate(matrix, x, y, s, angle) {
    const modifiedMatrix = matrix;
    const c = Math.sin(angle) * s;
    const a = Math.cos(angle) * s;

    modifiedMatrix.a = a;
    modifiedMatrix.b = -c;
    modifiedMatrix.c = c;
    modifiedMatrix.d = a;
    modifiedMatrix.e = x;
    modifiedMatrix.f = y;

    return modifiedMatrix;
}

export {
    translate,
    rotate,
    scale,
    translateRotate,
    translateScale,
    scaleRotate,
    translateScaleRotate,
};
