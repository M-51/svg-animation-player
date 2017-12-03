import { createElNS, setAttrs } from '../utils';

function createRefresh(s, svg) {
    // arrows
    const marker = createElNS('marker');
    marker.id = 'arrow';
    setAttrs(marker, ['viewBox', '0 0 10 10'], ['refX', '1'], ['refY', '5'], ['markerWidth', '3'], ['markerHeight', '3'], ['orient', 'auto']);


    // arrow path
    const path = createElNS('path');
    setAttrs(path, ['d', 'M 0 0 L 10 5 L 0 10 z']);
    marker.appendChild(path);


    // icons
    const refresh = createElNS('g');
    const arc1 = createElNS('path');
    const arc2 = createElNS('path');
    setAttrs(arc1, ['d', 'M-10 0 A 10 10 0 0 1 0 -10'], ['marker-end', 'url(#arrow)']);
    setAttrs(arc2, ['d', 'M10 0 A 10 10 0 0 1 0 10'], ['marker-end', 'url(#arrow)']);
    refresh.appendChild(arc1);
    refresh.appendChild(arc2);
    setAttrs(refresh, ['fill', 'none'], ['stroke-width', '2'], ['transform', 'translate(30, 0)']);


    // button
    const button = createElNS('rect');
    setAttrs(button, ['x', '-10'], ['y', '-10'], ['width', '20'], ['height', '20'], ['fill-opacity', '0'], ['transform', 'translate(30, 0)']);

    // group button and icon

    const refreshGroup = createElNS('g');
    refreshGroup.appendChild(refresh);
    refreshGroup.appendChild(button);

    // set button and icons to correct position at the bottom left of svg
    function setPosition() {
        const viewBox = svg.viewBox.baseVal;
        const matrix = svg.createSVGMatrix();
        matrix.e = viewBox.x + 25;
        matrix.f = viewBox.y + (viewBox.height - 25);
        refreshGroup.transform.baseVal.initialize(svg.createSVGTransformFromMatrix(matrix));
    }

    function addUserSettings() {
    // set color
        setAttrs(refresh, ['stroke', s.interfaceColor]);
        setAttrs(marker, ['fill', s.interfaceColor]);

        // set interface size
        const { matrix } = refreshGroup.transform.baseVal.getItem(0);
        matrix.a = s.interfaceSize;
        matrix.d = s.interfaceSize;

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
        setAttrs(refresh, ['display', 'none']);
    }

    function switchRefreshOn() {
        setAttrs(refresh, ['display', 'block']);
    }

    return {
        off: switchRefreshOff,
        on: switchRefreshOn,
        button,
    };
}

export default createRefresh;
