
import { emitKeypressEvents } from 'readline';

import { TerminalRenderer } from '../renderer';

export type GameCell = 0 | 1 | 2;
export type GamePosition = 0 | 1 | 2;
export type GamePlayer = 1 | 2;

export interface GameState {
  cells: GameCell[][];
  pos: { x: GamePosition, y: GamePosition };
  current: GamePlayer;
};

const grid = [
  '╔═══╦═══╦═══╗',
  '║   ║   ║   ║',
  '╠═══╬═══╬═══╣',
  '║   ║   ║   ║',
  '╠═══╬═══╬═══╣',
  '║   ║   ║   ║',
  '╚═══╩═══╩═══╝',
];

const renderer = new TerminalRenderer(100, 30);


function drawGame(state: GameState) {

  const player = state.current === 1 ? 'X' : 'O';

  renderer.draw([`${player} turn`], 14, 4);

  renderer.draw(grid, 10, 5);

  for(let y = 0 ; y < 3 ; y++) {
    for(let x = 0 ; x < 3 ; x++) {
      const cell = state.cells[y][x];
      if (cell === 1) renderer.draw(['X'], 12 + 4 * x, 6 + 2 * y);
      if (cell === 2) renderer.draw(['O'], 12 + 4 * x, 6 + 2 * y);
    }
  }

  renderer.draw(['[ ]'], 11 + 4 * state.pos.x, 6 + 2 * state.pos.y, 'top-left', ' ');

  renderer.draw([
    'Use arrows to move.',
    'Press space to play.',
    'Press Ctrl-c to quit.',
  ], 10, 15)

  renderer.render();
}


export function ticTacToe(
  state: GameState,
  onMoveUp: () => void,
  onMoveDown: () => void,
  onMoveRight: () => void,
  onMoveLeft: () => void,
  onPlay: () => void,
) {
  drawGame(state);

  emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.on('keypress', (char, e) => {

    // exit on Ctrl-C
    if (e.name === 'c' && e.ctrl === true) {
      process.exit();
    } else {
      if (e.name === 'up') {
        onMoveUp();
      }
      if (e.name === 'down') {
        onMoveDown();
      }
      if (e.name === 'right') {
        onMoveRight();
      }
      if (e.name === 'left') {
        onMoveLeft();
      }
      if (e.name === 'space') {
        onPlay();
      }
    }

    drawGame(state);
  });
}