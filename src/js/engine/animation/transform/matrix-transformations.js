function translateX(matrix, x) {
    const modifiedMatrix = matrix;

    modifiedMatrix.e = x;

    return modifiedMatrix;
}

function translateY(matrix, y) {
    const modifiedMatrix = matrix;

    modifiedMatrix.f = y;

    return modifiedMatrix;
}

function translateXY(matrix, x, y) {
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

function translateXRotate(matrix, x, angle, s) {
    const modifiedMatrix = matrix;

    const c = Math.sin(angle) * s;
    const a = Math.cos(angle) * s;

    modifiedMatrix.a = a;
    modifiedMatrix.b = -c;
    modifiedMatrix.c = c;
    modifiedMatrix.d = a;
    modifiedMatrix.e = x;

    return modifiedMatrix;
}

function translateYRotate(matrix, y, angle, s) {
    const modifiedMatrix = matrix;

    const c = Math.sin(angle) * s;
    const a = Math.cos(angle) * s;

    modifiedMatrix.a = a;
    modifiedMatrix.b = -c;
    modifiedMatrix.c = c;
    modifiedMatrix.d = a;
    modifiedMatrix.f = y;

    return modifiedMatrix;
}

function translateXYRotate(matrix, x, y, angle, s) {
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

function translateXScale(matrix, x, s, angle) {
    const modifiedMatrix = matrix;

    const c = Math.sin(angle) * s;
    const a = Math.cos(angle) * s;

    modifiedMatrix.a = a;
    modifiedMatrix.b = -c;
    modifiedMatrix.c = c;
    modifiedMatrix.d = a;
    modifiedMatrix.e = x;

    return modifiedMatrix;
}

function translateYScale(matrix, y, s, angle) {
    const modifiedMatrix = matrix;

    const c = Math.sin(angle) * s;
    const a = Math.cos(angle) * s;

    modifiedMatrix.a = a;
    modifiedMatrix.b = -c;
    modifiedMatrix.c = c;
    modifiedMatrix.d = a;
    modifiedMatrix.f = y;

    return modifiedMatrix;
}

function translateXYScale(matrix, x, y, s, angle) {
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

function translateXScaleRotate(matrix, x, s, angle) {
    const modifiedMatrix = matrix;
    const c = Math.sin(angle) * s;
    const a = Math.cos(angle) * s;

    modifiedMatrix.a = a;
    modifiedMatrix.b = -c;
    modifiedMatrix.c = c;
    modifiedMatrix.d = a;
    modifiedMatrix.e = x;

    return modifiedMatrix;
}

function translateYScaleRotate(matrix, y, s, angle) {
    const modifiedMatrix = matrix;
    const c = Math.sin(angle) * s;
    const a = Math.cos(angle) * s;

    modifiedMatrix.a = a;
    modifiedMatrix.b = -c;
    modifiedMatrix.c = c;
    modifiedMatrix.d = a;
    modifiedMatrix.f = y;

    return modifiedMatrix;
}

function translateXYScaleRotate(matrix, x, y, s, angle) {
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
    translateX,
    translateY,
    translateXY,
    rotate,
    scale,
    translateXRotate,
    translateYRotate,
    translateXYRotate,
    translateXScale,
    translateYScale,
    translateXYScale,
    scaleRotate,
    translateXScaleRotate,
    translateYScaleRotate,
    translateXYScaleRotate,
};
