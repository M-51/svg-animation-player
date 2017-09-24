import { undef } from './utils';

const defaultSettings = {
    svg: document.querySelector('svg'),
    showInterface: true,
    interfaceAnimation: true,
    interfaceSize: 1,
    interfaceColor: '#000',
    interfacePosition: 'auto',
};
const compiledSettings = {};

function compileSettings() {
    Object.keys(defaultSettings).forEach((rule) => {
        if (!undef(svganimation.settings) && !undef(svganimation.settings[rule])) {
            compiledSettings[rule] = svganimation.settings[rule];
        } else {
            compiledSettings[rule] = defaultSettings[rule];
        }
    });
}

export { compileSettings, compiledSettings };
