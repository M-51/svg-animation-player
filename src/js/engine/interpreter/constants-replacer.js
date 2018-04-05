function constantsReplacer(item) {
    const values = item[1];
    const keys = Object.keys(values);
    keys.forEach((key) => {
        if (key === 'translate') {
            if (typeof values[key].x === 'number') {
                const x = Object.assign(values[key].x);
                values[key].x = () => x;
            }
            if (typeof values[key].y === 'number') {
                const y = Object.assign(values[key].y);
                values[key].x = () => y;
            }
        } else if (key === 'rotate' || key === 'scale') {
            if (typeof values[key] === 'number') {
                const num = Object.assign(values[key]);
                values[key] = () => num;
            }
        } else if (key === 'value') {
            if (typeof values[key] === 'number' || typeof values[key] === 'string') {
                const numOrString = Object.assign(values[key]);
                values[key] = () => numOrString;
            }
        }
    });
}

export default constantsReplacer;
