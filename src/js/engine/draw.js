import { getAttributes } from './helpers/attributes';

function frame(time, object) {
    console.log(getAttributes(object.item));
}

export default frame;
