
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

  private buffer: string[] = [];

  constructor(
    private minWidth: number,
    private minHeight: number,
  ) {
    this.resetBuffer();
    this.clear();
   
    process.stdout.on('resize', () => this.checkSize()); // arrow fn is required to maintain `this.`
  }

  private checkSize() {
    if (this.currentSize.w < this.minWidth + 1 || this.currentSize.h < this.minHeight + 2) {
      this.clear();
      const midHeight = Math.floor(this.currentSize.h / 2);
      for (let y = 0 ; y < this.currentSize.h ; y++) {
        if (y === midHeight) {
          const text = `Your Terminal is too small (${this.currentSize.w}x${this.currentSize.h}).\n`;
          process.stdout.write(text);
        } else if (y === midHeight + 1) {
          const text = `Please increase your Terminal size to ${this.minWidth + 1}x${this.minHeight + 2}.\n`;
          process.stdout.write(text);
        } else {
          process.stdout.write(('').padStart(this.currentSize.w - 1, ' '));
          process.stdout.write('*\n');
        }
      }
    } else {
      this.render();
    }
  }

  render() {
    this.clear();
    for (let y = 0 ; y < this.buffer.length ; y++) {
      process.stdout.write(this.buffer[y]);
      process.stdout.write('\n');
    }
  }

  clear() {
    process.stdout.write('\x1bc');
  }

  resetBuffer() {
    this.buffer = [];
    for (let y = 0 ; y < this.minHeight ; y++) {
      this.buffer.push(''); // add new row
      for (let x = 0 ; x < this.minWidth ; x++) {
        this.buffer[y] += ' ';
      }
    }
  }

  draw(data: string[], x = 0, y = 0, origin: Origin = 'top-left', alpha?: string) {

    const height = data.length;
    // find longest row
    const width = data.reduce((acc, curr) => acc > curr.length ? acc : curr.length, 0);

    let hOffset = 0;
    let wOffset = 0;
    switch (origin) {
      case 'top-left':
        // default: nothing else to do
        break;
      case 'top':
        wOffset = -Math.floor(width / 2);
        break;
      case 'top-right':
        wOffset = -width;
        break;
      case 'left':
        hOffset = -Math.floor(height / 2);
        break;
      case 'center':
        hOffset = -Math.floor(height / 2);
        wOffset = -Math.floor(width / 2);
        break;
      case 'right':
        hOffset = -Math.floor(height / 2);
        wOffset = -width;
        break;
      case 'bottom-left':
        hOffset = -height;
        break;
      case 'bottom':
        hOffset = -height;
        wOffset = -Math.floor(width / 2);
        break;
      case 'bottom-right':
        hOffset = -height;
        wOffset = -width;
        break;
      default:
        break;
    }

    x += wOffset;
    y += hOffset;

    for (let h = 0 ; h < height ; h++) {
      if (h + y < 0) continue;
      if (h + y >= this.minHeight) break;

      const before = this.buffer[h + y].substring(0, x);
      const after = this.buffer[h + y].substring(x + data[h].length);

      let line = data[h];

      if (alpha) {
        line = '';
        const under = this.buffer[h + y].substring(x, x + data[h].length);
        for(let i = 0 ; i < data[h].length ; i++) {
          line += data[h][i] === alpha[0] ? under[i] : data[h][i];
        }
      }

      this.buffer[h + y] = (before + line + after).substring(0, this.minWidth);
    }
  }

  fill(data: string[], origin: Origin = 'top-left') {
    const height = data.length;
    // find longest row
    const width = data.reduce((acc, curr) => acc > curr.length ? acc : curr.length, 0);

    const rows = Math.floor(this.minHeight / height);
    const columns = Math.floor(this.minWidth / width);

    for (let i = 0 ; i < rows ; i++) {
      for (let j = 0 ; j < columns ; j++) {
        this.draw(data, j * width, i * height, origin);
      }
    }
  }

  getBuffer() {
    return [...this.buffer];
  }
}