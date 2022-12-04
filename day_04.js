(function (source) {
    const pairs = source.split("\n")
        .map(
            ps => ps
                .split(',')
                .map(
                    p => p.
                    split('-')
                        .map(i => parseInt(i))
                )
                .flat()
        );

    let fullOverlaps = 0;
    let overlaps = 0;

    for (const pair of pairs) {
        if ((pair[0] <= pair[2] && pair[1] >= pair[3]) ||
            pair[2] <= pair[0] && pair[3] >= pair[1]) {
            fullOverlaps++;
            continue;
        }

        if (
            (pair[0] >= pair[2] && pair[0] <= pair[3]) || // x1 falls inside x2-y2
            (pair[1] >= pair[2] && pair[1] <= pair[3])    // y1 falls inside x2-y2
        ) {
            overlaps++;
        }
    }
    console.log("Part 1", fullOverlaps)
    console.log("Part 2", overlaps + fullOverlaps)

})(document.body.innerText.trim());