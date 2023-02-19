/**
 * @param {{ (): void; ({ detail }: { detail: any; }): void; (arg0: any): void; }} func
 * @param {number} timeFrame
 */
export function throttle(func, timeFrame) {
	let lastTime = 0;
	return function (/** @type {any} */ ...args) {
		let now = new Date();
		// @ts-ignore
		if (now - lastTime >= timeFrame) {
			// @ts-ignore
			func(...args);
			// @ts-ignore
			lastTime = now;
		}
	};
}

/**
 * @param {any[]} items
 * @param {string | number} cols
 */
export function getRowsCount(items, cols) {
	const getItemsMaxHeight = items.map((/** @type {{ [x: string]: any; }} */ val) => {
		const item = val[cols];

		return (item && item.y) + (item && item.h) || 0;
	});

	return Math.max(...getItemsMaxHeight, 1);
}

/**
 * @param {number} containerWidth
 * @param {number[][]} columns
 */
export function getColumn(containerWidth, columns) {
	const sortColumns = columns
		.slice()
		.sort((/** @type {number[]} */ a, /** @type {number[]} */ b) => a[0] - b[0]);

	const breakpoint = sortColumns.find((/** @type {any} */ value) => {
		const [width] = value;
		return containerWidth <= width;
	});

	if (breakpoint) {
		return breakpoint[1];
	} else {
		return sortColumns[sortColumns.length - 1][1];
	}
}
