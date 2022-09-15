console.log('Wazaaaaaaa!'); 

function fizzBuzz(varPrompt: number) {
    for(let i=1; i <= varPrompt; i++) {
        let result = '';

        if (i % 3 === 0) {
            result = 'fizz';
        }

        if (i % 5 === 0) {
            result = result + 'buzz';
        }

        if (i % 3 !== 0 && i % 5 !== 0) {
            result = `${i}`;
        }
        console.log(result);
    }
}

fizzBuzz(22);