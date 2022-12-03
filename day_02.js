(function (source) {

    const data = source.split("\n").map(i => i.split(" "));
    // 1 for Rock, 2 for Paper, and 3 for Scissors
    const shapePoints = new Map([
        ['A', 1], // X Rock
        ['B', 2], // Y Paper
        ['C', 3], // Z Scissors
    ]);
    // 0 if you lost, 3 if the round was a draw, and 6 if you won
    // a vs b, we play b, so
    const endResultPoints = new Map([
        [-1, 6],
        [0, 3],
        [1, 0]
    ]);

    const remapShape = new Map([
        ['X', 'A'],
        ['Y', 'B'],
        ['Z', 'C'],
    ]);

    const remapShapeReverse = new Map([
        ['A', 'X'],
        ['B', 'Y'],
        ['C', 'Z'],
    ]);

    const findShape = ([a, b]) => {
        if (b === 'Y') return remapShapeReverse.get(a); // we need to tie
        if (b === 'X')  // we need to loose
            if (a === 'A') return 'Z';
            else if (a === 'B') return 'X';
            else if (a === 'C') return 'Y';
        if (b === 'Z')  // we need to win
            if (a === 'A') return 'Y';
            else if (a === 'B') return 'Z';
            else if (a === 'C') return 'X';
    };

    const whoWins = ([a, b]) => {
        var bd = remapShape.get(b);
        if (a === bd) return 0; // same

        if (a === 'A' && bd === 'B') return -1; // Rock vs Paper
        if (a === 'A' && bd === 'C') return 1; // Rock vs Scissors

        if (a === 'B' && bd === 'A') return 1; // Paper vs Rock
        if (a === 'B' && bd === 'C') return -1; // Paper vs Scissors

        if (a === 'C' && bd === 'A') return -1; // Scissors vs Rock
        if (a === 'C' && bd === 'B') return 1; // Scissors vs Paper
    };

    const results1 = data.map(
        (i) => {
            return endResultPoints.get(whoWins(i)) + shapePoints.get(i[1])
        }
    );
    console.log(
        "Combined score (part 1)",
        results1.reduce((a, b) => a + b)
    );

    const results2 = data.map(
        (i) => {
            const shape = findShape(i);
            const resultPoints = endResultPoints.get(whoWins([i[0], shape]));
            const shapeP = shapePoints.get(remapShape.get(shape));
            return resultPoints + shapeP;
        }
    );

    console.log(
        "Results (part 2)",
        results2.reduce((a, b) => a + b)
    );

//})("A Y\nB X\nC Z");
})(document.body.innerText.trim());