(function () {
'use strict';

const defaultSettings = {
    svg: document.querySelector('svg'),
    showInterface: true,
    interfaceAnimation: true,
};
const compiledSettings = {};

function compileSettings() {
    if (!(typeof settings === 'undefined')) {
        Object.keys(defaultSettings).forEach((rule) => {
            if (typeof settings[rule] !== 'undefined') {
                compiledSettings[rule] = settings[rule];
            } else {
                compiledSettings[rule] = defaultSettings[rule];
            }
        });
    } else {
        Object.keys(defaultSettings).forEach((rule) => {
            compiledSettings[rule] = defaultSettings[rule];
        });
    }
}

function start$1() {
    console.log(compiledSettings);
}

document.addEventListener('DOMContentLoaded', () => {
    compileSettings();
    start$1();
});

}());
//# sourceMappingURL=svganimation.js.map
