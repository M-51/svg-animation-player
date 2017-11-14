
// check if argument is undefined
function undef(item) {
    return (typeof item === 'undefined');
}

// check if expresion is a number
function isNumeric(number) {
    return !Number.isNaN(parseFloat(number)) && Number.isFinite(number);
}

// create element NS
// accepts element name as paramater
function createElNS(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}

// set multiple attributtes NS
// setAttrs(element, [name, value], [name2,value2]...)
function setAttrs(element, ...attributtes) {
    attributtes.forEach((attributte) => {
        element.setAttributeNS(null, attributte[0], attributte[1]);
    });
}

export { undef, createElNS, setAttrs, isNumeric };
