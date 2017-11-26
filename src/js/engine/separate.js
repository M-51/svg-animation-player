
function splitArray(key, object) {
    const keyEquationObject = [];
    if (Array.isArray(object.animation[key])) {
        object.animation[key].forEach((item) => {
            keyEquationObject.push([key, item, object]);
        });
    } else {
        keyEquationObject.push([key, object.animation[key], object]);
    }
    return keyEquationObject;
}


function separate(objectsList) {
    const propertiesToAnimateList = [];
    objectsList.forEach((object) => {
        Object.keys(object.animation).forEach((key) => {
            propertiesToAnimateList.push(...splitArray(key, object));
        });
    });
    return propertiesToAnimateList;
}

export default separate;
