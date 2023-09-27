const EMPTY_CELL = 0 // The value for non occupied cells
const PIECE_INTERVAL = 500 // Interval time for piece movement
const GRID_HEIGHT = 20 // Height of grid in blocks
const GRID_WIDTH = 10 // Width of grid in blocks
const BORDER_COLOR = 'black' // "#FFFFFF"
const NUM_ROTATIONS = 4
export const HEURISTIC_COEFFICIENTS = { height: -0.510066, lines: 0.760666, holes: -0.35663, bumpiness: -0.184483 } // Heuristics for the AI

export { EMPTY_CELL, PIECE_INTERVAL, GRID_HEIGHT, GRID_WIDTH, BORDER_COLOR, NUM_ROTATIONS }