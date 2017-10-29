import { translate } from './animation-functions/transform';

function frame(time, object) {
    console.log(time);
    const x = object.animation.transform.translate.x(time);
    const y = object.animation.transform.translate.y(time);
    const matrix = translate(object.matrix, x, y);
    object.setMatrix(matrix);
}

export default frame;
