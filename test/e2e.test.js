/* eslint-disable object-curly-newline */
const path = require('path');

describe('Animation', () => {
    beforeAll(async () => {
        await page.goto(`file:${path.join(__dirname, 'test-svg/test-svg.svg')}`);
    });

    it('should create SVGAnimationPlayer object with status: "not started"', async () => {
        const status = await page.evaluate(() => testSvg.status);
        expect(status).toBe('not started');
    });

    it('should click start', async () => {
        await expect(page).toClick('#play-pause');
    });

    it('should end animation with status "ended" ', async () => {
        await new Promise((resolve) => setTimeout(resolve, 150));
        const status = await page.evaluate(() => testSvg.status);
        expect(status).toBe('ended');
    });

    it('should end animation with correct position of rect ', async () => {
        const matrix = JSON.parse(await page.evaluate(() => {
            const { a, b, c, d, e, f } = document.getElementById('rect').transform.baseVal.getItem(0).matrix;
            return JSON.stringify({ a, b, c, d, e, f });
        }));
        expect(matrix).toEqual({ a: 1, b: 0, c: 0, d: 1, e: 100, f: 100 });
    });

    it('should refresh animation', async () => {
        await expect(page).toClick('#refresh');
    });

    it('should refresh animation with status "not started" ', async () => {
        await new Promise((resolve) => setTimeout(resolve, 150));
        const status = await page.evaluate(() => testSvg.status);
        expect(status).toBe('not started');
    });

    it('should refresh animation with correct position of rect ', async () => {
        const matrix = JSON.parse(await page.evaluate(() => {
            const { a, b, c, d, e, f } = document.getElementById('rect').transform.baseVal.getItem(0).matrix;
            return JSON.stringify({ a, b, c, d, e, f });
        }));
        expect(matrix).toEqual({ a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 });
    });
});
