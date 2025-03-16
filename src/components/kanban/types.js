
/**
 * @typedef {Object} CardType
 * @property {string} id - Unique identifier for the card
 * @property {string} title - Card title
 * @property {string} [description] - Optional card description
 * @property {string[]} [labels] - Optional array of label strings
 */

/**
 * @typedef {Object} ColumnType
 * @property {string} id - Unique identifier for the column
 * @property {string} title - Column title
 * @property {CardType[]} cards - Array of cards in this column
 */

// This file doesn't export anything directly as it's just for JSDoc typedefs
