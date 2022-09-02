
import { emitKeypressEvents } from 'readline';

import { TerminalRenderer } from './renderer';


function main() {

  const renderer = new TerminalRenderer(100, 30);

  renderer.fill([
    '╭╮',
    '╰╯',
  ])

  renderer.draw([
    '○══►',
    '║',
    '▼',
  ]);

  renderer.draw([
    '◄══○══►',
    '   ║',
    '   ▼',
  ], 50, 0, 'top', ' ');

  renderer.draw([
    '◄══○',
    '   ║',
    '   ▼',
  ], 100, 0, 'top-right', ' ');

  renderer.draw([
    '▲',
    '║',
    '○══►',
    '║',
    '▼',
  ], 0, 15, 'left');

  renderer.draw([
    '   ▲',
    '   ║',
    '◄══○',
    '   ║',
    '   ▼',
  ], 100, 15, 'right', ' ');

  renderer.draw([
    '▲',
    '║',
    '○══►',
  ], 0, 30, 'bottom-left');

  renderer.draw([
    '   ▲',
    '   ║',
    '◄══○══►',
  ], 50, 30, 'bottom', ' ');

  renderer.draw([
    '   ▲',
    '   ║',
    '◄══○',
  ], 100, 30, 'bottom-right', ' ');

  const background = renderer.getBuffer();

  let x = 50;
  let y = 15;
  const title = [
    '○═════════════○',
    '║             ║',
    '║  Lala Pute  ║',
    '║             ║',
    '○═════════════○',
  ];
  renderer.draw(title, x, y, 'center');

  // renderer.render();

  process.stdout.write('\x1b[38;2;255;0;0m\x1b[48;2;0;0;255mHello World!\x1b[0m');

  emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.on('keypress', (char, e) => {

    // exit on Ctrl-C
    if (e.name === 'c' && e.ctrl === true)
      process.exit();

    else {
      
      // TODO PROCESS INPUT
      // TODO UPDATE GAME STATE
      if (e.name === 'up') {
        y--;
        renderer.resetBuffer();
        renderer.draw(background);
        renderer.draw(title, x, y, 'center');
        renderer.render();
      }
      if (e.name === 'down') {
        y++;
        renderer.resetBuffer();
        renderer.draw(background);
        renderer.draw(title, x, y, 'center');
        renderer.render();
      }
      if (e.name === 'left') {
        x--;
        renderer.resetBuffer();
        renderer.draw(background);
        renderer.draw(title, x, y, 'center');
        renderer.render();
      }
      if (e.name === 'right') {
        x++;
        renderer.resetBuffer();
        renderer.draw(background);
        renderer.draw(title, x, y, 'center');
        renderer.render();
      }
    }
  });

  

  // // game loop
  // setInterval(() => {
  //   renderer.render();
  // }, GAME_TICK);
}

main();
