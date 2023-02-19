export const makeMatrix = (/** @type {any} */ rows, /** @type {any} */ cols) =>
	Array.from(Array(rows), () => new Array(cols)); // make 2d array

/**
 * @param {string | any[]} items
 * @param {any} _row
 * @param {number} _col
 */
export function makeMatrixFromItems(items, _row, _col) {
	let matrix = makeMatrix(_row, _col);

	for (var i = 0; i < items.length; i++) {
		const value = items[i][_col];
		if (value) {
			const { x, y, h } = value;
			const id = items[i].id;
			const w = Math.min(_col, value.w);

			for (var j = y; j < y + h; j++) {
				const row = matrix[j];
				for (var k = x; k < x + w; k++) {
					row[k] = { ...value, id };
				}
			}
		}
	}
	return matrix;
}

/**
 * @param {any} items
 * @param {string | any[]} matrix
 * @param {{ w?: any; id?: any; h?: any; x?: any; y?: any; }} curObject
 */
export function findCloseBlocks(items, matrix, curObject) {
	const { h, x, y } = curObject;

	const w = Math.min(matrix[0].length, curObject.w);
	const tempR = matrix.slice(y, y + h);

	/**
	 * @type {Iterable<any> | null | undefined}
	 */
	let result = [];
	for (var i = 0; i < tempR.length; i++) {
		let tempA = tempR[i].slice(x, x + w);
		result = [
			...result,
			...tempA
				.map((/** @type {{ id: any; }} */ val) => val.id && val.id !== curObject.id && val.id)
				.filter(Boolean)
		];
	}

	return [...new Set(result)];
}

/**
 * @param {string | any[]} items
 * @param {string | any[]} ignoreList
 * @param {any} _row
 * @param {number} _col
 */
export function makeMatrixFromItemsIgnore(items, ignoreList, _row, _col) {
	let matrix = makeMatrix(_row, _col);
	for (var i = 0; i < items.length; i++) {
		const value = items[i][_col];
		const id = items[i].id;
		const { x, y, h } = value;
		const w = Math.min(_col, value.w);

		if (ignoreList.indexOf(id) === -1) {
			for (var j = y; j < y + h; j++) {
				const row = matrix[j];
				if (row) {
					for (var k = x; k < x + w; k++) {
						row[k] = { ...value, id };
					}
				}
			}
		}
	}
	return matrix;
}

/**
 * @param {string | any[]} closeBlocks
 * @param {any[]} items
 */
export function findItemsById(closeBlocks, items) {
	return items.filter((/** @type {{ id: any; }} */ value) => closeBlocks.indexOf(value.id) !== -1);
}
