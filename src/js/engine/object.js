import { getAttributes, resetAttributes } from './helpers/attributes';
import { initMatrix, decomposeMatrix } from './helpers/matrix';

class Obj {
    constructor(item) {
        this.item = item;
    }
    setVariables() {
        this.variables = getAttributes(this.item);
    }
    initMatrix() {
        initMatrix(this.item);
        this.matrix = this.item.transform.baseVal.getItem(0).matrix;
        this.SVGTransform = this.item.transform.baseVal.getItem(0);
    }
    resetAttributes() {
        resetAttributes(this.item, this.variables);
    }
    decomposeMatrix() {
        this.transform = decomposeMatrix(this.matrix);
    }
    setMatrix(matrix) {
        this.SVGTransform.setMatrix(matrix);
    }
}

export default Obj;
