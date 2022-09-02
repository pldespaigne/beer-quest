
import { cursorTo } from 'readline';

const origins = [
  'top-left', 'top', 'top-right',
  'left', 'center', 'right',
  'bottom-left', 'bottom', 'bottom-right',
] as const;
export type Origin = typeof origins[number];

export class TerminalRenderer {

  public get currentSize() {
    const w = process.stdout.columns;
    const h = process.stdout.rows;
    return { w, h };
  }

  public cursor = { x: 0, y: 0 };

  // private rl = createInterface({ input: process.stdin, output: process.stdout });

  constructor(
    private width: number,
    private height: number,
  ) {
    this.clear();
    this.moveTo();
  }

  clear() {
    process.stdout.write('\x1bc');
  }

  fill(text: string) {
    this.moveTo();
    // for(let y = 0 ; y < this.height ; y++) {
    //   cursorTo(process.stdout, 0, y);
    //   process.stdout.write(('').padStart(this.width, 'x'));
    // }
    const width = Math.min(this.width, this.currentSize.w);
    const height = Math.min(this.height, this.currentSize.h);
    // let nextLine = true;
    let nextCol = true;
    let safety = 0;
    // // while(nextLine) {
      while(nextCol) {
        if (safety > 1000) break;
        safety++;

        this.write(text);
        if (this.cursor.y >= height) break;
      }
    // }
    // this.toEnd();
    this.moveToEnd();
  }

  private write(text: string) {
    const width = Math.min(this.width, this.currentSize.w);
    const remaining = width - this.cursor.x;
    const safeText = text.substring(0, remaining);
    process.stdout.write(safeText);
    if (this.cursor.x + safeText.length >= width) {
      this.cursor.x = 0;
      this.cursor.y++;
      this.moveTo(this.cursor.x, this.cursor.y);
    } else {
      this.cursor.x += safeText.length;
    }
  }

  private moveTo(x = 0, y = 0) {
    this.cursor.x = x;
    this.cursor.y = y;
    cursorTo(process.stdout, x, y);
  }
  private moveToEnd() {
    this.moveTo(this.currentSize.w, this.currentSize.h);
  }
}