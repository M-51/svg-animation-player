import buttons from './interface/buttons';
import { compileSettings } from './settings';

document.addEventListener('DOMContentLoaded', () => {
    compileSettings();
    buttons();
});

