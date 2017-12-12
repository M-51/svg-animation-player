import { createElNS, setAttrs } from '../utils';

function createPlayPause(s, svg) {
    const group = createElNS('g');
    const playPause1 = createElNS('polygon');
    const playPause2 = createElNS('polygon');

    setAttrs(playPause1, ['points', '0,0 0,-20 20,-10 20,-10']);
    setAttrs(playPause2, ['points', '0,0 0,-20 20,-10 20,-10']);


    group.appendChild(playPause1);
    group.appendChild(playPause2);

    // button
    const button = createElNS('rect');
    setAttrs(button, ['x', '0'], ['y', '-20'], ['width', '20'], ['height', '20'], ['fill-opacity', '0']);

    // group button and icon

    const playPauseGroup = createElNS('g');
    playPauseGroup.appendChild(group);
    playPauseGroup.appendChild(button);

    // set button and icons to correct position at the bottom left of svg
    function setPosition() {
        const viewBox = svg.viewBox.baseVal;
        const matrix = svg.createSVGMatrix();
        matrix.e = viewBox.x + (viewBox.width * 0.05);
        matrix.f = viewBox.y + (viewBox.height * 0.95);
        const interfaceSize = viewBox.height / 400;
        matrix.a = interfaceSize;
        matrix.d = interfaceSize;
        playPauseGroup.transform.baseVal.initialize(svg.createSVGTransformFromMatrix(matrix));
    }

    function addUserSettings() {
        // set color
        setAttrs(group, ['fill', s.interfaceColor]);

        // set interface size
        const { matrix } = playPauseGroup.transform.baseVal.getItem(0);
        matrix.a *= s.interfaceSize;
        matrix.d *= s.interfaceSize;


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
        setAttrs(playPause1, ['points', '1,0 1,-20 9,-20 9,0']);
        setAttrs(playPause2, ['points', '11,0 11,-20 19,-20 19,0']);
    }
    function switchToPlay() {
        setAttrs(playPause1, ['points', '0,0 0,-20 20,-10 20,-10']);
        setAttrs(playPause2, ['points', '0,0 0,-20 20,-10 20,-10']);
    }
    function switchPlayPauseOff() {
        setAttrs(group, ['display', 'none']);
    }
    function switchPlayPauseOn() {
        setAttrs(playPause1, ['points', '0,0 0,-20 20,-10 20,-10']);
        setAttrs(playPause2, ['points', '0,0 0,-20 20,-10 20,-10']);
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
