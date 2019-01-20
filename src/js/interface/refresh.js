import { createElNS, setAttrs } from '../utils';

function createRefresh(s, svg) {
    // arrows
    const marker = createElNS('marker');
    marker.id = Math.random() * 10;
    setAttrs(marker, ['viewBox', '0 0 10 10'], ['refX', '1'], ['refY', '5'], ['markerWidth', '3'], ['markerHeight', '3'], ['orient', 'auto']);


    // arrow path
    const path = createElNS('path');
    setAttrs(path, ['d', 'M 0 0 L 10 5 L 0 10 z']);
    marker.appendChild(path);


    // icons
    const refresh = createElNS('g');
    refresh.className.baseVal = 'interface';
    const arc1 = createElNS('path');
    const arc2 = createElNS('path');
    setAttrs(arc1, ['d', 'M0 -10 a 10 10, 90 0 1 10 -10'], ['marker-end', `url(#${marker.id})`], ['stroke-dasharray', '15']);
    setAttrs(arc2, ['d', 'M20 -10 a 10 10, 90 0 1 -10 10'], ['marker-end', `url(#${marker.id})`], ['stroke-dasharray', '15']);
    refresh.appendChild(arc1);
    refresh.appendChild(arc2);
    setAttrs(refresh, ['fill', 'none'], ['stroke-width', '2'], ['transform', 'translate(30, 0)'], ['display', 'none']);


    // button
    const button = createElNS('rect');
    setAttrs(button, ['x', '0'], ['y', '-20'], ['width', '20'], ['height', '20'], ['fill-opacity', '0'], ['transform', 'translate(30, 0)']);

    // group button and icon

    const refreshGroup = createElNS('g');
    refreshGroup.appendChild(refresh);
    refreshGroup.appendChild(button);

    // set button and icons to correct position at the bottom left of svg
    function setPosition() {
        const viewBox = svg.viewBox.baseVal;
        const matrix = svg.createSVGMatrix();
        matrix.e = viewBox.x + (viewBox.width * 0.05);
        matrix.f = viewBox.y + (viewBox.height * 0.95);
        const interfaceSize = viewBox.height / 400;
        matrix.a = interfaceSize;
        matrix.d = interfaceSize;
        refreshGroup.transform.baseVal.initialize(svg.createSVGTransformFromMatrix(matrix));
    }

    function addUserSettings() {
    // set color
        setAttrs(refresh, ['stroke', s.interfaceColor]);
        setAttrs(marker, ['fill', s.interfaceColor]);
        // set interface size
        const { matrix } = refreshGroup.transform.baseVal.getItem(0);
        matrix.a *= s.interfaceSize;
        matrix.d *= s.interfaceSize;

        // set interface position
        if (s.interfacePosition !== 'auto') {
            [matrix.e, matrix.f] = s.interfacePosition;
        }

        refreshGroup.transform.baseVal.getItem(0).setMatrix(matrix);
    }
    let defs = svg.getElementsByTagName('defs')[0];

    // check for defs element in DOM, if not exist - add it
    if (!defs) {
        defs = createElNS('defs');
        svg.insertBefore(defs, svg.firstChild);
    }

    setPosition();

    addUserSettings();

    // add button to DOM
    defs.appendChild(marker);
    svg.appendChild(refreshGroup);

    function switchRefreshOff() {
        let steps = 1;
        if (!s.interfaceAnimation) {
            steps = 10;
        }
        function animate() {
            if (steps <= 10) {
                arc1.setAttribute('stroke-dashoffset', -steps * 1.5);
                arc2.setAttribute('stroke-dashoffset', -steps * 1.5);
                steps += 1;
                window.requestAnimationFrame(animate);
            } else {
                setAttrs(refresh, ['display', 'none']);
            }
        }
        animate();
    }

    function switchRefreshOn() {
        setAttrs(refresh, ['display', 'block']);
        let steps = 10;
        if (!s.interfaceAnimation) {
            steps = 1;
        }
        function animate() {
            if (steps >= 0) {
                arc1.setAttribute('stroke-dashoffset', -steps * 1.5);
                arc2.setAttribute('stroke-dashoffset', -steps * 1.5);
                steps -= 1;
                window.requestAnimationFrame(animate);
            }
        }
        animate();
    }

    return {
        off: switchRefreshOff,
        on: switchRefreshOn,
        button,
    };
}

export default createRefresh;
