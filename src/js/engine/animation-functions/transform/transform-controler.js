import { translate, rotate, scale, translateRotate, translateScale, scaleRotate, translateScaleRotate } from './matrix-transformations';

function chooseTransformMethod(object) {
    // shortcuts
    const { transform } = object.animation;
    const v = object.transform;
    const t = v.translate;
    const keys = Object.keys(transform);

    function check(property) {
        return keys.indexOf(property);
    }

    let animationFunc;

    if (check('translate') !== -1 && check('rotate') === -1 && check('scale') === -1) {
        // only translate
        animationFunc = (time) => {
            t.x = transform.translate.x(time);
            t.y = transform.translate.y(time);
            const matrix = translate(object.matrix, t.x, t.y);
            object.setMatrix(matrix);
        };
    } else if (check('translate') === -1 && check('rotate') !== -1 && check('scale') === -1) {
        // only rotate
        animationFunc = (time) => {
            v.rotate = transform.rotate(time);
            const matrix = rotate(object.matrix, v.rotate, v.scale);
            object.setMatrix(matrix);
        };
    } else if (check('translate') === -1 && check('rotate') === -1 && check('scale') !== -1) {
        // only scale
        animationFunc = (time) => {
            v.scale = transform.scale(time);
            const matrix = scale(object.matrix, v.scale, v.rotate);
            object.setMatrix(matrix);
        };
    } else if (check('translate') !== -1 && check('rotate') !== -1 && check('scale') === -1) {
        // translate and rotate
        animationFunc = (time) => {
            t.x = transform.translate.x(time);
            t.y = transform.translate.y(time);
            const angle = transform.rotate(time);
            const matrix = translateRotate(object.matrix, t.x, t.y, angle, v.scale);
            object.setMatrix(matrix);
        };
    } else if (check('translate') !== -1 && check('rotate') === -1 && check('scale') !== -1) {
        // translate and scale
        animationFunc = (time) => {
            t.x = transform.translate.x(time);
            t.y = transform.translate.y(time);
            v.scale = transform.scale(time);
            const matrix = translateScale(object.matrix, t.x, t.y, v.scale, v.rotate);
            object.setMatrix(matrix);
        };
    } else if (check('translate') === -1 && check('rotate') !== -1 && check('scale') !== -1) {
        animationFunc = (time) => {
            v.rotate = transform.rotate(time);
            v.scale = transform.scale(time);
            const matrix = scaleRotate(object.matrix, v.scale, v.rotate);
            object.setMatrix(matrix);
        };
    } else if (check('translate') !== -1 && check('rotate') !== -1 && check('scale') !== -1) {
        animationFunc = (time) => {
            t.x = transform.translate.x(time);
            t.y = transform.translate.y(time);
            v.rotate = transform.rotate(time);
            v.scale = transform.scale(time);
            const matrix = translateScaleRotate(object.matrix, t.x, t.y, v.scale, v.rotate);
            object.setMatrix(matrix);
        };
    }

    return animationFunc;
}

export default chooseTransformMethod;
