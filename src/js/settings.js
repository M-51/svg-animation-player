import { undef } from './utils';

const defaultSettings = {
    showInterface: true,
    interfaceAnimation: true,
    interfaceSize: 1,
    interfaceColor: '#000',
    interfacePosition: 'auto',
    restartAtTheEnd: false,
};


function compileSettings(settings) {
    const compiledSettings = {};
    Object.keys(defaultSettings).forEach((rule) => {
        if (!undef(settings) && !undef(settings[rule])) {
            compiledSettings[rule] = settings[rule];
        } else {
            compiledSettings[rule] = defaultSettings[rule];
        }
    });
    return compiledSettings;
}

export default compileSettings;
