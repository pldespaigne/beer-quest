
import { emitKeypressEvents } from 'readline';

import { TerminalRenderer } from '../renderer';


let state: boolean[][] = [];

const WIDTH = 100;
const HEIGHT = 30;
const TICK = 100; // ms
const RAND = 0.5; // between 0 and 1

const renderer = new TerminalRenderer(WIDTH, HEIGHT);

function getInitialState(width: number, height: number) {
  for(let i = 0 ; i < height ; i++) {
    state.push([]);
    const line = state[i];
    for(let j = 0 ; j < width ; j++) {
      line.push(Math.random() > RAND);
    }
  }

  state[1][2] = true;
  state[2][3] = true;
  state[3][1] = true;
  state[3][2] = true;
  state[3][3] = true;
}


function draw() {
  const drawableState = state.map(line => {
    let drawableLine = '';
    for (let i = 0 ; i < line.length ; i++) {
      drawableLine += line[i] ? '█' : ' ';
    }
    return drawableLine;
  });
  renderer.draw(drawableState);
  renderer.render();
}

function update() {
  const clone: boolean[][] = [];

  for(let i = 0 ; i < state.length ; i++) {
    clone.push([]);
    const line = clone[i];
    for(let j = 0 ; j < state[i].length ; j++) {
      line.push(state[i][j]);
    }
  }

  for(let i = 0 ; i < state.length ; i++) {

    for(let j = 0 ; j < state[i].length ; j++) {
      
      const north = state[i - 1]?.[j];
      const northEast = state[i - 1]?.[j + 1];
      const east = state[i]?.[j + 1];
      const southEast = state[i + 1]?.[j + 1];
      const south = state[i + 1]?.[j];
      const southWest = state[i + 1]?.[j - 1];
      const west = state[i]?.[j - 1];
      const northWest = state[i - 1]?.[j - 1];

      const neighbors = [
        north,
        northEast,
        east,
        southEast,
        south,
        southWest,
        west,
        northWest,
      ];

      const sumAlive = neighbors.filter(n => n).length;
      
      if (state[i][j]) {
        
        if (sumAlive <= 1) clone[i][j] = false;
        if (sumAlive >= 4) clone[i][j] = false;
        if (sumAlive === 2 || sumAlive === 3) clone[i][j] = true;

      } else {

        if (sumAlive === 3) clone[i][j] = true;
      
      }
    }
  }
  state = clone;
}

function gameOfLife() {

  getInitialState(WIDTH, HEIGHT);
  draw();

  setInterval(() => {
    draw();
    update();
  }, TICK);

  emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.on('keypress', (_, e) => {
    // exit on Ctrl-C
    if (e.name === 'c' && e.ctrl === true) {
      process.exit();
    }
  });
}


gameOfLife();