
import { readFileSync } from 'fs';
import { stdin, stdout } from 'process';
import { createInterface } from 'readline';


export function fileToString(path: string) {
  try {
    const buffer = readFileSync(path);
    const content = buffer.toString();
    return content;
  } catch (_) {
    console.log(`\n\x1b[33mInvalid file or file path.\x1b[0m`);
    help();
    process.exit(1);
  }
}

export async function readValue() {
  let v = -1;
  while (v < 0 || v > 255) {
    v = await new Promise<number>(res => {
      const rl = createInterface({ input: stdin, output: stdout });
      rl.question('\n\x1b[32mEnter a value\x1b[0m: ', answer => {
        if (answer.startsWith('$$')) {
          const value = answer.split('$$')[1];
          const result = parseInt(value);
          res(result);
        } else {
          res(answer.charCodeAt(0));
        }
        rl.close();
      });
    });
    if (v < 0 || v > 255) console.log(`\x1b[33mYou entered ${v}, but the value must between 0-255.\x1b[0m`);
  }
  return v;
}

export function waitUser() {
  return new Promise<void>(res => {
    const rl = createInterface({ input: stdin, output: stdout });
    rl.question('\nPress Enter to continue...\n', () => {
      res();
      rl.close();
    });
  });
}

export function help() {
  console.log(`
Brain Fuck Interpreter

$> npm run bf <file-path> [options]

file-path: path to a text file containing the brain fuck program.

options:
  --debug, -d    Run the program in debug mode
  --help, -h     Display this help message

Every other arguments are ignored.
`);
}

export function parseCommand() {
  const args = process.argv;
  args.shift();
  args.shift();

  const needHelp = args.some(arg => arg === '-h' || arg === '--help');
  if (needHelp) {
    help();
    process.exit(0);
  }

  if (!args.length) {
    console.log(`\n\x1b[33mMissing file path.\x1b[0m`);
    help();
    process.exit(1);
  }

  const filePath = args.shift()!;
  const debug = args.some(arg => arg === '-d' || arg === '--debug');

  return { filePath, debug };
}


