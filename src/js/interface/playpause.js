import { createElNS, setAttrs } from '../utils';

function createPlayPause(s, svg) {
    const group = createElNS('g');
    group.className.baseVal = 'play-pause';
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
        if (s.interfaceColor !== 'none') {
            setAttrs(group, ['fill', s.interfaceColor]);
        }

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
        let steps = 1;
        if (!s.interfaceAnimation) {
            steps = 10;
        }
        function animate() {
            if (steps <= 10) {
                playPause1.setAttribute('points', `${steps / 10},0 ${steps / 10},-20 ${10 - (steps / 10)},${-15 - (steps / 2)} ${10 - (steps / 10)},${-5 + (steps / 2)}`);
                playPause2.setAttribute('points', `${10 + (steps / 10)},${-5 + (steps / 2)} ${10 + (steps / 10)},${-15 - (steps / 2)} ${20 - (steps / 10)},${-10 - steps} ${20 - (steps / 10)},${-10 + steps}`);
                steps += 1;
                window.requestAnimationFrame(animate);
            }
        }
        animate();
        // setAttrs(playPause1, ['points', '1,0 1,-20 9,-20 9,0']);
        // setAttrs(playPause2, ['points', '11,0 11,-20 19,-20 19,0']);
    }
    function switchToPlay() {
        let steps = 10;
        if (!s.interfaceAnimation) {
            steps = 1;
        }
        function animate() {
            if (steps >= 0) {
                playPause1.setAttribute('points', `${steps / 10},0 ${steps / 10},-20 ${10 - (steps / 10)},${-15 - (steps / 2)} ${10 - (steps / 10)},${-5 + (steps / 2)}`);
                playPause2.setAttribute('points', `${10 + (steps / 10)},${-5 + (steps / 2)} ${10 + (steps / 10)},${-15 - (steps / 2)} ${20 - (steps / 10)},${-10 - steps} ${20 - (steps / 10)},${-10 + steps}`);
                steps -= 1;
                window.requestAnimationFrame(animate);
            } else {
                playPause1.setAttribute('points', '0,0 0,-20 20,-10 20,-10');
                playPause2.setAttribute('points', '0,0 0,-20 20,-10 20,-10');
            }
        }
        animate();
        // setAttrs(playPause1, ['points', '0,0 0,-20 10,-15 10,-5']);
        // setAttrs(playPause2, ['points', '10,-5 10,-15 20,-10 20,-10']);
    }
    function switchPlayPauseOff() {
        let steps = 1;
        if (!s.interfaceAnimation) {
            steps = 10;
        }
        function animate() {
            if (steps <= 10) {
                playPause1.setAttribute('points', `1,${-steps} 1,${-20 + steps} 9,${-20 + steps} 9,${-steps}`);
                playPause2.setAttribute('points', `11,${-steps} 11,${-20 + steps} 19,${-20 + steps} 19,${-steps}`);
                steps += 1;
                window.requestAnimationFrame(animate);
            } else {
                setAttrs(group, ['display', 'none']);
            }
        }
        animate();
    }
    function switchPlayPauseOn() {
        let steps = 10;
        if (!s.interfaceAnimation) {
            steps = 0;
        }
        function animate() {
            if (steps >= 0) {
                playPause1.setAttribute('points', `0,${-steps} 0,${-20 + steps} 20,-10 20,-10`);
                playPause2.setAttribute('points', `0,${-steps} 0,${-20 + steps} 20,-10 20,-10`);
                steps -= 1;
                window.requestAnimationFrame(animate);
            } else {
                playPause1.setAttribute('points', '0,0 0,-20 20,-10 20,-10');
                playPause2.setAttribute('points', '0,0 0,-20 20,-10 20,-10');
            }
        }
        setAttrs(group, ['display', 'block']);
        animate();
        // setAttrs(playPause1, ['points', '0,0 0,-20 10,-15 10,-5']);
        // setAttrs(playPause2, ['points', '10,-5 10,-15 20,-10 20,-10']);
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
