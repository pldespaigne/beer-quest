
import { fileToString, parseCommand, waitUser } from './utils';


const MAX_STEPS = 100_000;

const state = {
  program: '',

  // TODO add the initial values you need
};

/** This function will initialize the state by using the current program */
function initialize() {
  // TODO implement this function if you need it
}

/**
 * This function will read one instruction of the program, execute the instruction, then update the state accordingly
 * @returns a boolean value that tells the interpreter if the execution should continue to run or not.
 * - If the returned value is `false` the execution will stop immediately
 * - If the returned value is `true` the execution will continue
 */
function step() {
  // TODO read next instruction

  // TODO execute instruction

  // TODO update the state

  return false; // TODO return true or false
}

/** User friendly print of the current state to help debugging */
function printState() {
  // TODO
}


async function interpret() {
  const { filePath, debug } = parseCommand();
  const program = fileToString(filePath);
  state.program = program;

  initialize();

  let run = true;
  let safety = 0;
  while (run && safety < MAX_STEPS) {
    safety++;

    run = step();

    if (debug) {
      console.log(`step: ${safety}`);
      printState();
      await waitUser();
    }
  }
}

interpret();
