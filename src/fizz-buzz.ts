console.log('Wazaaaaaaa!'); 

/**Disfunction mes couilles */
function fizzBuzz(varPrompt: number) {
    for(let i=1; i <= varPrompt; i++) {
        let result = '';

        if (i % 3 === 0) {
            result = 'Fizz';
        }

        if (i % 5 === 0) {
            result = result + 'Fuzz';
        }

        if (i % 3 !== 0 && i % 5 !== 0) {
            result = `${i}`;
        }
        console.log(result);
    }
}

// this is coooooool!
fizzBuzz(22);