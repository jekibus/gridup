import { getRowsCount } from './other.js';

/**
 * @param {any} items
 * @param {number} yPerPx
 * @param {any} cols
 */
export function getContainerHeight(items, yPerPx, cols) {
	return getRowsCount(items, cols) * yPerPx;
}
