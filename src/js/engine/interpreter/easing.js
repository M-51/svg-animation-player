function linear(t, b, c, d) {
	return c*t/d + b;
}
function easeInQuad(t, b, c, d) {
	t /= d;
	return c*t*t + b;
}
function easeOutQuad(t, b, c, d) {
	t /= d;
	return -c * t*(t-2) + b;
}
 function easeInOutQuad(t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
}
function easeInCubic(t, b, c, d) {
	t /= d;
	return c*t*t*t + b;
}
function easeOutCubic(t, b, c, d) {
	t /= d;
	t--;
	return c*(t*t*t + 1) + b;
}
function easeInOutCubic(t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t + b;
	t -= 2;
	return c/2*(t*t*t + 2) + b;
}

export {
    linear,
    easeInQuad,
    easeOutQuad,
    easeInOutQuad,
    easeInCubic,
    easeOutCubic,
    easeInOutCubic,
};
