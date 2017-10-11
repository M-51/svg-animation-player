import { compiledSettings } from '../../settings';

function initMatrix(object) {
    let matrix = null;
    const svgTransform = object.transform.baseVal;
    if (svgTransform.length) {
        svgTransform.consolidate();
        ({ matrix } = svgTransform.getItem(0));
    } else {
        matrix = compiledSettings.svg.createSVGMatrix();
    }
    svgTransform.initialize(compiledSettings.svg.createSVGTransformFromMatrix(matrix));
}

export { initMatrix };
