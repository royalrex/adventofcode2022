(function (source) {
    const instructions = source.replace(/\n/g, ' ').split(' ');

    const crt = Array.from({length:6}, r => Array.from({length:40}, p => '.'));
    let command = '';
    let value = 1;
    let signal = 0;

    for (let cycle = 1; cycle <= instructions.length; cycle++) {
        const c = instructions[cycle - 1];
        if (command === '') {
            command = c;
        }

        if (cycle === 20 || cycle >= 60 && (cycle - 60) % 40 === 0) {
            signal += cycle * value;
        }

        // draw tt CRT
        const y = Math.floor((cycle-1) / 40);
        const x = ((cycle - 1) % 40);

        if (x >= value - 1 && x <= value + 1) {
            crt[y][x] = '#';
        }

        switch (command) {
            case "noop":
                command = "";
                break;
            case "addx":
                if (c !== command) {
                    value += parseInt(c);
                    command = '';
                }
                break;
        }
    }
    console.log("Part 1", signal);
    console.log("Part 2");
    console.log(crt.map(r => r.join('')).join('\n'));
})(document.body.innerText.trim());