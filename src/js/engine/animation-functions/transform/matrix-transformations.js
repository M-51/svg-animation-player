

function translate(matrix, x, y) {
    const modifiedMatrix = matrix;

    modifiedMatrix.e = x;
    modifiedMatrix.f = y;

    return modifiedMatrix;
}

function scaleAndRotateAndTranslate(matrix, s, angle, x, y) {
    const modifiedMatrix = matrix;
    const r = (-angle * Math.PI) / 180;
    const c = Math.sin(r) * s;
    const a = Math.cos(r) * s;

    modifiedMatrix.a = a;
    modifiedMatrix.b = -c;
    modifiedMatrix.c = c;
    modifiedMatrix.d = a;
    modifiedMatrix.e = x;
    modifiedMatrix.f = y;

    return modifiedMatrix;
}

export { translate, scaleAndRotateAndTranslate };
