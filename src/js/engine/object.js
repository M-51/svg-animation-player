import { getAttributes, resetAttributes } from './helpers/attributes';
import { initMatrix } from './helpers/matrix';

class Obj {
    constructor(item) {
        this.item = item;
        this.t = null;
        this.animation = {};
    }
    setVariables() {
        this.variables = getAttributes(this.item);
    }
    resetAttributes() {
        resetAttributes(this.item, this.variables);
    }
    initMatrix() {
        initMatrix(this.item);
    }
}

export default Obj;
