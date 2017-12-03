import { createElNS, setAttrs } from '../utils';

function createPlayPause(s, svg) {
    const group = createElNS('g');
    const playPause1 = createElNS('polygon');
    const playPause2 = createElNS('polygon');

    setAttrs(playPause1, ['points', '-10,-10 -10,10 0,-5 0,5']);
    setAttrs(playPause2, ['points', '-10,-10 -10,10 10,0 10,0']);


    group.appendChild(playPause1);
    group.appendChild(playPause2);

    // button
    const button = createElNS('rect');
    setAttrs(button, ['x', '-10'], ['y', '-10'], ['width', '20'], ['height', '20'], ['fill-opacity', '0']);

    // group button and icon

    const playPauseGroup = createElNS('g');
    playPauseGroup.appendChild(group);
    playPauseGroup.appendChild(button);

    // set button and icons to correct position at the bottom left of svg
    function setPosition() {
        const viewBox = svg.viewBox.baseVal;
        const matrix = svg.createSVGMatrix();
        matrix.e = viewBox.x + 25;
        matrix.f = viewBox.y + (viewBox.height - 25);
        playPauseGroup.transform.baseVal.initialize(svg.createSVGTransformFromMatrix(matrix));
    }

    function addUserSettings() {
        // set color
        setAttrs(group, ['fill', s.interfaceColor]);

        // set interface size
        const { matrix } = playPauseGroup.transform.baseVal.getItem(0);
        matrix.a = s.interfaceSize;
        matrix.d = s.interfaceSize;

        // set interface position
        if (s.interfacePosition !== 'auto') {
            [matrix.e, matrix.f] = s.interfacePosition;
        }

        playPauseGroup.transform.baseVal.getItem(0).setMatrix(matrix);
    }
    setPosition();
    addUserSettings();
    svg.appendChild(playPauseGroup);

    function switchToPause() {
        setAttrs(playPause1, ['points', '-9,-10 -9,10 -2,10 -2,-10']);
        setAttrs(playPause2, ['points', '2,-10 2,10 9,10 9,-10']);
    }
    function switchToPlay() {
        setAttrs(playPause1, ['points', '-10,-10 -10,10 0,-5 0,5']);
        setAttrs(playPause2, ['points', '-10,-10 -10,10 10,0 10,0']);
    }
    function switchPlayPauseOff() {
        setAttrs(group, ['display', 'none']);
    }
    function switchPlayPauseOn() {
        setAttrs(playPause1, ['points', '-10,-10 -10,10 0,-5 0,5']);
        setAttrs(playPause2, ['points', '-10,-10 -10,10 10,0 10,0']);
        setAttrs(group, ['display', 'block']);
    }

    return {
        play: switchToPlay,
        pause: switchToPause,
        off: switchPlayPauseOff,
        on: switchPlayPauseOn,
        button,
    };
}

export default createPlayPause;
