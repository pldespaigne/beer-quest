
import { GamePlayer, GamePosition, GameState, ticTacToe } from './game';

const state: GameState = {
  cells: [
    [0,0,0],
    [0,0,0],
    [0,0,0]
        ],
  pos : {x: 0, y: 0},
  current: 1,
};

function onMoveUp() {
  if (state.pos.y !== 0) {
    state.pos.y--;
  } else if (state.pos.y === 0) {
    state.pos.y = 2;
  }
}

function onMoveDown() {
  if (state.pos.y !== 2) {
    state.pos.y++;
  } else if (state.pos.y === 2) {
    state.pos.y = 0;
  }
}

function onMoveLeft() {
  if (state.pos.x !== 0) {
    state.pos.x--;
  } else if (state.pos.x === 0) {
    state.pos.x = 0;
  }
}

function onMoveRight() {
  if (state.pos.x !== 2) {
    state.pos.x++;
  } else if (state.pos.x === 2) {
    state.pos.x = 0;
  }
}

function onPlay() {
  if (state.current === 1 && state.cells[state.pos.y][state.pos.x] === 0) {
    state.cells[state.pos.y][state.pos.x] = state.current;
    state.current = 2;
  }else if(state.current === 2 && state.cells[state.pos.y][state.pos.x] === 0){
    state.cells[state.pos.y][state.pos.x] = state.current;
    state.current = 1;
  }
}

ticTacToe(
  state,
  onMoveUp,
  onMoveDown,
  onMoveRight,
  onMoveLeft,
  onPlay,
);