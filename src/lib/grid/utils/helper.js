import { makeMatrixFromItems } from './matrix.js';
import { findFreeSpaceForItem, normalize, adjust } from './item.js';
import { getRowsCount } from './other.js';

/**
 * @param {string} item
 */
function makeItem(item) {
	// @ts-ignore
	const { min = { w: 1, h: 1 }, max } = item;
	return {
		fixed: false,
		resizable: !item.fixed,
		draggable: !item.fixed,
		customDragger: false,
		customResizer: false,
		min: {
			w: Math.max(1, min.w),
			h: Math.max(1, min.h)
		},
		max: { ...max },
		// @ts-ignore
		...item
	};
}

const gridHelp = {
	/**
	 * @param {any[]} items
	 * @param {any} col
	 */
	normalize(items, col) {
		const rows = getRowsCount(items, col);
		return normalize(items, col);
	},

	/**
	 * @param {any} items
	 * @param {any} col
	 */
	adjust(items, col) {
		return adjust(items, col);
	},

	/**
	 * @param {any} obj
	 */
	item(obj) {
		return makeItem(obj);
	},

	/**
	 * @param {{ [x: string]: any; }} item
	 * @param {any[]} items
	 * @param {any} cols
	 */
	findSpace(item, items, cols) {
		let matrix = makeMatrixFromItems(items, getRowsCount(items, cols), cols);

		let position = findFreeSpaceForItem(matrix, item[cols]);
		return position;
	}
};

export default gridHelp;
