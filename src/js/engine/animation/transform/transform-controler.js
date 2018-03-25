import * as m from './matrix-transformations';

function chooseTransformMethod(object, transform) {
    // shortcuts
    const v = object.currentAttributes.transform; // current position/scale/rotation object
    const t = v.translate; // current translation
    const keys = Object.keys(transform);

    // check of property exist
    function check(property) {
        return keys.indexOf(property);
    }

    let animationFunc;

    if (check('translate') !== -1 && check('rotate') === -1 && check('scale') === -1) {
        // only translate
        if (transform.translate.x && transform.translate.y) {
            animationFunc = (time) => {
                t.x = transform.translate.x(time);
                t.y = transform.translate.y(time);
                const matrix = m.translateXY(object.matrix, t.x, t.y);
                object.setMatrix(matrix);
            };
        } else if (transform.translate.x) {
            animationFunc = (time) => {
                t.x = transform.translate.x(time);
                const matrix = m.translateX(object.matrix, t.x);
                object.setMatrix(matrix);
            };
        } else if (transform.translate.y) {
            animationFunc = (time) => {
                t.y = transform.translate.y(time);
                const matrix = m.translateY(object.matrix, t.y);
                object.setMatrix(matrix);
            };
        }
    } else if (check('translate') === -1 && check('rotate') !== -1 && check('scale') === -1) {
        // only rotate
        animationFunc = (time) => {
            v.rotate = transform.rotate(time);
            const matrix = m.rotate(object.matrix, v.rotate, v.scale);
            object.setMatrix(matrix);
        };
    } else if (check('translate') === -1 && check('rotate') === -1 && check('scale') !== -1) {
        // only scale
        animationFunc = (time) => {
            v.scale = transform.scale(time);
            const matrix = m.scale(object.matrix, v.scale, v.rotate);
            object.setMatrix(matrix);
        };
    } else if (check('translate') !== -1 && check('rotate') !== -1 && check('scale') === -1) {
        // translate and rotate
        if (transform.translate.x && transform.translate.y) {
            animationFunc = (time) => {
                t.x = transform.translate.x(time);
                t.y = transform.translate.y(time);
                const angle = transform.rotate(time);
                const matrix = m.translateXYRotate(object.matrix, t.x, t.y, angle, v.scale);
                object.setMatrix(matrix);
            };
        } else if (transform.translate.x) {
            animationFunc = (time) => {
                t.x = transform.translate.x(time);
                const angle = transform.rotate(time);
                const matrix = m.translateXRotate(object.matrix, t.x, angle, v.scale);
                object.setMatrix(matrix);
            };
        } else if (transform.translate.y) {
            animationFunc = (time) => {
                t.y = transform.translate.y(time);
                const angle = transform.rotate(time);
                const matrix = m.translateYRotate(object.matrix, t.y, angle, v.scale);
                object.setMatrix(matrix);
            };
        }
    } else if (check('translate') !== -1 && check('rotate') === -1 && check('scale') !== -1) {
        // translate and scale
        if (transform.translate.x && transform.translate.y) {
            animationFunc = (time) => {
                t.x = transform.translate.x(time);
                t.y = transform.translate.y(time);
                v.scale = transform.scale(time);
                const matrix = m.translateXYScale(object.matrix, t.x, t.y, v.scale, v.rotate);
                object.setMatrix(matrix);
            };
        } else if (transform.translate.x) {
            animationFunc = (time) => {
                t.x = transform.translate.x(time);
                v.scale = transform.scale(time);
                const matrix = m.translateXScale(object.matrix, t.x, v.scale, v.rotate);
                object.setMatrix(matrix);
            };
        } else if (transform.translate.y) {
            animationFunc = (time) => {
                t.y = transform.translate.y(time);
                v.scale = transform.scale(time);
                const matrix = m.translateYScale(object.matrix, t.y, v.scale, v.rotate);
                object.setMatrix(matrix);
            };
        }
    } else if (check('translate') === -1 && check('rotate') !== -1 && check('scale') !== -1) {
        // scale and rotate
        animationFunc = (time) => {
            v.rotate = transform.rotate(time);
            v.scale = transform.scale(time);
            const matrix = m.scaleRotate(object.matrix, v.scale, v.rotate);
            object.setMatrix(matrix);
        };
    } else if (check('translate') !== -1 && check('rotate') !== -1 && check('scale') !== -1) {
        // translate, scale, rotate
        if (transform.translate.x && transform.translate.y) {
            animationFunc = (time) => {
                t.x = transform.translate.x(time);
                t.y = transform.translate.y(time);
                v.rotate = transform.rotate(time);
                v.scale = transform.scale(time);
                const matrix = m.translateXYScaleRotate(object.matrix, t.x, t.y, v.scale, v.rotate);
                object.setMatrix(matrix);
            };
        } else if (transform.translate.x) {
            animationFunc = (time) => {
                t.x = transform.translate.x(time);
                v.rotate = transform.rotate(time);
                v.scale = transform.scale(time);
                const matrix = m.translateXScaleRotate(object.matrix, t.x, v.scale, v.rotate);
                object.setMatrix(matrix);
            };
        } else if (transform.translate.y) {
            animationFunc = (time) => {
                t.y = transform.translate.y(time);
                v.rotate = transform.rotate(time);
                v.scale = transform.scale(time);
                const matrix = m.translateYScaleRotate(object.matrix, t.y, v.scale, v.rotate);
                object.setMatrix(matrix);
            };
        }
    }
    return animationFunc;
}

export default chooseTransformMethod;
