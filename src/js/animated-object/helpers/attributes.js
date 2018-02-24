function getAttributes(object) {
    const list = new Map();
    const { attributes } = object;
    for (let i = 0; i < attributes.length; i += 1) {
        if (attributes[i].specified) {
            list.set(attributes[i].name, attributes[i].value);
        }
    }
    return list;
}

function resetAttributes(object, attributes) {
    // remove all attributes
    while (object.attributes.length > 0) {
        object.removeAttribute(object.attributes[0].name);
    }
    // set new attributes
    attributes.forEach((value, key) => {
        object.setAttribute(key, value);
    });
}

function parseAttributes(attributes) {
    const variables = {};
    attributes.forEach((value, key) => {
        if (key !== 'id' && key !== 'class' && key !== 'transform') {
            const parsedValue = parseFloat(value);
            if (!Number.isNaN(parsedValue) && parsedValue.toString() === value) {
                variables[key] = parsedValue;
            } else {
                variables[key] = value;
            }
        }
    });
    return variables;
}

export { getAttributes, resetAttributes, parseAttributes };
