import { getAttributes, resetAttributes, parseAttributes } from './helpers/attributes';
import { initMatrix, decomposeMatrix } from './helpers/matrix';

class AnimatedObject {
    constructor(item) {
        this.item = item;
    }
    setVariables() {
        this.startingAttributes = getAttributes(this.item);
        this.currentAttributes = parseAttributes(this.startingAttributes);
    }
    initMatrix(settings) {
        initMatrix(this.item, settings);
        this.matrix = this.item.transform.baseVal.getItem(0).matrix;
        this.SVGTransform = this.item.transform.baseVal.getItem(0);
    }
    resetAttributes() {
        resetAttributes(this.item, this.startingAttributes);
    }
    decomposeMatrix() {
        this.currentAttributes.transform = decomposeMatrix(this.matrix);
    }
    setMatrix(matrix) {
        this.SVGTransform.setMatrix(matrix);
    }
    setAttribute(name, value) {
        this.item.setAttributeNS(null, name, value);
    }
}

export default AnimatedObject;
