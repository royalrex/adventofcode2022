(function (source) {
    const lines = source.split("\n");
    const splitter = lines.findIndex(i => i === '');
    const crates = lines.slice(0, splitter - 1);
    const moveExp = /move (\d+) from (\d+) to (\d+)/;

    const moves = lines.slice(splitter + 1).map(m => {
        const match = m.match(moveExp);

        return {
            crates: parseInt(match[1]),
            from: parseInt(match[2]) - 1,
            to: parseInt(match[3]) - 1,
        };
    });

    const ship = Array.from({length: 9}, () => []);
    crates.reverse();
    const cIdxs = Array.from({length: 9}, (e, i) => i === 0 ? 1 : 1 + i * 4);

    for (const layer of crates) {
        const line = layer.split('').filter((c, i) => cIdxs.includes(i));
        for (let c = 0; c < line.length; c++) {
            if (line[c] === ' ') continue;
            ship[c].push(line[c]);
        }
    }

    console.log(ship.map(c => c.join('|')).join("\n"));

    const ship1 = ship.map(c => [...c]);
    const ship2 = ship.map(c => [...c]);

    for (const move of moves) {
        console.log(move);
        for (let m = 0; m < move.crates; m++) {
            ship1[move.to].push(ship1[move.from].pop());
        }
        ship2[move.to] = ship2[move.to]
            .concat(
                ship2[move.from]
                    .splice(ship2[move.from].length - move.crates)
            );
    }

    console.log("Part 1", ship1.map((c, i) => (i + 1) + ": " + c.join('|')).join("\n"));
    console.log("Part 2", ship2.map((c, i) => (i + 1) + ": " + c.join('|')).join("\n"));

})(document.body.innerText.trim());