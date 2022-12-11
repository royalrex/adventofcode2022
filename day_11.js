(function (source) {
    const lines = source.split("\n").filter(l => l !== '');

    const parser = (function (lines) {
        const parsed = [];
        let nextMonkey = null
        let monkeyLineCount = 0;

        for (const line of lines) {
            if (line.indexOf('Monkey') === 0) {
                const idx = parseInt(line.match(/(\d+)/)[0]);
                nextMonkey = {idx};
                monkeyLineCount = 0;
            } else {
                switch (monkeyLineCount) {
                    case 0:
                        const match = line.match(/\d+/g).map(i => parseInt(i));
                        nextMonkey.items = match;
                        break;
                    case 1:
                        nextMonkey.operation = line.substring(line.indexOf('=') + 2);
                        break;
                    case 2:
                        nextMonkey.test = parseInt(line.match(/\d+/)[0]);
                        break;
                    case 3:
                        nextMonkey.trueMonkey = parseInt(line.match(/\d+/)[0]);
                        break;
                    case 4:
                        nextMonkey.falseMonkey = parseInt(line.match(/\d+/)[0]);
                        parsed.push(nextMonkey);
                        break;
                }
                monkeyLineCount++;
            }
        }
        return parsed;
    });

    const operation = (formula, old) => {
        const parts = formula.split(' ');
        const left = parts[0] === 'old' ? old : parseInt(parts[0]);
        const right = parts[2] === 'old' ? old : parseInt(parts[2]);
        switch (parts[1]) {
            case "+": return left + right;
            case "-": return left - right;
            case "/": return left / right;
            case "*": return left * right;
        }
        return old;
    }

    const simulate = (monkeys, rounds, relief) => {
        const inspections = Array.from({length:monkeys.length}, () => 0);

        for (let round = 1; round <= rounds; round++) {
            for (const m of monkeys) {
                while (m.items.length) {
                    inspections[m.idx]+=1;
                    const i = m.items.shift();
                    const worry = operation(m.operation, i);
                    const result = relief(worry); // bigints truncate fractions.
                    const targetIdx = result % m.test === 0 ? m.trueMonkey : m.falseMonkey;
                    const target = monkeys[targetIdx];
                    target.items.push(result);
                }
            }
        }

        return inspections;
    }

    (() => {
        const monkeys = parser(lines);
        const modulo = monkeys.reduce((a,b) => a*b.test, 1);
        const inspCount = simulate(monkeys, 20, (worry) => Math.floor(worry / 3));
        inspCount.sort((a,b) => b - a);
        const r1 = inspCount[0] * inspCount[1];
        console.log("Part 1", r1);
    })();
    (() => {
        const monkeys = parser(lines);
        const modulo = monkeys.reduce((a,b) => a*b.test, 1);
        const inspCount = simulate(monkeys, 10000, (worry) => worry % modulo);
        inspCount.sort((a,b) => b - a);
        const r1 = inspCount[0] * inspCount[1];
        console.log("Part 2", r1);
    })();
})(document.body.innerText.trim());